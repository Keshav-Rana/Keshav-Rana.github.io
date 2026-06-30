import { useState, useEffect, useRef } from 'react';
import type { Skill, SkillCategory } from '../../types';
import { categoryColors, categoryOrder } from '../../data/skills';

interface Props {
  skills: Skill[];
}

const categoryIcons: Record<SkillCategory, string> = {
  Languages: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
  Frontend: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  Backend: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01',
  'Cloud & DevOps': 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
  Platforms: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
  'AI & Automation': 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  Data: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4',
  Integration: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
};

export default function SkillGrid({ skills }: Props) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>(
    'All'
  );
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const grouped = categoryOrder.reduce((acc, category) => {
    acc[category] = skills.filter((s) => s.category === category);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const filteredCategories =
    activeCategory === 'All'
      ? categoryOrder
      : categoryOrder.filter((c) => c === activeCategory);

  return (
    <div ref={ref}>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            activeCategory === 'All'
              ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
              : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          All
        </button>
        {categoryOrder.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? 'text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
            style={
              activeCategory === category
                ? {
                    backgroundColor: categoryColors[category],
                    boxShadow: `0 10px 25px ${categoryColors[category]}30`,
                  }
                : undefined
            }
          >
            {category}
          </button>
        ))}
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category, catIndex) => (
          <div
            key={category}
            className={`card transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: `${catIndex * 80}ms`,
              borderColor: `${categoryColors[category]}30`,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${categoryColors[category]}15` }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke={categoryColors[category]}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={categoryIcons[category]}
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{category}</h3>
                <p className="text-xs text-slate-500">
                  {grouped[category].length} skills
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {grouped[category].map((skill, skillIndex) => (
                <span
                  key={skill.name}
                  className={`skill-tag text-xs transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-90'
                  }`}
                  style={{
                    transitionDelay: `${catIndex * 80 + skillIndex * 40}ms`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
