'use client';

import React, { useEffect, useRef } from 'react';
import { CERTIFICATE_CARDS } from '@/data/certificates';

export function CertificateGallerySection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // 1. Clone the original cards — prepend + append full set copies
    const originals = Array.from(track.querySelectorAll<HTMLElement>('.cert-card:not([data-clone])'));
    if (!originals.length) return;

    function cloneSet() {
      return originals.map((card) => {
        const clone = card.cloneNode(true) as HTMLElement;
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('data-clone', 'true');
        return clone;
      });
    }

    const prependClones = cloneSet();
    const appendClones = cloneSet();

    // Insert clones
    prependClones.reverse().forEach((c) => track.prepend(c));
    appendClones.forEach((c) => track.append(c));

    // Cache all cert cards after clones are added to track
    const certCards = Array.from(track.querySelectorAll<HTMLElement>('.cert-card'));

    let cachedCardDims: Array<{ card: HTMLElement; offsetLeft: number; offsetWidth: number }> = [];
    let setWidth = 0;
    let jumping = false;
    let autoScrollPaused = false;
    let accumulatedScrollY = 0;

    const cacheDimensions = () => {
      const n = originals.length;
      if (certCards[n] && certCards[0]) {
        setWidth = certCards[n].offsetLeft - certCards[0].offsetLeft;
      } else {
        setWidth = 0;
      }

      cachedCardDims = certCards.map((card) => ({
        card: card,
        offsetLeft: card.offsetLeft,
        offsetWidth: card.offsetWidth,
      }));
    };

    const ensureDimensions = () => {
      if (setWidth === 0 || !cachedCardDims.length) {
        cacheDimensions();
      }
    };

    const initScroll = () => {
      cacheDimensions();
      if (setWidth > 0) {
        viewport.scrollLeft = setWidth;
      }
    };

    // 3. Apply 3D transforms using cached dimensions (disabled on mobile for a constant flat look)
    const applyCovertflow = () => {
      ensureDimensions();
      if (!cachedCardDims.length) return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        cachedCardDims.forEach((dim) => {
          dim.card.style.transform = 'none';
          dim.card.style.filter = 'none';
        });
        return;
      }

      const vpCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      const SPREAD = viewport.clientWidth * 0.55;

      cachedCardDims.forEach((dim) => {
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
    };

    // 4. Infinite scroll guard — teleport when entering the clone zones
    const guardInfinite = () => {
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
    };

    let ticked = false;
    const onScroll = () => {
      guardInfinite();
      if (!ticked) {
        requestAnimationFrame(() => {
          applyCovertflow();
          ticked = false;
        });
        ticked = true;
      }
    };
    viewport.addEventListener('scroll', onScroll, { passive: true });

    // Wheel hijack for horizontal rotation
    const onWheel = (e: WheelEvent) => {
      ensureDimensions();
      if (setWidth > 0 && Math.abs(accumulatedScrollY) < setWidth) {
        e.preventDefault();
        viewport.scrollLeft += e.deltaY;
        accumulatedScrollY += Math.abs(e.deltaY);
      }
    };
    viewport.addEventListener('wheel', onWheel, { passive: false });

    // Drag-to-scroll (mouse) & Click Handling
    let isDown = false;
    let startX = 0;
    let totalDelta = 0;
    let isDraggingCard = false;

    const onMouseEnter = () => {
      autoScrollPaused = true;
      accumulatedScrollY = 0;
    };
    const onMouseLeave = () => {
      if (!isDown) {
        autoScrollPaused = false;
      }
      accumulatedScrollY = 0;
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      isDraggingCard = false;
      totalDelta = 0;
      startX = e.pageX - viewport.offsetLeft;
      viewport.style.cursor = 'grabbing';
      autoScrollPaused = true;
    };

    const onMouseUp = () => {
      isDown = false;
      viewport.style.cursor = 'grab';
      if (!viewport.matches(':hover')) {
        autoScrollPaused = false;
      }
    };

    const onViewportLeave = () => {
      isDown = false;
      viewport.style.cursor = 'grab';
    };

    let touchStartX = 0;
    let scrollLeftVal = 0;
    let touchEndTimeout: ReturnType<typeof setTimeout> | null = null;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      isDown = true;
      startX = touchStartX;
      scrollLeftVal = viewport.scrollLeft;
      autoScrollPaused = true;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const dx = (touchStartX - e.touches[0].clientX) * 1.2;
      viewport.scrollLeft = scrollLeftVal + dx;
    };

    const onTouchEnd = () => {
      isDown = false;
      touchEndTimeout = setTimeout(() => {
        if (!viewport.matches(':hover')) {
          autoScrollPaused = false;
        }
      }, 2000);
    };

    const onMouseMove = (e: MouseEvent) => {
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
    };

    const onClick = (e: MouseEvent) => {
      if (isDraggingCard) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const card = (e.target as HTMLElement).closest('.cert-card');
      if (card) {
        const url = card.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
      }
    };

    viewport.addEventListener('mouseenter', onMouseEnter);
    viewport.addEventListener('mouseleave', onMouseLeave);
    viewport.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    viewport.addEventListener('mouseleave', onViewportLeave);

    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: true });
    viewport.addEventListener('touchend', onTouchEnd);
    viewport.addEventListener('mousemove', onMouseMove);
    viewport.addEventListener('click', onClick);

    // Auto-scroll loop
    let scrollAccumulator = 0;
    let rafId: number;
    const autoScroll = () => {
      if (!isDown && !autoScrollPaused) {
        scrollAccumulator += 0.6;
        if (scrollAccumulator >= 1) {
          const step = Math.floor(scrollAccumulator);
          viewport.scrollLeft += step;
          scrollAccumulator -= step;
        }
      }
      rafId = requestAnimationFrame(autoScroll);
    };

    const onResize = () => {
      cacheDimensions();
      applyCovertflow();
    };
    window.addEventListener('resize', onResize);

    const initRaf = requestAnimationFrame(() => {
      initScroll();
      requestAnimationFrame(applyCovertflow);
      requestAnimationFrame(autoScroll);
    });

    return () => {
      cancelAnimationFrame(initRaf);
      cancelAnimationFrame(rafId);
      if (touchEndTimeout) clearTimeout(touchEndTimeout);
      window.removeEventListener('resize', onResize);
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('mouseenter', onMouseEnter);
      viewport.removeEventListener('mouseleave', onMouseLeave);
      viewport.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      viewport.removeEventListener('mouseleave', onViewportLeave);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('mousemove', onMouseMove);
      viewport.removeEventListener('click', onClick);
      prependClones.forEach((c) => c.remove());
      appendClones.forEach((c) => c.remove());
    };
  }, []);

  return (
    <section className="cert-carousel-section" id="fan-carousel">
      <div className="section-bg-scroll-circle cert-scroll-circle">
        <div className="scroll-circle">
          <svg className="scroll-circle-svg" viewBox="0 0 100 100" width="120" height="120">
            <path
              id="circlePath-certs"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
              stroke="none"
            />
            <text>
              <textPath
                href="#circlePath-certs"
                startOffset="0%"
                textLength="220"
                lengthAdjust="spacingAndGlyphs"
                fontSize="11"
                fill="currentColor"
                letterSpacing="3.4px"
                style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}
              >
                SCROLL • EXPLORE • SCROLL • EXPLORE •
              </textPath>
            </text>
          </svg>
          <div className="scroll-circle-icon scroll-circle-asterisk">
            <svg
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="36"
              height="36"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
            </svg>
          </div>
        </div>
      </div>
      <div className="cert-carousel-header">
        <span className="fan-label">{'// Certifications'}</span>
        <h2 className="fan-title">
          What I&apos;ve <em>Earned</em>
        </h2>
        <p className="fan-subtitle">Scroll or drag to explore certificates and recognitions.</p>
      </div>
      <div className="cert-carousel-stage">
        <div className="cert-viewport" id="cert-viewport" ref={viewportRef}>
          <div className="cert-track" id="cert-track" ref={trackRef}>
            {CERTIFICATE_CARDS.map((card) => (
              <div
                key={card.number}
                className="cert-card"
                data-url={card.documentUrl}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    window.open(card.documentUrl, '_blank');
                  }
                }}
              >
                <div className="cert-card-inner">
                  <img src={card.thumbnail} alt={card.name} loading="lazy" />
                </div>
                <div className="cert-card-footer">
                  <span className="cert-card-num">{card.number}</span>
                  <span className="cert-card-name">{card.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
