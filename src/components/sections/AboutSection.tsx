'use client';

import React from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function AboutSection() {
  return (
    <section id="about" aria-label="About Muhammed Sinan M" className="py-20 sm:py-28">
      <Container size="narrow">
        <AnimateIn>
          <SectionHeading label="About" title="About Me" />
          <p className="text-xl sm:text-2xl md:text-3xl text-[var(--text-secondary)] leading-relaxed font-light">
            Computer Science student and{' '}
            <span className="text-white font-medium">Software Engineering Intern</span> at{' '}
            <span className="text-[var(--accent-red)] font-medium">Torcue Digital</span>, building full-stack
            software in a professional product engineering environment. Delivered two live freelance websites and
            built production-grade AI applications — including an award-winning AI assistant that won{' '}
            <span className="text-white font-medium">Best Technical Project</span> at the Google Build with AI Hackathon
            2026. Focused on full-stack development, AI-driven products, and scalable systems.
          </p>
        </AnimateIn>
      </Container>
    </section>
  );
}
