'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function HeroSection() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth <= 768;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scramble typewriter function
    function scrambleType(
      el: HTMLElement,
      text: string,
      {
        charDelay = 80,
        scrambleFrames = 5,
        onComplete,
      }: { charDelay?: number; scrambleFrames?: number; onComplete?: () => void } = {},
    ) {
      if (prefersReducedMotion) {
        el.textContent = text;
        if (onComplete) onComplete();
        return undefined;
      }
      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let resolved = 0,
        frame = 0;
      el.textContent = '';
      const tick = setInterval(() => {
        frame++;
        const next =
          resolved < text.length && text[resolved] !== ' '
            ? CHARS[Math.floor(Math.random() * CHARS.length)]
            : resolved < text.length
              ? ' '
              : '';
        el.textContent = text.substring(0, resolved) + next;
        if (frame >= scrambleFrames) {
          frame = 0;
          if (resolved < text.length) resolved++;
        }
        if (resolved >= text.length) {
          clearInterval(tick);
          el.textContent = text;
          if (onComplete) onComplete();
        }
      }, charDelay / scrambleFrames);
      return tick;
    }

    gsap.set('.hero-title', { opacity: 1 });
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;

    let timer1: NodeJS.Timeout | undefined;
    let tick1: NodeJS.Timeout | undefined;
    let tick2: NodeJS.Timeout | undefined;

    if (line1 && line2) {
      timer1 = setTimeout(() => {
        line1.textContent = '';
        line2.textContent = '';
        line1.classList.add('typing-active');
        tick1 = scrambleType(line1, 'Muhammed', {
          charDelay: 90,
          scrambleFrames: 6,
          onComplete: () => {
            line1.classList.remove('typing-active');
            line2.classList.add('typing-active');
            tick2 = scrambleType(line2, 'Sinan M', {
              charDelay: 90,
              scrambleFrames: 6,
              onComplete: () => {
                line2.classList.remove('typing-active');
              },
            });
          },
        });
      }, 150);
    }

    // Hero entrance animations
    const heroPfpTween = gsap.from('.hero-pfp', { scale: 1.05, duration: 0.6, ease: 'power2.out' });
    const heroSocialsTween = gsap.from('.hero-socials a', {
      x: -10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
    });
    const heroRolesTween = gsap.from('.hero-roles p', {
      x: 10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
    });

    // Parallax Hero Image
    const pfpParallaxTween = isMobile
      ? gsap.to('.hero-pfp', {
          y: '10vh',
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-premium',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      : gsap.to('.hero-pfp', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-premium',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

    // Hero Text Parallax Depth
    const nameTween = gsap.to('.hero-name', {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-premium',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    const subtitleTween = gsap.to('.hero-subtitle', {
      opacity: 0,
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-premium',
        start: 'top top',
        end: '40% top',
        scrub: true,
      },
    });

    return () => {
      clearTimeout(timer1);
      if (tick1) clearInterval(tick1);
      if (tick2) clearInterval(tick2);
      heroPfpTween.kill();
      heroSocialsTween.kill();
      heroRolesTween.kill();
      pfpParallaxTween.kill();
      nameTween.kill();
      subtitleTween.kill();
    };
  }, []);

  return (
    <section className="hero-premium">
      {/* Professional Status Bar (No emojis, No glow, Max 2px radius) */}
      <div className="absolute top-20 z-10 flex justify-center sm:top-24">
        <div className="inline-flex items-center gap-2.5 rounded-[2px] border border-white/10 bg-[#161616] px-3.5 py-1.5 font-mono text-xs tracking-wider text-neutral-300 uppercase">
          <span className="h-1.5 w-1.5 bg-[var(--accent-orange)]" />
          <span>STATUS: OPEN TO REMOTE SDE INTERNSHIPS</span>
        </div>
      </div>

      <div className="hero-socials">
        <a
          className="social-icon"
          rel="me noopener noreferrer"
          target="_blank"
          href="https://github.com/sidoxsinu"
          aria-label="GitHub"
        >
          <svg
            className="feather feather-github"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
        <a
          className="social-icon"
          rel="me noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/sidoxsinu/"
          aria-label="LinkedIn"
        >
          <svg
            className="feather feather-linkedin"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect height="12" width="4" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          className="social-icon"
          rel="me noopener noreferrer"
          target="_blank"
          href="https://x.com/sidoxsinu"
          aria-label="Twitter"
        >
          <svg
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
        </a>
        <a
          className="social-icon"
          rel="me noopener noreferrer"
          target="_blank"
          href="https://www.instagram.com/sidoxsinu"
          aria-label="Instagram"
        >
          <svg
            className="feather feather-instagram"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>
      </div>

      <div className="hero-roles hero-subtitle">
        <p>Software Developer</p>
        <p>Full-Stack Engineer</p>
        <p>B.Tech CSE Undergraduate</p>
      </div>

      <div className="hero-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/profile-picture/bg-removed-black&white-pfp.webp"
          alt="Muhammed Sinan M - Full-Stack Developer and AI Enthusiast from Kerala, India"
          className="hero-pfp hero-portrait"
        />
        <h1 className="hero-title hero-name" aria-label="Muhammed Sinan M">
          <span className="scramble-line1" ref={line1Ref}>
            Muhammed
          </span>
          <br />
          <span className="scramble-line2" ref={line2Ref}>
            Sinan M
          </span>
        </h1>
      </div>
    </section>
  );
}
