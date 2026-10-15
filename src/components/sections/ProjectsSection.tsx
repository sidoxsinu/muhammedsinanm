'use client';

import React from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/data/projects';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Badge } from '@/components/ui/Badge';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function ProjectsSection() {
  return (
    <section id="projects" aria-label="Projects by Muhammed Sinan M" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container>
        <AnimateIn>
          <SectionHeading
            label="Projects"
            title="Projects"
            description="Production software, client engagements, and AI experiments."
          />
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((project, index) => (
            <AnimateIn key={project.id} delayMs={index * 80} className="h-full">
              <div
                id={project.id}
                className="h-full rounded-[var(--radius-xl)] bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                {/* Project Image */}
                <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-900 border-b border-[var(--border-subtle)]">
                  <Image
                    src={project.image}
                    alt={`${project.title} Preview`}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {project.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="accent" size="sm">
                        {project.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-white hover:text-[var(--accent-red)] flex items-center gap-1 transition-colors"
                      >
                        Live Website ↗
                      </a>
                    )}
                    {project.links.repo && (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="me noopener noreferrer"
                        className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        View Repository ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
