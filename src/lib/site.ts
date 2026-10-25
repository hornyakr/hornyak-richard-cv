import type { Metadata, Viewport } from "next";

import { content, defaultLocale, locales } from "@/content";
import type { CV } from "@/content/types";

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

export const pageTitle = (cv: CV) => `${cv.name} – ${cv.role}`;
export const pageDescription = (cv: CV) => `${cv.profile.lead} ${cv.valueProposition}`;

/** hreflang-alternatívák: minden nyelv a saját útvonalán, x-default a magyar. */
export const languageAlternates: Record<string, string> = {
  ...Object.fromEntries(locales.map((locale) => [content[locale].htmlLang, content[locale].path])),
  "x-default": content[defaultLocale].path,
};

export function buildMetadata(cv: CV): Metadata {
  const title = pageTitle(cv);
  const description = pageDescription(cv);
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: cv.name,
    authors: [{ name: cv.name, url: cv.github.href }],
    creator: cv.name,
    keywords: [...cv.keywords],
    alternates: { canonical: cv.path, languages: languageAlternates },
    openGraph: {
      type: "profile",
      locale: cv.ogLocale,
      alternateLocale: locales
        .map((locale) => content[locale].ogLocale)
        .filter((ogLocale) => ogLocale !== cv.ogLocale),
      url: cv.path,
      siteName: cv.name,
      title,
      description,
      firstName: "Richárd",
      lastName: "Hornyák",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#061113" },
  ],
};
