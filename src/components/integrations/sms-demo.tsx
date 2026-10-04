"use client";

import { useRef, useState } from "react";

import { AutoplayButton, Segmented } from "@/components/ui/demo-controls";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";

import { Card, EXAMPLE_ORDER, MessageBubble, PhoneFrame, Pill, at } from "./demo-bits";

type Language = "en" | "bn";

// Example templates; merchants edit their own. Order SMS covers placed, confirmed, delivered and
// cancelled (src/data/features.ts, "sms-marketing"); there is no shipped-event SMS.
const MESSAGES: ReadonlyArray<{ event: string; text: Record<Language, string> }> = [
  {
    event: "Order placed",
    text: {
      en: `Order ${EXAMPLE_ORDER.number} placed. Total ${EXAMPLE_ORDER.total}. We'll confirm it soon.`,
      bn: `অর্ডার ${EXAMPLE_ORDER.number} গ্রহণ করা হয়েছে। মোট ${EXAMPLE_ORDER.total}।`,
    },
  },
  {
    event: "Order confirmed",
    text: {
      en: `Order ${EXAMPLE_ORDER.number} is confirmed.`,
      bn: `অর্ডার ${EXAMPLE_ORDER.number} নিশ্চিত করা হয়েছে।`,
    },
  },
  {
    event: "Order delivered",
    text: {
      en: `Order ${EXAMPLE_ORDER.number} delivered. Thank you!`,
      bn: `অর্ডার ${EXAMPLE_ORDER.number} ডেলিভারি হয়েছে। ধন্যবাদ!`,
    },
  },
];

/** Order SMS arriving one event at a time, in English or Bangla, with the send log beside it. */
export function SmsDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: [2400, 2400, 3400],
    reducedMotionStep: MESSAGES.length - 1,
  });
  const [language, setLanguage] = useState<Language>("en");
  const shown = MESSAGES.slice(0, demo.step + 1);

  return (
    <div ref={demoRef}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="SMS language"
          value={language}
          onChange={setLanguage}
          options={[
            { value: "en", label: "English" },
            { value: "bn", label: "বাংলা" },
          ]}
        />
        <AutoplayButton demo={demo} />
      </div>

      <div aria-hidden="true" className="grid items-center gap-5 select-none sm:grid-cols-2">
        <PhoneFrame title="Your brand">
          {shown.map((message, index) => (
            <MessageBubble
              key={message.event}
              className={index === shown.length - 1 ? "demo-in" : "opacity-70"}
              style={at(0.15)}
            >
              {message.text[language]}
            </MessageBubble>
          ))}
        </PhoneFrame>

        <Card className="space-y-2">
          <p className="text-sm font-bold text-slate-900">SMS log</p>
          {MESSAGES.map((message, index) => (
            <div
              key={message.event}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"
            >
              <span className="font-semibold text-slate-700">{message.event}</span>
              {index <= demo.step ? (
                <span className="demo-pop" style={at(0.3)}>
                  <Pill tone="success">Sent</Pill>
                </span>
              ) : (
                <Pill tone="neutral">Waiting</Pill>
              )}
            </div>
          ))}
          <p className="pt-1 text-xs leading-relaxed text-slate-500">
            “Sent” means your SMS provider accepted the message.
          </p>
        </Card>
      </div>
    </div>
  );
}
