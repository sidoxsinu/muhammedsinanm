import React from 'react';

import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'interactive' | 'gold';
}

export function Card({ children, variant = 'default', className, ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-[var(--bg-card)] border border-[var(--border-subtle)]',
    interactive:
      'bg-[var(--bg-card)] border border-[var(--border-subtle)] hover:border-[var(--border-highlight)] hover:bg-[var(--bg-card-hover)] transition-all duration-300',
    gold: 'bg-[var(--bg-card)] border border-[var(--border-gold)] hover:border-[var(--gold-accent)] transition-all duration-300',
  }[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[var(--radius-lg)] p-6',
        variantStyles,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
