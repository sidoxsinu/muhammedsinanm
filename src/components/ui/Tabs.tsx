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
      className={`inline-flex w-max min-w-full items-center gap-1.5 rounded-full border border-neutral-800 bg-[#161616]/95 p-1.5 backdrop-blur-md ${className}`}
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
            className={`relative flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-mono text-xs tracking-wider whitespace-nowrap uppercase transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-orange)] ${
              isActive
                ? 'bg-[var(--accent-orange)] font-semibold text-white shadow-sm'
                : 'text-neutral-400 hover:bg-neutral-800/80 hover:text-white'
            }`}
          >
            {tab.icon && <span className="h-3.5 w-3.5 shrink-0">{tab.icon}</span>}
            <span className="shrink-0">{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`shrink-0 rounded-full px-1.5 py-0.5 font-mono text-[10px] font-medium ${
                  isActive ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-400'
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
