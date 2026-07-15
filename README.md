# Website Portfolio

A modern, high-performance personal portfolio built from the ground up using a headless architecture. This project serves as a showcase of my work, built with a "design-first" approach and a focus on clean, structured content.

## 🚀 Tech Stack

- **Frontend:** [Next.js](https://nextjs.org/) (App Router) for a fast, SEO-friendly user experience.
- **Content:** [Astro](https://astro.build/) for structured, content-driven pages.
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) for beautifully designed, accessible, and fully customizable components.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid UI development.
- **Package Manager:** [pnpm](https://pnpm.io/) for fast, disk-efficient dependency management.

## ✨ Key Features

- **Headless Architecture:** Complete separation of the content (Astro) from the presentation (Next.js).
- **Single Repository:** An embedded Astro workspace located at `/studio` for managing content directly within the app.
- **Visual Editing:** Real-time content previews using Astro's content collections and Next.js Draft Mode.
- **Optimized Assets:** On-demand image transformations and optimizations powered by Astro.
- **Strict Dependencies:** Leveraging pnpm to ensure a predictable and efficient `node_modules` structure.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS)
- [pnpm](https://pnpm.io/installation)

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/VPpexis/portfolio.git](https://github.com/VPpexis/my-portfolio.git)
   cd my-portfolio
   ```

2. Install dependencies:
    ```bash
    pnpm install
3. Set up environment variables:
    Create a `.env.local` file in the root and add the Astro project settings:
    ```Plaintext
    NEXT_PUBLIC_ASTRO_PROJECT_ID="my-portfolio"
    NEXT_PUBLIC_ASTRO_DATASET="production"
4. Run the development server:
    ```bash
    pnpm dev
    ```

## 🌟 Objectives

- **Showcase My Work:** A visually appealing portfolio to highlight my projects and skills.
- **Content Management:** A user-friendly CMS for easy content updates without code changes.
- **Performance:** A fast, responsive website optimized for all devices.
- **Scalability:** A flexible architecture that can grow with my needs.
- **DevOps Efficiency:** A streamlined development workflow with GitHub Actions for CI/CD.

Open [http://localhost:3000](http://localhost:3000) to view the portfolio and [http://localhost:3000/studio](http://localhost:3000/studio) to access the Astro workspace.

## 📂 Project Structure

- `/app`: Next.js application routes and UI logic.
- `/components`: shadcn/ui components and custom design elements.
- `/astro`: Astro configuration and content schemas.
- `/lib`: Utility functions, inclding the shadcn `cn` helper.

## 🏆 Achievements
- Implemented Linting on Local Machine using ESLint and Husky with a custom configuration to enforce code quality and consistency.
- Created dockerfile and dockcker-compose for local development containerization.