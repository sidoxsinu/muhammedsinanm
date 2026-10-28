'use client';

import React from 'react';
import Link from 'next/link';

import { ProjectCard } from '@/components/ui/ProjectCard';
import { PROJECTS } from '@/data/projects';

export function ProjectsSection() {
  // Show featured projects on home page
  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      {/* Section Header */}
      <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Selected Works'}
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Featured Projects
          </h2>
          <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
            Handcrafted production systems, client platforms, and award-winning AI projects built
            with modern web technologies.
          </p>
        </div>

        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-[var(--accent-orange)] transition-colors hover:text-white md:self-auto"
        >
          <span>View All {PROJECTS.length} Projects</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

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
