class CardSwap {
  constructor(containerEl, options = {}) {
    if (!containerEl) return;
    this.container = containerEl;
    this.cardDistance = options.cardDistance !== undefined ? options.cardDistance : 30;
    this.verticalDistance = options.verticalDistance !== undefined ? options.verticalDistance : 25;
    this.delay = options.delay || 4000;
    this.pauseOnHover = options.pauseOnHover !== undefined ? options.pauseOnHover : true;
    this.skewAmount = options.skewAmount !== undefined ? options.skewAmount : 5;
    this.easing = options.easing || 'elastic';

    this.cards = Array.from(this.container.querySelectorAll('.card'));
    this.total = this.cards.length;
    this.order = Array.from({ length: this.total }, (_, i) => i);
    this.tl = null;
    this.intervalId = null;
    this.isAnimating = false;
    this.mobileIndex = 0;
    this.isMobileMode = false;

    this.config = this.easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 1.0,
          durMove: 1.0,
          durReturn: 1.0,
          promoteOverlap: 0.85,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.6,
          durMove: 0.6,
          durReturn: 0.6,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

    this.init();
  }

  getCardSize() {
    const vw = window.innerWidth;
    if (vw <= 768) {
      // Tablet
      const w = Math.min(400, vw - 160);
      const h = Math.round(w * 0.575);
      return { w, h };
    }
    return { w: 520, h: 260 };
  }

  makeSlot(i) {
    const dX = this.currentCardDistance || 28;
    const dY = this.currentVerticalDistance || 22;
    return {
      x: i * dX,
      y: -i * dY,
      z: -i * dX * 1.5,
      zIndex: this.total - i
    };
  }

