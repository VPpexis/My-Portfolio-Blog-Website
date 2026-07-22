# Website Portfolio

A modern, high-performance personal portfolio built from the ground up with a design-first approach and a focus on clean, structured content.

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) 16 (App Router) + [React](https://react.dev/) 19 for a fast, SEO-friendly user experience.
- **Content:** [Velite](https://velite.js.org/) for type-safe, Markdown-driven blog posts.
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) primitives for accessible, customizable components.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 with a CSS-based design system.
- **Icons:** [Lucide](https://lucide.dev/) and [react-icons](https://react-icons.github.io/react-icons/).
- **Package Manager:** [pnpm](https://pnpm.io/) for fast, disk-efficient dependency management.

## ✨ Key Features

- **Type-Safe Content Layer:** Blog posts authored in MDX with Velite, compiled into TypeScript collections.
- **Design System:** Centralized tokens for colors, typography, spacing, radii, and shadows in `app/globals.css`.
- **Accessible:** Semantic HTML, skip links, focus-visible states, reduced-motion support, and ARIA labels throughout.
- **SEO Ready:** Dynamic Open Graph / Twitter metadata, sitemap, and robots configuration generated at build time.
- **Dark Mode:** Theme-aware color tokens with `next-themes`.
- **Strict Dependencies:** Leveraging pnpm to ensure a predictable and efficient `node_modules` structure.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VPpexis/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🧪 Quality Gates

The project enforces quality through linting, type-checking, and build checks:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Husky + lint-staged run `eslint --fix` on staged JS/TS files at pre-commit.

## 📂 Project Structure

- `/app`: Next.js application routes and UI logic.
- `/components`: shadcn/ui primitives, reusable design-system components, and page sections.
- `/content`: MDX blog posts consumed by Velite.
- `/data`: Site content (profile, socials, projects, skills) in `metadata.json`.
- `/lib`: Utility functions, helpers, and the shadcn `cn` helper.

## 🏆 Achievements

- Implemented linting on local machine using ESLint and Husky with a custom configuration to enforce code quality and consistency.
- Created Dockerfile (production), Dockerfile.dev (development with hot-reload), and docker-compose for cross-platform containerization.
- Built a cohesive design system and reusable component library for consistent UI across all pages.
