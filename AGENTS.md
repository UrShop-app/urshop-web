<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# UrShop Web

Marketing site for UrShop. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, pnpm.

## Source of truth

- The approved design is the Lovable app in `../radiant-recaps-app`. It is **read-only**: never modify it.
- Reproduce what it renders, at every breakpoint. Do not redesign, "clean up" visuals, or swap
  colors/spacing/typography for near equivalents.
- Migration plan, section inventory and known quirks: `docs/migration.md`.

## Commands

- `pnpm dev` — dev server on http://localhost:3000
- `pnpm lint` · `pnpm typecheck` · `pnpm format` — run all three, plus `pnpm build`, before finishing a change

## Structure

```
src/
  app/                  routes and Next.js special files only (page, layout, error, not-found, robots, sitemap)
  components/
    layout/             site chrome: SiteHeader, SiteFooter
    ui/                 reusable, content-free primitives (Icon, MetallicButton, DiaText, LocationMap)
    <page>/             sections of one page, e.g. components/home/hero.tsx, components/pricing/plans.tsx
  config/site.ts        site-wide constants (name, canonical URL, description, support email)
  lib/                  small helpers: cn() (utils.ts), pageMetadata() (metadata.ts)
  assets/               images imported by components, grouped by page (home/, partners/)
```

Keep a section's data (FAQ items, plans, testimonials) in the section's file or next to it. Move
something to `ui/` only once a second page needs it.

## Conventions

- **Server Components by default.** Add `"use client"` only to the interactive leaf (tabs, toggles,
  observers, animation) and pass static markup to it as `children`
  (see `components/layout/floating-header.tsx`).
- **No DOM scripting.** Interactions are React state, not `document.querySelector`, inline `onclick`
  or `window` globals as in the Lovable pages.
- **Styling.** Tailwind utilities first. Design tokens live in `src/app/globals.css` (`brand-*`
  colors, `rounded-card`, `shadow-glass-*`, `font-stat`); neutrals use Tailwind `slate-*`. Add custom
  CSS to `globals.css` only for what utilities can't express, under a heading for its page/section.
  - The glass classes (`liquid-glass*`, `liquid-pill`, `glass-btn*`) are unlayered and override
    utilities that set the same property. Inline `style` overrides everything.
  - The radius scale is custom (`rounded-3xl` = 22px, `rounded-2xl` = 18px, `rounded-lg` = 10px).
  - Light theme only; don't add `dark:` variants.
  - Express Lovable's mobile overrides as mobile-first utilities (base = mobile, `sm:`/`md:` up).
- **Icons.** `<Icon name="check_circle" />` (Material Symbols). Add new names to `ICON_NAMES` in
  `components/ui/icon.tsx`; the font is subset to that list. Icons always render at 24px.
- **Images.** `next/image` everywhere. Design assets live in the repo (`src/assets`, static import);
  the only remote host is Unsplash stock photography (`next.config.ts`). Don't hotlink new hosts.
- **Links.** `next/link` for internal routes. Unknown destinations stay `href="#"` with a TODO.
- **Metadata.** Every page exports `metadata = pageMetadata({ path, title, description })`
  (`lib/metadata.ts`), which sets the canonical URL and Open Graph. Absolute URLs always use
  `siteConfig.url` (https://urshop.app), never the request/preview host. Add public routes to
  `app/sitemap.ts`.
- **Files.** kebab-case file names, named exports (default exports only where Next.js requires them).
