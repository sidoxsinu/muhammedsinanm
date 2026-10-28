'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const isBusyRef = useRef(false);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav entrance & glassmorphism morph on scroll
  useEffect(() => {
    const hero = document.querySelector('.hero-premium');
    if (!hero || !navRef.current) return;

    const navEl = navRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navEl.classList.remove('nav-glass');
          } else {
            navEl.classList.add('nav-glass');
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Staggered menu animations
  const buildOpenTimeline = useCallback(() => {
    if (openTlRef.current) openTlRef.current.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const panel = panelRef.current;
    const wrapper = wrapperRef.current;
    if (!panel || !wrapper) return null;

    const preLayers = Array.from(wrapper.querySelectorAll<HTMLElement>('.sm-prelayer'));
    const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    preLayers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = preLayers.length ? (preLayers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (preLayers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' },
          } as gsap.TweenVars,
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' }),
          },
          socialsStart + 0.04
        );
      }
    }

    return tl;
  }, []);

  const animateIcon = (opening: boolean) => {
    if (!iconRef.current) return;
    if (opening) {
      gsap.to(iconRef.current, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      gsap.to(iconRef.current, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  };

  const animateText = (opening: boolean) => {
    if (!textInnerRef.current) return;
    gsap.to(textInnerRef.current, {
      yPercent: opening ? -75 : 0,
      duration: 0.78,
      ease: 'power4.out',
    });
  };

  const closeMenu = useCallback(() => {
    if (isBusyRef.current) return;
    setIsOpen(false);

    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!wrapper || !panel) return;

    const preLayers = Array.from(wrapper.querySelectorAll<HTMLElement>('.sm-prelayer'));
    if (openTlRef.current) {
      openTlRef.current.kill();
      openTlRef.current = null;
    }

    wrapper.removeAttribute('data-open');
    panel.setAttribute('aria-hidden', 'true');
    wrapper.style.pointerEvents = 'none';
    document.body.style.overflow = '';

    const all = [...preLayers, panel];
    if (closeTweenRef.current) closeTweenRef.current.kill();

    closeTweenRef.current = gsap.to(all, {
      xPercent: 100,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
        const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        isBusyRef.current = false;
      },
    });

    animateIcon(false);
    animateText(false);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      if (isBusyRef.current) return;
      isBusyRef.current = true;
      setIsOpen(true);

      const wrapper = wrapperRef.current;
      const panel = panelRef.current;
      if (!wrapper || !panel) return;

      wrapper.setAttribute('data-open', 'true');
      panel.setAttribute('aria-hidden', 'false');
      wrapper.style.pointerEvents = 'auto';
      document.body.style.overflow = 'hidden';

      const tl = buildOpenTimeline();
      if (tl) {
        tl.eventCallback('onComplete', () => {
          isBusyRef.current = false;
        });
        tl.play(0);
        openTlRef.current = tl;
      }
      animateIcon(true);
      animateText(true);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const panel = panelRef.current;
    if (!wrapper || !panel) return;

    const preLayers = Array.from(wrapper.querySelectorAll<HTMLElement>('.sm-prelayer'));
    const preContainer = wrapper.querySelector<HTMLElement>('.sm-prelayers');

    gsap.set([panel, ...preLayers], { xPercent: 100, opacity: 1 });
    if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
    if (iconRef.current) {
      const plusH = iconRef.current.querySelector('.sm-icon-line:not(.sm-icon-line-v)');
      const plusV = iconRef.current.querySelector('.sm-icon-line-v');
      if (plusH) gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      if (plusV) gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(iconRef.current, { rotate: 0, transformOrigin: '50% 50%' });
    }
    if (textInnerRef.current) {
      gsap.set(textInnerRef.current, { yPercent: 0 });
    }
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="premium-nav" ref={navRef}>
        <div className="nav-left">
          <a href="#" className="nav-brand" onClick={scrollToTop}>
            © Muhammed Sinan M
          </a>
        </div>
        <div className="nav-center">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#fan-carousel">Certifications</a>
          <a
            href="/images/Resume/Muhammed%20Sinan%20M.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume"
            style={{ color: '#E8562A', fontWeight: 500 }}
          >
            Resume
          </a>
        </div>
        <div className="nav-right">
          <a href="https://contact.muhammedsinan.in" target="_blank" rel="noopener noreferrer">
            Let&apos;s Talk!
          </a>
        </div>
        <button
          className="sm-toggle"
          aria-label="Open menu"
          aria-expanded={isOpen}
          aria-controls="staggered-menu-panel"
          type="button"
          onClick={toggleMenu}
        >
          <span className="sm-toggle-textWrap" aria-hidden="true">
            <span className="sm-toggle-textInner" ref={textInnerRef}>
              <span className="sm-toggle-line">Menu</span>
              <span className="sm-toggle-line">Close</span>
              <span className="sm-toggle-line">Menu</span>
              <span className="sm-toggle-line">Close</span>
            </span>
          </span>
          <span className="sm-icon" aria-hidden="true" ref={iconRef}>
            <span className="sm-icon-line" />
            <span className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </nav>

      {/* STAGGERED MOBILE NAV MENU */}
      <div
        className="staggered-menu-wrapper fixed-wrapper"
        data-position="right"
        aria-hidden={!isOpen}
        style={{ '--sm-accent': '#E54D2E' } as React.CSSProperties}
        ref={wrapperRef}
        onClick={(e) => {
          if (isOpen && (e.target === wrapperRef.current || (e.target as HTMLElement).classList.contains('sm-prelayer'))) {
            closeMenu();
          }
        }}
      >
        <div className="sm-prelayers" aria-hidden="true">
          <div className="sm-prelayer" style={{ background: '#111111' }} />
          <div className="sm-prelayer" style={{ background: '#222222' }} />
        </div>
        <aside id="staggered-menu-panel" className="staggered-menu-panel" aria-hidden={!isOpen} ref={panelRef}>
          <div className="sm-panel-inner">
            <ul className="sm-panel-list" role="list" data-numbering="true">
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#about" data-index="1" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">About</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#journey" data-index="2" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Journey</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#education" data-index="3" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Education</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#projects" data-index="4" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Projects</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#achievements" data-index="5" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Achievements</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#experience" data-index="6" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Experience</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#skills" data-index="7" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Skills</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#clubs" data-index="8" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Clubs</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#hackathons" data-index="9" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Hackathons</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap">
                <a className="sm-panel-item" href="#fan-carousel" data-index="10" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Certifications</span>
                </a>
              </li>
              <li className="sm-panel-itemWrap" style={{ marginTop: '1rem' }}>
                <a
                  className="sm-panel-item"
                  href="/images/Resume/Muhammed%20Sinan%20M.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-index="11"
                  style={{ color: '#E54D2E' }}
                  onClick={closeMenu}
                >
                  <span className="sm-panel-itemLabel">Resume</span>
                </a>
              </li>
            </ul>
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                <li className="sm-socials-item">
                  <a href="https://github.com/sidoxsinu" target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                    GitHub
                  </a>
                </li>
                <li className="sm-socials-item">
                  <a href="https://www.linkedin.com/in/sidoxsinu/" target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                    LinkedIn
                  </a>
                </li>
                <li className="sm-socials-item">
                  <a href="https://contact.muhammedsinan.in" target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
