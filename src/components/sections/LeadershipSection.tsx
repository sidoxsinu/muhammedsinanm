'use client';

import React from 'react';

import { LEADERSHIP } from '@/data/leadership';

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      aria-label="Leadership Roles"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Responsibility'}
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          Leadership Roles
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Elected executive roles, campus developer chapter coordination, and technical workshop
          mentorship.
        </p>
      </div>

      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {LEADERSHIP.map((item) => (
          <div
            key={item.role + item.organization}
            className="flex flex-col justify-between gap-2 py-5 sm:flex-row sm:items-center sm:gap-6"
          >
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white sm:text-xl">{item.role}</h3>
              <p className="text-sm text-neutral-400">{item.organization}</p>
            </div>

            <div className="shrink-0 self-start sm:self-auto">
              <span className="rounded-full border border-neutral-700 bg-[#161616] px-3.5 py-1 font-mono text-xs text-neutral-300">
                {item.period}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
