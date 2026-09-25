import Image, { type StaticImageData } from "next/image";

import bkash from "@/assets/partners/bkash.png";
import nagad from "@/assets/partners/nagad.jpg";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";

const partners: Array<{ name: string; logo?: StaticImageData; className: string }> = [
  { name: "bKash", logo: bkash, className: "h-8 max-w-[100px]" },
  { name: "Nagad", logo: nagad, className: "h-9 max-w-[100px]" },
  { name: "Pathao", logo: pathao, className: "h-7 max-w-[105px]" },
  { name: "SteadFast Courier", logo: steadfast, className: "h-7 max-w-[110px]" },
  { name: "RedX", logo: redx, className: "h-7 max-w-[90px]" },
];

function PartnerSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="integration-marquee-set" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <div
          key={partner.name}
          className="liquid-pill flex h-16 items-center justify-center rounded-2xl px-5 py-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover"
        >
          {partner.logo ? (
            <Image
              src={partner.logo}
              alt={hidden ? "" : partner.name}
              className={`w-auto object-contain ${partner.className}`}
            />
          ) : (
            <span className="sr-only">{partner.name}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/** Continuous source-design marquee of Bangladeshi payment and delivery partners. */
export function Integrations() {
  return (
    <section className="relative px-6 py-20 lg:px-12" id="integrations">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 lg:flex-row">
        <div className="max-w-md text-center lg:text-left">
          <span className="liquid-pill mb-2 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
            NATIVE BANGLADESH INTEGRATIONS
          </span>
          <h2 className="mt-2 mb-2 text-2xl font-bold text-slate-900">
            Plugged into the tools
            <span className="block">your customers trust</span>
          </h2>
          <p className="text-sm text-slate-600">
            Direct API connections with zero middlemen or manual approval delays.
          </p>
        </div>
        <div
          className="integration-marquee w-full lg:w-[560px]"
          aria-label="Supported payment and delivery partners"
        >
          <div className="integration-marquee-track">
            <PartnerSet />
            <PartnerSet hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
