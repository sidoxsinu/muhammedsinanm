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
      className={`inline-flex max-w-full scrollbar-none items-center gap-1 overflow-x-auto rounded-[2px] border border-neutral-800 bg-[#161616] p-1 ${className}`}
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
            className={`relative flex cursor-pointer items-center gap-2 rounded-[2px] px-3.5 py-1.5 font-mono text-xs tracking-wider whitespace-nowrap uppercase transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-[var(--accent-orange)] ${
              isActive
                ? 'bg-[var(--accent-orange)] font-semibold text-white'
                : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
            }`}
          >
            {tab.icon && <span className="h-3.5 w-3.5">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`py-0.2 rounded-[2px] px-1.5 font-mono text-[10px] ${
                  isActive ? 'bg-black/40 text-white' : 'bg-neutral-800 text-neutral-400'
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
