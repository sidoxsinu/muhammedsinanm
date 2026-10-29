import React from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';

import { PageHeader } from './PageHeader';

interface PageShellProps {
  badge: string;
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  maxWidth?: string;
  className?: string;
  children: React.ReactNode;
}

export function PageShell({
  badge,
  title,
  description,
  maxWidth = 'max-w-6xl',
  className = '',
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)]">
      <Navbar />

      <main
        className={`mx-auto ${maxWidth} px-4 pt-24 pb-20 sm:px-6 sm:pt-32 sm:pb-28 lg:px-8 ${className}`}
      >
        <PageHeader badge={badge} title={title} description={description} />
        {children}
      </main>

      <Footer />
    </div>
  );
}
