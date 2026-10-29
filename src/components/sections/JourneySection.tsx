'use client';

import React, { useRef } from 'react';

import { JOURNEY_DATA } from '@/data/journey';

export function JourneySection() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (viewportRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 280 : 360;
      viewportRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (viewportRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 280 : 360;
      viewportRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="journey"
      aria-label="Career Journey"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      {/* Section Header with Navigation Controls */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Progression'}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Journey &amp; Milestones
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            From early high-school programming competitions to full-stack engineering internships
            and hackathon awards.
          </p>
        </div>

        {/* Previous / Next buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous timeline column"
            onClick={scrollPrev}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[2px] border border-neutral-800 bg-[#161616] font-mono text-sm text-neutral-300 transition-colors hover:border-[var(--accent-orange)] hover:text-white"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Next timeline column"
            onClick={scrollNext}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[2px] border border-neutral-800 bg-[#161616] font-mono text-sm text-neutral-300 transition-colors hover:border-[var(--accent-orange)] hover:text-white"
          >
            ›
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Viewport */}
      <div
        ref={viewportRef}
        className="flex scrollbar-none gap-4 overflow-x-auto pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {JOURNEY_DATA.map((item) => (
          <div
            key={item.year}
            className="w-[280px] shrink-0 rounded-[2px] border border-neutral-800 bg-[#161616] p-6 sm:w-[320px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="mb-4 flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-heading text-2xl font-bold tracking-tight text-[var(--accent-orange)] sm:text-3xl">
                {item.year}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase">
                {item.milestones.length} Milestones
              </span>
            </div>

            <ul className="space-y-4">
              {item.milestones.map((m, mIdx) => (
                <li key={mIdx} className="space-y-1">
                  <h4 className="font-mono text-xs font-semibold text-white">{m.title}</h4>
                  <p className="text-xs leading-relaxed text-neutral-400">{m.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
