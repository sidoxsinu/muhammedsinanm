'use client';

import React, { useMemo, useState } from 'react';

import { PageShell } from '@/components/ui/PageShell';
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
    <PageShell
      badge="// Works & Archives"
      title="All Projects"
      description="A comprehensive catalog of production web platforms, hackathon-winning AI assistants, open-source utilities, and freelance deliverables."
    >
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
    </PageShell>
  );
}
