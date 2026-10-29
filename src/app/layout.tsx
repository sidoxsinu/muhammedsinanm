import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';

import { SITE_CONFIG } from '@/lib/site-config';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { GlobalEffects } from '@/components/ui/GlobalEffects';
import { GradualBlur } from '@/components/ui/GradualBlur';
import { PROFILE } from '@/data/profile';

export const viewport: Viewport = {
  themeColor: '#111111',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${PROFILE.name} | Full-Stack Developer, AI Enthusiast & Software Engineer | Kerala`,
    template: `%s | ${PROFILE.name}`,
  },
  description:
    'Portfolio of Muhammed Sinan M - CS&E student, Software Engineering Intern at Torcue Digital, and Full-Stack Developer from Kerala. Built real production websites and won the Google Build with AI Hackathon 2026.',
  keywords: [
    'Muhammed Sinan M',
    'muhammed sinan',
    'sidoxsinu',
    'Full-Stack Developer Kerala',
    'Software Engineer India',
    'Next Gen AI Assistant',
    'Freelance Web Developer Kerala',
    'React Developer',
    'Node.js Developer',
    'Web Designer',
    'AI Enthusiast',
    'Muhammed Sinan portfolio',
    'Christ College Engineering Irinjalakuda developer',
  ],
  authors: [{ name: PROFILE.name }],
  creator: PROFILE.name,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'profile',
    url: SITE_CONFIG.url,
    title: `${PROFILE.name} | Full-Stack Developer & AI Enthusiast`,
    description:
      'Portfolio of Muhammed Sinan M - CS&E student, Software Engineering Intern at Torcue Digital, and Full-Stack Developer from Kerala. Built real production websites and won the Google Build with AI Hackathon 2026.',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} - Full-Stack Developer from Kerala`,
      },
    ],
    siteName: `${PROFILE.name} | Portfolio`,
    locale: 'en_IN',
    firstName: 'Muhammed Sinan',
    lastName: 'M',
    username: 'sidoxsinu',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sidoxsinu',
    creator: '@sidoxsinu',
    title: `${PROFILE.name} | Full-Stack Developer & AI Enthusiast`,
    description:
      'Portfolio of Muhammed Sinan M - CS&E student, Software Engineering Intern at Torcue Digital, and Full-Stack Developer from Kerala. Built real production websites and won the Google Build with AI Hackathon 2026.',
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-image.jpg`,
        alt: `${PROFILE.name} - Full-Stack Developer from Kerala, India`,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  other: {
    'geo.region': 'IN-KL',
    'geo.placename': 'Valanchery, Kerala, India',
    'geo.position': '10.8878;76.0683',
    ICBM: '10.8878, 76.0683',
  },
};

const jsonLdPerson = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://muhammedsinan.in/#person',
  name: 'Muhammed Sinan M',
  alternateName: [
    'sidoxsinu',
    'Sinan M',
    'Muhammed Sinan',
    'Mohammed Sinan',
    'Sinan',
    'MohammedSinanM',
  ],
  description:
    'Computer Science student, Full-Stack Developer, and AI Enthusiast from Valanchery, Kerala, India. Award-winning developer and hackathon winner.',
  url: 'https://muhammedsinan.in/',
  image: 'https://muhammedsinan.in/images/profile-picture/bg-removed-black&white-pfp.webp',
  email: 'muhammedsinan.m67@gmail.com',
  telephone: '+918590568566',
  jobTitle: 'Software Engineering Intern',
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Engineering Intern',
    occupationLocation: {
      '@type': 'Country',
      name: 'India',
    },
  },
  worksFor: {
    '@type': 'Organization',
    name: 'Torcue Digital Inc.',
    alternateName: 'Toric Software Labs Private Limited',
    url: 'https://www.torcue.com',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Valanchery',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Christ College of Engineering',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Irinjalakuda',
      addressRegion: 'Kerala',
      addressCountry: 'IN',
    },
  },
  knowsAbout: [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'TypeScript',
    'TailwindCSS',
    'Python',
    'AI/ML',
    'Full-Stack Development',
    'UI/UX Design',
    'Node.js',
    'Hackathons',
    'System Design',
    'GSAP',
    'Freelance Web Development',
  ],
  award: 'Best Technical Project - Google for Developers Build with AI Hackathon 2026',
  memberOf: [
    { '@type': 'Organization', name: 'IEEE' },
    { '@type': 'Organization', name: 'IEEE Computer Society' },
    { '@type': 'Organization', name: 'IEEE Industry Applications Society' },
    { '@type': 'Organization', name: 'IEEE Electron Devices Society' },
    { '@type': 'Organization', name: 'IEEE Electronics Packaging Society' },
    { '@type': 'Organization', name: 'IEEE Broadcast Technology Society' },
    { '@type': 'Organization', name: 'IEEE Vehicular Technology Society' },
    { '@type': 'Organization', name: 'IEEE Engineering in Medicine and Biology Society' },
    { '@type': 'Organization', name: 'IEEE Sensors Council' },
    { '@type': 'Organization', name: 'IEEE Systems Council' },
    { '@type': 'Organization', name: 'IEEE Transportation Electrification Council' },
    { '@type': 'Organization', name: 'TinkerHub CCE' },
    { '@type': 'Organization', name: 'FOSS CCE' },
    { '@type': 'Organization', name: 'IEDC Kerala Startup Mission NEST' },
    { '@type': 'Organization', name: 'Community of Developers' },
  ],
  sameAs: [
    'https://github.com/sidoxsinu',
    'https://www.linkedin.com/in/sidoxsinu/',
    'https://x.com/sidoxsinu',
    'https://www.instagram.com/sidoxsinu',
    'https://muhammedsinan.in',
  ],
};

const jsonLdWebSite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://muhammedsinan.in/#website',
  url: 'https://muhammedsinan.in/',
  name: 'Muhammed Sinan M | Portfolio',
  description:
    'Official portfolio of Muhammed Sinan M (sidoxsinu) - Full-Stack Developer and AI Enthusiast from Kerala, India.',
  inLanguage: 'en-IN',
  author: {
    '@id': 'https://muhammedsinan.in/#person',
  },
  copyrightHolder: {
    '@id': 'https://muhammedsinan.in/#person',
  },
  copyrightYear: '2025',
};

const jsonLdProfilePage = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://muhammedsinan.in/#profilepage',
  url: 'https://muhammedsinan.in/',
  name: 'Muhammed Sinan M - Portfolio',
  description:
    'Official portfolio page of Muhammed Sinan M, Computer Science student and Full-Stack Developer from Kerala, India. Features projects, hackathon achievements, certifications, and contact links.',
  inLanguage: 'en-IN',
  isPartOf: {
    '@id': 'https://muhammedsinan.in/#website',
  },
  about: {
    '@id': 'https://muhammedsinan.in/#person',
  },
  mainEntity: {
    '@id': 'https://muhammedsinan.in/#person',
  },
  dateCreated: '2025-01-01T12:00:00+05:30',
  dateModified: '2026-08-08T00:00:00+05:30',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link
          rel="preload"
          as="image"
          href="/images/profile-picture/bg-removed-black&white-pfp.webp"
          type="image/webp"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProfilePage) }}
        />
      </head>
      <body>
        <GradualBlur
          target="page"
          position="top"
          height="5.5rem"
          strength={1.8}
          layers={8}
          curve="bezier"
          tint="rgba(17, 17, 17, 0.4)"
          zIndex={40}
        />
        <GradualBlur
          target="page"
          position="bottom"
          height="5rem"
          strength={1.8}
          layers={8}
          curve="bezier"
          tint="rgba(17, 17, 17, 0.5)"
          zIndex={40}
          autoHide
        />
        <CustomCursor />
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
