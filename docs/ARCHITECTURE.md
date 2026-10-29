# Architecture & Engineering Guide

This document outlines the architectural principles, component structure, data models, styling tokens, and interaction engines powering **Muhammed Sinan M's Personal Portfolio** ([muhammedsinan.in](https://muhammedsinan.in)).

---

## 1. High-Level Architectural Overview

The application is built on **Next.js 16 (App Router)** with **React 19**, **TypeScript**, and **Tailwind CSS v4**. It follows a strictly decoupled architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                       Next.js App Router                    │
│   /  •  /projects  •  /about  •  /credentials  •  /contact  │
│                     /resume  •  404                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
   ┌───────────────────────────┐ ┌───────────────────────────┐
   │    Modular UI & Layout    │ │     Typed Data Layer      │
   │  - PageShell              │ │  - src/data/*.ts          │
   │  - SpotlightCard          │ │  - Fully decoupled        │
   │  - Tabs & Badges          │ │  - Single source of truth │
   │  - Custom Cursor & Canvas │ └───────────────────────────┘
   └────────────┬──────────────┘
                │
                ▼
   ┌───────────────────────────┐
   │       Design System       │
   │  - Tailwind CSS v4        │
   │  - tokens.css (#111111)   │
   │  - #E8562A Orange Accent  │
   └───────────────────────────┘
```

### Key Engineering Goals

- **Zero Layout Shift (CLS = 0)**: Viewport-proportional heights, explicit image dimensions, and font-display optimization.
- **Strict Decoupling**: Content is completely separated from presentational components via typed data structures in `src/data/`.
- **Zero Horizontal Overflow**: Verified across screen widths from 360px up to 4K resolutions.
- **Accessibility & Motion Safety**: Respects `prefers-reduced-motion` at both CSS and JavaScript levels, with full keyboard navigability and ARIA tags.

---

## 2. Route Directory & Page Models

| Route          | Purpose                          | Architecture Pattern                                                                                     | Data Dependencies                                                        |
| :------------- | :------------------------------- | :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `/`            | **Home & Overview**              | Hybrid Static & Interactive (Hero, Stats, Featured 4 Projects, Skills Hub, Work Experience, Contact CTA) | `PROFILE`, `STATS`, `PROJECTS`, `SKILLS`, `EXPERIENCES`                  |
| `/projects`    | **Full Project Catalog**         | Category Filtered Grid with real-time reactive counts (`all`, `freelance`, `ai`, `web`)                  | `PROJECTS`                                                               |
| `/about`       | **Comprehensive Bio & Career**   | Multi-Tab Interface (Bio/Overview, Work Experience, Career Journey Timeline, Leadership Roles)           | `PROFILE`, `EDUCATION_DATA`, `EXPERIENCES`, `JOURNEY_DATA`, `LEADERSHIP` |
| `/credentials` | **Honors, Certs & Competitions** | Multi-Tab Showcase (Awards, Interactive Certifications Modal, Hackathons, Student Clubs)                 | `ACHIEVEMENTS`, `CERTIFICATE_CARDS`, `EVENTS`, `CLUBS`                   |
| `/contact`     | **Contact & Inquiries**          | Direct Email, One-Click Clipboard Copy with Feedback, Social Badges                                      | `PROFILE`, `SOCIAL_LINKS`                                                |
| `/resume`      | **Direct Resume Stream**         | Streaming Next.js Route Handler serving `Muhammed Sinan M.pdf`                                           | `public/images/Resume/Muhammed Sinan M.pdf`                              |
| `/*` (404)     | **Branded Not Found**            | Error boundary matching dark theme with return-home CTA                                                  | Core Layout                                                              |

---

## 3. Component Hierarchy

### UI Primitives (`src/components/ui/`)

All UI primitives are reusable across all pages:

- **`PageShell`**: Standardizes page structure, top padding (navbar offset), max width (`max-w-6xl` or `max-w-5xl`), responsive horizontal gutters, page header, and footer.
- **`PageHeader`**: Renders section mono badge (`// Category`), large display heading, and contextual lead text.
- **`SpotlightCard`**: Interactive card with mouse-tracking radial gradient glow, subtle border transition (`var(--accent-orange)`), and GPU-accelerated elevation on hover.
- **`Tabs`**: Accessible pill tab list with active pill background glow, keyboard support, and optional count badges.
- **`Badge`**: Pill tags supporting `orange`, `dark`, `outline`, and `subtle` variants.
- **`Button`**: Polymorphic component rendering either an accessible HTML `<button>` or a Next.js `<Link>` / `<a>` depending on `href`.
- **`SectionHeading`**: Standard section header with badge, heading, description, and optional link.
- **`ProjectCard`**: Full project article card featuring 16:10 preview image, year badge, tags, GitHub repository link, and live URL.

### Interactive Visual Effects

- **`DotField`**: Interactive HTML5 Canvas rendering a subtle, glowing particle matrix behind the hero that gently bulges based on cursor proximity.
- **`ClickSpark`**: Lightweight canvas particle system that emits ease-out sparks on mouse clicks.
- **`CustomCursor`**: Desktop cursor follower with blend-mode inversion and scale-up transitions over clickable targets.
- **`GlobalEffects`**: GSAP ScrollTrigger orchestration for scroll reveals, magnetic button physics, and back-to-top button visibility.

---

## 4. Typed Data Layer (`src/data/`)

Every content entity has an explicit TypeScript interface in `src/types/index.ts`:

```typescript
// Core Data Schema Mapping
export interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  tags: string[];
  links: { live?: string; repo?: string };
  image: string;
  featured?: boolean;
  badge?: string;
  recognition?: { text: string; links?: { label: string; url: string }[] };
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  badge?: string;
  description?: string;
  companyUrl?: string;
  verifyUrl?: string;
  certificateImage?: string;
}
```

Updating content requires zero modifications to JSX or component logic—simply update the respective file in `src/data/`.

---

## 5. Design System & Theme Tokens

The design tokens are defined in [`src/styles/tokens.css`](file:///Users/sinanm/Documents/My%20Projects/cv/src/styles/tokens.css) and registered in [`src/styles/globals.css`](file:///Users/sinanm/Documents/My%20Projects/cv/src/styles/globals.css):

| Token                 | CSS Variable       | Hex / RGBA Value            | Purpose                            |
| :-------------------- | :----------------- | :-------------------------- | :--------------------------------- |
| **Canvas Background** | `--bg-color`       | `#111111`                   | Primary deep black canvas          |
| **Card Background**   | `--bg-card`        | `#1a1a1a`                   | Elevated card surface              |
| **Brand Orange**      | `--accent-orange`  | `#e8562a`                   | Primary CTA, highlight, and accent |
| **Primary Text**      | `--text-primary`   | `#ffffff`                   | Headings, active states            |
| **Secondary Text**    | `--text-secondary` | `#999999`                   | Paragraphs, labels                 |
| **Subtle Border**     | `--border-subtle`  | `rgba(255, 255, 255, 0.08)` | Card borders, dividers             |

---

## 6. Testing & Quality Assurance

The project includes an end-to-end verification suite in `scripts/verify.mjs` powered by Playwright:

```bash
# Run the complete test suite
npm test
```

### Verified Criteria:

1. **HTTP Status**: All routes return HTTP 200 (or HTTP 404 for missing paths).
2. **Metadata Integrity**: Title, OpenGraph tags, JSON-LD schema, and favicon presence.
3. **Responsive No-Overflow**: Evaluates `document.documentElement.scrollWidth <= window.innerWidth` across 360px, 375px, 768px, and 1440px viewports.
4. **Media Validation**: Verifies every rendered `<img>` has `naturalWidth > 0` (zero broken images).
5. **Interactive Controls**: Tests category filter tabs, mobile navigation drawer, and copy-to-clipboard feedback.
6. **Zero Console Errors**: Ensures browser logs are completely clean.
