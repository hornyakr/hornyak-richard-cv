import { Analytics } from "@vercel/analytics/next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { ContentProvider } from "@/components/content-provider";
import { MotionProvider } from "@/components/motion-provider";
import { ThemeScript } from "@/components/theme-script";
import { content, languageOptions } from "@/content";
import type { Locale } from "@/content/types";

import "@/app/globals.css";

const body = Geist({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const heading = Bricolage_Grotesque({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const code = Geist_Mono({
  variable: "--font-code",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

/**
 * A két gyökér-layout (magyar és angol) közös <html> váza.
 * A nyelv a `lang` attribútumot és a kliens komponensek tartalmát határozza meg.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const cv = content[locale];
  return (
    <html
      lang={cv.htmlLang}
      // A ThemeScript még a hidratálás előtt beállítja a data-theme attribútumot.
      suppressHydrationWarning
      className={`${body.variable} ${heading.variable} ${code.variable} antialiased`}
    >
      {/* App Router gyökér-layout: a <head> itt megengedett; a szabály a fájl helye miatt a Pages Routert feltételezi. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <ContentProvider value={{ cv, languages: languageOptions }}>
          <MotionProvider>{children}</MotionProvider>
        </ContentProvider>
        {/* Vercel Web Analytics: süti nélküli látogatásmérés (élesben a Vercel szolgálja ki). */}
        <Analytics />
      </body>
    </html>
  );
}
