"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";

import { fill, useContent } from "@/components/content-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { RollingText } from "@/components/rolling-text";
import { ThemeToggle } from "@/components/theme-toggle";
import type { CV, SectionKey } from "@/content/types";
import { useMediaQuery } from "@/lib/use-media-query";

const spring = { type: "spring", stiffness: 420, damping: 36 } as const;

/** Az éppen olvasott fejezet kulcsa; a hero fölött `null`. */
function useActiveSection(cv: CV): SectionKey | null {
  const [active, setActive] = useState<SectionKey | null>(null);

  useEffect(() => {
    const keyById = new Map(
      (Object.keys(cv.sections) as SectionKey[]).map((key) => [cv.sections[key].id, key]),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setActive(keyById.get(entry.target.id) ?? null);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const id of ["top", ...keyById.keys()]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [cv]);

  return active;
}

/**
 * Fejezetre ugrás: a menü bezárása megszakítaná a böngésző saját horgonygörgetését,
 * ezért a görgetést és a fókuszt a React-frissítés után mi végezzük.
 */
function goToSection(id: string) {
  window.setTimeout(() => {
    const target = document.getElementById(id);
    if (!target) return;
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    target.focus({ preventScroll: true });
    history.replaceState(null, "", `#${id}`);
  }, 0);
}

/**
 * Horgonnyal érkezve (pl. nyelvváltás után) a böngésző még a hidratálás előtt görget,
 * de a projektsáv utána megváltoztatja az oldal magasságát. Ezért a betöltés után
 * egyszer újra a horgonyhoz igazítunk.
 */
function useInitialHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const align = () => target.scrollIntoView({ behavior: "instant" });
    align();
    const observer = new ResizeObserver(align);
    observer.observe(document.body);
    // Tartalék, ha a ResizeObserver nem fut (pl. háttérben lévő lap).
    const retries = [400, 1000].map((delay) => window.setTimeout(align, delay));

    // A felhasználó saját görgetése vagy 1,5 s után már nem igazítunk.
    const stop = () => {
      observer.disconnect();
      window.clearTimeout(timer);
      retries.forEach((retry) => window.clearTimeout(retry));
      for (const event of userScrollEvents) window.removeEventListener(event, stop);
    };
    const userScrollEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const timer = window.setTimeout(stop, 1500);
    for (const event of userScrollEvents) window.addEventListener(event, stop, { passive: true });
    return stop;
  }, []);
}

