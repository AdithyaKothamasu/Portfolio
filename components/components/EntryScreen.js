'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

const subscribeToMotion = callback => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const getMotionPreference = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getServerMotionPreference = () => false;
const INTRO_TEXT = ['Hey, I am Adithya', 'Welcome to my corner of the Internet', 'Click to enter'];

export default function EntryScreen({ onEnter, paused = false }) {
  const canvasRef = useRef(null);
  const pausedRef = useRef(paused);
  const [textStage,setTextStage] = useState(0);
  const [displayedText,setDisplayedText] = useState('');
  const [promptReady,setPromptReady] = useState(false);
  useEffect(()=>{pausedRef.current=paused;},[paused]);

  const reducedMotion = useSyncExternalStore(subscribeToMotion, getMotionPreference, getServerMotionPreference);

  useEffect(() => {
    if (reducedMotion) return;
    let timer, active = true, stage = 0, length = 0;
    setTextStage(0); setDisplayedText(''); setPromptReady(false);
    const type = () => {
      if (!active) return;
      setDisplayedText(INTRO_TEXT[stage].slice(0, ++length));
      if (length < INTRO_TEXT[stage].length) timer = setTimeout(type, 75);
      else if (stage === INTRO_TEXT.length - 1) setPromptReady(true);
      else timer = setTimeout(erase, 1500);
    };
    const erase = () => {
      if (!active) return;
      setDisplayedText(INTRO_TEXT[stage].slice(0, --length));
      if (length > 0) timer = setTimeout(erase, 30);
      else { stage += 1; setTextStage(stage); timer = setTimeout(type, 75); }
    };
    timer = setTimeout(type, 75);
    return () => { active = false; clearTimeout(timer); };
  }, [reducedMotion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!context) return;
    let active = true, frame = 0, previous = 0, x = 100, y = 180, dx = 1, dy = 1;
    const image = new window.Image();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    const draw = time => {
      if (!active || pausedRef.current) return;
      const width = Math.min(canvas.width * .28, 150);
      const height = width * image.naturalHeight / image.naturalWidth;
      const maxX = Math.max(0, canvas.width - width), maxY = Math.max(0, canvas.height - height);
      if (reducedMotion) { x = maxX / 2; y = Math.min(maxY, canvas.height * .66); }
      else {
        const step = Math.min((time - previous) / 1000 || 0, .04) * 210;
        x += dx * step; y += dy * step;
        if (x <= 0 || x >= maxX) dx *= -1;
        if (y <= 0 || y >= maxY) dy *= -1;
        x = Math.max(0, Math.min(maxX, x)); y = Math.max(0, Math.min(maxY, y));
      }
      previous = time;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, x, y, width, height);
      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };
    image.onload = () => { if (active) draw(performance.now()); };
    image.src = '/face.png';
    const handleResize = () => { resize(); if (reducedMotion && image.complete && image.naturalWidth) draw(performance.now()); };
    window.addEventListener('resize', handleResize);
    return () => { active = false; image.onload = null; cancelAnimationFrame(frame); window.removeEventListener('resize', handleResize); };
  }, [reducedMotion]);

  const canEnter = promptReady || reducedMotion;
  const prompt = <button type="button" className={`sky-entry-prompt${canEnter ? ' sky-entry-prompt-ready' : ''}`} aria-label="Click to enter" onClick={event=>{event.stopPropagation();if(canEnter&&!paused)onEnter();}} disabled={!canEnter||paused}>{reducedMotion ? INTRO_TEXT[2] : displayedText}</button>;
  return <section className="sky-entry" aria-label="Portfolio welcome" data-text-stage={reducedMotion ? 'reduced' : textStage} onClick={()=>{if(canEnter&&!paused)onEnter();}}>
    <canvas ref={canvasRef} aria-hidden="true" />
    <span className="sky-entry-copy">
      {reducedMotion ? <><span className="sky-entry-greeting">{INTRO_TEXT[0]}</span><span className="sky-entry-welcome">{INTRO_TEXT[1]}</span>{prompt}</> : textStage===2 ? prompt : <span className="sky-entry-greeting" aria-live="off">{displayedText}</span>}
    </span>
  </section>;
}
