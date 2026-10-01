import { Code, Gamepad2, MapPin, Code2 } from 'lucide-react';

const workExperiences = [
  {
    id: 4,
    role: 'Software Engineer',
    company: 'Human Powered Health Technologies',
    location: 'Hyderabad, Telangana',
    duration: 'July 2026 — Present',
    employmentType: 'Full-time',
    icon: Code2,
    accent: '#4ade80',
  },
  {
    id: 1,
    role: 'Software Engineer Intern',
    company: 'Human Powered Health Technologies',
    location: 'Hyderabad, Telangana',
    duration: 'Jan 2026 — June 2026',
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
  return <section className="journal-section journal-work" id="work" aria-labelledby="work-title">
    <div className="journal-section-label">02 / THE JOURNEY</div>
    <div className="journal-section-heading"><h2 id="work-title">Work Experience</h2><span className="journal-heading-note">A few chapters so far.</span></div>
    <ol className="journal-experiences">
      {workExperiences.map((exp,index) => {
        const Icon = exp.icon;
        return <li className="experience-row journal-experience" key={exp.id}>
          <div className="journal-experience-meta"><span className="journal-experience-index" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><span className="journal-date">{exp.duration}</span></div>
          <div className="journal-experience-content"><h3>{exp.role}</h3><p>{exp.company}{exp.employmentType ? ` · ${exp.employmentType}` : ''}</p><span className="journal-location"><MapPin size={13} aria-hidden="true" />{exp.location}</span></div>
          <Icon className="journal-role-icon" size={22} aria-hidden="true" />
        </li>;
      })}
    </ol>
  </section>;
}
