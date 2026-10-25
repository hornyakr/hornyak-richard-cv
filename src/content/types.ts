/**
 * Az oldal tartalmának típusai. Minden nyelvnek egy ilyen alakú tartalomfájlja van
 * (hu.ts, en.ts), így a komponensek nyelvtől függetlenek.
 */

export type Locale = "hu" | "en";

export type SectionKey =
  "profile" | "competencies" | "experience" | "projects" | "tools" | "education" | "contact";

export type SectionCopy = {
  /** Horgony az URL-ben (nyelvenként eltérhet). */
  id: string;
  /** Rövid név a navigációban. */
  label: string;
  eyebrow: string;
  title: string;
  intro?: string;
};

export type Link = {
  label: string;
  href: string;
};

export type Stat = {
  value: string;
  label: string;
  detail: string;
};

export type Competency = {
  title: string;
  description: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  references?: Link[];
};

export type EarlierExperience = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type Project = {
  title: string;
  tagline: string;
  context: string;
  tags: string[];
  description: string;
  metrics?: ProjectMetric[];
  /** Privát repó: nincs link, csak a leírás. */
  isPrivate?: boolean;
  link?: Link;
};

export type ProjectGroup = {
  id: string;
  title: string;
  intro: string;
  featured?: boolean;
  projects: Project[];
};

export type ToolGroup = {
  title: string;
  items: string[];
  emphasis?: boolean;
};

export type Education = {
  institution: string;
  program: string;
};

export type Language = {
  name: string;
  level: string;
};

/** Felületi szövegek; a `{…}` helyőrzőket a komponensek töltik ki. */
export type UiCopy = {
  skipToContent: string;
  chaptersNav: string;
  /** `{chapter}` helyőrzővel. */
  chaptersMenu: string;
  introChapter: string;
  backToTop: string;
  headerContact: string;
  heroContact: string;
  toProfile: string;
  opensInNewTab: string;
  themeToDark: string;
  themeToLight: string;
  themeDarkTitle: string;
  themeLightTitle: string;
  languageSwitcher: string;
  workflowTitle: string;
  workflowBadge: string;
  aiAsideLabel: string;
  aiAsideEyebrow: string;
  aiAsideLink: string;
  references: string;
  earlierExperience: string;
  privateRepo: string;
  tagsLabel: string;
  /** `{count}` helyőrzővel. */
  projectCount: string;
  scrollHint: string;
  languagesTitle: string;
  otherTitle: string;
  contactIntro: string;
  copyEmail: string;
  copied: string;
  builtWith: string;
};

export type CV = {
  locale: Locale;
  /** A <html lang> értéke. */
  htmlLang: string;
  /** Open Graph locale, pl. hu_HU. */
  ogLocale: string;
  /** Az oldal útvonala ezen a nyelven. */
  path: string;
  /** A nyelv neve a nyelvváltóban (rövid és teljes). */
  languageCode: string;
  languageName: string;
  sections: Record<SectionKey, SectionCopy>;
  ui: UiCopy;
  name: string;
  role: string;
  roleParts: [string, string];
  location: string;
  email: string;
  github: Link;
  cvPdf: Link & { fileName: string };
  valueProposition: string;
  stats: Stat[];
  workflowSteps: string[];
  profile: {
    lead: string;
    body: string[];
    aiNote: string;
  };
  competencies: Competency[];
  experience: Experience[];
  earlierExperience: EarlierExperience[];
  projectGroups: ProjectGroup[];
  tools: ToolGroup[];
  education: Education[];
  languages: Language[];
  other: string[];
  keywords: string[];
};
