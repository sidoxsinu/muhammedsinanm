# Deployment & Production Operations Guide

This guide covers deployment procedures, Vercel configuration, domain routing, performance optimizations, and security headers for [muhammedsinan.in](https://muhammedsinan.in).

---

## 1. Quick Deploy to Vercel

The portfolio is optimized for automated CI/CD deployment on [Vercel](https://vercel.com).

### Prerequisites

- Node.js `>=20.0.0`
- Git repository pushed to GitHub (`development` or `main` branch)
- Vercel account with project linked

### Build Command & Settings

Vercel automatically detects Next.js:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node.js Version**: `20.x` (enforced via `.nvmrc`)

---

## 2. Vercel Configuration (`vercel.json`)

The [`vercel.json`](file:///Users/sinanm/Documents/My%20Projects/cv/vercel.json) file enforces security headers, immutable caching for static assets, and clean URL rewrites:

### Security Headers

- `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing.
- `X-Frame-Options: DENY`: Protects against clickjacking.
- `X-XSS-Protection: 1; mode=block`: Legacy XSS filter.
- `Referrer-Policy: strict-origin-when-cross-origin`: Controls referrer data.
- `Permissions-Policy`: Restricts camera, microphone, and geolocation access.

### Asset Caching

Static assets under `/assets/` and `/images/` are served with:

```http
Cache-Control: public, max-age=31536000, immutable
```

This ensures instant subsequent page loads and eliminates redundant data transfers.

---

## 3. Custom Domain Setup (`muhammedsinan.in`)

To configure your custom domain on Vercel:

1. Open your project in the **Vercel Dashboard** → **Settings** → **Domains**.
2. Add `muhammedsinan.in` and `www.muhammedsinan.in`.
3. Configure the following DNS records at your registrar (e.g. Cloudflare, Namecheap, Google Domains):

| Type      | Name  | Content / Value         | Proxy Status          |
| :-------- | :---- | :---------------------- | :-------------------- |
| **A**     | `@`   | `76.76.21.21`           | DNS only (or proxied) |
| **CNAME** | `www` | `cname.vercel-dns.com.` | DNS only              |

4. Vercel will automatically provision a free Let's Encrypt SSL/TLS certificate.

---

## 4. The `/resume` Download Route

The `/resume` endpoint serves the user's latest resume:

1. **Next.js Route Handler** in [`src/app/resume/route.ts`](file:///Users/sinanm/Documents/My%20Projects/cv/src/app/resume/route.ts) streams the PDF with proper `Content-Disposition: attachment; filename="Muhammed Sinan M.pdf"`.
2. **Next.js Config Fallback** in [`next.config.ts`](file:///Users/sinanm/Documents/My%20Projects/cv/next.config.ts) provides a 307 temporary redirect.
3. **Vercel Server Edge Rewrite** in [`vercel.json`](file:///Users/sinanm/Documents/My%20Projects/cv/vercel.json) provides static routing.

To update the resume:

- Replace the files in `public/images/Resume/Muhammed Sinan M.pdf` and `public/assets/documents/resume/muhammed-sinan-resume.pdf`.
- Re-run `npm run build`.

---

## 5. Pre-Deployment Verification Checklist

Before pushing to production, always run the full verification pipeline:

```bash
# 1. Type Check
npm run type-check

# 2. Linting
npm run lint

# 3. Production Build
npm run build

# 4. End-to-End Verification (in another terminal or background)
npm run start &
npm test
```
