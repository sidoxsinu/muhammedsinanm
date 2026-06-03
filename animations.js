// FEATURE 1 — FAN CAROUSEL LOGIC
(function initFanCarousel() {
  const cards = Array.from(document.querySelectorAll('.fan-card'));
  const track = document.getElementById('fanTrack');
  const dotsContainer = document.getElementById('fanDots');
  const totalCards = cards.length;

  if (!totalCards) return;

  let currentIndex = Math.floor(totalCards / 2); // Start at center
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let dragThreshold = 60; // px to count as a swipe

  // ---- Build dots ----
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'fan-dot';
    dot.setAttribute('aria-label', `Card ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  // ---- Angle config: each card rotates N degrees from the active center ----
  function getAngleForOffset(offset) {
    return Math.max(-55, Math.min(55, offset * 22));
  }

  function getZForOffset(offset) {
    return offset === 0 ? 80 : -Math.abs(offset) * 30;
  }

  function getScaleForOffset(offset) {
    return offset === 0 ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.1);
  }

  // ---- Layout all cards ----
  function layoutCards(animate = true) {
    cards.forEach((card, i) => {
      const offset = i - currentIndex;
      const rotY = getAngleForOffset(offset);
      const tz = getZForOffset(offset);
      const scale = getScaleForOffset(offset);
      const tx = offset * 50; // slight horizontal spread

      const transform = `
        translateX(${tx}px)
        translateZ(${tz}px)
        rotateY(${rotY}deg)
        scale(${scale})
      `;

      card.style.transition = animate
        ? 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1), filter 0.55s ease'
        : 'none';
      card.style.transform = transform;
      card.style.zIndex = totalCards - Math.abs(offset);
      card.classList.toggle('is-active', offset === 0);
    });

    // Update dots
    document.querySelectorAll('.fan-dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  // ---- Navigation ----
  function goTo(index) {
    currentIndex = Math.max(0, Math.min(totalCards - 1, index));
    layoutCards(true);
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  // ---- Keyboard navigation ----
  document.addEventListener('keydown', (e) => {
    if (!document.getElementById('fan-carousel')) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // ---- Click on a side card to navigate to it ----
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (isDragging) return;
      if (i !== currentIndex) {
        goTo(i);
        // Prevent click from bubbling to the onclick window.open if it's a side card
        e.stopPropagation();
        e.preventDefault();
      }
    });
  });

  // ---- Drag / Swipe ----
  const stage = document.getElementById('fanStage');

  stage.addEventListener('mousedown', (e) => {
    isDragging = false;
    startX = e.clientX;
    currentX = e.clientX;
    stage.addEventListener('mousemove', onMouseMove);
    stage.addEventListener('mouseup', onMouseUp);
  });

  function onMouseMove(e) {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 8) isDragging = true;
    currentX = e.clientX;
  }

  function onMouseUp(e) {
    stage.removeEventListener('mousemove', onMouseMove);
    stage.removeEventListener('mouseup', onMouseUp);

    const dx = currentX - startX;
    if (Math.abs(dx) > dragThreshold) {
      dx < 0 ? next() : prev();
    }

    setTimeout(() => { isDragging = false; }, 50);
  }

  // Touch support
  stage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    currentX = startX;
  }, { passive: true });

  stage.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX;
  }, { passive: true });

  stage.addEventListener('touchend', () => {
    const dx = currentX - startX;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
  });

  // ---- Auto-advance every 4 seconds (pauses on hover) ----
  let autoTimer = setInterval(next, 4000);

  stage.addEventListener('mouseenter', () => clearInterval(autoTimer));
  stage.addEventListener('mouseleave', () => {
    autoTimer = setInterval(next, 4000);
  });

  // ---- Initial layout ----
  layoutCards(false);

  // ---- GSAP ScrollTrigger reveal ----
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.fromTo('.fan-carousel-header',
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fan-carousel-section',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('#cert-carousel',
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1, duration: 0.6, delay: 0.1, ease: 'expo.out',
        scrollTrigger: {
          trigger: '.fan-carousel-section',
          start: 'top 75%',
        }
      }
    );
  }

})();

// FEATURE 2 — SCROLL-TRIGGERED TEXT REVEAL ANIMATIONS
(function initScrollReveal() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

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
          start: 'top 88%',
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
          start: 'top 85%',
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
          start: 'top 85%',
        }
      }
    );
  });
})();

// FEATURE 3 — MAGNETIC BUTTON EFFECT
(function initMagneticButtons() {
  const magneticEls = document.querySelectorAll(
    'nav a, .contact-link, .btn-primary, .btn-secondary, .hero-cta'
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

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;

      const mx = (x / rect.width * 100).toFixed(1);
      const my = (y / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', `${mx}%`);
      card.style.setProperty('--my', `${my}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    });
  });
})();

