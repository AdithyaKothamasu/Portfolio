"use client";

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

export default function CloudTransition({ triggered, onMidpoint, onComplete }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const root=containerRef.current;
    const clouds=Array.from(root.querySelectorAll('[data-tcloud]'));
    const width=window.innerWidth, height=window.innerHeight;
    const positions=[[-width*.4,height*.34],[width*.4,height*.34],[-width*.55,-height*.55],[width*.55,-height*.55],[0,-height*.62],[0,height*.52]];
    const curtain=root.querySelector('.sky-intro-curtain');
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){if(triggered){onMidpoint();onComplete();}return;}
    gsap.set(root,{opacity:1});
    gsap.set(curtain,{opacity:0});
    clouds.forEach((cloud,i)=>gsap.set(cloud,{x:positions[i][0],y:positions[i][1],scale:i===0?.74:.66,opacity:i<2?.8:0,force3D:true}));
    if(!triggered)return;
    const coveredAt=1.175,exitAt=coveredAt+.12;
    const timeline=gsap.timeline({onComplete});
    timeline.to(clouds,{x:0,y:0,scale:3,opacity:1,duration:1.05,ease:'power2.inOut',stagger:.025,force3D:true},0);
    timeline.to(curtain,{opacity:1,duration:.25,ease:'sine.inOut'},coveredAt-.25);
    timeline.call(onMidpoint,[],coveredAt);
    timeline.to(clouds,{x:i=>positions[i][0]*1.4,y:i=>positions[i][1]*1.4,scale:.6,duration:1.65,ease:'power2.out',force3D:true},exitAt);
    timeline.to(curtain,{opacity:0,duration:.45,ease:'sine.inOut'},exitAt+.1);
    timeline.to(root,{opacity:0,duration:.6,ease:'sine.inOut'},exitAt+1.05);
    return()=>timeline.kill();
  },[triggered,onMidpoint,onComplete]);
  return <div ref={containerRef} className="sky-intro-transition" aria-hidden="true"><div className="sky-intro-curtain" />
    {Array.from({length:6}).map((_,i)=><svg key={i} data-tcloud viewBox={CLOUD_DEF.viewBox} focusable="false"><g>{CLOUD_DEF.shapes.map((shape,j)=>shape.t==='c'?<circle key={j} cx={shape.cx} cy={shape.cy} r={shape.r} />:<ellipse key={j} cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} />)}</g></svg>)}
  </div>;
}
