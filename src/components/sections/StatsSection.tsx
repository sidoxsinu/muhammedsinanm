'use client';

import React, { useEffect, useState } from 'react';
import { STATS } from '@/data/stats';
import { Container } from '@/components/ui/Container';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const prefersReduced = useReducedMotion();
  const [count, setCount] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (prefersReduced || !inView) return;

    let start = 0;
    const duration = 1200;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, target, prefersReduced]);

  return (
    <span ref={ref} className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight">
      {count}
      <span className="text-[var(--accent-red)]">{suffix}</span>
    </span>
  );
}

export function StatsSection() {
  return (
    <section aria-label="Portfolio stats" className="py-12 border-y border-[var(--border-subtle)] bg-white/[0.02]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 text-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <Counter target={stat.target} suffix={stat.suffix} />
              <span className="mt-2 text-xs sm:text-sm font-mono tracking-widest text-[var(--text-muted)] uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
