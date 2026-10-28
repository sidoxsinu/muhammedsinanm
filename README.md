# Muhammed Sinan M — Personal Portfolio

Official personal portfolio website for **Muhammed Sinan M** ([muhammedsinan.in](https://muhammedsinan.in)). Built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a centralized CSS custom property token system (`src/styles/tokens.css`)
- **Fonts & Assets**: Native `next/font/google` (`Space_Grotesk`), optimized `next/image`
- **Animation System**: Lightweight, zero-dependency `useInView` scroll transitions respecting system `prefers-reduced-motion`
- **Deployment**: [Vercel](https://vercel.com/) with HTTP security headers and caching configuration (`vercel.json`)
- **Node Requirement**: `>=20.0.0` (managed via `.nvmrc`)

---

## 📁 Project Structure

```
.
├── .nvmrc                       # Node.js LTS version specification (20)
├── .prettierrc                  # Code formatting configuration
├── eslint.config.mjs            # ESLint 9 configuration with Next.js rules
├── next.config.ts               # Next.js configuration (Turbopack, redirects, images)
├── package.json                 # Scripts and dependencies
├── tsconfig.json                # TypeScript compiler configuration with alias @/* -> ./src/*
├── vercel.json                  # Security headers, immutable caching, and redirects
│
├── public/                      # Static assets served at root
│   ├── assets/                  # Normalized, clean kebab-case assets
│   │   ├── documents/           # Resume PDF & certificate PDFs
│   │   └── images/              # Project screenshots, thumbnails, branding & profile
│   ├── images/                  # Backward-compatible mirrors for legacy asset URLs
│   └── favicon.ico              # Browser icon
│
└── src/
    ├── app/                     # Next.js App Router
    │   ├── layout.tsx           # Global HTML shell, fonts, Metadata API, JSON-LD schemas
    │   ├── page.tsx             # Root page dynamically assembling sections via config
    │   ├── resume/
    │   │   └── route.ts         # Route handler redirecting /resume -> resume PDF
    │   ├── robots.ts            # Dynamic robots.txt generation
    │   └── sitemap.ts           # Dynamic sitemap.xml generation
    │
    ├── components/
    │   ├── layout/              # Navbar, MobileMenu (drawer)
    │   ├── sections/            # Self-contained modular sections:
    │   │                        # Hero, About, Stats, Featured, Journey, Education,
    │   │                        # Projects, Achievements, Experience, Leadership,
    │   │                        # Skills, Clubs, Events, Certifications,
    │   │                        # CertificateGallery, Contact, Footer
    │   └── ui/                  # Reusable primitives:
    │                            # Button, Card, Badge, Container, SectionHeading, AnimateIn
    │
    ├── data/                    # Strictly typed verbatim content modules:
    │   ├── sections-config.ts   # Section order and visibility toggle
    │   ├── profile.ts           # Bio, roles, contact links
    │   ├── socials.ts           # Social platform links
    │   ├── stats.ts             # Numerical metric counters
    │   ├── featured.ts          # Featured projects showcase
    │   ├── journey.ts           # 20 timeline milestones (2021–2026)
    │   ├── education.ts         # Academic background
    │   ├── projects.ts          # 8 portfolio projects
    │   ├── achievements.ts      # Awards and hackathon victories
    │   ├── experience.ts        # Work experience and internships
    │   ├── leadership.ts        # 7 leadership positions
    │   ├── skills.ts            # 24 technical skills across 4 tracks
    │   ├── clubs.ts             # IEEE & student developer communities
    │   ├── events.ts            # 27+ hackathons across 7 institutions
    │   └── certificates.ts      # Formal credentials & 23 certificate cards
    │
    ├── hooks/
    │   ├── useInView.ts         # Lightweight IntersectionObserver hook
    │   └── useReducedMotion.ts  # Media query subscription via useSyncExternalStore
    │
    ├── lib/
    │   ├── site-config.ts       # Canonical metadata and URLs
    │   └── utils.ts             # Tailwind class merging utility (cn)
    │
    ├── styles/
    │   ├── globals.css          # Tailwind imports, theme inline variables, utility classes
    │   └── tokens.css           # Single design token file (colors, fonts, radii, spacing)
    │
    └── types/
        └── index.ts             # Shared TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js 20 or later installed:

```bash
node -v   # v20.x or higher
```

### Installation

```bash
npm install
```

### Development Server

Run the development server with Turbopack:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Quality Checks & Type Safety

Run ESLint and TypeScript checks:

```bash
npm run lint         # Check for lint issues with ESLint
npx tsc --noEmit     # Verify TypeScript types with 0 errors
```

### Production Build

Create an optimized static production build:

```bash
npm run build
```

---

## ⚙️ How to Customize & Extend

### 1. How to Add or Remove a Section

Section order and visibility are managed from a single central file:
[`src/data/sections-config.ts`](src/data/sections-config.ts)

```typescript
export const SECTIONS_CONFIG: SectionConfigItem[] = [
  { id: 'hero', enabled: true, label: 'Hero' },
  { id: 'about', enabled: true, label: 'About' },
  { id: 'stats', enabled: true, label: 'Stats' },
  // Set enabled: false to instantly hide any section without breaking imports
  { id: 'featured', enabled: false, label: 'Featured Projects' },
  ...
];
```

To permanently remove a section component:

1. Delete the component file from `src/components/sections/`.
2. Remove its entry from `SECTIONS_CONFIG` and the mapping in `src/app/page.tsx`.

### 2. How to Edit Content

All content is strictly separated from presentation logic in `src/data/`:

- **Personal Details / Bio**: Edit `src/data/profile.ts`
- **Projects**: Edit `src/data/projects.ts` (title, tags, links, descriptions, image)
- **Experience / Work**: Edit `src/data/experience.ts`
- **Certificates**: Edit `src/data/certificates.ts`
- **Hackathons**: Edit `src/data/events.ts`
- **Skills**: Edit `src/data/skills.ts`

### 3. How to Restyle the Site (Design Tokens)

All color palettes, typography variables, radii, and container widths are defined in one central token file:
[`src/styles/tokens.css`](src/styles/tokens.css)

```css
:root {
  /* Colors */
  --bg-primary: #111111;
  --bg-secondary: #161616;
  --bg-card: #1a1a1a;

  --text-primary: #ffffff;
  --text-secondary: #999999;

  --accent-red: #e54d2e;
  --accent-orange: #e8562a;
  --gold-accent: #c9a84c;

  /* Radii */
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```

Modifying a variable here updates the entire site instantly.

### 4. How to Deploy to Vercel

This repository is configured for native deployment on Vercel:

1. Push your branch to GitHub.
2. Import the repository in the Vercel Dashboard (framework preset will auto-detect as Next.js).
3. All routing, security headers (`vercel.json`), redirects (`/resume`), and static generation will work automatically.

---

## 📄 License

© 2026 Muhammed Sinan M. All rights reserved.
