import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { content, locales } from "@/content";
import { privacy } from "@/content/privacy";
import type { Locale } from "@/content/types";

/** Az adatkezelési tájékoztató a megadott nyelven. */
export function PrivacyPage({ locale }: { locale: Locale }) {
  const cv = content[locale];
  const notice = privacy[locale];
  const others = locales.filter((other) => other !== locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        {cv.ui.skipToContent}
      </a>

      <header className="section-shell flex items-center justify-between gap-4 py-5">
        <a
          href={cv.path}
          className="text-sm font-medium text-ink-heading underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          <span aria-hidden="true">← </span>
          {notice.backToCv}
        </a>
        <div className="flex items-center gap-2">
          {others.map((other) => (
            <a
              key={other}
              href={privacy[other].path}
              hrefLang={content[other].htmlLang}
              lang={content[other].htmlLang}
              title={content[other].languageName}
              className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 font-mono text-xs font-semibold text-ink transition-colors hover:border-line-strong hover:text-accent"
            >
              <span aria-hidden="true">{content[other].languageCode}</span>
              <span className="sr-only">{content[other].languageName}</span>
            </a>
          ))}
          <ThemeToggle />
        </div>
      </header>

      <main id="main" tabIndex={-1} className="section-shell pt-10 pb-20 outline-none sm:pt-16">
        <article className="max-w-3xl">
          <p className="eyebrow">{notice.eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink-heading sm:text-5xl">
            {notice.title}
          </h1>
          <p className="mt-3 font-mono text-xs text-ink-muted">{notice.updated}</p>
          <p className="mt-8 text-lg text-ink">{notice.intro}</p>

          {notice.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2
                id={`${section.id}-title`}
                className="mt-12 font-display text-xl font-semibold text-ink-heading sm:text-2xl"
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-ink">
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-ink marker:text-accent">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>

      <SiteFooter locale={locale} />
    </>
  );
}
