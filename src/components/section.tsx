import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, index, eyebrow, title, intro, children, className }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 py-20 sm:py-28 ${className ?? ""}`}
    >
      <div className="section-shell">
        <header className="reveal mb-12 max-w-3xl sm:mb-16">
          <p className="eyebrow">
            <span className="text-ink-muted">{index}</span>
            <span aria-hidden="true" className="h-px w-6 bg-accent/50" />
            {eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-4 font-display text-3xl font-semibold tracking-[-0.025em] sm:text-5xl"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">{intro}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
