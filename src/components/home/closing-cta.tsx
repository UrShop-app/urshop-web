import { MetallicButton } from "@/components/ui/metallic-button";

/** Closing conversion prompt; calendar destination remains intentionally unspecified. */
export function ClosingCta() {
  return (
    <section className="relative overflow-hidden px-6 py-24 lg:px-12">
      <div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl p-10 text-center transition-all duration-500 sm:p-16"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 249, 255, 0.75) 50%, rgba(224, 242, 254, 0.8) 100%)",
          backdropFilter: "blur(28px) saturate(190%)",
          border: "1.5px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 28px 56px -12px rgba(2, 132, 199, 0.18), inset 0 2px 3px rgba(255, 255, 255, 1)",
          borderRadius: "32px",
        }}
      >
        <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <span className="liquid-pill mb-4 inline-flex items-center justify-center rounded-full px-6 py-2 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
            START IN 60 SECONDS
          </span>
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Your Online Business, Simplified.
          </h2>
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            Skip the complex setup. We handle the payments, delivery, and support so you can focus
            on creating.
          </p>
          <div className="closing-cta-actions flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
            <MetallicButton label="Start Free Trial" href="/pricing" className="w-full sm:w-auto" />
            <a
              className="book-calendar-button inline-flex w-full items-center justify-center rounded-full border px-8 py-4 text-sm font-bold text-slate-800 transition-all duration-300 hover:bg-white/80 active:scale-95 sm:w-auto"
              href="#"
              style={{
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 4px 16px rgba(15, 23, 42, 0.06), inset 0 1.5px 2px rgba(255, 255, 255, 1)",
              }}
            >
              Book Calendar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
