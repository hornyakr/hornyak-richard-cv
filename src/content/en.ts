/**
 * English content of the page (served at /en).
 * Mirrors hu.ts fact for fact; nothing may appear here that is not in the CV.
 * The phone number is deliberately omitted from the public page.
 */

import type { CV } from "@/content/types";

export const en: CV = {
  locale: "en",
  htmlLang: "en",
  ogLocale: "en_GB",
  path: "/en",
  languageCode: "EN",
  languageName: "English",
  sections: {
    profile: {
      id: "profile",
      label: "Profile",
      eyebrow: "Profile",
      title: "From business need to working solution",
    },
    competencies: {
      id: "skills",
      label: "Skills",
      eyebrow: "Core skills",
      title: "Analysis and implementation, combined",
    },
    experience: {
      id: "experience",
      label: "Experience",
      eyebrow: "Professional experience",
      title: "Experience",
    },
    projects: {
      id: "projects",
      label: "Projects",
      eyebrow: "Selected projects",
      title: "Projects and portfolio",
      intro:
        "The focus is on the new direction: a rule-based, AI-driven workflow and specification-driven application generation.",
    },
    tools: {
      id: "tools",
      label: "Tools",
      eyebrow: "Tools and technologies",
      title: "Toolkit",
    },
    education: {
      id: "education",
      label: "Education",
      eyebrow: "Education, languages and more",
      title: "Education and languages",
    },
    contact: { id: "contact", label: "Contact", eyebrow: "Contact", title: "Let’s talk" },
  },
  ui: {
    skipToContent: "Skip to content",
    chaptersNav: "Chapters",
    chaptersMenu: "Chapters menu – current: {chapter}",
    introChapter: "Introduction",
    backToTop: "back to top",
    headerContact: "Contact",
    heroContact: "Get in touch",
    toProfile: "Continue to profile",
    opensInNewTab: "(opens in a new tab)",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    themeDarkTitle: "Dark theme",
    themeLightTitle: "Light theme",
    languageSwitcher: "Language",
    workflowTitle: "Workflow",
    workflowBadge: "rule-based AI",
    aiAsideLabel: "AI-driven workflow",
    aiAsideEyebrow: "New direction",
    aiAsideLink: "AI Workbench and Winzard →",
    references: "References:",
    earlierExperience: "Earlier technical and IT experience",
    privateRepo: "Private repository",
    tagsLabel: "Technologies and roles",
    projectCount: "{count} projects",
    scrollHint: "keep scrolling →",
    languagesTitle: "Languages",
    otherTitle: "Other",
    contactIntro: "Get in touch by email, or download the full CV as a PDF.",
    copyEmail: "Copy email address",
    copied: "Copied",
    builtWith: "Built with Next.js, TypeScript, Tailwind CSS and Motion",
  },
  name: "Richárd Hornyák",
  role: "Technical Business Analyst | Web and Low-code Developer",
  roleParts: ["Technical Business Analyst", "Web and Low-code Developer"],
  location: "Székesfehérvár / Budapest, Hungary",
  email: "hornyak.richard94@gmail.com",
  github: { label: "github.com/hornyakr", href: "https://github.com/hornyakr" },
  cvPdf: {
    label: "Download CV (PDF)",
    href: "/Hornyak_Richard_CV_Technical_Business_Analyst_EN.pdf",
    fileName: "Hornyak_Richard_CV_Technical_Business_Analyst_EN.pdf",
  },
  valueProposition:
    "I gather and refine business requirements, produce functional specifications and process and data models, then hand the solution over to the development team or implement it myself.",
  stats: [
    {
      value: "5 years",
      label: "of experience",
      detail:
        "business administration, records management and internal enterprise systems, web applications",
    },
    {
      value: "2 + 2",
      label: "client and internal projects",
      detail: "at Spartan Code, from requirements gathering to handover",
    },
    {
      value: "REST API",
      label: "records management integration",
      detail: "records management of a public authority system, integrated via REST API",
    },
    {
      value: "2,100+",
      label: "commits on Winzard",
      detail: "130+ merged PRs on my own application generation platform",
    },
  ],
  workflowSteps: [
    "Requirements gathering",
    "Specification",
    "Modelling",
    "Implementation",
    "Handover and testing",
  ],
  profile: {
    lead: "I am a Technical Business Analyst with a background in web and low-code development and five years of experience in business administration, records management and internal enterprise systems, as well as web applications.",
    body: [
      "Through client interviews and workshops, I gather and refine business requirements, produce functional specifications and process and data models, then hand the solution over to the development team or implement it myself: currently in a JavaScript-based low-code framework with SQL, MongoDB and REST API integrations; previously I developed in PHP/Symfony and JavaScript.",
      "I designed and delivered several projects from requirements gathering through to handover.",
    ],
    aiNote:
      "I work with my own rule-based, AI-driven workflow, which makes my work more accurate and efficient from specification through to testing.",
  },
  competencies: [
    {
      title: "Requirements gathering",
      description:
        "Client interviews and workshops, requirements breakdown, acceptance criteria, backlog management.",
    },
    {
      title: "Specification",
      description:
        "Functional specifications, data model descriptions and development documentation.",
    },
    {
      title: "Modelling",
      description:
        "BPMN process models, UML, domain and relational data models, entity relationships.",
    },
    {
      title: "System logic",
      description: "Roles, permissions, status workflows, business rules and screen logic.",
    },
    {
      title: "Implementation",
      description:
        "JavaScript, SQL, MongoDB, REST API integrations, low-code workflows; previously PHP/Symfony, React.",
    },
    {
      title: "Handover and testing",
      description: "Developer handover, testing, UAT support and client demos.",
    },
  ],
  experience: [
    {
      company: "Spartan Code Zrt.",
      role: "Technical Business Analyst / Low-code Developer",
      period: "2024 – 2026",
      summary:
        "I gather requirements for records management, business administration and internal enterprise systems through client interviews and workshops; to date I have worked on 2 client and 2 internal projects.",
      highlights: [
        "I write functional specifications, data model descriptions and acceptance criteria; I manage tasks in a Jira backlog and hand them over to the development team within an agile (Scrum) framework.",
        "I design domain and relational data models, status workflows, permission rules and user interfaces (Figma, draw.io).",
        "I implement forms, workflows and business logic in the company’s in-house JavaScript-based low-code framework, and write SQL and MongoDB queries.",
        "I scope, implement and connect REST API integrations; in a public authority system, I integrated records management via a REST API.",
        "I test the framework, propose fixes and improvements, and verify the fixes.",
        "I run client demos, hold technical discussions with partners, and support testing and user acceptance (UAT).",
      ],
    },
    {
      company: "Echobase Kft.",
      role: "Web Developer & Business Planner",
      period: "2021 – 2024",
      summary:
        "I developed business concepts and system designs for web applications, breaking requirements down into development tasks and prioritising them.",
      highlights: [
        "As a developer, I also worked on implementation, coding web application features in PHP, Symfony, Twig, JavaScript and HTML.",
        "I built the QuizStar scoring system as a working front-end application with ViteJS, running in a local environment.",
        "I produced business plans, prototypes, MVPs and pitch materials for startup and innovation projects; I presented the plan for the PropSetNet sales web application to 5–10 investors as part of a university startup programme.",
      ],
      references: [
        { label: "quizstar.ebtest.hu", href: "https://quizstar.ebtest.hu" },
        { label: "auto-max.hu", href: "https://auto-max.hu" },
      ],
    },
  ],
  earlierExperience: [
    {
      company: "Flex (Flextronics) – Axis product line",
      role: "Diagnostics Operator, Technician",
      period: "2018 – 2020",
      description:
        "Diagnosing, troubleshooting and repairing industrial and security IP cameras and electronic products in a documented manufacturing environment.",
    },
    {
      company: "Gastland Flight Catering",
      role: "IT Administrator / Point of Contact",
      period: "2017 – 2018",
      description:
        "Supporting Windows and Linux environments, maintaining the hardware fleet, providing user support, and supporting the installation and operation of a Linux-based mail server.",
    },
  ],
  projectGroups: [
    {
      id: "ai",
      title: "AI-driven, rule-based development",
      intro:
        "Personal projects in which professional rules guide the work of AI agents from specification to testing.",
      featured: true,
      projects: [
        {
          title: "AI Workbench",
          tagline: "Rule-driven AI workflow",
          context: "Personal project, since October 2026",
          tags: ["Claude Code", "Codex", "MCP", "PostgreSQL", "TypeScript"],
          description:
            "Guides the work of AI agents through the development process according to professional rules: ticket management, conflict handling between parallel sessions, rule gates, model selection, effort accounting, review and a learning loop. I evolved the file-based first version (Markdown, YAML, scripts) into a PostgreSQL-based service and an MCP server; Winzard’s development runs on it. My goal is to extend the pattern to other professions.",
          isPrivate: true,
        },
        {
          title: "Winzard",
          tagline: "Specification-driven application generation platform",
          context: "Personal project, since July 2026",
          tags: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Docker"],
          description:
            "My own framework and production pipeline that generates applications in a verified way from an approved business specification (ApplicationSpec, UML): data model, Prisma schema, permissions, workflows and tests. Reusable modules (authentication, LDAP/AD, email, notifications, scheduler), automated verification based on acceptance cases, human approval and UAT release.",
          metrics: [
            { value: "2,100+", label: "commits" },
            { value: "130+", label: "merged PRs" },
            { value: "50", label: "reusable modules" },
            { value: "47", label: "acceptance cases" },
          ],
          isPrivate: true,
        },
      ],
    },
    {
      id: "client",
      title: "Client and internal projects",
      intro: "Business analysis, design and implementation at Spartan Code.",
      projects: [
        {
          title: "Public authority case management system",
          tagline: "Transport infrastructure",
          context: "Spartan Code Zrt., client project",
          tags: ["Business analysis", "Records management", "REST API integration"],
          description:
            "A large-scale public authority case management system with several subsystems: a public client portal (also for international clients) and an internal case-handling system. I modelled records management in line with the business requirements and integrated it into the system via a REST API, so that it follows each case across every subsystem.",
        },
        {
          title: "Project planning support system",
          tagline: "Independent design and implementation",
          context: "Spartan Code Zrt.",
          tags: ["Business analysis", "System design"],
          description:
            "A system for the structured registration of projects, applications and system components, which I designed and implemented from requirements gathering through to handover. It automatically generates documentation and diagrams from the recorded data.",
        },
      ],
    },
    {
      id: "portfolio",
      title: "Portfolio",
      intro: "Publicly available personal projects.",
      projects: [
        {
          title: "Ingatlan Portál",
          tagline: "Public property portal and internal CRM concept",
          context: "Personal project",
          tags: ["Product and data model design", "React / Next.js"],
          description:
            "Working demo: property search, professional and agency pages and an internal CRM workspace in one system.",
          link: {
            label: "ingatlan-portal-five.vercel.app",
            href: "https://ingatlan-portal-five.vercel.app",
          },
        },
        {
          title: "CityPlan",
          tagline: "Website",
          context: "Personal project",
          tags: ["Vanilla JavaScript and HTML", "No framework"],
          description: "A website built with vanilla JavaScript and HTML, without a framework.",
          link: { label: "cityplan.hu", href: "https://cityplan.hu" },
        },
      ],
    },
  ],
  tools: [
    {
      title: "AI and automation",
      items: [
        "Claude Code",
        "Codex",
        "MCP servers",
        "Rule-based orchestration of AI agents",
        "GitHub Actions",
      ],
      emphasis: true,
    },
    { title: "Analysis and design", items: ["Jira", "Confluence", "Figma", "draw.io"] },
    { title: "Methodology", items: ["Agile / Scrum", "BPMN", "UML", "UAT"] },
    {
      title: "Day-to-day development",
      items: [
        "JavaScript",
        "SQL",
        "MongoDB",
        "REST API",
        "In-house low-code framework",
        "Git",
        "Postman",
      ],
    },
    {
      title: "Personal projects",
      items: [
        "TypeScript",
        "React",
        "Next.js",
        "Prisma",
        "PostgreSQL",
        "Docker",
        "Tailwind CSS",
        "Vitest",
        "Playwright",
      ],
    },
    {
      title: "Earlier and supplementary",
      items: ["PHP", "Symfony", "Twig", "ViteJS", "Windows and Linux administration basics"],
    },
  ],
  education: [
    {
      institution: "Óbuda University, John von Neumann Faculty of Informatics",
      program: "BSc in Computer Science Engineering – started 2017, not completed",
    },
    {
      institution: "Kölcsey Ferenc Grammar School, Budapest",
      program: "French bilingual programme, 2009–2015; school-leaving exam in IT",
    },
    {
      institution: "Városliget Hungarian–English Bilingual Primary School, Budapest",
      program: "Hungarian–English bilingual education",
    },
  ],
  languages: [
    { name: "Hungarian", level: "native" },
    { name: "English", level: "B2 (upper intermediate)" },
    { name: "French", level: "basic" },
  ],
  other: ["Category B driving licence"],
  keywords: [
    "Technical Business Analyst",
    "business analysis",
    "requirements management",
    "functional specification",
    "BPMN",
    "UML",
    "low-code",
    "JavaScript",
    "SQL",
    "REST API",
    "AI workflow",
  ],
};
