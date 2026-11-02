import { en } from "@/content/en";
import { hu } from "@/content/hu";
import type { CV, Locale, SectionKey } from "@/content/types";
import { typeset } from "@/lib/typography";

export const locales = ["hu", "en"] as const satisfies readonly Locale[];
export const defaultLocale: Locale = "hu";

/** A tartalom tipográfiai finomítással (a kötőjelnél nem maradnak csonka szódarabok). */
export const content: Record<Locale, CV> = { hu: typeset(hu), en: typeset(en) };

/** A nyelvváltó egy eleme: hová visz, és ott milyen horgonyokkal. */
export type LanguageOption = {
  locale: Locale;
  code: string;
  name: string;
  htmlLang: string;
  path: string;
  sectionIds: Record<SectionKey, string>;
};

export const languageOptions: LanguageOption[] = locales.map((locale) => {
  const cv = content[locale];
  return {
    locale,
    code: cv.languageCode,
    name: cv.languageName,
    htmlLang: cv.htmlLang,
    path: cv.path,
    sectionIds: Object.fromEntries(
      Object.entries(cv.sections).map(([key, section]) => [key, section.id]),
    ) as Record<SectionKey, string>,
  };
});
