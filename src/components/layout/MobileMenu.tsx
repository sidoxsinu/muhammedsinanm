'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS } from '@/data/socials';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Clubs', href: '#clubs' },
  { label: 'Hackathons', href: '#hackathons' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Resume', href: PROFILE.resumeUrl, isExternal: true, isHighlight: true },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex justify-end md:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-xs flex-col justify-between overflow-y-auto border-l border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-2xl">
        <div>
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-6">
            <span className="font-semibold tracking-tight text-white">Navigation</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="-mr-2 rounded-lg p-2 text-[var(--text-secondary)] hover:text-white focus:ring-2 focus:ring-[var(--accent-red)] focus:outline-none"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-1">
            {MENU_ITEMS.map((item, index) => {
              const isHighlight = item.isHighlight;
              return item.isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isHighlight
                      ? 'font-semibold text-[var(--accent-red)] hover:bg-[var(--accent-red)]/10'
                      : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>
                    <span className="mr-2 font-mono text-xs text-[var(--text-muted)]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </span>
                  <span>↗</span>
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-white/5 hover:text-white"
                >
                  <span className="mr-2 font-mono text-xs text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
          <span className="mb-3 block font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
            Socials
          </span>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-red)]"
              >
                {s.platform}
              </a>
            ))}
            <a
              href={PROFILE.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--accent-red)] hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
