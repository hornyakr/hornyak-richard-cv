import { useSyncExternalStore } from "react";

const noSubscription = () => () => {};

/**
 * Ismeri-e a böngésző a görgetésvezérelt CSS-animációt (`animation-timeline`). Ahol igen, a
 * görgetéshez kötött mozgást a böngésző viszi, képkockára egyezően és JS nélkül; ahol nem (pl.
 * Firefox), a Motion-alapú mozgás a tartalék. A szerveren és hidratáláskor `false`, utána a valódi
 * érték; a CSS-animáció felülírja a közben beállított inline stílust.
 */
export function useScrollTimelineSupport() {
  return useSyncExternalStore(
    noSubscription,
    () => CSS.supports("animation-timeline: view()"),
    () => false,
  );
}
