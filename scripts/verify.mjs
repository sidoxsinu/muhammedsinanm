/**
 * Comprehensive End-to-End Test Suite for Portfolio
 * Validates routes, responsive layouts, images, interactions, and SEO.
 * Run with: npm test (or node scripts/verify.js)
 */

import http from 'http';
import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';
const VIEWPORTS = [
  { name: 'Mobile Narrow (360x740)', width: 360, height: 740 },
  { name: 'Mobile Standard (375x667)', width: 375, height: 667 },
  { name: 'Tablet (768x1024)', width: 768, height: 1024 },
  { name: 'Desktop (1440x900)', width: 1440, height: 900 },
];

const PAGES = ['/', '/projects', '/about', '/credentials', '/contact'];

async function isServerRunning(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const req = http.request(
        {
          hostname: parsed.hostname,
          port: parsed.port || 80,
          path: '/',
          method: 'GET',
          timeout: 2000,
        },
        (res) => resolve(res.statusCode >= 200 && res.statusCode < 500),
      );
      req.on('error', () => resolve(false));
      req.on('timeout', () => {
        req.destroy();
        resolve(false);
      });
      req.end();
    } catch {
      resolve(false);
    }
  });
}

(async () => {
  console.log('🚀 Running Portfolio Verification Suite...');
  console.log(`Target URL: ${BASE_URL}\n`);

  const serverReady = await isServerRunning(BASE_URL);
  if (!serverReady) {
    console.error(`❌ Server is not reachable at ${BASE_URL}.`);
    console.error(
      `Please run "npm run build && npm run start" or "npm run dev" before running tests.`,
    );
    process.exit(1);
  }

  const browser = await chromium.launch();
  let testFailures = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`❌ FAIL: ${message}`);
      testFailures++;
    } else {
      console.log(`✅ PASS: ${message}`);
    }
  }

  try {
    // ----------------------------------------------------
    // SUITE 1: ROUTE STATUS & METADATA
    // ----------------------------------------------------
    console.log('--- SUITE 1: ROUTE STATUS & CORE METADATA ---');
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    const consoleErrors = [];
    const failedRequests = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error' && !msg.text().includes('404')) {
        consoleErrors.push({ url: page.url(), text: msg.text() });
      }
    });

    page.on('response', (response) => {
      if (response.status() >= 400 && !response.url().includes('non-existent-page-xyz')) {
        failedRequests.push({ url: response.url(), status: response.status() });
      }
    });

    for (const route of PAGES) {
      const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      assert(res.status() === 200, `Route ${route} returns HTTP 200`);

      const title = await page.title();
      assert(title.length > 5, `Route ${route} has descriptive title ("${title}")`);

      // Verify images loaded on page (scroll down to trigger lazy-loaded images)
      await page.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 600));
        window.scrollTo(0, 0);
      });

      const images = await page.$$eval('img', (imgs) =>
        imgs.map((img) => ({
          src: img.src,
          complete: img.complete,
          naturalWidth: img.naturalWidth,
        })),
      );
      for (const img of images) {
        assert(
          img.complete && img.naturalWidth > 0,
          `Image rendered (${img.naturalWidth}px): ${img.src}`,
        );
      }
    }

    // ----------------------------------------------------
    // SUITE 2: SEO INFRASTRUCTURE (ROBOTS & SITEMAP)
    // ----------------------------------------------------
    console.log('\n--- SUITE 2: SEO INFRASTRUCTURE (ROBOTS & SITEMAP) ---');
    const robotsRes = await page.goto(`${BASE_URL}/robots.txt`);
    assert(robotsRes.status() === 200, '/robots.txt returns HTTP 200');
    const robotsText = await robotsRes.text();
    assert(robotsText.includes('sitemap.xml'), 'robots.txt includes sitemap.xml reference');

    const sitemapRes = await page.goto(`${BASE_URL}/sitemap.xml`);
    assert(sitemapRes.status() === 200, '/sitemap.xml returns HTTP 200');
    const sitemapText = await sitemapRes.text();
    assert(
      sitemapText.includes('/projects') && sitemapText.includes('/credentials'),
      'sitemap.xml lists key routes',
    );

    // ----------------------------------------------------
    // SUITE 3: BRANDED 404 PAGE
    // ----------------------------------------------------
    console.log('\n--- SUITE 3: CUSTOM BRANDED 404 PAGE ---');
    const notFoundRes = await page.goto(`${BASE_URL}/non-existent-page-xyz`);
    assert(notFoundRes.status() === 404, 'Non-existent route returns HTTP 404');
    const notFoundText = await page.textContent('body');
    assert(notFoundText.includes('Page Not Found'), '404 page renders branded heading');
    const returnHomeBtn = await page.$('a[href="/"]');
    assert(returnHomeBtn !== null, '404 page provides return home link');

    // ----------------------------------------------------
    // SUITE 4: RESUME DOWNLOAD ROUTE
    // ----------------------------------------------------
    console.log('\n--- SUITE 4: RESUME DOWNLOAD ROUTE ---');
    const [download] = await Promise.all([
      page.waitForEvent('download', { timeout: 5000 }).catch(() => null),
      page.goto(`${BASE_URL}/resume`).catch(() => null),
    ]);
    if (download) {
      assert(
        download.suggestedFilename().endsWith('.pdf'),
        `Resume download serves valid PDF (${download.suggestedFilename()})`,
      );
    } else {
      assert(page.url().includes('.pdf'), '/resume serves or redirects to PDF resume file');
    }

    // ----------------------------------------------------
    // SUITE 5: INTERACTIVE TABS & CONTROLS
    // ----------------------------------------------------
    console.log('\n--- SUITE 5: INTERACTIVE TABS & CONTROLS ---');
    // Projects filter
    await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle' });
    const allCardsCount = (await page.$$('article[data-testid="project-card"]')).length;
    assert(allCardsCount >= 9, `Projects catalog renders all projects (found: ${allCardsCount})`);

    const freelanceBtn = await page.$('button:has-text("Freelance")');
    if (freelanceBtn) {
      await freelanceBtn.click();
      await page.waitForTimeout(200);
      const freelanceCount = (await page.$$('article[data-testid="project-card"]')).length;
      assert(
        freelanceCount === 2,
        `Freelance filter displays exactly 2 client deliverables (found: ${freelanceCount})`,
      );
    }

    // About page tabs
    await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
    const expTab = await page.$('button:has-text("Work Experience")');
    if (expTab) {
      await expTab.click();
      await page.waitForTimeout(200);
      const content = await page.textContent('body');
      assert(
        content.includes('Torcue Digital'),
        'About Work Experience tab displays Torcue Digital',
      );
    }

    // Credentials page tabs
    await page.goto(`${BASE_URL}/credentials`, { waitUntil: 'networkidle' });
    const certsTab = await page.$('button:has-text("Certifications")');
    if (certsTab) {
      await certsTab.click();
      await page.waitForTimeout(200);
      const certCount = (
        await page.$$('a[href*="/images/certificates/"], a[href*="/images/certs/"]')
      ).length;
      assert(certCount >= 10, `Certifications grid renders credentials (found: ${certCount})`);
    }

    // ----------------------------------------------------
    // SUITE 6: RESPONSIVE OVERFLOW & MOBILE DRAWER
    // ----------------------------------------------------
    console.log('\n--- SUITE 6: RESPONSIVE LAYOUT & ZERO OVERFLOW ---');
    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const route of PAGES) {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
        const hasOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth + 1;
        });
        assert(!hasOverflow, `Zero horizontal overflow on [${vp.name}] ${route}`);
      }
    }

    // Test Mobile Hamburger Drawer on 375px
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const toggle = await page.$('.sm-toggle');
    assert(toggle !== null, 'Mobile hamburger toggle rendered on mobile');
    if (toggle) {
      await toggle.click();
      await page.waitForTimeout(600);
      const drawerLinks = await page.$$('.sm-panel-item');
      assert(
        drawerLinks.length >= 5,
        `Mobile drawer opened with links (found: ${drawerLinks.length})`,
      );
    }

    // ----------------------------------------------------
    // SUITE 7: CONSOLE ERRORS & NETWORK AUDIT
    // ----------------------------------------------------
    console.log('\n--- SUITE 7: LOGS & NETWORK AUDIT ---');
    assert(
      consoleErrors.length === 0,
      `Zero browser console errors (found: ${consoleErrors.length})`,
    );
    assert(
      failedRequests.length === 0,
      `Zero failed network requests (found: ${failedRequests.length})`,
    );

    await context.close();
  } finally {
    await browser.close();
  }

  console.log('\n======================================================');
  if (testFailures === 0) {
    console.log('🎉 ALL TEST SUITES PASSED CLEANLY WITH ZERO ERRORS!');
    console.log('======================================================\n');
    process.exit(0);
  } else {
    console.error(`❌ VERIFICATION FAILED WITH ${testFailures} FAILURE(S).`);
    console.log('======================================================\n');
    process.exit(1);
  }
})();
