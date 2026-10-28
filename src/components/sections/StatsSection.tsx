'use client';

import React, { useEffect, useRef } from 'react';

export function StatsSection() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const counters = strip.querySelectorAll<HTMLElement>('.count-up');
    if (!counters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.target || '0', 10);
          const suffix = el.dataset.suffix || '';

          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            el.textContent = target + suffix;
            return;
          }

          const duration = 1800;
          const startTime = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );

    counters.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section aria-label="Portfolio stats" className="stats-strip-section" id="stats-strip">
      <div className="stats-strip" ref={stripRef}>
        <div className="stat-item fade-in-up">
          <span className="stat-number count-up" data-suffix="+" data-target="27">
            0
          </span>
          <span className="stat-label">HACKATHONS</span>
        </div>
        <div className="stat-item fade-in-up">
          <span className="stat-number count-up" data-suffix="+" data-target="8">
            0
          </span>
          <span className="stat-label">PROJECTS</span>
        </div>
        <div className="stat-item fade-in-up">
          <span className="stat-number count-up" data-suffix="" data-target="2">
            0
          </span>
          <span className="stat-label">AWARDS</span>
        </div>
      </div>
    </section>
  );
}
