import { Icon } from "@/components/ui/icon";

const lessons = [
  { title: "01 Claiming Shop Handle", duration: "02:15", state: "complete" },
  { title: "02 Adding Physical & Digital Items", duration: "03:40", state: "complete" },
  { title: "03 Connecting bKash & Nagad Payouts", duration: "03:10", state: "current" },
  { title: "04 Automating Pathao & Steadfast", duration: "04:05", state: "locked" },
  { title: "05 Sharing Shop Link & Bio", duration: "02:10", state: "locked" },
] as const;

/** Static course preview. The original video and presenter artwork has not been supplied. */
export function ShopSetupGuide() {
  return (
    <section className="relative px-6 py-24 lg:px-12" id="features">
      <div className="mx-auto max-w-5xl space-y-24">
        <div className="flex w-full flex-col items-center pt-4 pb-4">
          <div className="reveal mx-auto mb-12 max-w-3xl text-center">
            <span className="liquid-pill mb-4 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
              SHOP SETUP GUIDE
            </span>
            <h2 className="mb-5 text-4xl leading-[1.15] font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              <span className="block">Set up your shop</span>
              <span className="block">in 5 minutes</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed font-normal text-slate-600 sm:text-lg">
              No complex plugins. Add your products, set your price, and manage the checkout,
              payouts, and deliveries.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="flex flex-col lg:col-span-8">
              <div
                className="liquid-glass-card reveal relative rounded-3xl p-4 sm:p-6"
                style={{ borderRadius: "28px" }}
              >
                <div className="group relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-900 shadow-inner select-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/30" />
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
                      HD
                    </span>
                    <button
                      type="button"
                      aria-label="Close video preview"
                      className="flex size-6 cursor-pointer items-center justify-center rounded-full bg-black/40 text-xs text-white/70 backdrop-blur-md transition-colors hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    type="button"
                    aria-label="Play Video"
                    className="z-10 flex size-16 cursor-pointer items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-2xl ring-8 ring-white/30 transition-all duration-300 hover:scale-110 hover:ring-white/50 active:scale-95 sm:size-20"
                    style={{ boxShadow: "0 16px 36px rgba(0, 0, 0, 0.35)" }}
                  >
                    <svg
                      className="size-6 translate-x-0.5 fill-current sm:size-7"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11-6.86a1 1 0 0 0 0-1.7l-11-6.86A1 1 0 0 0 8 5.14z" />
                    </svg>
                  </button>
                  <div className="absolute right-4 bottom-3 left-4 z-10 flex items-center justify-between text-xs text-white/90">
                    <span className="flex items-center gap-1.5 font-semibold tracking-wide">
                      Lesson 3 · Setting Up bKash & Nagad Payouts
                    </span>
                    <span className="rounded bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white/80">
                      03:10
                    </span>
                  </div>
                </div>
                <div className="mt-4 mb-2 flex h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full w-[45%] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgb(2, 132, 199) 0%, rgb(0, 180, 216) 100%)",
                    }}
                  />
                  <div className="h-full w-[55%] bg-slate-200" />
                </div>
                <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-3 sm:flex-row sm:items-center">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-slate-900">
                      UrShop Masterclass: Launch Your Shop in 5 Minutes
                    </h3>
                    <div className="mt-2 flex items-center gap-3">
                      <div
                        className="size-9 rounded-full border border-slate-200"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">Tanvir Ahmed</p>
                        <p className="text-[11px] text-slate-500">UrShop Onboarding Specialist</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:col-span-4">
              <div
                className="liquid-glass-card reveal reveal-delay-1 flex h-full flex-col justify-between rounded-3xl p-6"
                style={{ borderRadius: "28px" }}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
                    <h4 className="text-base font-bold tracking-tight text-slate-900">
                      Course content
                    </h4>
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1">
                        <Icon name="menu_book" /> 5
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="schedule" /> 15m
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {lessons.map((lesson) => {
                      const isCurrent = lesson.state === "current";
                      const isComplete = lesson.state === "complete";
                      return (
                        <button
                          key={lesson.title}
                          type="button"
                          className={`flex w-full cursor-pointer items-center justify-between rounded-xl p-3 text-left transition-all ${
                            isCurrent
                              ? "border border-[#7DD3FC] bg-[#E0F2FE]/80 shadow-sm"
                              : isComplete
                                ? "group border border-slate-100 bg-white/60 hover:border-slate-200"
                                : "group border border-transparent bg-white/40 hover:border-slate-100"
                          }`}
                        >
                          <span className="flex items-center gap-3 pr-2">
                            {isCurrent ? (
                              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0284C7] shadow-sm">
                                <svg
                                  className="size-2.5 fill-current text-white"
                                  style={{ marginLeft: "1.5px" }}
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </span>
                            ) : (
                              <Icon
                                name={isComplete ? "check_circle" : "lock"}
                                className={
                                  isComplete
                                    ? "shrink-0 text-emerald-600"
                                    : "shrink-0 text-slate-400"
                                }
                              />
                            )}
                            <span
                              className={`text-xs leading-snug ${isCurrent ? "font-bold text-slate-900" : isComplete ? "font-semibold text-slate-800 group-hover:text-brand" : "font-medium text-slate-500 group-hover:text-slate-700"}`}
                            >
                              {lesson.title}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 font-mono text-[11px] ${isCurrent ? "font-bold text-[#0284C7]" : "text-slate-400"}`}
                          >
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6 text-xs" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
