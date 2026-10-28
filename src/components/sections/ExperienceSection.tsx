'use client';

import React from 'react';

export function ExperienceSection() {
  return (
    <section className="bg-light" id="experience">
      <div className="section-inner">
        <div className="section-bg-scroll-circle">
          <div className="scroll-circle">
            <svg className="scroll-circle-svg" viewBox="0 0 100 100" width="120" height="120">
              <path
                id="circlePath-experience"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
                stroke="none"
              />
              <text>
                <textPath
                  href="#circlePath-experience"
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
        <span className="section-label">{'// Experience'}</span>
        <h2 className="fade-in-up reveal-text">Experience &amp; Internship</h2>
        <div className="projects">
          {/* Torcue Digital */}
          <div className="card fade-in-up reveal-block exp-card-layout">
            <div className="exp-card-text">
              <div className="card-header">
                <h4>Software Engineering Intern</h4>
                <span
                  className="badge"
                  style={{ color: 'var(--accent-red)', fontWeight: 500, fontSize: '14px' }}
                >
                  Current
                </span>
              </div>
              <p
                className="reveal-block"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                Torcue Digital Inc. (Toric Software Labs Pvt. Ltd.)
              </p>
              <p
                className="reveal-block"
                style={{
                  color: 'var(--accent-red)',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '12px',
                }}
              >
                Jun 2026 – Present
              </p>
              <p className="reveal-block">
                Building and shipping features across full-stack web applications in a professional
                product engineering team. Working with JavaScript, React, and Node.js on
                client-facing software at Torcue Digital&apos;s engineering office at Infopark Phase
                II, Kochi — contributing to product design, UI implementation, and backend
                integration in a collaborative, deadline-driven environment.
              </p>
              <p
                className="reveal-block"
                style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}
              >
                <strong>Location:</strong> Transasia Cyberpark, Infopark Phase II, Kochi, Kerala
              </p>
              <a
                className="btn"
                href="https://www.torcue.com"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', textAlign: 'center' }}
                target="_blank"
              >
                <span>Visit Company ↗</span>
              </a>
            </div>
          </div>

          {/* Suvidha Foundation */}
          <div className="card fade-in-up reveal-block exp-card-layout">
            <div className="exp-card-text">
              <div className="card-header">
                <h4>Research Intern</h4>
                <span className="badge">Internship</span>
              </div>
              <p
                className="reveal-block"
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                Suvidha Foundation (Suvidha Mahila Mandal)
              </p>
              <p
                className="reveal-block"
                style={{
                  color: 'var(--accent-red)',
                  fontSize: '14px',
                  fontWeight: 500,
                  marginBottom: '12px',
                }}
              >
                25 Mar 2026 – 25 Apr 2026
              </p>
              <p className="reveal-block">
                Completed a one-month research internship at Suvidha Foundation in collaboration
                with Code Karo Yaaro. Worked on AI and development-related research workflows,
                prepared technical documentation, and contributed to study resources. Recognized for
                punctuality and demonstrated inquisitiveness throughout the programme.
              </p>
              <a
                className="btn"
                href="https://suvidhafoundationedutech.org/verify"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', textAlign: 'center' }}
                target="_blank"
              >
                <span>Verify Certificate</span>
              </a>
            </div>
            <div className="exp-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                alt="Internship Certificate"
                src="/images/certificates/WhatsApp Image 2026-04-25 at 17.55.23.webp"
                style={{
                  width: '100%',
                  height: '160px',
                  objectFit: 'contain',
                  background: 'var(--light-gray)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-gray)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