// FEATURE 5 — SMOOTH CUSTOM CURSOR
(function initCustomCursor() {
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

window.toggleMenu = function () {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.classList.toggle('active');
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

  nodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      Array.from(node.textContent).forEach(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch;
        para.appendChild(s);
        chars.push(s);
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // keyword span (.highlight-text) → accent colour when lit
      Array.from(node.textContent).forEach(ch => {
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

    // Fill begins when text is ~60 % down the viewport (not right as it enters)
    const start = vh * 0.60;  // text needs to scroll in before fill starts
    const end   = vh * -0.6;  // text is 60 % above the viewport top

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

// FEATURE 10 — SCROLL-STACK CARDS  (zoom-out entrance · one card at a time)
(function initScrollStack() {
  // ── Config ─────────────────────────────────────────────────────────────
  const STICKY_TOP   = 90;   // px – just below the fixed nav
  const SPACER_RATIO = 1.35; // viewport-heights of scroll room per card
  const TAIL_RATIO   = 0.55; // extra room after the last card

  // Sections to stack  (skills added – was previously missing)
  const TARGETS = [
    { sel: '#projects .projects',      cardSel: '.card'          },
    { sel: '#achievements .projects',  cardSel: '.card'          },
    { sel: '#experience .projects',    cardSel: '.card'          },
    { sel: '#skills .skills-grid',     cardSel: '.skill-category'},
    { sel: '#clubs .clubs-list',       cardSel: '.club-item'     },
    { sel: '#hackathons .events-list', cardSel: '.event-item'    },
  ];

  TARGETS.forEach(({ sel, cardSel }) => {
    const container = document.querySelector(sel);
    if (!container) return;

    // Direct children matching the card selector only
    const cards = Array.from(container.children).filter(el => el.matches(cardSel));
    if (!cards.length) return;

    // Switch from flex / grid to block
    container.style.display   = 'block';
    container.style.marginTop = '0';   // section-inner gap handles the spacing

    const vh         = window.innerHeight;
    const spacerH    = Math.round(vh * SPACER_RATIO);
    const totalCards = cards.length;

    // ── Pip indicator row ─────────────────────────────────────────────
    const pipRow = document.createElement('div');
    pipRow.className = 'stack-pips';
    cards.forEach((_, i) => {
      const pip = document.createElement('span');
      pip.className        = 'stack-pip' + (i === 0 ? ' active' : '');
      pip.dataset.pipIndex = i;
      pipRow.appendChild(pip);
    });

    // ── Wrap every card in its own scroll-spacer ──────────────────────
    cards.forEach((card, index) => {
      const spacer = document.createElement('div');
      spacer.className      = 'card-stack-spacer';
      spacer.style.height   = `${spacerH}px`;
      spacer.style.position = 'relative';

      container.insertBefore(spacer, card);
      spacer.appendChild(card);

      // Sticky + z-index  (inline !important wins any CSS specificity)
      card.style.setProperty('position', 'sticky', 'important');
      card.style.setProperty('top',      `${STICKY_TOP}px`, 'important');
      card.style.setProperty('z-index',  `${index + 1}`,    'important');
      card.style.setProperty('margin',   '0',               'important');
      card.style.removeProperty('--card-index');

      // "01 / 06" counter badge
      const badge = document.createElement('span');
      badge.className   = 'stack-card-counter';
      badge.textContent = `${String(index + 1).padStart(2, '0')} / ${String(totalCards).padStart(2, '0')}`;
      card.appendChild(badge);

      // ── PRE-HIDE cards 2 … N ────────────────────────────────────────
      // While each card travels upward (position: sticky scrolling toward
      // its resting point) it is invisible.  When it "snaps" to 90 px, the
      // zoom-out tween fires and it materialises out of nothing.
      if (index > 0) {
        gsap.set(card, { scale: 1.3, opacity: 0, filter: 'blur(8px)' });
      }
    });

    container.appendChild(pipRow);

    const tail = document.createElement('div');
    tail.style.height = `${Math.round(vh * TAIL_RATIO)}px`;
    container.appendChild(tail);

    // ── GSAP ScrollTrigger animations ─────────────────────────────────
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const spacers = Array.from(container.children).filter(
      el => el.classList.contains('card-stack-spacer')
    );

    spacers.forEach((spacer, index) => {
      const card   = spacer.firstElementChild;
      const isLast = index === spacers.length - 1;
      if (!card) return;

      // ── A. ZOOM-OUT ENTRANCE ──────────────────────────────────────────
      // Fires the instant this spacer's top crosses 90 px from viewport top
      // = the card has just locked to its sticky resting position.
      // The card materialises at scale 1.3 / blur 8px / opacity 0 and
      // zooms out to its natural size in ~0.7 s.
      if (index > 0) {
        const enterTween = gsap.to(card, {
          scale:    1,
          opacity:  1,
          filter:   'blur(0px)',
          duration: 0.7,
          ease:     'expo.out',
          paused:   true,
        });

        ScrollTrigger.create({
          trigger: spacer,
          start: `top ${STICKY_TOP + 2}px`,   // card has just snapped into place
          onEnter() {
            // Kill competing tweens on the same props, then zoom out
            gsap.killTweensOf(card, 'scale,opacity,filter');
            enterTween.restart();
          },
          onLeaveBack() {
            // User scrolled back above this card – restore the hidden state
            gsap.set(card, { scale: 1.3, opacity: 0, filter: 'blur(8px)' });
            enterTween.pause(0);
          },
        });
      }

      // ── B. PIP INDICATOR ─────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: spacer,
        start:   `top ${STICKY_TOP + 1}px`,
        end:     `bottom ${STICKY_TOP + 1}px`,
        onEnter:     () => activatePip(index, pipRow, spacers.length),
        onEnterBack: () => activatePip(index, pipRow, spacers.length),
      });

      // ── C. SCALE-BACK as the NEXT card rises to cover this one ───────
      // The covered card subtly shrinks and blurs so the incoming card
      // feels like it is "pushing" the current one back.
      if (!isLast) {
        gsap.to(card, {
          scale:        0.94,
          opacity:      0.5,
          filter:       'blur(1.5px)',
          borderRadius: '20px',
          ease:         'none',
          scrollTrigger: {
            trigger: spacer,
            start:   `bottom ${STICKY_TOP + 40}px`,
            end:     'bottom top',
            scrub:   0.8,
          },
        });
      }
    });
  });

  /** Highlight pip at `index`, dim the rest */
  function activatePip(index, pipRow, total) {
    if (!pipRow) return;
    for (let i = 0; i < total; i++) {
      const pip = pipRow.querySelector(`[data-pip-index="${i}"]`);
      if (pip) pip.classList.toggle('active', i === index);
    }
  }
})();


