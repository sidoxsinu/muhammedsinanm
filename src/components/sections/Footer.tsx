'use client';

import React from 'react';
import Link from 'next/link';
import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS } from '@/data/socials';
import { Container } from '@/components/ui/Container';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] pt-16 pb-12 text-[var(--text-secondary)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Identity & Contact Info */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">{PROFILE.name}</h3>
            <p className="text-sm max-w-sm text-[var(--text-secondary)] leading-relaxed">
              Building the future, one line at a time.
            </p>

            <div className="space-y-2.5 pt-2 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[var(--accent-red)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${PROFILE.email}`} className="hover:text-white transition-colors">
                  {PROFILE.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[var(--accent-red)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{PROFILE.location}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[var(--accent-red)] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {PROFILE.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#experience" className="hover:text-white transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="#achievements" className="hover:text-white transition-colors">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & More */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-mono">
              Social & More
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.platform}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={handlePrint}
                  className="text-[var(--accent-red)] font-semibold hover:underline cursor-pointer"
                  title="Print Portfolio"
                >
                  Print Portfolio
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <p>© 2026 {PROFILE.name} · All Rights Reserved</p>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </Container>
    </footer>
  );
}
