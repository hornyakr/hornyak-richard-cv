"use client";

import { ArrowUpRightIcon, LockIcon, SparkIcon } from "@/components/icons";
import { SpotlightCard } from "@/components/spotlight-card";
import { useContent } from "@/components/content-provider";
import type { Project } from "@/content/types";

function Tags({ tags }: { tags: readonly string[] }) {
  const { ui } = useContent().cv;
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label={ui.tagsLabel}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-surface-muted px-2.5 py-1 text-xs text-ink-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const { ui } = useContent().cv;
  return (
    <SpotlightCard
      className={`card flex h-full flex-col p-6 transition-[border-color,transform] duration-300 hover:border-line-strong motion-safe:hover:-translate-y-1 sm:p-7 ${
        featured ? "border-accent/35" : ""
      }`}
    >
      <header>
        <p className="font-mono text-xs text-ink-muted">{project.context}</p>
        <h4 className="mt-3 font-display text-2xl font-semibold tracking-tight">{project.title}</h4>
        <p className="mt-1 font-medium text-accent">{project.tagline}</p>
      </header>

      <p className="mt-4 leading-relaxed text-ink-muted">{project.description}</p>

      {project.metrics && (
        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col bg-surface p-3">
              <dt className="order-2 mt-0.5 text-xs leading-snug text-ink-muted">{metric.label}</dt>
              <dd className="order-1 font-display text-xl font-semibold text-ink-heading">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-auto pt-6">
        <Tags tags={project.tags} />
        {(project.isPrivate || project.link) && (
          <div className="mt-5 border-t border-line pt-4">
            {project.isPrivate && (
              <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
                <LockIcon className="text-accent" />
                {ui.privateRepo}
              </p>
            )}
            {project.link && (
              <a
                href={project.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-heading transition-colors hover:text-accent"
              >
                {project.link.label}
                <ArrowUpRightIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="sr-only">{ui.opensInNewTab}</span>
              </a>
            )}
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}

/** Csoportosított rácsnézet (mobil, kisebb képernyő, csökkentett mozgás). */
export function ProjectsGrid() {
  const { cv } = useContent();
  return (
    <div className="space-y-20">
      {cv.projectGroups.map((group) => (
        <div key={group.id}>
          <div
            className={`reveal mb-8 ${
              group.featured
                ? "rounded-2xl border border-accent/30 bg-accent-soft/60 p-5 sm:p-6"
                : ""
            }`}
          >
            <h3 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight sm:text-2xl">
              {group.featured && <SparkIcon className="text-accent" />}
              {group.title}
            </h3>
            <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{group.intro}</p>
          </div>
          <ul className={`grid gap-5 ${group.featured ? "lg:grid-cols-2" : "md:grid-cols-2"}`}>
            {group.projects.map((project) => (
              <li key={project.title} className="reveal">
                <ProjectCard project={project} featured={group.featured} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
