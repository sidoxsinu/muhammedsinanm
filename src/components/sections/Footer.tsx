'use client';

import React from 'react';
import Link from 'next/link';

export function Footer() {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col footer-col-left">
          <h3
            className="reveal-text"
            style={{
              color: '#f0f0f0',
              marginBottom: '12px',
              fontSize: '24px',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
          >
            Muhammed Sinan M<span style={{ color: 'var(--accent-orange)' }}>.</span>
          </h3>
          <p
            className="reveal-block"
            style={{
              color: 'rgba(240,240,240,0.7)',
              fontSize: '14px',
              marginBottom: '25px',
              maxWidth: '350px',
              lineHeight: 1.6,
            }}
          >
            Building the future, one line at a time.
          </p>
          <div style={{ color: 'rgba(240,240,240,0.8)', fontSize: '14px', lineHeight: 1.8 }}>
            <div
              className="footer-contact-item"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}
            >
              <svg
                className="feather feather-mail"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'var(--accent-orange)', flexShrink: 0, marginTop: '1px' }}
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a
                href="mailto:muhammedsinan.m67@gmail.com"
                className="transition-colors hover:text-white"
                style={{ color: 'rgba(240,240,240,0.8)', textDecoration: 'none' }}
              >
                muhammedsinan.m67@gmail.com
              </a>
            </div>
            <div
              className="footer-contact-item"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}
            >
              <svg
                className="feather feather-map-pin"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'var(--accent-orange)', flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>
                <span>Valanchery</span>, <span>Kerala</span>, <span>India</span>
              </span>
            </div>
            <div
              className="footer-contact-item"
              style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
            >
              <svg
                className="feather feather-phone"
                fill="none"
                height="16"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'var(--accent-orange)', flexShrink: 0 }}
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <a
                href="tel:+918590568566"
                className="transition-colors hover:text-white"
                style={{ color: 'rgba(240,240,240,0.8)', textDecoration: 'none' }}
              >
                +91 85905 68566
              </a>
            </div>
          </div>
        </div>
        <div className="footer-nav-grid grid w-full grid-cols-2 gap-6 sm:contents">
          <div className="footer-col">
            <h4
              style={{
                color: '#f0f0f0',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link
                href="/"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Projects
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                About &amp; Journey
              </Link>
              <Link
                href="/credentials"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Credentials &amp; Awards
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="footer-col">
            <h4
              style={{
                color: '#f0f0f0',
                marginBottom: '20px',
                fontSize: '18px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              Social &amp; More
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                rel="me noopener noreferrer"
                target="_blank"
                href="https://github.com/sidoxsinu"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                GitHub
              </a>
              <a
                rel="me noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/sidoxsinu/"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                LinkedIn
              </a>
              <a
                rel="me noopener noreferrer"
                target="_blank"
                href="https://x.com/sidoxsinu"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                X (Twitter)
              </a>
              <a
                rel="me noopener noreferrer"
                target="_blank"
                href="https://www.instagram.com/sidoxsinu"
                className="transition-colors hover:text-white"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
              >
                Instagram
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://buymeacoffee.com/sidoxsinu"
                style={{
                  color: 'rgba(240,240,240,0.8)',
                  textDecoration: 'none',
                  fontSize: '14px',
                }}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <span>Buy Me a Coffee</span>
                <svg
                  className="h-3.5 w-3.5 text-[var(--accent-orange)]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="2" x2="6" y2="4" />
                  <line x1="10" y1="2" x2="10" y2="4" />
                  <line x1="14" y1="2" x2="14" y2="4" />
                </svg>
              </a>
              <button
                type="button"
                aria-label="Print Portfolio"
                onClick={handlePrint}
                className="footer-print-btn inline-flex items-center gap-1.5 transition-colors hover:text-white"
                style={{
                  color: 'var(--accent-orange)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 600,
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  textAlign: 'left',
                  cursor: 'pointer',
                }}
                title="Print Portfolio"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 6 2 18 2 18 9" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="8" />
                </svg>
                <span>Print Portfolio</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="copyright-pulse">© 2026 Muhammed Sinan M</span> · All Rights Reserved
      </div>
    </footer>
  );
}
