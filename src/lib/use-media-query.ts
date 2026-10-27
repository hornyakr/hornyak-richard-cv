"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Media query állapota. Szerveren és hidratáláskor `null` („még nem tudjuk”): ilyenkor a
 * komponens CSS-sel (töréspont-osztályokkal) döntsön, különben a hidratálás után látványosan
 * átrendeződik az első képernyő.
 */
export function useMediaQuery(query: string): boolean | null {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => matchMedia(query).matches,
    () => null,
  );
}

/**
 * `prefers-reduced-motion: reduce`, hidratálásbiztosan: hidratálásig `false`, mint a szerveren.
 * A Motion `useReducedMotion`-je már a hidratáló rendernél a valódi értéket adja; ha a render
 * függ tőle, a kliens eltér a szerver HTML-jétől (React #418), és a React eldobja a HTML-t és
 * újrarenderel. Csak effektben használt értékhez maradhat a Motion-féle.
 */
export function useReducedMotionSafe(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)") === true;
}
