"use client";

import { AnimatePresence, m } from "motion/react";

/** Függőlegesen „átgördülő” szöveg: fejezetváltáskor a régi felfelé kifut, az új alulról érkezik. */
export function RollingText({ value, className }: { value: string; className?: string }) {
  return (
    <span className={`relative inline-grid overflow-hidden ${className ?? ""}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={value}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-110%", opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="block whitespace-nowrap"
        >
          {value}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
