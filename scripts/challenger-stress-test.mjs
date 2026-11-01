/**
 * Empirical Adversarial Challenger Verification Suite
 * Exhaustively stress-tests mobile viewports, overflow, footer dimensions,
 * title wrapping, and desktop 1440x900 pixel invariance.
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const VIEWPORTS = [
  { name: '320px (Mobile Min)', width: 320, height: 568, isMobile: true },
  { name: '360px (Mobile Narrow)', width: 360, height: 740, isMobile: true },
  { name: '375px (Mobile Standard)', width: 375, height: 667, isMobile: true },
  { name: '390px (Mobile Modern)', width: 390, height: 844, isMobile: true },
  { name: '414px (Mobile Large)', width: 414, height: 896, isMobile: true },
  { name: '480px (Mobile Max)', width: 480, height: 854, isMobile: true },
  { name: '768px (Tablet)', width: 768, height: 1024, isMobile: false },
  { name: '1024px (Small Desktop)', width: 1024, height: 768, isMobile: false },
  { name: '1440px (Reference Desktop)', width: 1440, height: 900, isMobile: false },
];

const ROUTES = ['/', '/about', '/projects', '/credentials', '/contact'];

const results = {
  timestamp: new Date().toISOString(),
  overflowTests: [],
  footerMeasurements: [],
  titleMeasurements: [],
  interactiveTests: [],
  desktopInvariance: {},
  passed: true,
  failures: [],
};

function recordFailure(testName, details) {
  results.passed = false;
  results.failures.push({ testName, details });
  console.error(`❌ [FAIL] ${testName}:`, details);
}

function logPass(testName, details = '') {
  console.log(`✅ [PASS] ${testName} ${details}`);
}

(async () => {
  console.log('🔥 STARTING EMPIRICAL ADVERSARIAL STRESS TEST...');
  console.log(`Target: ${BASE_URL}\n`);

  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();

    // =========================================================================
    // 1. HORIZONTAL OVERFLOW ADVERSARIAL SWEEP
    // =========================================================================
    console.log('--- TEST GROUP 1: EXHAUSTIVE HORIZONTAL OVERFLOW & CLIPPING SWEEP ---');

    for (const vp of VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of ROUTES) {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

        // Scroll to trigger any lazy elements
        await page.evaluate(async () => {
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise((r) => setTimeout(r, 150));
          window.scrollTo(0, 0);
        });

        const overflowInfo = await page.evaluate((vpWidth) => {
          const docEl = document.documentElement;
          const body = document.body;
          const docScrollW = docEl.scrollWidth;
          const bodyScrollW = body ? body.scrollWidth : 0;
          const clientW = window.innerWidth;

          // Find culprit elements that exceed window.innerWidth and are not clipped by an overflow:hidden container
          const offenders = [];
          document.querySelectorAll('*').forEach((el) => {
            // Ignore closed drawer/fixed overlays
            if (el.closest('.staggered-menu-wrapper')) return;

            const r = el.getBoundingClientRect();
            if (r.right > vpWidth + 1.5 && r.width > 0 && r.height > 0) {
              // Check if any ancestor clips this element within viewport bounds
              let clipped = false;
              let p = el.parentElement;
              while (p && p !== document.body && p !== document.documentElement) {
                const pStyle = window.getComputedStyle(p);
                const pr = p.getBoundingClientRect();
                if (
                  (pStyle.overflowX === 'hidden' ||
                    pStyle.overflowX === 'auto' ||
                    pStyle.overflowX === 'scroll') &&
                  pr.right <= vpWidth + 1.5
                ) {
                  clipped = true;
                  break;
                }
                p = p.parentElement;
              }

              if (!clipped) {
                offenders.push({
                  tag: el.tagName,
                  id: el.id,
                  cls: el.className ? String(el.className).slice(0, 50) : '',
                  right: Math.round(r.right),
                  width: Math.round(r.width),
                  text: el.innerText ? el.innerText.slice(0, 30).replace(/\n/g, ' ') : '',
                });
              }
            }
          });

          return {
            docScrollW,
            bodyScrollW,
            clientW,
            hasDocOverflow: docScrollW > clientW + 1,
            hasBodyOverflow: bodyScrollW > clientW + 1,
            offenders,
          };
        }, vp.width);

        const hasFailure =
          overflowInfo.hasDocOverflow ||
          overflowInfo.hasBodyOverflow ||
          overflowInfo.offenders.length > 0;

        const record = {
          viewport: vp.name,
          route,
          docScrollW: overflowInfo.docScrollW,
          bodyScrollW: overflowInfo.bodyScrollW,
          innerWidth: vp.width,
          passed: !hasFailure,
          offenders: overflowInfo.offenders,
        };
        results.overflowTests.push(record);

        if (hasFailure) {
          recordFailure(`Horizontal Overflow / Clipping on ${vp.name} [${route}]`, record);
        } else {
          logPass(
            `No overflow on ${vp.name} [${route}]`,
            `(docW: ${overflowInfo.docScrollW}, bodyW: ${overflowInfo.bodyScrollW} / ${vp.width}px)`,
          );
        }
      }
    }

    // =========================================================================
    // 2. FOOTER DIMENSIONS & SCALING (< 600px assertion)
    // =========================================================================
    console.log('\n--- TEST GROUP 2: MOBILE FOOTER HEIGHT & SCALING ---');
    const mobileViewports = VIEWPORTS.filter((v) => v.isMobile);

    for (const vp of mobileViewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      for (const route of ROUTES) {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

        const footerData = await page.evaluate(() => {
          const footer = document.querySelector('.site-footer');
          if (!footer) return null;
          const rect = footer.getBoundingClientRect();
          const inner = footer.querySelector('.footer-inner');
          const innerRect = inner ? inner.getBoundingClientRect() : null;
          const navGrid = footer.querySelector('.footer-nav-grid');
          const navGridDisplay = navGrid ? window.getComputedStyle(navGrid).display : null;
          const navCols = footer.querySelectorAll('.footer-col');

          // Check if any column overflows the inner container
          const colsInfo = Array.from(navCols).map((col) => {
            const cr = col.getBoundingClientRect();
            return {
              text: col.innerText ? col.innerText.slice(0, 20).replace(/\n/g, ' ') : '',
              width: Math.round(cr.width),
              right: Math.round(cr.right),
              scrollWidth: col.scrollWidth,
            };
          });

          return {
            exists: true,
            height: Math.round(rect.height),
            innerHeight: innerRect ? Math.round(innerRect.height) : null,
            navGridDisplay,
            colsCount: navCols.length,
            colsInfo,
          };
        });

        if (footerData && footerData.exists) {
          const footerRecord = {
            viewport: vp.name,
            route,
            height: footerData.height,
            innerHeight: footerData.innerHeight,
            navGridDisplay: footerData.navGridDisplay,
            colsInfo: footerData.colsInfo,
            passed: footerData.height < 600 && footerData.height > 200,
          };
          results.footerMeasurements.push(footerRecord);

          if (footerData.height >= 600) {
            recordFailure(`Footer Height >= 600px on ${vp.name} [${route}]`, footerRecord);
          } else if (footerData.height <= 200) {
            recordFailure(
              `Footer Height suspiciously small (<= 200px) on ${vp.name} [${route}]`,
              footerRecord,
            );
          } else {
            logPass(
              `Footer on ${vp.name} [${route}]`,
              `Height: ${footerData.height}px (< 600px threshold)`,
            );
          }
        }
      }
    }

    // =========================================================================
    // 3. EDUCATION, EXPERIENCE, PROJECTS: TITLE TRUNCATION & STARVATION
    // =========================================================================
    console.log('\n--- TEST GROUP 3: TITLE TRUNCATION & STARVATION ON MOBILE ---');
    for (const width of [320, 360, 375, 480]) {
      await page.setViewportSize({ width, height: 700 });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      const titleReport = await page.evaluate(() => {
        const report = {
          education: [],
          experience: [],
          projects: [],
          leadership: [],
        };

        // 1. Education Titles
        const eduSection = document.getElementById('education');
        if (eduSection) {
          const buttons = eduSection.querySelectorAll('button[type="button"]');
          buttons.forEach((btn, i) => {
            const h3 = btn.querySelector('h3');
            if (h3) {
              const style = window.getComputedStyle(h3);
              const isEllipsis = style.textOverflow === 'ellipsis';
              const isNowrap = style.whiteSpace === 'nowrap';
              const overflows = h3.scrollWidth > h3.clientWidth + 1;
              const isTruncated = (isEllipsis && isNowrap && overflows) || (isNowrap && overflows);

              report.education.push({
                index: i,
                text: h3.innerText.trim(),
                clientWidth: Math.round(h3.clientWidth),
                scrollWidth: Math.round(h3.scrollWidth),
                btnWidth: Math.round(btn.clientWidth),
                whiteSpace: style.whiteSpace,
                textOverflow: style.textOverflow,
                isTruncated,
              });
            }
          });
        }

        // 2. Experience Titles
        const expSection = document.getElementById('experience');
        if (expSection) {
          const buttons = expSection.querySelectorAll('button[type="button"]');
          buttons.forEach((btn, i) => {
            const h3 = btn.querySelector('h3');
            if (h3) {
              const style = window.getComputedStyle(h3);
              const isEllipsis = style.textOverflow === 'ellipsis';
              const isNowrap = style.whiteSpace === 'nowrap';
              const overflows = h3.scrollWidth > h3.clientWidth + 1;
              const isTruncated = (isEllipsis && isNowrap && overflows) || (isNowrap && overflows);

              report.experience.push({
                index: i,
                text: h3.innerText.trim(),
                clientWidth: Math.round(h3.clientWidth),
                scrollWidth: Math.round(h3.scrollWidth),
                btnWidth: Math.round(btn.clientWidth),
                whiteSpace: style.whiteSpace,
                textOverflow: style.textOverflow,
                isTruncated,
              });
            }
          });
        }

        // 3. Project Titles (Featured on Homepage)
        const projectCards = document.querySelectorAll('article[data-testid="project-card"]');
        projectCards.forEach((card, i) => {
          const h3 = card.querySelector('h3');
          if (h3) {
            const style = window.getComputedStyle(h3);
            const isEllipsis = style.textOverflow === 'ellipsis';
            const isNowrap = style.whiteSpace === 'nowrap';
            const overflows = h3.scrollWidth > h3.clientWidth + 1;
            const isTruncated = (isEllipsis && isNowrap && overflows) || (isNowrap && overflows);

            report.projects.push({
              index: i,
              text: h3.innerText.trim(),
              clientWidth: Math.round(h3.clientWidth),
              scrollWidth: Math.round(h3.scrollWidth),
              whiteSpace: style.whiteSpace,
              textOverflow: style.textOverflow,
              isTruncated,
            });
          }
        });

        return report;
      });

      // Assertions on titles
      for (const edu of titleReport.education) {
        if (edu.isTruncated) {
          recordFailure(`Education degree truncated on ${width}px: "${edu.text}"`, edu);
        } else {
          logPass(
            `Education degree on ${width}px`,
            `"${edu.text.slice(0, 25)}..." [W: ${edu.clientWidth}px, btnW: ${edu.btnWidth}px]`,
          );
        }
      }

      for (const exp of titleReport.experience) {
        if (exp.isTruncated) {
          recordFailure(`Experience role truncated on ${width}px: "${exp.text}"`, exp);
        } else {
          logPass(
            `Experience role on ${width}px`,
            `"${exp.text.slice(0, 25)}..." [W: ${exp.clientWidth}px, btnW: ${exp.btnWidth}px]`,
          );
        }
      }

      for (const proj of titleReport.projects) {
        if (proj.isTruncated) {
          recordFailure(`Project title truncated on ${width}px: "${proj.text}"`, proj);
        } else {
          logPass(`Project title on ${width}px`, `"${proj.text}" [W: ${proj.clientWidth}px]`);
        }
      }

      results.titleMeasurements.push({ width, ...titleReport });
    }

    // =========================================================================
    // 4. INTERACTION STRESS TESTS (ACCORDIONS, TABS)
    // =========================================================================
    console.log('\n--- TEST GROUP 4: INTERACTIVE EXPANSION & OVERFLOW INTEGRITY ---');
    await page.setViewportSize({ width: 320, height: 600 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Expand all education accordion items
    const eduButtons = await page.$$('#education button[aria-expanded]');
    for (let i = 0; i < eduButtons.length; i++) {
      await eduButtons[i].click();
      await page.waitForTimeout(100);
      const overflowAfterClick = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      if (overflowAfterClick) {
        recordFailure(`Overflow caused by expanding Education accordion item ${i} on 320px`);
      } else {
        logPass(`Education item ${i} expanded safely on 320px`);
      }
    }

    // Expand all experience accordion items
    const expButtons = await page.$$('#experience button[aria-expanded]');
    for (let i = 0; i < expButtons.length; i++) {
      await expButtons[i].click();
      await page.waitForTimeout(100);
      const overflowAfterClick = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      if (overflowAfterClick) {
        recordFailure(`Overflow caused by expanding Experience accordion item ${i} on 320px`);
      } else {
        logPass(`Experience item ${i} expanded safely on 320px`);
      }
    }

    // Test Projects page filter tabs
    await page.goto(`${BASE_URL}/projects`, { waitUntil: 'networkidle' });
    const tabButtons = await page.$$('button[role="tab"]');
    for (let i = 0; i < tabButtons.length; i++) {
      const tab = tabButtons[i];
      const text = (await tab.innerText()).trim();
      await tab.evaluate((b) => b.click());
      await page.waitForTimeout(100);
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth + 1;
      });
      if (overflow) {
        recordFailure(`Overflow on /projects during tab "${text}" on 320px`);
      } else {
        logPass(`Projects tab "${text}" clicked cleanly on 320px`);
      }
    }

    // =========================================================================
    // 5. DESKTOP VIEW INVARIANCE AUDIT (1440x900)
    // =========================================================================
    console.log('\n--- TEST GROUP 5: DESKTOP 1440x900 INVARIANCE VERIFICATION ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    const desktopMetrics = await page.evaluate(() => {
      // 1. Footer metrics
      const footer = document.querySelector('.site-footer');
      const footerRect = footer ? footer.getBoundingClientRect() : null;
      const footerInner = footer ? footer.querySelector('.footer-inner') : null;
      const footerInnerStyle = footerInner ? window.getComputedStyle(footerInner) : null;
      const navGrid = footer ? footer.querySelector('.footer-nav-grid') : null;
      const navGridStyle = navGrid ? window.getComputedStyle(navGrid) : null;

      // 2. Stats strip
      const statsSection = document.getElementById('stats-strip');
      const statsContainer = statsSection ? statsSection.querySelector('.grid, .flex') : null;
      const statsStyle = statsContainer ? window.getComputedStyle(statsContainer) : null;

      // 3. CTA heading & socials
      const ctaHeading = document.querySelector('.cta-heading');
      const ctaHeadingStyle = ctaHeading ? window.getComputedStyle(ctaHeading) : null;
      const ctaSocials = document.querySelector('.cta-social-pills, .cta-socials');
      const ctaSocialsStyle = ctaSocials ? window.getComputedStyle(ctaSocials) : null;

      // 4. Hero roles
      const heroRoles = document.querySelector('.hero-roles');
      const heroRolesStyle = heroRoles ? window.getComputedStyle(heroRoles) : null;

      // 5. Section paddings
      const sectionIds = [
        'about',
        'education',
        'experience',
        'projects',
        'achievements',
        'clubs',
        'leadership',
      ];
      const sectionPaddings = {};
      sectionIds.forEach((id) => {
        const sec = document.getElementById(id);
        if (sec) {
          const comp = window.getComputedStyle(sec);
          sectionPaddings[id] = {
            paddingTop: comp.paddingTop,
            paddingBottom: comp.paddingBottom,
          };
        }
      });

      return {
        footer: {
          height: footerRect ? Math.round(footerRect.height) : null,
          innerDisplay: footerInnerStyle ? footerInnerStyle.display : null,
          innerDirection: footerInnerStyle ? footerInnerStyle.flexDirection : null,
          navGridDisplay: navGridStyle ? navGridStyle.display : null,
        },
        stats: {
          display: statsStyle ? statsStyle.display : null,
          direction: statsStyle ? statsStyle.flexDirection : null,
        },
        cta: {
          fontSize: ctaHeadingStyle ? ctaHeadingStyle.fontSize : null,
          socialGap: ctaSocialsStyle ? ctaSocialsStyle.gap : null,
        },
        heroRoles: {
          position: heroRolesStyle ? heroRolesStyle.position : null,
          textAlign: heroRolesStyle ? heroRolesStyle.textAlign : null,
        },
        sectionPaddings,
      };
    });

    results.desktopInvariance = desktopMetrics;

    // Invariance Assertions
    // Footer:
    const footerCorrect =
      desktopMetrics.footer.height === 385 &&
      desktopMetrics.footer.innerDirection === 'row' &&
      desktopMetrics.footer.navGridDisplay === 'contents';

    if (!footerCorrect) {
      recordFailure('Desktop Footer layout mismatch', desktopMetrics.footer);
    } else {
      logPass(
        'Desktop Footer 1440px matches original (height: 385px, display: contents, flex-row)',
      );
    }

    // Stats:
    const statsCorrect = desktopMetrics.stats.direction === 'row';
    if (!statsCorrect) {
      recordFailure('Desktop Stats layout mismatch', desktopMetrics.stats);
    } else {
      logPass('Desktop Stats 1440px matches original (flex-row)');
    }

    // CTA:
    const ctaCorrect =
      desktopMetrics.cta.fontSize === '112px' && desktopMetrics.cta.socialGap === '16px';
    if (!ctaCorrect) {
      recordFailure('Desktop CTA layout mismatch', desktopMetrics.cta);
    } else {
      logPass('Desktop CTA 1440px matches original (font-size: 112px, gap: 16px)');
    }

    // Hero Roles:
    const heroRolesCorrect =
      desktopMetrics.heroRoles.position === 'absolute' &&
      desktopMetrics.heroRoles.textAlign === 'right';
    if (!heroRolesCorrect) {
      recordFailure('Desktop Hero Roles mismatch', desktopMetrics.heroRoles);
    } else {
      logPass('Desktop Hero Roles matches original (position: absolute, text-align: right)');
    }

    // Section paddings: verify all match baseline
    for (const [id, pad] of Object.entries(desktopMetrics.sectionPaddings)) {
      const topPx = parseInt(pad.paddingTop, 10);
      const bottomPx = parseInt(pad.paddingBottom, 10);
      const isExpected =
        id === 'about'
          ? topPx === 112 && bottomPx === 24
          : (topPx === 96 || topPx === 112) && (bottomPx === 96 || bottomPx === 112);
      if (!isExpected) {
        recordFailure(`Desktop Section #${id} padding regression`, pad);
      } else {
        logPass(`Desktop Section #${id} padding invariant (${pad.paddingTop})`);
      }
    }

    await page.close();
  } finally {
    await browser.close();
  }

  // Summary
  console.log('\n======================================================');
  console.log(
    `STRESS TEST RESULT: ${results.passed ? 'ALL CHECKS PASSED ✅' : 'FAILURES DETECTED ❌'}`,
  );
  console.log(`Total Overflow Checks: ${results.overflowTests.length}`);
  console.log(`Total Footer Checks: ${results.footerMeasurements.length}`);
  console.log(`Total Failures: ${results.failures.length}`);
  console.log('======================================================');

  if (!results.failures.length) {
    process.exit(0);
  } else {
    process.exit(1);
  }
})();
