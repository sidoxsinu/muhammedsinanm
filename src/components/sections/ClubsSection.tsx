'use client';

import React, { useState } from 'react';
import { CLUBS } from '@/data/clubs';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function ClubsSection() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'IEEE Memberships': true,
    'Communities & Organizations': true,
  });

  const toggle = (title: string) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section id="clubs" className="py-20 sm:py-28 bg-white/[0.01] border-t border-[var(--border-subtle)]">
      <Container size="narrow">
        <AnimateIn>
          <SectionHeading
            label="Clubs"
            title="Clubs & Organizations"
            description="Professional societies, IEEE technical chapters, and student developer communities."
          />
        </AnimateIn>

        <div className="space-y-6">
          {CLUBS.map((club, idx) => {
            const isOpen = !!openItems[club.title];
            return (
              <AnimateIn key={club.title} delayMs={idx * 80}>
                <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden">
                  <button
                    onClick={() => toggle(club.title)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span className="text-lg sm:text-xl font-bold text-white">
                      {club.title}
                    </span>
                    <span
                      className={`text-sm text-[var(--accent-red)] transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 pt-2 border-t border-white/5">
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {club.items.map((item) => (
                          <li
                            key={item}
                            className="text-xs sm:text-sm text-[var(--text-secondary)] flex items-start gap-2.5 py-1"
                          >
                            <span className="text-[var(--accent-red)] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
