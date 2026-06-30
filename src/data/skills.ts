import type { Skill, SkillCategory } from '../types';

export const skills: Skill[] = [
  { name: 'Python', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'C#', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },
  { name: 'Apex', category: 'Languages' },
  { name: 'HTML/CSS', category: 'Languages' },

  { name: 'React', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Lightning Web Components', category: 'Frontend' },
  { name: 'Responsive Design', category: 'Frontend' },
  { name: 'Component Architecture', category: 'Frontend' },

  { name: 'Django', category: 'Backend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: '.NET', category: 'Backend' },
  { name: 'RESTful API Design', category: 'Backend' },
  { name: 'Microservices', category: 'Backend' },

  { name: 'Microsoft Azure', category: 'Cloud & DevOps' },
  { name: 'Google Cloud Platform', category: 'Cloud & DevOps' },
  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'CI/CD', category: 'Cloud & DevOps' },
  { name: 'Azure DevOps', category: 'Cloud & DevOps' },
  { name: 'GitHub Actions', category: 'Cloud & DevOps' },

  { name: 'Salesforce', category: 'Platforms' },
  { name: 'ServiceNow (HRSD)', category: 'Platforms' },
  { name: 'n8n', category: 'Platforms' },

  { name: 'OpenAI API', category: 'AI & Automation' },
  { name: 'Anthropic API', category: 'AI & Automation' },
  { name: 'LangChain', category: 'AI & Automation' },
  { name: 'LangGraph', category: 'AI & Automation' },
  { name: 'Agentic AI', category: 'AI & Automation' },
  { name: 'RAG', category: 'AI & Automation' },
  { name: 'Voice AI', category: 'AI & Automation' },

  { name: 'PostgreSQL', category: 'Data' },
  { name: 'MySQL', category: 'Data' },
  { name: 'Oracle', category: 'Data' },
  { name: 'Data Migration', category: 'Data' },
  { name: 'Query Optimisation', category: 'Data' },

  { name: 'REST / SOAP', category: 'Integration' },
  { name: 'GraphQL', category: 'Integration' },
  { name: 'OAuth 2.0', category: 'Integration' },
  { name: 'JWT', category: 'Integration' },
  { name: 'Webhooks', category: 'Integration' },
];

export const categoryColors: Record<SkillCategory, string> = {
  Languages: '#f59e0b',
  Frontend: '#3b82f6',
  Backend: '#10b981',
  'Cloud & DevOps': '#8b5cf6',
  Platforms: '#ec4899',
  'AI & Automation': '#06b6d4',
  Data: '#f97316',
  Integration: '#14b8a6',
};

export const categoryOrder: SkillCategory[] = [
  'Languages',
  'Frontend',
  'Backend',
  'Cloud & DevOps',
  'Platforms',
  'AI & Automation',
  'Data',
  'Integration',
];
