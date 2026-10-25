import type { MetadataRoute } from "next";

import { content, locales } from "@/content";
import { languageAlternates, siteUrl } from "@/lib/site";

const absolute = (path: string) => new URL(path, siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates).map(([lang, path]) => [lang, absolute(path)]),
  );
  return locales.map((locale) => ({
    url: absolute(content[locale].path),
    changeFrequency: "monthly",
    priority: locale === "hu" ? 1 : 0.9,
    alternates: { languages },
  }));
}
