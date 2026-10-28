'use client';

import React, { useState } from 'react';

export function EventsSection() {
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setActiveItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section id="hackathons">
      <div className="section-inner">
        <span className="section-label">{'// Hackathons'}</span>
        <h2 className="fade-in-up reveal-text">Hackathons &amp; Events</h2>
        <div className="events-list">
          {/* Christ College of Engineering */}
          <div className={`event-item reveal-block ${activeItems['cce'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['cce'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['cce'])}
              onClick={() => toggle('cce')}
            >
              <span>Christ College of Engineering (CCE)</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">BeachHack Season 7</h4>
                <span className="event-result">Finalist</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">WEBATHON 2025</h4>
                <span className="event-result">Second Prize</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">Code a Pookalam</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">TECHLETICS 4.0 Quake Clash</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">DEVMODE:UNITY UNLEASHED</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">EVOLV 2.0</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">FOSS RELAY CODING</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">JUMPSTART 8.0</h4>
                <span className="event-result">Participant</span>
              </div>
            </div>
          </div>

          {/* VIT Vellore */}
          <div className={`event-item reveal-block ${activeItems['vit'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['vit'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['vit'])}
              onClick={() => toggle('vit')}
            >
              <span>VIT Vellore</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">HackBattle</h4>
                <span className="event-result">Participant</span>
              </div>
            </div>
          </div>

          {/* Rajagiri */}
          <div className={`event-item reveal-block ${activeItems['rajagiri'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['rajagiri'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['rajagiri'])}
              onClick={() => toggle('rajagiri')}
            >
              <span>Rajagiri School of Engineering &amp; Technology</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">HackQuest &apos;25</h4>
                <span className="event-result">Participant</span>
              </div>
            </div>
          </div>

          {/* NIT Calicut */}
          <div className={`event-item reveal-block ${activeItems['nitc'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['nitc'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['nitc'])}
              onClick={() => toggle('nitc')}
            >
              <span>NIT Calicut</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">IEEE YESS&apos;25</h4>
                <span className="event-result">Participant</span>
              </div>
            </div>
          </div>

          {/* Tech Maghi / IIT Hyderabad */}
          <div className={`event-item reveal-block ${activeItems['iith'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['iith'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['iith'])}
              onClick={() => toggle('iith')}
            >
              <span>IIT Hyderabad &amp; Tech Maghi</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">AI Cyber Security Workshop</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">Agentic AI Boot Camp</h4>
                <span className="event-result">Participant</span>
              </div>
            </div>
          </div>

          {/* NSS Palakkad / μLearn */}
          <div className={`event-item reveal-block ${activeItems['nss'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['nss'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['nss'])}
              onClick={() => toggle('nss')}
            >
              <span>NSS Palakkad / μLearn</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">Build With AI 2026 Hackathon</h4>
                <span className="event-result">Best Technical Project</span>
              </div>
            </div>
          </div>

          {/* K-DISC */}
          <div className={`event-item reveal-block ${activeItems['kdisc'] ? 'active' : ''}`}>
            <button
              className={`event-dropdown ${activeItems['kdisc'] ? 'active' : ''}`}
              type="button"
              aria-expanded={Boolean(activeItems['kdisc'])}
              onClick={() => toggle('kdisc')}
            >
              <span>K-DISC / Government of Kerala</span>
              <span className="dropdown-arrow">▼</span>
            </button>
            <div className="event-content">
              <div className="event-list-item">
                <h4 className="event-name">YIP 8.0 Idea Submission</h4>
                <span className="event-result">Participant</span>
              </div>
              <div className="event-list-item">
                <h4 className="event-name">YIP 8.0 VOS Training</h4>
                <span className="event-result">Participant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
