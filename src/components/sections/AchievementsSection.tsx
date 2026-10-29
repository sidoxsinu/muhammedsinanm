'use client';

import React from 'react';

import { ACHIEVEMENTS } from '@/data/achievements';

export function AchievementsSection() {
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
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          Achievements &amp; Awards
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Hackathon wins, competitive selections, and project presentations evaluated by industry
          and academic panels.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {ACHIEVEMENTS.map((award) => (
          <div
            key={award.title}
            className="flex flex-col justify-between gap-5 rounded-2xl border border-neutral-800 bg-[#161616] p-6 transition-colors hover:border-neutral-700 sm:p-7"
          >
            <div className="space-y-3">
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
                Major Honor
              </span>
              <h3 className="text-xl leading-snug font-semibold text-white">{award.title}</h3>
              <p className="font-mono text-xs text-neutral-400">{award.organization}</p>
              {award.description && (
                <p className="text-sm leading-relaxed text-neutral-300">{award.description}</p>
              )}
            </div>

            {award.links && award.links.length > 0 && (
              <div className="flex flex-wrap gap-3 border-t border-white/[0.06] pt-4">
                {award.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase hover:text-white"
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
