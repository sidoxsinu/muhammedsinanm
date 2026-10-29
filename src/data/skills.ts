import { SkillCategory } from '@/types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend & Mobile',
    skills: [
      { name: 'React', url: 'https://react.dev', category: 'frontend' },
      { name: 'Next.js', url: 'https://nextjs.org', category: 'frontend' },
      { name: 'iOS (Swift)', url: 'https://developer.apple.com/swift/', category: 'mobile' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com', category: 'frontend' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org', category: 'frontend' },
      {
        name: 'JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        category: 'frontend',
      },
      { name: 'GSAP', url: 'https://gsap.com', category: 'frontend' },
      { name: 'Three.js', url: 'https://threejs.org', category: 'frontend' },
      { name: 'Vite', url: 'https://vitejs.dev', category: 'frontend' },
      {
        name: 'HTML5 / CSS3',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
        category: 'frontend',
      },
    ],
  },
  {
    category: 'Backend & Databases',
    skills: [
      { name: 'Node.js', url: 'https://nodejs.org', category: 'backend' },
      { name: 'FastAPI', url: 'https://fastapi.tiangolo.com', category: 'backend' },
      { name: 'Python', url: 'https://www.python.org', category: 'backend' },
      { name: 'PostgreSQL', url: 'https://www.postgresql.org', category: 'database' },
      { name: 'Supabase', url: 'https://supabase.com', category: 'database' },
      { name: 'SQLite', url: 'https://www.sqlite.org', category: 'database' },
      { name: 'Firebase', url: 'https://firebase.google.com', category: 'database' },
      { name: 'MySQL', url: 'https://www.mysql.com', category: 'database' },
      { name: 'REST APIs', url: 'https://restfulapi.net', category: 'backend' },
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      { name: 'Groq API (LLaMA 3.3)', url: 'https://groq.com', category: 'ai' },
      { name: 'Whisper (Speech AI)', url: 'https://openai.com/research/whisper', category: 'ai' },
      { name: 'Ollama', url: 'https://ollama.com', category: 'ai' },
      {
        name: 'AI / ML',
        url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
        category: 'ai',
      },
      { name: 'Streamlit', url: 'https://streamlit.io', category: 'ai' },
      { name: 'Claude', url: 'https://anthropic.com', category: 'ai' },
      { name: 'Gemini', url: 'https://gemini.google.com', category: 'ai' },
      { name: 'Antigravity', url: 'https://deepmind.google', category: 'ai' },
    ],
  },
  {
    category: 'Tools & DevOps',
    skills: [
      { name: 'Docker', url: 'https://www.docker.com', category: 'devops' },
      { name: 'Git & GitHub', url: 'https://github.com/sidoxsinu', category: 'tools' },
      { name: 'Bitbucket', url: 'https://bitbucket.org', category: 'tools' },
      {
        name: 'Jira & Agile/Scrum',
        url: 'https://www.atlassian.com/software/jira',
        category: 'tools',
      },
      { name: 'Vercel', url: 'https://vercel.com', category: 'tools' },
      { name: 'VS Code', url: 'https://code.visualstudio.com', category: 'tools' },
      { name: 'Figma (UI/UX)', url: 'https://www.figma.com', category: 'design' },
    ],
  },
];
