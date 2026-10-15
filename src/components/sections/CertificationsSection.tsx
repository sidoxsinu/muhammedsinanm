'use client';

import React from 'react';
import { FORMAL_CERTIFICATIONS, LANGUAGES } from '@/data/certificates';
import { Container } from '@/components/ui/Container';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function CertificationsSection() {
  return (
    <section id="certifications" aria-label="Certifications & Languages" className="py-16 sm:py-24 bg-white/[0.01] border-t border-[var(--border-subtle)]">
      <Container size="narrow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {/* Formal Certifications */}
          <AnimateIn>
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-3">
              {'// Credentials'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Certifications
            </h2>
            <ul className="space-y-3">
              {FORMAL_CERTIFICATIONS.map((cert) => (
                <li
                  key={cert.name}
                  className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-sm sm:text-base text-neutral-200 flex items-center gap-3 font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-[var(--accent-red)] flex-shrink-0" />
                  <span>{cert.name}</span>
                </li>
              ))}
            </ul>
          </AnimateIn>

          {/* Languages */}
          <AnimateIn delayMs={100}>
            <span className="inline-block text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-3">
              {'// Communication'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Languages
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang}
                  className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-card)] border border-[var(--border-subtle)] text-center text-sm sm:text-base text-neutral-200 font-medium"
                >
                  {lang}
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}
