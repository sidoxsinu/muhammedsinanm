'use client';

import React from 'react';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { EXPERIENCES } from '@/data/experience';

export function ExperiencePreviewSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading
        badge="// Career & Industry"
        title="Work Experience"
        description="Professional engineering internships building full-stack production features and AI workflows."
        ctaText="View Full Journey & Leadership"
        ctaHref="/about"
      />

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
                    {exp.badge && <Badge variant="orange">{exp.badge}</Badge>}
                  </div>
                  <p className="mt-1 text-sm font-medium text-neutral-300">{exp.company}</p>
                </div>
                <Badge variant="outline">{exp.period}</Badge>
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
