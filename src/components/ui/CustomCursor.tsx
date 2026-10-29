'use client';

import { useEffect, useRef } from 'react';

/**
 * Checks if a DOM element or any of its ancestors is an interactive/clickable element.
 * Non-clickable elements with hover animations (like cards, text, badges, stats) return false.
 */
function isClickable(target: Element | null): boolean {
  if (!target || !(target instanceof Element)) return false;

  // Explicit opt-out for hover-only data visualizers and decorative elements
  if (target.closest('[data-no-cursor-hover="true"]')) {
    return false;
  }

  // 1. Interactive HTML anchor with href
  const anchor = target.closest('a');
  if (anchor && (anchor.hasAttribute('href') || anchor.hasAttribute('data-clickable'))) {
    return true;
  }

  // 2. Interactive button (not disabled)
  const button = target.closest('button');
  if (button && !button.disabled && button.getAttribute('aria-disabled') !== 'true') {
    return true;
  }

  // 3. Interactive form controls
  const formControl = target.closest('input, textarea, select');
  if (
    formControl &&
    !(formControl as HTMLInputElement).disabled &&
    (formControl as HTMLInputElement).type !== 'hidden'
  ) {
    return true;
  }

  // 4. Form label associated with an input
  const label = target.closest('label');
  if (label && (label.hasAttribute('for') || label.querySelector('input, textarea, select'))) {
    return true;
  }

  // 5. Interactive ARIA roles
  const ariaInteractive = target.closest(
    '[role="button"], [role="link"], [role="tab"], [role="menuitem"], [role="switch"], [role="checkbox"], [role="radio"]',
  );
  if (ariaInteractive && ariaInteractive.getAttribute('aria-disabled') !== 'true') {
    return true;
  }

  // 6. Explicit clickable class or data attribute or component triggers
  const explicitClickable = target.closest(
    'summary, [onclick], [data-clickable="true"], .cursor-pointer, .clickable, .sm-toggle, .scroll-circle-icon, #back-to-top',
  );
  if (explicitClickable) {
    return true;
  }

  return false;
}

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add('hide-native-cursor');

    let mouseX = -100;
    let mouseY = -100;

    const updateHoverState = (el: Element | null) => {
      if (isClickable(el)) {
        document.body.classList.add('cursor-hover');
      } else {
        document.body.classList.remove('cursor-hover');
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      dot.style.opacity = '1';

      updateHoverState(e.target as Element | null);
    };

    const onScroll = () => {
      if (mouseX >= 0 && mouseY >= 0) {
        const el = document.elementFromPoint(mouseX, mouseY);
        updateHoverState(el);
      }
    };

    const onMouseDown = () => {
      document.body.classList.add('cursor-active');
    };

    const onMouseUp = () => {
      document.body.classList.remove('cursor-active');
    };

    const onMouseLeaveDoc = () => {
      dot.style.opacity = '0';
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-active');
    };

    const onMouseEnterDoc = () => {
      dot.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveDoc);
    document.addEventListener('mouseenter', onMouseEnterDoc);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeaveDoc);
      document.removeEventListener('mouseenter', onMouseEnterDoc);
      document.body.classList.remove('cursor-hover');
      document.body.classList.remove('cursor-active');
      document.documentElement.classList.remove('hide-native-cursor');
    };
  }, []);

  return <div className="cursor-dot" id="cursorDot" ref={dotRef} aria-hidden="true" />;
}
