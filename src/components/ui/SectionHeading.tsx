import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={cn('mb-10 md:mb-12', isCenter && 'text-center', className)}>
      <span className="inline-block text-xs uppercase font-mono tracking-widest text-[var(--text-muted)] mb-3">
        {'// '}{label}
      </span>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className={cn('mt-3 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl', isCenter && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  );
}
