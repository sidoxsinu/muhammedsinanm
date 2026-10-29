'use client';

import React from 'react';

import { EDUCATION_DATA } from '@/data/education';

export function EducationSection() {
  return (
    <section
      id="education"
      aria-label="Education"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Academic Foundation'}
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          Education
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Formal university computer science curriculum combined with continuous competitive
          engineering.
        </p>
      </div>

      <div className="space-y-4">
        {EDUCATION_DATA.map((item) => (
          <div
            key={item.degree + item.institution}
            className="flex flex-col justify-between gap-3 rounded-[2px] border border-neutral-800 bg-[#161616] p-6 transition-colors hover:border-neutral-700 sm:flex-row sm:items-center sm:p-7"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
              <p className="font-mono text-sm text-[var(--accent-orange)]">{item.institution}</p>
            </div>

            <div className="self-start sm:self-auto">
              <span className="rounded-[2px] border border-neutral-700 bg-neutral-900 px-3 py-1 font-mono text-xs text-neutral-300">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
