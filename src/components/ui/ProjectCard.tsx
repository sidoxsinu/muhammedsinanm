'use client';

import React from 'react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="h-full" data-testid="project-card">
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#161616] transition-colors duration-200 hover:border-[var(--accent-orange)]">
        {/* Project Image Preview */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-neutral-800 bg-neutral-900">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.title} Preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />

          {/* Top Year Badge */}
          <div className="pointer-events-none absolute top-3 right-3">
            <span className="rounded-full border border-neutral-700 bg-black/90 px-2.5 py-0.5 font-mono text-[11px] text-neutral-300">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-grow flex-col justify-between gap-4 p-5 sm:p-6">
          <div className="space-y-2.5">
            <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-lg">
              {project.title}
            </h3>
            <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400">
              {project.description}
            </p>
            {project.badge && (
              <div className="pt-0.5">
                <span className="inline-flex items-center rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent-orange)] uppercase">
                  {project.badge}
                </span>
              </div>
            )}
          </div>

          {/* Tags & Action Links */}
          <div className="space-y-4 pt-2">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-0.5 font-mono text-[11px] text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center justify-between border-t border-neutral-800 pt-3.5">
              {project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-white uppercase transition-colors hover:text-[var(--accent-orange)]"
                >
                  <span>Live Demo</span>
                  <span>↗</span>
                </a>
              ) : (
                <span />
              )}

              {project.links.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-neutral-400 uppercase transition-colors hover:text-white"
                >
                  <span>Source Code</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
