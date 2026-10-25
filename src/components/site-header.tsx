"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { cv } from "@/content/cv";
import { sections, type SectionId } from "@/lib/site";

/** Az éppen olvasott szekció a viewport felső harmadában. */
function useActiveSection(): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function SiteHeader() {
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <header
      data-scrolled={scrolled}
      className="group fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 data-[scrolled=true]:border-b data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/75 data-[scrolled=true]:backdrop-blur-xl"
    >
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-base font-semibold tracking-tight text-ink-heading"
        >
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-xs font-bold text-accent-ink"
          >
            HR
          </span>
          <span className="hidden sm:inline">{cv.name}</span>
        </a>

        <nav aria-label="Fő navigáció" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "location" : undefined}
                  className="relative block rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink-heading aria-[current=location]:text-ink-heading"
                >
                  {active === id && (
                    <m.span
                      layoutId="nav-pill"
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-muted"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#kapcsolat"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
          >
            Kapcsolat
          </a>
        </div>
      </div>

      {/* Olvasási előrehaladás */}
      <m.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-accent opacity-0 transition-opacity group-data-[scrolled=true]:opacity-100"
      />
    </header>
  );
}
