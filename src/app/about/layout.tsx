import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Muhammed Sinan M: background, work experience at Torcue Digital, career journey, education, and leadership positions.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
