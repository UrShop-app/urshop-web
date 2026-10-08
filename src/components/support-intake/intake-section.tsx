import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import type { IntakeKind } from "@/lib/support-intake/fields";

import { IntakeForm } from "./intake-form";

export type IntakeGuidance = { icon: IconName; title: string; body: string };

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

/** Tips on what to include (left) and the submission card (right). */
export function IntakeSection({
  kind,
  label,
  guidanceHeading,
  guidance,
  note,
}: {
  kind: IntakeKind;
  /** Accessible name for the section. */
  label: string;
  guidanceHeading: string;
  guidance: ReadonlyArray<IntakeGuidance>;
  /** A short aside under the tips (e.g. where else to go). */
  note: ReactNode;
}) {
  return (
    <section aria-label={label} className="relative px-6 pt-4 pb-16 sm:pb-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <h2
            className="intake-rise text-[12px] font-bold tracking-[0.18em] text-slate-500 uppercase"
            style={delay(0.35)}
          >
            {guidanceHeading}
          </h2>
          <ul className="mt-6 space-y-5">
            {guidance.map((item, index) => (
              <li
                key={item.title}
                className="intake-rise flex gap-4"
                style={delay(0.42 + index * 0.08)}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                  <Icon name={item.icon} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <aside
            className="intake-rise mt-8 flex gap-3 rounded-3xl border border-amber-200/80 bg-amber-50/80 p-4"
            style={delay(0.7)}
          >
            <Icon name="info" className="shrink-0 text-amber-700" />
            <div className="pt-0.5 text-sm leading-relaxed text-slate-700">{note}</div>
          </aside>
        </div>

        <div
          className="liquid-glass-card intake-rise rounded-3xl p-6 sm:p-8 lg:p-10"
          style={{ borderRadius: "28px", ...delay(0.25) }}
        >
          <IntakeForm kind={kind} />
        </div>
      </div>
    </section>
  );
}
