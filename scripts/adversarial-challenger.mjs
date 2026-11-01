/**
 * Adversarial Challenger Empirical Verification Suite
 * Teamwork Challenger 2
 */

import { chromium } from 'playwright';

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const VIEWPORTS = [
  { name: 'Mobile Minimum (320x568)', width: 320, height: 568, isMobile: true },
  { name: 'Mobile 340x600', width: 340, height: 600, isMobile: true },
  { name: 'Mobile Narrow (360x740)', width: 360, height: 740, isMobile: true },
  { name: 'Mobile Standard (375x667)', width: 375, height: 667, isMobile: true },
  { name: 'Mobile 390x844 (iPhone 13)', width: 390, height: 844, isMobile: true },
  { name: 'Mobile 412x915 (Pixel 7)', width: 412, height: 915, isMobile: true },
  { name: 'Mobile Max (480x854)', width: 480, height: 854, isMobile: true },
  { name: 'Tablet Boundary (768x1024)', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop Standard (1024x768)', width: 1024, height: 768, isMobile: false },
  { name: 'Desktop Large (1440x900)', width: 1440, height: 900, isMobile: false },
];

const ROUTES = ['/', '/projects', '/about', '/credentials', '/contact'];

(async () => {
  console.log('===============================================================');
  console.log('🔥 STARTING ADVERSARIAL CHALLENGER EMPIRICAL VERIFICATION SUITE');
  console.log(`Target URL: ${BASE_URL}`);
  console.log('===============================================================\n');

  const browser = await chromium.launch();
  let totalFailures = 0;
  const failureList = [];

  function assert(condition, message, details = '') {
    if (!condition) {
      console.error(`❌ [FAIL] ${message}${details ? ' -> ' + JSON.stringify(details) : ''}`);
      totalFailures++;
      failureList.push({ message, details });
    } else {
      console.log(`✅ [PASS] ${message}${details ? ' (' + details + ')' : ''}`);
    }
  }

  try {
    // -------------------------------------------------------------------------
    // TEST 1: CTA HEADING TYPOGRAPHY & SOCIAL PILLS SCALING
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 1: CTA HEADING TYPOGRAPHY & SOCIAL PILLS GAP ---');
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      const ctaData = await page.evaluate(() => {
        const heading = document.querySelector('section.cta-section .cta-heading, .cta-heading');
        const pills = document.querySelector('.cta-social-pills, .cta-socials');
        if (!heading) return null;

        const hStyle = window.getComputedStyle(heading);
        const pStyle = pills ? window.getComputedStyle(pills) : null;
        const hRect = heading.getBoundingClientRect();

        return {
          fontSize: parseFloat(hStyle.fontSize),
          fontSizeStr: hStyle.fontSize,
          lineHeight: parseFloat(hStyle.lineHeight),
          lineHeightStr: hStyle.lineHeight,
          letterSpacing: hStyle.letterSpacing,
          hWidth: Math.round(hRect.width),
          hHeight: Math.round(hRect.height),
          pillsGap: pStyle ? pStyle.gap : null,
          pillsRowGap: pStyle ? pStyle.rowGap : null,
          pillsColGap: pStyle ? pStyle.columnGap : null,
        };
      });

      if (!ctaData) {
        assert(false, `CTA heading element not found at ${vp.name}`);
      } else {
        const ratio = (ctaData.lineHeight / ctaData.fontSize).toFixed(2);
        console.log(
          `[${vp.name}] CTA Heading: font-size=${ctaData.fontSizeStr}, line-height=${ctaData.lineHeightStr} (ratio ${ratio}), gap=${ctaData.pillsGap}`,
        );

        if (vp.isMobile) {
          assert(
            ctaData.fontSize >= 27.9 && ctaData.fontSize <= 34.1,
            `Mobile CTA heading font-size within 28px–34px at ${vp.name}`,
            `${ctaData.fontSizeStr} (target: 28px–34px)`,
          );
          assert(
            ratio >= 1.1 && ratio <= 1.25,
            `Mobile CTA line-height ratio uncluttered at ${vp.name}`,
            `ratio: ${ratio}`,
          );
          const effectiveGap = parseInt(ctaData.pillsGap || ctaData.pillsRowGap || '0', 10);
          assert(
            effectiveGap === 10,
            `Mobile CTA social pills gap is 10px at ${vp.name}`,
            `actual: ${ctaData.pillsGap}`,
          );
        } else if (vp.width === 1440) {
          assert(
            Math.round(ctaData.fontSize) === 112,
            `Desktop CTA heading font-size is exactly 112px at ${vp.name}`,
            `${ctaData.fontSizeStr}`,
          );
          const effectiveGap = parseInt(ctaData.pillsGap || ctaData.pillsRowGap || '0', 10);
          assert(
            effectiveGap === 16,
            `Desktop CTA social pills gap is 16px at ${vp.name}`,
            `actual: ${ctaData.pillsGap}`,
          );
        }
      }
      await page.close();
    }

    // -------------------------------------------------------------------------
    // TEST 2: STATS SECTION HORIZONTAL SPACE UTILIZATION
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 2: STATS SECTION HORIZONTAL SPACE UTILIZATION ---');
    for (const vp of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      const statsMetrics = await page.evaluate(() => {
        const section = document.querySelector('#stats-strip');
        if (!section) return null;
        const container = section.querySelector('div');
        if (!container) return null;

        const countElements = Array.from(section.querySelectorAll('.count-up'));
        const itemBoxes = countElements.map((el) => {
          const parentItem = el.closest('.flex.flex-col') || el.parentElement;
          const rect = parentItem.getBoundingClientRect();
          return {
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            right: Math.round(rect.right),
          };
        });

        const sRect = section.getBoundingClientRect();
        const cStyle = window.getComputedStyle(container);

        return {
          sectionHeight: Math.round(sRect.height),
          containerDisplay: cStyle.display,
          itemCount: itemBoxes.length,
          itemBoxes,
        };
      });

      if (!statsMetrics) {
        assert(false, `Stats section not found at ${vp.name}`);
      } else {
        assert(statsMetrics.itemCount === 3, `Stats has 3 items at ${vp.name}`);

        if (vp.isMobile) {
          const tops = statsMetrics.itemBoxes.map((b) => b.top);
          const maxTopDiff = Math.max(...tops) - Math.min(...tops);
          assert(
            maxTopDiff <= 4,
            `Stats items aligned horizontally on same row at ${vp.name}`,
            `top positions: ${tops.join(', ')} (diff: ${maxTopDiff}px)`,
          );
          const strictlyIncreasing =
            statsMetrics.itemBoxes[0].left < statsMetrics.itemBoxes[1].left &&
            statsMetrics.itemBoxes[1].left < statsMetrics.itemBoxes[2].left;
          assert(
            strictlyIncreasing,
            `Stats items arranged in left-to-right 3-column order at ${vp.name}`,
            `lefts: ${statsMetrics.itemBoxes.map((b) => b.left).join(', ')}`,
          );
          assert(
            statsMetrics.sectionHeight < 150,
            `Stats section height is compact (< 150px) on mobile at ${vp.name}`,
            `height: ${statsMetrics.sectionHeight}px`,
          );
        } else if (vp.width === 1440) {
          assert(
            statsMetrics.containerDisplay === 'flex',
            `Stats container display is flex on desktop at ${vp.name}`,
            statsMetrics.containerDisplay,
          );
        }
      }
      await page.close();
    }

    // -------------------------------------------------------------------------
    // TEST 3: LEADERSHIP SECTION HORIZONTAL ALIGNMENT
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 3: LEADERSHIP SECTION HORIZONTAL ALIGNMENT ---');
    for (const vp of [
      { name: 'Mobile Minimum (320x568)', width: 320, height: 568, isMobile: true },
      { name: 'Mobile Standard (375x667)', width: 375, height: 667, isMobile: true },
      { name: 'Mobile Max (480x854)', width: 480, height: 854, isMobile: true },
      { name: 'Desktop Large (1440x900)', width: 1440, height: 900, isMobile: false },
    ]) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      const leadershipData = await page.evaluate(() => {
        const section = document.querySelector('#leadership');
        if (!section) return null;

        const rows = Array.from(section.querySelectorAll('.divide-y > div'));
        return rows.map((row) => {
          const h3 = row.querySelector('h3');
          const p = row.querySelector('p');
          const mobileBadgeWrap = row.querySelector('[class*="sm:hidden"]');
          const mobileBadge = mobileBadgeWrap ? mobileBadgeWrap.querySelector('span') : null;
          const desktopBadgeWrap = row.children[1];
          const desktopBadge = desktopBadgeWrap ? desktopBadgeWrap.querySelector('span') : null;

          const isMobileBadgeVis =
            mobileBadgeWrap &&
            window.getComputedStyle(mobileBadgeWrap).display !== 'none' &&
            mobileBadge &&
            mobileBadge.getBoundingClientRect().width > 0;

          const isDesktopBadgeVis =
            desktopBadgeWrap &&
            window.getComputedStyle(desktopBadgeWrap).display !== 'none' &&
            desktopBadge &&
            desktopBadge.getBoundingClientRect().width > 0;

          const h3Rect = h3 ? h3.getBoundingClientRect() : null;
          const pRect = p ? p.getBoundingClientRect() : null;
          const mRect = isMobileBadgeVis ? mobileBadge.getBoundingClientRect() : null;

          return {
            role: h3 ? h3.textContent.trim() : '',
            h3Rect: h3Rect
              ? {
                  left: Math.round(h3Rect.left),
                  top: Math.round(h3Rect.top),
                  width: Math.round(h3Rect.width),
                  height: Math.round(h3Rect.height),
                }
              : null,
            pRect: pRect
              ? {
                  left: Math.round(pRect.left),
                  top: Math.round(pRect.top),
                  width: Math.round(pRect.width),
                  height: Math.round(pRect.height),
                }
              : null,
            isMobileBadgeVis,
            mRect: mRect
              ? {
                  left: Math.round(mRect.left),
                  top: Math.round(mRect.top),
                  width: Math.round(mRect.width),
                  height: Math.round(mRect.height),
                }
              : null,
            isDesktopBadgeVis,
          };
        });
      });

      if (!leadershipData || leadershipData.length === 0) {
        assert(false, `Leadership section items not found at ${vp.name}`);
      } else {
        for (const item of leadershipData) {
          if (vp.isMobile) {
            assert(item.isMobileBadgeVis, `Mobile badge visible for "${item.role}" at ${vp.name}`);
            if (item.mRect && item.h3Rect) {
              const topDiff = Math.abs(item.mRect.top - item.h3Rect.top);
              assert(
                topDiff <= 8,
                `Role title and period badge aligned horizontally on line 1 for "${item.role}" at ${vp.name}`,
                `h3 top: ${item.h3Rect.top}, badge top: ${item.mRect.top} (diff: ${topDiff}px)`,
              );
              assert(
                item.mRect.left > item.h3Rect.left,
                `Badge is positioned to the right of role title for "${item.role}" at ${vp.name}`,
                `h3 left: ${item.h3Rect.left}, badge left: ${item.mRect.left}`,
              );
              if (item.pRect) {
                assert(
                  item.pRect.top >= item.h3Rect.top + item.h3Rect.height - 2,
                  `Organization sits on line 2 below role title for "${item.role}" at ${vp.name}`,
                );
              }
            }
          } else {
            assert(
              !item.isMobileBadgeVis,
              `Mobile badge hidden on desktop for "${item.role}" at ${vp.name}`,
            );
            assert(
              item.isDesktopBadgeVis,
              `Desktop badge visible for "${item.role}" at ${vp.name}`,
            );
          }
        }
      }
      await page.close();
    }

    // -------------------------------------------------------------------------
    // TEST 4: HORIZONTAL OVERFLOW STRESS TEST ACROSS ROUTES & VIEWPORTS
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 4: ZERO HORIZONTAL OVERFLOW STRESS TEST ---');
    for (const vp of VIEWPORTS) {
      for (const route of ROUTES) {
        const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });

        const overflowReport = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const winWidth = window.innerWidth;
          const scrollW = Math.max(docEl.scrollWidth, body.scrollWidth);

          // Find all uncontained elements whose bounding box extends past the viewport
          const uncontainedOffenders = [];
          document.querySelectorAll('*').forEach((el) => {
            let p = el;
            let hasOverflowAncestor = false;
            while (p && p !== document.body && p !== document.documentElement) {
              const s = window.getComputedStyle(p);
              if (['auto', 'scroll', 'hidden'].includes(s.overflowX)) {
                hasOverflowAncestor = true;
                break;
              }
              p = p.parentElement;
            }

            const r = el.getBoundingClientRect();
            if (r.right > winWidth + 1 && !hasOverflowAncestor) {
              uncontainedOffenders.push({
                tag: el.tagName,
                className: (el.className || '').toString().slice(0, 50),
                rectRight: Math.round(r.right),
                rectWidth: Math.round(r.width),
              });
            }
          });

          return {
            winWidth,
            scrollW,
            hasBodyOverflow: scrollW > winWidth + 1,
            uncontainedOffenders,
          };
        });

        const passes =
          !overflowReport.hasBodyOverflow && overflowReport.uncontainedOffenders.length === 0;
        assert(
          passes,
          `Zero uncontained horizontal overflow on [${vp.name}] ${route}`,
          !passes
            ? `scrollWidth=${overflowReport.scrollW} > innerWidth=${overflowReport.winWidth}, uncontained: ${JSON.stringify(overflowReport.uncontainedOffenders)}`
            : `scrollWidth=${overflowReport.scrollW} <= ${overflowReport.winWidth}`,
        );

        await page.close();
      }
    }

    // -------------------------------------------------------------------------
    // TEST 5: TEXT TRUNCATION AUDIT (Education, Experience, Projects)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 5: TEXT TRUNCATION & MULTI-LINE WRAPPING AUDIT ---');
    for (const vp of [
      { name: 'Mobile Minimum (320x568)', width: 320, height: 568 },
      { name: 'Mobile Standard (375x667)', width: 375, height: 667 },
      { name: 'Mobile Max (480x854)', width: 480, height: 854 },
    ]) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      const textAudit = await page.evaluate(() => {
        const eduTitles = Array.from(document.querySelectorAll('#education button h3')).map(
          (h3) => ({
            text: h3.textContent.trim(),
            clientWidth: h3.clientWidth,
            scrollWidth: h3.scrollWidth,
            clipped: h3.scrollWidth > h3.clientWidth + 2,
          }),
        );
        const expTitles = Array.from(document.querySelectorAll('#experience button h3')).map(
          (h3) => ({
            text: h3.textContent.trim(),
            clientWidth: h3.clientWidth,
            scrollWidth: h3.scrollWidth,
            clipped: h3.scrollWidth > h3.clientWidth + 2,
          }),
        );
        const projTitles = Array.from(document.querySelectorAll('#projects article h3')).map(
          (h3) => ({
            text: h3.textContent.trim(),
            clientWidth: h3.clientWidth,
            scrollWidth: h3.scrollWidth,
            clipped: h3.scrollWidth > h3.clientWidth + 2,
          }),
        );

        return { eduTitles, expTitles, projTitles };
      });

      for (const item of textAudit.eduTitles) {
        assert(
          !item.clipped,
          `Education degree "${item.text}" wraps without clipping at ${vp.name}`,
        );
      }
      for (const item of textAudit.expTitles) {
        assert(
          !item.clipped,
          `Experience role "${item.text}" wraps without clipping at ${vp.name}`,
        );
      }
      for (const item of textAudit.projTitles) {
        assert(!item.clipped, `Project title "${item.text}" wraps without clipping at ${vp.name}`);
      }

      await page.close();
    }

    // -------------------------------------------------------------------------
    // TEST 6: DESKTOP INVARIANCE AUDIT (1440x900)
    // -------------------------------------------------------------------------
    console.log('\n--- TEST 6: DESKTOP PIXEL INVARIANCE AUDIT (1440x900) ---');
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      const desktopMetrics = await page.evaluate(() => {
        const footer = document.querySelector('.site-footer');
        const footerInner = document.querySelector('.footer-inner');
        const footerCols = Array.from(document.querySelectorAll('.site-footer .footer-col'));
        const stats = document.querySelector('#stats-strip div');
        const statNumber = document.querySelector('.count-up');
        const ctaHeading = document.querySelector('section.cta-section .cta-heading');
        const ctaSocials = document.querySelector('.cta-social-pills');
        const heroRoles = document.querySelector('.hero-roles');

        return {
          footerHeight: footer ? Math.round(footer.getBoundingClientRect().height) : null,
          footerDisplay: footerInner ? window.getComputedStyle(footerInner).display : null,
          footerFlexDir: footerInner ? window.getComputedStyle(footerInner).flexDirection : null,
          footerVisualColsCount: footerCols.length,
          statsDisplay: stats ? window.getComputedStyle(stats).display : null,
          statsFlexDir: stats ? window.getComputedStyle(stats).flexDirection : null,
          statNumberFontSize: statNumber ? window.getComputedStyle(statNumber).fontSize : null,
          ctaHeadingFontSize: ctaHeading ? window.getComputedStyle(ctaHeading).fontSize : null,
          ctaSocialsGap: ctaSocials ? window.getComputedStyle(ctaSocials).gap : null,
          heroRolesPosition: heroRoles ? window.getComputedStyle(heroRoles).position : null,
          heroRolesTextAlign: heroRoles ? window.getComputedStyle(heroRoles).textAlign : null,
        };
      });

      assert(
        desktopMetrics.footerHeight === 385,
        'Desktop footer height invariant at 385px',
        `${desktopMetrics.footerHeight}px`,
      );
      assert(
        desktopMetrics.footerDisplay === 'flex' && desktopMetrics.footerFlexDir === 'row',
        'Desktop footer layout is flex row',
      );
      assert(
        desktopMetrics.footerVisualColsCount === 3,
        'Desktop footer has exactly 3 visual columns rendered side-by-side',
        `${desktopMetrics.footerVisualColsCount} columns`,
      );
      assert(
        desktopMetrics.statsDisplay === 'flex' && desktopMetrics.statsFlexDir === 'row',
        'Desktop stats layout is flex row',
      );
      assert(
        desktopMetrics.statNumberFontSize === '60px',
        'Desktop stat numbers are 60px',
        desktopMetrics.statNumberFontSize,
      );
      assert(
        desktopMetrics.ctaHeadingFontSize === '112px',
        'Desktop CTA heading font size is 112px',
        desktopMetrics.ctaHeadingFontSize,
      );
      assert(
        desktopMetrics.ctaSocialsGap === '16px',
        'Desktop CTA socials gap is 16px',
        desktopMetrics.ctaSocialsGap,
      );
      assert(
        desktopMetrics.heroRolesPosition === 'absolute',
        'Desktop hero roles position is absolute',
      );
      assert(
        desktopMetrics.heroRolesTextAlign === 'right',
        'Desktop hero roles text-align is right',
      );

      await page.close();
    }
  } catch (err) {
    console.error('Fatal error during test run:', err);
    totalFailures++;
  } finally {
    await browser.close();
  }

  console.log('\n===============================================================');
  if (totalFailures === 0) {
    console.log('🏆 ADVERSARIAL VERIFICATION COMPLETED WITH ZERO FAILURES!');
    console.log('VERDICT: APPROVE');
  } else {
    console.error(`💥 ADVERSARIAL VERIFICATION DETECTED ${totalFailures} FAILURES!`);
    console.log('Summary of failures:');
    failureList.forEach((f, idx) => {
      console.log(`  ${idx + 1}. ${f.message}: ${f.details}`);
    });
    console.log('VERDICT: REQUEST_CHANGES');
  }
  console.log('===============================================================\n');

  process.exit(totalFailures === 0 ? 0 : 1);
})();
