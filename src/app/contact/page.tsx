'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { PageShell } from '@/components/ui/PageShell';
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
    <PageShell
      maxWidth="max-w-4xl"
      badge="// Get in Touch"
      title="Let's Build Together"
      description="Whether you have an upcoming project, freelance inquiry, engineering role, or just want to discuss full-stack & AI architectures, I'd love to connect."
    >
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
            <Button type="button" variant="secondary" size="sm" onClick={copyEmail}>
              {copied ? '✓ Copied Email' : 'Copy Email Address'}
            </Button>
            <Button
              href={`mailto:${PROFILE.email}`}
              variant="primary"
              size="sm"
              className="bg-[var(--accent-orange)] shadow-none"
            >
              Open Mail App ↗
            </Button>
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
            <Button
              href="https://contact.muhammedsinan.in"
              external
              variant="secondary"
              size="sm"
              className="bg-white text-black hover:bg-neutral-200"
            >
              <span>Visit Contact Portal ↗</span>
            </Button>
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
    </PageShell>
  );
}
