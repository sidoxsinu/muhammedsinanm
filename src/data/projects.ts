import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: 'project-avenwing',
    title: 'AvenWing',
    description:
      'Premium e-commerce website for a handcrafted kinetic wooden sculpture brand. Built a complete product showcase with an interactive gallery, direct call & WhatsApp checkout, and smooth GSAP scroll animations — delivered as a live freelance production site.',
    year: '2026',
    tags: ['Freelance', 'HTML/CSS', 'JavaScript', 'GSAP'],
    links: {
      live: 'https://avenwing.com',
    },
    image: '/assets/images/project-images/avenwing.webp',
    featured: true,
    badge: 'Freelance',
  },
  {
    id: 'project-parackal',
    title: 'Parackal Travels Hub',
    description:
      'Full-stack travel booking platform for a real travel agency, featuring a custom inquiry and booking flow, bilingual (English/Arabic) content, and a GSAP-animated responsive interface — live and serving clients at parackaltravelhub.com.',
    year: '2026',
    tags: ['Freelance', 'HTML/CSS', 'JavaScript', 'GSAP'],
    links: {
      live: 'https://parackaltravelhub.com',
    },
    image: '/assets/images/project-images/parackal-travel-hub.webp',
    featured: true,
    badge: 'Freelance',
  },
  {
    id: 'project-ai-assistant',
    title: 'Next Gen AI Assistant',
    description:
      "Award-winning multi-modal AI assistant built for the Build with AI Hackathon 2026. Integrates Groq's Llama 3.3 for ultra-fast inference, real-time voice interaction, and context-aware responses. Won Best Technical Project at MuLearn NSSCE — recognized for technical excellence and innovation.",
    year: '2026',
    tags: ['AI', 'Groq API', 'Llama 3.3'],
    links: {
      live: 'https://next-gen-ai-assistant-system.vercel.app',
      repo: 'https://github.com/sidoxsinu/next-gen-ai-assistant-system',
    },
    image: '/assets/images/project-images/next-gen-ai-assistant.webp',
    featured: true,
    badge: 'Best Tech Project',
    recognition: {
      text: 'Best Technical Project — Build with AI Hackathon 2026',
    },
  },
  {
    id: 'project-pylon',
    title: 'Pylon',
    description:
      'Scholarship discovery platform that lets students filter and find relevant scholarships instantly. Built a custom multi-criteria search algorithm with real-time filtering, smooth animations, and a fully responsive UI — all in pure HTML, CSS, and JavaScript with zero dependencies.',
    year: '2025',
    tags: ['HTML/CSS', 'JavaScript'],
    links: {
      live: 'https://pylon-topaz.vercel.app',
      repo: 'https://github.com/sidoxsinu/Pylon',
    },
    image: '/assets/images/project-images/pylon.webp',
    featured: true,
    badge: 'Second Prize (WEBATHON)',
  },
  {
    id: 'project-universityhub',
    title: 'UniversityHub',
    description:
      'Centralized student platform for Christ College of Engineering, consolidating academic resources, timetables, notices, and tools into a single interface. Built on Python Django with a fully configured admin panel for content management.',
    year: '2025',
    tags: ['Python', 'Django'],
    links: {
      repo: 'https://github.com/sidoxsinu/universityhub',
    },
    image: '/assets/images/project-images/universityhub.webp',
    featured: false,
  },
  {
    id: 'project-codeburry',
    title: 'CodeBurry',
    description:
      'Gamified frontend development learning platform with interactive coding challenges, real-time progress tracking, and a community feed. Designed to make learning to code engaging through bite-sized missions and an XP-based reward system.',
    year: '2025',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    links: {
      live: 'https://code-burry.vercel.app',
      repo: 'https://github.com/sidoxsinu/CodeBurry',
    },
    image: '/assets/images/project-images/codeburry.webp',
    featured: true,
  },
  {
    id: 'project-silentguard',
    title: 'SilentGuard',
    description:
      'AI-based anomaly detection system designed to monitor logs and system behavior patterns, surface irregular activity, and trigger preventive alerts before failures occur. Built in Python using ML-based pattern analysis to reduce unexpected system downtime.',
    year: '2025',
    tags: ['AI/ML', 'Python'],
    links: {
      repo: 'https://github.com/sidoxsinu/SilentGuard',
    },
    image: '/assets/images/project-images/silentguard.webp',
    featured: false,
  },
  {
    id: 'project-ai-voice-assistant',
    title: 'AI Voice Assistant',
    description:
      'Python-based voice assistant with natural language command recognition, automated email dispatch, and to-do list management. Uses speech recognition and AI logic to enable hands-free productivity — process commands, manage tasks, and send emails entirely by voice.',
    year: '2024',
    tags: ['Python', 'Voice UI', 'Automation'],
    links: {
      repo: 'https://github.com/sidoxsinu/AI-Voice-Assistant',
    },
    image: '/assets/images/project-images/aivoiceassistant.webp',
    featured: false,
  },
];
