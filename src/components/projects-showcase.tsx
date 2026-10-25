"use client";

import {
  m,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { fill, useContent } from "@/components/content-provider";
import { SparkIcon } from "@/components/icons";
import { ProjectCard, ProjectsGrid } from "@/components/projects";
import { RollingText } from "@/components/rolling-text";
import type { CV, Project, ProjectGroup } from "@/content/types";
import { useMediaQuery } from "@/lib/use-media-query";

type TrackItem =
  | { kind: "intro"; group: ProjectGroup }
  | { kind: "project"; group: ProjectGroup; project: Project };

const trackItems = (cv: CV): TrackItem[] =>
  cv.projectGroups.flatMap((group) => [
    { kind: "intro" as const, group },
    ...group.projects.map((project) => ({ kind: "project" as const, group, project })),
  ]);

/**
 * Rögzített, vízszintes projektsáv: a függőleges görgetés oldalirányban viszi
 * végig a kártyákat. Csak elég nagy képernyőn és engedélyezett mozgásnál.
 */
function ProjectsTrack() {
  const { cv } = useContent();
  const items = useMemo(() => trackItems(cv), [cv]);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [distance, setDistance] = useState(0);
  const distanceValue = useMotionValue(0);
  const [activeGroup, setActiveGroup] = useState(items[0]!.group.title);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - window.innerWidth);
      setDistance(next);
      distanceValue.set(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distanceValue]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(() => -scrollYProgress.get() * distanceValue.get());
  const x = useSpring(rawX, { stiffness: 260, damping: 42, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(items.length - 1, Math.floor(progress * items.length));
    setActiveGroup(items[index]!.group.title);
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `calc(100svh + ${distance}px)` }}
      className="relative mx-[calc(50%-50vw)]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        <m.ul
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-stretch gap-6 px-[max(1.5rem,calc((100vw-72rem)/2+2rem))]"
        >
          {items.map((item) =>
            item.kind === "intro" ? (
              <li key={`intro-${item.group.id}`} className="flex w-[22rem] shrink-0">
                <div
                  className={`flex w-full flex-col justify-end rounded-2xl p-7 ${
                    item.group.featured
                      ? "border border-accent/30 bg-accent-soft/70"
                      : "border border-dashed border-line-strong"
                  }`}
                >
                  {item.group.featured && <SparkIcon className="mb-auto text-3xl text-accent" />}
                  <p className="eyebrow">
                    {fill(cv.ui.projectCount, { count: item.group.projects.length })}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-tight">
                    {item.group.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{item.group.intro}</p>
                </div>
              </li>
            ) : (
              <li key={item.project.title} className="flex w-[min(32rem,78vw)] shrink-0">
                <ProjectCard project={item.project} featured={item.group.featured} />
              </li>
            ),
          )}
        </m.ul>

        <div className="section-shell mt-8 flex items-center gap-5">
          <RollingText value={activeGroup} className="font-mono text-xs text-ink-muted" />
          <div className="relative h-px flex-1 overflow-hidden bg-line">
            <m.div
              style={{ scaleX: scrollYProgress }}
              className="absolute inset-0 origin-left bg-accent"
            />
          </div>
          <span className="font-mono text-xs text-ink-muted" aria-hidden="true">
            {cv.ui.scrollHint}
          </span>
        </div>
      </div>
    </div>
  );
}

export function ProjectsShowcase() {
  const horizontal = useMediaQuery(
    "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
  );
  return horizontal ? <ProjectsTrack /> : <ProjectsGrid />;
}
