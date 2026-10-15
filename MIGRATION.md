# Migration Report: Vanilla Vite to Next.js (React + TypeScript)

This document summarizes the complete architectural migration and refactoring of [muhammedsinan.in](https://muhammedsinan.in) from a vanilla Vite + HTML/CSS/JS + GSAP stack into a modern, type-safe Next.js App Router codebase.

---

## 1. What Was Removed

### Heavy Animation Libraries & Runtime Scripts
- **GSAP & ScrollTrigger**: Fully dropped both CDN dependencies and local script bindings.
- **Custom Cursor Dot (`#cursorDot`)**: Removed mouse-tracking circle cursor and lag filters.
- **Click-Spark Particles (`js/click-spark.js`)**: Removed HTML canvas event listener spawning sparkle particles on user click.
- **Dot-Field Background (`js/dot-field.js`)**: Removed the canvas background simulation with cursor proximity bulge.
- **Letter-by-Letter Scroll Text Fill**: Removed heavy letter span slicing on scroll.
- **Dealt-Deck Card Pile Animation**: Replaced with clean CSS scroll-snap viewports.
- **3D Tilt & Light Reflection**: Replaced with clean CSS hover elevation and border transitions.
- **Button Glow Cursor Tracking**: Replaced with standard CSS focus and hover styles.

### Legacy Files Deleted
- `index.html` (190 KB monolithic markup file)
- `css/Style.css` and `css/accordion-gallery.css`
- `js/animations.js`, `js/carousel-3d.js`, `js/click-spark.js`, `js/dot-field.js`, `js/staggered-menu.js`, and `js/accordion-gallery.js`
- `vite.config.js` and `dist/`
- Monolithic root assets (`images/`, `favicon.ico`, `robots.txt`, `sitemap.xml`) in favor of Next.js structured `public/` and dynamic route generators.

---

## 2. What Replaced It

| Feature / Section | Legacy Vanilla Implementation | New Next.js (React + TypeScript) Architecture |
| :--- | :--- | :--- |
| **Framework & Engine** | Vite + vanilla HTML/CSS/JS | Next.js 16 (App Router) + React 19 + TypeScript + Node 20 |
| **Styling & Tokens** | Multiple CSS files with hardcoded values | Tailwind CSS v4 with single token file `src/styles/tokens.css` |
| **Content Layer** | Hardcoded directly in `index.html` | 15 typed data modules in `src/data/` with strict TypeScript models |
| **Section Control** | Monolithic linear DOM | `src/data/sections-config.ts` (toggle visibility or reorder in 1 line) |
| **Navigation** | Staggered GSAP animated full-screen menu | Floating glassmorphism navbar + accessible dialog mobile drawer |
| **Scroll Animation** | ScrollTrigger tweens and scrubbers | Lightweight `useInView` hook (native `IntersectionObserver`) |
| **Reduced Motion** | Partially respected | Strict `useReducedMotion` hook using `useSyncExternalStore` |
| **Featured Showcase** | Custom JS accordion with fixed widths | Responsive desktop accordion + mobile horizontal scroll-snap |
| **Certificate Gallery** | 3D coverflow carousel (`carousel-3d.js`) | Native CSS scroll-snap gallery with keyboard navigation and prev/next controls |
| **SEO & Schemas** | Static HTML meta and script tags | Built-in Next.js Metadata API, dynamic `sitemap.ts`, `robots.ts`, and JSON-LD (`Person`, `WebSite`, `ProfilePage`) |
| **Resume Redirect** | Vercel rewrite | Dual-layer: `next.config.ts` redirect, route handler `app/resume/route.ts`, and `vercel.json` |

---

## 3. Content Inventory & Verbatim Verification

Every piece of content from `index.html` was audited and migrated verbatim:

- **Profile & Bio**: Verbatim summary, email, phone, and contact links in `src/data/profile.ts`.
- **Stats Strip (3 metrics)**: `27+` Hackathons, `8+` Projects, `2` Awards in `src/data/stats.ts`.
- **Featured Projects (5 items)**: AvenWing, Parackal Travels Hub, Next Gen AI Assistant, Pylon, CodeBurry in `src/data/featured.ts`.
- **Career Journey (20 milestones across 6 years)**: 2021 to 2026 milestones preserved in `src/data/journey.ts`.
- **Education (2 entries)**: B.Tech CSE (Christ College of Engineering) & Higher Secondary (MES HSS) in `src/data/education.ts`.
- **Projects (8 projects)**: All descriptions, tags, and repo/live links in `src/data/projects.ts`.
- **Achievements (2 awards)**: Google Build with AI 2026 winner & WEBATHON 2025 2nd Prize in `src/data/achievements.ts`.
- **Work Experience (2 roles)**: Software Engineering Intern (Torcue Digital) & Research Intern (Suvidha Foundation) in `src/data/experience.ts`.
- **Leadership Roles (7 positions)**: Co-CFO IEDC, Webmaster IEEE IAS, Webmaster IEEE CS, Design Lead JC, Learning Coordinator TinkerHub, Team Member NEST, NSS Volunteer Leader in `src/data/leadership.ts`.
- **Technical Skills (24 skills across 4 tracks)**: Frontend, Backend, AI/Data, and Design/Tools in `src/data/skills.ts`.
- **Clubs & Communities**: 11 IEEE societies & 4 student developer groups in `src/data/clubs.ts`.
- **Hackathons & Events**: 27+ events grouped by 7 institutions in `src/data/events.ts`.
- **Certifications & Languages**: 3 formal certifications, 4 languages, and all 23 certificate cards in `src/data/certificates.ts`.

---

## 4. Asset Audit & Inventory Findings

All **45 binary files** were audited and mapped:
- **Resume PDF**: `images/Resume/Muhammed Sinan M.pdf` (mirrored in `public/assets/documents/resume/muhammed-sinan-resume.pdf`).
- **Brand Assets**: `og-image.jpg`, `apple-touch-icon.png`, `favicon.ico`.
- **Profile Picture**: `bg-removed-black&white-pfp.webp`.
- **8 Project Images**: All 8 project webps in `public/assets/images/projects/` and `public/images/project-images/`.
- **10 Certificate Thumbnails**: All 10 webps in `public/assets/images/certificates/` and `public/images/certs/`.
- **23 Certificate Documents**: 10 PDFs and 13 WebPs in `public/assets/documents/certificates/` and `public/images/certificates/`.

### Unused Assets Check
Every single binary asset in the repository is actively referenced by either the typed data layer, metadata API, or certificate gallery. **Zero orphaned assets were found.** Both the clean kebab-case paths (`/assets/...`) and the original legacy paths (`/images/...`) are populated in `public/` so that no legacy bookmarks or links break.

---

## 5. Decisions Left for You (Next Redesign Phase)

Now that the codebase is completely modular, typed, and clean, here are a few design decisions you can make when you start the visual redesign:

1. **Card Layout & Typography**:
   - The design tokens in `src/styles/tokens.css` let you adjust color accents (currently `#E54D2E` red/orange and `#c9a84c` gold) or container widths in one place.
2. **Project Card Redesign**:
   - `src/components/sections/ProjectsSection.tsx` is completely self-contained and consumes `PROJECTS` from `src/data/projects.ts`. You can rewrite this component freely without affecting any other part of the site.
3. **Section Visibility**:
   - In `src/data/sections-config.ts`, you can toggle any section off (e.g., `enabled: false`) while redesigning or testing new sections.
4. **Custom Domain on Vercel**:
   - The configuration in `vercel.json` already contains security headers and the `/resume` redirect. Connect your custom domain `muhammedsinan.in` in your Vercel dashboard when you are ready to push.
