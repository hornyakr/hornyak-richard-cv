"use client";

import {
  animate,
  useReducedMotion,
  type DOMKeyframesDefinition,
  type Transition,
} from "motion/react";
import { useLayoutEffect, type RefObject } from "react";

export type Box = { left: number; top: number; right: number; bottom: number };

/**
 * Csúszó kiemelés a Motion `layoutId`-ja helyett: az újonnan megjelenő jelölő az előző jelölő
 * helyéről csúszik a sajátjára. A `layoutId`-hoz be kellene tölteni a layout-funkciókat
 * (`domMax`), amelyek minden `m` elemhez layout-mérést kapcsolnak, és ez a betöltéskor és minden
 * váltáskor processzoridőt visz. Itt csak ez az egy elem mér, a megjelenésekor.
 *
 * A pozíciók a `container` szelektorral megtalált legközelebbi ősön belül értendők, így
 * görgetéstől és újracsatolástól függetlenek; a `memoryRef` a jelölők között viszi át az előző
 * helyet. Az ős a DOM-ból jön, nem refből: hidratáláskor a gyerek layout-effektje a szülő
 * refjének beállítása előtt fut.
 */
export function useSlideFromPrevious(
  ref: RefObject<HTMLElement | null>,
  container: string,
  memoryRef: RefObject<Box | null>,
  keyframes: (from: Box, to: Box) => DOMKeyframesDefinition,
  transition: Transition,
) {
  const reduceMotion = useReducedMotion();

  // Csak megjelenéskor fut: a jelölő minden váltáskor új elem.
  useLayoutEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement?.closest(container);
    if (!element || !parent) return;
    const origin = parent.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    const box = {
      left: rect.left - origin.left,
      top: rect.top - origin.top,
      right: rect.right - origin.left,
      bottom: rect.bottom - origin.top,
    };
    const previous = memoryRef.current;
    memoryRef.current = box;
    if (!previous || reduceMotion) return;
    const frames = keyframes(previous, box);
    // Az első kulcskocka azonnal, festés előtt: a Motion csak a következő képkockán írná ki,
    // addig egy képkockára a végleges helyén villanna fel.
    const first = (values: unknown) => (Array.isArray(values) ? Number(values[0]) : 0);
    for (const [property, values] of Object.entries(frames)) {
      if (property !== "x" && property !== "y") {
        element.style.setProperty(property, `${first(values)}px`);
      }
    }
    if ("x" in frames || "y" in frames) {
      element.style.transform = `translate(${first(frames.x)}px, ${first(frames.y)}px)`;
    }
    const controls = animate(element, frames, transition);
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
