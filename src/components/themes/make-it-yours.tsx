import { SectionHeading } from "@/components/ui/section-heading";

import { HomepageDemo } from "./homepage-demo";
import { StyleDemo } from "./style-demo";

function SubHeading({ title, text }: { title: string; text: string }) {
  return (
    <div className="reveal mb-6 max-w-2xl">
      <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{text}</p>
    </div>
  );
}

/** Theme customization: store-wide styling, then the homepage section plan. */
export function MakeItYours() {
  return (
    <section
      id="make-it-yours"
      aria-labelledby="make-it-yours-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="make-it-yours-heading"
          eyebrow="Make it yours"
          title="Your colors. Your fonts. Your homepage."
          intro="Tune everything in a live editor. Nothing goes live until you publish."
          align="center"
          className="reveal"
        />

        <div className="mt-14">
          <SubHeading
            title="Restyle in a click"
            text="Colors, fonts, spacing and corners apply across your whole store. Try it."
          />
          <StyleDemo />
        </div>

        <div className="mt-16 sm:mt-20">
          <SubHeading
            title="Arrange your homepage"
            text="Show, hide and reorder sections. Edit the hero, banners, testimonials and footer."
          />
          <HomepageDemo />
        </div>
      </div>
    </section>
  );
}
