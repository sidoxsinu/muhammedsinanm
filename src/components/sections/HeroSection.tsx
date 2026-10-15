'use client';

import React from 'react';
import Image from 'next/image';
import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS } from '@/data/socials';
import { Container } from '@/components/ui/Container';

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--accent-red)]/10 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 flex flex-col items-center text-center">
        {/* Social Icons row */}
        <div className="flex items-center gap-4 mb-8">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={s.ariaLabel}
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-white/5 flex items-center justify-center text-[var(--text-secondary)] hover:text-white hover:border-white/30 hover:scale-105 transition-all duration-200"
            >
              {s.platform === 'GitHub' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              )}
              {s.platform === 'LinkedIn' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect height="12" width="4" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              )}
              {s.platform === 'X (Twitter)' && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
              )}
              {s.platform === 'Instagram' && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              )}
            </a>
          ))}
        </div>

        {/* Roles */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs sm:text-sm uppercase font-mono tracking-widest text-[var(--accent-red)] mb-6">
          {PROFILE.roles.map((role, i) => (
            <React.Fragment key={role}>
              {i > 0 && <span className="text-[var(--text-muted)]">•</span>}
              <span>{role}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Portrait & Big Name */}
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[var(--border-subtle)] mb-6 shadow-2xl bg-neutral-900">
            <Image
              src={PROFILE.profileImage}
              alt={`${PROFILE.name} — ${PROFILE.roles.join(', ')}`}
              fill
              priority
              className="object-cover object-top grayscale contrast-125"
            />
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[1.05]"
            aria-label={PROFILE.name}
          >
            <span className="block">{PROFILE.firstName}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
              {PROFILE.lastName}
            </span>
          </h1>
        </div>

        {/* Subtle CSS rotating badge for scroll explore */}
        <div className="mt-14 sm:mt-16 relative w-24 h-24">
          <svg
            className="w-full h-full animate-[spin_14s_linear_infinite] motion-reduce:animate-none text-[var(--text-muted)]"
            viewBox="0 0 100 100"
          >
            <path
              id="heroCirclePath"
              d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              fill="none"
              stroke="none"
            />
            <text>
              <textPath
                href="#heroCirclePath"
                startOffset="0%"
                textLength="220"
                lengthAdjust="spacingAndGlyphs"
                fontSize="10"
                fill="currentColor"
                letterSpacing="3.4px"
                className="font-mono uppercase font-medium"
              >
                SCROLL • EXPLORE • SCROLL • EXPLORE •
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[var(--accent-red)]">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
