
## Project Overview
Next.js 15 (App Router) + TypeScript + Tailwind + shadcn/ui

### Regenerating the API client

Run `npm run generate` while Umbraco is running. This calls Orval which hits the live Swagger JSON, then writes generated files to `lib/umbraco/services/` (split by tag) and `lib/umbraco/models/`. Do not manually edit those generated files.

### Styling

Tailwind with custom breakpoint `xs` and `1320px`. Custom fonts: Anton, Bayon, Share Tech. Dark mode via `next-themes`. Custom animations: bee wing flutter (`bee-wing`), buzz hover (`buzz`).

### Build flags

`next.config.mjs` has `ignoreBuildErrors: true` and `ignoreDuringBuilds: true` for TypeScript and ESLint — builds succeed even with type errors.
