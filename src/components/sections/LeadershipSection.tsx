'use client';

import React from 'react';
import { LEADERSHIP } from '@/data/leadership';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container size="narrow">
        <AnimateIn>
          <SectionHeading
            label="Leadership"
            title="Leadership Roles"
            description="Positions of responsibility across IEEE, entrepreneurial cells, and student communities."
          />
        </AnimateIn>

        <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
          {LEADERSHIP.map((item, idx) => (
            <AnimateIn key={`${item.role}-${item.organization}`} delayMs={idx * 50}>
              <div className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6 group hover:bg-white/[0.02] px-3 -mx-3 rounded-lg transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[var(--accent-red)] transition-colors">
                      {item.role}
                    </h3>
                    {item.badge && (
                      <Badge variant="outline" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {item.organization}
                  </p>
                </div>
                <div className="text-xs sm:text-sm font-mono text-[var(--text-muted)] sm:text-right flex-shrink-0">
                  {item.period}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
