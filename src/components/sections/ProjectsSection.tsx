'use client';

import React from 'react';
import Link from 'next/link';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PROJECTS } from '@/data/projects';

export function ProjectsSection() {
  // Show featured projects on home page
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <SectionHeading
        badge="// Selected Works"
        title="Featured Projects"
        description="Handcrafted production systems, client platforms, and award-winning AI projects built with modern web technologies."
        ctaText={`View All ${PROJECTS.length} Projects`}
        ctaHref="/projects"
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} featured={true} />
        ))}
      </div>

      {/* View All CTA */}
      <div className="mt-12 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[var(--accent-orange)] hover:bg-[var(--accent-orange)] hover:shadow-[var(--accent-orange)]/20 hover:shadow-lg"
        >
          <span>Explore All Projects &amp; Archives</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
