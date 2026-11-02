import type { Locale } from "@/content/types";

/** A tájékoztató egy fejezete: bekezdések, utána opcionális felsorolás. */
export type PrivacySection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};

/** A látogatottságmérés hozzájárulási sávjának szövegei. */
export type ConsentCopy = {
  title: string;
  body: string;
  privacyLink: string;
  accept: string;
  decline: string;
  settings: string;
};

/** Az adatkezelési tájékoztató és a hozzá tartozó felületi szövegek egy nyelven. */
export type PrivacyCopy = {
  locale: Locale;
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
  backToCv: string;
  footerLink: string;
  consent: ConsentCopy;
};
