"use client";

import { useRef, type ReactNode } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { Avatar, DemoFrame, PendingPill, Pill } from "./demo-kit";

// 0: the team · 1: invite a new person by email · 2: they accept with their own login ·
// 3: someone leaves and their account is suspended.
const DURATIONS = [2600, 2200, 2600, 3600];

const SIGN_IN: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "password", label: "Password" },
  { icon: "verified_user", label: "Authenticator code" },
  { icon: "key", label: "Recovery codes" },
];

const CAPTIONS = [
  "Everyone has their own login.",
  "Invite a new team member by email.",
  "They join with their own account.",
  "Someone left? Suspend their account.",
];

type Member = {
  initials: string;
  name: string;
  role: string;
  color: string;
};

// Example people and roles, not real accounts.
const OWNER: Member = { initials: "YO", name: "You", role: "Owner", color: "#0284c7" };
const NADIA: Member = { initials: "NA", name: "Nadia", role: "Operations", color: "#0f766e" };
const RAFI: Member = { initials: "RA", name: "Rafi", role: "Catalog", color: "#b45309" };
const TANVIR: Member = { initials: "TA", name: "Tanvir", role: "Support", color: "#7c3aed" };

function MemberRow({
  member,
  status,
  dimmed = false,
  className,
}: {
  member: Member;
  status: ReactNode;
  dimmed?: boolean;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white px-3 py-2.5 transition-opacity duration-500",
        dimmed && "opacity-55",
        className,
      )}
    >
      <Avatar initials={member.initials} color={member.color} />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-slate-800">{member.name}</span>
        <span className="block text-xs text-slate-500">{member.role}</span>
      </span>
      {status}
    </li>
  );
}

/** A team where everyone signs in as themselves, and access can be withdrawn per person. */
export function TeamAccessDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 3 });
  const step = demo.step;

  return (
    <div ref={demoRef}>
      <DemoFrame
        title="Team"
        icon={<Icon name="group" className="text-brand" />}
        actions={<AutoplayButton demo={demo} />}
      >
        <div aria-hidden="true" className="mt-4 select-none">
          <ul className="space-y-2">
            <MemberRow
              member={OWNER}
              status={
                <Pill tone="brand">
                  <Icon name="verified_user" className="scale-[0.6]" />
                  Two-factor on
                </Pill>
              }
            />
            <MemberRow member={NADIA} status={<Pill tone="success">Own login</Pill>} />
            <MemberRow
              member={RAFI}
              dimmed={step >= 3}
              status={
                step >= 3 ? (
                  <Pill tone="locked">
                    <Icon name="person_off" className="scale-[0.6]" />
                    Suspended
                  </Pill>
                ) : (
                  <Pill tone="success">Own login</Pill>
                )
              }
            />
            <MemberRow
              member={TANVIR}
              className={cn(
                "transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                step >= 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
              )}
              status={
                step >= 2 ? (
                  <Pill tone="success">Own login</Pill>
                ) : (
                  <PendingPill>Invite sent</PendingPill>
                )
              }
            />
          </ul>

          <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center">
            {SIGN_IN.map((item) => (
              <span key={item.label} className="flex flex-col items-center gap-1">
                <span className="grid size-8 place-items-center rounded-xl bg-white text-brand-dark shadow-sm">
                  <Icon name={item.icon} className="scale-75" />
                </span>
                <span className="text-[11px] leading-tight font-semibold text-slate-600">
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </DemoFrame>

      <p aria-live="polite" className="mt-4 px-1 text-sm text-slate-600">
        {CAPTIONS[step]}
      </p>
    </div>
  );
}
