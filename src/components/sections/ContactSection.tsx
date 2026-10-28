'use client';

import React from 'react';

export function ContactSection() {
  return (
    <section className="cta-section" id="contact-cta">
      <div className="cta-content">
        <h2 className="cta-heading fade-in-up reveal-text">HAVE A PROJECT IN MIND?</h2>
        <p className="cta-desc fade-in-up reveal-block">
          Together, we can create something clear and impactful. Let&apos;s collaborate to bring our
          ideas to life in a way that resonates with everyone.
        </p>
        <a
          href="https://contact.muhammedsinan.in"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-btn magnetic-btn fade-in-up reveal-block"
        >
          <span>Let&apos;s Talk! ↗</span>
        </a>
      </div>
      <div className="cta-social-pills fade-in-up reveal-block">
        <a href="#about" className="social-pill profile-pill">
          <img
            src="/images/profile-picture/bg-removed-black&white-pfp.webp"
            fetchPriority="high"
            alt="Muhammed Sinan M - Computer Science Student"
          />
          <span>Muhammed Sinan M</span>
        </a>
        <a
          rel="me noopener noreferrer"
          target="_blank"
          href="https://github.com/sidoxsinu"
          className="social-pill"
        >
          <svg
            className="feather feather-github"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          <span>GitHub</span>
        </a>
        <a
          rel="me noopener noreferrer"
          target="_blank"
          href="https://www.linkedin.com/in/sidoxsinu/"
          className="social-pill"
        >
          <svg
            className="feather feather-linkedin"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect height="12" width="4" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
          <span>LinkedIn</span>
        </a>
        <a
          rel="me noopener noreferrer"
          target="_blank"
          href="https://www.instagram.com/sidoxsinu"
          className="social-pill"
        >
          <svg
            className="feather feather-instagram"
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
          <span>Instagram</span>
        </a>
        <a
          rel="me noopener noreferrer"
          target="_blank"
          href="https://x.com/sidoxsinu"
          className="social-pill"
        >
          <svg
            fill="none"
            height="16"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
          <span>Twitter</span>
        </a>
      </div>
    </section>
  );
}
