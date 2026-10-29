'use client';

import React from 'react';
import Link from 'next/link';

import { FORMAL_CERTIFICATIONS, SPOKEN_LANGUAGES } from '@/data/certificates';

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-label="Languages & Accreditations"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Languages & Accreditations'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Languages &amp; Accreditations
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Formal credentials, spoken languages, and professional engineering memberships.
        </p>
      </div>

      {/* Split: Formal Accreditations & Languages */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Formal Accreditations */}
        <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-6 sm:p-7">
          <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
            Formal Accreditations
          </h3>
          <ul className="space-y-3">
            {FORMAL_CERTIFICATIONS.map((cert) => (
              <li
                key={cert.name}
                className="flex items-start justify-between gap-3 border-b border-neutral-800/80 pb-2.5 last:border-0 last:pb-0"
              >
                <div>
                  <h4 className="text-sm font-medium text-white">{cert.name}</h4>
                  {cert.issuer && <p className="text-xs text-neutral-400">{cert.issuer}</p>}
                </div>
                {cert.period && (
                  <span className="shrink-0 rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 font-mono text-[10px] text-neutral-300">
                    {cert.period}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-6 sm:p-7">
          <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
            Spoken Languages
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {SPOKEN_LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-3"
              >
                <h4 className="text-sm font-semibold text-white">{lang.name}</h4>
                <p className="font-mono text-xs text-neutral-400">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Link to Dedicated Credentials Page */}
      <div className="mt-8 text-center">
        <Link
          href="/credentials"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-[#161616] px-5 py-2.5 font-mono text-xs font-semibold text-neutral-300 uppercase transition-colors hover:border-[var(--accent-orange)] hover:text-white"
        >
          <span>View Verified Certificate Documents in Credentials Catalog (23)</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
