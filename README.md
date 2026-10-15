# 🚀 Muhammed Sinan M — Personal Portfolio

> Modern, high-performance source code for my personal portfolio website ([muhammedsinan.in](https://muhammedsinan.in)). Built with semantic HTML5, Vanilla CSS3, modern modular JavaScript, GSAP animations, and powered by Vite for development and production bundling.

---

## 🧑‍💻 Owner / Profile

| Field        | Value                                                           |
| ------------ | --------------------------------------------------------------- |
| **Name**     | Muhammed Sinan M                                                |
| **Role**     | Computer Science Student · Full-Stack Developer · AI Enthusiast   |
| **Location** | Irinjalakuda, Kerala, India                                     |
| **Email**    | [muhammedsinan.m67@gmail.com](mailto:muhammedsinan.m67@gmail.com) |
| **Phone**    | +91 85905 68566                                                 |
| **Contact**  | [https://contact.muhammedsinan.in](https://contact.muhammedsinan.in) |

### Social Links
| Platform   | URL                                          |
| ---------- | -------------------------------------------- |
| GitHub     | [github.com/sidoxsinu](https://github.com/sidoxsinu) |
| LinkedIn   | [linkedin.com/in/sidoxsinu](https://www.linkedin.com/in/sidoxsinu/) |
| X / Twitter| [x.com/sidoxsinu](https://x.com/sidoxsinu)   |
| Instagram  | [instagram.com/sidoxsinu](https://www.instagram.com/sidoxsinu) |

---

## ⚡ Quick Start & Development

This repository uses **Vite** for high-speed local development, instant Hot Module Reloading (HMR), and production bundling.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Starts the local development server at `http://localhost:3000/` with instant live-reload on code changes.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized, production-ready build in `dist/`. All assets, images, PDFs, certificates, and metadata (`robots.txt`, `sitemap.xml`) are bundled and verified.

### 4. Preview Production Build
```bash
npm run preview
```
Spins up a local HTTP server at `http://localhost:4173/` serving the compiled `dist/` directory.

---

## 🗂️ Clean Project Structure

```
cv/
├── index.html                 # Semantic entry HTML — clean structure & JSON-LD
├── vite.config.js             # Vite configuration + static asset copy plugin
├── package.json               # Project manifest, npm scripts, and devDependencies
├── package-lock.json          # Dependency lockfile
├── vercel.json                # Vercel deployment headers, cache control & redirects
├── robots.txt                 # Search engine crawler instructions
├── sitemap.xml                # SEO sitemap
├── favicon.ico                # Root site favicon
│
├── css/
│   ├── Style.css              # Main design system, typography, layout & animations
│   └── accordion-gallery.css  # Styles for the featured projects accordion gallery
│
├── js/
│   ├── animations.js          # Core animations (scroll reveals, tilt, hero entrance, cursor, card pile)
│   ├── carousel-3d.js         # Infinite 3D certificate coverflow, carousel 3D, timeline & back-to-top
│   ├── accordion-gallery.js   # Interactive featured projects accordion component
│   ├── dot-field.js           # Canvas interactive dot grid background with cursor bulge
│   ├── staggered-menu.js      # Staggered slide-in navigation overlay
│   └── click-spark.js         # Click spark particle micro-interaction
│
└── images/
    ├── apple-touch-icon.png   # Apple touch bookmark icon
    ├── og-image.jpg           # OpenGraph social preview card image
    ├── Resume/                # Muhammed Sinan M.pdf
    ├── profile-picture/       # High-res profile image (transparent background)
    ├── project-images/        # High-res WebP project showcases
    ├── certificates/          # High-res certificate PDFs & awards
    └── certs/                 # Optimized certificate thumbnail WebPs
```

---

## 🛠️ Technology Stack

### Frontend Core
| Technology     | Version / Engine       | Purpose                                                 |
| -------------- | ---------------------- | ------------------------------------------------------- |
| **HTML5**      | Semantic HTML5         | Accessible layout, microdata & JSON-LD metadata         |
| **CSS3**       | Vanilla CSS + Tokens   | Responsive layouts, fluid typography, glassmorphism     |
| **JavaScript** | Modern ES6+ Modules    | Modular, event-driven interactions and micro-animations |
| **Vite**       | v8.x                   | Next-gen frontend dev server & production bundler      |

### External Libraries (CDN)
| Library               | Source                                                 | Purpose                              |
| --------------------- | ------------------------------------------------------ | ------------------------------------ |
| **GSAP 3**            | `cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js`          | Core animation timeline engine       |
| **GSAP ScrollTrigger**| `cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js` | Scroll-linked pinning and parallax   |

### Typography (Google Fontshare API)
| Font             | Weights   | Usage                        |
| ---------------- | --------- | ---------------------------- |
| **General Sans** | 500       | Headings (`--font-heading`)  |
| **Space Grotesk**| 300, 400  | Body text (`--font-body`)    |

### Hosting & Deployment
- Production deployment on **Vercel** with custom security headers, long-lived asset caching, and `/resume` redirect.
- Fully compatible with static web servers, Cloudflare Pages, GitHub Pages, or Netlify.

---

## 🎨 Design System & Palette

| Variable           | Hex / Value                    | Usage                                              |
| ------------------ | ------------------------------ | -------------------------------------------------- |
| `--bg-color`       | `#111111`                      | Main page background (soft dark premium)           |
| `--text-primary`   | `#ffffff`                      | Headings and primary copy                          |
| `--text-secondary` | `#999999`                      | Subtitles and metadata                             |
| `--accent-red`     | `#E54D2E`                      | Highlight keywords, timeline markers, badges       |
| Accent Orange      | `#E8562A`                      | Quote sources, active dots, button hover rings     |
| Card Dark Bg       | `#1a1a1a`                      | Cards, modal surfaces, dropdowns                   |
| Card Darker Hover  | `#222222`                      | Hover states and elevation                         |
| Gold Accent        | `#c9a84c`                      | Featured project badge & award highlight border    |

---

## 🧩 JavaScript Architecture & Modules

The codebase separates concerns into focused, independent modules in `js/`:

1. **`js/animations.js`**
   - **Hero Entrance**: Scramble typewriter effect on initial load, staggered social links, role pill reveals.
   - **LCP Optimization**: Deferred `will-change: transform` to prevent delaying Chrome's Largest Contentful Paint.
   - **Scroll Reveals**: GSAP ScrollTrigger reveals for text (`.reveal-text`), cards (`.reveal-block`), and list items (`.reveal-stagger`).
   - **3D Card Tilt**: Mouse-following 3D perspective rotation with dynamic cursor shine reflection (`.tilt-shine`).
   - **Magnetic Cursor**: Custom cursor dot with difference blending and expanding hover aura.
   - **Letter-by-Letter Text Fill**: Character-by-character color fill on the About section based on viewport scroll progress.
   - **Dealt Deck Card Pile**: Cards smoothly drop into an overlapping stack on desktop; transitions to fluid vertical stream on mobile.
   - **Glassmorphism Nav**: Morphing navigation bar that converts into a floating frosted glass pill after scrolling past the hero.

2. **`js/carousel-3d.js`**
   - **Infinite 3D Coverflow**: Cloned set architecture for 23 certificate cards with perspective rotation (`perspective(1400px) rotateY()`), drag-to-scroll, and auto-scroll.
   - **Timeline Scrolling**: Horizontal step navigation controls for Journey timeline.
   - **Generic Carousels**: 3D rotation and responsive prev/next stepping for event carousels.
   - **Button Glow Tracking**: Radial gradient tracking on hover for interactive buttons.
   - **Back to Top**: Smooth scroll button with scroll-depth trigger.

3. **`js/accordion-gallery.js`**
   - Vanilla JS accordion gallery for featured projects with tilt parallax, expanding panels, and touch/click triggers.

4. **`js/dot-field.js`**
   - Canvas-based interactive particle dot grid with responsive cursor bulging and radial light glow.

5. **`js/staggered-menu.js`**
   - Multi-layer staggered slide-in navigation overlay with animated hamburger toggle and custom timing curves.

6. **`js/click-spark.js`**
   - Canvas click particle burst system adding subtle micro-sparks on click interactions.

---

## 📱 Mobile vs Desktop Optimizations

- **Adaptive Card Piles**: On desktop, cards drop from top with a spring bounce into a dealt-deck pile. On mobile, cards render in an organic feed with `IntersectionObserver` reveals to prevent layout pinning.
- **Touch-Friendly Controls**: Touch events (`touchstart`, `touchmove`, `touchend`) for all 3D carousels and timelines with drag suppression safeguards.
- **Hardware Acceleration**: `will-change` hints are applied during active interactions and removed when idle to preserve mobile battery and memory.
- **Responsive Typography**: Fluid scaling via CSS `clamp()` ensuring readability across phones, tablets, and ultrawide monitors.

---

## 🌐 SEO & Verification

- **Semantic Markup**: Proper heading hierarchy (`<h1>` through `<h4>`), `<nav>`, `<main>`, `<section>`, and `<footer>`.
- **JSON-LD Schema**: Embedded `Person` and `ProfilePage` structured data for search engine knowledge graphs.
- **OpenGraph & Twitter Cards**: High-resolution social preview image (`og-image.jpg`) and descriptive tags.
- **Fast Asset Delivery**: Next-gen WebP images with `loading="lazy"` and asynchronous font loading.

---

## 📄 License & Copyright

Source code and design © Muhammed Sinan M. Licensed under the [MIT License](LICENSE).
