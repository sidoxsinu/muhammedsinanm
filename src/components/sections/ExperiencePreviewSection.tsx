'use client';

import React from 'react';
import Link from 'next/link';

import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { EXPERIENCES } from '@/data/experience';

export function ExperiencePreviewSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {/* Section Header */}
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Career & Industry'}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Work Experience
          </h2>
          <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
            Professional engineering internships building full-stack production features and AI
            workflows.
          </p>
        </div>

        <Link
          href="/about"
          className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-[var(--accent-orange)] transition-colors hover:text-white md:self-auto"
        >
          <span>View Full Journey &amp; Leadership</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {EXPERIENCES.map((exp) => (
          <SpotlightCard
            key={exp.company}
            className="flex h-full flex-col justify-between gap-6 p-6 sm:p-8"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">{exp.role}</h3>
                    {exp.badge && (
                      <span className="rounded-full border border-[var(--accent-orange)] bg-[var(--accent-orange)]/15 px-2 py-0.5 text-xs font-semibold text-[var(--accent-orange)]">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-neutral-300">{exp.company}</p>
                </div>
                <span className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.05] px-2.5 py-1 font-mono text-xs text-neutral-400">
                  {exp.period}
                </span>
              </div>

              <p className="line-clamp-4 text-sm leading-relaxed text-neutral-400">
                {exp.description}
              </p>

              {exp.location && (
                <p className="font-mono text-xs text-neutral-500">📍 {exp.location}</p>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-orange)] hover:underline"
                >
                  <span>Company Website</span>
                  <span>↗</span>
                </a>
              ) : (
                <span />
              )}

              <Link
                href="/about"
                className="text-xs font-medium text-neutral-400 transition-colors hover:text-white"
              >
                Learn more →
              </Link>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
