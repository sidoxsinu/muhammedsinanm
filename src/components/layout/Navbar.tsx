'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const isBusyRef = useRef(false);

  // Nav entrance & glassmorphism morph on scroll
  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    // For non-home pages, always keep the sleek floating glass bar
    if (pathname !== '/') {
      navEl.classList.add('nav-glass');
      return;
    }

    const hero = document.querySelector('.hero-premium');
    if (!hero) {
      navEl.classList.add('nav-glass');
      return;
    }

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
      { threshold: 0.05 },
    );

    observer.observe(hero);

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

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
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
    );
    const socialTitle = panel.querySelector<HTMLElement>('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll<HTMLElement>('.sm-socials-link'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 } as gsap.TweenVars);
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    preLayers.forEach((el, i) => {
      tl.fromTo(
        el,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.07,
      );
    });

    const lastTime = preLayers.length ? (preLayers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (preLayers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: 100 },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime,
    );

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
        itemsStart,
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
          itemsStart + 0.1,
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
          socialsStart + 0.04,
        );
      }
    }

    return tl;
  }, []);

  const animateIcon = (opening: boolean) => {
    if (!iconRef.current) return;
    if (opening) {
      gsap.to(iconRef.current, {
        rotate: 225,
        duration: 0.8,
        ease: 'power4.out',
        overwrite: 'auto',
      });
    } else {
      gsap.to(iconRef.current, {
        rotate: 0,
        duration: 0.35,
        ease: 'power3.inOut',
        overwrite: 'auto',
      });
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
        const numberEls = Array.from(
          panel.querySelectorAll<HTMLElement>('.sm-panel-list[data-numbering] .sm-panel-item'),
        );
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
          <Link
            href="/"
            className="nav-brand"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            © Muhammed Sinan M
          </Link>
        </div>

        <div className="nav-center">
          <Link
            href="/"
            className={pathname === '/' ? 'font-semibold text-[var(--accent-orange)]' : ''}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={pathname === '/projects' ? 'font-semibold text-[var(--accent-orange)]' : ''}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className={pathname === '/about' ? 'font-semibold text-[var(--accent-orange)]' : ''}
          >
            About &amp; Journey
          </Link>
          <Link
            href="/credentials"
            className={
              pathname === '/credentials' ? 'font-semibold text-[var(--accent-orange)]' : ''
            }
          >
            Credentials
          </Link>
          <a
            href="/images/Resume/Muhammed%20Sinan%20M.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume group inline-flex items-center gap-1"
            style={{ color: '#E8562A', fontWeight: 600 }}
          >
            <span>Resume</span>
            <svg
              className="h-2.5 w-2.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="nav-right">
          <Link
            href="/contact"
            className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-[var(--accent-orange)]"
          >
            Let&apos;s Talk!
          </Link>
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
          if (
            isOpen &&
            (e.target === wrapperRef.current ||
              (e.target as HTMLElement).classList.contains('sm-prelayer'))
          ) {
            closeMenu();
          }
        }}
      >
        <div className="sm-prelayers" aria-hidden="true">
          <div className="sm-prelayer" style={{ background: '#111111' }} />
          <div className="sm-prelayer" style={{ background: '#222222' }} />
        </div>
        <aside
          id="staggered-menu-panel"
          className="staggered-menu-panel"
          aria-hidden={!isOpen}
          ref={panelRef}
        >
          <div className="sm-panel-inner">
            <ul className="sm-panel-list" role="list" data-numbering="true">
              <li className="sm-panel-itemWrap">
                <Link className="sm-panel-item" href="/" data-index="1" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Home</span>
                </Link>
              </li>
              <li className="sm-panel-itemWrap">
                <Link className="sm-panel-item" href="/projects" data-index="2" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Projects</span>
                </Link>
              </li>
              <li className="sm-panel-itemWrap">
                <Link className="sm-panel-item" href="/about" data-index="3" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">About &amp; Journey</span>
                </Link>
              </li>
              <li className="sm-panel-itemWrap">
                <Link
                  className="sm-panel-item"
                  href="/credentials"
                  data-index="4"
                  onClick={closeMenu}
                >
                  <span className="sm-panel-itemLabel">Credentials &amp; Certs</span>
                </Link>
              </li>
              <li className="sm-panel-itemWrap">
                <Link className="sm-panel-item" href="/contact" data-index="5" onClick={closeMenu}>
                  <span className="sm-panel-itemLabel">Contact</span>
                </Link>
              </li>
              <li className="sm-panel-itemWrap" style={{ marginTop: '1rem' }}>
                <a
                  className="sm-panel-item"
                  href="/images/Resume/Muhammed%20Sinan%20M.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-index="6"
                  style={{ color: '#E54D2E' }}
                  onClick={closeMenu}
                >
                  <span className="sm-panel-itemLabel inline-flex items-center gap-1.5">
                    <span>Resume</span>
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </a>
              </li>
            </ul>
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                <li className="sm-socials-item">
                  <a
                    href="https://github.com/sidoxsinu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link"
                  >
                    GitHub
                  </a>
                </li>
                <li className="sm-socials-item">
                  <a
                    href="https://www.linkedin.com/in/sidoxsinu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link"
                  >
                    LinkedIn
                  </a>
                </li>
                <li className="sm-socials-item">
                  <a
                    href="https://contact.muhammedsinan.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sm-socials-link"
                  >
                    Direct Portal ↗
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
