'use client';

import React, { useEffect, useRef } from 'react';

export function JourneySection() {
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (viewportRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 280 : 350;
      viewportRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (viewportRef.current) {
      const scrollAmount = window.innerWidth <= 768 ? 280 : 350;
      viewportRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section aria-label="Career journey" className="jtl-section" id="journey">
      <div className="section-inner">
        <div className="journey-header-top">
          <div>
            <span className="section-label">{'// Journey'}</span>
            <h2 className="fade-in-up reveal-text">My Journey And Milestones</h2>
            <p className="section-desc jtl-subtitle reveal-block">
              From student to builder — every milestone that shaped me.
            </p>
          </div>
          <div className="journey-nav-buttons fade-in-up reveal-block">
            <button aria-label="Previous" className="jtl-nav-btn prev" id="jtl-new-prev" onClick={scrollPrev}>
              <span>‹</span>
            </button>
            <button aria-label="Next" className="jtl-nav-btn next" id="jtl-new-next" onClick={scrollNext}>
              <span>›</span>
            </button>
          </div>
        </div>
      </div>
      <div className="journey-timeline-container fade-in-up reveal-block">
        <div className="journey-timeline-viewport" id="journey-timeline-viewport" ref={viewportRef}>
          <div className="journey-timeline-track">
            {/* 2026 */}
            <div className="journey-column">
              <div className="journey-year-container">
                <h4 className="journey-year">2026</h4>
              </div>
              <div className="journey-content bg-alt">
                <div className="journey-dot" />
                <ul className="journey-list">
                  <li>
                    <strong>Software Engineering Intern</strong>Torcue Digital Inc. · Infopark, Kochi
                  </li>
                  <li>
                    <strong>Co-CFO, IEDC CCE</strong>Innovation &amp; Entrepreneurship Development Centre
                  </li>
                  <li>
                    <strong>Research Intern</strong>Suvidha Foundation · AI &amp; Dev workflows
                  </li>
                  <li>
                    <strong>IEEE IAS Webmaster</strong>IEEE Industry Applications Society · CCE Student Branch
                  </li>
                  <li>
                    <strong>IEEE CS Webmaster</strong>IEEE Computer Society · CCE Student Branch
                  </li>
                  <li>
                    <strong>Design Lead</strong>IEEE Kerala Section JC (CTS/Nano/EDS)
                  </li>
                  <li>
                    <strong>Learning Coordinator</strong>TinkerHub CCE
                  </li>
                  <li>
                    <strong>BeachHack Season 7</strong>Finalist · HackForChrist
                  </li>
                </ul>
              </div>
            </div>

            {/* 2025 */}
            <div className="journey-column">
              <div className="journey-year-container">
                <h4 className="journey-year">2025</h4>
              </div>
              <div className="journey-content">
                <div className="journey-dot" />
                <ul className="journey-list">
                  <li>
                    <strong>First Hackathon Win</strong>WEBATHON 2025 · Second Prize
                  </li>
                  <li>
                    <strong>Full-Stack Foundations</strong>Built projects across Python, React (MERN), and Java
                  </li>
                  <li>
                    <strong>B.Tech CS Started</strong>Joined Christ College of Engineering
                  </li>
                </ul>
              </div>
            </div>

            {/* 2024 */}
            <div className="journey-column">
              <div className="journey-year-container">
                <h4 className="journey-year">2024</h4>
              </div>
              <div className="journey-content bg-alt">
                <div className="journey-dot" />
                <ul className="journey-list">
                  <li>
                    <strong>NSS Event Lead</strong>Led various campaigns, events, and programs as part of NSS and raised
                    ₹1 Lakh+
                  </li>
                  <li>
                    <strong>IT Fair Champion</strong>First place at school &amp; sub-district levels; Participated at
                    district level
                  </li>
                </ul>
              </div>
            </div>

            {/* 2023 */}
            <div className="journey-column">
              <div className="journey-year-container">
                <h4 className="journey-year">2023</h4>
              </div>
              <div className="journey-content">
                <div className="journey-dot" />
                <ul className="journey-list">
                  <li>
                    <strong>NSS Volunteer Leader</strong>Started volunteership &amp; selected as leader (served till
                    2025)
                  </li>
                  <li>
                    <strong>Higher Secondary</strong>Completed Science from MES HSS Irimbiliyam
                  </li>
                  <li>
                    <strong>IT Fair Champion</strong>First place at school &amp; sub-district levels; Participated at
                    district level
                  </li>
                </ul>
              </div>
            </div>

            {/* 2022 */}
            <div className="journey-column">
              <div className="journey-year-container">
                <h4 className="journey-year">2022</h4>
              </div>
              <div className="journey-content bg-alt">
                <div className="journey-dot" />
                <ul className="journey-list">
                  <li>
                    <strong>Game Development</strong>Built and published my first game
                  </li>
                  <li>
                    <strong>Little KITES Bootcamp</strong>Attended district level Little KITES programming bootcamp
                  </li>
                  <li>
                    <strong>IT Fair Champion</strong>First place at school &amp; sub-district levels; Participated at
                    district level
                  </li>
                </ul>
              </div>
            </div>

            {/* 2021 */}
            <div className="journey-column">
              <div className="journey-year-container">
                <h4 className="journey-year">2021</h4>
              </div>
              <div className="journey-content">
                <div className="journey-dot" />
                <ul className="journey-list">
                  <li>
                    <strong>IT Fair Champion</strong>First place in programming at school &amp; sub-district levels;
                    Participated at district level
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
