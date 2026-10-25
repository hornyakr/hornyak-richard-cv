import { CopyEmailButton } from "@/components/copy-email-button";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { Hero } from "@/components/hero";
import { DownloadIcon, GitHubIcon, MailIcon, MapPinIcon, SparkIcon } from "@/components/icons";
import { InteractiveBackground } from "@/components/interactive-background";
import { ProjectsShowcase } from "@/components/projects-showcase";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { cv } from "@/content/cv";
import { site } from "@/lib/site";

// A teljes oldal build időben generálódik; kérésidejű renderelés nem kerülhet bele.
export const ensureStatic = "navigation";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: cv.name,
  jobTitle: cv.roleParts[0],
  description: cv.profile.lead,
  url: site.url,
  email: `mailto:${cv.email}`,
  sameAs: [cv.github.href],
  address: { "@type": "PostalAddress", addressLocality: cv.location, addressCountry: "HU" },
  knowsLanguage: cv.languages.map((language) => language.name),
  knowsAbout: cv.keywords,
};

export default function Home() {
  const [emailUser, emailDomain] = cv.email.split("@");

  return (
    <>
      <a
        href="#tartalom"
        className="sr-only z-[60] rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Ugrás a tartalomra
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <InteractiveBackground />
      <SiteHeader />

      <main id="tartalom" tabIndex={-1} className="outline-none">
        <Hero />

        <Section
          id="profil"
          index="01"
          eyebrow="Profil"
          title="Az üzleti igénytől a működő megoldásig"
        >
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div className="reveal space-y-5">
              <p className="text-xl leading-relaxed font-medium text-ink-heading sm:text-2xl sm:leading-relaxed">
                {cv.profile.lead}
              </p>
              {cv.profile.body.map((paragraph) => (
                <p key={paragraph} className="leading-relaxed text-ink-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
            <aside
              aria-label="AI-vezérelt munkafolyamat"
              className="reveal self-start rounded-2xl border border-accent/30 bg-accent-soft/60 p-6 sm:p-7"
            >
              <p className="eyebrow">
                <SparkIcon className="text-sm" />
                Új irány
              </p>
              <p className="mt-4 text-lg leading-relaxed font-medium text-ink-heading">
                {cv.profile.aiNote}
              </p>
              <a
                href="#projektek"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:text-accent-strong hover:underline"
              >
                AI Workbench és Winzard →
              </a>
            </aside>
          </div>
        </Section>

        <Section
          id="kompetenciak"
          index="02"
          eyebrow="Fő kompetenciák"
          title="Egy kézben az elemzés és a megvalósítás"
          className="border-y border-line bg-bg-elevated/55"
        >
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cv.competencies.map((competency, index) => (
              <li
                key={competency.title}
                className="reveal card group relative overflow-hidden p-6 transition-colors hover:border-accent/50"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-line-strong transition-colors group-hover:text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold tracking-tight">
                  {competency.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{competency.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="tapasztalat" index="03" eyebrow="Szakmai tapasztalat" title="Tapasztalat">
          <ExperienceTimeline />
        </Section>

        <Section
          id="projektek"
          index="04"
          eyebrow="Kiemelt projektek"
          title="Projektek és portfólió"
          intro="A hangsúly az új irányon: szakmai szabályokra épülő, AI-vezérelt munkafolyamat és specifikációvezérelt alkalmazásgyártás."
          className="border-y border-line bg-bg-elevated/55"
          exitEffect={false}
        >
          <ProjectsShowcase />
        </Section>

        <Section id="eszkozok" index="05" eyebrow="Eszközök és technológiák" title="Eszköztár">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cv.tools.map((group) => (
              <section
                key={group.title}
                aria-label={group.title}
                className={`reveal card p-6 ${group.emphasis ? "border-accent/40 bg-accent-soft/50" : ""}`}
              >
                <h3 className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.16em] text-ink-muted uppercase">
                  {group.emphasis && <SparkIcon className="text-sm text-accent" />}
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-ink-heading transition-colors hover:border-accent/60"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Section>

        <Section
          id="tanulmanyok"
          index="06"
          eyebrow="Tanulmányok, nyelvtudás és egyéb"
          title="Tanulmányok és nyelvek"
          className="border-y border-line bg-bg-elevated/55"
        >
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <ol className="space-y-4">
              {cv.education.map((item) => (
                <li key={item.institution} className="reveal card p-6">
                  <h3 className="text-lg font-semibold text-ink-heading">{item.institution}</h3>
                  <p className="mt-1.5 text-ink-muted">{item.program}</p>
                </li>
              ))}
            </ol>
            <div className="reveal card self-start p-6">
              <h3 className="font-mono text-xs font-medium tracking-[0.16em] text-ink-muted uppercase">
                Nyelvtudás
              </h3>
              <dl className="mt-4 divide-y divide-[var(--line)]">
                {cv.languages.map((language) => (
                  <div
                    key={language.name}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <dt className="font-medium text-ink-heading">{language.name}</dt>
                    <dd className="text-right text-sm text-ink-muted">{language.level}</dd>
                  </div>
                ))}
              </dl>
              <h3 className="mt-6 font-mono text-xs font-medium tracking-[0.16em] text-ink-muted uppercase">
                Egyéb
              </h3>
              <ul className="mt-3 space-y-1">
                {cv.other.map((item) => (
                  <li key={item} className="text-ink-heading">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="kapcsolat" index="07" eyebrow="Kapcsolat" title="Beszéljünk!">
          <div className="reveal card relative overflow-hidden p-6 sm:p-10">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -bottom-24 size-72 rounded-full bg-accent/20 blur-3xl"
            />
            <p className="max-w-2xl text-lg leading-relaxed text-ink-muted">
              Keressen e-mailben, vagy töltse le a teljes önéletrajzot PDF-ben.
            </p>

            <a
              href={`mailto:${cv.email}`}
              className="mt-8 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.05rem,4.6vw,2.5rem)] font-semibold tracking-tight text-ink-heading transition-colors hover:text-accent"
            >
              <MailIcon className="shrink-0 text-accent" />
              <span className="min-w-0">
                {emailUser}@<wbr />
                {emailDomain}
              </span>
            </a>

            <div className="mt-8 flex flex-wrap gap-3">
              <CopyEmailButton email={cv.email} />
              <a
                href={cv.cvPdf.href}
                download={cv.cvPdf.fileName}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                <DownloadIcon />
                {cv.cvPdf.label}
              </a>
              <a
                href={cv.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm font-medium text-ink-heading transition-colors hover:border-accent hover:text-accent"
              >
                <GitHubIcon />
                {cv.github.label}
                <span className="sr-only">(új lapon nyílik)</span>
              </a>
            </div>

            <p className="mt-8 inline-flex items-center gap-2 text-sm text-ink-muted">
              <MapPinIcon className="text-accent" />
              {cv.location}
            </p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-line">
        <div className="section-shell flex flex-col gap-2 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {cv.name}</p>
          <p>Next.js, TypeScript, Tailwind CSS és Motion</p>
        </div>
      </footer>
    </>
  );
}
