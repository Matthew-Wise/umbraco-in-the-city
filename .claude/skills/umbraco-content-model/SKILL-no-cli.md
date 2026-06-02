---
name: umbraco-content-model
description: Plan, validate, and optionally apply Umbraco content models — document types, element types, compositions. Trigger on explicit asks ("content model", "document types", "model content for X") and when reviewing frontend code (components, TS types, hardcoded data) to figure out backing CMS structure. Use proactively whenever Umbraco content structure comes up.
---

# Umbraco Content Modeling

Produce a clear, actionable Umbraco content modeling plan. Output is a blueprint a developer follows in the Umbraco backoffice — CMS setup instructions, no frontend code or TypeScript types.


## Conventions (follow exactly)

These are the user's established conventions:

**1. Compositions always**
If 2+ document types share any set of properties (SEO fields, hero fields, metadata), extract them into a composition type and apply it to both. Never duplicate properties across types.

**1a. SEO composition on every page type**
Every document type that represents a page (i.e. something with a URL that an editor publishes) gets the standard `seo` composition applied — no exceptions, even if the user doesn't mention SEO. Always include this composition in the output. The `seo` composition lives in an "SEO" tab and contains:

| alias | Label | Editor | Required |
|---|---|---|---|
| `metaTitle` | Meta Title | Textstring | No |
| `metaDescription` | Meta Description | Textarea | No |
| `ogImage` | Social Share Image | Media Picker | No |

Non-page types (element types, structural folder types, settings singletons not accessible via URL) do not need the SEO composition.

**2. camelCase aliases**
Every alias — document type, element type, property — uses camelCase. `heroTitle` not `HeroTitle`, `hero-title`, or `Hero Title`.

**3. Block List + element types for repeatable content**
When content has a repeatable structured area (list of items, flexible content zone), model it as a Block List editor backed by element types. Never Block Grid. Use Rich Text Editor only for prose that genuinely needs inline formatting — not as a workaround for structured data.

**4. Tabs + Groups + Sort Order**
Organise properties using both tabs and groups within tabs. A "Content" tab is the minimum. Common pattern: Content / SEO / Settings tabs. Within Content, group related properties ("Hero", "About", "Tickets"). Never dump all properties in a single flat list.

All tabs, groups, and properties use a **sort order in multiples of 10** — start at 10, increment by 10 (10, 20, 30, 40…). This leaves room to insert new items between existing ones without renumbering. Include sort order in the output for every tab, group, and property.

Example tab ordering: Content = 10, SEO = 20, Settings = 30.
Example group ordering within Content tab: Hero = 10, About = 20, Tickets = 30.
Example property ordering within a group: first property = 10, second = 20, etc.

**6. Document type vs element type**
- **Document type** → lives as a node in the content tree; editors manage it individually
- **Element type** → only exists embedded in a Block List on another type; cannot be published standalone


## Output structure

Only include sections that apply. Every section should be specific — aliases, labels, editors, required flags for every property.

### 1. Compositions

For each composition:

**[Name]** — alias: `compositionAlias`
Tab: [Tab Name] (sort: 10) → Group: [Group Name] (sort: 10)

| Sort | alias | Label | Editor | Required |
|---|---|---|---|---|
| 10 | `propertyAlias` | Human Label | Editor Type | Yes/No |

---

### 2. Element Types

For each element type (used inside Block List editors):

**[Name]** — alias: `elementAlias` *(Element Type)*
Used in: [list which Block List properties reference this]

| Sort | alias | Label | Editor | Required |
|---|---|---|---|---|

---

### 3. Document Types

For each document type:

**[Name]** — alias: `docTypeAlias`
- Allowed at root: Yes/No
- Allowed children: `childAlias1`, `childAlias2` (or "None")
- Compositions: [list composition names applied]

| Tab (sort) | Group (sort) | Prop sort | alias | Label | Editor | Required |
|---|---|---|---|---|---|---|
| Content (10) | Hero (10) | 10 | `heroTitle` | Hero Title | Textstring | Yes |

---

### 4. Block List Configuration

For each Block List property:

**[Document Type name] → `propertyAlias`**
- Allowed blocks: [list element type names]
- Notes: (max items, labels, etc. if relevant)

---

### 5. Content Tree Structure

How editors should organise content nodes. Use a short ASCII tree or prose:

```
/ (root)
├── Home (homePage)
│   ├── Schedule Day: Thursday (eventScheduleDay)
│   │   ├── Community Activities (eventScheduleItem)
│   │   └── After Event Social (eventScheduleItem)
```


---

## Property editor reference

| Content type | Editor |
|---|---|
| Short text, title, label | Textstring |
| Multi-line text (no formatting) | Textarea |
| Rich content with links/HTML/formatting multiple paragraphs | Rich Text Editor |
| True/false toggle | Toggle |
| Number | Numeric |
| Date/time | Date Picker |
| Repeatable structured blocks | Block List |
| Image | Media Picker |
| URL / link (internal or external) | Multi URLPicker |

---

## How to approach the request

**Step 1 — Confirm mode**
Plan-only, plan+review+apply, or skip-validation. One line if ambiguous. Default plan-only if CLI unavailable.

**Step 2 — Discover (if CLI available)**
Phase 0 in parallel. Note reusable compositions/data types and alias collisions.

**Step 3 — Extract content entities**
Read what the user provides: site description, frontend components, TypeScript types, hardcoded data, plain language requirements. List the distinct things that need to be managed as content.

**Step 4 — Spot shared property sets**
The `seo` composition is always output first — every page type gets it regardless of whether the user mentions SEO. Beyond that, look for any other properties appearing on multiple types: hero fields, metadata, etc. Each shared set becomes its own composition.

**Step 5 — Classify each entity**
For each content entity: is it a standalone node editors manage individually (document type) or always embedded in something else (element type for Block List)?

**Step 6 — Design tabs and groups**
Think like an editor opening a content item. Content they edit daily goes in the Content tab first, in logical groups. SEO gets its own tab. Config/visibility settings go in Settings tab.

**Step 7 — Output the plan**
Produce the structured sections. Every property needs: alias (camelCase), label (human-readable), editor (from the reference table), and required flag.

**Step 8 — Validate**
Run checks. Review mode → show failures. Skip-validation → warn, continue.

**Step 9 — Apply (if mode requires)**
Phase 6 ordering. Report each batch. Retry on connection error (Umbraco restart). Stop on data error.

---

## Common patterns

**Page with flexible content area**
Use a Block List property on the page doc type. Create element types for each block variant (textBlock, imageBlock, callToActionBlock). Add them as allowed blocks.

**Parent / child hierarchy (e.g. blog listing + posts)**
Create a folder/listing doc type allowed at root. Create the item doc type allowed as child of the listing. Editors create the listing once and nest posts inside.

**Shared sections across pages**
If the same group of properties appears on 3+ page types (e.g. every page has SEO and a hero), use compositions. If the same content block appears in multiple Block Lists, the same element type can be allowed in multiple Block Lists.

**Settings singletons (e.g. global navigation, footer)**
Create a document type, mark Delivery API: Disabled if it's only consumed server-side, or Enabled if the frontend fetches it. Allowed at root: Yes, but typically only one instance created.

---

## When NOT to apply

Even in skip-validation mode, stop and confirm before:
- Deleting any existing doc type, element type, or data type.
- Renaming an alias on a type that already has content (breaks Delivery API consumers).
- Removing a composition from a type that's in use.

These need explicit user confirmation regardless of mode.
