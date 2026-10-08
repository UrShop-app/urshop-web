import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  resourceGoals,
  resources,
  resourcesByGoal,
  resourceTypes,
  resourceTypesInUse,
  type Resource,
} from "@/data/resources";
import { cn } from "@/lib/utils";

import {
  Highlight,
  LibraryEmpty,
  LibraryFilters,
  ResourceGroup,
  ResourceItem,
} from "./resource-discovery";

function TypeLabel({ resource, tone = "muted" }: { resource: Resource; tone?: "muted" | "light" }) {
  return (
    <span
      className={
        tone === "light"
          ? "text-[11px] font-bold tracking-[0.14em] text-white/70 uppercase"
          : "text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase"
      }
    >
      {resourceTypes[resource.type].label}
      {resource.meta ? (
        <span className="tracking-normal normal-case"> · {resource.meta}</span>
      ) : null}
    </span>
  );
}

/** A goal's strongest resource: a dark brand tile that anchors the group. */
function LeadTile({ resource }: { resource: Resource }) {
  return (
    <Link
      href={resource.href}
      className="group relative flex h-full min-h-56 flex-col overflow-clip rounded-3xl bg-linear-to-br from-slate-900 via-slate-900 to-sky-950 p-6 text-white shadow-[0_24px_48px_-20px_rgba(2,132,199,0.55)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7"
      style={{ borderRadius: "28px" }}
    >
      <span
        className="pointer-events-none absolute -top-16 -right-16 size-56 rounded-full bg-brand/30 blur-3xl transition-transform duration-700 group-hover:scale-125"
        aria-hidden="true"
      />
      <span className="lead-tile-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <span className="relative grid size-12 place-items-center rounded-2xl bg-linear-to-br from-brand to-brand-dark shadow-[0_10px_22px_-8px_rgba(8,192,216,0.8)]">
        <Icon name={resource.icon} />
      </span>
      <span className="relative mt-auto pt-10">
        <TypeLabel resource={resource} tone="light" />
        <span className="mt-2 block text-2xl leading-tight font-extrabold tracking-tight text-balance">
          <Highlight text={resource.title} />
        </span>
        <span className="mt-2 block text-sm text-white/70">
          <Highlight text={resource.description} />
        </span>
      </span>
      <span className="absolute top-6 right-6 grid size-10 place-items-center rounded-full bg-white/10 transition-[background-color,rotate] duration-300 group-hover:-rotate-45 group-hover:bg-brand sm:top-7 sm:right-7">
        <Icon name="arrow_forward" />
      </span>
    </Link>
  );
}

/** Any other resource: one compact card, title first. */
function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Link
      href={resource.href}
      title={resource.description}
      className="liquid-glass-card glass-lift group flex h-full items-center gap-3.5 rounded-2xl p-4 transition-[box-shadow,translate] duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark motion-reduce:transition-none motion-reduce:hover:translate-y-0"
      style={{ borderRadius: "20px" }}
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-light/80 text-brand-dark transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
        <Icon name={resource.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block leading-snug font-bold text-slate-900">
          <Highlight text={resource.title} />
        </span>
        <TypeLabel resource={resource} />
      </span>
      <Icon
        name="arrow_forward"
        className="shrink-0 text-slate-300 transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:text-brand motion-reduce:transition-none"
      />
    </Link>
  );
}

/** Every resource, grouped by goal, with search, goal and type filters. */
export function ResourceLibrary() {
  const goalOptions = resourceGoals.map((goal) => ({
    id: goal.id,
    label: goal.navLabel,
    icon: goal.icon,
    count: resourcesByGoal(goal.id).length,
  }));
  const typeOptions = resourceTypesInUse.map((type) => ({
    id: type,
    label: resourceTypes[type].pluralLabel,
    count: resources.filter((resource) => resource.type === type).length,
  }));

  return (
    <section
      id="library"
      aria-labelledby="library-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="library-heading"
          eyebrow="Library"
          title="Every resource, by goal"
          className="reveal"
        />

        <div className="mt-8">
          <LibraryFilters goals={goalOptions} types={typeOptions} />
        </div>

        <div className="mt-10 space-y-12">
          {resourceGoals.map((goal) => {
            const goalResources = resourcesByGoal(goal.id);
            const headingId = `goal-${goal.id}-heading`;
            return (
              <ResourceGroup
                key={goal.id}
                goalId={goal.id}
                headingId={headingId}
                itemIds={goalResources.map((resource) => resource.id)}
              >
                <h3
                  id={headingId}
                  className="mb-4 flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl"
                >
                  <Icon name={goal.icon} className="text-brand" />
                  {goal.title}
                </h3>
                <ul className="grid grid-flow-dense gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {goalResources.map((resource, index) => (
                    <ResourceItem
                      key={resource.id}
                      id={resource.id}
                      className={cn(
                        index === 0 && "sm:col-span-2 lg:col-span-1",
                        // Two rows tall only when there are enough cards to sit beside it.
                        index === 0 && goalResources.length > 3 && "lg:row-span-2",
                      )}
                    >
                      {index === 0 ? (
                        <LeadTile resource={resource} />
                      ) : (
                        <ResourceCard resource={resource} />
                      )}
                    </ResourceItem>
                  ))}
                </ul>
              </ResourceGroup>
            );
          })}

          <LibraryEmpty>
            <p className="font-bold text-slate-800">Nothing here yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              Try another word, or{" "}
              <Link
                href="/faq"
                className="font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4"
              >
                search the FAQ
              </Link>
              .
            </p>
          </LibraryEmpty>
        </div>
      </div>
    </section>
  );
}
