"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Szám a szöveg elején, opcionális ezres tagolással: „5 év”, „2 100+”, „2,100+”, „2 + 2”. */
const LEADING_NUMBER = /^(\d{1,3}(?:[ \u00a0,]\d{3})*)(.*)$/s;

/** Ezres tagolás ugyanazzal az elválasztóval, mint az eredeti szövegben (szóköz vagy vessző). */
const format = (value: number, separator: string) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, separator);

/**
 * Láthatóvá váláskor nulláról „felpörgő” szám. A szerver a végleges értéket
 * rendereli, így keresők és JavaScript nélküli böngészők is a valós adatot látják.
 * Ami már a betöltéskor a képernyőn van, az a végleges értéken marad: különben a
 * hidratálás után a látott szám visszaugrana nullára.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const match = LEADING_NUMBER.exec(value);
  const target = match ? Number(match[1]!.replace(/\D/g, "")) : null;
  const separator = match?.[1]!.match(/\D/)?.[0] === "," ? "," : "\u00a0";
  const [display, setDisplay] = useState<string | null>(null);
  const visibleOnLoad = useRef<boolean | null>(null);

  // Az IntersectionObserver aszinkron jelez, ez a hatás tehát előbb fut le, mint az animációé.
  useEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    visibleOnLoad.current = rect ? rect.top < window.innerHeight && rect.bottom > 0 : false;
  }, []);

  useEffect(() => {
    if (target === null || reduceMotion || !inView || visibleOnLoad.current) return;
    const controls = animate(0, target, {
      duration: target > 100 ? 1.6 : 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest, separator)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target, separator]);

  if (!match) return <span ref={ref}>{value}</span>;

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {display ?? match[1]}
      </span>
      <span aria-hidden="true">{match[2]}</span>
    </span>
  );
}
