# Lovable → Next.js migration

Working notes for porting `../radiant-recaps-app` (read-only) into this app. Delete this file when
the migration is done.

## How the Lovable app is built

- Two routes, `/` and `/pricing`. Each page is one HTML string (`src/lib/landing-html.ts`,
  `src/lib/pricing-html.ts`) injected with `dangerouslySetInnerHTML`.
- React components are mounted into placeholder elements with `createRoot` after load
  (`src/routes/index.tsx`), and interactions are `window` functions called from inline `onclick`
  attributes (`src/lib/landing-scripts.ts`).
- Styles: `src/styles.css`. Only 3 of its ~50 `components/ui` files are used (ported here as
  `MetallicButton`, `LocationMap`, `DiaText`); the rest are unused shadcn/ui boilerplate.

## Porting a section

1. Rewrite its markup as JSX in `src/components/<page>/<section>.tsx` (Server Component). Keep every
   class and inline style value; repeated items become a data array + `map`.
2. Move interactions into a small client component (see the table below).
3. Port the section's CSS from `styles.css` (selectors listed below). ID/child-selector mobile
   overrides (`#faq-tab-container .faq-tab-btn`, `.hero-signup-form > div`, …) become mobile-first
   utilities on the element; keyframes and pseudo-element effects go into `globals.css` under a
   heading for the section.
4. Compare with the running Lovable app at 375px, ~700px and ≥1024px. Comparing computed styles
   (`getComputedStyle`) of key elements catches differences screenshots miss. Run the Lovable app from
   a copy (e.g. `rsync -a --exclude .git ../radiant-recaps-app/ /tmp/lovable-ref`, then
   `npx vite dev` there) so the original is never touched.

## Inventory

### Home (`/`) — shell done in `src/app/page.tsx` (ambient backdrop + hero shop grid, header, footer)

| Section          | Markup (`landing-html.ts`) | Interactivity → client component                                                        | CSS to port (`styles.css`)                                                                                       |
| ---------------- | -------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Hero             | `1. HERO SECTION`          | `DiaText` in the title (replaces `#hero-title-mount`); `MetallicButton href="/pricing"` | `.hero-earning-badge*`, `.brand-name-input::placeholder`, mobile `.hero-signup-*`, `#start-my-shop-button-mount` |
| How it works     | `2. HOW IT WORKS`          | Connector alignment (`alignHowItWorksPath` in `routes/index.tsx`, ResizeObserver)       | `.how-it-works-*`, `@keyframes how-it-works-*`                                                                   |
| Shop setup guide | `3. FEATURE DEEP-DIVES`    | none (static video mock)                                                                | —                                                                                                                |
| Integrations     | `4. PLATFORM INTEGRATIONS` | Redesigned (not in Lovable): payments → UrShop hub → delivery diagram                   | `.integration-link`, `.integration-packet`, `.integration-hub`                                                   |
| Testimonials     | `5. TESTIMONIALS`          | none (CSS marquee)                                                                      | `.testimonial-*`, `@keyframes testimonial-scroll`                                                                |
| FAQ              | `6. FAQ`                   | Category tabs (`filterFaq`)                                                             | mobile `#faq-tab-container`, `.faq-tab-btn`, `#faqs .overflow-x-auto`                                            |
| Closing CTA      | `7. CLOSING CTA`           | `MetallicButton href="/pricing"` ("Start Free Trial")                                   | `.book-calendar-button`, mobile `.closing-cta-actions`, `#start-free-trial-button-mount`, `.mobile-full-width-*` |

Also port each section's `prefers-reduced-motion` rules.

### Pricing (`/pricing`) — not started

