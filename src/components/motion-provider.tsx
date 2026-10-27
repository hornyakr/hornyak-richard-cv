"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * LazyMotion: csak a szükséges Motion-funkciók kerülnek a bundle-be (`m.*` komponensek).
 * `domAnimation`, nem `domMax`: a layout- és drag-funkciók minden `m` elemhez layout-mérést
 * kapcsolnának; a csúszó kiemeléseket a `useSlideFromPrevious` oldja meg nélkülük.
 * reducedMotion="user": a `prefers-reduced-motion` beállítást minden animáció tiszteletben tartja.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
