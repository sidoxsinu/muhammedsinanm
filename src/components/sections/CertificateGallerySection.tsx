'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { CERTIFICATE_CARDS } from '@/data/certificates';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AnimateIn } from '@/components/ui/AnimateIn';

export function CertificateGallerySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="fan-carousel" aria-label="Certificate Credentials Showcase" className="py-20 sm:py-28 border-t border-[var(--border-subtle)]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <AnimateIn>
            <SectionHeading
              label="Certifications"
              title="What I've Earned"
              description="Scroll to explore certificates and recognitions. Click any card to view the full document."
              className="mb-0"
            />
          </AnimateIn>

          {/* Controls */}
          <div className="flex items-center gap-2 self-start sm:self-end">
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll certificates left"
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll certificates right"
              className="w-10 h-10 rounded-full border border-[var(--border-subtle)] bg-white/5 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll-Snap Viewport */}
        <div
          ref={scrollContainerRef}
          tabIndex={0}
          aria-label="Certificate cards carousel"
          className="flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory focus:outline-none focus:ring-1 focus:ring-[var(--accent-red)] rounded-[var(--radius-xl)] -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
        >
          {CERTIFICATE_CARDS.map((card) => (
            <a
              key={card.number}
              href={card.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View certificate ${card.name} (${card.number})`}
              className="group min-w-[260px] sm:min-w-[300px] flex-shrink-0 snap-start rounded-[var(--radius-lg)] bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden hover:border-[var(--accent-red)]/50 hover:bg-[var(--bg-card-hover)] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative h-44 sm:h-48 w-full bg-neutral-900 overflow-hidden border-b border-white/5">
                <Image
                  src={card.thumbnail}
                  alt={card.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[var(--accent-red)] font-semibold block">
                    {card.number}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-neutral-100 truncate max-w-[210px]">
                    {card.name}
                  </h4>
                </div>
                <span className="text-xs text-[var(--text-muted)] group-hover:text-white transition-colors">
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
