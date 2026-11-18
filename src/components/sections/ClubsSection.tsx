'use client';

import React, { useState } from 'react';

import { CLUBS } from '@/data/clubs';

export function ClubsSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  const toggle = (title: string) => {
    setOpenMap((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section
      id="clubs"
      aria-label="Clubs & Organizations"
      className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Memberships'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Clubs &amp; Organizations
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Active affiliations across global professional societies and student engineering
          collectives.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {CLUBS.map((club, idx) => {
          const isOpen = openMap[club.title] ?? false;

          return (
            <div
              key={club.title}
              className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen
                  ? 'border-[var(--accent-orange)]/40 bg-[#161616] shadow-[0_8px_30px_rgba(232,86,42,0.1)]'
                  : 'border-white/[0.08] bg-[#141414]/90 hover:border-white/20 hover:bg-[#181818]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(club.title)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-4 text-left transition-colors sm:p-5"
              >
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <span className="font-mono text-xs font-semibold text-neutral-500 transition-colors group-hover:text-[var(--accent-orange)] sm:text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold leading-snug tracking-tight text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-base">
                      {club.title}
                    </h3>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[11px] font-medium text-neutral-400 transition-colors group-hover:border-[var(--accent-orange)]/30 group-hover:text-[var(--accent-orange)]">
                    {club.items.length} affiliations
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 transition-all duration-300 group-hover:border-[var(--accent-orange)] group-hover:text-white ${
                      isOpen
                        ? 'rotate-180 border-[var(--accent-orange)] text-[var(--accent-orange)]'
                        : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </div>
              </button>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/[0.08] bg-black/25 p-4 sm:p-5">
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {club.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 text-xs text-neutral-300 transition-colors duration-200 hover:border-white/10 hover:bg-white/[0.05] sm:text-sm"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-orange)]" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
