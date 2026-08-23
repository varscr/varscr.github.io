export type Link = { label: string; href: string; display: string }

export type Role = {
  org: string
  title: string
  location?: string
  start: string
  end: string | 'present'
  summary: string
  bullets: string[]
  tags?: string[]
}

export type Work = {
  name: string
  context: string
  body: string
  tags: string[]
}

export type Education = {
  institution: string
  programme: string
  start: string
  end: string
  note?: string
}

export type Profile = {
  name: string
  role: string
  keywords: string
  photo: { webp: string; jpg: string; alt: string }
  lead: string
  now: string
  email: string
  links: Link[]
}

export const profile: Profile = {
  name: 'Fabio Vargas',
  role: 'AI & Full-Stack Engineer',
  keywords: 'TypeScript · Python · FastAPI · Multi-agent AI platforms',
  photo: {
    webp: '/fabio.webp',
    jpg: '/fabio.jpg',
    alt: 'Fabio Vargas',
  },
  lead: 'I build AI-powered platforms — multi-agent systems, LLM orchestration, and the backends that hold them up. At Janover I contributed to Burrito, a production platform routing 12+ specialised chatbots. I am now an AI Developer at NeuralSeek and TechD, and partway through a master’s in AI at Udacity.',
  now: 'AI Developer at NeuralSeek and TechD — remote from Bogotá.',
  email: 'fhvargas.work@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/varscr', display: 'github.com/varscr' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/fabio-vargas', display: 'linkedin.com/in/fabio-vargas' },
  ],
}

/** Portfolio only — the two pieces of work worth reading about. */
export const selectedWork: Work[] = [
  {
    name: 'Burrito',
    context: 'Janover',
    body: 'A production multi-agent conversational AI platform serving 12+ specialised chatbots with dynamic routing and fallback, on Azure OpenAI and FastAPI. I contributed the AgentFactory pattern for dynamic agent instantiation, MongoDB distributed locking so concurrent sessions could not corrupt shared state, and context compaction to hold long multi-turn conversations inside model token limits.',
    tags: ['FastAPI', 'Azure OpenAI', 'MongoDB'],
  },
  {
    name: 'Manasara',
    context: 'Independent',
    body: 'A luxury real estate site for a client in Indonesia, running on Cloudflare Workers. Built end to end — layout, content model, and deployment — and verified across browsers and iOS devices with BrowserStack.',
    tags: ['Cloudflare Workers', 'TypeScript'],
  },
]

