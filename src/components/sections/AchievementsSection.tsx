'use client';

import React from 'react';

export function AchievementsSection() {
  return (
    <section id="achievements" aria-label="Achievements of Muhammed Sinan M">
      <div className="section-inner">
        <div className="section-bg-scroll-circle">
          <div className="scroll-circle">
            <svg className="scroll-circle-svg" viewBox="0 0 100 100" width="120" height="120">
              <path
                id="circlePath-achievements"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
                stroke="none"
              />
              <text>
                <textPath
                  href="#circlePath-achievements"
                  startOffset="0%"
                  textLength="220"
                  lengthAdjust="spacingAndGlyphs"
                  fontSize="11"
                  fill="currentColor"
                  letterSpacing="3.4px"
                  style={{ fontFamily: 'var(--font-heading)', textTransform: 'uppercase' }}
                >
                  SCROLL • EXPLORE • SCROLL • EXPLORE •
                </textPath>
              </text>
            </svg>
            <div className="scroll-circle-icon scroll-circle-asterisk">
              <svg
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="36"
                height="36"
              >
                <line x1="12" y1="2" x2="12" y2="22" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
              </svg>
            </div>
          </div>
        </div>
        <span className="section-label">{'// Achievements'}</span>
        <h2 className="fade-in-up reveal-text">Achievements &amp; Recognition</h2>
        <div className="projects">
          <div className="card fade-in-up reveal-block">
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <h4
                style={{
                  margin: 0,
                  color: 'var(--text-primary)',
                  fontSize: '1.4rem',
                  fontWeight: 500,
                }}
              >
                Best Technical Project — Build with AI Hackathon 2026
              </h4>
            </div>
            <p
              className="reveal-block"
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '12px',
                fontWeight: 500,
              }}
            >
              Organized by Google for Developers / MuLearn NSSCE · Mar 2026
            </p>
            <p className="reveal-block" style={{ marginBottom: '16px' }}>
              Next Gen AI Assistant recognized for technical excellence and innovation among all
              competing teams.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                className="minimal-link"
                rel="me noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/posts/mulearn-nssce_engineering-excellence-at-its-best-congratulations-activity-7453323334664200192-6xAI"
              >
                MuLearn NSSCE (LinkedIn) ↗
              </a>
              <a
                className="minimal-link"
                rel="me noopener noreferrer"
                target="_blank"
                href="https://www.instagram.com/p/DXjRXeCk9Ry/"
              >
                Christ College of Engineering (Instagram) ↗
              </a>
            </div>
          </div>
          <div className="card fade-in-up reveal-block">
            <div className="card-header" style={{ marginBottom: '8px' }}>
              <h4
                style={{
                  margin: 0,
                  color: 'var(--text-primary)',
                  fontSize: '1.4rem',
                  fontWeight: 500,
                }}
              >
                WEBATHON 2025 — Second Prize
              </h4>
            </div>
            <p
              className="reveal-block"
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                marginBottom: '12px',
                fontWeight: 500,
              }}
            >
              Organized by CSI CCE · 2025
            </p>
            <p className="reveal-block" style={{ marginBottom: '16px' }}>
              Pylon — an all-in-one scholarship search platform — was recognized as Second Prize
              winner at WEBATHON 2025, competing against teams from across the college.
            </p>
            <a
              className="minimal-link"
              rel="me noopener noreferrer"
              target="_blank"
              href="https://github.com/sidoxsinu/Pylon"
            >
              View Project ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
