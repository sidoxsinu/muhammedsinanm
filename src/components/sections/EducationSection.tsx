'use client';

import React from 'react';
import { EDUCATION_DATA } from '@/data/education';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function EducationSection() {
  return (
    <section id="education" className="py-20 sm:py-28 bg-white/[0.01] border-t border-[var(--border-subtle)]">
      <Container size="narrow">
        <AnimateIn>
          <SectionHeading label="Education" title="Education" />
        </AnimateIn>

        <div className="space-y-6">
          {EDUCATION_DATA.map((item, idx) => (
            <AnimateIn key={item.degree} delayMs={idx * 100}>
              <div className="p-6 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border-subtle)] relative pl-8 sm:pl-10 before:absolute before:left-4 sm:before:left-5 before:top-8 before:w-2 before:h-2 before:rounded-full before:bg-[var(--accent-red)]">
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">{item.degree}</h4>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-mono">
                  {item.institution} <span className="text-[var(--accent-red)]">|</span> {item.period}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
