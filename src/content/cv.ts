/**
 * Az oldal teljes tartalma egyetlen típusos forrásból.
 * Forrás: Hornyak_Richard_CV_Technical_Business_Analyst.pdf / .docx.
 * Csak a CV-ben szereplő tények és számok kerülhetnek ide.
 * A telefonszám szándékosan hiányzik: a publikus oldalon nem jelenik meg.
 */

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

export type CV = {
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

export const cv: CV = {
  name: "Hornyák Richárd",
  role: "Technical Business Analyst | Web- és low-code fejlesztő",
  roleParts: ["Technical Business Analyst", "Web- és low-code fejlesztő"],
  location: "Székesfehérvár / Budapest",
  email: "hornyak.richard94@gmail.com",
  github: { label: "github.com/hornyakr", href: "https://github.com/hornyakr" },
  cvPdf: {
    label: "CV letöltése (PDF)",
    href: "/Hornyak_Richard_CV_Technical_Business_Analyst.pdf",
    fileName: "Hornyak_Richard_CV_Technical_Business_Analyst.pdf",
  },
  valueProposition:
    "Felmérem és pontosítom az üzleti igényeket, funkcionális specifikációt, folyamat- és adatmodellt készítek, majd a megoldást átadom a fejlesztőcsapatnak, vagy magam valósítom meg.",
  stats: [
    {
      value: "5 év",
      label: "tapasztalat",
      detail: "ügyviteli, iratkezelési és belső vállalati rendszerek, webalkalmazások",
    },
    {
      value: "2 + 2",
      label: "ügyfél- és belső projekt",
      detail: "a Spartan Code Zrt.-nél, felméréstől az átadásig",
    },
    {
      value: "REST API",
      label: "iratkezelés-integráció",
      detail: "egy hatósági rendszer teljes iratkezelése REST API-n keresztül",
    },
    {
      value: "2 100+",
      label: "commit a Winzardban",
      detail: "130+ elfogadott PR a saját alkalmazásgyártó platformon",
    },
  ],
  workflowSteps: [
    "Igényfelmérés",
    "Specifikáció",
    "Modellezés",
    "Megvalósítás",
    "Átadás és tesztelés",
  ],
  profile: {
    lead: "Technical Business Analyst vagyok, web- és low-code fejlesztői háttérrel, öt év tapasztalattal ügyviteli, iratkezelési és belső vállalati rendszerek, valamint webalkalmazások területén.",
    body: [
      "Megrendelői interjúkon és egyeztetéseken felmérem és pontosítom az üzleti igényeket, funkcionális specifikációt, folyamat- és adatmodellt készítek, majd a megoldást átadom a fejlesztőcsapatnak, vagy magam valósítom meg: jelenleg JavaScript-alapú low-code keretrendszerben SQL-lel, MongoDB-vel és REST API-integrációkkal, korábban PHP/Symfony és JavaScript környezetben fejlesztettem.",
      "Több projektet a felméréstől az átadásig egészében én terveztem és valósítottam meg.",
    ],
    aiNote:
      "Saját fejlesztésű, szakmai szabályokra épülő AI-vezérelt munkafolyamattal dolgozom, amely a specifikációtól a tesztelésig pontosabbá és hatékonyabbá teszi a munkámat.",
  },
  competencies: [
    {
      title: "Igényfelmérés",
      description:
        "Megrendelői interjúk és egyeztetések, követelménybontás, elfogadási kritériumok, backlog-kezelés.",
    },
    {
      title: "Specifikáció",
      description: "Funkcionális specifikáció, adatmodell-leírás és fejlesztési dokumentáció.",
    },
    {
      title: "Modellezés",
      description:
        "BPMN-folyamatmodellek, UML, domain- és relációs adatmodellek, entitáskapcsolatok.",
    },
    {
      title: "Rendszerlogika",
      description:
        "Szerepkörök, jogosultságok, státuszfolyamatok, üzleti szabályok és képernyőlogika.",
    },
    {
      title: "Megvalósítás",
      description:
        "JavaScript, SQL, MongoDB, REST API-integrációk, low-code workflow-k; korábban PHP/Symfony, React.",
    },
    {
      title: "Átadás és tesztelés",
      description: "Fejlesztői átadás, tesztelés, UAT-támogatás és megrendelői bemutatók.",
    },
  ],
  experience: [
    {
      company: "Spartan Code Zrt.",
      role: "Technical Business Analyst / Low-code fejlesztő",
      period: "2024 – 2026",
      summary:
        "Megrendelői interjúkon és egyeztetéseken mérem fel iratkezelési, ügyviteli és belső vállalati rendszerek igényeit; eddig 2 ügyfél- és 2 belső projektben dolgoztam.",
      highlights: [
        "Funkcionális specifikációt, adatmodell-leírást és elfogadási kritériumokat készítek; a feladatokat Jira-backlogban kezelem, és agilis (Scrum) keretben adom át a fejlesztőcsapatnak.",
        "Domain- és relációs adatmodelleket, státuszfolyamatokat, jogosultsági szabályokat és felhasználói felületeket tervezek (Figma, draw.io).",
        "A cég saját fejlesztésű, JavaScript-alapú low-code keretrendszerében űrlapokat, workflow-kat és üzleti logikát implementálok; SQL- és MongoDB-lekérdezéseket írok.",
        "REST API-integrációkat mérek fel, implementálok és kötök be; egy hatósági rendszerben a teljes iratkezelést REST API-n keresztül integráltam.",
        "Tesztelem a keretrendszert, javítási és fejlesztési javaslatokat teszek rá, majd ellenőrzöm a javításokat.",
        "Megrendelői bemutatókat tartok, technikai egyeztetéseket folytatok a partnerekkel, és támogatom a tesztelést és a felhasználói elfogadást (UAT).",
      ],
    },
    {
      company: "Echobase Kft.",
      role: "Webfejlesztő és üzleti tervező",
      period: "2021 – 2024",
      summary:
        "Webalkalmazások üzleti koncepcióját és rendszertervét dolgoztam ki; az igényeket fejlesztési feladatokra bontottam és priorizáltam.",
      highlights: [
        "Fejlesztőként a megvalósításban is dolgoztam: webalkalmazások funkcióit kódoltam PHP, Symfony, Twig, JavaScript és HTML környezetben.",
        "A QuizStar pontozórendszert működő frontend-alkalmazásként fejlesztettem le ViteJS-sel, helyi környezetben futtatva.",
        "Startup- és innovációs projektekhez üzleti terveket, prototípusokat, MVP-ket és pitch anyagokat készítettem; a PropSetNet értékesítési webalkalmazás tervét egyetemi startup-program keretében 5–10 befektető előtt mutattam be.",
      ],
      references: [
        { label: "quizstar.ebtest.hu", href: "https://quizstar.ebtest.hu" },
        { label: "auto-max.hu", href: "https://auto-max.hu" },
      ],
    },
  ],
  earlierExperience: [
    {
      company: "Flex (Flextronics) – Axis-termékvonal",
      role: "Diagnosztikai operátor, technikus",
      period: "2018 – 2020",
      description:
        "Ipari és biztonsági IP-kamerák, elektronikai termékek diagnosztizálása, hibakeresése és javítása dokumentált gyártási környezetben.",
    },
    {
      company: "Gastland Flight Catering",
      role: "Informatikai ügyintéző / kapcsolattartó",
      period: "2017 – 2018",
      description:
        "Windows- és Linux-környezet támogatása, géppark-karbantartás, felhasználói segítségnyújtás, Linux-alapú levelezőszerver üzembe helyezésének és üzemeltetésének támogatása.",
    },
  ],
  projectGroups: [
    {
      id: "ai",
      title: "AI-vezérelt, szabályalapú fejlesztés",
      intro:
        "Saját projektek, amelyekben a szakmai szabályok vezetik az AI-ágensek munkáját a specifikációtól a tesztelésig.",
      featured: true,
      projects: [
        {
          title: "AI Workbench",
          tagline: "Szabályvezérelt AI-munkafolyamat",
          context: "Saját projekt, 2026 októberétől",
          tags: ["Claude Code", "Codex", "MCP", "PostgreSQL", "TypeScript"],
          description:
            "AI-ágensek munkáját szakmai szabályok mentén vezeti végig a fejlesztési folyamaton: jegykezelés, párhuzamos munkamenetek ütközéskezelése, szabálykapuk, modellválasztás, ráfordítás-könyvelés, review és tanulási hurok. A fájlalapú első változatból (Markdown, YAML, szkriptek) PostgreSQL-alapú szolgáltatást és MCP-szervert építettem; a Winzard fejlesztése ezen fut. Célom a minta kiterjesztése más szakmákra.",
          isPrivate: true,
        },
        {
          title: "Winzard",
          tagline: "Specifikációvezérelt alkalmazásgyártó platform",
          context: "Saját projekt, 2026 júliusától",
          tags: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Docker"],
          description:
            "Saját keretrendszer és gyártási lánc, amely jóváhagyott üzleti specifikációból (ApplicationSpec, UML) ellenőrzötten állít elő alkalmazást: adatmodellt, Prisma-sémát, jogosultságokat, workflow-kat és teszteket. Újrahasznosítható modulok (autentikáció, LDAP/AD, levelezés, értesítések, ütemező), elfogadási esetekre épülő automatikus ellenőrzés, emberi jóváhagyás és UAT-kiadás.",
          metrics: [
            { value: "2 100+", label: "commit" },
            { value: "130+", label: "elfogadott PR" },
            { value: "50", label: "újrahasznosítható modul" },
            { value: "47", label: "elfogadási eset" },
          ],
          isPrivate: true,
        },
      ],
    },
    {
      id: "client",
      title: "Ügyfél- és belső projektek",
      intro: "A Spartan Code Zrt.-nél végzett üzleti elemzés, tervezés és megvalósítás.",
      projects: [
        {
          title: "Hatósági ügyviteli rendszer",
          tagline: "Közlekedési infrastruktúra",
          context: "Spartan Code Zrt., ügyfélprojekt",
          tags: ["Üzleti elemzés", "Folyamat- és domainmodellezés", "REST API-integráció"],
          description:
            "Nagyméretű hatósági ügyviteli rendszer több alrendszerrel: publikus ügyfélportál (külföldi ügyfeleknek is) és belső ügyintézői rendszer. Leképeztem az ügyek teljes hivatali folyamatát – kérelemre és hivatalból indítás, ellenőrzés, hiánypótlás, tényállás-tisztázás, döntés –, valamint a nyilvántartásokat, az ügyféltörzset és az ügytípusok paraméterezését. Az iratkezelést REST API-n keresztül integráltam, így minden alrendszeren végigkíséri az ügyet.",
        },
        {
          title: "Projekttervezést támogató rendszer",
          tagline: "Önálló tervezés és megvalósítás",
          context: "Spartan Code Zrt.",
          tags: ["Üzleti elemzés", "Rendszertervezés"],
          description:
            "Projektek, alkalmazások és rendszerelemek strukturált nyilvántartására szolgáló rendszer, amelyet a felméréstől az átadásig egészében én terveztem és valósítottam meg. A megoldás a rögzített adatokból automatikusan generál dokumentációt és diagramokat.",
        },
      ],
    },
    {
      id: "portfolio",
      title: "Portfólió",
      intro: "Nyilvánosan elérhető saját projektek.",
      projects: [
        {
          title: "Ingatlan Portál",
          tagline: "Publikus portál és belső CRM-koncepció",
          context: "Saját projekt",
          tags: ["Termék- és adatmodell-tervezés", "React / Next.js"],
          description:
            "Működő demó: ingatlankereső, szakember- és irodaoldalak és belső CRM-munkatér egy rendszerben.",
          link: {
            label: "ingatlan-portal-five.vercel.app",
            href: "https://ingatlan-portal-five.vercel.app",
          },
        },
        {
          title: "CityPlan",
          tagline: "Weboldal",
          context: "Saját projekt",
          tags: ["Natív JavaScript és HTML", "Keretrendszer nélkül"],
          description: "Weboldal natív JavaScripttel és HTML-lel, keretrendszer nélkül.",
          link: { label: "cityplan.hu", href: "https://cityplan.hu" },
        },
      ],
    },
  ],
  tools: [
    {
      title: "AI és automatizálás",
      items: [
        "Claude Code",
        "Codex",
        "MCP-szerverek",
        "AI-ágensek szabályvezérelt irányítása",
        "GitHub Actions",
      ],
      emphasis: true,
    },
    { title: "Elemzés és tervezés", items: ["Jira", "Confluence", "Figma", "draw.io"] },
    { title: "Módszertan", items: ["Agile / Scrum", "BPMN", "UML", "UAT"] },
    {
      title: "Napi fejlesztés",
      items: [
        "JavaScript",
        "SQL",
        "MongoDB",
        "REST API",
        "Saját fejlesztésű low-code keretrendszer",
        "Git",
        "Postman",
      ],
    },
    {
      title: "Saját projektekben",
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
      title: "Korábbi és kiegészítő",
      items: ["PHP", "Symfony", "Twig", "ViteJS", "Windows- és Linux-üzemeltetési alapok"],
    },
  ],
  education: [
    {
      institution: "Óbudai Egyetem, Neumann János Informatikai Kar",
      program: "Mérnökinformatikus BSc – 2017-től, nem befejezett",
    },
    {
      institution: "Kölcsey Ferenc Gimnázium, Budapest",
      program: "Francia kéttannyelvű képzés, 2009–2015; informatika érettségi",
    },
    {
      institution: "Városligeti Magyar–Angol Két Tanítási Nyelvű Általános Iskola, Budapest",
      program: "Magyar–angol két tanítási nyelvű képzés",
    },
  ],
  languages: [
    { name: "Magyar", level: "anyanyelv" },
    { name: "Angol", level: "B2 (középfok)" },
    { name: "Francia", level: "alapszint" },
  ],
  other: ["B kategóriás jogosítvány"],
  keywords: [
    "Technical Business Analyst",
    "üzleti elemzés",
    "követelménykezelés",
    "funkcionális specifikáció",
    "BPMN",
    "UML",
    "low-code",
    "JavaScript",
    "SQL",
    "REST API",
    "AI-munkafolyamat",
  ],
};
