import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
import { ThemeScript } from "@/components/theme-script";
import { cv } from "@/content/cv";
import { site } from "@/lib/site";

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: cv.name,
  authors: [{ name: cv.name, url: cv.github.href }],
  creator: cv.name,
  keywords: [...cv.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "hu_HU",
    url: "/",
    siteName: cv.name,
    title: site.title,
    description: site.description,
    firstName: "Richárd",
    lastName: "Hornyák",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#061113" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="hu"
      // A ThemeScript még a hidratálás előtt beállítja a data-theme attribútumot.
      suppressHydrationWarning
      className={`${body.variable} ${heading.variable} ${code.variable} antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-dvh">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
