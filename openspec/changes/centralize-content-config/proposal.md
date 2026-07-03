# Centralize display content constants

## Why

The hero badge hardcodes "40€" (`app/components/HeroSection.tsx:43`) independently of the pricing data in the i18n files — when prices change, the badge will silently go stale, exactly like the review count did (73 vs 100+ on Treatwell) before `app/config/reviews.ts` was introduced. Other scattered constants: the Google site-verification token and Supabase fallback hostname inline in config files.

## What Changes

- Derive the hero price badge from the same source as `PricingSection` (the `pricing.services.fullBody.price` translation value), or move prices out of translations into `app/config/pricing.ts` consumed by both
- Extend the `app/config/` pattern: `site.ts` (base URL, verification token, social links), `reviews.ts` (exists), `pricing.ts`
- Document in the README where editable business values live (one-stop table for the owner/developer)

## Capabilities

### New Capabilities
- `content-config`: every business fact shown on the site (prices, rating, review count, address, links) has exactly one source of truth in `app/config/` or i18n

### Modified Capabilities

_None (no existing specs)._

## Impact

- `app/components/HeroSection.tsx`, `app/components/PricingSection.tsx`
- New `app/config/pricing.ts`, `app/config/site.ts` (shared with `fix-seo-structured-data`)
- `app/i18n/translations/*.ts` if prices move out of translations
- README ("where to edit content" section)

## Non-goals

- Moving prices into the Supabase `services` table with an admin UI (good future step — the table already exists — but needs its own design)
- Translating any new content
