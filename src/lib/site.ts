import { cv } from "@/content/cv";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const site = {
  url: resolveSiteUrl(),
  title: `${cv.name} – ${cv.role}`,
  description: `${cv.profile.lead} ${cv.valueProposition}`,
} as const;

export const sections = [
  { id: "profil", label: "Profil" },
  { id: "kompetenciak", label: "Kompetenciák" },
  { id: "tapasztalat", label: "Tapasztalat" },
  { id: "projektek", label: "Projektek" },
  { id: "eszkozok", label: "Eszközök" },
  { id: "tanulmanyok", label: "Tanulmányok" },
  { id: "kapcsolat", label: "Kapcsolat" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
