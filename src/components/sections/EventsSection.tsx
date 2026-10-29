'use client';

import React, { useState } from 'react';

import { EVENTS } from '@/data/events';

export function EventsSection() {
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({
    'Christ College of Engineering (CCE)': true,
    'NSS Palakkad / MuLearn': true,
  });

  const toggle = (inst: string) => {
    setOpenMap((prev) => ({ ...prev, [inst]: !prev[inst] }));
  };

  const totalEvents = EVENTS.reduce((acc, g) => acc + g.events.length, 0);

  return (
    <section
      id="hackathons"
      aria-label="Hackathons & Events"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Competitions'}
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          Hackathons &amp; Events ({totalEvents}+)
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Competitive hackathons, algorithmic code sprints, and development bootcamps across premier
          institutions.
        </p>
      </div>

      <div className="space-y-4">
        {EVENTS.map((group) => {
          const isOpen = openMap[group.institution] ?? false;

          return (
            <div
              key={group.institution}
              className="overflow-hidden rounded-2xl border border-neutral-800 bg-[#161616]"
            >
              <button
                type="button"
                onClick={() => toggle(group.institution)}
                className="flex w-full cursor-pointer items-center justify-between p-5 text-left font-mono text-sm font-semibold tracking-wider text-white uppercase transition-colors hover:text-[var(--accent-orange)] sm:p-6"
              >
                <span>
                  {group.institution} ({group.events.length})
                </span>
                <span className="font-mono text-xs text-neutral-400">
                  {isOpen ? '▲ Collapse' : '▼ Expand'}
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-neutral-800 p-5 pt-4 sm:p-6">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {group.events.map((ev, evIdx) => (
                      <div
                        key={evIdx}
                        className="flex items-center justify-between gap-3 rounded-xl border border-neutral-800/80 bg-neutral-900/60 px-4 py-2.5"
                      >
                        <span className="text-sm font-medium text-white">{ev.name}</span>
                        {ev.result && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                              ev.result.includes('Prize') ||
                              ev.result.includes('Winner') ||
                              ev.result.includes('Best')
                                ? 'bg-[var(--accent-orange)] text-white'
                                : ev.result.includes('Finalist')
                                  ? 'border border-[var(--accent-orange)] text-[var(--accent-orange)]'
                                  : 'border border-neutral-700 text-neutral-400'
                            }`}
                          >
                            {ev.result}
                          </span>
                        )}
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
