---
name: umbraco-content-model
description: Plan, validate, and optionally apply Umbraco content models — document types, element types, compositions. Trigger on explicit asks ("content model", "document types", "model content for X") and when reviewing frontend code (components, TS types, hardcoded data) to figure out backing CMS structure. Use proactively whenever Umbraco content structure comes up.
---

# Umbraco Content Modeling

Produce a clear, actionable Umbraco content modeling plan. Output is a blueprint a developer follows in the Umbraco backoffice — CMS setup instructions, no frontend code or TypeScript types. If the Umbraco CLI is available, optionally apply the plan directly via the CLI tools.

---

## Working modes

Pick mode based on what the user asked. Confirm once at start if ambiguous, then proceed.

| Mode | What you do | Trigger |
|---|---|---|
| **Plan only** | Output the plan as markdown. No writes. | Default. User says "plan", "design", "model". CLI not available. |
| **Plan + Review + Apply** | Discover existing state, draft plan, show plan, **wait for approval**, then apply. | User says "build it in umbraco", "create it", "apply". |
| **Apply (skip validation)** | Discover, plan, apply directly. Validation still runs but only warns. | User says "skip validation", "just do it", "go ahead". |

One-line confirm if unclear: `"Plan only, or apply? (review-first / skip-validation)"`. Then no further check-ins.

---

## Tool channel

CLI only. Resilient to Umbraco restarts (fresh process per call). Available if `.env` has `UMBRACO_BASE_URL` + `UMBRACO_CLIENT_ID` + `UMBRACO_CLIENT_SECRET`:

```bash
npx @umbraco-cms/mcp-dev --call <tool> --call-args '<json>'
```

Flags:
- `--umbraco-readonly` — Phase 0 discovery, blocks writes
- `--umbraco-dry-run` — Review previews, no changes written

Tool discovery: `npx @umbraco-cms/mcp-dev --list-tools` / `--describe-tool <name>`.

If env vars missing → plan-only mode.

## Final output requirement

End every response with one of these one-liners so the user knows what hit Umbraco:
- `Umbraco: not modified (plan only).`
- `Umbraco: dry-run preview, no changes written.`
- `Umbraco: applied — created N, updated M, errors E.`
- `Umbraco: apply failed — <one-line error>. No further writes attempted.`

---

## Phase 0 — Discovery (when CLI available)

Before drafting, learn current state. Skip silently if CLI unavailable.

Run in parallel:
- `get-all-document-types` — existing doc/element types, aliases, compositions
- `get-all-data-types` — existing data types (Block List configs, custom Textstrings, Media Pickers)

```bash
npx @umbraco-cms/mcp-dev --umbraco-readonly --call get-all-document-types
npx @umbraco-cms/mcp-dev --umbraco-readonly --call get-all-data-types
```

Use results to:
1. **Reuse existing compositions and data types**. If `seo` composition already exists, reference by alias — don't redefine.
2. **Detect alias collisions** — flag planned aliases already in use.
3. **Decide create vs update** — existing doc type → `update-document-type`, not `create-document-type`.

Briefly tell the user what discovery found (one line). For deeper inspection use `get-document-type-by-id` or `find-data-type`; summarise, don't dump schema.

---

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

---

## Validation (before applying)

Run these checks on the draft. In **Plan + Review** mode surface failures in the review summary. In **Skip-validation** mode print a one-line warning per failure and continue.

| Check | Rule |
|---|---|
| Alias case | All aliases camelCase. |
| SEO present | Every page-style doc type has `seo` composition. |
| Sort orders | Tabs, groups, properties all multiples of 10. |
| No alias collision | Planned aliases don't already exist (Phase 0), unless explicitly an update. |
| Block List backing | Every Block List property names ≥1 allowed element type, and those element types are defined. |
| Allowed children resolve | Every `Allowed children` entry references a real or planned doc type alias. |
| Editor mapping | Every property's editor is from the reference table. |

Skip-validation = warn, never silently ignore.

---

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

## Phase 6 — Apply (Plan+Review or Skip-validation modes)

Run only after user approves the plan (Review mode) or explicitly requested skip-validation.

### Channel

CLI only. Each call is a fresh `npx` process — Umbraco restart only fails the in-flight call. Retry on connection error.

In **Plan+Review** mode, before write call optionally run a dry-run preview:
```bash
npx @umbraco-cms/mcp-dev --umbraco-dry-run --call <tool> --call-args '<json>'
```
Useful for surfacing what Umbraco will actually do before the user commits. Skip for trivial creates.

### Order of operations

Dependencies matter. Create in this order:

1. **Data types** — any custom data type the plan needs (e.g. specific Block List config). Use `create-data-type`. Reuse existing where possible.
2. **Compositions** — document types with `isElement: false` used purely as compositions. `create-document-type`. SEO composition first if missing.
3. **Element types** — `create-element-type`. Must exist before doc types reference them in Block Lists.
4. **Document types** — `create-document-type` for new, `update-document-type` for existing. Apply compositions, allowed children, tabs, groups, properties, sort orders.
5. **Allowed-children wiring** — if doc type A allows B, both must exist first. Create both, then update A with the allowed-children list.

### Reporting back

After each batch, one-line status: `"Created seo composition + 3 element types + 2 doc types. 0 errors."` On error, quote the exact error and stop — don't push through failures.

### Idempotency

Phase 0 shows item exists with matching shape → skip. Exists with different shape → default to **update**, warn inline. Never silently delete and recreate — destructive ops always confirm first, even in skip-validation mode.

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
