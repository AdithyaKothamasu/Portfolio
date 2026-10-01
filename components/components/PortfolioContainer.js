"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import MainPage from './page';
import EntryScreen from './EntryScreen';
import CloudTransition from './CloudTransition';

export default function PortfolioContainer() {
  const [phase,setPhase]=useState('intro');
  const shouldFocus=useRef(false);
  const handleEnter=useCallback(()=>{
    shouldFocus.current=document.activeElement?.classList.contains('sky-entry-prompt');
    setPhase(current=>current==='intro'?(window.matchMedia('(prefers-reduced-motion: reduce)').matches?'ready':'covering'):current);
  },[]);
  const handleMidpoint=useCallback(()=>setPhase('revealing'),[]);
  const handleComplete=useCallback(()=>setPhase('ready'),[]);
  const entering=phase==='covering'||phase==='revealing';
  useEffect(()=>{
    if(!entering)return;
    const fallback=setTimeout(handleComplete,4000);
    const media=window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange=()=>{if(media.matches)handleComplete();};
    media.addEventListener('change',onMotionChange);
    return()=>{clearTimeout(fallback);media.removeEventListener('change',onMotionChange);};
  },[entering,handleComplete]);
  useEffect(()=>{if(phase==='ready'&&shouldFocus.current)document.querySelector('.journal-wordmark')?.focus({preventScroll:true});},[phase]);
  return <div className="journal-shell" data-intro-phase={phase}>
    <div className="sky-aurora" aria-hidden="true"><span className="sky-cloud sky-cloud-east" /><span className="sky-cloud sky-cloud-west" /><span className="sky-cloud sky-cloud-low" /></div>
    <div className="journal-main-layer" aria-hidden={phase!=='ready'} inert={phase!=='ready'}><MainPage /></div>
    {phase!=='ready'&&<EntryScreen onEnter={handleEnter} paused={entering} />}
    {phase!=='ready'&&<CloudTransition triggered={entering} onMidpoint={handleMidpoint} onComplete={handleComplete} />}
  </div>;
}
