'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CLOUD_DEFS = [
  {
    viewBox: '0 0 200 120',
    shapes: [
      { t: 'e', cx: 100, cy: 96, rx: 92, ry: 22 },
      { t: 'c', cx: 55, cy: 68, r: 32 },
      { t: 'c', cx: 100, cy: 48, r: 40 },
      { t: 'c', cx: 150, cy: 64, r: 30 },
      { t: 'c', cx: 78, cy: 54, r: 26 },
      { t: 'c', cx: 130, cy: 50, r: 28 },
    ],
  },
  {
    viewBox: '0 0 160 100',
    shapes: [
      { t: 'e', cx: 80, cy: 80, rx: 72, ry: 18 },
      { t: 'c', cx: 45, cy: 58, r: 26 },
      { t: 'c', cx: 80, cy: 40, r: 34 },
      { t: 'c', cx: 120, cy: 55, r: 24 },
      { t: 'c', cx: 65, cy: 48, r: 20 },
    ],
  },
  {
    viewBox: '0 0 120 80',
    shapes: [
      { t: 'e', cx: 60, cy: 64, rx: 52, ry: 14 },
      { t: 'c', cx: 35, cy: 48, r: 20 },
      { t: 'c', cx: 62, cy: 36, r: 26 },
      { t: 'c', cx: 90, cy: 46, r: 18 },
    ],
  },
];

const FLOAT_PARAMS = [
  { yDist: -14, yDur: 5,   xDist: 7, xDur: 7.5 },
  { yDist: -18, yDur: 4.2, xDist: 9, xDur: 6.5 },
  { yDist: -10, yDur: 5.8, xDist: 5, xDur: 8   },
];

function getLayout(variant, isMobile) {
  const s = isMobile ? 0.55 : 1;

  if (variant === 'ambient') {
    return [
      { def: 0, w: 300 * s, bottom: -20, offset: -50 * s, opacity: 0.92 },
      { def: 1, w: 190 * s, bottom: 25 * s, offset: 55 * s, opacity: 0.78 },
      ...(!isMobile ? [
        { def: 2, w: 130, bottom: 75, offset: 10, opacity: 0.6 },
      ] : []),
    ];
  }

  return [
    { def: 0, w: 180 * s, bottom: -12, offset: -30 * s, opacity: 0.88 },
    { def: 1, w: 120 * s, bottom: 12 * s, offset: 35 * s, opacity: 0.72 },
  ];
}

export default function CloudAnimation({ variant = 'ambient', position = 'both' }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clouds = containerRef.current.querySelectorAll('[data-cloud]');
    const tweens = [];

    tweens.push(
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
          delay: variant === 'accent' ? 1.2 : 0.5,
        }
      )
    );

    clouds.forEach((cloud) => {
      const idx = parseInt(cloud.dataset.idx, 10);
      const isRight = cloud.dataset.side === 'right';
      const sideDelay = isRight ? 2 : 0;
      const params = FLOAT_PARAMS[idx] || FLOAT_PARAMS[0];

      tweens.push(
        gsap.to(cloud, {
          y: params.yDist,
          duration: params.yDur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: sideDelay + idx * 0.8,
        }),
        gsap.to(cloud, {
          x: `+=${params.xDist}`,
          duration: params.xDur,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: sideDelay + idx * 0.5 + 0.5,
        })
      );
    });

    return () => tweens.forEach(t => t.kill());
  }, [mounted, variant, isMobile]);

  if (!mounted) return null;

  const layout = getLayout(variant, isMobile);
  const showLeft = position === 'both' || position === 'bottom-left';
  const showRight = position === 'both' || position === 'bottom-right';

  const renderCluster = (side) => {
    const isLeft = side === 'left';

    return (
      <div
        key={side}
        className={`absolute bottom-0 ${isLeft ? 'left-0' : 'right-0'}`}
        style={{ width: isMobile ? '55%' : '38%', height: '100%' }}
      >
        {layout.map((cloud, i) => {
          const def = CLOUD_DEFS[cloud.def];
          const [, , vbW, vbH] = def.viewBox.split(' ').map(Number);
          const h = cloud.w * (vbH / vbW);

          return (
            <svg
              key={`${side}-${i}`}
              data-cloud
              data-side={side}
              data-idx={i}
              className="absolute"
              viewBox={def.viewBox}
              style={{
                width: cloud.w,
                height: h,
                bottom: cloud.bottom,
                [isLeft ? 'left' : 'right']: cloud.offset,
                willChange: 'transform',
              }}
            >
              <g opacity={cloud.opacity}>
                {def.shapes.map((s, j) =>
                  s.t === 'c'
                    ? <circle key={j} cx={s.cx} cy={s.cy} r={s.r} fill="white" />
                    : <ellipse key={j} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} fill="white" />
                )}
              </g>
            </svg>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: variant === 'ambient' ? 10 : 1, opacity: 0, overflow: 'visible' }}
    >
      {showLeft && renderCluster('left')}
      {showRight && renderCluster('right')}
    </div>
  );
}
