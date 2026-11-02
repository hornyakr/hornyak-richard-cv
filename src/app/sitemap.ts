import type { MetadataRoute } from "next";

import { content, locales } from "@/content";
import { privacy } from "@/content/privacy";
import { languageAlternates, siteUrl } from "@/lib/site";

const absolute = (path: string) => new URL(path, siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(languageAlternates).map(([lang, path]) => [lang, absolute(path)]),
  );
  const privacyLanguages = Object.fromEntries(
    locales.map((locale) => [content[locale].htmlLang, absolute(privacy[locale].path)]),
  );
  return [
    ...locales.map((locale) => ({
      url: absolute(content[locale].path),
      changeFrequency: "monthly" as const,
      priority: locale === "hu" ? 1 : 0.9,
      alternates: { languages },
    })),
    ...locales.map((locale) => ({
      url: absolute(privacy[locale].path),
      changeFrequency: "yearly" as const,
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    })),
  ];
}
