'use client';

import React from 'react';

import { CertificateGallerySection } from './CertificateGallerySection';

export function CertificationsSection() {
  return (
    <section
      className="bg-light"
      id="certifications"
      aria-label="Certifications — Muhammed Sinan M"
    >
      <div className="section-inner">
        <div className="certs-languages-wrapper">
          <div>
            <h2 className="fade-in-up reveal-text">Certifications</h2>
            <ul className="cert-list reveal-stagger">
              <li>IEEE Certified Member (CM)</li>
              <li>Google Developer Program (2025)</li>
              <li>National Service Scheme (NSS) Certificate (2023–2025)</li>
            </ul>
          </div>
          <div>
            <h2 className="fade-in-up reveal-text">Languages</h2>
            <ul className="language-list reveal-stagger">
              <li>English</li>
              <li>Malayalam</li>
              <li>Hindi</li>
              <li>Arabic</li>
            </ul>
          </div>
        </div>
        <p className="section-desc reveal-block">
          Click any certificate to view the full document.
        </p>
        <CertificateGallerySection />
      </div>
    </section>
  );
}
