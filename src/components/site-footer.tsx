import { ConsentSettingsButton } from "@/components/consent-settings-button";
import { content } from "@/content";
import { privacy } from "@/content/privacy";
import type { Locale } from "@/content/types";

/** Közös lábléc: szerző, adatkezelési tájékoztató, mérési beállítások. */
export function SiteFooter({ locale }: { locale: Locale }) {
  const cv = content[locale];
  const notice = privacy[locale];

  return (
    <footer className="border-t border-line">
      <div className="section-shell flex flex-col gap-3 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {cv.name}</p>
        <nav aria-label={notice.eyebrow}>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <a
                href={notice.path}
                className="underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                {notice.footerLink}
              </a>
            </li>
            <li>
              <ConsentSettingsButton label={notice.consent.settings} />
            </li>
          </ul>
        </nav>
        <p>{cv.ui.builtWith}</p>
      </div>
    </footer>
  );
}
