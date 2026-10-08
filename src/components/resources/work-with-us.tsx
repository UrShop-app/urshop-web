import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { supportLinks } from "@/data/resources";

/** Ways to reach the UrShop team: a compact utility strip, not part of the library. */
export function WorkWithUs() {
  return (
    <section aria-labelledby="work-with-us-heading" className="relative px-6 py-10 lg:px-12">
      <div className="reveal mx-auto flex max-w-6xl flex-col items-center gap-4 lg:flex-row lg:justify-between">
        <h2
          id="work-with-us-heading"
          className="text-[12px] font-bold tracking-[0.18em] text-slate-500 uppercase"
        >
          Work with the UrShop team
        </h2>
        <ul className="flex flex-wrap justify-center gap-2">
          {supportLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="glass-btn inline-flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <Icon name={link.icon} className="text-brand" />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
