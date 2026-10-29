'use client';

import React, { useState } from 'react';

import { Badge } from '@/components/ui/Badge';
import { PageShell } from '@/components/ui/PageShell';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TabItem, Tabs } from '@/components/ui/Tabs';
import { EDUCATION_DATA } from '@/data/education';
import { EXPERIENCES } from '@/data/experience';
import { JOURNEY_DATA } from '@/data/journey';
import { LEADERSHIP } from '@/data/leadership';
import { PROFILE } from '@/data/profile';

type AboutTab = 'overview' | 'experience' | 'journey' | 'leadership';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>('overview');

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview & Bio' },
    { id: 'experience', label: 'Work Experience', count: EXPERIENCES.length },
    { id: 'journey', label: 'Career Journey', count: JOURNEY_DATA.length },
    { id: 'leadership', label: 'Leadership & Roles', count: LEADERSHIP.length },
  ];

  return (
    <PageShell
      maxWidth="max-w-5xl"
      badge="// Background & Trajectory"
      title="About Muhammed Sinan"
      description="Computer Science student, full-stack engineer, and AI builder based in Kerala, India. Dedicated to crafting software that solves real user problems."
    >
      {/* Navigation Tabs */}
      <div className="mb-12 flex justify-start overflow-x-auto pb-2">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={(id) => setActiveTab(id as AboutTab)} />
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-12">
          {/* Bio Card */}
          <SpotlightCard className="p-6 sm:p-8">
            <div className="flex flex-col items-start gap-6 md:flex-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile-picture/bg-removed-black&white-pfp.webp"
                alt={PROFILE.name}
                className="h-24 w-24 shrink-0 rounded-2xl border border-white/10 bg-neutral-900 object-cover sm:h-32 sm:w-32"
              />
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">{PROFILE.name}</h2>
                  <p className="font-mono text-sm text-[var(--accent-orange)]">
                    {PROFILE.roles.join(' • ')}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {PROFILE.bio}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-neutral-400">
                  <span>LOC: {PROFILE.location}</span>
                  <span>EMAIL: {PROFILE.email}</span>
                  <span>TEL: {PROFILE.phone}</span>
                </div>
              </div>
            </div>
          </SpotlightCard>

          {/* Education & Languages Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <SpotlightCard className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <span>Education</span>
              </h3>
              <div className="space-y-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div
                    key={edu.degree}
                    className={`space-y-1 border-l-2 pl-4 ${
                      idx === 0 ? 'border-[var(--accent-orange)]' : 'border-white/20'
                    }`}
                  >
                    <h4 className="text-base font-medium text-white">{edu.degree}</h4>
                    <p className="text-xs text-neutral-400">{edu.institution}</p>
                    <Badge
                      variant={idx === 0 ? 'orange' : 'outline'}
                      className="font-mono text-[11px]"
                    >
                      {edu.period}
                    </Badge>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <SpotlightCard className="p-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                <span>Languages &amp; Communication</span>
              </h3>
              <p className="mb-6 text-xs text-neutral-400">
                Bilingual and multilingual proficiency for international collaboration and remote
                technical teams.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { lang: 'English', level: 'Professional Working' },
                  { lang: 'Malayalam', level: 'Native / Bilingual' },
                  { lang: 'Hindi', level: 'Conversational' },
                  { lang: 'Arabic', level: 'Elementary' },
                ].map((l) => (
                  <div
                    key={l.lang}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                  >
                    <div className="text-sm font-medium text-white">{l.lang}</div>
                    <div className="text-[11px] text-neutral-400">{l.level}</div>
                  </div>
                ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      )}

      {/* Tab 2: Experience */}
      {activeTab === 'experience' && (
        <div className="space-y-6">
          {EXPERIENCES.map((exp) => (
            <SpotlightCard key={exp.company} className="p-6 sm:p-8">
              <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">{exp.role}</h3>
                    {exp.badge && <Badge variant="orange">{exp.badge}</Badge>}
                  </div>
                  <p className="mt-1 text-sm font-medium text-neutral-300">{exp.company}</p>
                  {exp.location && (
                    <p className="mt-0.5 font-mono text-xs text-neutral-500">{exp.location}</p>
                  )}
                </div>
                <Badge variant="outline">{exp.period}</Badge>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-neutral-300">{exp.description}</p>

              <div className="flex items-center gap-4 border-t border-white/[0.06] pt-4">
                {exp.companyUrl && (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent-orange)] hover:underline"
                  >
                    <span>Visit Company Website</span>
                    <span>↗</span>
                  </a>
                )}
                {exp.verifyUrl && (
                  <a
                    href={exp.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-white hover:underline"
                  >
                    <span>Verify Credential</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </SpotlightCard>
          ))}
        </div>
      )}

      {/* Tab 3: Journey Timeline */}
      {activeTab === 'journey' && (
        <div className="relative ml-3 space-y-10 border-l border-white/10 pl-6 sm:ml-6 sm:pl-8">
          {JOURNEY_DATA.map((jy) => (
            <div key={jy.year} className="relative">
              {/* Year Marker */}
              <div className="absolute top-0 -left-[31px] h-4 w-4 rounded-full border-4 border-[var(--bg-color)] bg-[var(--accent-orange)] sm:-left-[39px]" />
              <div className="mb-4">
                <span className="font-heading text-2xl font-bold text-white">{jy.year}</span>
              </div>
              <div className="space-y-3">
                {jy.milestones.map((m) => (
                  <SpotlightCard key={m.title} className="p-4 sm:p-5">
                    <h4 className="text-base font-semibold text-white">{m.title}</h4>
                    <p className="mt-1 text-sm text-neutral-400">{m.description}</p>
                  </SpotlightCard>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Leadership */}
      {activeTab === 'leadership' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {LEADERSHIP.map((role, idx) => (
            <SpotlightCard key={idx} className="flex flex-col justify-between gap-3 p-5">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-white sm:text-lg">{role.role}</h3>
                  <Badge variant="orange" className="font-mono text-[10px]">
                    {role.badge}
                  </Badge>
                </div>
                <p className="text-xs text-neutral-400">{role.organization}</p>
              </div>
              <span className="border-t border-white/[0.06] pt-2 font-mono text-xs text-neutral-500">
                {role.period}
              </span>
            </SpotlightCard>
          ))}
        </div>
      )}
    </PageShell>
  );
}
