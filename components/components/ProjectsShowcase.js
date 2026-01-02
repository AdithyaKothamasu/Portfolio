'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProjectsShowcase({ projects = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4 font-mono">Projects</h2>
            <div className="h-px w-24 bg-linear-to-r from-blue-500 via-red-500 to-yellow-500"></div>
        </div>
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index, isHovered, onHover, onLeave, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="group relative h-[400px] md:h-[500px] cursor-pointer perspective-1000"
      style={{
        perspective: '1000px',
      }}
    >
      {/* 3D Container */}
      <motion.div
        className="relative h-full w-full rounded-2xl overflow-hidden"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={project.imgSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 group-hover:via-black/70 transition-all duration-300" />
        </motion.div>

        {/* Glassmorphism Border Glow */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl border-2 border-white/20 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 40px rgba(255, 255, 255, 0.1), inset 0 0 40px rgba(255, 255, 255, 0.05)',
            }}
          />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
          {/* Project Number */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isHovered ? 1 : 0.3, x: isHovered ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="text-6xl md:text-8xl font-bold text-white/10 mb-2 font-mono"
            style={{ lineHeight: 1 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2 font-mono"
          >
            {project.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0.7 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-white text-sm md:text-base mb-4 line-clamp-2 font-mono tracking-tight font-light leading-relaxed"
          >
            {project.description}
          </motion.p>

          {/* Action Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
              <span className="text-white text-sm font-medium">View Project</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          {/* Hover Indicator - Corner Accent */}
          {isHovered && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: -45 }}
              className="absolute top-4 right-4 w-16 h-16"
            >
              <div className="w-full h-full border-2 border-white/30 rounded-lg" />
            </motion.div>
          )}
        </div>

        {/* Shine Effect */}
        {isHovered && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{ transform: 'skewX(-20deg)' }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={project.imgSrc}
            alt={project.title}
            fill
            className="object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-mono">
            {project.title}
          </h2>
          <p className="text-white/80 text-lg mb-6 leading-relaxed font-mono tracking-tight font-light">
            {project.description}
          </p>

          {/* Link Button */}
          {project.linkHref && (
            <a
              href={project.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 text-white font-medium"
            >
              <span>Visit Project</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

