export const personalInfo = {
  name: "Fabio Vargas",
  title: "Full-stack Software Developer",
  primaryPositioning:
    "I build reliable, production-ready web applications with a strong focus on clean architecture, scalable APIs, and maintainable front-end systems using modern JavaScript and TypeScript.",
  expandedPositioning:
    "I'm a full-stack developer with hands-on experience building and maintaining real production systems. My work spans front-end and back-end development, including authentication flows, REST APIs, database design, and CI/CD workflows. I prioritize clarity, maintainability, and long-term scalability over quick fixes.\n\nI'm especially comfortable working in codebases that require structure, discipline, and collaboration, and I value writing code that other developers can easily understand and extend.",
  backgroundSummary:
    "I have professional experience working on production web applications for a U.S.-based fintech company, where I contributed to full-stack features, secure authentication flows, and backend APIs. My background also includes application support and infrastructure exposure, which has shaped a pragmatic, reliability-focused approach to software development.\n\nIn addition to development, I have experience operating and troubleshooting applications in production environments, which helps me design systems with real-world constraints in mind.",
};

export const coreFocusAreas = [
  "Full-stack web development",
  "API design and integration",
  "Authentication and authorization",
  "Clean code and maintainable architectures",
  "Production-ready applications",
  "Developer productivity and tooling",
];

export const experience = {
  professionalExperience:
    "I worked as a full-stack developer on production web applications, contributing to both client-facing features and backend systems. My responsibilities included building reusable front-end components, implementing secure authentication and authorization flows, designing and integrating REST APIs, and collaborating on CI/CD workflows to improve deployment reliability.\n\nI also collaborated on projects that incorporated AI tools to enhance internal workflows and product capabilities, focusing on practical, developer-focused use cases rather than experimentation for its own sake.",
  projectPhilosophy:
    "I focus on building projects that resemble real production systems rather than isolated demos. I care about structure, clear responsibilities, and predictable behavior. When working on personal or learning projects, I prioritize proper authentication, data modeling, and clean separation of concerns.",
  approachToLearning:
    "I continuously refine my skills through hands-on projects and selective coursework, focusing on technologies that have clear production value. I prefer deep understanding of fewer tools over superficial exposure to many frameworks.",
  valuesAsDeveloper: [
    "Clarity over cleverness",
    "Maintainability over shortcuts",
    "Real-world constraints over theoretical perfection",
    "Documentation as part of the product",
  ],
};

export const skills = {
  frontend: ["Next.js", "Nuxt", "Tailwind CSS", "TypeScript"],
  backend: ["Node.js", "NestJS", "REST APIs", "JWT"],
  data: ["MongoDB", "MySQL"],
  infrastructure: ["GitHub Actions", "CI/CD pipelines", "Linux environments"],
  other: ["AI-assisted development tools", "Security-aware development practices"],
};

export type Project = {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
};

export const projects: Project[] = [
  {
    name: "NestJS User Management API",
    description:
      "Backend-driven application demonstrating authentication flows, role-based authorization, and CRUD operations. Focuses on architectural patterns, clean separation of concerns, and maintainable API structure.",
    techStack: ["NestJS", "TypeScript", "MongoDB", "JWT", "REST API"],
    githubUrl: "https://github.com/VarScr",
  },
  {
    name: "Full-Stack Task Manager",
    description:
      "Production-like application with secure authentication, database integration, and CI/CD workflows. Emphasizes real-world constraints including proper error handling, validation, and deployment considerations.",
    techStack: ["Next.js", "Node.js", "MySQL", "Tailwind CSS", "GitHub Actions"],
    githubUrl: "https://github.com/VarScr",
  },
  {
    name: "API Integration Platform",
    description:
      "Demonstrates API design principles, request/response handling, and integration patterns. Built with scalability and maintainability as primary concerns, including comprehensive documentation.",
    techStack: ["Node.js", "Express", "TypeScript", "REST API", "MongoDB"],
    githubUrl: "https://github.com/VarScr",
  },
];

export const contact = {
  availabilityStatement:
    "Open to opportunities where I can contribute to building and maintaining high-quality web applications as part of a collaborative engineering team.",
  links: {
    github: "https://github.com/VarScr",
    linkedin: "https://www.linkedin.com/in/fabio-vargas-b895551a4/",
    portfolio: "https://varscr.github.io",
    cv: "/cv.pdf",
  },
};
