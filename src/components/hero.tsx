import type { CSSProperties } from "react";

import { ArrowDownIcon, DownloadIcon, GitHubIcon, MailIcon, MapPinIcon } from "@/components/icons";
import { CountUp } from "@/components/count-up";
import { Magnetic } from "@/components/magnetic";
import { WorkflowCard } from "@/components/workflow-card";
import type { CV } from "@/content/types";

/**
 * Lépcsőzetes belépés. Rövidre szabva (legfeljebb ~0,8 s az első festéstől), mert a még
 * be nem úszott elemek addig láthatatlanok: az első képernyőnek gyorsan olvashatónak kell lennie.
 */
const delay = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as CSSProperties;

export function Hero({ cv }: { cv: CV }) {
  const [roleMain, roleSecondary] = cv.roleParts;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 sm:pt-28"
    >
      <div
        aria-hidden="true"
        className="glow-spot absolute top-[-25rem] left-1/2 -z-10 h-[62rem] w-[78rem] max-w-[200vw] -translate-x-1/2"
      />

      <div className="section-shell grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-x-16 lg:gap-y-12">
        <div className="order-1">
          <p className="enter mb-6 inline-flex items-center gap-2 text-sm text-ink-muted">
            <MapPinIcon className="text-accent" />
            {cv.location}
          </p>

          <h1
            id="hero-title"
            className="font-display text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.95] font-semibold tracking-[-0.035em]"
          >
            {cv.name}
          </h1>

          <p className="enter mt-5 text-lg font-medium sm:text-xl" style={delay(60)}>
            <span className="text-accent">{roleMain}</span>
            <span aria-hidden="true" className="mx-2.5 text-line-strong">
              |
            </span>
            <span className="sr-only"> – </span>
            <span className="text-ink-heading">{roleSecondary}</span>
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {cv.valueProposition}
          </p>

          <div className="enter mt-8 flex flex-wrap items-center gap-3" style={delay(120)}>
            <Magnetic>
              <a
                href={`#${cv.sections.contact.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-ink shadow-[0_10px_30px_-10px_var(--glow)] transition-[background-color,transform] hover:bg-accent-strong active:scale-[0.98]"
              >
                <MailIcon className="text-base" />
                {cv.ui.heroContact}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={cv.cvPdf.href}
                download={cv.cvPdf.fileName}
                className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/60 px-5 py-3 text-sm font-semibold text-ink-heading backdrop-blur transition-[color,border-color,transform] hover:border-accent hover:text-accent active:scale-[0.98]"
              >
                <DownloadIcon className="text-base" />
                {cv.cvPdf.label}
              </a>
            </Magnetic>
            <a
              href={cv.github.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-medium text-ink-muted transition-colors hover:text-ink-heading"
            >
              <GitHubIcon className="text-lg" />
              <span>
                GitHub<span className="sr-only"> {cv.ui.opensInNewTab}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="enter order-3 lg:order-2" style={delay(180)}>
          <WorkflowCard />
        </div>

        <dl className="order-2 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4 lg:order-3 lg:col-span-2">
          {cv.stats.map((stat, index) => (
            <div
              key={stat.label}
              className="enter flex flex-col bg-bg-elevated p-4"
              style={delay(160 + index * 40)}
            >
              <dt className="order-2 mt-1 text-sm leading-snug font-medium text-ink">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-2xl font-semibold tracking-tight text-ink-heading sm:text-[1.65rem]">
                <CountUp value={stat.value} />
              </dd>
              <dd className="order-3 mt-1.5 text-xs leading-snug text-ink-muted">{stat.detail}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href={`#${cv.sections.profile.id}`}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-ink-muted transition-colors hover:text-accent md:inline-flex"
      >
        <ArrowDownIcon className="motion-safe:animate-bounce" />
        {cv.ui.toProfile}
      </a>
    </section>
  );
}
