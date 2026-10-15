
// PERFORMANCE: Apply will-change to hero-pfp AFTER load, not before.
// Pre-compositing before first paint can prevent Chrome's LCP reporter
// from recording the paint event, causing NO_LCP scores.
(function applyWillChangeAfterLCP() {
  const pfp = document.querySelector('.hero-pfp');
  if (!pfp) return;
  if (pfp.complete) {
    pfp.style.setProperty('will-change', 'transform', 'important');
  } else {
    pfp.addEventListener('load', function() {
      pfp.style.setProperty('will-change', 'transform', 'important');
    }, { once: true });
  }
})();

// FEATURE 1B — HERO ENTRANCE, SCRAMBLE TYPEWRITER & PARALLAX
(function initHeroEntrance() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".premium-nav", { y: -20, opacity: 0, duration: 0.3, ease: "power2.out" });

  function scrambleType(el, text, { charDelay = 80, scrambleFrames = 5, onComplete } = {}) {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resolved = 0, frame = 0;
    el.textContent = '';
    const tick = setInterval(() => {
      frame++;
      const next = (resolved < text.length && text[resolved] !== ' ')
        ? CHARS[Math.floor(Math.random() * CHARS.length)] : (resolved < text.length ? ' ' : '');
      el.textContent = text.substring(0, resolved) + next;
      if (frame >= scrambleFrames) {
        frame = 0;
        if (resolved < text.length) resolved++;
      }
      if (resolved >= text.length) {
        clearInterval(tick);
        el.textContent = text;
        if (onComplete) onComplete();
      }
    }, charDelay / scrambleFrames);
  }

  gsap.set(".hero-title", { opacity: 1 });
  const line1 = document.querySelector(".scramble-line1");
  const line2 = document.querySelector(".scramble-line2");

  function startTyping() {
    if (!line1 || !line2) return;
    line1.textContent = '';
    line2.textContent = '';
    
    setTimeout(() => {
      line1.classList.add("typing-active");
      scrambleType(line1, "Muhammed", {
        charDelay: 90, scrambleFrames: 6,
        onComplete: () => {
          line1.classList.remove("typing-active");
          line2.classList.add("typing-active");
          scrambleType(line2, "Sinan M", {
            charDelay: 90, scrambleFrames: 6,
            onComplete: () => {
              line2.classList.remove("typing-active");
            }
          });
        }
      });
    }, 100);
  }

  if (document.readyState === 'complete') {
    startTyping();
  } else {
    window.addEventListener('load', startTyping, { once: true });
  }

  // Keep hero-pfp fully visible from the start so it registers as LCP.
  gsap.from(".hero-pfp", { scale: 1.05, duration: 0.6, ease: "power2.out" });
  gsap.from(".hero-socials a", { x: -10, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" });
  gsap.from(".hero-roles p", { x: 10, opacity: 0, duration: 0.3, stagger: 0.05, ease: "power2.out" });
  gsap.from(".scroll-circle-wrapper", { opacity: 0, scale: 0.8, duration: 0.6, delay: 0.6, ease: "power2.out" });

  // Parallax Hero Image (Branched for Desktop vs Mobile)
  if (window.innerWidth <= 768) {
    gsap.to(".hero-pfp", {
      y: "10vh",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-premium",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  } else {
    gsap.to(".hero-pfp", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-premium",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }

  gsap.to('.scroll-circle-svg', {
    rotation: 720,
    ease: 'none',
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    }
  });
})();


// FEATURE 2 — SCROLL-TRIGGERED TEXT REVEAL ANIMATIONS
(function initScrollReveal() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const trigger88 = window.innerWidth <= 768 ? 'top 92%' : 'top 88%';
  const trigger85 = window.innerWidth <= 768 ? 'top 92%' : 'top 85%';

  gsap.utils.toArray('.reveal-text').forEach(el => {
    gsap.fromTo(el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: trigger88,
          toggleActions: 'play none none none',
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-block').forEach((el, i) => {
    gsap.fromTo(el,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: trigger85,
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-stagger').forEach(list => {
    const items = list.querySelectorAll('li');
    gsap.fromTo(items,
      { x: -25, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
          start: trigger85,
        }
      }
    );
  });
})();

// FEATURE 3 — MAGNETIC BUTTON EFFECT
(function initMagneticButtons() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  const magneticEls = document.querySelectorAll(
    'nav a, .contact-link, .btn-primary, .btn-secondary, .hero-cta, .magnetic-btn, .cta-btn, .btn, .social-pill'
  );

  magneticEls.forEach(el => {
    el.classList.add('magnetic-btn');

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.15;
      const dy = (e.clientY - cy) * 0.15;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
})();

// FEATURE 4 — 3D CARD TILT ON HOVER
(function initCardTilt() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  const cards = document.querySelectorAll('.card, .split-card, .event-list-item');

  cards.forEach(card => {
    card.classList.add('tilt-card');

    if (!card.querySelector('.tilt-shine')) {
      const shine = document.createElement('div');
      shine.className = 'tilt-shine';
      if (getComputedStyle(card).position === 'static') {
        card.style.position = 'relative';
      }
      card.appendChild(shine);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -10;  // max ±10deg
      const rotY = ((x - cx) / cx) * 10;

      // Use GSAP to animate rotationX/Y independently without breaking the 'y' and 'rotation' (Z) 
      // applied by the stacking animation!
      gsap.to(card, {
        rotationX: rotX,
        rotationY: rotY,
        scale: 1.02,
        transformPerspective: 800,
        duration: 0.1,
        ease: "none",
        overwrite: "auto"
      });

      const mx = (x / rect.width * 100).toFixed(1);
      const my = (y / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto"
      });
    });
  });
})();

// FEATURE 5 — SMOOTH CUSTOM CURSOR
(function initCustomCursor() {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  const dot = document.getElementById('cursorDot');
  if (!dot) return;

  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  const hoverTargets = document.querySelectorAll('a, button, .fan-card, .project-card, .accordion-header, [role="button"], .split-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.body.style.cursor = 'none';
  hoverTargets.forEach(el => { el.style.cursor = 'none'; });
})();

// FEATURE 7 — HERO TEXT PARALLAX DEPTH
(function initHeroParallax() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.to('.hero-name', {
    yPercent: -25,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-premium',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  // Portrait parallax: desktop only — on mobile, pfp uses height:100% layout
  if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    gsap.to('.hero-portrait', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-premium',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });
  }

  gsap.to('.hero-subtitle', {
    opacity: 0,
    yPercent: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-premium',
      start: 'top top',
      end: '40% top',
      scrub: true,
    }
  });
})();

// FEATURE 8 — SECTION COUNTER / NUMBER ANIMATION
(function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// Make toggleDropdown global
window.toggleDropdown = function (button) {
  const parentItem = button.closest('.club-item') || button.closest('.event-item');
  if (parentItem) {
    parentItem.classList.toggle('active');
    button.classList.toggle('active');
  }
};



// FEATURE 9 — LETTER-BY-LETTER SCROLL FILL (about text)
(function initAboutTextFill() {
  const para    = document.querySelector('#about .large-intro-text');
  const section = document.querySelector('#about');
  if (!para || !section) return;

  // ── Force the paragraph visible; char colours handle the reveal ──────────
  para.style.opacity = '1';
  para.style.transform = 'none';

  // ── 1. Split every character into its own <span> ─────────────────────────
  const chars = [];
  const nodes = Array.from(para.childNodes);
  para.innerHTML = '';

  nodes.forEach((node, nodeIdx) => {
    let text = node.textContent.replace(/\s+/g, ' ');
    if (nodeIdx === 0) text = text.trimStart();
    if (nodeIdx === nodes.length - 1) text = text.trimEnd();
    if (!text) return;

    if (node.nodeType === Node.TEXT_NODE) {
      Array.from(text).forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        para.appendChild(s);
        chars.push(s);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // keyword span (.highlight-text) → accent colour when lit
      Array.from(text).forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char char--key';
        s.textContent = ch;
        para.appendChild(s);
        chars.push(s);
      });
    }
  });


  const total   = chars.length;
  let lastLit   = -1;
  let rafId     = null;


  // ── 2. Compute progress from the paragraph's own position ─────────────────
  function updateFill() {
    const rect = para.getBoundingClientRect();
    const vh   = window.innerHeight;
    const isMobile = window.innerWidth <= 768;

    // Fill begins when text is ~60% down the viewport on desktop, 85% on mobile
    const start = isMobile ? vh * 0.85 : vh * 0.60;  
    const end   = isMobile ? vh * 0.0 : vh * -0.40;  // finishes exactly when it hits the top edge on mobile

    let progress = (start - rect.top) / (start - end);
    progress = Math.max(0, Math.min(1, progress));

    const targetLit = Math.round(progress * total);

    if (targetLit === lastLit) { rafId = null; return; }

    if (targetLit > lastLit) {
      for (let i = Math.max(0, lastLit); i < targetLit; i++) {
        chars[i].classList.add('char--lit');
      }
    } else {
      for (let i = lastLit - 1; i >= targetLit; i--) {
        chars[i].classList.remove('char--lit');
      }
    }

    lastLit = targetLit;
    rafId = null;
  }

  function onScroll() {
    if (!rafId) rafId = requestAnimationFrame(updateFill);
  }

  // ── 3. Attach listener only while section is near viewport ───────────────
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.addEventListener('scroll', onScroll, { passive: true });
        updateFill(); // paint immediately on enter
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    });
  }, { rootMargin: '400px 0px 400px 0px' });

  observer.observe(section);

  // Also run once on load in case about section starts in view
  updateFill();
})();



