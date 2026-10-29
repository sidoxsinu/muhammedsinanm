'use client';

import React, { useState } from 'react';
import { ACHIEVEMENTS } from '@/data/achievements';

export function AchievementsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="achievements"
      aria-label="Achievements & Recognition"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Recognition'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Achievements &amp; Awards
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Hackathon wins, competitive selections, and project presentations evaluated by industry
          and academic panels.
        </p>
      </div>

      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {ACHIEVEMENTS.map((award, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div key={award.title} className="w-full">
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
                      {award.title}
                    </h3>
                    <p className="truncate font-mono text-xs text-neutral-400">
                      {award.organization}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/10 px-3 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent-orange)] uppercase sm:inline-block">
                    Major Honor
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
                <div className="mb-5 rounded-2xl border border-neutral-800 bg-[#161616] p-5 sm:p-6 shadow-xl transition-all duration-300">
                  <div className="space-y-4">
                    {award.description && (
                      <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                        {award.description}
                      </p>
                    )}

                    {award.links && award.links.length > 0 && (
                      <div className="flex flex-wrap gap-3 border-t border-white/[0.06] pt-3">
                        {award.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase transition-colors hover:text-white"
                          >
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    )}
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
