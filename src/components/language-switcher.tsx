"use client";

import { useContent } from "@/components/content-provider";
import type { SectionKey } from "@/content/types";

/**
 * Nyelvváltó: a másik nyelv ugyanarra a fejezetre visz (a horgonyok nyelvenként eltérnek).
 * Mobilon egyetlen gomb a másik nyelvre, nagyobb kijelzőn kétállású kapcsoló.
 */
export function LanguageSwitcher({ activeSection }: { activeSection: SectionKey | null }) {
  const { cv, languages } = useContent();
  const hrefFor = (option: (typeof languages)[number]) =>
    activeSection ? `${option.path}#${option.sectionIds[activeSection]}` : option.path;
  const others = languages.filter((option) => option.locale !== cv.locale);

  return (
    <>
      <ul
        aria-label={cv.ui.languageSwitcher}
        className="relative hidden h-10 items-center rounded-full border border-line bg-surface/70 p-1 backdrop-blur-xl sm:flex"
      >
        {languages.map((option) => {
          const current = option.locale === cv.locale;
          return (
            <li key={option.locale} className="relative">
              {/* A nyelvváltás új oldalt tölt be, így a kiemelésnek nincs honnan átcsúsznia. */}
              {current && (
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-accent" />
              )}
              <a
                href={hrefFor(option)}
                hrefLang={option.htmlLang}
                lang={option.htmlLang}
                aria-current={current ? "page" : undefined}
                title={option.name}
                className={`relative grid h-8 min-w-9 place-items-center rounded-full px-2 font-mono text-xs font-semibold transition-colors ${
                  current ? "text-accent-ink" : "text-ink-muted hover:text-ink-heading"
                }`}
              >
                <span aria-hidden="true">{option.code}</span>
                <span className="sr-only">{option.name}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {others.map((option) => (
        <a
          key={option.locale}
          href={hrefFor(option)}
          hrefLang={option.htmlLang}
          lang={option.htmlLang}
          title={option.name}
          className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 font-mono text-xs font-semibold text-ink transition-colors hover:border-line-strong hover:text-accent sm:hidden"
        >
          <span aria-hidden="true">{option.code}</span>
          <span className="sr-only">{option.name}</span>
        </a>
      ))}
    </>
  );
}
