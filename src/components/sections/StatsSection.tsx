'use client';

import React, { useEffect, useRef } from 'react';

import { STATS } from '@/data/stats';

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

          const duration = 1400;
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
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px' },
    );

    counters.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      aria-label="Portfolio stats"
      id="stats-strip"
      className="relative z-10 border-y border-white/[0.08] bg-[#111111]"
    >
      <div
        ref={stripRef}
        className="mx-auto flex max-w-5xl flex-col items-center justify-around gap-8 px-4 py-12 sm:flex-row sm:gap-6 sm:px-6 sm:py-16"
      >
        {STATS.map((stat, idx) => (
          <React.Fragment key={stat.label}>
            <div className="flex flex-col items-center text-center">
              <span
                className="count-up font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                data-suffix={stat.suffix}
                data-target={String(stat.target)}
              >
                0
              </span>
              <span className="mt-2 font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
                {stat.label}
              </span>
            </div>
            {idx < STATS.length - 1 && <div className="hidden h-12 w-px bg-white/10 sm:block" />}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
