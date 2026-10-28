'use client';

import React, { useState } from 'react';

export function ClubsSection() {
  const [activeClubs, setActiveClubs] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setActiveClubs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="bg-light" id="clubs">
      <div className="section-inner">
        <span className="section-label">{'// Clubs'}</span>
        <h2 className="fade-in-up reveal-text">Clubs &amp; Organizations</h2>
        <div className="clubs-list">
          {/* 1. IEEE Memberships */}
          <div className={`club-item ${activeClubs['ieee'] ? 'active' : ''}`}>
            <button
              className={`club-dropdown ${activeClubs['ieee'] ? 'active' : ''}`}
              type="button"
              onClick={() => toggle('ieee')}
            >
              <span className="club-title">IEEE Memberships</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="club-content">
              <ul>
                <li>IEEE Member (Aug 2025 – Present)</li>
                <li>IEEE Computer Society (Oct 2025 – Present)</li>
                <li>IEEE Electron Devices Society (Oct 2025 – Present)</li>
                <li>IEEE Electronics Packaging Society (Oct 2025 – Present)</li>
                <li>IEEE Broadcast Technology Society (Oct 2025 – Present)</li>
                <li>IEEE Industry Applications Society (Oct 2025 – Present)</li>
                <li>IEEE Vehicular Technology Society (Oct 2025 – Present)</li>
                <li>IEEE Engineering in Medicine &amp; Biology Society (Oct 2025 – Present)</li>
                <li>IEEE Sensors Council (2026 – Present)</li>
                <li>IEEE Systems Council (2026 – Present)</li>
                <li>IEEE Transportation Electrification Council (2026 – Present)</li>
              </ul>
            </div>
          </div>

          {/* 2. Communities & Organizations */}
          <div className={`club-item ${activeClubs['communities'] ? 'active' : ''}`}>
            <button
              className={`club-dropdown ${activeClubs['communities'] ? 'active' : ''}`}
              type="button"
              onClick={() => toggle('communities')}
            >
              <span className="club-title">Communities &amp; Organizations</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="club-content">
              <ul>
                <li>TinkerHub CCE (2026 – Present)</li>
                <li>Community of Developers (Aug 2025 – Present)</li>
                <li>FOSS CCE (Dec 2025 – Present)</li>
                <li>IEDC Kerala Startup Mission NEST (2026 – Present)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
