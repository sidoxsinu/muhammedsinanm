# Muhammed Sinan M — Portfolio

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.1-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-20232A?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Verified-2EAD33?logo=playwright)](https://playwright.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Official personal portfolio website for **Muhammed Sinan M** ([muhammedsinan.in](https://muhammedsinan.in)). Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Designed with a clean, dark aesthetic (`#111111`) accented by vibrant orange (`#E8562A`), featuring responsive multi-page navigation, reactive tabbed catalogs, canvas particle effects, and verified cross-device stability.

---

## 🚀 Key Features

- **Multi-Page Architecture**:
  - **`/`**: Home overview featuring typewriter intro, interactive dot field, live stats strip, 4 featured projects, technical capabilities hub, work experience preview, and contact CTA.
  - **`/projects`**: Interactive project catalog with reactive filtering (`All`, `Freelance & Client`, `AI & Systems`, `Web & Hackathons`) and direct GitHub/Live links.
  - **`/about`**: Tabbed biography, detailed work experience (including 6-month full-time internship at Torcue Digital), career journey timeline (2021–2026), and student leadership roles.
  - **`/credentials`**: Verified honors & awards, interactive certifications grid with modal viewer, hackathons list, and student developer clubs.
  - **`/contact`**: Direct communication channels with one-click clipboard email copy and active social links.
  - **`/resume`**: Native streaming route handler serving the latest PDF resume.
  - **`404`**: Custom dark-themed error boundary with quick navigation back to home.
- **Modern Reusable Component Library**:
  - `SpotlightCard`: Mouse-tracking radial gradient glow and elevation hover physics.
  - `Tabs`: Accessible pill tabs with active glow states and item counters.
  - `PageShell`: Unified layout wrapper ensuring consistent gutters, navbar offset, and vertical rhythm.
  - `Button` & `Badge`: Polymorphic, accessible primitives supporting diverse variants.
- **Responsive & Motion Safe**:
  - **Zero Horizontal Overflow** across mobile (360px, 375px), tablet (768px), and desktop (1440px+).
  - Strict compliance with `prefers-reduced-motion` across CSS animations and canvas effects.
- **Interactive Visual Effects**:
  - GPU-accelerated cursor follower with blend-mode inversion (`CustomCursor`).
  - Subtle interactive particle matrix on the hero (`DotField`).
  - Ease-out radial spark bursts on mouse clicks (`ClickSpark`).

---

## 🛠️ Tech Stack & Tooling

| Domain               | Technology                                      | Description                                                          |
| :------------------- | :---------------------------------------------- | :------------------------------------------------------------------- |
| **Framework**        | [Next.js 16.4.1](https://nextjs.org/)           | App Router, Turbopack, static page generation, server handlers       |
| **UI Library**       | [React 19.3.0](https://react.dev/)              | Modern hooks, transitions, and concurrent features                   |
| **Language**         | [TypeScript 5](https://www.typescriptlang.org/) | Strict type checking with 100% type coverage                         |
| **Styling**          | [Tailwind CSS v4](https://tailwindcss.com/)     | High-performance CSS engine with custom design tokens (`tokens.css`) |
| **Motion & Physics** | [GSAP 3.15](https://greensock.com/gsap/)        | ScrollTrigger reveals, magnetic button physics, smooth back-to-top   |
| **Testing**          | [Playwright](https://playwright.dev/)           | End-to-end automated verification across 4 viewports                 |
| **Deployment**       | [Vercel](https://vercel.com/)                   | Edge network, automatic SSL, immutable static asset caching          |

---

## 📁 Repository Structure

```
.
├── docs/                        # Architectural, operational, and historical documentation
│   ├── ARCHITECTURE.md          # System architecture, component models, and data layer
│   ├── DEPLOYMENT.md            # Vercel deployment, custom domains, and headers guide
│   └── history/                 # Historical migration and restore reports
│       ├── MIGRATION.md         # Vanilla Vite to Next.js migration history
│       └── RESTORE_REPORT.md    # Original design fidelity restoration report
│
├── public/                      # Static web assets
│   ├── assets/                  # Normalized, clean kebab-case assets
│   │   ├── documents/           # PDF resumes and certificates
│   │   └── images/              # Project previews, brand assets, and thumbnails
│   ├── images/                  # Backward-compatible mirrors for legacy asset URLs
│   └── favicon.ico              # Browser icon
│
├── scripts/                     # Operational and test scripts
│   └── verify.mjs               # Playwright end-to-end test runner (routes, viewports, images)
│
├── src/
│   ├── app/                     # Next.js App Router (pages and route handlers)
│   │   ├── about/               # /about page (Overview, Experience, Journey, Leadership)
│   │   ├── contact/             # /contact page
│   │   ├── credentials/         # /credentials page (Awards, Certs, Hackathons, Clubs)
│   │   ├── projects/            # /projects catalog page
│   │   ├── resume/              # /resume route handler (PDF streaming download)
│   │   ├── layout.tsx           # Root layout, metadata, fonts, JSON-LD schemas
│   │   ├── not-found.tsx        # Branded 404 page
│   │   ├── page.tsx             # Root landing page (/)
│   │   ├── robots.ts            # Dynamic robots.txt
│   │   └── sitemap.ts           # Dynamic sitemap.xml
│   │
│   ├── components/
│   │   ├── layout/              # Navbar (floating glass capsule) and Mobile Drawer
│   │   ├── sections/            # HeroSection, ProjectsSection, SkillsSection, StatsSection,
│   │   │                        # ExperiencePreviewSection, ContactSection, Footer
│   │   └── ui/                  # Reusable primitives: PageShell, PageHeader, SpotlightCard,
│   │                            # ProjectCard, Tabs, Badge, Button, SectionHeading,
│   │                            # DotField, ClickSpark, CustomCursor, GlobalEffects
│   │
│   ├── data/                    # Strictly typed, decoupled content modules
│   │   ├── achievements.ts      # Honors, hackathon wins, and awards
│   │   ├── certificates.ts      # Certifications data and preview paths
│   │   ├── clubs.ts             # IEEE societies and student clubs
│   │   ├── education.ts         # Academic background and degrees
│   │   ├── events.ts            # 30+ hackathons across institutions
│   │   ├── experience.ts        # Torcue Digital, Freelance, Suvidha Foundation
│   │   ├── journey.ts           # Career milestones timeline (2021–2026)
│   │   ├── leadership.ts        # Leadership and executive committee roles
│   │   ├── profile.ts           # Bio, roles, contact details, location
│   │   ├── projects.ts          # 9 catalog projects with tags and links
│   │   ├── skills.ts            # Technical skills across 4 tracks
│   │   ├── socials.ts           # Social platform links
│   │   └── stats.ts             # Metric counters (Hackathons, Projects, Awards)
│   │
│   ├── lib/
│   │   ├── site-config.ts       # Canonical metadata and URLs
│   │   └── utils.ts             # Tailwind class merging utility (cn)
│   │
│   ├── styles/
│   │   ├── globals.css          # Tailwind CSS v4 imports and theme inline variables
│   │   ├── tokens.css           # Centralized design tokens (colors, fonts, radii)
│   │   └── Style.css            # Base styles and animations
│   │
│   └── types/
│       └── index.ts             # Shared TypeScript models and interfaces
│
├── .gitignore                   # Standard Git ignore rules
├── .nvmrc                       # Node.js version specification (20)
├── eslint.config.mjs            # ESLint 9 configuration with Next.js rules
├── next.config.ts               # Next.js configuration (Turbopack, redirects, images)
├── package.json                 # Project scripts and dependencies
├── tsconfig.json                # TypeScript configuration with @/* alias
└── vercel.json                  # Security headers and edge caching configuration
```

---

## ⚡ Development & Workflow

### Prerequisites

- [Node.js](https://nodejs.org/) `>=20.0.0`
- [npm](https://www.npmjs.com/) `>=10.0.0`

### Installation

```bash
# Clone the repository
git clone https://github.com/sidoxsinu/cv.git
cd cv

# Install dependencies
npm install
```

### Available Scripts

| Command                | Description                                                                       |
| :--------------------- | :-------------------------------------------------------------------------------- |
| `npm run dev`          | Starts local Next.js development server with Turbopack on `http://localhost:3000` |
| `npm run build`        | Compiles an optimized production build                                            |
| `npm run start`        | Runs the compiled production server                                               |
| `npm run lint`         | Runs ESLint to check code quality                                                 |
| `npm run type-check`   | Runs the TypeScript compiler (`tsc --noEmit`) to verify types                     |
| `npm test`             | Runs the automated Playwright verification suite (`scripts/verify.mjs`)           |
| `npm run format`       | Automatically formats files using Prettier                                        |
| `npm run format:check` | Checks code formatting without modifying files                                    |

---

## 🧪 Automated Testing

The automated test runner in `scripts/verify.mjs` executes comprehensive assertions:

```bash
# 1. Build and start production server
npm run build
npm run start

# 2. Run test suite (in another terminal or background)
npm test
```

The test runner validates:

1. **HTTP Status Codes**: All 5 core routes + `/resume`, `/robots.txt`, and `/sitemap.xml`.
2. **Metadata**: Valid page titles, descriptions, and OpenGraph configurations.
3. **Responsive Layouts**: 0 horizontal overflow across 4 viewports (360px, 375px, 768px, 1440px).
4. **Media Validation**: Ensures all 23 certificates and 9 project thumbnails load (`naturalWidth > 0`).
5. **Interactive Controls**: Tests project category filtering, about tabs, and mobile navigation drawer.
6. **Console Audit**: Ensures zero uncaught errors and zero failed network requests.

---

## 📖 Additional Documentation

- [**Architecture & Engineering Guide**](docs/ARCHITECTURE.md): Deep-dive into Next.js 16 App Router patterns, component decoupling, data layer, and styling system.
- [**Deployment Operations Guide**](docs/DEPLOYMENT.md): Instructions for Vercel deployment, custom domain setup (`muhammedsinan.in`), security headers, and asset caching.
- [**Vite to Next.js Migration Report**](docs/history/MIGRATION.md): Historical report documenting the initial migration from vanilla Vite to Next.js.
- [**Design Fidelity Restoration Report**](docs/history/RESTORE_REPORT.md): Historical record of restoring original design tokens and GSAP interactions.

---

## 👤 Author & Contact

**Muhammed Sinan M**

- **Website**: [muhammedsinan.in](https://muhammedsinan.in)
- **Email**: [muhammedsinan.m67@gmail.com](mailto:muhammedsinan.m67@gmail.com)
- **LinkedIn**: [linkedin.com/in/muhammed-sinan-m](https://linkedin.com/in/muhammed-sinan-m)
- **GitHub**: [github.com/sidoxsinu](https://github.com/sidoxsinu)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
