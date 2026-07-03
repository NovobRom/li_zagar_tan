# li_zagar_tan — Landing Page

Marketing site for **li_zagar_tan**, a professional spray-tan studio in Vilnius. The site's job is local SEO visibility, trust (results gallery, Treatwell reviews) and conversion into bookings through the embedded Treatwell widget.

> 🌐 **Production:** [www.lizagartan.com](https://www.lizagartan.com) · 📅 **Bookings:** [Treatwell](https://www.treatwell.lt/salonas/purskiamas-idegis-by-li-zagar-tan/)

---

## Documentation Map

| Document | Language | Audience |
| --- | --- | --- |
| [docs/SITE_REVIEW.md](docs/SITE_REVIEW.md) | 🇷🇺 | Full site audit, findings and development roadmap |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | 🇬🇧 | How the code is organized, data flows, diagrams |
| [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md) | 🇷🇺 | Owner's guide to the admin panel (photos, hero image, logs) |
| [openspec/](openspec/) | 🇬🇧 | Spec-driven change proposals with atomic task lists ([OpenSpec](https://github.com/Fission-AI/openspec)) |
| [graphify-out/GRAPH_REPORT.md](graphify-out/GRAPH_REPORT.md) | 🇬🇧 | Codebase knowledge graph ([Graphify](https://github.com/safishamsi/graphify)); open `graphify-out/graph.html` for the interactive map |

---

## Tech Stack

| Category | Technology | Version |
| --- | --- | --- |
| Framework | [Next.js](https://nextjs.org/) (App Router, Turbopack) | 16.1.6 |
| UI | [React](https://react.dev/) | 19.2.3 |
| Language | [TypeScript](https://www.typescriptlang.org/) (strict) | ^5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) | ^4 |
| Fonts | Geist Sans & Mono via `next/font` (self-hosted) | — |
| Icons | [Lucide React](https://lucide.dev/) | ^0.563 |
| Backend | [Supabase](https://supabase.com/) — Auth (admin), Postgres, Storage | ^2.93 |
| Validation | [Zod](https://zod.dev/) | ^4 |
| Admin UX | @dnd-kit (reorder), react-dropzone (upload), react-easy-crop (crop) | — |
| Deployment | [Vercel](https://vercel.com/), auto-deploy on push to `main` | — |

**Dev tooling:** ESLint 9 (flat config), Prettier, `tsc --noEmit` type-checking.
⚠️ *There are currently no unit tests and no CI pipeline* — wiring them up is planned in [`openspec/changes/add-testing-ci/`](openspec/changes/add-testing-ci/). (Vitest, husky and lint-staged are installed as dependencies but not yet configured.)

---

## Getting Started

Requirements: Node.js ≥ 20, npm.

```bash
npm install
cp .env.example .env.local   # fill in Supabase credentials
npm run dev                  # http://localhost:3000
```

### Environment Variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ | Supabase project URL (gallery, settings, admin auth) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ | Supabase anon key (RLS enforced server-side) |
| `NEXT_PUBLIC_APP_URL` | ✅ for SEO | Canonical origin for metadata, sitemap, robots, JSON-LD |
| `NEXT_PUBLIC_FB_PIXEL_ID` | optional | Enables Meta Pixel when set |
| `NEXT_PUBLIC_GA_ID` | ⚠️ currently unused | GA measurement ID is hardcoded in `GoogleAnalyticsWrapper.tsx`; making this variable real is part of [`fix-analytics-consent`](openspec/changes/fix-analytics-consent/) |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` / `lint:fix` | ESLint (note: `next lint` is deprecated in Next 16) |
| `npm run type-check` | `tsc --noEmit` |
| `npm run format` | Prettier |

---

## Where to Edit Content

Business facts live in exactly one place each — edit there and they update everywhere:

| Value | File / place |
| --- | --- |
| Treatwell rating & review count | `app/config/reviews.ts` |
| All user-facing texts (3 languages) | `app/i18n/translations/{lt,ru,en}.ts` |
| Prices & durations | `app/i18n/translations/*` (`pricing.services`) — centralization planned in [`centralize-content-config`](openspec/changes/centralize-content-config/) |
| Gallery / hero / profile photos | Admin panel `/admin` (stored in Supabase) |
| SEO metadata per language | `app/layout.tsx` (`metadataByLanguage`) |
| Structured data (address, hours) | `app/components/StructuredData.tsx` |

---

## Internationalization

Three languages: 🇱🇹 Lithuanian (default) · 🇷🇺 Russian · 🇬🇧 English.

Translations are fully typed objects (`app/i18n/types.ts` enforces key parity across locales). The active language lives in `LanguageContext` (client), persisted to `localStorage` + a `language` cookie; the cookie lets `layout.tsx` pick the right `<html lang>` and metadata server-side. Language switching is client-only — per-language URLs are a planned improvement (see [`fix-hreflang-language-urls`](openspec/changes/fix-hreflang-language-urls/)).

## Landing Sections

Header → Hero → About → Gallery (Supabase) → Safety → Preparation → Training → Pricing → Reviews → Booking (Treatwell widget) → Footer. Plus `/privacy` (privacy policy) and `/admin` (owner panel — see [docs/ADMIN_GUIDE.md](docs/ADMIN_GUIDE.md)).

## Brand Colors

| Color | HEX | Usage |
| --- | --- | --- |
| Premium Gold | `#fbbf5d` | Accents, CTAs, focus states |
| Black | `#0a0a0a` | Header, dark background |
| Foreground | `#171717` | Headings |
| Body text | `#333333` | Paragraphs |

---

## Development Workflow

Changes are planned as [OpenSpec](https://github.com/Fission-AI/openspec) proposals in `openspec/changes/` — each has a `proposal.md` (why), `specs/` (verifiable requirements) and `tasks.md` (atomic checklist). Current backlog and priorities: [docs/SITE_REVIEW.md](docs/SITE_REVIEW.md). The codebase knowledge graph in `graphify-out/` is rebuilt with `graphify update .` (no API key needed).

## Author

**Roman Novobranets**
