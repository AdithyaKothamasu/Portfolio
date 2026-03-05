'use client';

import { motion } from 'framer-motion';
import { Code, Gamepad2, Calendar, MapPin, ExternalLink, FileX, Computer } from 'lucide-react';
import { useState } from 'react';
import TextPressure from './TextPressure';
const workExperiences = [
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Human Powered Health Technologies', // Update with actual company name
    location: 'Hyderabad, Telangana', // Update with actual location
    duration: 'Jan 2026 - Present',
    icon: Computer,
    color: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'border-green-500/30',
    iconColor: 'text-green-400',
    gradient: 'bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-transparent',
  },
  {
    id: 2,
    role: 'Frontend Developer Intern',
    company: 'Human Powered Health Technologies', // Update with actual company name
    location: 'Hyderabad, Telangana', // Update with actual location
    duration: 'May 2025 - July 2025',
    icon: Code,
    color: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    gradient: 'bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent',
  },
  {
    id: 3,
    role: 'Game Developer Intern',
    company: 'Caarya', // Update with actual company name
    location: 'Remote', // Update with actual location
    duration: 'May 2024 - July 2024', // e.g., 'Jan 2024 - May 2024'
    icon: Gamepad2,
    color: 'from-red-500/20 to-red-100/20',
    borderColor: 'border-red-500/30',
    iconColor: 'text-red-400',
    gradient: 'bg-gradient-to-br from-red-500/10 via-red-100/10 to-transparent',
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
        <div className="h-px w-24 bg-linear-to-r from-blue-500 via-red-500 to-yellow-500"></div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/50 via-red-500/50 to-transparent transform md:-translate-x-1/2"></div>

        {/* Experience Cards */}
        <div className="space-y-12 md:space-y-16">
          {workExperiences.map((experience, index) => {
            const Icon = experience.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-start md:items-center ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                onMouseEnter={() => setHoveredId(experience.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: hoveredId === experience.id ? 1.2 : 1,
                      rotate: hoveredId === experience.id ? 360 : 0,
                    }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${experience.gradient} border-2 ${experience.borderColor} backdrop-blur-sm flex items-center justify-center shadow-lg`}
                  >
                    <Icon className={`w-6 h-6 md:w-8 md:h-8 ${experience.iconColor}`} />
                  </motion.div>
                </div>

                {/* Experience Card */}
                <motion.div
                  animate={{
                    scale: hoveredId === experience.id ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex-1 ml-6 md:ml-0 ${
                    isEven ? 'md:mr-8' : 'md:ml-8'
                  } md:w-[calc(50%-60px)]`}
                >
                  <div
                    className={`relative p-6 md:p-8 rounded-2xl backdrop-blur-xl bg-white/5 border ${experience.borderColor} ${experience.gradient} transition-all duration-300`}
                  >
                    {/* Glow Effect */}
                    {hoveredId === experience.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`absolute inset-0 rounded-2xl ${experience.color} blur-xl -z-10`}
                      />
                    )}

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-lg md:text-2xl font-semibold text-white mb-1 font-mono">
                          {experience.role}
                        </h3>
                        <p className="text-md text-white/80 font-light">{experience.company}</p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    {/* Hover Indicator */}
                    {hoveredId === experience.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-4 right-4"
                      >
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

