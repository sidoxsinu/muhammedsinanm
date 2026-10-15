import { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', url: 'https://react.dev', category: 'frontend' },
      { name: 'HTML', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', category: 'frontend' },
      { name: 'GSAP', url: 'https://gsap.com', category: 'frontend' },
      { name: 'CSS', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', category: 'frontend' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 'frontend' },
      { name: 'TailwindCSS', url: 'https://tailwindcss.com', category: 'frontend' },
    ],
  },
  {
    category: 'Backend & Languages',
    skills: [
      { name: 'JSON DB', url: 'https://en.wikipedia.org/wiki/JSON', category: 'backend' },
      { name: 'Node.js', url: 'https://nodejs.org', category: 'backend' },
      { name: 'Password Hashing', url: 'https://en.wikipedia.org/wiki/Cryptographic_hash_function', category: 'backend' },
      { name: 'MongoDB', url: 'https://www.mongodb.com', category: 'backend' },
      { name: 'Python', url: 'https://www.python.org', category: 'backend' },
      { name: 'Express.js', url: 'https://expressjs.org', category: 'backend' },
    ],
  },
  {
    category: 'AI & Engineering',
    skills: [
      { name: 'Postman', url: 'https://www.postman.com', category: 'engineering' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org', category: 'engineering' },
      { name: 'Docker', url: 'https://www.docker.com', category: 'engineering' },
      { name: 'SQL', url: 'https://en.wikipedia.org/wiki/SQL', category: 'engineering' },
      { name: 'System Design', url: 'https://en.wikipedia.org/wiki/Systems_design', category: 'engineering' },
      { name: 'AI / ML', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence', category: 'ai' },
    ],
  },
  {
    category: 'Design & Tools',
    skills: [
      { name: 'Figma', url: 'https://www.figma.com', category: 'design' },
      { name: 'UI/UX Design', url: 'https://en.wikipedia.org/wiki/User_interface_design', category: 'design' },
      { name: 'VS Code', url: 'https://code.visualstudio.com', category: 'tools' },
      { name: 'Canva', url: 'https://www.canva.com', category: 'design' },
      { name: 'GitHub', url: 'https://github.com', category: 'tools' },
      { name: 'Git', url: 'https://git-scm.com', category: 'tools' },
    ],
  },
];
