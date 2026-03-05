'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Code, Gamepad2, MapPin, Computer, Code2 } from 'lucide-react';
import { useState } from 'react';

const workExperiences = [
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Human Powered Health Technologies',
    location: 'Hyderabad, Telangana',
    duration: 'Jan 2026 — Present',
    icon: Code2,
    accent: '#4ade80',
  },
  {
    id: 2,
    role: 'Frontend Developer Intern',
    company: 'Human Powered Health Technologies',
    location: 'Hyderabad, Telangana',
    duration: 'May 2025 — July 2025',
    icon: Code,
    accent: '#22d3ee',
  },
  {
    id: 3,
    role: 'Game Developer Intern',
    company: 'Caarya',
    location: 'Remote',
    duration: 'May 2024 — July 2024',
    icon: Gamepad2,
    accent: '#f87171',
  },
];

export default function WorkExperience() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 md:mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-light text-white mb-4 font-mono">
          Work Experience
        </h2>
        <div className="h-px w-24 bg-linear-to-r from-blue-500 via-red-500 to-yellow-500" />
      </motion.div>

      {/* Top rule */}
      <div className="h-px bg-gradient-to-r from-white/15 via-white/8 to-transparent" />

      {/* Experience Rows */}
      {workExperiences.map((exp, index) => {
        const Icon = exp.icon;
        const isActive = hoveredId === exp.id;

        return (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: index * 0.12 }}
          >
            <div
              className="group relative cursor-default overflow-hidden"
              onMouseEnter={() => setHoveredId(exp.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Left accent bar */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] origin-top"
                style={{ backgroundColor: exp.accent }}
                initial={false}
                animate={{
                  scaleY: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Hover background wash */}
              <motion.div
                className="absolute inset-0 -z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(100deg, ${exp.accent}0a 0%, transparent 50%)`,
                }}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="relative py-8 md:py-10 pl-6 md:pl-10 pr-4 md:pr-8 flex items-start gap-5 md:gap-10">
                {/* Giant index number */}
                <motion.span
                  className="hidden md:block text-[5.5rem] leading-none font-mono font-bold select-none"
                  initial={false}
                  animate={{
                    color: isActive ? exp.accent : 'rgba(255,255,255,0.04)',
                    x: isActive ? 4 : 0,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                {/* Mobile index */}
                <motion.span
                  className="md:hidden text-4xl leading-none font-mono font-bold select-none pt-1"
                  initial={false}
                  animate={{
                    color: isActive ? exp.accent : 'rgba(255,255,255,0.06)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-1 md:pt-2">
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6">
                    <motion.h3
                      className="text-lg md:text-[1.65rem] font-semibold text-white font-mono leading-tight"
                      initial={false}
                      animate={{ x: isActive ? 4 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {exp.role}
                    </motion.h3>

                    <span className="text-xs md:text-sm text-white/35 font-mono whitespace-nowrap tabular-nums tracking-wide">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-sm md:text-base text-white/55 mt-1.5 font-mono">
                    {exp.company}
                  </p>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-5 mt-4 pt-4 border-t border-white/[0.06]">
                          <div className="flex items-center gap-2 text-white/45">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="text-xs md:text-sm font-mono">{exp.location}</span>
                          </div>

                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              duration: 0.4,
                              delay: 0.1,
                              type: 'spring',
                              stiffness: 260,
                              damping: 20,
                            }}
                            className="w-7 h-7 rounded-lg flex items-center justify-center"
                          >
                            <Icon
                              className="w-3.5 h-3.5"
                              style={{ color: exp.accent }}
                            />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-white/15 via-white/8 to-transparent" />
          </motion.div>
        );
      })}
    </div>
  );
}
