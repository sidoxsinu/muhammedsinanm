'use client';

import React, { useMemo, useState } from 'react';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { TabItem, Tabs } from '@/components/ui/Tabs';
import { SKILL_CATEGORIES } from '@/data/skills';

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const allSkills = useMemo(() => {
    return SKILL_CATEGORIES.flatMap((cat) => cat.skills);
  }, []);

  const tabs: TabItem[] = useMemo(() => {
    const list: TabItem[] = [{ id: 'all', label: 'All Skills', count: allSkills.length }];
    SKILL_CATEGORIES.forEach((cat) => {
      list.push({
        id: cat.category,
        label: cat.category,
        count: cat.skills.length,
      });
    });
    return list;
  }, [allSkills]);

  const displayedSkills = useMemo(() => {
    if (activeCategory === 'all') return allSkills;
    const cat = SKILL_CATEGORIES.find((c) => c.category === activeCategory);
    return cat ? cat.skills : allSkills;
  }, [activeCategory, allSkills]);

  // Skill Icon Resolver
  const getSkillIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'react':
        return (
          <svg
            className="h-6 w-6 text-cyan-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="1.5" />
            <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(30 12 12)" />
            <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(90 12 12)" />
            <ellipse cx="12" cy="12" rx="3" ry="9" transform="rotate(150 12 12)" />
          </svg>
        );
      case 'javascript':
        return (
          <svg
            className="h-6 w-6 text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M16 8v8a2 2 0 01-2 2h-1M9 14a2 2 0 002 2 2 2 0 002-2v-4" />
          </svg>
        );
      case 'typescript':
        return (
          <svg
            className="h-6 w-6 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 9h6m-3 0v7M15 12h2a1.5 1.5 0 010 3h-2" />
          </svg>
        );
      case 'python':
        return (
          <svg
            className="h-6 w-6 text-amber-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2C6.48 2 6 4.5 6 4.5V8h6V9H4s-2 .5-2 5 2 5 2 5h2v-3.5c0-1.5 1-2.5 2.5-2.5h6.5c1.5 0 2.5-1 2.5-2.5V4.5S17.52 2 12 2z" />
            <path d="M12 22c5.52 0 6-2.5 6-2.5V16h-6v-1h8s2-.5 2-5-2-5-2-5h-2v3.5c0 1.5-1 2.5-2.5 2.5H9c-1.5 0-2.5 1-2.5 2.5V19.5s-1.52 2.5 4 2.5z" />
          </svg>
        );
      case 'node.js':
        return (
          <svg
            className="h-6 w-6 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        );
      case 'tailwindcss':
        return (
          <svg
            className="h-6 w-6 text-sky-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 4c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.6 9.8 15.2 11.4 19 11.4c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C17.4 5.6 15.8 4 12 4zm-7 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.1 1.2 2.7 2.8 6.5 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6-1.1-1.2-2.7-2.8-6.5-2.8z" />
          </svg>
        );
      case 'gsap':
        return (
          <svg
            className="h-6 w-6 text-green-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        );
      case 'html':
        return (
          <svg
            className="h-6 w-6 text-orange-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'css':
        return (
          <svg
            className="h-6 w-6 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        );
      case 'mongodb':
        return (
          <svg
            className="h-6 w-6 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2s-4 4-4 9c0 4 2.5 7 4 9 1.5-2 4-5 4-9 0-5-4-9-4-9z" />
          </svg>
        );
      case 'docker':
        return (
          <svg
            className="h-6 w-6 text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <rect x="4" y="10" width="3" height="3" />
            <rect x="8" y="10" width="3" height="3" />
            <rect x="12" y="10" width="3" height="3" />
            <rect x="8" y="6" width="3" height="3" />
            <path d="M2 14c1 4 4 6 10 6s9-2 10-6v-1H2v1z" />
          </svg>
        );
      case 'ai / ml':
        return (
          <svg
            className="h-6 w-6 text-[var(--accent-orange)]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z" />
            <path d="M12 6v6l4 2" />
          </svg>
        );
      case 'figma':
        return (
          <svg
            className="h-6 w-6 text-purple-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="16.5" cy="7.5" r="3.5" />
            <circle cx="7.5" cy="7.5" r="3.5" />
            <circle cx="7.5" cy="16.5" r="3.5" />
          </svg>
        );
      default:
        return (
          <svg
            className="h-6 w-6 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
    }
  };

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        badge="// Core Capabilities"
        title="Skills & Technologies"
        description="Languages, frameworks, and modern tools I leverage to build resilient full-stack systems and production AI agents."
        align="center"
      />

      {/* Tabs */}
      <div className="mb-10 flex justify-center overflow-x-auto pb-2">
        <Tabs tabs={tabs} activeTab={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
        {displayedSkills.map((skill) => (
          <a
            key={skill.name}
            href={skill.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block outline-none"
          >
            <SpotlightCard className="flex h-full flex-col items-center justify-center gap-2.5 p-4 text-center transition-transform duration-200 sm:p-5">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:border-[var(--accent-orange)]/40">
                {getSkillIcon(skill.name)}
              </div>
              <span className="text-sm font-medium text-neutral-200 transition-colors group-hover:text-white">
                {skill.name}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase transition-colors group-hover:text-[var(--accent-orange)]">
                {skill.category}
              </span>
            </SpotlightCard>
          </a>
        ))}
      </div>
    </section>
  );
}
