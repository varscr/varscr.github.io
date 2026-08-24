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

export type Project = {
  name: string
  note?: string
  stack: string
  bullets: string[]
}

export type Certification = { name: string; year: string }

export type Reference = { name: string; role: string; contact: string }

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

/**
 * CV-only. Deliberately capability-level: no domains, IP addresses, client names
 * or service hostnames from the infra notes reach a document that gets uploaded
 * to job boards.
 */
export const projects: Project[] = [
  {
    name: 'Self-hosted infrastructure',
    stack: 'Linux, Docker Compose, Tailscale, Caddy, Cloudflare Tunnel',
    bullets: [
      'Run an always-on Linux server with a Docker Compose stack split across two deliberately separate access planes — a public tunnel for what should be reachable, and a private Tailscale network fronted by Caddy with real certificates for everything administrative.',
      'Self-host a photo library replacing Google Photos, a finance notification ingest service, and container monitoring, with automated update sweeps and a bare-metal disaster-recovery runbook.',
    ],
  },
  {
    name: 'Kargo',
    stack: 'Nuxt 3, Nitro, Drizzle ORM, PostgreSQL, Docker',
    bullets: [
      'Multi-tenant business operations tool covering products, categories, services and sales for a vehicle parts business.',
      'Cut the schema from 12 tables to 5 when the original scope outgrew what the business actually needed — the removals were the design work.',
    ],
  },
  {
    name: 'Personal API',
    stack: 'FastAPI, Python, OAuth 2.0, AI chat interface',
    bullets: [
      'FastAPI service unifying my own Google data across three accounts behind one plugin interface, so each source is a plugin rather than a special case.',
      'Stores nothing — it queries live instead of mirroring, which removed sync cursors, periodic re-baselines and deletion tombstones from the design entirely.',
      'Agent-facing by design: an AI assistant queries it directly over HTTP. Built as REST rather than an MCP server so cron jobs, shell scripts and a chat client can all call the same endpoints.',
    ],
  },
]

export const certifications: Certification[] = [
  { name: 'Angular & OpenAI API', year: '2024' },
  { name: 'Spring Boot', year: '2024' },
  { name: 'Java: Zero to Expert', year: '2023' },
  { name: 'SOLID & Clean Code', year: '2022' },
  { name: 'Node.js: Zero to Expert', year: '2022' },
  { name: 'TypeScript Complete', year: '2022' },
  { name: 'Git & GitHub Pro', year: '2022' },
]

export const references: Reference[] = [
  { name: 'Gustavo Lemos', role: 'VP, Product & Operations, Janover', contact: 'gustavo@janover.co' },
  { name: 'Daniel Castillo Salej', role: 'Senior Software Developer', contact: '+57 301 163 7446' },
  { name: 'Alejandro Bermúdez Rojas', role: 'Tech Lead', contact: '+57 305 706 6856' },
]

/** The CV's ABOUT block — longer and more formal than the portfolio's lead. */
export const about =
  'AI-focused Full-Stack Engineer with production experience on multi-agent conversational AI platforms and scalable web applications. Contributed to an enterprise AI system serving 12+ specialized chatbots, working on dynamic agent instantiation, distributed locking and context compaction for long-running LLM sessions. Currently an AI Developer at NeuralSeek and TechD, and pursuing a Master’s in Artificial Intelligence.'

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
    title: 'Freelance Developer',
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
      'Contributed to Burrito, a multi-agent conversational AI platform routing 12+ specialised agents, and built features across the core fintech product.',
    bullets: [
      'Contributed to Burrito, an internal multi-agent conversational AI platform on FastAPI serving 12+ specialised chatbots with dynamic routing and fallback.',
      'Worked on the AgentFactory pattern for dynamic agent instantiation, on distributed locking for concurrent AI sessions, and on context compaction for token limits across long multi-turn conversations.',
      'Built front-end and back-end features across the core fintech platform — Nuxt, Nitro, TypeScript and MongoDB — including Auth0 and JWT authentication flows and GitHub Actions CI/CD.',
    ],
    tags: ['FastAPI', 'Nuxt', 'MongoDB'],
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
    org: 'Teleperformance',
    title: 'Bilingual Application Analyst',
    location: 'Bogotá, Colombia · via Infotrans',
    start: 'Jan 2024',
    end: 'May 2024',
    summary:
      'Databases, IIS and Tomcat servers, and Avaya IVR deployments — placed at Teleperformance by the staffing agency Infotrans, then hired directly three weeks later.',
    bullets: [
      'Supported, troubleshot and validated errors in the client’s internal applications as a bilingual analyst.',
      'Administered databases, maintaining their integrity and availability.',
      'Maintained IIS servers and deployed applications to Tomcat, including Avaya IVRs.',
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
    institution: 'Udacity',
    programme: "Master's in Artificial Intelligence",
    start: 'Jan 2026',
    end: 'Jun 2027',
    note: 'expected',
  },
  {
    institution: 'UniHorizonte',
    programme: 'B.S. in Software Engineering',
    start: 'Feb 2021',
    end: 'Nov 2023',
  },
  {
    institution: 'UniHorizonte',
    programme: 'Diploma in Cybersecurity',
    start: 'Jun 2023',
    end: 'Aug 2023',
  },
  {
    institution: 'SENA',
    programme: 'Multimedia Technology',
    start: 'Feb 2019',
    end: 'Aug 2020',
  },
]

export const stack: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java'],
  Frameworks: ['FastAPI', 'Nuxt', 'Next', 'NestJS', 'Node', 'Vue', 'Tailwind'],
  Data: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Drizzle', 'Prisma'],
  Infrastructure: ['Docker', 'Linux', 'Git', 'GitHub Actions', 'AWS', 'Cloudflare Workers', 'Auth0', 'JWT'],
  AI: ['Multi-agent systems', 'LLM orchestration', 'Prompt engineering', 'RAG', 'Context compaction', 'Token management'],
  Tools: ['Cursor', 'Claude Code', 'BrowserStack', 'Postman'],
}

export const spokenLanguages = [
  { name: 'Spanish', level: 'Native' },
  { name: 'English', level: 'Advanced (B2/C1)' },
]
