'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/useInView';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimateInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function AnimateIn({
  children,
  delayMs = 0,
  direction = 'up',
  className,
  ...props
}: AnimateInProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up':
        return inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0';
      case 'down':
        return inView ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0';
      case 'left':
        return inView ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0';
      case 'right':
        return inView ? 'translate-x-0 opacity-100' : '-translate-x-6 opacity-0';
      case 'none':
      default:
        return inView ? 'opacity-100' : 'opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(
        'transition-all duration-700 ease-out will-change-[transform,opacity]',
        getDirectionClasses(),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
