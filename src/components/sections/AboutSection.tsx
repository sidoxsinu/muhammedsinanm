'use client';

import React, { useEffect, useRef } from 'react';

const ABOUT_SEGMENTS = [
  { text: 'Computer Science student and ', isKey: false },
  { text: 'Software', isKey: true },
  { text: ' ', isKey: false },
  { text: 'Engineering', isKey: true },
  { text: ' ', isKey: false },
  { text: 'Intern', isKey: true },
  {
    text: ' at Torcue Digital, delivering full-stack web architectures, iOS (Swift) tickets, and production-grade AI systems.',
    isKey: false,
  },
];

const CHARS_DATA = ABOUT_SEGMENTS.flatMap((segment) =>
  Array.from(segment.text).map((ch) => ({
    char: ch,
    isKey: segment.isKey,
  })),
);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const para = paraRef.current;
    const section = sectionRef.current;
    if (!para || !section) return;

    para.style.opacity = '1';
    para.style.transform = 'none';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      charsRef.current.forEach((el) => el?.classList.add('char--lit'));
      return;
    }

    const total = CHARS_DATA.length;
    let lastLit = -1;
    let rafId: number | null = null;

    function updateFill() {
      if (!para) return;
      const rect = para.getBoundingClientRect();
      const vh = window.innerHeight;
      const isMobile = window.innerWidth <= 768;

      const start = isMobile ? vh * 0.85 : vh * 0.8;
      const end = isMobile ? vh * 0.2 : vh * 0.2;

      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      const targetLit = Math.round(progress * total);

      if (targetLit === lastLit) {
        rafId = null;
        return;
      }

      if (targetLit > lastLit) {
        for (let i = Math.max(0, lastLit); i < targetLit; i++) {
          charsRef.current[i]?.classList.add('char--lit');
        }
      } else {
        for (let i = lastLit - 1; i >= targetLit; i--) {
          charsRef.current[i]?.classList.remove('char--lit');
        }
      }

      lastLit = targetLit;
      rafId = null;
    }

    function onScroll() {
      if (!rafId) rafId = requestAnimationFrame(updateFill);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', onScroll, { passive: true });
            updateFill();
          } else {
            window.removeEventListener('scroll', onScroll);
          }
        });
      },
      { rootMargin: '400px 0px 400px 0px' },
    );

    observer.observe(section);
    updateFill();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="about"
      aria-label="About Muhammed Sinan M"
      ref={sectionRef}
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mb-8 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Background'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          About Me
        </h2>
      </div>

      <p
        className="large-intro-text text-2xl leading-relaxed text-neutral-600 sm:text-3xl md:text-4xl"
        ref={paraRef}
      >
        {CHARS_DATA.map((item, idx) => (
          <span
            key={idx}
            ref={(el) => {
              charsRef.current[idx] = el;
            }}
            className={`char transition-colors duration-150 ${item.isKey ? 'char--key' : ''}`}
          >
            {item.char}
          </span>
        ))}
      </p>
    </section>
  );
}
