'use client';

import React from 'react';

import { CERTIFICATE_CARDS, FORMAL_CERTIFICATIONS, SPOKEN_LANGUAGES } from '@/data/certificates';

export function CertificationsSection() {
  return (
    <section
      id="certifications"
      aria-label="Certifications & Languages"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Credentials'}
        </span>
        <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
          Certifications &amp; Languages
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Formal credentials, spoken languages, and verified participation records from engineering
          events.
        </p>
      </div>

      {/* Top Split: Formal Certs & Languages */}
      <div className="mb-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Formal Certs */}
        <div className="rounded-[2px] border border-neutral-800 bg-[#161616] p-6 sm:p-7">
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
                  <span className="shrink-0 rounded-[2px] border border-neutral-700 bg-neutral-900 px-2 py-0.5 font-mono text-[10px] text-neutral-300">
                    {cert.period}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Languages */}
        <div className="rounded-[2px] border border-neutral-800 bg-[#161616] p-6 sm:p-7">
          <h3 className="mb-4 font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
            Spoken Languages
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {SPOKEN_LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                className="rounded-[2px] border border-neutral-800 bg-neutral-900/60 p-3"
              >
                <h4 className="text-sm font-semibold text-white">{lang.name}</h4>
                <p className="font-mono text-xs text-neutral-400">{lang.proficiency}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Verified Certificate Documents Gallery */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-mono text-xs font-semibold tracking-wider text-neutral-300 uppercase">
            Verified Certificate Documents ({CERTIFICATE_CARDS.length})
          </h3>
          <span className="font-mono text-xs text-neutral-500">Click to Inspect Document</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CERTIFICATE_CARDS.map((card) => (
            <a
              key={card.number}
              href={encodeURI(card.documentUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between overflow-hidden rounded-[2px] border border-neutral-800 bg-[#161616] transition-colors hover:border-[var(--accent-orange)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeURI(card.thumbnail)}
                  alt={card.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="flex flex-col justify-between gap-1 p-2.5">
                <span className="font-mono text-[10px] text-[var(--accent-orange)]">
                  #{card.number}
                </span>
                <span className="line-clamp-2 text-xs font-medium text-neutral-300 transition-colors group-hover:text-white">
                  {card.name}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
