'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { TabItem, Tabs } from '@/components/ui/Tabs';
import { PROJECTS } from '@/data/projects';

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const tabs: TabItem[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Projects', count: PROJECTS.length },
      {
        id: 'freelance',
        label: 'Freelance & Client',
        count: PROJECTS.filter(
          (p) => p.badge?.includes('Freelance') || p.tags.includes('Freelance'),
        ).length,
      },
      {
        id: 'ai',
        label: 'AI & Systems',
        count: PROJECTS.filter((p) => p.tags.includes('AI') || p.tags.includes('AI/ML')).length,
      },
      {
        id: 'web',
        label: 'Web Applications',
        count: PROJECTS.filter(
          (p) =>
            p.tags.includes('React') || p.tags.includes('Django') || p.tags.includes('HTML/CSS'),
        ).length,
      },
    ];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return PROJECTS;
    if (activeFilter === 'freelance') {
      return PROJECTS.filter((p) => p.badge?.includes('Freelance') || p.tags.includes('Freelance'));
    }
    if (activeFilter === 'ai') {
      return PROJECTS.filter((p) => p.tags.includes('AI') || p.tags.includes('AI/ML'));
    }
    if (activeFilter === 'web') {
      return PROJECTS.filter(
        (p) => p.tags.includes('React') || p.tags.includes('Django') || p.tags.includes('HTML/CSS'),
      );
    }
    return PROJECTS;
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-400 uppercase transition-colors hover:text-[var(--accent-orange)]"
        >
          <span>← Back to Home</span>
        </Link>

        {/* Page Header */}
        <div className="mb-10 space-y-4">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Works & Archives'}
          </span>
          <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
            All Projects
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
            A comprehensive catalog of production web platforms, hackathon-winning AI assistants,
            open-source utilities, and freelance deliverables.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 flex justify-start overflow-x-auto pb-2">
          <Tabs tabs={tabs} activeTab={activeFilter} onChange={setActiveFilter} />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
