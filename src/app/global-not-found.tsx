import type { Metadata } from "next";
import Link from "next/link";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "404 – Az oldal nem található / Page not found",
  robots: { index: false },
};

/** Egyezés nélküli URL-ek közös 404-oldala (két gyökér-layout mellett nincs egyetlen layout). */
export default function GlobalNotFound() {
  return (
    <html lang="hu">
      <body className="grid min-h-dvh place-items-center bg-bg p-6 font-sans text-ink">
        <main className="max-w-md text-center">
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-3 text-3xl font-semibold">Az oldal nem található</h1>
          <p lang="en" className="mt-2 text-ink-muted">
            Page not found
          </p>
          <p className="mt-8 flex justify-center gap-3">
            <Link
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink"
              href="/"
            >
              Főoldal
            </Link>
            <Link
              lang="en"
              className="rounded-full border border-line-strong px-4 py-2 text-sm font-semibold text-ink-heading"
              href="/en"
            >
              Home (English)
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
