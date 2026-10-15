'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { SOCIAL_LINKS } from '@/data/socials';
import { PROFILE } from '@/data/profile';

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
      <div className="relative z-10 w-full max-w-xs h-full bg-[var(--bg-secondary)] border-l border-[var(--border-subtle)] p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border-subtle)]">
            <span className="font-semibold text-white tracking-tight">Navigation</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-[var(--text-secondary)] hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-red)]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  className={`flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    isHighlight
                      ? 'text-[var(--accent-red)] font-semibold hover:bg-[var(--accent-red)]/10'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>
                    <span className="text-xs font-mono text-[var(--text-muted)] mr-2">
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
                  className="flex items-center py-2.5 px-3 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span className="text-xs font-mono text-[var(--text-muted)] mr-2">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--border-subtle)] mt-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] block mb-3">
            Socials
          </span>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-red)] transition-colors"
              >
                {s.platform}
              </a>
            ))}
            <a
              href={PROFILE.contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--accent-red)] font-medium hover:underline"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
