# Fix structured data and SEO metadata

## Why

The JSON-LD `BeautySalon` schema points to a non-existent image `/og-image.jpg` and uses a stale fallback domain `li-zagar-tan.vercel.app` (`app/components/StructuredData.tsx:5,12`), while the rest of the app uses `https://www.lizagartan.com`. The sitemap lists only the homepage, and SEO `keywords` exist only for the Lithuanian locale (`app/layout.tsx:27` vs `42-75`). These directly weaken Google rich results and indexing for a business that depends on local search.

## What Changes

- Point the schema `image` to the real `public/opengraph-image.png`
- Extract a single `baseUrl` helper (e.g. `app/config/site.ts`) used by `StructuredData`, `layout.tsx`, `robots.ts`, `sitemap.ts` — one fallback domain everywhere
- Add `/privacy` to `sitemap.ts`
- Add `keywords` for `ru` and `en` metadata blocks
- Render `StructuredData` as a server component (it only emits a `<script>` tag; no need for `'use client'`)

## Capabilities

### New Capabilities
- `seo-metadata`: search engines receive a consistent base URL, valid structured data with an existing image, a complete sitemap, and per-language keywords

### Modified Capabilities

_None (no existing specs)._

## Impact

- `app/components/StructuredData.tsx`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`
- New `app/config/site.ts`
- No visual changes; purely metadata

## Non-goals

- Per-language URLs / hreflang restructuring (covered by `fix-hreflang-language-urls`)
- Adding new schema types (FAQ, Service) — future enhancement
