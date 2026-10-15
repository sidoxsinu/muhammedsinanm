'use client';

import React from 'react';
import { SKILL_CATEGORIES } from '@/data/skills';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container>
        <AnimateIn>
          <SectionHeading
            label="Skills"
            title="Technical Skills"
            description="Core technologies, frameworks, languages, and development tools."
          />
        </AnimateIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SKILL_CATEGORIES.map((cat, catIdx) => (
            <AnimateIn key={cat.category} delayMs={catIdx * 80} className="h-full">
              <div className="h-full p-6 rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-subtle)] flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-4 pb-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
                    <span>{cat.category}</span>
                    <span className="text-xs font-mono text-[var(--accent-red)]">
                      0{catIdx + 1}
                    </span>
                  </h3>

                  <div className="flex flex-col gap-2.5">
                    {cat.skills.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:border-[var(--accent-red)]/40 hover:bg-white/5 transition-all duration-200 flex items-center justify-between text-sm text-[var(--text-secondary)] hover:text-white group"
                      >
                        <span className="font-medium group-hover:translate-x-1 transition-transform">
                          {skill.name}
                        </span>
                        <span className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-red)] transition-colors">
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
