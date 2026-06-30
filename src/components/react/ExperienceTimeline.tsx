import { useState, useEffect, useRef } from 'react';
import type { ExperienceItem } from '../../types';

interface Props {
  experiences: ExperienceItem[];
}

export default function ExperienceTimeline({ experiences }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());
  const [lineHeight, setLineHeight] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleCards((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = rect.height;
      const scrolled = Math.max(0, windowHeight * 0.4 - rect.top);
      const percentage = Math.min(100, (scrolled / totalHeight) * 100);
      setLineHeight(percentage);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={timelineRef} className="relative">
      {/* Timeline line - desktop center */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-slate-800">
        <div
          className="w-full bg-gradient-to-b from-indigo-500 to-cyan-500 transition-all duration-100 ease-out"
          style={{ height: `${lineHeight}%` }}
        />
      </div>

      {experiences.map((exp, index) => {
        const isLeft = index % 2 === 0;
        const isVisible = visibleCards.has(exp.id);
        const isExpanded = expandedId === exp.id;

        return (
          <div
            key={exp.id}
            data-id={exp.id}
            ref={(el) => {
              if (el) cardRefs.current.set(exp.id, el);
            }}
            className={`relative flex items-start mb-12 md:mb-16 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            } ${
              isLeft
                ? 'md:flex-row md:pr-[50%]'
                : 'md:flex-row-reverse md:pl-[50%]'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Timeline node */}
            <div
              className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-500 ${
                isVisible
                  ? 'border-indigo-400 bg-indigo-500 shadow-lg shadow-indigo-500/50'
                  : 'border-slate-600 bg-slate-800'
              }`}
              style={{ top: '24px' }}
            />

            {/* Card */}
            <div
              className={`ml-12 md:ml-0 ${
                isLeft ? 'md:mr-8' : 'md:ml-8'
              } flex-1 cursor-pointer`}
              onClick={() => setExpandedId(isExpanded ? null : exp.id)}
            >
              <div
                className="card group"
                style={{
                  borderColor: isExpanded ? `${exp.color}40` : undefined,
                  boxShadow: isExpanded
                    ? `0 0 30px ${exp.color}15`
                    : undefined,
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span
                      className="inline-block px-2 py-0.5 text-xs rounded-full mb-2 font-medium"
                      style={{
                        backgroundColor: `${exp.color}15`,
                        color: exp.color,
                      }}
                    >
                      {exp.type === 'full-time'
                        ? 'Full-time'
                        : exp.type === 'internship'
                        ? 'Internship'
                        : exp.type === 'contract'
                        ? 'Contract'
                        : 'Part-time'}
                    </span>
                    <h3 className="text-lg font-semibold text-white">
                      {exp.role}
                    </h3>
                    <p className="text-indigo-400 font-medium text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm text-slate-400">{exp.dateRange}</p>
                    <p className="text-xs text-slate-500">{exp.location}</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-3">{exp.summary}</p>

                {/* Expanded content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-2 mb-4 pt-3 border-t border-slate-800">
                    {exp.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: exp.color }}
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech) => (
                      <span key={tech} className="skill-tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expand indicator */}
                <div className="flex items-center justify-center mt-3">
                  <svg
                    className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
