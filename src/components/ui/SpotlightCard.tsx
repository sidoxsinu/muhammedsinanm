'use client';

import React from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function SpotlightCard({ children, className = '', style, ...props }: SpotlightCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-[#161616] transition-all duration-200 hover:border-neutral-700 ${className}`}
      style={style}
      {...props}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
