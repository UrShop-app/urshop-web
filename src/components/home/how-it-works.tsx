const steps = [
  {
    number: "01",
    icon: "⚡",
    color: "#FFD000",
    title: "Create Your Shop",
    description: (
      <>
        Claim your unique shop name
        <br />
        <span className="text-sm">
          (<b>myjersey</b>.urshop.app) and customize your clean checkout page in 60 seconds.
        </span>
      </>
    ),
  },
  {
    number: "02",
    icon: "📦",
    color: "#D8ECFE",
    title: "Add Your Products",
    description:
      "List your physical items or upload digital files with custom pricing, photos, and instant stock inventory tracking.",
  },
  {
    number: "03",
    icon: "🚀",
    color: "#D5F5E3",
    title: "Deliver and Earn",
    description:
      "Dispatch orders automatically via directly into Steadfast, Pathao, or RedX with live SMS tracking.",
  },
];

const revealDelays = ["", "reveal-delay-1", "reveal-delay-2"];

/** Three-step onboarding explanation with the source design's animated connector. */
export function HowItWorks() {
  return (
    <section className="relative px-6 py-24 lg:px-12" id="how-it-works">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 70% 65% at 50% 50%, #000 40%, transparent 100%)",
          backgroundSize: "40px 40px",
          backgroundImage:
            "linear-gradient(to right, rgba(226, 232, 240, 0.6) 1px, transparent 1px), linear-gradient(rgba(226, 232, 240, 0.6) 1px, transparent 1px)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* The block's ::after stem joins the data line, so only its content is revealed. */}
        <div className="how-it-works-title-block mx-auto mb-16 max-w-2xl text-center">
          <div className="reveal">
            <span className="liquid-pill mb-2 inline-flex items-center justify-center rounded-full px-6 py-2 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
              HOW IT WORKS
            </span>
            <h2 className="mt-3 mb-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              From idea to live shop
              <br />
              in 3 simple steps.
            </h2>
          </div>
        </div>

        <div className="relative">
          <div className="how-it-works-data-line absolute -top-8 z-0 hidden h-px bg-slate-300/80 md:block">
            <span className="how-it-works-data-packet how-it-works-data-packet-left" />
            <span className="how-it-works-data-packet how-it-works-data-packet-middle" />
            <span className="how-it-works-data-packet how-it-works-data-packet-right" />
          </div>
          <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col pt-6 md:pt-8">
                <div className="pointer-events-none absolute -top-8 left-1/2 z-20 hidden h-8 -translate-x-1/2 flex-col items-center md:flex">
                  <div className={`how-it-works-data-stem w-px grow bg-slate-300`} />
                  <div
                    className={`how-it-works-data-point how-it-works-data-point-${index + 1} -mt-1 size-2.5 rounded-full border-2 border-slate-300 bg-white shadow-sm`}
                  />
                </div>
                <article
                  className={`liquid-glass-card glass-lift reveal ${revealDelays[index]} flex h-full flex-col justify-between rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2`}
                  style={{ borderRadius: "28px" }}
                >
                  <div>
                    <div className="mb-8 flex items-center justify-between">
                      <div
                        className="flex size-14 items-center justify-center overflow-hidden rounded-2xl shadow-sm"
                        style={{ backgroundColor: step.color }}
                      >
                        <span className="text-2xl">{step.icon}</span>
                      </div>
                      <span className="text-6xl font-extrabold tracking-tight text-slate-200/80 select-none">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="text-sm leading-relaxed font-normal text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
        <div className="reveal mt-16 text-center">
          <p className="text-base font-medium text-slate-600">
            Skip the complex setup.{" "}
            <span className="font-semibold text-slate-900">We handle the rest.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
