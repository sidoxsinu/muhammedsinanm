'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FEATURED_PROJECTS } from '@/data/featured';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function FeaturedSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section aria-label="Featured Projects Showcase" className="py-20 sm:py-28 overflow-hidden">
      <Container>
        <AnimateIn>
          <SectionHeading
            label="Featured Showcase"
            title="Featured Projects"
            description="Selected client works, award winners, and engineering highlights."
          />
        </AnimateIn>

        {/* Responsive Showcase: Accordion on desktop, horizontal scroll on mobile */}
        <div className="hidden lg:flex gap-4 h-[440px]">
          {FEATURED_PROJECTS.map((project, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={project.title}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative rounded-[var(--radius-xl)] overflow-hidden cursor-pointer transition-all duration-500 ease-out border border-[var(--border-subtle)] ${
                  isActive ? 'flex-[3.5] border-white/30 shadow-2xl' : 'flex-1 hover:border-white/20'
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover object-center transition-transform duration-700 ${
                    isActive ? 'scale-105' : 'scale-100 grayscale brightness-50'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {isActive ? (
                    <div className="animate-fadeIn">
                      <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-red)] block mb-1">
                        {project.source}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-sm text-neutral-300 max-w-lg mb-4 line-clamp-3">
                        {project.quote}
                      </p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-white bg-[var(--accent-red)] px-4 py-2 rounded-full hover:bg-[var(--accent-orange)] transition-colors"
                      >
                        Explore Project ↗
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-neutral-400">0{index + 1}</span>
                      <h4 className="text-sm font-semibold text-white truncate">{project.title}</h4>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile/Tablet Card Scroll-Snap */}
        <div className="lg:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6">
          {FEATURED_PROJECTS.map((project) => (
            <div
              key={project.title}
              className="min-w-[280px] sm:min-w-[340px] flex-shrink-0 snap-center rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-card)] relative flex flex-col h-[380px]"
            >
              <div className="relative h-44 w-full flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[var(--accent-red)] uppercase border border-white/10">
                  {project.source}
                </div>
              </div>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                    {project.quote}
                  </p>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent-red)] hover:underline"
                >
                  View Live ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
