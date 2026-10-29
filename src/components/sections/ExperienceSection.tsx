'use client';

import React, { useState } from 'react';
import { EXPERIENCES } from '@/data/experience';

export function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Career Track'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Work Experience
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Engineering roles in professional product teams, client software deliverables, and
          development workflows.
        </p>
      </div>

      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {EXPERIENCES.map((exp, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div key={exp.role + exp.company} className="w-full">
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
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-lg leading-snug">
                        {exp.role}
                      </h3>
                      {exp.badge && (
                        <span className="rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-300 uppercase hidden sm:inline-block">
                          {exp.badge}
                        </span>
                      )}
                    </div>
                    <p className="truncate font-mono text-xs text-[var(--accent-orange)]">
                      {exp.company}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="rounded-full border border-neutral-700 bg-[#161616] px-3.5 py-1 font-mono text-xs text-neutral-300">
                    {exp.period}
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
                <div className="mb-5 rounded-2xl border border-neutral-800 bg-[#161616] p-5 sm:p-7 shadow-xl transition-all duration-300">
                  <div className="space-y-4">
                    {exp.location && (
                      <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                        <span className="text-[var(--accent-orange)]">Location:</span>
                        <span>{exp.location}</span>
                      </div>
                    )}

                    <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                      {exp.description}
                    </p>

                    {(exp.companyUrl || exp.verifyUrl) && (
                      <div className="border-t border-white/[0.06] pt-3">
                        <a
                          href={exp.companyUrl || exp.verifyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase transition-colors hover:text-white"
                        >
                          <span>{exp.companyUrl ? 'Company Website' : 'Verification Portal'}</span>
                          <span>↗</span>
                        </a>
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
