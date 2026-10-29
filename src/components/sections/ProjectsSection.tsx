'use client';

import React from 'react';
import Link from 'next/link';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS } from '@/data/projects';

export function ProjectsSection() {
  // Show top featured & recognized projects on home page
  const featuredProjects = PROJECTS.filter((p) => p.featured || p.badge).slice(0, 5);

  return (
    <section id="projects" aria-label="Featured Projects" className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
      <SectionHeading
        badge="// Selected Works"
        title="Featured Projects"
        description="Handcrafted production systems, client platforms, and award-winning AI projects built with modern web technologies."
        ctaText={`View All ${PROJECTS.length} Projects`}
        ctaHref="/projects"
      />

      {/* Projects List */}
      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {featuredProjects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-[#161616] px-6 py-3 font-mono text-xs font-semibold text-white uppercase transition-colors hover:border-[var(--accent-orange)] hover:bg-[var(--accent-orange)]"
        >
          <span>Explore All {PROJECTS.length} Projects in Full Catalog</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
