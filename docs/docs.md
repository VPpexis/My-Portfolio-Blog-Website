# Portfolio Site — Technical Documentation

This document describes the architecture, design system, component inventory, and recent production-readiness improvements made to this Next.js portfolio site.

> **Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · shadcn/ui (radix-nova) · Velite · TypeScript · pnpm

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Design System](#design-system)
3. [Reusable Components](#reusable-components)
4. [Pages & Routing](#pages--routing)
5. [Content Layer (Blog)](#content-layer-blog)
6. [SEO & Metadata](#seo--metadata)
7. [Accessibility](#accessibility)
8. [Performance](#performance)
9. [Developer Workflow](#developer-workflow)
10. [Common Patterns](#common-patterns)
11. [Known Notes](#known-notes)

---

## Project Structure

```text
my-portfolio/
├── app/                    # Next.js App Router pages
│   ├── about/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx
│   ├── blog/tags/[tag]/page.tsx
│   ├── contact/page.tsx
│   ├── contact/ContactForm.tsx
│   ├── contact/CopyEmailButton.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── projects/page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/             # Page sections + shared components
│   ├── ui/                 # shadcn primitives + design-system components
│   ├── ArticleCard.tsx
│   ├── BlogFilter.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HobbyCarousel.tsx
│   ├── ModeToggle.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── content/posts/          # MDX blog posts consumed by Velite
├── data/metadata.json      # Central content source (profile, socials, projects, skills)
├── lib/                    # Utilities
│   ├── format.ts
│   ├── metadata.ts
│   ├── socials.ts
│   └── utils.ts
├── velite.config.ts        # Type-safe content schema
└── next.config.ts
```

### Content Flow

All static content (profile, social links, projects, skills) lives in `data/metadata.json`. Components import this file directly. **Do not hard-code content in JSX**; update `data/metadata.json` instead.

---

## Design System

The design system is defined entirely in `app/globals.css` using Tailwind CSS v4's CSS-first configuration (`@theme inline`).

### Color Palette

Colors are stored as HSL values in CSS custom properties and registered as Tailwind color utilities.

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | `0 0% 100%` | `240 6% 4%` | Page background |
| `--foreground` | `240 10% 4%` | `0 0% 96%` | Primary text |
| `--primary` | `240 10% 4%` | `0 0% 96%` | Buttons, links, headings |
| `--primary-foreground` | `0 0% 98%` | `240 6% 10%` | Text on primary surfaces |
| `--secondary` | `240 5% 96%` | `240 4% 16%` | Secondary surfaces |
| `--muted` | `240 5% 96%` | `240 4% 16%` | Muted backgrounds |
| `--muted-foreground` | `240 4% 46%` | `240 5% 65%` | Secondary/muted text |
| `--accent` | `217 91% 60%` | `217 91% 60%` | Focus rings, highlights |
| `--destructive` | `0 84% 60%` | `0 62% 55%` | Error states |
| `--border` | `240 6% 90%` | `240 4% 18%` | Borders and dividers |
| `--ring` | `217 91% 60%` | `217 91% 60%` | Focus-visible outline |

Use Tailwind utilities like `bg-primary`, `text-muted-foreground`, `border-border`, etc.

### Radii

```css
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-2xl: 1.25rem;
--radius-3xl: 1.5rem;
--radius-4xl: 2rem;
```

Default card radius is `rounded-xl`. Buttons use `rounded-lg`. Badges use `rounded-4xl`.

### Typography

- **Body:** Geist Sans (`--font-sans`)
- **Mono:** Geist Mono (`--font-mono`)
- Scale: `text-xs` → `text-5xl` (12px → 48px)
- Headings use `font-bold tracking-tight text-balance`

### Spacing

- Sections: `py-16 md:py-24 lg:py-32`
- Container: `max-w-6xl` (72rem) with `px-4 sm:px-6 lg:px-8`
- Card grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

### Motion

- Default transitions: `transition-all duration-200` or `duration-300`
- Hover lifts: `hover:-translate-y-0.5 hover:shadow-md`
- **Reduced motion:** All animations and transitions are disabled when `prefers-reduced-motion: reduce` is active.

---

## Reusable Components

### Layout Primitives

#### `Container`

```tsx
<Container size="default">{children}</Container>
```

| Prop | Options | Default |
|------|---------|---------|
| `size` | `"small"` (max-w-3xl), `"default"` (max-w-6xl), `"wide"` (max-w-7xl) | `"default"` |

#### `Section`

```tsx
<Section id="projects" variant="border">
  {children}
</Section>
```

| Prop | Options | Default |
|------|---------|---------|
| `variant` | `"default"`, `"muted"`, `"border"` | `"default"` |

#### `PageHeader`

```tsx
<PageHeader
  eyebrow="Projects"
  title="Selected Work"
  description="..."
  align="center"
/>
```

Renders an accessible page header with optional eyebrow, title, and description.

#### `SectionHeader`

```tsx
<SectionHeader
  eyebrow="Portfolio"
  title="Featured Projects"
  description="..."
  action={<Button>View all</Button>}
/>
```

### Cards & Content

#### `ProjectCard`

Renders a project with optional image, tags, GitHub/Live Demo buttons, and expandable details.

```tsx
<ProjectCard project={project} detailed />
```

The `detailed` prop enables the "More details" expansion for role, duration, challenges, solutions, and results.

#### `ArticleCard`

Renders a blog post preview. The entire card is a single link to the article. Tags are non-interactive badges to avoid nested links.

#### `EmptyState`

```tsx
<EmptyState
  icon={<FolderGit className="h-6 w-6" />}
  title="No projects found"
  description="Try another filter."
  action={<Button>Clear filter</Button>}
/>
```

### Form Primitives

- `Input` — styled text input with focus ring and invalid state
- `Textarea` — styled textarea, non-resizable
- `Label` — accessible form label

### Other shadcn Primitives

Existing primitives are kept in `components/ui/`:
`button.tsx`, `card.tsx`, `badge.tsx`, `skeleton.tsx`, `carousel.tsx`, `tooltip.tsx`, `breadcrumb.tsx`, `navigation-menu.tsx`.

---

## Pages & Routing

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Home: Hero, Projects, Skills, Contact |
| `/about` | `app/about/page.tsx` | Bio, domain cards, hobby carousel |
| `/projects` | `app/projects/page.tsx` | Filterable project showcase |
| `/blog` | `app/blog/page.tsx` | Searchable/filterable blog index |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | MDX article with dynamic SEO |
| `/blog/tags/[tag]` | `app/blog/tags/[tag]/page.tsx` | Tag archive pages |
| `/contact` | `app/contact/page.tsx` | Contact cards + form |

### Error & Loading UI

- `app/not-found.tsx` — 404 page
- `app/error.tsx` — global error boundary
- `app/loading.tsx` — shared loading skeleton

---

## Content Layer (Blog)

Blog posts are authored in `content/posts/*.mdx` and compiled by Velite into a type-safe collection.

### Frontmatter Schema

```yaml
---
title: "Post Title"
slug: post-slug
description: "Short description"
date: 2025-06-15
updatedAt: 2025-07-01  # optional
tags: ["CI/CD", "DevOps"]
category: "DevOps"       # DevOps | Cloud Architecture | Frontend | Tutorials
isDraft: false           # optional, default false
---
```

### Adding a Post

1. Create `content/posts/my-post.mdx`
2. Add frontmatter matching the schema above
3. Run `pnpm dev` or `pnpm build`

### Drafts

In `production` mode, posts with `isDraft: true` are excluded from listing and static generation.

---

## SEO & Metadata

### `lib/metadata.ts`

`createMetadata(options)` generates Next.js `Metadata` objects with Open Graph and Twitter Cards.

```tsx
export const metadata = createMetadata({
  title: "About",
  description: "...",
  path: "/about",
  type: "article",
  publishedTime: "2025-06-15",
  tags: ["DevOps"],
})
```

### Dynamic Metadata

Blog posts generate metadata from frontmatter in `generateMetadata`.

### Sitemap & Robots

- `app/sitemap.ts` generates `/sitemap.xml` with routes, posts, and tag pages
- `app/robots.ts` generates `/robots.txt` pointing to the sitemap

Both are static routes generated at build time.

---

## Accessibility

- **Skip link:** First focusable element jumps to `#main-content`
- **Semantic HTML:** `header`, `nav`, `main`, `section`, `article`, `footer`
- **Landmarks:** `aria-label` on desktop and mobile navigation
- **Current page:** `aria-current="page"` on active nav links
- **Focus:** Visible `focus-visible` ring using `--ring` color
- **Reduced motion:** Respects `prefers-reduced-motion`
- **Forms:** All inputs have associated `<Label>` elements
- **Images:** Descriptive `alt` text and `aria-hidden` on decorative icons
- **No nested interactive elements:** Tags inside article cards are badges, not nested links

---

## Performance

- **Images:** Next.js `<Image>` with `priority`, `sizes`, and modern formats (`avif`, `webp`)
- **Fonts:** `next/font/google` with `display: "swap"`
- **Bundle:** Individual icon imports from `react-icons` instead of wildcard imports
- **Static generation:** All pages are prerendered at build time
- **Dead code removal:** Unused SVG assets removed from `public/`

---

## Developer Workflow

### Commands

```bash
pnpm dev      # Start dev server with Velite rebuild
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # ESLint
pnpm lint:fix # ESLint with auto-fix
pnpm exec tsc --noEmit  # TypeScript check
```

### Docker Development

Two Dockerfiles are provided:

- **`Dockerfile`** — Production image. Copies all source files and runs `pnpm build` during image build. Uses `pnpm start` to serve the built output.
- **`Dockerfile.dev`** — Development image. Installs dependencies only; source files are provided at runtime via a bind mount. Uses `pnpm dev` with hot-reload enabled.

Start the dev environment:

```bash
docker compose up --build
```

The compose file mounts the project root into the container and forwards port 3000. Two polling env vars (`WATCHPACK_POLLING=true` and `CHOKIDAR_USEPOLLING=true`) enable hot-reload on platforms that lack native filesystem event support (e.g. Windows), while remaining safe on Mac and Linux.

### Pre-commit

Husky + lint-staged run `eslint --fix` on staged `*.js|jsx|ts|tsx` files.

### CI Order

Per `.github/workflows/ci.yaml`:

1. `pnpm lint`
2. `pnpm velite build`
3. `pnpm exec tsc --noEmit`
4. `pnpm build`

---

## Common Patterns

### Adding a New Page

1. Create `app/my-page/page.tsx`
2. Export metadata with `createMetadata({ title, description, path })`
3. Wrap content in `<Section>` and `<Container>`
4. Use `<PageHeader>` for the page title

### Adding a Project

Edit `data/metadata.json`:

```json
{
  "title": "Project Name",
  "description": "...",
  "tags": ["Next.js", "Frontend"],
  "category": "Professional",
  "type": "Frontend",
  "link": "https://example.com",
  "github": "https://github.com/...",
  "image": "/assets/project.png",
  "featured": true,
  "role": "Frontend Engineer",
  "duration": "2024",
  "technologies": ["Next.js", "React", "Tailwind CSS"],
  "challenges": "...",
  "solutions": "...",
  "results": "..."
}
```

### Adding a Skill

Edit `data/metadata.json` skills array. Icons are `react-icons` export names (`SiTypescript`, `FaAws`, etc.). Update the `iconMap` in `components/Skills.tsx` if adding a new icon.

---

## Known Notes

- The contact form uses a Formspree placeholder URL (`https://formspree.io/f/your-form-id`). Replace `your-form-id` with your real Formspree form ID in `app/contact/ContactForm.tsx` before going live.
- README previously described an Astro `/studio` route that is not implemented. The README has been updated to reflect the actual Next.js + Velite stack.
- Some pre-existing files (`.github/workflows/ci.yaml`, `.gitignore`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`) contained changes unrelated to this design-system pass and were left as-is.
