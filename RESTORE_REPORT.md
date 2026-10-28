# Portfolio Restoration Report: Original Design & Behavior Fidelity

**Branch:** `fix/restore-original-design`  
**Reference Commit:** `183245f9f47bd4d91474537a5d0f10532f3b4552` ("feat: implement accordion gallery, update project feed animation, and refresh portfolio meta/JSON-LD data.")  
**Completed:** October 15, 2026

---

## 1. Executive Summary

This restoration project successfully returned Muhammed Sinan M's personal portfolio website from an incomplete Next.js + Tailwind rewrite back to its original design, typography, layout, CSS styling, and GSAP-powered interaction behavior from commit `183245f`. The React and Next.js 16 framework structure was retained, but all UI components, styles, CSS classes, DOM structures, scripts, and animation engines were restored to be verbatim identical to the production Vite/vanilla implementation.

---

## 2. Core Restorations

### 2.1 Design System & Typography
- **Stylesheets Restored:** `src/styles/Style.css` and `src/styles/accordion-gallery.css` restored verbatim from commit `183245f`.
- **CSS Variables & Tokens:** `src/styles/tokens.css` restored with verbatim values:
  - `--bg-color: #111111`
  - `--text-primary: #ffffff`
  - `--text-secondary: #999999`
  - `--accent-red: #E54D2E`
  - `--font-heading: 'General Sans', sans-serif`
  - `--font-body: 'Space Grotesk', sans-serif`
- **Typography:** Linked Fontshare stylesheet (`General Sans 500` & `Space Grotesk 300, 400`) in `src/app/layout.tsx`.
- **Global Styles:** `src/styles/globals.css` updated to load `tokens.css`, `Style.css`, and `accordion-gallery.css`.

### 2.2 Global Interactive UI Primitives
- **Custom Cursor (`src/components/ui/CustomCursor.tsx`):**
  - Restored `#cursorDot` element with `mix-blend-mode: difference`.
  - Added smooth mouse-tracking and hover state scaling (`.cursor-hover`) on interactive elements (`a, button, [role="button"], .split-card, .ag-panel, .cert-card`).
  - Disabled on touch devices.
- **Click Sparks (`src/components/ui/ClickSpark.tsx`):**
  - Full-screen fixed canvas rendering 8-spark radial bursts on user clicks with ease-out physics.
- **Dot Field Canvas (`src/components/ui/DotField.tsx`):**
  - Canvas dot grid with mouse proximity bulge effect and radial glowing SVG circle behind the hero pfp.
- **Global Interactions & Reveals (`src/components/ui/GlobalEffects.tsx`):**
  - GSAP ScrollTrigger reveals for `.reveal-text` (fade up 50px), `.reveal-block` (fade up 35px), and `.reveal-stagger` (staggered -25px slide).
  - Continuous SVG circle scrubbed rotation (`.scroll-circle-svg` rotates 720deg across page scroll).
  - Magnetic button attraction effect (`.magnetic-btn`, `nav a`, `.cta-btn`, `.social-pill`).
  - 3D card perspective tilt with dynamic shine highlight coords (`--mx`, `--my`).
  - Button radial glow cursor tracking (`--x`, `--y`).
  - Back-to-top floating button (`#back-to-top`) with smooth scroll to top.

### 2.3 Navigation & Header
- **Desktop Navigation (`src/components/layout/Navbar.tsx`):**
  - Fixed top `.premium-nav` with anchor links (`About`, `Projects`, `Experience`, `Certifications`, `Resume`, `Let's Talk!`).
  - IntersectionObserver triggers `.nav-glass` morph when scrolling past the hero.
- **Staggered Mobile Menu Drawer (`src/components/layout/Navbar.tsx`):**
  - Full GSAP timeline with two staggered background prelayers (`#111111`, `#222222`).
  - Staggered panel item reveal with zero-padded numbering (`01` through `11`).
  - Social footer links inside drawer.
  - Morphing hamburger icon that transitions to an animated cross (`.sm-icon-line-v`).

### 2.4 Restored Sections & Interaction Engines
1. **Hero Section (`src/components/sections/HeroSection.tsx`):**
   - Canvas `DotField`, social icon links, role badges.
   - Character scramble typewriter effect for "Muhammed" and "Sinan M".
   - Parallax scrolling on hero profile photo and name titles.
   - Rotating SVG scroll circle with "SCROLL • EXPLORE •".
2. **About Section (`src/components/sections/AboutSection.tsx`):**
   - Character-by-character scroll fill animation (`span.char`, `char--lit`, `char--key`) running via RAF and IntersectionObserver.
3. **Stats Section (`src/components/sections/StatsSection.tsx`):**
   - `.stats-strip-section` with cubic-eased count-up animation upon scroll entrance.
