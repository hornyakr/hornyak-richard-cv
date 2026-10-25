"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/** Szám a szöveg elején, opcionális ezres tagolással: „5 év”, „2 100+”, „2 + 2”. */
const LEADING_NUMBER = /^(\d{1,3}(?:[  ]\d{3})*)(.*)$/s;

/** Ezres tagolás nem törő szóközzel, ahogy a CV-ben is („2 100+”). */
const format = (value: number) =>
  String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");

/**
 * Láthatóvá váláskor nulláról „felpörgő” szám. A szerver a végleges értéket
 * rendereli, így keresők és JavaScript nélküli böngészők is a valós adatot látják.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduceMotion = useReducedMotion();
  const match = LEADING_NUMBER.exec(value);
  const target = match ? Number(match[1]!.replace(/\D/g, "")) : null;
  const [display, setDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (target === null || reduceMotion || !inView) return;
    const controls = animate(0, target, {
      duration: target > 100 ? 1.6 : 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, target]);

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
