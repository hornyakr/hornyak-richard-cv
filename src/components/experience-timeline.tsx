"use client";

import { m, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

import { ArrowUpRightIcon } from "@/components/icons";
import { useContent } from "@/components/content-provider";

/** Idővonal, amelynek vonala görgetés közben „kitöltődik”. */
export function ExperienceTimeline() {
  const { cv } = useContent();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div>
      <ol ref={listRef} className="relative space-y-10 pl-8 sm:space-y-14 sm:pl-12">
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-line sm:left-[11px]"
        />
        <m.span
          aria-hidden="true"
          style={{ scaleY }}
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent sm:left-[11px]"
        />

        {cv.experience.map((job) => (
          <li key={job.company} className="reveal relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-8 size-[15px] rounded-full border-2 border-accent bg-bg sm:-left-12 sm:size-[23px] sm:border-[3px]"
            />
            <article className="card p-5 sm:p-8">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {job.company}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent sm:text-base">{job.role}</p>
                </div>
                <p className="shrink-0 font-mono text-sm text-ink-muted">{job.period}</p>
              </header>
              <p className="mt-5 leading-relaxed text-ink">{job.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {job.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.95rem] leading-relaxed text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {job.references && (
                <p className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm">
                  <span className="text-ink-muted">{cv.ui.references}</span>
                  {job.references.map((ref) => (
                    <a
                      key={ref.href}
                      href={ref.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-line px-3 py-1 text-ink-heading transition-colors hover:border-accent hover:text-accent"
                    >
                      {ref.label}
                      <ArrowUpRightIcon className="text-xs" />
                      <span className="sr-only">{cv.ui.opensInNewTab}</span>
                    </a>
                  ))}
                </p>
              )}
            </article>
          </li>
        ))}
      </ol>

      <div className="reveal mt-16">
        <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-ink-muted uppercase">
          {cv.ui.earlierExperience}
        </h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-2">
          {cv.earlierExperience.map((job) => (
            <li key={job.company} className="card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-semibold text-ink-heading">{job.company}</p>
                <p className="font-mono text-xs text-ink-muted">{job.period}</p>
              </div>
              <p className="mt-1 text-sm text-accent">{job.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{job.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
