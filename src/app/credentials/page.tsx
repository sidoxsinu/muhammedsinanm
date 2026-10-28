'use client';

import React, { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { PageShell } from '@/components/ui/PageShell';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TabItem, Tabs } from '@/components/ui/Tabs';
import { ACHIEVEMENTS } from '@/data/achievements';
import { CERTIFICATE_CARDS } from '@/data/certificates';
import { CLUBS } from '@/data/clubs';
import { EVENTS } from '@/data/events';

type CredentialTab = 'awards' | 'certificates' | 'hackathons' | 'clubs';

export default function CredentialsPage() {
  const [activeTab, setActiveTab] = useState<CredentialTab>('awards');

  const tabs: TabItem[] = [
    { id: 'awards', label: 'Honors & Awards', count: ACHIEVEMENTS.length },
    { id: 'certificates', label: 'Certifications', count: CERTIFICATE_CARDS.length },
    { id: 'hackathons', label: 'Hackathons & Events', count: EVENTS.length },
    { id: 'clubs', label: 'Clubs & Memberships', count: CLUBS.length },
  ];

  return (
    <PageShell
      badge="// Credentials & Recognition"
      title="Honors, Certs & Competitions"
      description="Verified technical awards, official certifications, collegiate leadership memberships, and competitive hackathon participations."
    >
      {/* Navigation Tabs */}
      <div className="mb-12 flex justify-start overflow-x-auto pb-2">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id as CredentialTab)}
        />
      </div>

      {/* Tab 1: Honors & Awards */}
      {activeTab === 'awards' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {ACHIEVEMENTS.map((award, idx) => (
            <SpotlightCard key={idx} className="flex flex-col justify-between gap-6 p-6 sm:p-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--accent-orange)]">
                  <span>🏆 MAJOR RECOGNITION</span>
                </div>
                <h3 className="text-xl leading-snug font-semibold text-white sm:text-2xl">
                  {award.title}
                </h3>
                <p className="font-mono text-xs text-neutral-400">{award.organization}</p>
                <p className="text-sm leading-relaxed text-neutral-300">{award.description}</p>
              </div>

              {award.links && award.links.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-white/[0.06] pt-4">
                  {award.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-orange)] hover:underline"
                    >
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Tab 2: Certifications */}
      {activeTab === 'certificates' && (
        <div className="space-y-6">
          <p className="text-sm text-neutral-400">
            Click any certificate card to open and inspect the official PDF verification document.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CERTIFICATE_CARDS.map((cert) => (
              <a
                key={cert.number}
                href={encodeURI(cert.documentUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block outline-none"
              >
                <SpotlightCard className="flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden border-b border-white/[0.06] bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={encodeURI(cert.thumbnail)}
                      alt={cert.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge
                      variant="dark"
                      className="absolute top-2 left-2 rounded px-2 py-0.5 font-mono text-[10px]"
                    >
                      {cert.number}
                    </Badge>
                  </div>
                  <div className="flex flex-grow flex-col justify-between gap-2 p-4">
                    <h4 className="line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-[var(--accent-orange)]">
                      {cert.name}
                    </h4>
                    <span className="flex items-center gap-1 text-[11px] text-neutral-400 transition-colors group-hover:text-white">
                      <span>View Document</span>
                      <span>↗</span>
                    </span>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Hackathons & Events */}
      {activeTab === 'hackathons' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {EVENTS.map((group) => (
            <SpotlightCard key={group.institution} className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <span>🏛️ {group.institution}</span>
              </h3>
              <div className="space-y-3">
                {group.events.map((evt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                  >
                    <span className="text-sm font-medium text-neutral-200">{evt.name}</span>
                    {evt.result && (
                      <Badge
                        variant={
                          evt.result.includes('First') ||
                          evt.result.includes('Best') ||
                          evt.result.includes('Prize')
                            ? 'orange'
                            : 'outline'
                        }
                      >
                        {evt.result}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Tab 4: Clubs */}
      {activeTab === 'clubs' && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {CLUBS.map((club) => (
            <SpotlightCard key={club.title} className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <span>🤝 {club.title}</span>
              </h3>
              <ul className="space-y-2">
                {club.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] p-2.5 text-sm text-neutral-300"
                  >
                    <span className="mt-0.5 text-[var(--accent-orange)]">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          ))}
        </div>
      )}
    </PageShell>
  );
}
