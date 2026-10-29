'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { ContributionDay, GITHUB_FALLBACK_DATA, GitHubData } from '@/data/github';

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: '#1b1b1b', // Matte dark neutral
  1: '#54200a', // Deep rust orange
  2: '#9a3412', // Terracotta orange
  3: 'var(--accent-orange)', // Signature brand orange (#ea580c)
  4: '#fb923c', // Bright vibrant orange
};

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

export function GitHubSection() {
  const [data, setData] = useState<GitHubData>(GITHUB_FALLBACK_DATA);
  const [activeDay, setActiveDay] = useState<ContributionDay | null>(null);

  // Fetch live GitHub contributions on client with graceful fallback
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    fetch(`https://github-contributions-api.jogruber.de/v4/sidoxsinu?y=last`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then((live) => {
        if (!isMounted || !live?.contributions?.length) return;

        // Calculate streaks from live contributions
        const days: ContributionDay[] = live.contributions;
        let currentStreak = 0;
        let longestStreak = 0;
        let temp = 0;

        for (let i = 0; i < days.length; i++) {
          if (days[i].count > 0) {
            temp++;
            if (temp > longestStreak) longestStreak = temp;
          } else {
            temp = 0;
          }
        }

        for (let i = days.length - 1; i >= 0; i--) {
          if (days[i].count > 0) {
            currentStreak++;
          } else if (i === days.length - 1) {
            continue;
          } else {
            break;
          }
        }

        setData((prev) => ({
          ...prev,
          totalContributions: live.total?.lastYear || prev.totalContributions,
          currentStreak: currentStreak || prev.currentStreak,
          longestStreak: longestStreak || prev.longestStreak,
          contributions: days,
        }));
      })
      .catch(() => {
        // Fallback data remains active seamlessly
      })
      .finally(() => clearTimeout(timeout));

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // Group days into 7-day columns (weeks)
  const { weeks, monthLabels } = useMemo(() => {
    const list = data.contributions;
    const cols: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    list.forEach((day, idx) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || idx === list.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });

    // Detect month transitions for column headers
    const months: { label: string; colIndex: number }[] = [];
    let lastMonth = '';

    cols.forEach((col, colIdx) => {
      const firstDay = col[0];
      if (firstDay) {
        const month = new Date(firstDay.date).toLocaleString('default', { month: 'short' });
        if (month !== lastMonth) {
          months.push({ label: month, colIndex: colIdx });
          lastMonth = month;
        }
      }
    });

    return { weeks: cols, monthLabels: months };
  }, [data.contributions]);

  const defaultDay = data.contributions[data.contributions.length - 1];
  const displayedDay = activeDay || defaultDay;

  return (
    <section
      id="github-activity"
      aria-label="GitHub Activity & Contributions"
      className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24"
    >
      {/* Section Header */}
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div className="space-y-3">
          <span className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-orange)] uppercase">
            {'// Open Source & Activity'}
          </span>
          <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
            Code Activity &amp; Contributions
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            Year-round public GitHub commits, pull requests, algorithmic solutions, and production
            repositories.
          </p>
        </div>

        <a
          href="https://github.com/sidoxsinu"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full border border-neutral-700 bg-[#161616] px-4 py-2 font-mono text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:border-[var(--accent-orange)] hover:text-[var(--accent-orange)] sm:self-auto"
        >
          <span>View @sidoxsinu on GitHub</span>
          <span>↗</span>
        </a>
      </div>

      {/* 4 Summary Stats Cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-4 sm:p-5">
          <span className="font-mono text-[11px] font-medium text-neutral-400 uppercase">
            Year Contributions
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-white sm:text-2xl">
            {data.totalContributions}
            <span className="text-[var(--accent-orange)]">+</span>
          </p>
          <span className="text-[11px] text-neutral-500">Commits &amp; PRs</span>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-4 sm:p-5">
          <span className="font-mono text-[11px] font-medium text-neutral-400 uppercase">
            Public Repos
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-white sm:text-2xl">
            {data.publicRepos}
          </p>
          <span className="text-[11px] text-neutral-500">Open-source &amp; tools</span>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-4 sm:p-5">
          <span className="font-mono text-[11px] font-medium text-neutral-400 uppercase">
            Longest Streak
          </span>
          <p className="mt-1 font-mono text-xl font-bold text-white sm:text-2xl">
            {data.longestStreak}
            <span className="text-xs font-normal text-neutral-400 sm:text-sm"> days</span>
          </p>
          <span className="text-[11px] text-neutral-500">Consecutive coding</span>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-4 sm:p-5">
          <span className="font-mono text-[11px] font-medium text-neutral-400 uppercase">
            Active Stack
          </span>
          <p className="mt-1 font-mono text-sm font-semibold text-white sm:text-base">
            TS • Python • Swift
          </p>
          <span className="text-[11px] text-neutral-500">Primary languages</span>
        </div>
      </div>

      {/* Contribution Calendar Card */}
      <div className="rounded-2xl border border-neutral-800 bg-[#161616] p-5 sm:p-7">
        {/* Card Header with Status & Legend */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-mono text-xs font-medium text-white">github.com/sidoxsinu</span>
          </div>

          {/* Color Scale Legend */}
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-400">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_COLORS[0] }} />
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_COLORS[1] }} />
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_COLORS[2] }} />
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_COLORS[3] }} />
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: LEVEL_COLORS[4] }} />
            <span>More</span>
          </div>
        </div>

        {/* Heatmap Grid Container - Horizontally scrollable without breaking mobile layout */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[680px]">
            {/* Month Header Row */}
            <div className="mb-2 flex pl-7 font-mono text-[10px] text-neutral-500">
              {weeks.map((_, colIdx) => {
                const month = monthLabels.find((m) => m.colIndex === colIdx);
                return (
                  <div key={colIdx} className="w-[13px] shrink-0 text-left">
                    {month ? month.label : ''}
                  </div>
                );
              })}
            </div>

            {/* Days Grid with Row Labels */}
            <div className="flex gap-1.5">
              {/* Day Labels Column (Mon, Wed, Fri) */}
              <div className="flex flex-col gap-1 pr-1 font-mono text-[9px] text-neutral-500">
                {DAY_LABELS.map((day, idx) => (
                  <div key={idx} className="h-[10px] w-5 leading-[10px]">
                    {day}
                  </div>
                ))}
              </div>

              {/* 52 Week Columns */}
              <div className="flex gap-1">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-1">
                    {week.map((day) => {
                      const isHovered = activeDay?.date === day.date;
                      return (
                        <div
                          key={day.date}
                          data-no-cursor-hover="true"
                          onMouseEnter={() => setActiveDay(day)}
                          aria-label={`${day.count} contributions on ${day.date}`}
                          className={`h-[10px] w-[10px] rounded-[2px] transition-all duration-150 ${
                            isHovered
                              ? 'ring-2 ring-white scale-125 z-10'
                              : 'hover:ring-1 hover:ring-white/80'
                          }`}
                          style={{
                            backgroundColor: LEVEL_COLORS[day.level],
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Tooltip / Inspect Status Footer */}
        <div className="mt-4 flex flex-col justify-between gap-2 border-t border-neutral-800/80 pt-3 text-xs sm:flex-row sm:items-center">
          <div className="font-mono text-neutral-300">
            {displayedDay ? (
              <span>
                <strong className="text-white">{displayedDay.count} contribution{displayedDay.count === 1 ? '' : 's'}</strong> on{' '}
                <span className="text-[var(--accent-orange)]">
                  {new Date(displayedDay.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </span>
            ) : (
              <span>Hover over any day square to inspect commits</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-neutral-500">
              Interactive 52-week activity map
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
