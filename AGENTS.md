<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Repo guide

Personal portfolio: Next.js 16 (App Router) + React 19 + Tailwind v4 + shadcn/ui. Package manager is **pnpm** (not npm/yarn). Not a monorepo — `pnpm-workspace.yaml` exists only for `ignoredBuiltDependencies`.

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm lint` (or `pnpm lint:fix`)
- Typecheck: `pnpm exec tsc --noEmit` (no npm script for it)
- No test framework exists. Verify changes the same way CI does, in order: `pnpm lint` → `pnpm exec tsc --noEmit` → `pnpm build` (`.github/workflows/ci.yaml` runs on every push/PR)
- Husky + lint-staged run `eslint --fix` on staged JS/TS files at pre-commit

## Architecture

- All site content (profile, socials, projects, skills) lives in `data/metadata.json`, imported directly by components — edit content there, not in JSX
- Skill icons in `data/metadata.json` are `react-icons` export names (e.g. `SiTypescript`, `FaAws`) resolved dynamically in `components/Skills.tsx` from `react-icons/si` and `react-icons/fa`
- Page sections are `components/*.tsx` (Hero, Projects, Skills, Contact, Footer); shadcn primitives go in `components/ui/`; add new ones via the shadcn CLI (config in `components.json`, style `radix-nova`, icons `lucide`)
- Path alias: `@/*` maps to repo root

## Gotchas

- README describes Astro and a `/studio` route — **not implemented**; there is no `astro/` directory. Don't assume Astro exists, but CI passes `NEXT_PUBLIC_ASTRO_*` placeholder env vars for future use
- Tailwind v4: styling config lives in `app/globals.css` (CSS-based config), not `tailwind.config.ts`
