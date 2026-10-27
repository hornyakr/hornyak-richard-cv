"use client";

import { AnimatePresence, m } from "motion/react";
import { useSyncExternalStore } from "react";

import { useContent } from "@/components/content-provider";
import { MoonIcon, SunIcon } from "@/components/icons";
import { THEME_STORAGE_KEY } from "@/components/theme-script";

type Theme = "light" | "dark";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });

  // Ha nincs elmentett választás, a rendszerbeállítás változását is követjük.
  const media = matchMedia("(prefers-color-scheme: dark)");
  const onSystemChange = (event: MediaQueryListEvent) => {
    try {
      if (localStorage.getItem(THEME_STORAGE_KEY)) return;
    } catch {
      // A tárhely nem elérhető: a rendszert követjük.
    }
    document.documentElement.dataset.theme = event.matches ? "dark" : "light";
  };
  media.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media.removeEventListener("change", onSystemChange);
  };
}

export function ThemeToggle() {
  const { ui } = useContent().cv;
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Privát módban a választás csak erre a látogatásra él.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={next === "dark" ? ui.themeToDark : ui.themeToLight}
      title={next === "dark" ? ui.themeDarkTitle : ui.themeLightTitle}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface/70 text-ink transition-colors hover:border-line-strong hover:text-accent"
    >
      {theme === null ? (
        // Hidratálás előtt a téma még ismeretlen a React számára, de a ThemeScript már beállította:
        // a helyes ikont CSS választja ki, így a gomb nem üres az első képernyőn.
        <span className="grid place-items-center text-lg">
          <SunIcon className="dark:hidden" />
          <MoonIcon className="hidden dark:block" />
        </span>
      ) : (
        // Hidratálás után frissen mountolt AnimatePresence: az initial={false} miatt az első ikon
        // animáció nélkül jelenik meg, csak a későbbi váltások animáltak.
        <AnimatePresence initial={false} mode="wait">
          <m.span
            key={theme}
            initial={{ y: 14, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center text-lg"
          >
            {theme === "dark" ? <MoonIcon /> : <SunIcon />}
          </m.span>
        </AnimatePresence>
      )}
    </button>
  );
}
