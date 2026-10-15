'use client';

import React, { useState } from 'react';
import { JOURNEY_DATA } from '@/data/journey';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function JourneySection() {
  const [selectedYear, setSelectedYear] = useState<string>(JOURNEY_DATA[0].year);

  const currentYearData =
    JOURNEY_DATA.find((item) => item.year === selectedYear) || JOURNEY_DATA[0];

  return (
    <section id="journey" aria-label="Career journey" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container>
        <AnimateIn>
          <SectionHeading
            label="Journey"
            title="Career Timeline"
            description="Milestones, leadership roles, and growth over the years."
          />
        </AnimateIn>

        {/* Year Pills Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {JOURNEY_DATA.map((item) => {
            const isSelected = item.year === selectedYear;
            return (
              <button
                key={item.year}
                onClick={() => setSelectedYear(item.year)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isSelected
                    ? 'bg-[var(--accent-red)] text-white font-semibold shadow-md shadow-[var(--accent-red)]/20'
                    : 'bg-white/5 text-[var(--text-secondary)] hover:text-white hover:bg-white/10 border border-[var(--border-subtle)]'
                }`}
              >
                {item.year} ({item.milestones.length})
              </button>
            );
          })}
        </div>

        {/* Active Year Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentYearData.milestones.map((milestone, idx) => (
            <AnimateIn
              key={`${currentYearData.year}-${milestone.title}-${idx}`}
              delayMs={idx * 60}
              className="h-full"
            >
              <div className="h-full p-6 rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-white/20 transition-all duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[var(--accent-red)] font-semibold">
                      {currentYearData.year}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                    {milestone.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
