'use client';

import React from 'react';
import { ACHIEVEMENTS } from '@/data/achievements';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function AchievementsSection() {
  return (
    <section id="achievements" aria-label="Achievements of Muhammed Sinan M" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container>
        <AnimateIn>
          <SectionHeading
            label="Achievements"
            title="Achievements & Recognition"
            description="Honors, hackathon victories, and competitive coding awards."
          />
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {ACHIEVEMENTS.map((item, idx) => (
            <AnimateIn key={item.title} delayMs={idx * 100} className="h-full">
              <Card variant="gold" className="h-full flex flex-col justify-between p-6 sm:p-8">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[var(--gold-accent)] mb-4">
                    {item.organization}
                  </p>
                  {item.description && (
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="text-xs font-semibold text-neutral-300 hover:text-[var(--gold-accent)] transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
