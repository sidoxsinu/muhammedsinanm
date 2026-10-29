'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { EDUCATION_DATA } from '@/data/education';

export function EducationSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const drawersRef = useRef<(HTMLDivElement | null)[]>([]);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    if (expandedIndex !== null) {
      const drawer = drawersRef.current[expandedIndex];
      if (drawer) {
        gsap.fromTo(
          drawer,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.32, ease: 'power2.out' },
        );
      }
    }
  }, [expandedIndex]);

  return (
    <section
      id="education"
      aria-label="Education"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Academic Foundation'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Education
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Formal university computer science curriculum combined with continuous competitive
          engineering.
        </p>
      </div>

      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {EDUCATION_DATA.map((item, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div key={item.degree + item.institution} className="w-full">
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isExpanded}
                className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200"
              >
                <div className="flex min-w-0 items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs font-semibold text-neutral-500 transition-colors group-hover:text-[var(--accent-orange)] sm:text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-lg leading-snug">
                      {item.degree}
                    </h3>
                    <p className="truncate font-mono text-xs text-[var(--accent-orange)]">
                      {item.institution}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full border border-neutral-700 bg-[#161616] px-3.5 py-1 font-mono text-xs text-neutral-300">
                    {item.period}
                  </span>
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-xs text-neutral-400 transition-all duration-300 group-hover:border-[var(--accent-orange)] group-hover:text-white ${
                      isExpanded ? 'rotate-180 border-[var(--accent-orange)] text-[var(--accent-orange)]' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>
              </button>

              {isExpanded && (
                <div
                  ref={(el) => {
                    drawersRef.current[idx] = el;
                  }}
                  className="mb-5 overflow-hidden rounded-2xl border border-neutral-800 bg-[#161616] p-5 sm:p-6 shadow-xl"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                      <span className="text-[var(--accent-orange)]">Institution:</span>
                      <span className="text-white">{item.institution}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                      <span className="text-[var(--accent-orange)]">Timeline:</span>
                      <span className="text-white">{item.period}</span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                      <span className="text-[var(--accent-orange)]">Curriculum:</span>
                      <span className="text-neutral-300">
                        Core Computer Science, Systems Engineering, Algorithms, and Software Architecture.
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
