'use client';

import React from 'react';

import { EXPERIENCES } from '@/data/experience';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Work Experience"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Career Track'}
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          Work Experience
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Engineering roles in professional product teams, client software deliverables, and
          development workflows.
        </p>
      </div>

      <div className="space-y-6">
        {EXPERIENCES.map((exp) => (
          <div
            key={exp.role + exp.company}
            className="flex flex-col justify-between gap-4 rounded-[2px] border border-neutral-800 bg-[#161616] p-6 transition-colors hover:border-neutral-700 sm:p-8"
          >
            {/* Top row: Role & Badge */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white sm:text-2xl">{exp.role}</h3>
                <p className="font-mono text-sm font-medium text-[var(--accent-orange)]">
                  {exp.company}
                </p>
              </div>

              {exp.badge && (
                <div className="self-start sm:self-auto">
                  <span className="rounded-[2px] border border-neutral-700 bg-neutral-900 px-2.5 py-1 font-mono text-[11px] font-semibold text-neutral-300 uppercase">
                    {exp.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Middle row: Date & Location (Responsive & cleanly wrapped) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-white/[0.06] py-2.5 font-mono text-xs text-neutral-400">
              <span>Period: {exp.period}</span>
              {exp.location && (
                <>
                  <span className="hidden text-neutral-600 sm:inline">|</span>
                  <span>Location: {exp.location}</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-neutral-300 sm:text-base">
              {exp.description}
            </p>

            {/* Verification / Company Link */}
            {(exp.companyUrl || exp.verifyUrl) && (
              <div className="pt-2">
                <a
                  href={exp.companyUrl || exp.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase hover:text-white"
                >
                  <span>{exp.companyUrl ? 'Company Website' : 'Verification Portal'}</span>
                  <span>↗</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
