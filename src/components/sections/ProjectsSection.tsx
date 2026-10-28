'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const sectionInner = section.querySelector<HTMLElement>('.section-inner');
    if (!sectionInner) return;

    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cards = Array.from(container.children).filter((el): el is HTMLElement => el.matches('.card'));
    if (!cards.length) return;

    if (isMobile) {
      container.classList.remove('card-pile-container');
      container.classList.add('mobile-project-feed');

      if (prefersReducedMotion) {
        cards.forEach((card) => {
          card.classList.remove('fade-in-up', 'reveal-block');
          card.style.opacity = '1';
          card.style.transform = 'none';
        });
        return;
      }

      cards.forEach((card) => {
        card.classList.remove('fade-in-up', 'reveal-block', 'reveal-text');
        gsap.killTweensOf(card);
        gsap.set(card, { clearProps: 'all' });
        card.classList.add('mobile-project-card--hidden');
      });

      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('mobile-project-card--hidden');
              entry.target.classList.add('mobile-project-card--visible');
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      cards.forEach((card) => observer.observe(card));

      return () => {
        observer.disconnect();
      };
    }

    // DESKTOP: GSAP Scroll-Pinned Card Pile
    container.classList.add('card-pile-container');
    const ROTS = [0, -4, 3.5, -6, 5, -2.5, 4.5, -3, 6, -1, 3, -5];
    const vh = window.innerHeight;
    const scrollPerCard = 0.7;
    const pinDistance = cards.length * vh * scrollPerCard;

    const mainTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 0px',
      end: `+=${pinDistance}`,
      pin: sectionInner,
      pinSpacing: true,
    });

    const cardTriggers: ScrollTrigger[] = [];

    cards.forEach((card, i) => {
      gsap.killTweensOf(card);
      card.classList.remove('fade-in-up', 'reveal-block', 'reveal-text', 'fly-left', 'fly-right');

      const startScale = 0.9;
      const targetScale = 1;
      const yStep = 15;
      const startY = -160;

      gsap.set(card, { clearProps: 'transform,opacity,filter' });
      gsap.set(card, { y: startY, opacity: 0, scale: startScale, rotation: 0, zIndex: i + 1 });
      card.style.removeProperty('--card-index');

      const dropOffset = (i + 0.3) * (vh * scrollPerCard);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: () => `top ${0 - dropOffset}px`,
        onEnter() {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: i * yStep,
            opacity: 1,
            scale: targetScale,
            rotation: ROTS[i % ROTS.length],
            duration: 0.8,
            ease: 'back.out(1.2)',
          });
        },
        onLeaveBack() {
          gsap.killTweensOf(card);
          gsap.to(card, {
            y: startY,
            opacity: 0,
            scale: startScale,
            rotation: 0,
            duration: 0.4,
            ease: 'power3.in',
          });
        },
      });

      cardTriggers.push(trigger);
    });

    return () => {
      mainTrigger.kill();
      cardTriggers.forEach((t) => t.kill());
      cards.forEach((card) => {
        gsap.killTweensOf(card);
        gsap.set(card, { clearProps: 'all' });
      });
    };
  }, []);

  return (
    <section id="projects" aria-label="Projects by Muhammed Sinan M" ref={sectionRef}>
      <div className="section-inner">
        <div className="section-bg-scroll-circle">
          <div className="scroll-circle">
            <svg className="scroll-circle-svg" viewBox="0 0 100 100" width="120" height="120">
              <path
                id="circlePath-projects"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
                stroke="none"
              />
              <text>
                <textPath
                  href="#circlePath-projects"
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
        <span className="section-label">{'// Projects'}</span>
        <h2 className="fade-in-up reveal-text">Projects</h2>

        <div className="projects" ref={containerRef}>
          {/* 1. AvenWing */}
          <div className="card fade-in-up split-card reveal-block" id="project-avenwing">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>AvenWing</h4>
              </div>
              <p className="reveal-block">
                Premium e-commerce website for a handcrafted kinetic wooden sculpture brand. Built a complete product
                showcase with an interactive gallery, direct call &amp; WhatsApp checkout, and smooth GSAP scroll animations
                — delivered as a live freelance production site.
              </p>
              <div className="tags">
                <span
                  className="tag"
                  style={{
                    background: 'rgba(232, 86, 42, 0.15)',
                    border: '1px solid var(--accent-red)',
                    color: 'var(--accent-red)',
                  }}
                >
                  Freelance
                </span>
                <span className="tag">HTML/CSS</span>
                <span className="tag">JavaScript</span>
                <span className="tag">GSAP</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <a className="card-link" href="https://avenwing.com" rel="noopener noreferrer" style={{ margin: 0 }} target="_blank">
                  Live Website ↗
                </a>
              </div>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="images/project-images/AvenWing.webp" alt="AvenWing Preview" className="project-preview-img" />
            </div>
          </div>

          {/* 2. Parackal Travels Hub */}
          <div className="card fade-in-up split-card reveal-block" id="project-parackal">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>Parackal Travels Hub</h4>
              </div>
              <p className="reveal-block">
                Full-stack travel booking platform for a real travel agency, featuring a custom inquiry and booking
                flow, bilingual (English/Arabic) content, and a GSAP-animated responsive interface — live and serving clients
                at parackaltravelhub.com.
              </p>
              <div className="tags">
                <span
                  className="tag"
                  style={{
                    background: 'rgba(232, 86, 42, 0.15)',
                    border: '1px solid var(--accent-red)',
                    color: 'var(--accent-red)',
                  }}
                >
                  Freelance
                </span>
                <span className="tag">HTML/CSS</span>
                <span className="tag">JavaScript</span>
                <span className="tag">GSAP</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <a
                  className="card-link"
                  href="https://parackaltravelhub.com"
                  rel="noopener noreferrer"
                  style={{ margin: 0 }}
                  target="_blank"
                >
                  Live Website ↗
                </a>
              </div>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src="images/project-images/Parackal-Travel-Hub.webp"
                alt="Parackal Travels Hub Preview"
                className="project-preview-img"
              />
            </div>
          </div>

          {/* 3. Next Gen AI Assistant */}
          <div className="card fade-in-up split-card reveal-block" id="project-ai-assistant">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>Next Gen AI Assistant</h4>
              </div>
              <p className="reveal-block">
                Award-winning multi-modal AI assistant built for the Build with AI Hackathon 2026. Integrates Groq&apos;s
                Llama 3.3 for ultra-fast inference, real-time voice interaction, and context-aware responses. Won Best Technical
                Project at MuLearn NSSCE — recognized for technical excellence and innovation.
              </p>
              <div className="tags">
                <span className="tag">AI</span>
                <span className="tag">Groq API</span>
                <span className="tag">Llama 3.3</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <a
                  className="card-link"
                  href="https://next-gen-ai-assistant-system.vercel.app"
                  rel="noopener noreferrer"
                  style={{ margin: 0 }}
                  target="_blank"
                >
                  Live Demo ↗
                </a>
                <a
                  className="card-link"
                  rel="me noopener noreferrer"
                  target="_blank"
                  href="https://github.com/sidoxsinu/next-gen-ai-assistant-system"
                  style={{ margin: 0 }}
                >
                  View Repository ↗
                </a>
              </div>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src="images/project-images/Next-Gen-Ai-Assistant.webp"
                alt="Next Gen AI Assistant Preview"
                className="project-preview-img"
              />
            </div>
          </div>

          {/* 4. Pylon */}
          <div className="card fade-in-up split-card reveal-block" id="project-pylon">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>Pylon</h4>
              </div>
              <p className="reveal-block">
                Scholarship discovery platform that lets students filter and find relevant scholarships instantly.
                Built a custom multi-criteria search algorithm with real-time filtering, smooth animations, and a fully
                responsive UI — all in pure HTML, CSS, and JavaScript with zero dependencies.
              </p>
              <div className="tags">
                <span className="tag">HTML/CSS</span>
                <span className="tag">JavaScript</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <a
                  className="card-link"
                  href="https://pylon-topaz.vercel.app"
                  rel="noopener noreferrer"
                  style={{ margin: 0 }}
                  target="_blank"
                >
                  Live Demo ↗
                </a>
                <a
                  className="card-link"
                  rel="me noopener noreferrer"
                  target="_blank"
                  href="https://github.com/sidoxsinu/Pylon"
                  style={{ margin: 0 }}
                >
                  View Repository ↗
                </a>
              </div>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" src="images/project-images/Pylon.webp" alt="Pylon Preview" className="project-preview-img" />
            </div>
          </div>

          {/* 5. UniversityHub */}
          <div className="card fade-in-up split-card reveal-block">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>UniversityHub</h4>
              </div>
              <p className="reveal-block">
                Centralized student platform for Christ College of Engineering, consolidating academic resources,
                timetables, notices, and tools into a single interface. Built on Python Django with a fully configured
                admin panel for content management.
              </p>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">Django</span>
              </div>
              <a
                className="card-link"
                rel="me noopener noreferrer"
                target="_blank"
                href="https://github.com/sidoxsinu/universityhub"
                style={{ marginTop: '16px' }}
              >
                View Repository ↗
              </a>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src="images/project-images/UniversityHub.webp"
                alt="UniversityHub Preview"
                className="project-preview-img"
              />
            </div>
          </div>

          {/* 6. CodeBurry */}
          <div className="card fade-in-up split-card reveal-block" id="project-codeburry">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>CodeBurry</h4>
              </div>
              <p className="reveal-block">
                Gamified frontend development learning platform with interactive coding challenges, real-time progress
                tracking, and a community feed. Designed to make learning to code engaging through bite-sized missions and an
                XP-based reward system.
              </p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">TypeScript</span>
                <span className="tag">TailwindCSS</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
                <a
                  className="card-link"
                  href="https://code-burry.vercel.app"
                  rel="noopener noreferrer"
                  style={{ margin: 0 }}
                  target="_blank"
                >
                  Live Demo ↗
                </a>
                <a
                  className="card-link"
                  rel="me noopener noreferrer"
                  target="_blank"
                  href="https://github.com/sidoxsinu/CodeBurry"
                  style={{ margin: 0 }}
                >
                  View Repository ↗
                </a>
              </div>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src="images/project-images/CodeBurry.webp"
                alt="CodeBurry Preview"
                className="project-preview-img"
              />
            </div>
          </div>

          {/* 7. SilentGuard */}
          <div className="card fade-in-up split-card reveal-block">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>SilentGuard</h4>
              </div>
              <p className="reveal-block">
                AI-based anomaly detection system designed to monitor logs and system behavior patterns, surface
                irregular activity, and trigger preventive alerts before failures occur. Built in Python using ML-based
                pattern analysis to reduce unexpected system downtime.
              </p>
              <div className="tags">
                <span className="tag">AI/ML</span>
                <span className="tag">Python</span>
              </div>
              <a
                className="card-link"
                rel="me noopener noreferrer"
                target="_blank"
                href="https://github.com/sidoxsinu/SilentGuard"
                style={{ marginTop: '16px' }}
              >
                View Repository ↗
              </a>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src="images/project-images/SilentGuard.webp"
                alt="SilentGuard Preview"
                className="project-preview-img"
              />
            </div>
          </div>

          {/* 8. AI Voice Assistant */}
          <div className="card fade-in-up split-card reveal-block">
            <div className="split-card-content">
              <span className="sr-only" aria-hidden="false">
                Project by Muhammed Sinan M (sidoxsinu)
              </span>
              <div className="card-header">
                <h4>AI Voice Assistant</h4>
              </div>
              <p className="reveal-block">
                Python-based voice assistant with natural language command recognition, automated email dispatch, and
                to-do list management. Uses speech recognition and AI logic to enable hands-free productivity — process
                commands, manage tasks, and send emails entirely by voice.
              </p>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">Voice UI</span>
                <span className="tag">Automation</span>
              </div>
              <a
                className="card-link"
                rel="me noopener noreferrer"
                target="_blank"
                href="https://github.com/sidoxsinu/AI-Voice-Assistant"
                style={{ marginTop: '16px' }}
              >
                View Repository ↗
              </a>
            </div>
            <div className="split-card-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                loading="lazy"
                src="images/project-images/AIVoiceAssistant.webp"
                alt="AI Voice Assistant Preview"
                className="project-preview-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
