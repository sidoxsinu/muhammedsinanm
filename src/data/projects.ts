import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'project-ai-assistant',
    title: 'Next-Gen AI Assistant System',
    description:
      'Multi-modal AI terminal for real-time voice and text workflows using Groq API (LLaMA 3.3 for ultra-low latency inference, Whisper for speech-to-text). Won Best Technical Project at the Google for Developers Build with AI Hackathon.',
    year: '2026',
    tags: ['AI', 'Python', 'Groq API', 'LLaMA 3.3', 'Whisper'],
    links: {
      live: 'https://next-gen-ai-assistant-system.vercel.app',
      repo: 'https://github.com/sidoxsinu/next-gen-ai-assistant-system',
    },
    image: '/assets/images/projects/next-gen-ai-assistant.webp',
    featured: true,
    badge: 'Best Tech Project',
    recognition: {
      text: 'Best Technical Project - Google for Developers Build with AI Hackathon 2026',
    },
  },
  {
    id: 'project-ghostops',
    title: 'GhostOps',
    description:
      'Zero-trust developer credential offboarding dashboard built during a 36-hour hackathon. Maps and instantly revokes developer access across AWS IAM, GitHub API, and Dockerized SSH sandbox environments from a unified administrative control center.',
    year: '2026',
    tags: ['Python', 'FastAPI', 'React', 'Docker', 'AWS IAM', 'GitHub API', 'SQLite'],
    links: {
      repo: 'https://github.com/sidoxsinu/GhostOps',
    },
    image: '/assets/images/projects/ghostops.webp',
    featured: true,
    badge: '36h Hackathon',
  },
  {
    id: 'project-gate-layover',
    title: 'GATE - Layover Companion',
    description:
      'Mobile-first progressive web app built for the LAYOVER Hackathon (TinkerSpace Calicut, Oct 2026). Turns layover wait times into location-based exploration missions, complete with an XP progression rank system and a digital travel passport of photo memories.',
    year: '2026',
    tags: ['Next.js', 'Supabase', 'Groq API', 'Vercel', 'Tailwind CSS'],
    links: {
      live: 'https://gate-next-cyan.vercel.app/',
      repo: 'https://github.com/sidoxsinu/layoverhackathon',
    },
    image: '/assets/images/projects/gate-layover.webp',
    featured: true,
    badge: 'TinkerSpace Hackathon',
  },
  {
    id: 'project-pylon',
    title: 'Pylon - Smart Scholarship Finder',
    description:
      'Performance-tuned scholarship discovery engine with a custom multi-criteria filtering algorithm and responsive UI to match students with verified opportunities. Awarded 2nd Prize at Webathon 2025.',
    year: '2025',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    links: {
      live: 'https://pylon-topaz.vercel.app',
      repo: 'https://github.com/sidoxsinu/Pylon',
    },
    image: '/assets/images/projects/pylon.webp',
    featured: true,
    badge: '2nd Prize (Webathon)',
  },
  {
    id: 'project-parackal',
    title: 'Parackal Travels Hub',
    description:
      'Bilingual (English/Malayalam) travel agency platform engineered end-to-end for a commercial client. Features LocalBusiness schema SEO markup, interactive booking request flows, and responsive GSAP animations - live in production.',
    year: '2026',
    tags: ['Freelance', 'JavaScript', 'GSAP', 'SEO'],
    links: {
      live: 'https://parackaltravelhub.com',
    },
    image: '/assets/images/projects/parackal-travel-hub.webp',
    featured: true,
    badge: 'Client Production',
  },
  {
    id: 'project-avenwing',
    title: 'AvenWing',
    description:
      'High-end showcase website delivered for a handcrafted kinetic wooden sculpture brand. Features interactive product galleries, direct WhatsApp checkout, and smooth GSAP choreography.',
    year: '2026',
    tags: ['Freelance', 'HTML/CSS', 'JavaScript', 'GSAP'],
    links: {
      live: 'https://avenwing.com',
    },
    image: '/assets/images/projects/avenwing.webp',
    featured: false,
    badge: 'Client Production',
  },
  {
    id: 'project-silentguard',
    title: 'SilentGuard',
    description:
      'Machine learning predictive maintenance and anomaly detection framework to monitor telemetry, vibration, and thermal fluctuation patterns to foresee equipment breakdown before catastrophic failure.',
    year: '2025',
    tags: ['AI/ML', 'Python'],
    links: {
      repo: 'https://github.com/sidoxsinu/SilentGuard',
    },
    image: '/assets/images/projects/silentguard.webp',
    featured: false,
  },
  {
    id: 'project-codeburry',
    title: 'CodeBurry',
    description:
      'Gamified frontend development learning platform with interactive coding challenges, real-time progress tracking, and community feeds to make programming engaging through bite-sized missions and XP rewards.',
    year: '2025',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    links: {
      live: 'https://code-burry.vercel.app',
      repo: 'https://github.com/sidoxsinu/CodeBurry',
    },
    image: '/assets/images/projects/codeburry.webp',
    featured: false,
  },
  {
    id: 'project-universityhub',
    title: 'UniversityHub',
    description:
      'Centralized collegiate academic platform for Christ College of Engineering consolidating syllabus guides, timetables, internal notifications, and student tools built on Python Django.',
    year: '2025',
    tags: ['Python', 'Django'],
    links: {
      repo: 'https://github.com/sidoxsinu/universityhub',
    },
    image: '/assets/images/projects/universityhub.webp',
    featured: false,
  },
  {
    id: 'project-buscue',
    title: 'BusCue - Audio-First Transit Accessibility',
    description:
      'Real-time audio-first bus arrival detection system for visually impaired and neurodivergent commuters. Interfaces custom ESP32 hardware beacon receivers with a Flutter conductor broadcasting app and Next.js fleet management dashboard. Awarded Special Mention at IncluCode (IEEE) at Sahrdaya College of Engineering (Autonomous).',
    year: '2026',
    tags: ['IoT', 'ESP32', 'Flutter', 'Next.js', 'Firebase', 'BLE'],
    links: {
      repo: 'https://github.com/tm-SicadaS/IncluCode',
    },
    image: '/assets/images/projects/buscue.webp',
    featured: false,
    badge: 'Special Mention IEEE',
    recognition: {
      text: 'Special Mention Award - IncluCode by IEEE at Sahrdaya College of Engineering (Autonomous) 2026',
    },
  },
];
