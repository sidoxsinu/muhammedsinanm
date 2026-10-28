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
      <span className="mb-3 inline-block font-mono text-xs tracking-widest text-[var(--text-muted)] uppercase">
        {'// '}
        {label}
      </span>
      <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-3 max-w-2xl text-base text-[var(--text-secondary)] sm:text-lg',
            isCenter && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
