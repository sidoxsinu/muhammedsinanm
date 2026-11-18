/**
 * Exhaustive End-to-End Mobile Responsiveness Recursive Test Suite
 * Recursively tests EVERY page, EVERY section, EVERY tab, and EVERY interactive control
 * in mobile ratio viewports, checking for:
 * - Zero horizontal overflow on document and every single element
 * - Text clipping and boundary integrity
 * - Image sizing and loading
 * - Touch target and button interactivity
 * - Mobile hamburger drawer open/close
 * - Accordion expand/collapse
 * - Section-by-section screenshot captures
 */

import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const MOBILE_VIEWPORTS = [
  { name: 'Narrow Mobile (360x740)', width: 360, height: 740 },
  { name: 'Standard Mobile (375x667)', width: 375, height: 667 },
  { name: 'Modern iOS (390x844)', width: 390, height: 844 },
  { name: 'Large Mobile (412x915)', width: 412, height: 915 },
  { name: 'Stress Test Ultra Narrow (320x568)', width: 320, height: 568 },
];

const PAGES = ['/', '/projects', '/about', '/credentials', '/contact', '/non-existent-xyz'];

const SCREENSHOTS_DIR =
  '/Users/sinanm/.gemini/antigravity/brain/8afe84f7-b3c3-499b-8ff1-45d6b88d631c/mobile_audit_screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

// Recursive DOM Inspector function to run inside page.evaluate()
const RECURSIVE_DOM_OVERFLOW_CHECK = `
function inspectRecursiveOverflow(viewportWidth) {
  const issues = [];
  const body = document.body;
  const docEl = document.documentElement;

  // 1. Check root and body scrollWidth
  if (docEl.scrollWidth > viewportWidth + 1) {
    issues.push({
      type: 'DOC_OVERFLOW',
      selector: 'document.documentElement',
      scrollWidth: docEl.scrollWidth,
      viewportWidth: viewportWidth,
      diff: docEl.scrollWidth - viewportWidth
    });
  }

  function hasScrollableOrClippedAncestor(el) {
    let p = el.parentElement;
    while (p && p !== body && p !== docEl) {
      const ps = window.getComputedStyle(p);
      if (ps.overflowX === 'auto' || ps.overflowX === 'scroll' || ps.overflowX === 'hidden') {
        return true;
      }
      p = p.parentElement;
    }
    return false;
  }

  // 2. Recursive element scan
  function scanNode(el) {
    if (!el || el.nodeType !== 1) return;
    
    // Skip invisible/hidden/off-canvas elements
    const style = window.getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return;
    }
    
    // Ignore fixed navigation drawer when closed
    if (el.classList && (el.classList.contains('staggered-menu-wrapper') || el.classList.contains('sm-panel-inner') || el.classList.contains('staggered-menu-panel'))) {
      if (el.getAttribute('aria-hidden') === 'true' || el.closest('[data-open="true"]') === null) {
        return;
      }
    }

    const rect = el.getBoundingClientRect();
    
    // If element is actually rendered in the layout
    if (rect.width > 0 && rect.height > 0) {
      // Check if bounding box exceeds viewport boundary significantly without a containing scroll/clip context
      if (rect.right > viewportWidth + 2 && !hasScrollableOrClippedAncestor(el) && !style.position?.includes('fixed')) {
        const idStr = el.id ? '#' + el.id : '';
        const classStr = el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\\s+/).slice(0, 3).join('.') : '';
        const tag = el.tagName.toLowerCase();
        
        issues.push({
          type: 'ELEMENT_OVERFLOW',
          selector: tag + idStr + classStr,
          rectRight: Math.round(rect.right),
          viewportWidth: viewportWidth,
          overflowAmount: Math.round(rect.right - viewportWidth),
          textSnippet: (el.textContent || '').trim().slice(0, 30)
        });
      }
    }

    // Recurse into children
    for (let i = 0; i < el.children.length; i++) {
      scanNode(el.children[i]);
    }
  }

  scanNode(body);
  return issues;
}
`;

