"use client";

import type { PointerEvent, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/** Kártya, amelyen egy finom fény követi az egeret (érintőképernyőn nincs hatása). */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }

  return (
    <article onPointerMove={handlePointerMove} className={`spotlight ${className ?? ""}`}>
      {children}
    </article>
  );
}
