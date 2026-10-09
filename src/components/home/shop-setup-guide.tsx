"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";

type Lesson = {
  title: string;
  duration: string;
  /** Present once the lesson video is recorded. */
  video?: { src: string; poster: string; label: string; ariaLabel: string };
};

const lessons: ReadonlyArray<Lesson> = [
  {
    title: "01 Set Up Your Shop in 5 Minutes",
    duration: "00:50",
    video: {
      src: "/videos/urshop-promo-en.mp4",
      poster: "/videos/urshop-promo-poster.jpg",
      label: "Lesson 1 · Set Up Your Shop in 5 Minutes",
      ariaLabel: "UrShop: set up your shop in 5 minutes",
    },
  },
  { title: "02 How to Sign Up Properly", duration: "Soon" },
  {
    title: "03 Get Your First Sale",
    duration: "01:57",
    video: {
      src: "/videos/urshop-first-sale-en.mp4",
      poster: "/videos/urshop-first-sale-poster.jpg",
      label: "Lesson 3 · Get Your First Sale",
      ariaLabel: "UrShop: get your first sale",
    },
  },
  { title: "04 Connect Your Domain", duration: "Soon" },
  { title: "05 Storefront Themes & Page Builder", duration: "Soon" },
];

const toSeconds = (d: string) => {
  const [m = 0, s = 0] = d.split(":").map(Number);
  return m * 60 + s;
};
const totalSeconds = lessons.reduce((sum, l) => sum + (l.video ? toSeconds(l.duration) : 0), 0);
const TOTAL_DURATION = `${String(Math.floor(totalSeconds / 60)).padStart(2, "0")}:${String(totalSeconds % 60).padStart(2, "0")}`;

/** Course preview. Lessons with a video can be played; the rest are placeholders until recorded. */
export function ShopSetupGuide() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playOnLoad = useRef(false);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const lesson = lessons[current]!;
  const video = lesson.video!;

  // After switching lessons, start the newly selected video.
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !playOnLoad.current) return;
    playOnLoad.current = false;
    el.load();
    setPlaying(true);
    void el.play().catch(() => setPlaying(false));
  }, [current]);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    setPlaying(true);
    void video.play().catch(() => setPlaying(false));
  };

  const stop = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setProgress(0);
    setPlaying(false);
  };

  const selectLesson = (index: number) => {
    if (!lessons[index]?.video) return;
    if (index === current) {
      play();
      return;
    }
    videoRef.current?.pause();
    setProgress(0);
    playOnLoad.current = true;
    setCurrent(index);
  };

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
                <div className="group relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-900 shadow-inner">
                  <video
                    ref={videoRef}
                    className="absolute inset-0 size-full object-cover"
                    src={video.src}
                    poster={video.poster}
                    preload="metadata"
                    playsInline
                    controls={playing}
                    aria-label={video.ariaLabel}
                    onPlay={() => setPlaying(true)}
                    onEnded={() => setPlaying(false)}
                    onTimeUpdate={(e) => {
                      const v = e.currentTarget;
                      if (v.duration) setProgress(v.currentTime / v.duration);
                    }}
                  />

                  {!playing && (
                    <div className="absolute inset-0 flex items-center justify-center select-none">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-slate-950/20" />
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                        <span className="rounded bg-white/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-md">
                          HD
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={play}
                        aria-label="Play video"
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
                          {video.label}
                        </span>
                        <span className="rounded bg-black/50 px-2 py-0.5 font-mono text-[11px] text-white/80">
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                  )}

                  {playing && (
                    <button
                      type="button"
                      onClick={stop}
                      aria-label="Close video"
                      className="absolute top-4 right-4 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full bg-black/50 text-xs text-white/80 backdrop-blur-md transition-colors hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div className="mt-4 mb-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full transition-[width] duration-200 ease-linear"
                    style={{
                      width: `${Math.round(progress * 1000) / 10}%`,
                      background:
                        "linear-gradient(90deg, rgb(2, 132, 199) 0%, rgb(0, 180, 216) 100%)",
                    }}
                  />
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
                        <Icon name="menu_book" /> {lessons.length}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="schedule" /> {TOTAL_DURATION}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {lessons.map((item, index) => {
                      const isCurrent = index === current;
                      const isAvailable = Boolean(item.video);
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={isAvailable ? () => selectLesson(index) : undefined}
                          disabled={!isAvailable}
                          aria-label={
                            isAvailable ? `Play ${item.title}` : `${item.title} (coming soon)`
                          }
                          className={`flex w-full items-center justify-between rounded-xl p-3 text-left transition-all ${
                            isCurrent
                              ? "cursor-pointer border border-[#7DD3FC] bg-[#E0F2FE]/80 shadow-sm"
                              : isAvailable
                                ? "cursor-pointer border border-transparent bg-white/70 hover:border-[#7DD3FC]"
                                : "cursor-default border border-transparent bg-white/40"
                          }`}
                        >
                          <span className="flex items-center gap-3 pr-2">
                            {isAvailable ? (
                              <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded-full shadow-sm ${isCurrent ? "bg-[#0284C7]" : "bg-[#38BDF8]"}`}
                              >
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
                              <Icon name="lock" className="shrink-0 text-slate-400" />
                            )}
                            <span
                              className={`text-xs leading-snug ${isCurrent ? "font-bold text-slate-900" : isAvailable ? "font-semibold text-slate-700" : "font-medium text-slate-500"}`}
                            >
                              {item.title}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 font-mono text-[11px] ${isCurrent ? "font-bold text-[#0284C7]" : isAvailable ? "text-[#0284C7]" : "text-slate-400"}`}
                          >
                            {item.duration}
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
