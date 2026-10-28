import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore featured and freelance software engineering projects by Muhammed Sinan M, spanning full-stack web applications, AI systems, and client solutions.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
