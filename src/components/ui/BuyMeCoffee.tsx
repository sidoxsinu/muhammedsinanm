'use client';

import React, { useState, useSyncExternalStore } from 'react';

import { BUY_ME_A_COFFEE_URL } from '@/data/socials';

const subscribeStorage = (callback: () => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getSnapshot = () => {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem('bmc_floating_dismissed') === 'true';
  } catch {
    return false;
  }
};

const getServerSnapshot = () => false;

export function CoffeeIcon({ className = 'h-4 w-4', ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

interface BuyMeCoffeeProps {
  variant?: 'floating' | 'pill' | 'button';
  className?: string;
  url?: string;
}

export function BuyMeCoffee({
  variant = 'floating',
  className = '',
  url = BUY_ME_A_COFFEE_URL,
}: BuyMeCoffeeProps) {
  const isStorageDismissed = useSyncExternalStore(subscribeStorage, getSnapshot, getServerSnapshot);
  const [localDismissed, setLocalDismissed] = useState(false);

  const dismissed = isStorageDismissed || localDismissed;

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDismissed(true);
    try {
      sessionStorage.setItem('bmc_floating_dismissed', 'true');
    } catch {
      // Ignore storage errors in restricted contexts
    }
  };

  if (variant === 'pill') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`social-pill bmc-pill ${className}`}
        aria-label="Buy Me a Coffee"
      >
        <CoffeeIcon className="feather feather-coffee h-4 w-4" />
        <span>Buy Me a Coffee</span>
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161616] px-4 py-2 text-xs font-medium text-neutral-200 transition-all duration-300 hover:border-[#E8562A]/60 hover:bg-[#202020] hover:text-white ${className}`}
        aria-label="Buy Me a Coffee"
      >
        <CoffeeIcon className="h-4 w-4 text-[var(--accent-orange)] transition-transform duration-300 group-hover:scale-110" />
        <span>Buy Me a Coffee</span>
        <span className="text-[10px] text-neutral-500 transition-colors group-hover:text-[var(--accent-orange)]">
          ↗
        </span>
      </a>
    );
  }

  // Floating variant
  if (dismissed) return null;

  return (
    <aside
      aria-label="Support Muhammed Sinan M"
      className={`fixed bottom-6 left-6 z-40 print:hidden ${className}`}
    >
      <div className="group relative flex items-center">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Buy Muhammed Sinan M a coffee on BuyMeACoffee"
          className="flex items-center gap-2.5 rounded-full border border-white/10 bg-[#141414]/90 py-2 pr-3.5 pl-2.5 text-xs font-medium text-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8562A]/60 hover:bg-[#1a1a1a] hover:text-white hover:shadow-[0_15px_35px_rgba(232,86,42,0.15)] sm:py-2.5 sm:pr-4 sm:pl-3 sm:text-sm"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-orange)]/15 text-[var(--accent-orange)] transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--accent-orange)] group-hover:text-white">
            <CoffeeIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="font-medium tracking-tight">
            <span className="hidden sm:inline">Buy me a coffee</span>
            <span className="sm:hidden">Coffee</span>
          </span>
          <span
            className="text-[10px] text-neutral-500 transition-colors group-hover:text-[var(--accent-orange)]"
            aria-hidden="true"
          >
            ↗
          </span>
        </a>

        {/* Subtle Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss Buy Me a Coffee button"
          className="ml-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-transparent text-neutral-500 opacity-60 transition-all duration-200 hover:border-white/10 hover:bg-white/10 hover:text-neutral-300 hover:opacity-100 focus:outline-none"
        >
          <svg
            className="h-3 w-3"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
