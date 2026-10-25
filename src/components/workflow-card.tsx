"use client";

import { m, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { CheckIcon, SparkIcon } from "@/components/icons";
import { useContent } from "@/components/content-provider";

const STEP_MS = 1800;

/** A munkafolyamat lépései, egy finoman végigfutó kiemeléssel. */
export function WorkflowCard() {
  const { cv } = useContent();
  const reduceMotion = useReducedMotion();
  const steps = cv.workflowSteps;
  const [current, setCurrent] = useState(0);

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
        className="pointer-events-none absolute -top-24 -right-20 size-56 rounded-full bg-accent/20 blur-3xl"
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
              {isActive && (
                <m.span
                  layoutId="workflow-active"
                  aria-hidden="true"
                  className="ml-auto size-2 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
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
