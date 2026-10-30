"use client";

import { m, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { fill, useContent } from "@/components/content-provider";
import { SparkIcon } from "@/components/icons";
import { ProjectCard, ProjectsGrid } from "@/components/projects";
import { RollingText } from "@/components/rolling-text";
import type { CV, Project, ProjectGroup } from "@/content/types";
import { useMediaQuery } from "@/lib/use-media-query";
import { useScrollTimelineSupport } from "@/lib/use-scroll-timeline";

type TrackItem =
  | { kind: "intro"; group: ProjectGroup }
  | { kind: "project"; group: ProjectGroup; project: Project };

const trackItems = (cv: CV): TrackItem[] =>
  cv.projectGroups.flatMap((group) => [
    { kind: "intro" as const, group },
    ...group.projects.map((project) => ({ kind: "project" as const, group, project })),
  ]);

// A sáv méretei: a CSS-ből számolt magasság csak akkor pontos, ha ezek egyeznek az osztályokkal.
const INTRO_REM = 22; // w-[22rem]
const CARD_REM = 32; // w-[min(32rem,78vw)], 1024 px felett mindig 32rem
const GAP_REM = 1.5; // gap-6
const TRACK_PADDING = "max(1.5rem, calc((100vw - 72rem) / 2 + 2rem))";

/** A sáv vízszintes útja tisztán CSS-ből, hogy a szerveren is a végleges magasságot rendereljük. */
const cssDistance = (items: TrackItem[]) => {
  const intros = items.filter((item) => item.kind === "intro").length;
  const rem =
    intros * INTRO_REM + (items.length - intros) * CARD_REM + (items.length - 1) * GAP_REM;
  return `max(0px, ${rem}rem + 2 * ${TRACK_PADDING} - 100vw)`;
};

/**
 * Rögzített, vízszintes projektsáv: a függőleges görgetés oldalirányban viszi
 * végig a kártyákat. Csak elég nagy képernyőn és engedélyezett mozgásnál.
 */
function ProjectsTrack() {
  const { cv } = useContent();
  const items = useMemo(() => trackItems(cv), [cv]);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  // Mérésig (és a szerveren) `null`: ilyenkor a CSS-ből számolt út adja a magasságot.
  const [distance, setDistance] = useState<number | null>(null);
  const distanceValue = useMotionValue(0);
  const [activeGroup, setActiveGroup] = useState(items[0]!.group.title);
  // Görgetésvezérelt CSS-animációval a mozgás a kompozitor szálon fut, a görgetéssel szinkronban;
  // e nélkül (pl. Firefox) a JS-es, rugóval simított eltolás a tartalék.
  const cssDriven = useScrollTimelineSupport();
  const trackDistance = distance === null ? cssDistance(items) : `${distance}px`;

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
  // Tartalék (görgetésvezérelt CSS-animáció nélkül): az eltolás rugó nélkül, közvetlenül a görgetést
  // követi (a simítás lemaradást és továbbcsúszást okozott), egész pixelre kerekítve, hogy a szöveg
  // ne remegjen.
  const x = useTransform(() => Math.round(-scrollYProgress.get() * distanceValue.get()));

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.min(items.length - 1, Math.floor(progress * items.length));
    setActiveGroup(items[index]!.group.title);
  });

  return (
    <div
      ref={containerRef}
      style={
        {
          height: `calc(100svh + ${trackDistance})`,
          "--track-distance": trackDistance,
        } as CSSProperties
      }
      className="projects-track-scope relative mx-[calc(50%-50vw)]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-16">
        <m.ul
          ref={trackRef}
          style={cssDriven ? { paddingInline: TRACK_PADDING } : { x, paddingInline: TRACK_PADDING }}
          className="projects-track flex w-max items-stretch gap-6 will-change-transform"
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
                {/* A sávban a kártyák a kurzor alatt haladnak el: nincs felemelkedés, ami közben ugrálna. */}
                <ProjectCard project={item.project} featured={item.group.featured} lift={false} />
              </li>
            ),
          )}
        </m.ul>

        <div className="section-shell mt-8 flex items-center gap-5">
          <RollingText value={activeGroup} className="font-mono text-xs text-ink-muted" />
          <div className="relative h-px flex-1 overflow-hidden bg-line">
            <m.div
              style={cssDriven ? undefined : { scaleX: scrollYProgress }}
              className="projects-track-progress absolute inset-0 origin-left bg-accent"
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

/**
 * Hidratálásig (és a szerveren) mindkét változat kirenderelődik, és a `track` töréspont
 * választ közöttük CSS-ből; különben asztalon a rács hidratálás után sávra cserélődne, és az
 * oldal magassága ugrana. Utána csak a látható marad meg, a pozíciók miatt újracsatolás nélkül.
 */
export function ProjectsShowcase() {
  const horizontal = useMediaQuery(
    "(min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)",
  );
  return (
    <>
      {horizontal !== true && (
        <div className={horizontal === null ? "track:hidden" : undefined}>
          <ProjectsGrid />
        </div>
      )}
      {horizontal !== false && (
        <div className={horizontal === null ? "hidden track:block" : undefined}>
          <ProjectsTrack />
        </div>
      )}
    </>
  );
}
