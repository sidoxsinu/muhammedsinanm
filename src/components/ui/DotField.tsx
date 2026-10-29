'use client';

import { useEffect, useRef } from 'react';

export function DotField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect theme (dark or light) from the parent hero container
    const heroEl = container.closest('.hero-premium') || container;
    const computedBg = window.getComputedStyle(heroEl).backgroundColor;
    let isDarkBg = false;
    const rgbMatch = computedBg.match(/\d+/g);
    if (rgbMatch && rgbMatch.length >= 3) {
      const r = parseInt(rgbMatch[0], 10);
      const g = parseInt(rgbMatch[1], 10);
      const b = parseInt(rgbMatch[2], 10);
      const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      isDarkBg = luminance < 128;
    }

    const config = {
      dotRadius: 1.2,
      dotSpacing: 16,
      cursorRadius: 320,
      bulgeStrength: 52,
      waveAmplitude: 0.5,
      // Subtle, low-opacity dot colors as before
      gradientFrom: isDarkBg ? 'rgba(255, 255, 255, 0.28)' : 'rgba(0, 0, 0, 0.28)',
      gradientTo: isDarkBg ? 'rgba(255, 255, 255, 0.14)' : 'rgba(0, 0, 0, 0.14)',
    };

    const TWO_PI = Math.PI * 2;

    // Ensure single canvas instance
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: Array<{
      ax: number;
      ay: number;
      sx: number;
      sy: number;
    }> = [];

    const mouse = { x: -9999, y: -9999 };
    const size = { w: 0, h: 0 };
    let textBounds = { left: -9999, top: -9999, right: -9999, bottom: -9999 };
    let rafId: number;
    let frameCount = 0;
    let isVisible = true;

    function updateTextBounds() {
      if (!container) return;
      const heroEl = container.closest('.hero-premium') || container;
      const titleEl = heroEl.querySelector('.hero-title');
      if (titleEl) {
        const cRect = container.getBoundingClientRect();
        const tRect = titleEl.getBoundingClientRect();
        textBounds = {
          left: tRect.left - cRect.left,
          top: tRect.top - cRect.top,
          right: tRect.right - cRect.left,
          bottom: tRect.bottom - cRect.top,
        };
      }
    }

    function buildDots(w: number, h: number) {
      const step = config.dotRadius * 2 + config.dotSpacing;
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      dots = new Array(rows * cols);
      let idx = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ax = padX + col * step + step / 2;
          const ay = padY + row * step + step / 2;
          dots[idx++] = { ax, ay, sx: ax, sy: ay };
        }
      }
    }

    function doResize() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const w = Math.max(rect.width, window.innerWidth);
      const h = Math.max(rect.height, window.innerHeight);
      if (w === 0 || h === 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      size.w = w;
      size.h = h;
      updateTextBounds();
      buildDots(w, h);
    }

    function updateMouse(clientX: number, clientY: number) {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
    }

    function onMouseMove(e: MouseEvent) {
      updateMouse(e.clientX, e.clientY);
    }

    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function onTouchMove(e: TouchEvent) {
      if (e.touches[0]) {
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }

    function onTouchEnd() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function tick() {
      if (!ctx || !isVisible) return;
      frameCount++;
      const len = dots.length;
      const { w, h } = size;
      if (w === 0 || h === 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const t = frameCount * 0.02;
      ctx.clearRect(0, 0, w, h);

      // Base gradient for field dots
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, config.gradientFrom);
      grad.addColorStop(1, config.gradientTo);

      const cr = config.cursorRadius;
      const crSq = cr * cr;
      const rad = config.dotRadius;
      const hasMouse = mouse.x > -400 && mouse.x < w + 400 && mouse.y > -400 && mouse.y < h + 400;

      // Standard dots batch with gentle low opacity
      ctx.beginPath();
      ctx.fillStyle = grad;

      for (let i = 0; i < len; i++) {
        const d = dots[i];

        if (hasMouse) {
          const dx = mouse.x - d.ax;
          const dy = mouse.y - d.ay;
          const distSq = dx * dx + dy * dy;

          if (distSq < crSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / cr;
            const push = factor * factor * config.bulgeStrength;
            const angle = Math.atan2(dy, dx);
            d.sx += (d.ax - Math.cos(angle) * push - d.sx) * 0.25;
            d.sy += (d.ay - Math.sin(angle) * push - d.sy) * 0.25;
          } else {
            d.sx += (d.ax - d.sx) * 0.12;
            d.sy += (d.ay - d.sy) * 0.12;
          }
        } else {
          d.sx += (d.ax - d.sx) * 0.12;
          d.sy += (d.ay - d.sy) * 0.12;
        }

        let drawX = d.sx;
        let drawY = d.sy;

        // Subtle ambient wave breathing motion
        if (config.waveAmplitude > 0) {
          drawY += Math.sin(d.ax * 0.02 + t) * config.waveAmplitude;
          drawX += Math.cos(d.ay * 0.02 + t * 0.7) * (config.waveAmplitude * 0.5);
        }

        // Keep dots in the white space only - do not render behind or inside the text
        if (
          drawX >= textBounds.left &&
          drawX <= textBounds.right &&
          drawY >= textBounds.top &&
          drawY <= textBounds.bottom
        ) {
          continue;
        }

        ctx.moveTo(drawX + rad, drawY);
        ctx.arc(drawX, drawY, rad, 0, TWO_PI);
      }
      ctx.fill();

      rafId = requestAnimationFrame(tick);
    }

    doResize();
    const boundsTimer = setTimeout(updateTextBounds, 120);

    const resizeObserver = new ResizeObserver(() => {
      doResize();
    });
    resizeObserver.observe(container);

    window.addEventListener('resize', doResize);
    window.addEventListener('scroll', updateTextBounds, { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(container);

    rafId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(boundsTimer);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', doResize);
      window.removeEventListener('scroll', updateTextBounds);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, []);

  return <div id="dot-field-bg" ref={containerRef} aria-hidden="true" />;
}
