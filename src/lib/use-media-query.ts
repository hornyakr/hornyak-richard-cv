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
