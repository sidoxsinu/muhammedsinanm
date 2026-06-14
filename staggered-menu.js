document.addEventListener('DOMContentLoaded', function initStaggeredMenu() {
  const wrapper = document.querySelector('.staggered-menu-wrapper');
  const toggleBtn = document.querySelector('.sm-toggle');
  const panel = document.getElementById('staggered-menu-panel');
  const preLayers = Array.from(document.querySelectorAll('.sm-prelayer'));
  const plusH = document.querySelector('.sm-icon-line:not(.sm-icon-line-v)');
  const plusV = document.querySelector('.sm-icon-line-v');
  const icon = document.querySelector('.sm-icon');
  const textInner = document.querySelector('.sm-toggle-textInner');
  
  if (!wrapper || !toggleBtn || !panel || !plusH || !plusV || !icon || !textInner) return;

  let open = false;
  let busy = false;
  let openTl = null;
  let closeTween = null;
  const position = wrapper.dataset.position || 'right';
  const offscreen = position === 'left' ? -100 : 100;

  // Init GSAP states
  gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
  const preContainer = document.querySelector('.sm-prelayers');
  if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
  gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
  gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
  gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
  gsap.set(textInner, { yPercent: 0 });

  function buildOpenTimeline() {
    if (openTl) openTl.kill();
    if (closeTween) { closeTween.kill(); closeTween = null; }

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    preLayers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });

    const lastTime = preLayers.length ? (preLayers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (preLayers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(itemEls, {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: { each: 0.1, from: 'start' }
      }, itemsStart);

      if (numberEls.length) {
        tl.to(numberEls, {
          duration: 0.6,
          ease: 'power2.out',
          '--sm-num-opacity': 1,
          stagger: { each: 0.08, from: 'start' }
        }, itemsStart + 0.1);
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      }
      if (socialLinks.length) {
        tl.to(socialLinks, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' },
          onComplete: () => gsap.set(socialLinks, { clearProps: 'opacity' })
        }, socialsStart + 0.04);
      }
    }

    return tl;
  }

  function playOpen() {
    if (busy) return;
    busy = true;
    openTl = buildOpenTimeline();
    openTl.eventCallback('onComplete', () => { busy = false; });
    openTl.play(0);
  }

  function playClose() {
    if (openTl) { openTl.kill(); openTl = null; }
    const all = [...preLayers, panel];
    if (closeTween) closeTween.kill();
    
    closeTween = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busy = false;
      }
    });
  }

  function animateIcon(opening) {
    if (opening) {
      gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }

  function animateText(opening) {
    // 4 lines total: Menu, Close, Menu, Close
    gsap.to(textInner, {
      yPercent: opening ? -75 : 0,
      duration: 0.78,
      ease: 'power4.out'
    });
  }

  function toggleMenu() {
    open = !open;
    toggleBtn.setAttribute('aria-expanded', open);
    if (open) {
      wrapper.setAttribute('data-open', 'true');
      panel.setAttribute('aria-hidden', 'false');
      wrapper.style.pointerEvents = 'auto'; // allow clicking inside wrapper
      document.body.style.overflow = 'hidden';
      playOpen();
    } else {
      wrapper.removeAttribute('data-open');
      panel.setAttribute('aria-hidden', 'true');
      wrapper.style.pointerEvents = 'none'; // pass clicks through when closed
      document.body.style.overflow = '';
      playClose();
    }
    animateIcon(open);
    animateText(open);
  }

  toggleBtn.addEventListener('click', toggleMenu);

  // Close on link click
  const links = panel.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (open) toggleMenu();
    });
  });

  // Close on click outside (click on the prelayers / wrapper)
  wrapper.addEventListener('click', (e) => {
    if (open && (e.target === wrapper || e.target.classList.contains('sm-prelayer'))) {
      toggleMenu();
    }
  });

});
