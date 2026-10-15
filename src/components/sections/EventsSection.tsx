'use client';

import React, { useState } from 'react';
import { EVENTS } from '@/data/events';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function EventsSection() {
  const [openInstitutions, setOpenInstitutions] = useState<Record<string, boolean>>({
    'Christ College of Engineering (CCE)': true,
    'NSS Palakkad / μLearn': true,
  });

  const toggle = (inst: string) => {
    setOpenInstitutions((prev) => ({ ...prev, [inst]: !prev[inst] }));
  };

  return (
    <section id="hackathons" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container size="narrow">
        <AnimateIn>
          <SectionHeading
            label="Hackathons"
            title="Hackathons & Events"
            description="Competitive hackathons, bootcamps, workshops, and technical conferences across 7 institutions."
          />
        </AnimateIn>

        <div className="space-y-4">
          {EVENTS.map((group, idx) => {
            const isOpen = !!openInstitutions[group.institution];
            return (
              <AnimateIn key={group.institution} delayMs={idx * 50}>
                <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden">
                  <button
                    onClick={() => toggle(group.institution)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {group.institution}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {group.events.length} event{group.events.length > 1 ? 's' : ''}
                      </span>
                      <span
                        className={`text-xs text-[var(--accent-red)] transform transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      >
                        ▼
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 border-t border-white/5 pt-3 space-y-2.5">
                      {group.events.map((event) => (
                        <div
                          key={event.name}
                          className="flex items-center justify-between py-1.5 border-b border-white/[0.03] last:border-b-0"
                        >
                          <span className="text-xs sm:text-sm text-neutral-300 font-medium">
                            {event.name}
                          </span>
                          {event.result && (
                            <Badge
                              variant={
                                event.result.includes('Prize') || event.result.includes('Best')
                                  ? 'accent'
                                  : event.result === 'Finalist'
                                  ? 'gold'
                                  : 'outline'
                              }
                              size="sm"
                            >
                              {event.result}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
