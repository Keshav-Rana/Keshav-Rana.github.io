export const profile = {
  name: 'Keshav Rana',
  title: 'Software Engineer',
  subtitle: 'Full-Stack · Cloud · Enterprise Platforms · AI',
  tagline: 'Building end-to-end solutions to deliver business outcomes.',
  location: 'Adelaide, SA, Australia',
  email: 'krana1583@gmail.com',
  phone: '+61 415 180 332',
  linkedin: 'https://linkedin.com/in/r-keshav',
  github: 'https://github.com/Keshav-Rana',
  website: 'https://keshav-rana.github.io',
  resume:
    'https://drive.google.com/file/d/13GZrO-C18Gr4XCRTRi9BHYSd9vPrwIW4/view?usp=sharing',
  summary:
    'Versatile software engineer who has delivered production systems across multiple enterprise ecosystems including Salesforce, ServiceNow, and open-source full-stack/cloud — in both fast-moving startups and structured public-sector teams. Strong systems-architecture thinking from frontend UI through backend microservices to CI/CD and cloud infrastructure.',
  education: {
    degree: 'Bachelor of Computer Science',
    university: 'University of Adelaide',
    years: '2022 — 2024',
    subjects: [
      'Distributed Systems',
      'Operating Systems',
      'Web & Database Computing',
      'Algorithm Design & Data Structures',
      'Object-Oriented Programming',
    ],
    awards: ['Global Citizens Scholarship', 'Summer Research Scholarship'],
  },
} as const;

export const coreStrengths = [
  {
    title: 'Systems Architecture',
    description:
      'Designing how components fit together across the full stack — scalability, maintainability, security.',
    icon: 'blueprint',
  },
  {
    title: 'Rapid Adaptability',
    description:
      'Picks up new platforms, domains and ways of working fast — moved between Salesforce, full-stack/cloud and ServiceNow in under two years.',
    icon: 'lightning',
  },
  {
    title: 'End-to-End Delivery',
    description:
      'Owns work from requirements and design through build, testing, deployment and ongoing support.',
    icon: 'rocket',
  },
  {
    title: 'Pressure Decisions',
    description:
      'Comfortable in both fast-paced startup and slower, process-driven public-sector environments.',
    icon: 'target',
  },
  {
    title: 'Cross-Sector Experience',
    description:
      'Delivered for private startups and enterprises as well as a state government department.',
    icon: 'globe',
  },
] as const;
