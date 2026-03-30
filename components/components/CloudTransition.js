'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CLOUD_DEF = {
  viewBox: '0 0 200 120',
  shapes: [
    { t: 'e', cx: 100, cy: 96, rx: 92, ry: 22 },
    { t: 'c', cx: 55, cy: 68, r: 32 },
    { t: 'c', cx: 100, cy: 48, r: 40 },
    { t: 'c', cx: 150, cy: 64, r: 30 },
    { t: 'c', cx: 78, cy: 54, r: 26 },
    { t: 'c', cx: 130, cy: 50, r: 28 },
  ],
};

function getPositions() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return [
    { tx: -vw * 0.4, ty: vh * 0.34, idleScale: 0.74, idleOpacity: 0.92 },
    { tx:  vw * 0.4, ty: vh * 0.34, idleScale: 0.66, idleOpacity: 0.78 },
    { tx: -vw * 0.55, ty: -vh * 0.55, idleScale: 0.5, idleOpacity: 0 },
    { tx:  vw * 0.55, ty: -vh * 0.55, idleScale: 0.5, idleOpacity: 0 },
    { tx: 0,           ty: -vh * 0.62, idleScale: 0.5, idleOpacity: 0 },
    { tx: 0,           ty:  vh * 0.52, idleScale: 0.4, idleOpacity: 0 },
  ];
}

export default function CloudTransition({ triggered, onMidpoint, onComplete }) {
  const containerRef = useRef(null);
  const onMidpointRef = useRef(onMidpoint);
  const onCompleteRef = useRef(onComplete);
  const floatTweensRef = useRef([]);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    onMidpointRef.current = onMidpoint;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    if (!containerRef.current) return;
    const clouds = containerRef.current.querySelectorAll('[data-tcloud]');
    const positions = getPositions();

    clouds.forEach((cloud, i) => {
      const pos = positions[i];
      gsap.set(cloud, {
        x: pos.tx,
        y: pos.ty,
        scale: pos.idleScale,
        opacity: pos.idleOpacity,
      });
    });

    const tweens = [];
    [0, 1].forEach((idx) => {
      tweens.push(
        gsap.to(clouds[idx], {
          y: `+=${gsap.utils.random(-12, 12)}`,
          duration: gsap.utils.random(4, 6),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.8,
        }),
        gsap.to(clouds[idx], {
          x: `+=${gsap.utils.random(-6, 6)}`,
          duration: gsap.utils.random(5, 8),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: idx * 0.4 + 0.5,
        })
      );
    });
    floatTweensRef.current = tweens;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.5 }
    );

    return () => tweens.forEach(t => t.kill());
  }, []);

  useEffect(() => {
    if (!triggered || hasTriggeredRef.current || !containerRef.current) return;
    hasTriggeredRef.current = true;

    floatTweensRef.current.forEach(t => t.kill());

    const clouds = containerRef.current.querySelectorAll('[data-tcloud]');
    const positions = getPositions();

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current?.(),
    });

    tl.to(Array.from(clouds), {
      x: 0,
      y: 0,
      scale: 3,
      opacity: 0.97,
      duration: 1.4,
      ease: 'power2.in',
      stagger: 0.04,
    });

    tl.call(() => onMidpointRef.current?.());
    tl.to({}, { duration: 0.2 });

    const outTl = gsap.timeline();
    clouds.forEach((cloud, i) => {
      outTl.to(cloud, {
        x: positions[i].tx * 1.4,
        y: positions[i].ty * 1.4,
        scale: 0.6,
        opacity: 0,
        duration: 2.5,
        ease: 'power2.out',
      }, 0);
    });
    tl.add(outTl);

    return () => tl.kill();
  }, [triggered]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50, opacity: 0 }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <svg
          key={i}
          data-tcloud
          className="absolute"
          viewBox={CLOUD_DEF.viewBox}
          style={{
            width: '50vw',
            left: '50%',
            top: '50%',
            marginLeft: '-25vw',
            marginTop: '-15vw',
            willChange: 'transform, opacity',
            transformOrigin: '50% 50%',
            backfaceVisibility: 'hidden',
          }}
        >
          <g opacity={0.97}>
            {CLOUD_DEF.shapes.map((s, j) =>
              s.t === 'c'
                ? <circle key={j} cx={s.cx} cy={s.cy} r={s.r} fill="white" />
                : <ellipse key={j} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill="white" />
            )}
          </g>
        </svg>
      ))}
    </div>
  );
}
