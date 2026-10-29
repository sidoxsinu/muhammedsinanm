'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/sections/Footer';

const RESCUE_ROUTES = [
  {
    index: '01',
    title: 'Return to Home',
    desc: 'Head back to the main interactive portfolio and hero experience.',
    href: '/',
    action: 'Home Base',
  },
  {
    index: '02',
    title: 'Explore Projects',
    desc: 'Browse 10+ production platforms, voice AI agents, and client systems.',
    href: '/projects',
    action: 'Works Catalog',
  },
  {
    index: '03',
    title: 'About & Career Journey',
    desc: 'Read engineering background, software internship, and trajectory.',
    href: '/about',
    action: 'Full Bio',
  },
  {
    index: '04',
    title: 'Direct Contact',
    desc: 'Have a project or opportunity in mind? Initiate direct conversation.',
    href: '/contact',
    action: "Let's Talk!",
  },
];

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'QUERY: fetch_route(window.location.pathname)...',
    'FAIL: [HTTP 404] Resource not located in edge network cache.',
    'DIAGNOSTIC: Sector coordinates unreachable or deprecated.',
    'RECOMMENDATION: Select safe coordinate recovery route below.',
  ]);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // GSAP entrance choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.nf-badge',
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.1 },
      );
      gsap.fromTo(
        '.nf-glitch-num',
        { opacity: 0, scale: 0.85, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.7, ease: 'back.out(1.4)', delay: 0.2 },
      );
      gsap.fromTo(
        '.nf-heading',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 },
      );
      gsap.fromTo(
        '.nf-desc',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', delay: 0.45 },
      );
      gsap.fromTo(
        '.nf-terminal',
        { opacity: 0, y: 25, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.55 },
      );
      gsap.fromTo(
        '.nf-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 0.7 },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const runDiagnostics = () => {
    if (isDiagnosing) return;
    setIsDiagnosing(true);
    setTerminalLogs((prev) => [...prev, '> RUNNING LIVE EDGE DIAGNOSTICS...']);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '> Pinging edge nodes [172.17.104.113]... 200 OK (0.24ms)',
      ]);
    }, 400);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '> Scanning DNS tables for Muhammed Sinan M platform... ALL SYSTEMS NOMINAL.',
      ]);
    }, 800);

    setTimeout(() => {
      setTerminalLogs((prev) => [
        ...prev,
        '> RECOVERY COMPLETE: Please navigate to any of the 4 verified routes.',
      ]);
      setIsDiagnosing(false);
    }, 1200);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[var(--bg-color)] text-[var(--text-primary)] flex flex-col justify-between selection:bg-[var(--accent-orange)] selection:text-white"
    >
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-4 pt-36 pb-20 sm:px-6 sm:pt-44">
        {/* Top Radar & Error Status Pill */}
        <div className="nf-badge mb-4 inline-flex items-center gap-2.5 rounded-full border border-[var(--accent-orange)]/40 bg-[var(--accent-orange)]/10 px-4 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-orange)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-orange)]" />
          </span>
          <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
            {'// ERROR: SECTOR_404_UNREACHABLE'}
          </span>
        </div>

        {/* Large Stylized 404 & Glow */}
        <div className="relative my-2 select-none text-center">
          <span
            className="nf-glitch-num block font-mono text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700 sm:text-9xl md:text-[11rem] leading-none"
            style={{
              textShadow: '0 0 60px rgba(229, 77, 46, 0.25)',
            }}
          >
            404
          </span>
          <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgba(229,77,46,0.15)_0%,transparent_70%)] blur-2xl" />
        </div>

        {/* Branded Heading required by tests */}
        <h1 className="nf-heading text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
          Page Not Found
        </h1>

        <p className="nf-desc mt-3.5 max-w-lg text-center text-sm leading-relaxed text-neutral-400 sm:text-base">
          The coordinate you requested does not exist or has been shifted in our production
          architecture. We&apos;ve initiated automatic telemetry below.
        </p>

        {/* Interactive System Diagnostic Console */}
        <div
          ref={terminalRef}
          className="nf-terminal mt-10 w-full overflow-hidden rounded-2xl border border-neutral-800 bg-[#161616]/90 shadow-2xl backdrop-blur-md"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-neutral-800 bg-[#141414] px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-xs text-neutral-500">
                terminal — diagnostics@muhammedsinan.in
              </span>
            </div>

            <button
              type="button"
              onClick={runDiagnostics}
              disabled={isDiagnosing}
              className="group flex cursor-pointer items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 font-mono text-[11px] font-medium text-neutral-300 transition-colors hover:border-[var(--accent-orange)] hover:text-white disabled:opacity-50"
            >
              <span className={isDiagnosing ? 'animate-spin' : ''}>⚙</span>
              <span>{isDiagnosing ? 'Diagnosing...' : 'Run Diagnostics'}</span>
            </button>
          </div>

          {/* Terminal Output Body */}
          <div className="space-y-1.5 p-4 font-mono text-xs sm:p-5">
            {terminalLogs.map((log, idx) => (
              <p
                key={idx}
                className={
                  log.includes('FAIL')
                    ? 'text-red-400'
                    : log.includes('COMPLETE') || log.includes('NOMINAL')
                      ? 'text-emerald-400'
                      : log.includes('RUNNING')
                        ? 'text-[var(--accent-orange)]'
                        : 'text-neutral-400'
                }
              >
                {log}
              </p>
            ))}
            <div className="flex items-center gap-1.5 pt-1 text-white">
              <span className="text-[var(--accent-orange)]">❯</span>
              <span className="inline-block h-3.5 w-2 animate-pulse bg-[var(--accent-orange)]" />
            </div>
          </div>
        </div>

        {/* Safe Recovery Destination Cards */}
        <div className="mt-12 w-full space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent-orange)] uppercase">
              {'// Suggested Recovery Routes'}
            </span>
            <span className="font-mono text-xs text-neutral-500">
              Select any destination to redirect
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {RESCUE_ROUTES.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="nf-card group flex flex-col justify-between rounded-2xl border border-neutral-800 bg-[#161616] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-orange)]/60 hover:shadow-xl sm:p-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-neutral-500 transition-colors group-hover:text-[var(--accent-orange)]">
                      {route.index}
                    </span>
                    <span className="rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 font-mono text-[10px] text-neutral-400 transition-colors group-hover:border-[var(--accent-orange)]/40 group-hover:text-[var(--accent-orange)]">
                      {route.action}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white transition-colors group-hover:text-[var(--accent-orange)] sm:text-lg">
                    {route.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-neutral-400 sm:text-sm">
                    {route.desc}
                  </p>
                </div>

                <div className="flex items-center gap-1 pt-4 font-mono text-xs font-semibold text-[var(--accent-orange)]">
                  <span>Proceed to route</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Return to Base CTA button (guarantees a[href="/"] for tests) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-orange)] bg-[var(--accent-orange)] px-6 py-3 font-mono text-xs font-semibold text-white uppercase transition-colors hover:bg-[#d94e24]"
          >
            <span>← Return Home</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-[#161616] px-6 py-3 font-mono text-xs font-semibold text-neutral-300 uppercase transition-colors hover:border-neutral-500 hover:text-white"
          >
            <span>Explore Projects →</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