// FEATURE 10 — CARD PILE BUILD-UP (Desktop) + MOBILE SCROLL REVEAL
//
// DESKTOP (> 768px):
//   Phase 1: Section heading is visible alone.
//   Phase 2: Each scroll segment drops the next card from above, landing on the pile
//            and fanning out with slight rotations for a "dealt deck" look.
//
// MOBILE (≤ 768px):
//   The GSAP pinned scroll-stack is skipped entirely.
//   Each project card is revealed with a lightweight CSS transition
//   (translateY + opacity) driven by IntersectionObserver.
//   This gives natural vertical scrolling with no layout pinning or animation gating.
(function initCardPile() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  const isMobile = window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── MOBILE PATH: clean vertical feed with IntersectionObserver reveals ──
  if (isMobile) {
    // Target only the #projects section — leave #achievements and #experience alone
    // (they have fewer cards and don't need the same treatment)
    const projectContainers = document.querySelectorAll(
      '#projects .projects, #achievements .projects, #experience .projects'
    );

    projectContainers.forEach(container => {
      const cards = Array.from(container.children).filter(el => el.matches('.card'));
      if (!cards.length) return;

      // Ensure the container is in normal block/flex flow (not grid-stacked)
      container.classList.remove('card-pile-container');
      container.classList.add('mobile-project-feed');

      if (prefersReducedMotion) {
        // Skip all animation — cards visible immediately
        cards.forEach(card => {
          card.classList.remove('fade-in-up', 'reveal-block');
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
        return;
      }

      // Set initial hidden state via class (CSS handles the transition)
      cards.forEach(card => {
        card.classList.remove('fade-in-up', 'reveal-block', 'reveal-text');
        // Kill any GSAP tweens from Feature 2 that may have targeted this card
        gsap.killTweensOf(card);
        gsap.set(card, { clearProps: 'all' });
        card.classList.add('mobile-project-card--hidden');
      });

      // Reveal each card as it enters the viewport
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('mobile-project-card--hidden');
              entry.target.classList.add('mobile-project-card--visible');
              obs.unobserve(entry.target); // Only animate once
            }
          });
        },
        {
          // Trigger when card is 8% into the viewport — early enough to feel natural
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      cards.forEach(card => observer.observe(card));
    });

    return; // ← Exit here on mobile — no GSAP pile below
  }

  // ── DESKTOP PATH: existing GSAP scroll-pinned card pile (unchanged) ──
  // ONLY target .projects containers to avoid breaking skills grids or dropdowns
  const containers = document.querySelectorAll('#projects .projects, #achievements .projects, #experience .projects');
  
  // Alternating rotation offsets → natural "dealt deck" appearance
  const ROTS = [0, -4, 3.5, -6, 5, -2.5, 4.5, -3, 6, -1, 3, -5];

  containers.forEach(container => {
    const cards = Array.from(container.children).filter(el => el.matches('.card'));
    if (cards.length < 2) return; // Don't pile if only 1 card

    const section = container.closest('section');
    const sectionInner = section?.querySelector('.section-inner');
    if (!section || !sectionInner) return;

    // Apply grid overlap: cards will perfectly stack in CSS without explicit heights
    container.classList.add('card-pile-container');

    const vh = window.innerHeight;
    const scrollPerCard = 0.70;
    const pinDistance = cards.length * vh * scrollPerCard;
    
    ScrollTrigger.create({
      trigger: section,
      start: 'top 0px',
      end: `+=${pinDistance}`,
      pin: sectionInner,
      pinSpacing: true,
    });

    cards.forEach((card, i) => {
      // Kill tweens from Feature 2 reveal to prevent conflicts
      gsap.killTweensOf(card);
      card.classList.remove('fade-in-up', 'reveal-block', 'reveal-text', 'fly-left', 'fly-right');

      const startScale = 0.9;
      const targetScale = 1;
      const yStep = 15;

      const startY = -160;
      gsap.set(card, { clearProps: 'transform,opacity,filter' });
      gsap.set(card, { y: startY, opacity: 0, scale: startScale, rotation: 0, zIndex: i + 1 });
      card.style.removeProperty('--card-index');

      const dropOffset = (i + 0.3) * (vh * scrollPerCard);
      
      ScrollTrigger.create({
        trigger: section,
        start: () => `top ${0 - dropOffset}px`,
        onEnter() {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: (i * yStep),
            opacity: 1,
            scale: targetScale,
            rotation: ROTS[i % ROTS.length],
            duration: 0.8,
            ease: 'back.out(1.2)',
          });
        },
        onLeaveBack() {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: startY,
            opacity: 0,
            scale: startScale,
            rotation: 0,
            duration: 0.4,
            ease: 'power3.in',
          });
        },
      });
    });
  });
})();


// FEATURE 11 — GLASSMORPHISM FLOATING NAV ON SCROLL
// Nav transforms from full-width transparent to a floating frosted-glass pill
// when scrolled past the hero, and reverts when scrolling back up.
(function initGlassNav() {
  const nav = document.querySelector('.premium-nav');
  const hero = document.querySelector('.hero-premium');
  if (!nav || !hero) return;

  // Use IntersectionObserver: when hero is mostly off-screen, activate glass nav
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hero is visible → restore original nav
          nav.classList.remove('nav-glass');
        } else {
          // Hero scrolled away → morph to glass pill
          nav.classList.add('nav-glass');
        }
      });
    },
    {
      // Fire when only 5% of the hero is still visible
      threshold: 0.05,
    }
  );

  observer.observe(hero);
})();


