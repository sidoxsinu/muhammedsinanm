'use client';

import React, { useState } from 'react';

import { CLUBS } from '@/data/clubs';

export function ClubsSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    'IEEE Memberships': true,
    'Communities & Organizations': true,
  });

  const toggle = (title: string) => {
    setOpenMap((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section
      id="clubs"
      aria-label="Clubs & Organizations"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
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

      <div className="space-y-4">
        {CLUBS.map((club) => {
          const isOpen = openMap[club.title] ?? false;

          return (
            <div
              key={club.title}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#161616]"
            >
              <button
                type="button"
                onClick={() => toggle(club.title)}
                className="flex w-full cursor-pointer items-center justify-between p-5 text-left font-mono text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:text-[var(--accent-orange)] sm:p-6"
              >
                <span>
                  {club.title} ({club.items.length})
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {isOpen ? '▲ Collapse' : '▼ Expand'}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-neutral-800 p-5 pt-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {club.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-neutral-300">
                        <span className="h-1 w-1 shrink-0 bg-[var(--accent-orange)]" />
                        <span>{item}</span>
                      </div>
                    ))}
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
