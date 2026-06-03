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
  let dragThreshold = window.innerWidth <= 768 ? 40 : 60; // px to count as a swipe

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
  const autoDelay = window.innerWidth <= 768 ? 5000 : 4000;
  let autoTimer = setInterval(next, autoDelay);

  stage.addEventListener('mouseenter', () => clearInterval(autoTimer));
  stage.addEventListener('mouseleave', () => {
    autoTimer = setInterval(next, autoDelay);
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

  // If touch device: skip char-split animation, just show text fully lit
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.querySelectorAll('.large-intro-text .char').forEach(c => {
      c.style.color = c.closest('.highlight-text') ? '#E54D2E' : '#ffffff';
    });
    return; // exit IIFE early
  }

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



// FEATURE 10 — CARD PILE BUILD-UP
// Phase 1: Section heading is visible alone.
// Phase 2: Each ~70 vh of scrolling drops the next card from above,
//          landing on the pile and fanning out with slight rotations for a "dealt deck" look.
(function initCardPile() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  // ONLY target .projects containers to avoid breaking skills grids or dropdowns
  const containers = document.querySelectorAll('#projects .projects, #achievements .projects');
  
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
    const pinDistance = cards.length * vh * 0.7;
    
    // We don't need to manually stretch the section or use fragile CSS sticky.
    // GSAP will pin the inner section automatically and add the required spacing!
    ScrollTrigger.create({
      trigger: section,
      start: 'top 0px', // Pin at the very top of the screen to move everything upwards
      end: `+=${pinDistance}`,
      pin: sectionInner, // Pin the inner wrapper
      pinSpacing: true, // Automatically adds padding to the parent
    });

    // 3. Set up cards
    cards.forEach((card, i) => {
      // Kill tweens from Feature 2 reveal to prevent conflicts
      gsap.killTweensOf(card);
      card.classList.remove('fade-in-up', 'reveal-block', 'reveal-text', 'fly-left', 'fly-right');

      // Set initial state: hidden, high above
      gsap.set(card, { clearProps: 'transform,opacity,filter' });
      gsap.set(card, { y: -160, opacity: 0, scale: 0.9, rotation: 0, zIndex: i + 1 });
      card.style.removeProperty('--card-index');

      // 4. ScrollTrigger: drop each card when its threshold is reached
      // We calculate when this specific card should drop based on how far we've scrolled into the pin.
      const dropOffset = (i + 0.3) * (vh * 0.70);
      
      ScrollTrigger.create({
        trigger: section, // We use the section as trigger
        // This fires when the section has scrolled up by `dropOffset` pixels PAST the 0px mark
        start: () => `top ${0 - dropOffset}px`,
        onEnter() {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: (i * 15), // pile offset: 15 px deeper per card
            opacity: 1,
            scale: 1,
            rotation: ROTS[i % ROTS.length],
            duration: 0.8,
            ease: 'back.out(1.2)',
          });
        },
        onLeaveBack() {
          // Reverse: card flies back above the pile
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: -160,
            opacity: 0,
            scale: 0.9,
            rotation: 0,
            duration: 0.4,
            ease: 'power3.in',
          });
        },
      });
    });
  });
})();

// FEATURE: MOBILE NAV TOGGLE
(function initMobileNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const menu = document.getElementById('mobile-nav-menu');
  if (!hamburger || !menu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on any link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
