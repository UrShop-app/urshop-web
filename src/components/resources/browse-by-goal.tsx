import { Icon } from "@/components/ui/icon";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { SectionHeading } from "@/components/ui/section-heading";
import { resourceGoals, resourcesByGoal } from "@/data/resources";
import { cn } from "@/lib/utils";

import { GoalArt } from "./goal-art";
import { GoalFilterLink } from "./resource-discovery";

/** "What are you trying to do?": one illustrated tile per goal; each opens it in the library. */
export function BrowseByGoal() {
  return (
    <section
      aria-labelledby="browse-by-goal-heading"
      className="relative px-6 py-14 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="browse-by-goal-heading"
          eyebrow="Browse by goal"
          title="What do you want to do?"
          className="reveal"
        />
        <PauseOffscreen>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resourceGoals.map((goal, index) => {
              const count = resourcesByGoal(goal.id).length;
              return (
                <li
                  key={goal.id}
                  className={cn(
                    "reveal",
                    index % 3 === 1 && "reveal-delay-1",
                    index % 3 === 2 && "reveal-delay-2",
                  )}
                >
                  <GoalFilterLink
                    goalId={goal.id}
                    resetSearch
                    className="goal-tile group flex h-full flex-col rounded-3xl p-3 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    activeClassName="goal-tile-active"
                  >
                    <GoalArt goal={goal.id} />
                    <span className="flex items-end justify-between gap-3 px-2 pt-4 pb-1">
                      <span className="min-w-0">
                        <span className="block text-lg leading-snug font-extrabold tracking-tight text-slate-900">
                          {goal.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-slate-500">
                          {goal.description}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500 shadow-sm transition-colors group-hover:text-brand-dark">
                        {count}
                        <span className="sr-only"> resources</span>
                        <Icon
                          name="arrow_downward"
                          className="scale-75 transition-transform duration-300 group-hover:translate-y-0.5"
                        />
                      </span>
                    </span>
                  </GoalFilterLink>
                </li>
              );
            })}
          </ul>
        </PauseOffscreen>
      </div>
    </section>
  );
}
