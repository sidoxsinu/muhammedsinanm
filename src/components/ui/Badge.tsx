import React from 'react';

export type BadgeVariant = 'orange' | 'dark' | 'outline' | 'subtle';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'orange', children, className = '', ...props }: BadgeProps) {
  const variantStyles = {
    orange:
      'border border-[var(--accent-orange)] bg-[var(--accent-orange)]/15 text-[var(--accent-orange)]',
    dark: 'border border-white/10 bg-black/60 text-neutral-300',
    outline: 'border border-white/[0.08] bg-white/[0.05] text-neutral-400 font-mono',
    subtle: 'border border-white/[0.06] bg-white/[0.05] text-neutral-300',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-[2px] px-2.5 py-0.5 font-mono text-xs tracking-wider uppercase ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
