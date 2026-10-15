'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MobileMenu } from './MobileMenu';
import { PROFILE } from '@/data/profile';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-3 sm:py-4 px-4 sm:px-6 lg:px-8 ${
          isScrolled ? 'bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-[var(--border-subtle)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={scrollToTop}
            className="text-sm sm:text-base font-semibold text-white tracking-tight hover:text-[var(--accent-red)] transition-colors"
          >
            © {PROFILE.name}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[var(--text-secondary)]">
            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="#projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <Link href="#experience" className="hover:text-white transition-colors">
              Experience
            </Link>
            <Link href="#certifications" className="hover:text-white transition-colors">
              Certifications
            </Link>
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent-red)] font-medium hover:underline flex items-center gap-1"
            >
              Resume <span>↗</span>
            </a>
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Button
              href={PROFILE.contactUrl}
              external
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Let&apos;s Talk! ↗
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 text-white hover:text-[var(--accent-red)] rounded-lg border border-[var(--border-subtle)] bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