  placeNow(el, slot) {
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: this.skewAmount,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true
    });
  }

  sizeCards() {
    if (this.isMobileMode) return;
    const { w, h } = this.getCardSize();
    this.container.style.width = w + 'px';
    this.container.style.height = h + 'px';

    // Scale slot offsets dynamically
    this.currentCardDistance = w * 0.054;
    this.currentVerticalDistance = h * 0.085;

    this.cards.forEach(card => {
      card.style.width = w + 'px';
      card.style.height = h + 'px';
    });
  }

  // ── Mobile carousel methods ──
  checkMobileMode() {
    return window.innerWidth <= 480;
  }

  buildDots() {
    const dotsContainer = document.getElementById('card-swap-dots');
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    this.cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'card-swap-dot' + (i === this.mobileIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Quote ' + (i + 1));
      dot.addEventListener('click', () => {
        this.mobileGoTo(i);
        this.resetTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  updateDots() {
    const dots = document.querySelectorAll('.card-swap-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.mobileIndex);
    });
  }

  mobileShow() {
    this.cards.forEach((card) => {
      // Clear any GSAP inline styles for mobile
      gsap.set(card, { clearProps: 'all' });
      card.classList.remove('mobile-active');
      card.style.width = '';
      card.style.height = '';
    });
    // Show active card
    this.cards[this.mobileIndex].classList.add('mobile-active');
    this.updateDots();
  }

  mobileGoTo(index) {
    if (index < 0) index = this.total - 1;
    if (index >= this.total) index = 0;
    this.mobileIndex = index;
    this.mobileShow();
  }

  mobileNext() {
    this.mobileGoTo(this.mobileIndex + 1);
  }

  mobilePrev() {
    this.mobileGoTo(this.mobileIndex - 1);
  }

  enterMobileMode() {
    this.isMobileMode = true;
    // Kill any running GSAP animations
    if (this.tl) { this.tl.kill(); this.tl = null; }
    // Clear container sizing
    this.container.style.width = '';
    this.container.style.height = '';
    this.buildDots();
    this.mobileShow();
    this.setupSwipe();
    this.start();
  }

  exitMobileMode() {
    this.isMobileMode = false;
    // Remove mobile classes and clear inline styles
    this.cards.forEach(card => {
      card.classList.remove('mobile-active');
      card.style.display = '';
    });
    // Hide dots
    const dotsContainer = document.getElementById('card-swap-dots');
    if (dotsContainer) dotsContainer.innerHTML = '';
    // Rebuild desktop layout
    this.sizeCards();
    this.cards.forEach((card, i) => {
      const orderIdx = this.order.indexOf(i);
      this.placeNow(card, this.makeSlot(orderIdx));
    });
    this.start();
  }

  setupSwipe() {
    if (this._swipeBound) return;
    this._swipeBound = true;
    let startX = 0;
    let startY = 0;
    let tracking = false;

    const handleStart = (x, y) => {
      startX = x;
      startY = y;
      tracking = true;
    };

    const handleEnd = (x, y) => {
      if (!tracking) return;
      tracking = false;
      const diffX = x - startX;
      const diffY = y - startY;
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          if (this.isMobileMode) this.mobileNext();
          else this.swap();
        } else {
          if (this.isMobileMode) this.mobilePrev();
          else this.swapPrev();
        }
        this.resetTimer();
      }
    };

    this.container.addEventListener('touchstart', (e) => {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }, { passive: true });

    this.container.addEventListener('mousedown', (e) => {
      handleStart(e.clientX, e.clientY);
    });

    this.container.addEventListener('mouseup', (e) => {
      handleEnd(e.clientX, e.clientY);
    });

    this.container.addEventListener('mouseleave', (e) => {
      if (tracking) handleEnd(e.clientX, e.clientY);
    });
  }

  // ── Init ──
  init() {
    const isMobile = this.checkMobileMode();

    if (isMobile) {
      this.enterMobileMode();
    } else {
      this.sizeCards();
      this.cards.forEach((card, i) => {
        this.placeNow(card, this.makeSlot(i));
      });
      this.start();
    }

    this.setupSwipe();

    // Resize handler — switch between modes
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nowMobile = this.checkMobileMode();
        if (nowMobile && !this.isMobileMode) {
          this.pause();
          this.enterMobileMode();
        } else if (!nowMobile && this.isMobileMode) {
          this.pause();
          this.exitMobileMode();
        } else if (!nowMobile) {
          this.sizeCards();
          this.cards.forEach((card, i) => {
            const orderIdx = this.order.indexOf(i);
            this.placeNow(card, this.makeSlot(orderIdx));
          });
        }
      }, 200);
    });

    if (this.pauseOnHover) {
      this.container.addEventListener('mouseenter', () => this.pause());
      this.container.addEventListener('mouseleave', () => this.resume());
    }
  }

  // ── Desktop swap animations (unchanged) ──
  swap() {
    if (this.isMobileMode) {
      this.mobileNext();
      return;
    }
    if (this.order.length < 2 || this.isAnimating) return;
    this.isAnimating = true;

    const [front, ...rest] = this.order;
    const elFront = this.cards[front];
    this.tl = gsap.timeline({
      onComplete: () => { this.isAnimating = false; }
    });

    // Drop the front card down
    this.tl.to(elFront, {
      y: '+=450',
      opacity: 0,
      duration: this.config.durDrop,
      ease: this.config.ease
    });

    this.tl.addLabel('promote', `-=${this.config.durDrop * this.config.promoteOverlap}`);

    // Promote remaining cards forward
    rest.forEach((idx, i) => {
      const el = this.cards[idx];
      const slot = this.makeSlot(i);
      this.tl.set(el, { zIndex: slot.zIndex }, 'promote');
      this.tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: this.config.durMove,
          ease: this.config.ease
        },
        `promote+=${i * 0.12}`
      );
    });

    // Return front card to back
    const backSlot = this.makeSlot(this.total - 1);
    this.tl.addLabel('return', `promote+=${this.config.durMove * this.config.returnDelay}`);
    this.tl.call(() => {
      gsap.set(elFront, { zIndex: backSlot.zIndex });
    }, undefined, 'return');
    this.tl.to(elFront, {
      x: backSlot.x,
      y: backSlot.y,
      z: backSlot.z,
      opacity: 1,
      duration: this.config.durReturn,
      ease: this.config.ease
    }, 'return');

    this.tl.call(() => {
      this.order = [...rest, front];
    });
  }

  swapPrev() {
    if (this.isMobileMode) {
      this.mobilePrev();
      return;
    }
    if (this.order.length < 2 || this.isAnimating) return;
    this.isAnimating = true;

    const last = this.order[this.order.length - 1];
    const elBack = this.cards[last];
    this.tl = gsap.timeline({
      onComplete: () => { this.isAnimating = false; }
    });

    // Lift the back card up off-screen
    this.tl.set(elBack, { opacity: 0, y: '-=400' });

    // Push all current cards back one slot
    this.tl.addLabel('demote', 0);
    this.order.slice(0, -1).forEach((idx, i) => {
      const el = this.cards[idx];
      const slot = this.makeSlot(i + 1);
      this.tl.set(el, { zIndex: slot.zIndex }, 'demote');
      this.tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: this.config.durMove,
          ease: this.config.ease
        },
        `demote+=${i * 0.08}`
      );
    });

    // Bring the back card to front
    const frontSlot = this.makeSlot(0);
    this.tl.set(elBack, { zIndex: frontSlot.zIndex }, 'demote');
    this.tl.to(elBack, {
      x: frontSlot.x,
      y: frontSlot.y,
      z: frontSlot.z,
      opacity: 1,
      duration: this.config.durReturn,
      ease: this.config.ease
    }, 'demote+=0.1');

    this.tl.call(() => {
      this.order = [last, ...this.order.slice(0, -1)];
    });
  }

  resetTimer() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.swap(), this.delay);
  }

  start() {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => this.swap(), this.delay);
  }

  pause() {
    if (this.tl) this.tl.pause();
    clearInterval(this.intervalId);
  }

  resume() {
    if (this.tl) this.tl.play();
    this.intervalId = setInterval(() => this.swap(), this.delay);
  }

  destroy() {
    clearInterval(this.intervalId);
    if (this.tl) this.tl.kill();
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('testimonials-card-swap');
  if (container) {
    const cs = new CardSwap(container, {
      cardDistance: 28,
      verticalDistance: 22,
      delay: 2500,
      pauseOnHover: true,
      skewAmount: 5,
      easing: 'elastic'
    });

    const prevBtn = document.getElementById('card-swap-prev');
    const nextBtn = document.getElementById('card-swap-next');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        cs.swap();
        cs.resetTimer();
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        cs.swapPrev();
        cs.resetTimer();
      });
    }
  }
});
