'use client';

import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className = '' }: TabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Navigation Tabs"
      className={`inline-flex max-w-full scrollbar-none items-center gap-1.5 overflow-x-auto rounded-full border border-white/[0.08] bg-white/[0.04] p-1.5 backdrop-blur-md ${className}`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-xs font-medium whitespace-nowrap transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-orange)] sm:text-sm ${
              isActive
                ? 'bg-[var(--accent-orange)] font-semibold text-white shadow-[var(--accent-orange)]/25 shadow-lg'
                : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
            }`}
          >
            {tab.icon && <span className="h-4 w-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] ${
                  isActive ? 'bg-black/30 text-white' : 'bg-white/10 text-neutral-400'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
