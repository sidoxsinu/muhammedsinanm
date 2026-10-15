/**
 * carousel-3d.js
 * Interactive 3D coverflow carousels, timeline scrolling, and UI micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---- 1. Journey Timeline Navigation Controls ----
  (function initJourneyTimeline() {
    const prevBtn = document.getElementById('jtl-new-prev');
    const nextBtn = document.getElementById('jtl-new-next');
    const viewport = document.getElementById('journey-timeline-viewport');
    if (prevBtn && nextBtn && viewport) {
      prevBtn.addEventListener('click', () => viewport.scrollBy({ left: -350, behavior: 'smooth' }));
      nextBtn.addEventListener('click', () => viewport.scrollBy({ left: 350, behavior: 'smooth' }));
    }
  })();

  // ---- 2. Infinite 3D Coverflow for Certificate Carousel ----
  (function initCertificateCoverflow() {
    const viewport = document.getElementById('cert-viewport');
    const track = document.getElementById('cert-track');
    if (!viewport || !track) return;

    // Clone the original cards — prepend + append full set copies for infinite looping
    const originals = Array.from(track.querySelectorAll('.cert-card'));
    if (!originals.length) return;

    function cloneSet() {
      return originals.map(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        return clone;
      });
    }

    const prependClones = cloneSet();
    const appendClones = cloneSet();

    // Insert clones
    prependClones.reverse().forEach(c => track.prepend(c));
    appendClones.forEach(c => track.append(c));

    // Cache all cert cards after clones are added to track
    const certCards = Array.from(track.querySelectorAll('.cert-card'));

    let cachedCardDims = [];
    let setWidth = 0;
    let jumping = false;
    let autoScrollPaused = false;
    let accumulatedScrollY = 0;

    function cacheDimensions() {
      const n = originals.length;
      if (certCards[n] && certCards[0]) {
        setWidth = certCards[n].offsetLeft - certCards[0].offsetLeft;
      } else {
        setWidth = 0;
      }

      cachedCardDims = certCards.map(card => ({
        card: card,
        offsetLeft: card.offsetLeft,
        offsetWidth: card.offsetWidth
      }));
    }

    function ensureDimensions() {
      if (setWidth === 0 || !cachedCardDims.length) {
        cacheDimensions();
      }
    }

    function initScroll() {
      cacheDimensions();
      if (setWidth > 0) {
        viewport.scrollLeft = setWidth;
      }
    }

    // Apply 3D transforms using cached dimensions (disabled on mobile for a constant flat look)
    function applyCoverflow() {
      ensureDimensions();
      if (!cachedCardDims.length) return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        cachedCardDims.forEach(dim => {
          dim.card.style.transform = 'none';
          dim.card.style.filter = 'none';
        });
        return;
      }

      const vpCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      const SPREAD = viewport.clientWidth * 0.55;

      cachedCardDims.forEach(dim => {
        const cardCenter = dim.offsetLeft + dim.offsetWidth / 2;
        const dist = cardCenter - vpCenter;
        const t = Math.max(-1, Math.min(1, dist / SPREAD));

        const maxRot = -50;
        const rotateY = t * maxRot;
        const scale = 1 + Math.abs(t) * 0.35;
        const zTranslate = Math.abs(t) * 80;
        const brightness = 1 - Math.abs(t) * 0.35;

        dim.card.style.transform = `perspective(1400px) rotateY(${rotateY}deg) scale(${scale}) translateZ(${zTranslate}px)`;
        dim.card.style.filter = `brightness(${brightness})`;
      });
    }

    // Infinite scroll guard — teleport when entering the clone zones
    function guardInfinite() {
      if (jumping) return;
      ensureDimensions();
      if (setWidth === 0) return;

      if (viewport.scrollLeft >= setWidth * 2) {
        jumping = true;
        viewport.scrollLeft -= setWidth;
        jumping = false;
      } else if (viewport.scrollLeft <= 0) {
        jumping = true;
        viewport.scrollLeft += setWidth;
        jumping = false;
      }
    }

    let ticked = false;
    viewport.addEventListener('scroll', () => {
      guardInfinite();
      if (!ticked) {
        requestAnimationFrame(() => {
          applyCoverflow();
          ticked = false;
        });
        ticked = true;
      }
    }, { passive: true });

    // Vertical wheel scroll hijack to scroll the carousel for one round
    viewport.addEventListener('wheel', (e) => {
      ensureDimensions();
      if (setWidth > 0 && Math.abs(accumulatedScrollY) < setWidth) {
        e.preventDefault();
        viewport.scrollLeft += e.deltaY;
        accumulatedScrollY += Math.abs(e.deltaY);
      }
    }, { passive: false });

    // Drag-to-scroll (mouse) & Click Handling
    let isDown = false;
    let startX = 0;
    let totalDelta = 0;
    let isDraggingCard = false;

    // Pause auto-scroll on hover or interaction
    viewport.addEventListener('mouseenter', () => {
      autoScrollPaused = true;
      accumulatedScrollY = 0;
    });

    viewport.addEventListener('mouseleave', () => {
      if (!isDown) {
        autoScrollPaused = false;
      }
      accumulatedScrollY = 0;
    });

    viewport.addEventListener('mousedown', e => {
      isDown = true;
      isDraggingCard = false;
      totalDelta = 0;
      startX = e.pageX - viewport.offsetLeft;
      viewport.style.cursor = 'grabbing';
      autoScrollPaused = true;
    });

    document.addEventListener('mouseup', () => {
      isDown = false;
      viewport.style.cursor = 'grab';
      if (!viewport.matches(':hover')) {
        autoScrollPaused = false;
      }
    });

    viewport.addEventListener('mouseleave', () => {
      isDown = false;
      viewport.style.cursor = 'grab';
    });

    let touchStartX = 0;
    let scrollLeftVal = 0;

    viewport.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      isDown = true;
      startX = touchStartX;
      scrollLeftVal = viewport.scrollLeft;
      autoScrollPaused = true;
    }, { passive: true });

    viewport.addEventListener('touchmove', e => {
      if (!isDown) return;
      const dx = (touchStartX - e.touches[0].clientX) * 1.2;
      viewport.scrollLeft = scrollLeftVal + dx;
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      isDown = false;
      setTimeout(() => {
        if (!viewport.matches(':hover')) {
          autoScrollPaused = false;
        }
      }, 2000);
    });

    viewport.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const deltaX = x - startX;
      totalDelta += Math.abs(deltaX);

      if (totalDelta > 5) {
        isDraggingCard = true;
      }

      viewport.scrollLeft -= deltaX * 1.5;
      startX = x;
    });

    // Click handler for cards
    viewport.addEventListener('click', e => {
      if (isDraggingCard) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const card = e.target.closest('.cert-card');
      if (card) {
        const url = card.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
      }
    });

    // Auto-scroll ticker
    let scrollAccumulator = 0;
    function autoScroll() {
      if (!isDown && !autoScrollPaused) {
        scrollAccumulator += 0.6;
        if (scrollAccumulator >= 1) {
          const step = Math.floor(scrollAccumulator);
          viewport.scrollLeft += step;
          scrollAccumulator -= step;
        }
      }
      requestAnimationFrame(autoScroll);
    }

    // Init & Listeners
    requestAnimationFrame(() => {
      initScroll();
      requestAnimationFrame(applyCoverflow);
      requestAnimationFrame(autoScroll);
    });

    window.addEventListener('load', () => {
      cacheDimensions();
      applyCoverflow();
    });

    window.addEventListener('resize', () => {
      cacheDimensions();
      applyCoverflow();
    });
  })();

  // ---- 3. 3D Coverflow Effect for Generic Carousels ----
  (function initGenericCarousels() {
    function updateCarousel3D(viewport) {
      const cards = viewport.querySelectorAll('.jtl-card, .cert-card');
      if (!cards.length) return;

      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;

      cards.forEach(card => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = cardCenter - viewportCenter;

        const maxRotation = 35;
        const rotationFactor = distance / (viewport.clientWidth / 1.5);
        let rotateY = rotationFactor * -maxRotation;
        rotateY = Math.max(-maxRotation, Math.min(maxRotation, rotateY));

        const zTranslate = Math.abs(rotationFactor) * -200;
        const scale = Math.max(0.7, 1 - Math.abs(rotationFactor) * 0.2);

        card.style.transform = `perspective(1200px) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`;
      });
    }

    document.querySelectorAll('.carousel-viewport').forEach(viewport => {
      updateCarousel3D(viewport);
      viewport.addEventListener('scroll', () => {
        requestAnimationFrame(() => updateCarousel3D(viewport));
      });
    });

    const prevBtns = document.querySelectorAll('.carousel-nav-btn.prev');
    const nextBtns = document.querySelectorAll('.carousel-nav-btn.next');

    prevBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const container = btn.closest('.carousel-stage');
        const viewport = container?.querySelector('.carousel-viewport');
        if (viewport) {
          const scrollAmount = window.innerWidth <= 768 ? 280 : 350;
          viewport.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      });
    });

    nextBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const container = btn.closest('.carousel-stage');
        const viewport = container?.querySelector('.carousel-viewport');
        if (viewport) {
          const scrollAmount = window.innerWidth <= 768 ? 280 : 350;
          viewport.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      });
    });
  })();

  // ---- 4. Button Glow Tracking Effect on Mouse Move ----
  (function initButtonGlow() {
    document.querySelectorAll('.carousel-nav-btn, .btn, .cta-btn, .social-pill').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
      });
    });
  })();

  // ---- 5. Back to Top Button Logic ----
  (function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  })();
});
