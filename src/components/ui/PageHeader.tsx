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
    <div className={`mb-10 space-y-4 ${className}`}>
      {backHref && (
        <Link
          href={backHref}
          className="mb-8 inline-flex items-center gap-2 font-mono text-xs tracking-wider text-neutral-400 uppercase transition-colors hover:text-[var(--accent-orange)]"
        >
          <span>← {backLabel}</span>
        </Link>
      )}
      <div>
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {formattedBadge}
        </span>
      </div>
      <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
