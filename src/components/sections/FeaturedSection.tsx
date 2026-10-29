'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FeaturedItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  link: string;
  repo?: string;
  tech: string[];
}

const FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: 'next-gen-ai',
    title: 'Next-Gen AI Assistant System',
    badge: 'AWARD: BEST TECHNICAL PROJECT',
    description:
      'Award-winning voice and systems interaction agent. Leverages Groq LLaMA 3.3 and Whisper for low-latency voice execution and local terminal workflows.',
    image: '/assets/images/projects/next-gen-ai-assistant.webp',
    link: 'https://github.com/sidoxsinu/Next-Gen-Ai-Assistant',
    tech: ['Python', 'Groq API', 'Whisper', 'LLaMA 3.3', 'FastAPI'],
  },
  {
    id: 'gate-layover',
    title: 'GATE - Layover Companion',
    badge: 'HACKATHON: TINKERSPACE CALICUT',
    description:
      'AI transit companion for travelers navigating flight layovers. Computes safe local transit radii, currency conversions, and offline boarding passes.',
    image: '/assets/images/projects/gate-layover.webp',
    link: 'https://github.com/sidoxsinu/LayoverHackathon',
    tech: ['Next.js 15', 'FastAPI', 'Groq API', 'Leaflet', 'Tailwind'],
  },
  {
    id: 'ghostops',
    title: 'GhostOps - Autonomous Remediation',
    badge: 'HACKATHON: 36H HACKATHON',
    description:
      'Autonomous incident-remediation engine designed for zero-downtime microservices. Diagnoses failed Docker containers and applies corrective actions.',
    image: '/assets/images/projects/ghostops.webp',
    link: 'https://github.com/sidoxsinu/GhostOps',
    tech: ['Python', 'Docker API', 'WebSockets', 'Next.js', 'FastAPI'],
  },
  {
    id: 'pylon',
    title: 'Pylon Scholarship Discovery',
    badge: 'AWARD: 2ND PRIZE WEBATHON',
    description:
      'High-performance scholarship search platform with real-time algorithmic filtering and clean responsive UI architecture.',
    image: '/assets/images/projects/pylon.webp',
    link: 'https://github.com/sidoxsinu/Pylon',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Custom Search'],
  },
  {
    id: 'avenwing',
    title: 'AvenWing Kinetic Sculptures',
    badge: 'CLIENT DELIVERABLE',
    description:
      'High-conversion product showcase for kinetic engineering art. Features interactive 360-style viewer states and automated WhatsApp ordering.',
    image: '/assets/images/projects/avenwing.webp',
    link: 'https://avenwing.muhammedsinan.in',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'WhatsApp API'],
  },
];

export function FeaturedSection() {
  const [activeId, setActiveId] = useState<string>(FEATURED_ITEMS[0].id);

  return (
    <section
      id="featured"
      aria-label="Highlighted Projects"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Interactive Showcase
          </h2>
          <p className="max-w-xl text-sm text-neutral-400 sm:text-base">
            Hover over any project panel to expand its preview, technical stack, and repository
            links.
          </p>
        </div>

        <Link
          href="/projects"
          className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase hover:text-white"
        >
          View Full Catalog (9 Projects) →
        </Link>
      </div>

      {/* Accordion Gallery Showcase */}
      <div
        className="flex flex-col gap-2.5 md:h-[480px] md:flex-row"
        role="tablist"
        aria-label="Project Preview Bar"
      >
        {FEATURED_ITEMS.map((item) => {
          const isActive = item.id === activeId;

          return (
            <div
              key={item.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onMouseEnter={() => setActiveId(item.id)}
              onFocus={() => setActiveId(item.id)}
              onClick={() => setActiveId(item.id)}
              className={`relative min-w-0 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-500 ease-out ${
                isActive
                  ? 'flex-[3.5] border-[var(--accent-orange)] bg-[#1a1a1a]'
                  : 'flex-1 border-neutral-800 bg-[#141414] hover:border-neutral-700'
              } min-h-[160px] md:min-h-0`}
            >
              {/* Background Preview Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-all duration-700 ${
                  isActive ? 'scale-100 opacity-60' : 'scale-105 opacity-20 grayscale'
                }`}
              />

              {/* Solid Matte Overlay */}
              <div className="absolute inset-0 bg-[#111111]/70" />

              {/* Panel Content */}
              <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                {/* Main Text Content */}
                <div className="space-y-2.5">
                  <h3
                    className={`font-semibold tracking-tight text-white transition-all ${
                      isActive
                        ? 'text-base sm:text-lg leading-tight'
                        : 'text-xs sm:text-sm line-clamp-2 leading-snug'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {isActive ? (
                    <div className="space-y-3.5">
                      <p className="max-w-xl text-sm leading-relaxed text-neutral-300">
                        {item.description}
                      </p>

                      {item.badge && (
                        <div>
                          <span className="inline-flex rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--accent-orange)] uppercase">
                            {item.badge}
                          </span>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5">
                        {item.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 font-mono text-[10px] text-neutral-400 uppercase"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-orange)] bg-[var(--accent-orange)] px-4 py-1.5 font-mono text-xs font-semibold tracking-wider text-white uppercase hover:bg-[#d94e24]"
                        >
                          <span>Explore Project</span>
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="hidden font-mono text-xs text-neutral-500 uppercase md:block">
                      Hover to Expand
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
