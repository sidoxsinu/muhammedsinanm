import React from 'react';

import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline' | 'gold';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-white/5 text-[var(--text-secondary)] border border-[var(--border-subtle)]',
    accent:
      'bg-[var(--accent-red)]/15 text-[var(--accent-red)] border border-[var(--accent-red)]/40',
    outline: 'border border-[var(--border-subtle)] text-[var(--text-secondary)] bg-transparent',
    gold: 'bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--border-gold)]',
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 tracking-wider',
    md: 'text-xs px-2.5 py-1 tracking-normal',
  }[size];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium uppercase transition-colors',
        variantStyles,
        sizeStyles,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
