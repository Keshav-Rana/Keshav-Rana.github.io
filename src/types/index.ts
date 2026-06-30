export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  dateRange: string;
  type: 'full-time' | 'internship' | 'contract' | 'part-time';
  summary: string;
  achievements: string[];
  techStack: string[];
  color: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type SkillCategory =
  | 'Languages'
  | 'Frontend'
  | 'Backend'
  | 'Cloud & DevOps'
  | 'Platforms'
  | 'AI & Automation'
  | 'Data'
  | 'Integration';

export interface Certification {
  name: string;
  issuer: string;
  color: string;
}

export interface CoreStrength {
  title: string;
  description: string;
  icon: string;
}
