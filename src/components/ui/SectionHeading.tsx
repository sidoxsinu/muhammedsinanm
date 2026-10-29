import React from 'react';
import Link from 'next/link';

interface SectionHeadingProps {
  badge: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  description,
  ctaText,
  ctaHref,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const formattedBadge = badge.startsWith('//') ? badge : `// ${badge}`;

  return (
    <div
      className={`mb-12 flex flex-col justify-between gap-4 ${
        isCenter ? 'items-center text-center' : 'md:flex-row md:items-end'
      } ${className}`}
    >
      <div className={`space-y-3 ${isCenter ? 'mx-auto max-w-xl text-center' : ''}`}>
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {formattedBadge}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p
            className={`text-sm text-neutral-400 sm:text-base ${
              isCenter ? 'mx-auto max-w-xl' : 'max-w-xl'
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {ctaText && ctaHref && (
        <Link
          href={ctaHref}
          className="group inline-flex items-center gap-2 self-start font-mono text-xs font-semibold text-[var(--accent-orange)] uppercase transition-colors hover:text-white md:self-auto"
        >
          <span>{ctaText}</span>
          <span>→</span>
        </Link>
      )}
    </div>
  );
}