export const roles: Role[] = [
  {
    org: 'NeuralSeek',
    title: 'AI Developer',
    location: 'Florida, United States · remote',
    start: 'Apr 2026',
    end: 'present',
    summary: 'Building on NeuralSeek, an enterprise platform for LLM applications.',
    bullets: [
      'Develop features for NeuralSeek, an enterprise platform for building and governing LLM applications.',
    ],
    tags: ['Python', 'LLM platforms'],
  },
  {
    org: 'TechD',
    title: 'AI Developer',
    location: 'Florida, United States · remote',
    start: 'Apr 2026',
    end: 'present',
    summary: 'AI and full-stack development at TechD (Tech Dynamics), an IBM Platinum business partner.',
    bullets: [
      'AI and full-stack development at TechD (Tech Dynamics), an IBM Platinum business partner.',
    ],
    tags: ['TypeScript', 'Python'],
  },
  {
    org: 'Independent Contractor',
    title: 'Software Engineer',
    location: 'Remote',
    start: 'Jan 2026',
    end: 'Apr 2026',
    summary:
      'Built Manasara, a luxury real estate platform for a client in Indonesia, on Cloudflare Workers.',
    bullets: [
      'Built and shipped Manasara, a luxury real estate site for a client in Indonesia, running on Cloudflare Workers.',
      'Verified responsive layouts across browsers and iOS devices with BrowserStack.',
    ],
    tags: ['Cloudflare Workers', 'TypeScript'],
  },
  {
    org: 'Janover',
    title: 'Full-Stack Software Developer',
    location: 'Florida, United States',
    start: 'Jun 2025',
    end: 'Jan 2026',
    summary:
      'Built features across Burrito, a multi-agent conversational AI platform routing 12+ specialised agents, and the core fintech product.',
    bullets: [
      'Developed features for Burrito, a multi-agent conversational AI platform on FastAPI and Azure OpenAI serving 12+ specialised chatbots with dynamic routing and fallback.',
      'Worked on the AgentFactory pattern for dynamic agent instantiation.',
      'Implemented MongoDB distributed locking to keep concurrent AI sessions from corrupting shared state.',
      'Contributed context compaction to hold long multi-turn conversations inside model token limits.',
      'Developed features in the core fintech platform — Nuxt, Nitro, TypeScript and MongoDB — with Auth0 and JWT authentication and GitHub Actions CI/CD.',
    ],
    tags: ['FastAPI', 'Azure OpenAI', 'Nuxt', 'MongoDB'],
  },
  {
    org: 'Teleperformance',
    title: 'Application Support Engineer',
    location: 'Bogotá, Colombia',
    start: 'Jun 2024',
    end: 'May 2025',
    summary: 'Ran production Linux and IIS servers behind critical database systems.',
    bullets: [
      'Managed production Linux and IIS servers for critical database systems, owning stability and performance.',
      'Diagnosed application crashes from logs alongside clients and development teams.',
      'Automated repetitive operational tasks with scripting.',
      'Wrote internal documentation centralising recurring issues for the team.',
    ],
    tags: ['Linux', 'IIS', 'SQL Server'],
  },
  {
    org: 'PBS Group',
    title: 'Bilingual Application Analyst',
    location: 'Bogotá, Colombia',
    start: 'Jan 2024',
    end: 'May 2024',
    summary:
      'Databases, IIS and Tomcat servers, and Avaya IVR deployments for internal applications.',
    bullets: [
      'Administered databases, maintaining their integrity and availability.',
      'Maintained IIS servers and deployed applications to Tomcat, including Avaya IVRs.',
      'Troubleshot internal applications to improve stability and performance.',
    ],
    tags: ['IIS', 'Tomcat', 'Avaya'],
  },
]

export const earlierCareer = {
  label: 'Earlier — graphic design & multimedia',
  items: ['Cámara de Comercio de Bogotá (2020)', 'ACIEM (2021)'],
}

export const education: Education[] = [
  {
    institution: 'Udacity Institute of AI & Technology',
    programme: 'MS, Artificial Intelligence',
    start: 'Jan 2026',
    end: 'Jun 2027',
    note: 'expected',
  },
  {
    institution: 'Fundación Universitaria Horizonte',
    programme: 'BSc, Computer Software Engineering',
    start: 'Jan 2020',
    end: 'Nov 2023',
    note: 'acta de grado April 2026',
  },
  {
    institution: 'Fundación Universitaria Horizonte',
    programme: 'Diplomado en Ciberseguridad',
    start: 'Jun 2023',
    end: 'Aug 2023',
  },
  {
    institution: 'SENA',
    programme: 'Tecnólogo en Producción Multimedia',
    start: 'Feb 2019',
    end: 'Aug 2020',
  },
  {
    institution: 'SENA',
    programme: 'Técnico en Programación de Software',
    start: 'Feb 2016',
    end: 'Nov 2018',
  },
]

export const stack: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C# (.NET)'],
  Frameworks: ['FastAPI', 'Nuxt', 'Next', 'NestJS', 'Node', 'Vue', 'Tailwind'],
  Data: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Drizzle', 'Prisma'],
  Infrastructure: ['Docker', 'Linux', 'Git', 'GitHub Actions', 'AWS', 'Cloudflare Workers', 'Auth0', 'JWT'],
  AI: ['Multi-agent systems', 'LLM orchestration', 'Prompt engineering', 'Azure OpenAI', 'Context compaction', 'Token management'],
  Tools: ['Cursor', 'Claude Code', 'BrowserStack', 'Postman'],
}

export const languages = 'Spanish (native) · English (professional working, B2/C1)'