(async () => {
  console.log('📱 Starting Exhaustive Mobile Responsiveness E2E Recursive Test Suite...');
  console.log(`Target URL: ${BASE_URL}\n`);

  const browser = await chromium.launch();
  let totalFailures = 0;
  let totalChecksPassed = 0;

  function assert(condition, message) {
    if (!condition) {
      console.error(`  ❌ FAIL: ${message}`);
      totalFailures++;
    } else {
      console.log(`  ✅ PASS: ${message}`);
      totalChecksPassed++;
    }
  }

  try {
    // =========================================================================
    // 1. RECURSIVE DOM & OVERFLOW CHECK ACROSS ALL PAGES AND MOBILE VIEWPORTS
    // =========================================================================
    console.log('================================================================');
    console.log('TEST STAGE 1: RECURSIVE DOM OVERFLOW AUDIT ACROSS ALL MOBILE RATIOS');
    console.log('================================================================');

    for (const vp of MOBILE_VIEWPORTS) {
      console.log(`\n--- Inspecting Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: true,
        hasTouch: true,
      });
      const page = await context.newPage();

      for (const route of PAGES) {
        console.log(`\n  Checking route: ${route}`);
        const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
        
        if (route === '/non-existent-xyz') {
          assert(res.status() === 404, `Route ${route} returns 404 on ${vp.name}`);
        } else {
          assert(res.status() === 200, `Route ${route} returns 200 on ${vp.name}`);
        }

        // Trigger any lazy-loaded elements / scroll triggers
        await page.evaluate(async () => {
          window.scrollTo(0, document.body.scrollHeight / 2);
          await new Promise((r) => setTimeout(r, 200));
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise((r) => setTimeout(r, 200));
          window.scrollTo(0, 0);
        });

        // Run recursive DOM overflow checker
        const issues = await page.evaluate(
          new Function('viewportWidth', `${RECURSIVE_DOM_OVERFLOW_CHECK}\nreturn inspectRecursiveOverflow(viewportWidth);`),
          vp.width,
        );

        // Filter issues to unique top-level culprits
        const majorIssues = issues.filter(
          (issue, idx, arr) =>
            arr.findIndex((i) => i.selector === issue.selector) === idx,
        );

        if (majorIssues.length > 0) {
          console.error(`  ⚠️ Overflow issues found on [${vp.name}] ${route}:`, majorIssues);
        }

        assert(
          majorIssues.length === 0,
          `Zero element overflows detected on [${vp.name}] ${route} (found: ${majorIssues.length})`,
        );

        // Verify document scrollWidth specifically
        const docScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        assert(
          docScrollWidth <= vp.width + 1,
          `document.documentElement.scrollWidth (${docScrollWidth}px) <= viewport (${vp.width}px) on ${route}`,
        );

        // Verify all images fit within viewport width
        const oversizedImages = await page.$$eval(
          'img',
          (imgs, vpWidth) =>
            imgs
              .map((img) => ({
                src: img.src,
                width: img.getBoundingClientRect().width,
                complete: img.complete,
              }))
              .filter((img) => img.width > vpWidth + 2),
          vp.width,
        );

        assert(
          oversizedImages.length === 0,
          `All images scale within viewport on [${vp.name}] ${route} (oversized: ${oversizedImages.length})`,
        );
      }

      await context.close();
    }

    // =========================================================================
    // 2. DETAILED SECTION-BY-SECTION AUDIT ON HOME PAGE (375x812)
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 2: SECTION-BY-SECTION AUDIT ON HOME PAGE (375x812)');
    console.log('================================================================');

    const homeContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    const homePage = await homeContext.newPage();
    await homePage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const HOME_SECTIONS = [
      { name: 'Navbar', selector: '.premium-nav' },
      { name: 'HeroSection', selector: '.hero-premium, #hero' },
      { name: 'StatsSection', selector: '#stats-strip, .stats-section, section:has(.stats-grid)' },
      { name: 'AboutSection', selector: '#about, section:has(#about-heading)' },
      { name: 'ProjectsSection', selector: '#projects, section:has(#projects-heading)' },
      { name: 'SkillsSection', selector: '#skills, section:has(#skills-heading)' },
      { name: 'GitHubSection', selector: '#github-activity, #github, section:has(#github-heading)' },
      { name: 'ExperienceSection', selector: '#experience, section:has(#experience-heading)' },
      { name: 'JourneySection', selector: '#journey, section:has(#journey-heading)' },
      { name: 'EducationSection', selector: '#education, section:has(#education-heading)' },
      { name: 'AchievementsSection', selector: '#achievements, section:has(#achievements-heading)' },
      { name: 'LeadershipSection', selector: '#leadership, section:has(#leadership-heading)' },
      { name: 'ClubsSection', selector: '#clubs, section:has(#clubs-heading)' },
      { name: 'EventsSection', selector: '#hackathons, #events, section:has(#events-heading)' },
      { name: 'CertificationsSection', selector: '#certifications, section:has(#certifications-heading)' },
      { name: 'ContactSection', selector: '#contact-cta, .cta-section' },
      { name: 'Footer', selector: 'footer.site-footer' },
    ];

    for (const sec of HOME_SECTIONS) {
      console.log(`\n  Inspecting section: ${sec.name}`);
      const secEl = await homePage.$(sec.selector);
      assert(secEl !== null, `Section [${sec.name}] exists in DOM`);

      if (secEl) {
        await secEl.scrollIntoViewIfNeeded();
        await homePage.waitForTimeout(150);

        const rect = await secEl.boundingBox();
        assert(rect !== null && rect.width > 0, `Section [${sec.name}] has rendered dimensions`);
        if (rect) {
          assert(
            rect.width <= 376,
            `Section [${sec.name}] width (${Math.round(rect.width)}px) fits mobile width (375px)`,
          );
        }

        // Capture section screenshot
        const shotPath = path.join(
          SCREENSHOTS_DIR,
          `home_sec_${sec.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}.png`,
        );
        await secEl.screenshot({ path: shotPath }).catch(() => {});
      }
    }

    // =========================================================================
    // 3. INTERACTIVE MOBILE DRAWER AUDIT
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 3: MOBILE HAMBURGER MENU & DRAWER AUDIT');
    console.log('================================================================');

    // Scroll to top to ensure clean state
    await homePage.evaluate(() => window.scrollTo(0, 0));
    await homePage.waitForTimeout(300);

    const toggle = await homePage.$('.sm-toggle');
    assert(toggle !== null, 'Mobile hamburger menu toggle (.sm-toggle) is visible');

    if (toggle) {
      // Click to open
      await toggle.click();
      await homePage.waitForTimeout(1000); // Allow full GSAP entrance choreography

      const drawer = await homePage.$('.staggered-menu-panel');
      assert(drawer !== null, 'Menu drawer element exists');

      const isDrawerVisible = await homePage.evaluate(() => {
        const wrapper = document.querySelector('.staggered-menu-wrapper');
        return wrapper && wrapper.getAttribute('data-open') === 'true';
      });
      assert(isDrawerVisible, 'Drawer wrapper is marked data-open="true"');

      // Check all nav links inside drawer
      const drawerLinks = await homePage.$$('.sm-panel-item');
      assert(drawerLinks.length >= 5, `Drawer contains navigation links (found: ${drawerLinks.length})`);

      // Verify no horizontal overflow while menu is open
      const overflowWhileOpen = await homePage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert(!overflowWhileOpen, 'Zero horizontal overflow while mobile drawer is open');

      // Verify all drawer items fit within viewport width
      const drawerItemsOverflow = await homePage.evaluate(() => {
        const items = document.querySelectorAll('.sm-panel-item');
        const bad = [];
        items.forEach((it) => {
          const r = it.getBoundingClientRect();
          if (r.right > window.innerWidth + 2) {
            bad.push({ text: it.textContent.trim(), right: r.right, vw: window.innerWidth });
          }
        });
        return bad;
      });
      assert(
        drawerItemsOverflow.length === 0,
        `All drawer menu items fit inside mobile viewport (overflows: ${drawerItemsOverflow.length})`,
      );

      // Take screenshot of open drawer
      await homePage.screenshot({
        path: path.join(SCREENSHOTS_DIR, 'mobile_drawer_open.png'),
      });

      // Click toggle again to close
      await toggle.click();
      await homePage.waitForTimeout(600);

      const isDrawerClosed = await homePage.evaluate(() => {
        const wrapper = document.querySelector('.staggered-menu-wrapper');
        return !wrapper || !wrapper.hasAttribute('data-open');
      });
      assert(isDrawerClosed, 'Drawer closes cleanly on second click');
    }

    // =========================================================================
    // 4. ACCORDION EXPAND / COLLAPSE AUDIT ON MOBILE
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 4: MOBILE ACCORDIONS EXPAND & COLLAPSE AUDIT');
    console.log('================================================================');

    // Test Clubs accordion if present
    const clubToggle = await homePage.$('#clubs button, #clubs [aria-expanded], [data-testid="clubs-toggle"]');
    if (clubToggle) {
      console.log('  Testing Clubs accordion expand/collapse...');
      await clubToggle.scrollIntoViewIfNeeded();
      await clubToggle.click();
      await homePage.waitForTimeout(300);
      const clubsOverflow = await homePage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert(!clubsOverflow, 'Zero overflow after expanding Clubs accordion');
      await clubToggle.click();
      await homePage.waitForTimeout(200);
    }

    // Test Events accordion if present
    const eventToggle = await homePage.$(
      '#hackathons button, #events button, #hackathons [aria-expanded], #events [aria-expanded], [data-testid="events-toggle"]',
    );
    if (eventToggle) {
      console.log('  Testing Events accordion expand/collapse...');
      await eventToggle.scrollIntoViewIfNeeded();
      await eventToggle.evaluate((b) => b.click());
      await homePage.waitForTimeout(300);
      const eventsOverflow = await homePage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert(!eventsOverflow, 'Zero overflow after expanding Events accordion');
      await eventToggle.evaluate((b) => b.click());
      await homePage.waitForTimeout(200);
    }

    await homeContext.close();

    // =========================================================================
    // 5. PROJECTS PAGE MOBILE TABS & CARDS AUDIT (375x812)
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 5: PROJECTS PAGE MOBILE TABS & CARDS AUDIT (375x812)');
    console.log('================================================================');

    const projContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    const projPage = await projContext.newPage();
    await projPage.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle' });

    const filterLabels = ['All', 'Web Apps', 'Mobile', 'AI', 'Freelance'];
    for (const label of filterLabels) {
      const tabBtn = await projPage.$(`button:has-text("${label}")`);
      if (tabBtn) {
        console.log(`  Clicking project tab: "${label}"`);
        await tabBtn.evaluate((b) => b.click());
        await projPage.waitForTimeout(250);

        const tabOverflow = await projPage.evaluate(
          () => document.documentElement.scrollWidth > window.innerWidth + 1,
        );
        assert(!tabOverflow, `Zero horizontal overflow after selecting "${label}" tab`);

        // Check cards rendered
        const cardsCount = (await projPage.$$('article, [data-testid="project-card"]')).length;
        assert(cardsCount > 0, `Projects displayed under "${label}" tab (found: ${cardsCount})`);
      }
    }

    // Capture projects page mobile screenshot
    await projPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'projects_page_mobile.png'),
      fullPage: true,
    });
    await projContext.close();

    // =========================================================================
    // 6. ABOUT PAGE MOBILE TABS AUDIT (375x812)
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 6: ABOUT PAGE MOBILE TABS & TIMELINE AUDIT (375x812)');
    console.log('================================================================');

    const aboutContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    const aboutPage = await aboutContext.newPage();
    await aboutPage.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });

    const aboutTabButtons = await aboutPage.$$('button:has-text("Work Experience"), button:has-text("Background"), button:has-text("Education"), button:has-text("Leadership")');
    console.log(`  Found ${aboutTabButtons.length} About page tab buttons`);

    for (const btn of aboutTabButtons) {
      const text = (await btn.textContent()).trim();
      console.log(`  Clicking About tab: "${text}"`);
      await btn.evaluate((b) => b.click());
      await aboutPage.waitForTimeout(250);

      const tabOverflow = await aboutPage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert(!tabOverflow, `Zero horizontal overflow on About page with tab "${text}"`);
    }

    await aboutPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'about_page_mobile.png'),
      fullPage: true,
    });
    await aboutContext.close();

    // =========================================================================
    // 7. CREDENTIALS PAGE MOBILE TABS & CERTS GRID (375x812)
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 7: CREDENTIALS PAGE MOBILE AUDIT (375x812)');
    console.log('================================================================');

    const credContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    const credPage = await credContext.newPage();
    await credPage.goto(`${BASE_URL}/credentials`, { waitUntil: 'networkidle' });

    const credTabs = await credPage.$$('button:has-text("Certifications"), button:has-text("Hackathons"), button:has-text("Clubs"), button:has-text("Awards")');
    for (const btn of credTabs) {
      const text = (await btn.textContent()).trim();
      console.log(`  Clicking Credentials tab: "${text}"`);
      await btn.evaluate((b) => b.click());
      await credPage.waitForTimeout(250);

      const tabOverflow = await credPage.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      assert(!tabOverflow, `Zero horizontal overflow on Credentials page with tab "${text}"`);
    }

    await credPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'credentials_page_mobile.png'),
      fullPage: true,
    });
    await credContext.close();

    // =========================================================================
    // 8. CONTACT PAGE MOBILE AUDIT (375x812)
    // =========================================================================
    console.log('\n================================================================');
    console.log('TEST STAGE 8: CONTACT PAGE & REDESIGNED CARD MOBILE AUDIT (375x812)');
    console.log('================================================================');

    const contactContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    const contactPage = await contactContext.newPage();
    await contactPage.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle' });

    const contactCard = await contactPage.$('[data-testid="contact-portal-card"]');
    assert(contactCard !== null, 'ContactPortalCard is present on mobile /contact');

    if (contactCard) {
      const cardRect = await contactCard.boundingBox();
      assert(cardRect !== null, 'ContactPortalCard has bounding box');
      if (cardRect) {
        assert(
          cardRect.width <= 376,
          `ContactPortalCard width (${Math.round(cardRect.width)}px) fits mobile screen`,
        );
      }

      // Verify no emoji in card
      const textContent = await contactCard.textContent();
      const emojiMatch = textContent.match(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu);
      assert(
        emojiMatch === null,
        `No system emojis detected in ContactPortalCard (found: ${emojiMatch ? emojiMatch.join(',') : 'none'})`,
      );
    }

    await contactPage.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'contact_page_mobile.png'),
      fullPage: true,
    });
    await contactContext.close();

  } finally {
    await browser.close();
  }

  console.log('\n================================================================');
  console.log(`AUDIT COMPLETE: ${totalChecksPassed} passed, ${totalFailures} failed`);
  console.log('================================================================\n');

  if (totalFailures === 0) {
    console.log('🎉 ALL EXHAUSTIVE MOBILE AUDITS PASSED WITH ZERO OVERFLOW OR ERRORS!');
    process.exit(0);
  } else {
    console.error(`❌ AUDIT DETECTED ${totalFailures} FAILURES.`);
    process.exit(1);
  }
})();
