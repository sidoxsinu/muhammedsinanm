'use client';

import React from 'react';
import Image from 'next/image';
import { EXPERIENCES } from '@/data/experience';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 sm:py-28 bg-white/[0.01] border-t border-[var(--border-subtle)]">
      <Container>
        <AnimateIn>
          <SectionHeading
            label="Experience"
            title="Experience & Internship"
            description="Professional software engineering and research engagements."
          />
        </AnimateIn>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <AnimateIn key={exp.role} delayMs={idx * 100}>
              <div className="p-6 sm:p-8 rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col lg:flex-row gap-8 items-start justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    {exp.badge && (
                      <Badge variant={exp.badge === 'Current' ? 'accent' : 'default'} size="sm">
                        {exp.badge}
                      </Badge>
                    )}
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-white/90 mb-1">
                    {exp.company}
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-[var(--accent-red)] mb-4">
                    {exp.period}
                  </p>

                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-4 max-w-3xl">
                    {exp.description}
                  </p>

                  {exp.location && (
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-6">
                      <strong className="text-neutral-400">Location:</strong> {exp.location}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {exp.companyUrl && (
                      <Button href={exp.companyUrl} external variant="outline" size="sm">
                        Visit Company ↗
                      </Button>
                    )}
                    {exp.verifyUrl && (
                      <Button href={exp.verifyUrl} external variant="outline" size="sm">
                        Verify Certificate ↗
                      </Button>
                    )}
                  </div>
                </div>

                {exp.certificateImage && (
                  <div className="relative w-full lg:w-72 h-44 rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-neutral-900 flex-shrink-0">
                    <Image
                      src={exp.certificateImage}
                      alt={`${exp.role} Certificate`}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
