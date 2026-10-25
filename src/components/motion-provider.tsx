"use client";

import { LazyMotion, MotionConfig, domMax } from "motion/react";

/**
 * LazyMotion: csak a szükséges Motion-funkciók kerülnek a bundle-be (`m.*` komponensek).
 * reducedMotion="user": a `prefers-reduced-motion` beállítást minden animáció tiszteletben tartja.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