4. **Featured Projects Accordion Gallery (`src/components/sections/FeaturedSection.tsx`):**
   - Verbatim `AccordionGallery` on `#testimonials-accordion`.
   - 5 full project panels with GSAP expand, 3D tilt, parallax image movement, overlay transitions, and quotes.
5. **Journey Timeline (`src/components/sections/JourneySection.tsx`):**
   - Multi-column horizontal timeline track spanning years `2026` to `2021`.
   - 3D perspective card transformation on scroll.
   - Previous and Next scroll navigation buttons.
6. **Education Section (`src/components/sections/EducationSection.tsx`):**
   - `.timeline` layout with B.Tech in CSE and Higher Secondary items.
7. **Projects Section (`src/components/sections/ProjectsSection.tsx`):**
   - Dealt-deck card stack with GSAP ScrollTrigger pinning on desktop.
   - Clean scroll feed on mobile with IntersectionObserver reveals.
   - All 8 projects: AvenWing, UniversityHub, SilentGuard, Next-Gen AI Assistant, CodeBurry, Parackal Travel Hub, AI Voice Assistant, Pylon.
8. **Achievements Section (`src/components/sections/AchievementsSection.tsx`):**
   - Original achievement cards including Google Build with AI 2026 Hackathon winner card with live verification link.
9. **Experience Section (`src/components/sections/ExperienceSection.tsx`):**
   - Software Engineering Intern at Torcue Digital and Research Intern at Suvidha Foundation.
   - Certificate modal/preview link.
10. **Leadership Section (`src/components/sections/LeadershipSection.tsx`):**
    - 7 leadership roles with dates, positions, and institutions.
11. **Skills Section (`src/components/sections/SkillsSection.tsx`):**
    - 3D Marquee Skills Section with 4 continuous vertical scrolling tracks and all original SVG icons.
12. **Clubs & Organizations (`src/components/sections/ClubsSection.tsx`):**
    - Accordion dropdown buttons toggling `.active` for IEEE Memberships and Communities.
13. **Hackathons & Events (`src/components/sections/EventsSection.tsx`):**
    - Accordion dropdown buttons toggling `.active` for 7 institutions (CCE, VIT Vellore, Rajagiri, NIT Calicut, IIT Hyderabad/Tech Maghi, NSS Palakkad, K-DISC) and all respective event results.
14. **Certifications & Languages (`src/components/sections/CertificationsSection.tsx`):**
    - Grid layout for formal certifications and spoken languages.
    - Description paragraph.
15. **Certificate Gallery Showcase (`src/components/sections/CertificateGallerySection.tsx`):**
    - Infinite 3D Coverflow carousel (`#fan-carousel`).
    - Rotating SVG scroll circle.
    - Cloned prepend and append sets for seamless loop.
    - Teleporting infinite scroll guard (`guardInfinite`).
    - 3D perspective transform math (`perspective(1400px) rotateY(...) scale(...) translateZ(...) brightness(...)`).
    - Mouse drag-to-scroll with grabbing cursor and drag distance threshold to distinguish clicks from drags.
    - Touch swipe interaction.
    - Vertical mouse wheel scroll hijack.
    - Auto-scroll RAF loop with pause on hover/interaction.
    - All 23 certificate cards with high-resolution thumbnails and direct document view links.
16. **Contact Section (`src/components/sections/ContactSection.tsx`):**
    - `#contact-cta` with call-to-action button, avatar profile pill, and social links.
17. **Footer (`src/components/sections/Footer.tsx`):**
    - `.site-footer` with 3 columns: identity/contact details (email, location, phone), quick links, social links, and "Print Portfolio" trigger (`window.print()`).
    - `.footer-bottom` with `.copyright-pulse`.

### 2.5 Routing & Metadata
- `/resume` redirect verified in `src/app/resume/route.ts`, `next.config.ts`, and `vercel.json` pointing to `/images/Resume/Muhammed Sinan M.pdf`.
- Complete JSON-LD structured data (`ProfilePage`, `Person`, `WebSite`) restored in `src/app/layout.tsx`.
- OpenGraph and Twitter meta tags preserved.

---

## 3. Verification Record

- **TypeScript Compilation:**
  ```bash
  $ npx tsc --noEmit
  # Exited with code 0 (zero errors)
  ```
- **ESLint Validation:**
  ```bash
  $ npm run lint
  # Exited with code 0 (zero errors, 2 standard Next.js image warnings)
  ```
- **Next.js Production Build:**
  ```bash
  $ npm run build
  ▲ Next.js 16.4.1 (Turbopack)
  ✓ Compiled successfully in 365ms
  ✓ Generated static pages (6/6)
  ```
- **Routes Generated:**
  - `○ /` (Static homepage)
  - `○ /_not-found` (Static 404 page)
  - `ƒ /resume` (Dynamic server-rendered redirect)
  - `○ /robots.txt`
  - `○ /sitemap.xml`
