'use client';

import React from 'react';
import { Project } from '@/types';

import { SpotlightCard } from './SpotlightCard';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <SpotlightCard className="group flex h-full flex-col">
      {/* Project Image Preview */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06] bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} Preview`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="pointer-events-none absolute top-3 right-3 left-3 flex items-center justify-between">
          {project.badge ? (
            <span className="rounded-full bg-[var(--accent-orange)] px-2.5 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-md">
              {project.badge}
            </span>
          ) : (
            <span />
          )}
          <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-medium text-neutral-300 backdrop-blur-md">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col justify-between gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-2xl">
              {project.title}
            </h3>
          </div>
          <p className="line-clamp-3 text-sm leading-relaxed text-neutral-400 transition-colors group-hover:text-neutral-300">
            {project.description}
          </p>
        </div>

        {/* Tags & Action Links */}
        <div className="space-y-4 pt-2">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.06] bg-white/[0.05] px-2 py-0.5 text-[11px] font-medium text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 border-t border-white/[0.06] pt-2">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-white transition-colors hover:text-[var(--accent-orange)] sm:text-sm"
              >
                <span>Live Demo</span>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}

            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 transition-colors hover:text-white sm:text-sm"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
