"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { CheckIcon, SparkIcon } from "@/components/icons";
import { useContent } from "@/components/content-provider";
import { useReducedMotionSafe } from "@/lib/use-media-query";
import { useSlideFromPrevious, type Box } from "@/lib/use-slide-from-previous";

const STEP_MS = 1800;

/** Az aktív lépés pöttye: az előző lépés helyéről csúszik át. */
function ActiveDot({ memoryRef }: { memoryRef: RefObject<Box | null> }) {
  const ref = useRef<HTMLSpanElement>(null);
  useSlideFromPrevious(
    ref,
    "ol",
    memoryRef,
    (from, to) => ({ x: [from.left - to.left, 0], y: [from.top - to.top, 0] }),
    { type: "spring", stiffness: 300, damping: 30 },
  );
  return <span ref={ref} aria-hidden="true" className="ml-auto size-2 rounded-full bg-accent" />;
}

/** A munkafolyamat lépései, egy finoman végigfutó kiemeléssel. */
export function WorkflowCard() {
  const { cv } = useContent();
  const reduceMotion = useReducedMotionSafe();
  const steps = cv.workflowSteps;
  const [current, setCurrent] = useState(0);
  const dotMemory = useRef<Box | null>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => setCurrent((i) => (i + 1) % steps.length), STEP_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, steps.length]);

  // Csökkentett mozgásnál minden lépés „kész” állapotban, animáció nélkül.
  const activeIndex = reduceMotion ? steps.length : current;

  return (
    <figure className="card relative overflow-hidden p-5 shadow-[0_30px_80px_-40px_var(--glow)] sm:p-6">
      <div
        aria-hidden="true"
        className="glow-spot pointer-events-none absolute -top-56 -right-52 size-[30rem] [--glow-strength:17%]"
      />
      <figcaption className="mb-5 flex items-center justify-between gap-3">
        <span className="eyebrow">
          <SparkIcon className="text-sm" />
          {cv.ui.workflowTitle}
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-muted">
          {cv.ui.workflowBadge}
        </span>
      </figcaption>

      <ol className="relative space-y-2">
        {steps.map((step, index) => {
          const done = index < activeIndex;
          const isActive = index === activeIndex;
          return (
            <li
              key={step}
              data-state={isActive ? "active" : done ? "done" : "idle"}
              className="relative flex items-center gap-3 rounded-xl border border-line px-3.5 py-3 transition-colors duration-500 data-[state=active]:border-accent/60 data-[state=active]:bg-accent-soft"
            >
              <span
                className={`grid size-7 shrink-0 place-items-center rounded-full font-mono text-xs transition-colors duration-500 ${
                  done || isActive ? "bg-accent text-accent-ink" : "bg-surface-muted text-ink-muted"
                }`}
              >
                {done ? <CheckIcon /> : String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-ink-heading">{step}</span>
              {isActive && <ActiveDot memoryRef={dotMemory} />}
            </li>
          );
        })}
      </ol>

      <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-ink-muted">
        {cv.profile.aiNote}
      </p>
    </figure>
  );
}
