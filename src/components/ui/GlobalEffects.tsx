'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function GlobalEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // 1. PERFORMANCE: Apply will-change to hero-pfp AFTER load
    const pfp = document.querySelector<HTMLImageElement>('.hero-pfp');
    if (pfp) {
      if (pfp.complete) {
        pfp.style.setProperty('will-change', 'transform', 'important');
      } else {
        pfp.addEventListener(
          'load',
          () => {
            pfp.style.setProperty('will-change', 'transform', 'important');
          },
          { once: true }
        );
      }
    }

    // 2. SCROLL-TRIGGERED TEXT REVEAL ANIMATIONS
    const trigger88 = window.innerWidth <= 768 ? 'top 92%' : 'top 88%';
    const trigger85 = window.innerWidth <= 768 ? 'top 92%' : 'top 85%';

    const textElements = gsap.utils.toArray<HTMLElement>('.reveal-text');
    const textTweens = textElements.map((el) => {
      return gsap.fromTo(
        el,
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
          },
        }
      );
    });

    const blockElements = gsap.utils.toArray<HTMLElement>('.reveal-block');
    const blockTweens = blockElements.map((el) => {
      return gsap.fromTo(
        el,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: trigger85,
          },
        }
      );
    });

    const staggerElements = gsap.utils.toArray<HTMLElement>('.reveal-stagger');
    const staggerTweens = staggerElements.map((list) => {
      const items = list.querySelectorAll('li');
      return gsap.fromTo(
        items,
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
          },
        }
      );
    });

    const circleTween = gsap.to('.scroll-circle-svg', {
      rotation: 720,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    // 3. MAGNETIC BUTTON EFFECT
    const magneticCleanups: Array<() => void> = [];
    if (!isTouch) {
      const magneticEls = document.querySelectorAll<HTMLElement>(
        'nav a, .contact-link, .btn-primary, .btn-secondary, .hero-cta, .magnetic-btn, .cta-btn, .btn, .social-pill'
      );

      magneticEls.forEach((el) => {
        el.classList.add('magnetic-btn');

        const onMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const rawDx = (e.clientX - cx) * 0.15;
          const rawDy = (e.clientY - cy) * 0.15;
          const maxOffset = 14;
          const dx = Math.max(-maxOffset, Math.min(maxOffset, rawDx));
          const dy = Math.max(-maxOffset, Math.min(maxOffset, rawDy));
          el.style.transform = `translate(${dx}px, ${dy}px)`;
        };

        const onMouseLeave = () => {
          el.style.transform = 'translate(0, 0)';
        };

        el.addEventListener('mousemove', onMouseMove);
        el.addEventListener('mouseleave', onMouseLeave);

        magneticCleanups.push(() => {
          el.removeEventListener('mousemove', onMouseMove);
          el.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    }

    // 4. 3D CARD TILT ON HOVER
    const tiltCleanups: Array<() => void> = [];
    if (!isTouch) {
      const cards = document.querySelectorAll<HTMLElement>(
        '.card:not(.card-swap-container .card), .split-card, .event-list-item'
      );

      cards.forEach((card) => {
        card.classList.add('tilt-card');

        let shine = card.querySelector<HTMLDivElement>('.tilt-shine');
        if (!shine) {
          shine = document.createElement('div');
          shine.className = 'tilt-shine';
          if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
          }
          card.appendChild(shine);
        }

        const onMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const cx = rect.width / 2;
          const cy = rect.height / 2;
          const rotX = ((y - cy) / cy) * -10;
          const rotY = ((x - cx) / cx) * 10;

          gsap.to(card, {
            rotationX: rotX,
            rotationY: rotY,
            scale: 1.02,
            transformPerspective: 800,
            duration: 0.1,
            ease: 'none',
            overwrite: 'auto',
          });

          const mx = ((x / rect.width) * 100).toFixed(1);
          const my = ((y / rect.height) * 100).toFixed(1);
          card.style.setProperty('--mx', `${mx}%`);
          card.style.setProperty('--my', `${my}%`);
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        card.addEventListener('mousemove', onMouseMove);
        card.addEventListener('mouseleave', onMouseLeave);

        tiltCleanups.push(() => {
          card.removeEventListener('mousemove', onMouseMove);
          card.removeEventListener('mouseleave', onMouseLeave);
        });
      });
    }

    // 5. BUTTON GLOW CURSOR TRACKING (--x, --y)
    const glowBtns = document.querySelectorAll<HTMLElement>(
      '.carousel-nav-btn, .btn, .cta-btn, .social-pill'
    );
    const glowCleanups: Array<() => void> = [];
    glowBtns.forEach((btn) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
      };
      btn.addEventListener('mousemove', onMouseMove);
      glowCleanups.push(() => btn.removeEventListener('mousemove', onMouseMove));
    });

    // 6. BACK TO TOP BUTTON LOGIC
    const backToTopBtn = document.getElementById('back-to-top');
    let onScrollBTT: () => void;
    let onClickBTT: () => void;
    if (backToTopBtn) {
      onScrollBTT = () => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      };
      onClickBTT = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
      window.addEventListener('scroll', onScrollBTT, { passive: true });
      backToTopBtn.addEventListener('click', onClickBTT);
    }

    return () => {
      circleTween.kill();
      textTweens.forEach((t) => t.kill());
      blockTweens.forEach((t) => t.kill());
      staggerTweens.forEach((t) => t.kill());
      magneticCleanups.forEach((c) => c());
      tiltCleanups.forEach((c) => c());
      glowCleanups.forEach((c) => c());
      if (backToTopBtn) {
        window.removeEventListener('scroll', onScrollBTT);
        backToTopBtn.removeEventListener('click', onClickBTT);
      }
    };
  }, []);

  return (
    <button aria-label="Back to top" data-magnetic="" id="back-to-top">
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
