'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { GradualBlur } from '@/components/ui/GradualBlur';

export function PageGradualBlur() {
  const pathname = usePathname();
  const [onHero, setOnHero] = useState(() => pathname === '/');

  useEffect(() => {
    // For non-home pages, no hero exists so blur is visible
    if (pathname !== '/') {
      const timer = requestAnimationFrame(() => setOnHero(false));
      return () => cancelAnimationFrame(timer);
    }

    const hero = document.querySelector('.hero-premium');
    if (!hero) {
      const timer = requestAnimationFrame(() => setOnHero(false));
      return () => cancelAnimationFrame(timer);
    }

    const updateHeroState = () => {
      const rect = hero.getBoundingClientRect();
      setOnHero(rect.bottom > 80);
    };

    updateHeroState();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setOnHero(entry.isIntersecting);
        });
      },
      { threshold: 0.05 },
    );

    observer.observe(hero);
    window.addEventListener('scroll', updateHeroState, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateHeroState);
    };
  }, [pathname]);

  return (
    <div
      className={`pointer-events-none transition-opacity duration-300 ${
        onHero ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <GradualBlur
        target="page"
        position="top"
        height="5.5rem"
        strength={1.8}
        layers={8}
        curve="bezier"
        tint="rgba(17, 17, 17, 0.45)"
        zIndex={40}
      />
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={1.8}
        layers={8}
        curve="bezier"
        tint="rgba(17, 17, 17, 0.55)"
        zIndex={40}
        autoHide
      />
    </div>
  );
}
