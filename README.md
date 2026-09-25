# UrShop Web

Marketing website for [UrShop](https://urshop.app), the online shop builder for Bangladeshi sellers.
Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

The visual design comes from the approved Lovable prototype (`../radiant-recaps-app`), which is being
migrated page by page — see [docs/migration.md](docs/migration.md).

## Getting started

Requires Node.js 20.9+ and pnpm 10 (`corepack enable` picks up the version pinned in `package.json`).

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `pnpm dev`          | Start the dev server                                |
| `pnpm build`        | Production build (also type-checks)                 |
| `pnpm start`        | Serve the production build                          |
| `pnpm lint`         | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `pnpm typecheck`    | Generate route types, then run `tsc`                |
| `pnpm format`       | Format with Prettier (also sorts Tailwind classes)  |
| `pnpm format:check` | Check formatting without writing                    |

## Project layout and conventions

Folder structure, styling rules and coding conventions are in [AGENTS.md](AGENTS.md). They apply to
everyone working in the repo, not just AI agents.

Key files:

- `src/app/globals.css` — design tokens and the few global CSS classes
- `src/app/layout.tsx` — fonts, icon font, default metadata
- `src/config/site.ts` — site name, production URL, support email
- `next.config.ts` — allowed remote image hosts
