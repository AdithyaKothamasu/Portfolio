"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, X } from 'lucide-react';

export default function ProjectsShowcase({ projects = [] }) {
  const [selectedProject,setSelectedProject] = useState(null);
  return <section className="journal-section journal-projects" id="projects" aria-labelledby="projects-title">
    <div className="journal-section-label">03 / BUILT & BUILDING</div>
    <div className="journal-section-heading"><h2 id="projects-title">Projects</h2><span className="journal-heading-note">Useful things. Fun things. A bit of both.</span></div>
    <div className="journal-project-grid">{projects.map((project,index) => <article className="journal-project-card" key={project.id}>
      <div className="journal-project-image"><Image src={project.imgSrc} alt={project.title} fill sizes="(max-width: 700px) 100vw, 560px" className="object-contain" /></div>
      <div className="journal-project-copy"><span className="journal-project-index" aria-hidden="true">PROJECT / {String(index+1).padStart(2,'0')}</span><h3>{project.title}</h3><p>{project.description}</p><button className="journal-project-open" onClick={()=>setSelectedProject(project)} aria-label={`Read about ${project.title}`}>Explore project<ArrowUpRight size={18} aria-hidden="true" /></button></div>
    </article>)}</div>
    {selectedProject && <ProjectModal project={selectedProject} onClose={()=>setSelectedProject(null)} />}
  </section>;
}

function ProjectModal({project,onClose}) {
  const dialog = useRef(null);
  useEffect(()=>{const element=dialog.current;element.showModal();return()=>{if(element.open)element.close()};},[]);
  return <dialog ref={dialog} className="journal-dialog" aria-labelledby="project-dialog-title" onClose={onClose} onKeyDown={event=>{
      if(event.key!=='Tab')return;
      const controls=Array.from(dialog.current.querySelectorAll('button,a[href]'));
      const current=controls.indexOf(document.activeElement);
      const next=(current+(event.shiftKey?-1:1)+controls.length)%controls.length;
      event.preventDefault();controls[next].focus();
    }} onClick={event=>{if(event.target===event.currentTarget)dialog.current.close();}}>
    <button className="journal-dialog-close" aria-label="Close project" onClick={()=>dialog.current.close()}><X size={22} aria-hidden="true" /></button>
    <div className="journal-dialog-image"><Image src={project.imgSrc} alt={project.title} fill sizes="800px" className="object-contain" /></div>
    <div className="journal-dialog-copy"><h2 id="project-dialog-title">{project.title}</h2><p>{project.description}</p><a className="journal-text-link" href={project.linkHref} target="_blank" rel="noopener noreferrer">Visit Project<ArrowUpRight size={18} aria-hidden="true" /></a></div>
  </dialog>;
}
