'use client';
import { useEffect, useRef } from 'react';

// Fixed cells let each glyph change shape without shifting or clipping the title.
export default function TextPressure({ text = 'ADITHYA.CLOUD', textColor = '#fff', className = '' }) {
  const titleRef = useRef(null);
  useEffect(() => {
    const title = titleRef.current;
    const cells = Array.from(title.children);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let pointer;
    const reset = () => cells.forEach(cell => { cell.firstChild.style.transform = ''; });
    const draw = () => {
      frame = 0;
      if (motion.matches || !pointer) return;
      const bounds = title.getBoundingClientRect();
      cells.forEach((cell, index) => {
        const center = bounds.left + bounds.width * (index + 0.5) / cells.length;
        const distance = Math.hypot(pointer.x - center, pointer.y - (bounds.top + bounds.height / 2));
        const pressure = Math.max(0, 1 - distance / Math.max(1, bounds.width * 0.45));
        cell.firstChild.style.transform = `scale(${0.76 + pressure * 0.22}, ${0.84 + pressure * 0.16}) skewX(${-pressure * 9}deg)`;
      });
    };
    const move = event => {
      pointer = { x: event.clientX, y: event.clientY };
      if (!frame && !motion.matches) frame = requestAnimationFrame(draw);
    };
    const leave = () => { pointer = null; reset(); };
    const onMotion = () => { cancelAnimationFrame(frame); frame = 0; reset(); };
    title.addEventListener('pointermove', move);
    title.addEventListener('pointerleave', leave);
    title.addEventListener('pointercancel', leave);
    motion.addEventListener('change', onMotion);
    return () => {
      cancelAnimationFrame(frame);
      title.removeEventListener('pointermove', move);
      title.removeEventListener('pointerleave', leave);
      title.removeEventListener('pointercancel', leave);
      motion.removeEventListener('change', onMotion);
    };
  }, [text]);
  return (
    <h1 ref={titleRef} aria-label={text} className={`pressure-title ${className}`} style={{ color: textColor, '--character-count': Array.from(text).length }}>
      {Array.from(text).map((char, index) => <span className="pressure-cell" aria-hidden="true" key={index}><span className="pressure-glyph">{char}</span></span>)}
    </h1>
  );
}
