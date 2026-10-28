'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const dot = dotRef.current;
    if (!dot) return;

    const onMouseMove = (e: MouseEvent) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    const addHover = () => document.body.classList.add('cursor-hover');
    const removeHover = () => document.body.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMouseMove, { passive: true });

    const hoverTargets = document.querySelectorAll(
      'a, button, .fan-card, .project-card, .accordion-header, [role="button"], .split-card, .ag-panel, .cert-card'
    );
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
      (el as HTMLElement).style.cursor = 'none';
    });

    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('cursor-hover');
      document.body.style.cursor = '';
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        (el as HTMLElement).style.cursor = '';
      });
    };
  }, []);

  return <div className="cursor-dot" id="cursorDot" ref={dotRef} aria-hidden="true" />;
}
