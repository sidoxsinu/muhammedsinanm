import React from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}

export function Container({
  children,
  size = 'default',
  className,
  ...props
}: ContainerProps) {
  const sizeClass = {
    narrow: 'max-w-4xl',
    default: 'max-w-[1200px]',
    wide: 'max-w-7xl',
    full: 'max-w-full',
  }[size];

  return (
    <div
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}
