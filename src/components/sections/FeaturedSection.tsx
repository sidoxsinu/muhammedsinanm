'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function FeaturedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root || typeof window === 'undefined') return;

    const items = [
      {
        image: 'images/project-images/AvenWing.webp',
        quote: 'Premium e-commerce platform featuring an interactive product gallery, GSAP animations, and direct WhatsApp checkout.',
        source: 'AvenWing',
        label: 'AvenWing',
        link: '#project-avenwing',
      },
      {
        image: 'images/project-images/Parackal-Travel-Hub.webp',
        quote: 'Full-stack bilingual travel booking platform with custom inquiry flows and responsive design.',
        source: 'Parackal Travels Hub',
        label: 'Parackal Travels Hub',
        link: '#project-parackal',
      },
      {
        image: 'images/project-images/Next-Gen-Ai-Assistant.webp',
        quote: 'Award-winning multi-modal AI assistant powered by Groq Llama 3.3 for real-time voice interaction.',
        source: 'Next Gen AI Assistant',
        label: 'Next Gen AI Assistant',
        link: '#project-ai-assistant',
      },
      {
        image: 'images/project-images/Pylon.webp',
        quote: 'Zero-dependency scholarship discovery platform with real-time filtering and custom search algorithms.',
        source: 'Pylon',
        label: 'Pylon',
        link: '#project-pylon',
      },
      {
        image: 'images/project-images/CodeBurry.webp',
        quote: 'Gamified frontend development learning platform with interactive coding challenges and an XP-based reward system.',
        source: 'CodeBurry',
        label: 'CodeBurry',
        link: '#project-codeburry',
      },
    ];

    const defaultIndex = 2;
    const accentColor = '#e8562a';
    const overlayColor = '#060010';
    const textColor = '#ffffff';
    const height = 460;
    const gap = 10;
    const radius = 16;
    const expandRatio = 0.52;
    const duration = 0.6;
    const ease = 'power3.out';
    const parallax = 0.5;
    const tilt = 8;
    const stagger = 0.06;
    const showLabels = true;
    const grayscale = true;
    const count = items.length;
    let active = Math.min(Math.max(defaultIndex, 0), count - 1);
    const prefersReduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

    let tl: gsap.core.Timeline | null = null;
    let mediaSize = 320;

    // Render DOM
    root.classList.add('accordion-gallery');
    root.style.setProperty('--ag-accent', accentColor);
    root.style.setProperty('--ag-overlay', overlayColor);
    root.style.setProperty('--ag-text', textColor);
    root.style.setProperty('--ag-gap', `${gap}px`);
    root.style.setProperty('--ag-radius', `${radius}px`);
    root.style.height = `${height}px`;
    root.setAttribute('role', 'list');
    root.setAttribute('aria-label', 'Quotes gallery');

    root.innerHTML = items
      .map((item, i) => {
        const isActive = i === active;
        const tag = item.link ? 'a' : 'div';
        return `
          <${tag} class="ag-panel ${isActive ? 'ag-panel--active' : ''}" 
            style="border-radius: ${radius}px;" 
            ${item.link ? `href="${item.link}"` : ''} 
            data-index="${i}"
            role="listitem" 
            tabindex="0" 
            ${isActive ? 'aria-current="true"' : ''} 
            aria-label="${item.label}">
            
            <span class="ag-panel__frame">
              <span class="ag-panel__media">
                <img src="${item.image}" alt="" draggable="false" />
              </span>
              <span class="ag-panel__overlay" aria-hidden="true"></span>
            </span>
            
            ${
              showLabels
                ? `
              <span class="ag-panel__label" aria-hidden="true">
                <span class="ag-panel__bar"></span>
                <span class="ag-panel__text">
                  ${item.quote}
                  <span class="ag-panel__source">${item.source}</span>
                </span>
              </span>
            `
                : ''
            }
          </${tag}>
        `;
      })
      .join('');

    const panels = Array.from(root.querySelectorAll<HTMLElement>('.ag-panel'));
    const mediaElements = Array.from(root.querySelectorAll<HTMLElement>('.ag-panel__media'));
    const barElements = Array.from(root.querySelectorAll<HTMLElement>('.ag-panel__bar'));
    const textElements = Array.from(root.querySelectorAll<HTMLElement>('.ag-panel__text'));

    function measure() {
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const total = rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSize = size;
      root.style.setProperty('--ag-media-size', `${size}px`);
    }

    function applyLayout(animate = true) {
      if (!panels.length || typeof gsap === 'undefined') return;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;

      if (tl) tl.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      tl = gsap.timeline();

      panels.forEach((panel, i) => {
        const isActive = i === active;
        const media = mediaElements[i];
        const bar = barElements[i];
        const text = textElements[i];

        const rot = isActive ? 0 : i < active ? tilt : -tilt;

        tl!.to(panel, { flexGrow: isActive ? grow : 1, rotateY: rot, duration: dur, ease: ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, active - i));
          const shift = drift * parallax * mediaSize * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl!.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: isActive ? 0 : shift,
              y: 0,
              '--ag-gray': gray,
              '--ag-dim': isActive ? 0 : 0.35,
              duration: dur,
              ease: ease,
            } as gsap.TweenVars,
            0
          );
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl!.to(
              [bar, text],
              { opacity: 1, x: 0, duration: dur, ease: ease, stagger: prefersReduced ? 0 : stagger },
              0
            );
          } else {
            tl!.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease: ease }, 0);
          }
        }
      });
    }

    function setActive(i: number) {
      if (active === i) return;

      panels[active].classList.remove('ag-panel--active');
      panels[active].removeAttribute('aria-current');

      active = i;

      panels[active].classList.add('ag-panel--active');
      panels[active].setAttribute('aria-current', 'true');

      applyLayout(true);
    }

    panels.forEach((panel, i) => {
      panel.addEventListener('mouseenter', () => setActive(i));
      panel.addEventListener('focus', () => setActive(i));
      panel.addEventListener('click', (e) => {
        if (i !== active) {
          e.preventDefault();
          setActive(i);
        }
      });
      panel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          setActive((i + 1) % count);
          panels[(i + 1) % count].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          setActive((i - 1 + count) % count);
          panels[(i - 1 + count) % count].focus();
        }
      });
    });

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(root);

    measure();
    applyLayout(false);

    return () => {
      resizeObserver.disconnect();
      if (tl) tl.kill();
      root.innerHTML = '';
    };
  }, []);

  return (
    <section aria-label="Featured Projects Showcase" className="testimonials-section" style={{ padding: '40px 0', overflow: 'visible' }}>
      <div className="testimonials-wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div id="testimonials-accordion" ref={containerRef} />
      </div>
    </section>
  );
}
