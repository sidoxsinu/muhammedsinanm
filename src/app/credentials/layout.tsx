import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Credentials & Achievements',
  description:
    'Certifications, hackathon wins, major awards, and verified credentials earned by Muhammed Sinan M.',
};

export default function CredentialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
