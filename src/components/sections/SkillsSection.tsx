'use client';

import React from 'react';

interface SkillGroup {
  category: string;
  skills: string[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Languages & Core',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Swift', 'SQL', 'HTML5', 'CSS3', 'Bash'],
  },
  {
    category: 'Frontend & Mobile',
    skills: ['React', 'Next.js', 'iOS (Swift)', 'Tailwind CSS', 'Three.js'],
  },
  {
    category: 'Backend & Systems',
    skills: ['Node.js', 'FastAPI', 'PostgreSQL', 'Supabase', 'Docker', 'Linux', 'Git', 'Bitbucket'],
  },
  {
    category: 'AI & Engineering Tools',
    skills: [
      'Groq API (LLaMA 3.3, Whisper)',
      'Ollama',
      'Claude',
      'Gemini',
      'Antigravity',
      'Jira (Agile)',
      'Figma',
    ],
  },
];

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Technical Skills"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mb-10 space-y-3">
        <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
          {'// Core Capabilities'}
        </span>
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Technical Skills
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
          Languages, frameworks, and developer tools leveraged across full-stack production systems,
          iOS apps, and AI agents.
        </p>
      </div>

      {/* Streamlined, Compact Categories */}
      <div className="divide-y divide-neutral-800 border-y border-neutral-800">
        {SKILL_GROUPS.map((group) => (
          <div
            key={group.category}
            className="flex flex-col py-5 sm:flex-row sm:items-start sm:gap-8"
          >
            <div className="w-full shrink-0 pb-2 sm:w-48 sm:pb-0">
              <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
                {group.category}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-neutral-800 bg-[#161616] px-3.5 py-1 font-mono text-xs text-neutral-300 transition-colors hover:border-[var(--accent-orange)] hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
