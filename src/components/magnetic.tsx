"use client";

import { m, useReducedMotion, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

const springConfig = { stiffness: 260, damping: 18, mass: 0.5 };

/** Mágneses elem: egérrel közelítve finoman a kurzor felé húzódik. */
export function Magnetic({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  function handleMove(event: PointerEvent<HTMLSpanElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <m.span
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="inline-flex"
    >
      {children}
    </m.span>
  );
}
