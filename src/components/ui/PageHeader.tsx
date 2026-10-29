import React from 'react';
import Link from 'next/link';

interface PageHeaderProps {
  badge: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  backHref?: string;
  backLabel?: string;
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  backHref = '/',
  backLabel = 'Back to Home',
  className = '',
}: PageHeaderProps) {
  const formattedBadge = badge.startsWith('//') ? badge : `// ${badge}`;

  return (
    <div className={`mb-10 sm:mb-14 ${className}`}>
      {backHref && (
        <div className="mb-6 sm:mb-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-400 uppercase transition-colors hover:text-[var(--accent-orange)]"
          >
            <span>← {backLabel}</span>
          </Link>
        </div>
      )}
      <div className="space-y-3 sm:space-y-4">
        <div>
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {formattedBadge}
          </span>
        </div>
        <h1 className="text-3xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          {description}
        </p>
      </div>
    </div>
  );
}
