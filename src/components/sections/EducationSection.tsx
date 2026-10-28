'use client';

import React from 'react';

export function EducationSection() {
  return (
    <section className="bg-light" id="education">
      <div className="section-inner">
        <span className="section-label">{'\u002F\u002F Education'}</span>
        <h2 className="fade-in-up reveal-text">Education</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-marker" />
            <h4>B.Tech in Computer Science &amp; Engineering</h4>
            <p className="meta reveal-block">
              Christ College of Engineering, Irinjalakuda | 2025–2029
            </p>
          </div>
          <div className="timeline-item">
            <div className="timeline-marker" />
            <h4>Higher Secondary – Science</h4>
            <p className="meta reveal-block">MES HSS Irimbiliyam | 2023–2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