/** Görgetéssel kitöltődő gyűrű: a teljes oldal olvasottsága. */
function ProgressRing({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6 -rotate-90" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2.5" className="stroke-line" />
      <m.circle
        cx="12"
        cy="12"
        r="9.5"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-accent"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}

/**
 * „Dynamic island” navigáció: a lap tetején kinyitott menü, görgetés közben
 * egy kapszulává húzódik össze, amely mutatja az aktuális fejezetet és az olvasottságot.
 * Asztalon rámutatásra, mobilon koppintásra nyílik ki.
 */
export function SiteHeader() {
  const { cv } = useContent();
  const { ui } = cv;
  const sections = (Object.keys(cv.sections) as SectionKey[]).map((key) => ({
    key,
    ...cv.sections[key],
  }));
  const active = useActiveSection(cv);
  useInitialHashScroll();
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuId = useId();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 80));

  const activeIndex = sections.findIndex((section) => section.key === active);
  const chapterNumber = activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : "00";
  const chapterLabel = activeIndex >= 0 ? sections[activeIndex]!.label : ui.introChapter;
  const inline = isDesktop && (!scrolled || hovered);
  const dropdownOpen = menuOpen && !inline;

  // A kinyitott fejezetsor és az összecsukott kapszula; a `className` a töréspontos megjelenítéshez kell.
  const inlineNav = (className = "") => (
    <m.ul
      key="inline"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.25 }}
      className={`flex items-center gap-0.5 ${className}`}
    >
      {sections.map(({ key, id, label }, index) => (
        <li key={key}>
          <a
            href={`#${id}`}
            aria-current={active === key ? "location" : undefined}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-muted transition-colors hover:text-ink-heading aria-[current=location]:text-ink-heading"
          >
            {active === key && (
              <m.span
                layoutId="nav-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-surface-muted"
                transition={spring}
              />
            )}
            <span aria-hidden="true" className="font-mono text-[10px] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            {label}
          </a>
        </li>
      ))}
    </m.ul>
  );

  const compactNav = (className = "") => (
    <m.button
      key="compact"
      type="button"
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={{ opacity: 1, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.25 }}
      onClick={() => setMenuOpen((open) => !open)}
      aria-expanded={dropdownOpen}
      aria-controls={menuId}
      aria-label={fill(ui.chaptersMenu, { chapter: chapterLabel })}
      className={`flex items-center gap-2 rounded-full py-0.5 pr-2 pl-1 sm:gap-2.5 sm:pr-3 ${className}`}
    >
      <ProgressRing progress={scrollYProgress} />
      <RollingText value={chapterNumber} className="font-mono text-xs text-accent" />
      <RollingText
        value={chapterLabel}
        className="min-w-[5rem] text-left text-sm font-medium text-ink-heading sm:min-w-[6.5rem]"
      />
      <m.svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        animate={{ rotate: dropdownOpen ? 180 : 0 }}
        className="size-4 text-ink-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="m6 9 6 6 6-6" />
      </m.svg>
    </m.button>
  );

  // Kívülre kattintás és Escape bezárja a menüt.
  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
        <a
          href="#top"
          aria-label={`${cv.name} – ${ui.backToTop}`}
          className="pointer-events-auto grid size-10 shrink-0 place-items-center rounded-xl bg-accent font-mono text-sm font-bold text-accent-ink shadow-[0_8px_24px_-8px_var(--glow)] transition-transform hover:-rotate-6 active:scale-95"
        >
          HR
        </a>

        <nav
          ref={navRef}
          aria-label={ui.chaptersNav}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) setHovered(false);
          }}
          className="pointer-events-auto relative"
        >
          <m.div
            layout
            transition={spring}
            style={{ borderRadius: 999 }}
            className="border border-line bg-surface/75 p-1.5 shadow-[0_18px_50px_-24px_rgb(0_0_0/0.35)] backdrop-blur-xl"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {isDesktop === null
                ? // Hidratálás előtt még nem tudjuk a képernyőméretet: mindkét változat a HTML-ben van,
                  // és CSS dönt, így asztalon nem a kapszula villan fel, majd ugrik át a teljes menüre.
                  [inlineNav("hidden min-[1200px]:flex"), compactNav("min-[1200px]:hidden")]
                : inline
                  ? inlineNav()
                  : compactNav()}
            </AnimatePresence>
          </m.div>

          <AnimatePresence>
            {dropdownOpen && (
              <m.ul
                id={menuId}
                initial={{ opacity: 0, x: "-50%", y: -8, scale: 0.96 }}
                animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                exit={{ opacity: 0, x: "-50%", y: -8, scale: 0.96 }}
                transition={spring}
                className="absolute top-[calc(100%+0.5rem)] left-1/2 w-64 origin-top rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.45)]"
              >
                {sections.map(({ key, id, label }, index) => (
                  <li key={key}>
                    <a
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        setMenuOpen(false);
                        goToSection(id);
                      }}
                      aria-current={active === key ? "location" : undefined}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-muted transition-colors hover:bg-surface-muted hover:text-ink-heading aria-[current=location]:bg-accent-soft aria-[current=location]:text-ink-heading"
                    >
                      <span aria-hidden="true" className="font-mono text-xs text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </m.ul>
            )}
          </AnimatePresence>
        </nav>

        <div className="pointer-events-auto flex shrink-0 items-center gap-2">
          <LanguageSwitcher activeSection={active} />
          <ThemeToggle />
          <a
            href={`#${cv.sections.contact.id}`}
            className="hidden rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong sm:inline-block"
          >
            {ui.headerContact}
          </a>
        </div>
      </div>
    </header>
  );
}
