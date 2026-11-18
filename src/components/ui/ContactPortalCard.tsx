'use client';

import React, { useCallback, useRef, useState } from 'react';

interface ContactPortalCardProps {
  className?: string;
}

export function ContactPortalCard({ className = '' }: ContactPortalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <a
      href="https://contact.muhammedsinan.in"
      target="_blank"
      rel="noopener noreferrer"
      data-testid="contact-portal-card"
      className={`group relative block w-full text-left transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] focus-visible:ring-offset-4 focus-visible:ring-offset-[#111111] focus-visible:outline-none active:translate-y-0 ${className}`}
      aria-label="Open Muhammed Sinan's direct contact portal at contact.muhammedsinan.in"
    >
      <article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/90 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_60px_-15px_rgba(232,86,42,0.25)] sm:rounded-3xl sm:p-10"
      >
        {/* Dynamic Interactive Spotlight Glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 sm:rounded-3xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(232, 86, 42, 0.2), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Dynamic Border Highlight Layer */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 sm:rounded-3xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(232, 86, 42, 0.6), rgba(255, 255, 255, 0.15) 30%, transparent 65%)`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            padding: '1px',
          }}
          aria-hidden="true"
        />

        {/* Subtle Decorative Architectural Grid Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035] transition-opacity duration-300 group-hover:opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
          aria-hidden="true"
        />

        {/* Ambient Corner Accents */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--accent-orange)]/10 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:bg-[var(--accent-orange)]/25" />
        </div>

        {/* Card Content Hierarchy */}
        <div className="relative z-10 flex flex-col gap-6 sm:gap-8">
          {/* Header Row: Category + Status Badge (Left) and Arrow Launch Button (Right) */}
          <header className="flex items-start justify-between gap-4">
            <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
              {/* Category Tag */}
              <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
                {'// Direct Portal'}
              </span>

              {/* Live Availability Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>Active &amp; Open for Opportunities</span>
              </div>
            </div>

            {/* Circular Launch Arrow Indicator */}
            <div
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-all duration-300 group-hover:scale-110 group-hover:border-[var(--accent-orange)] group-hover:bg-[var(--accent-orange)] group-hover:text-white sm:h-11 sm:w-11"
              aria-hidden="true"
            >
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>
          </header>

          {/* Central Hero Block */}
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--accent-orange)] sm:text-4xl md:text-5xl">
                contact.muhammedsinan.in
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              Direct booking and interaction portal for quick messaging, scheduling discussions,
              freelance inquiries, and full-stack engineering collaborations.
            </p>
          </div>

          {/* Miniature Interactive Portal Preview Pane */}
          <div className="rounded-xl border border-white/[0.08] bg-black/40 p-4 transition-colors duration-300 group-hover:border-white/[0.15] sm:p-5">
            {/* Window bar */}
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-red-500/80 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-amber-500/80 sm:h-2.5 sm:w-2.5" />
                <span className="h-2 w-2 rounded-full bg-white/20 transition-colors duration-300 group-hover:bg-emerald-500/80 sm:h-2.5 sm:w-2.5" />
                <span className="ml-2 font-mono text-[10px] text-neutral-400 sm:text-[11px]">
                  portal.preview
                </span>
              </div>
              <div className="flex items-center gap-1 font-mono text-[9px] tracking-wider whitespace-nowrap text-emerald-400 uppercase sm:text-[10px]">
                <svg
                  className="h-2.5 w-2.5 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>SSL SECURED</span>
              </div>
            </div>

            {/* Quick action capabilities preview */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              <div className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors duration-200 group-hover:bg-white/[0.05]">
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[var(--accent-orange)]"
                  aria-hidden="true"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Book a Meeting</div>
                  <div className="mt-0.5 text-[11px] text-neutral-400">
                    15–30 min video consultation
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors duration-200 group-hover:bg-white/[0.05]">
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[var(--accent-orange)]"
                  aria-hidden="true"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Quick Message</div>
                  <div className="mt-0.5 text-[11px] text-neutral-400">Priority inbox delivery</div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border border-white/[0.04] bg-white/[0.02] p-3 transition-colors duration-200 group-hover:bg-white/[0.05]">
                <div
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-[var(--accent-orange)]"
                  aria-hidden="true"
                >
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Project Inquiry</div>
                  <div className="mt-0.5 text-[11px] text-neutral-400">
                    Full-stack &amp; AI architectures
                  </div>
                </div>
              </div>
            </div>

            {/* Live Terminal Prompt Indicator */}
            <div className="mt-3.5 flex items-center justify-between border-t border-white/[0.04] pt-3 font-mono text-[11px] text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-[var(--accent-orange)]">&gt;</span>
                <span className="text-neutral-300">Click anywhere to launch direct portal</span>
              </div>
              <span className="hidden text-neutral-500 sm:inline">typical response: &lt;2h</span>
            </div>
          </div>

          {/* Footer Action Row: Guarantees & Primary Action Button */}
          <footer className="flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-xs text-neutral-400">
              <svg
                className="h-4 w-4 text-[var(--accent-orange)]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Direct personal channel · Verified endpoint</span>
            </div>

            <div className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-wider text-black uppercase transition-all duration-300 group-hover:bg-[var(--accent-orange)] group-hover:text-white group-hover:shadow-[0_0_25px_rgba(232,86,42,0.4)] sm:w-auto">
              <span>Open Contact Portal</span>
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" />
              </svg>
            </div>
          </footer>
        </div>
      </article>
    </a>
  );
}
