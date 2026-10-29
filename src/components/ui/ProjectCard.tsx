'use client';

import React, { useState } from 'react';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  index?: number;
  featured?: boolean;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Floating preview card dimensions & screen-clamped coordinates
  const previewWidth = 280;
  const previewHeight = 185;

  let left = mousePos.x + 24;
  let top = mousePos.y - previewHeight / 2;

  if (typeof window !== 'undefined') {
    if (left + previewWidth > window.innerWidth - 20) {
      left = mousePos.x - previewWidth - 24;
    }
    top = Math.max(20, Math.min(top, window.innerHeight - previewHeight - 20));
  }

  return (
    <article
      data-testid="project-card"
      className="w-full relative"
      onMouseEnter={(e) => {
        setIsHovered(true);
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
      onMouseMove={(e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Row trigger button */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200"
      >
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          {index !== undefined && (
            <span className="font-mono text-xs font-semibold text-neutral-500 transition-colors group-hover:text-[var(--accent-orange)] sm:text-sm">
              {String(index + 1).padStart(2, '0')}
            </span>
          )}

          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <h3 className="truncate text-base font-semibold text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-lg leading-snug">
                {project.title}
              </h3>
              {project.badge && (
                <span className="rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent-orange)] uppercase hidden sm:inline-block">
                  {project.badge}
                </span>
              )}
            </div>
            <p className="font-mono text-xs text-neutral-400 truncate">
              {project.tags.slice(0, 4).join(' • ')}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full border border-neutral-700 bg-[#161616] px-3.5 py-1 font-mono text-xs text-neutral-300">
            {project.year}
          </span>
          <span
            className={`flex h-7 w-7 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-xs text-neutral-400 transition-all duration-300 group-hover:border-[var(--accent-orange)] group-hover:text-white ${
              isExpanded ? 'rotate-180 border-[var(--accent-orange)] text-[var(--accent-orange)]' : ''
            }`}
          >
            ▼
          </span>
        </div>
      </button>

      {/* Floating mini preview card on hover (hidden on touch/mobile or when expanded) */}
      {isHovered && !isExpanded && (
        <div
          className="pointer-events-none fixed z-50 hidden md:block overflow-hidden rounded-2xl border border-white/20 bg-[#161616] shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-opacity duration-150 animate-in fade-in zoom-in-95"
          style={{
            left: `${left}px`,
            top: `${top}px`,
            width: `${previewWidth}px`,
          }}
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={`${project.title} Preview`}
              loading="eager"
              className="h-full w-full object-cover object-top"
            />
            {project.badge && (
              <div className="absolute top-2 left-2">
                <span className="rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/20 px-2 py-0.5 font-mono text-[9px] font-semibold text-[var(--accent-orange)] backdrop-blur-md uppercase">
                  {project.badge}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 bg-[#111111]/90 px-3 py-1.5 font-mono text-[10px]">
            <span className="truncate text-white font-medium">{project.title}</span>
            <span className="shrink-0 text-[var(--accent-orange)]">Preview</span>
          </div>
        </div>
      )}

      {/* Expanded details drawer on click */}
      {isExpanded && (
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-[#161616] p-5 sm:p-7 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8 items-center">
            {/* High-res Image preview */}
            <div className="md:col-span-5">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.title} Preview`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
                {project.badge && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/20 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent-orange)] backdrop-blur-md uppercase">
                      {project.badge}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details & Actions */}
            <div className="flex flex-col justify-between space-y-4 md:col-span-7">
              <div className="space-y-3">
                {project.recognition && (
                  <p className="font-mono text-xs font-semibold text-[var(--accent-orange)]">
                    ★ {project.recognition.text}
                  </p>
                )}
                <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
                  {project.description}
                </p>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-neutral-800 bg-[#111111] px-2.5 py-1 font-mono text-xs text-neutral-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-orange)] bg-[var(--accent-orange)] px-4 py-2 font-mono text-xs font-semibold text-white uppercase transition-colors hover:bg-[#d94e24]"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
                {project.links.repo && (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-4 py-2 font-mono text-xs font-semibold text-neutral-300 uppercase transition-colors hover:border-neutral-500 hover:text-white"
                  >
                    <span>Source Code</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