| Section          | Markup (`pricing-html.ts`)         | Interactivity → client component                                     | CSS to port                                                   |
| ---------------- | ---------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------- |
| Page chrome      | ambient glows, empty sticky header | none. Keep exactly this: no `SiteHeader`/`SiteFooter` (decided).     | —                                                             |
| Hero + billing   | `PAGE HERO & BILLING`              | Monthly/yearly toggle (`setBilling`, prices in `landing-scripts.ts`) | mobile `#billing-monthly-btn`, `#billing-yearly-btn`          |
| Plan cards       | `4-TIER PRICING CARDS`             | prices follow the toggle                                             | —                                                             |
| Comparison table | `FULL FEATURE COMPARISON TABLE`    | "Show differences only" (`toggleDiffOnly`, `data-is-diff`)           | `#comparison-section thead th`, mobile `#comparison-section*` |

When the page ships: add `/pricing` to `src/app/sitemap.ts` and export
`pageMetadata({ path: "/pricing", … })` (title and description are in `src/routes/pricing.tsx`).

## Quirks to preserve

- **Icons are always 24px.** Google's `.material-symbols-outlined` rule is unlayered and beats
  Tailwind's `text-sm`/`text-lg`/`text-[20px]` on icons. Drop those size classes when porting (they
  do nothing) and use `<Icon>`.
- **Glass classes beat utilities.** No-op utilities in the markup include `hover:shadow-glass-hover`
  on `.liquid-glass-card`/`.liquid-pill`, `hover:shadow-2xl` on pricing cards, `hover:bg-white/80` on
  `.liquid-glass-subtle`.
- **Inline styles beat every rule without `!important`.** Keep them as `style={{…}}` or a named
  class; repeated ones on the pricing page (white glass buttons) are worth a shared class.
- **Mobile overrides are unlayered** and win over `sm:` utilities too, so between 640–767px the
  mobile value applies. Recreate them mobile-first and check that range.
- **Text line-height** stays from the original `text-*` class when an override only changes
  `font-size` (see the header's `text-xs/[1.428571]`).

## Images

The design-tool images (`lh3.googleusercontent.com/aida*`) were downloaded unmodified into
`src/assets`; import them instead of the URLs:

| Lovable `alt` / use                        | File                                                        |
| ------------------------------------------ | ----------------------------------------------------------- |
| Hero eyebrow avatars ("User" ×3, in order) | `home/hero-avatar-1.jpg`, `-2.jpg`, `-3.jpg`                |
| Integration logos                          | `partners/bkash.png`, `nagad.png`, `pathao.png`, `redx.png` |

Two logos were edited for the redesigned Integrations section: `nagad.png` is the original black
JPG with the background keyed to transparency (the dark tagline dropped), and `redx.png` is cropped
to the red wordmark badge.

Three of those URLs already return **403** and render as broken images in the Lovable app too:
the course video preview ("Course Video Lesson Preview"), the presenter photo ("Tanvir Ahmed") and
the "SteadFast Courier" logo. They can't be recovered from the web; the original files must come
from the design source. Until then, don't substitute other images.

Unsplash photos (hero badges, testimonials) stay remote.

## Placeholders — need a real destination or behavior

Keep these exactly as they are (`href="#"` / no-op) until the destination exists; don't invent one.

| Where                    | Element                                                                                                        | Needs                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Header (done)            | "Log in"                                                                                                       | merchant dashboard URL (planned: https://merchant.urshop.app) |
| Header (done), hero, CTA | "Sign up", "Start my Shop", "Start Free Trial" → `/pricing`                                                    | confirm this is the intended flow                             |
| Hero                     | "your brand name" input + form (submit is prevented, value unused)                                             | signup/onboarding behavior                                    |
| Shop setup guide         | Play button, "✕" on the video, playlist rows (look clickable)                                                  | video/course behavior                                         |
| FAQ                      | "Chat with us"                                                                                                 | support chat URL                                              |
| Closing CTA              | "Book Calendar"                                                                                                | booking URL                                                   |
| Footer (done)            | Platform, Discover and Legal links (all but "Pricing"), App Store, Google Play, 4 social icons                 | real pages / store listings / profiles                        |
| Pricing                  | "30 day free trial", "Choose Starter/Growth/Scale", "Start Free", "Select" ×2, "Upgrade", "Talk to Sales Team" | signup/checkout and sales contact URLs                        |
