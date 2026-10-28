'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { PROFILE } from '@/data/profile';
import { SOCIAL_LINKS } from '@/data/socials';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-400 uppercase transition-colors hover:text-[var(--accent-orange)]"
        >
          <span>← Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="mb-12 space-y-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Get in Touch'}
          </span>
          <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            Let&apos;s Build Together
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            Whether you have an upcoming project, freelance inquiry, engineering role, or just want
            to discuss full-stack &amp; AI architectures, I&apos;d love to connect.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Email Card */}
          <SpotlightCard className="flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase">
                Email
              </span>
              <h3 className="text-xl font-semibold break-all text-white sm:text-2xl">
                {PROFILE.email}
              </h3>
              <p className="text-xs text-neutral-400">
                Preferred channel for business and engineering discussions.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="cursor-pointer rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-white/20"
              >
                {copied ? '✓ Copied Email' : 'Copy Email Address'}
              </button>
              <a
                href={`mailto:${PROFILE.email}`}
                className="rounded-lg bg-[var(--accent-orange)] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--accent-orange)]/80"
              >
                Open Mail App ↗
              </a>
            </div>
          </SpotlightCard>

          {/* Quick Schedule / Message */}
          <SpotlightCard className="flex flex-col justify-between gap-6 p-6 sm:p-8">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase">
                Direct Portal
              </span>
              <h3 className="text-xl font-semibold text-white sm:text-2xl">
                contact.muhammedsinan.in
              </h3>
              <p className="text-xs text-neutral-400">
                Direct booking and interaction portal for quick messaging.
              </p>
            </div>

            <div>
              <a
                href="https://contact.muhammedsinan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-neutral-200"
              >
                <span>Visit Contact Portal</span>
                <span>↗</span>
              </a>
            </div>
          </SpotlightCard>
        </div>

        {/* Socials & Location Card */}
        <SpotlightCard className="p-6 sm:p-8">
          <h3 className="mb-4 text-lg font-semibold text-white">Connect on Social Platforms</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center transition-all hover:border-[var(--accent-orange)]/40 hover:bg-white/[0.06]"
              >
                <div className="text-sm font-medium text-white transition-colors group-hover:text-[var(--accent-orange)]">
                  {s.platform}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-neutral-500">Visit Profile ↗</div>
              </a>
            ))}
          </div>
        </SpotlightCard>
      </main>

      <Footer />
    </div>
  );
}
