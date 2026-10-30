"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { useReducedMotionSafe } from "@/lib/use-media-query";

type SectionProps = {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  /** Kilépéskor a tartalom finoman hátrébb lép (rögzített elemeknél kikapcsolandó). */
  exitEffect?: boolean;
};

/**
 * Fejezet: görgetésre a háttérben úszó óriás sorszám parallaxban mozog,
 * kilépéskor pedig a tartalom hátrébb lép, átadva a helyet a következőnek.
 */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className,
  exitEffect = true,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotionSafe();
  const headingId = `${id}-title`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numeralY = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ["end 55%", "end start"],
  });
  const exitScale = useTransform(exitProgress, [0, 1], [1, 0.94]);
  const exitOpacity = useTransform(exitProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      tabIndex={-1}
      className={`relative isolate overflow-x-clip py-20 outline-none sm:py-28 ${className ?? ""}`}
    >
      <m.span
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: numeralY }}
        className="text-outline pointer-events-none absolute top-8 -right-[0.04em] -z-10 font-display text-[clamp(9rem,28vw,24rem)] leading-none font-bold tracking-[-0.06em] opacity-70 select-none"
      >
        {index}
      </m.span>

      <m.div
        style={reduceMotion || !exitEffect ? undefined : { scale: exitScale, opacity: exitOpacity }}
        // Alul 2.5rem tartalék (és ugyanennyi negatív margó): a megjelenő elemek a `reveal`
        // animáció elején legfeljebb 28 px-szel lejjebb vannak. Safari a dobozt rétegként
        // kezeli, és ami kilóg belőle, azt levágja (az utolsó kártyasor alsó szegélyét).
        className="section-shell -mb-10 origin-top pb-10"
      >
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
      </m.div>
    </section>
  );
}
