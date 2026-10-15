'use client';

import React from 'react';
import Image from 'next/image';
import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS } from '@/data/socials';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function ContactSection() {
  return (
    <section id="contact" aria-label="Contact and collaboration" className="py-24 sm:py-32 border-t border-[var(--border-subtle)] relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--accent-red)]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container size="narrow" className="text-center relative z-10">
        <AnimateIn>
          <span className="inline-block text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-3">
            {'// Get In Touch'}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight mb-6">
            HAVE A PROJECT IN MIND?
          </h2>
          <p className="text-base sm:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Together, we can create something clear and impactful. Let&apos;s collaborate to bring our ideas to life
            in a way that resonates with everyone.
          </p>

          <div className="mb-14">
            <Button
              href={PROFILE.contactUrl}
              external
              variant="primary"
              size="lg"
              className="text-base sm:text-lg px-8 py-4 font-semibold"
            >
              Let&apos;s Talk! ↗
            </Button>
          </div>

          {/* Social Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-xs sm:text-sm font-medium text-white transition-colors"
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={PROFILE.profileImage}
                  alt={PROFILE.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span>{PROFILE.name}</span>
            </a>

            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/30 text-xs sm:text-sm font-medium text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <span>{s.platform}</span>
                <span className="text-[10px] text-[var(--text-muted)]">↗</span>
              </a>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
