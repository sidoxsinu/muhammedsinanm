import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export type ButtonProps = ButtonBaseProps &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external?: boolean })
  );

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-red)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] cursor-pointer';

  const variantStyles = {
    primary:
      'bg-[var(--accent-red)] text-white hover:bg-[var(--accent-orange)] shadow-lg shadow-[var(--accent-red)]/20',
    secondary: 'bg-white/10 text-white hover:bg-white/15 border border-[var(--border-subtle)]',
    outline:
      'bg-transparent text-white border border-[var(--border-subtle)] hover:border-white/40 hover:bg-white/5',
    ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-white hover:bg-white/5',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-7 py-3 gap-2.5',
  }[size];

  const combinedClasses = cn(baseStyles, variantStyles, sizeStyles, className);

  if ('href' in props && props.href) {
    const { href, external, ...anchorProps } =
      props as React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        href: string;
        external?: boolean;
      };

    if (external || href.startsWith('http') || href.endsWith('.pdf')) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
