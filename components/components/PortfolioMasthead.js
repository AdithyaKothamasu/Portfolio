'use client';

import { useEffect, useRef } from 'react';

export default function PortfolioMasthead() {
  const mastheadRef = useRef(null);
  const motionRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef(null);

  const reset = () => {
    const masthead = mastheadRef.current;
    if (!masthead) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    ['--slice-x'].forEach(property => masthead.style.removeProperty(property));
  };

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionRef.current = motion;
    motion.addEventListener('change', reset);
    return () => {
      cancelAnimationFrame(frameRef.current);
      motion.removeEventListener('change', reset);
    };
  }, []);

  const handlePointerMove = event => {
    if (event.pointerType !== 'mouse' || !motionRef.current || motionRef.current.matches) return;
    pointerRef.current = { x: event.clientX, y: event.clientY };
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0;
      const masthead = mastheadRef.current;
      const point = pointerRef.current;
      if (!masthead || !point || motionRef.current.matches) return;
      const bounds = masthead.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (point.x - bounds.left) / bounds.width * 2 - 1));
      masthead.style.setProperty('--slice-x', `${x * 7}px`);
    });
  };

  return (
    <header className="observatory-masthead" ref={mastheadRef} onPointerMove={handlePointerMove} onPointerLeave={reset} onPointerCancel={reset}>
      <div className="masthead-stage">
        <h1 className="masthead-title" aria-label="ADITHYA.CLOUD">
          <span className="masthead-name" aria-hidden="true">
            <span>ADITHYA</span>
            <span className="masthead-slice">ADITHYA</span>
          </span>
          <span className="masthead-domain" aria-hidden="true">.CLOUD</span>
        </h1>
        <aside className="masthead-next" aria-labelledby="cad-harness-title">
          <div className="masthead-next-label"><span className="masthead-note-mark" aria-hidden="true">↗</span><span>A LITTLE SPACE FOR WHAT&apos;S NEXT.</span></div>
          <div className="masthead-project-heading"><h2 id="cad-harness-title">CAD Harness</h2><span className="masthead-project-status">IN DEVELOPMENT</span></div>
          <p>Building an AI agent workflow for CAD, connecting drawing context, CAD tools, and review.</p>
          <ol className="masthead-project-flow" aria-label="Conceptual CAD Harness workflow">
            <li>Drawing context</li><li>Agent + CAD tools</li><li>Review</li>
          </ol>
        </aside>
      </div>
      <div className="masthead-footer" aria-hidden="true" />
    </header>
  );
}
