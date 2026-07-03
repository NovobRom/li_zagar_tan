# Make hreflang honest: working language URLs

## Why

`app/layout.tsx:90-94` declares hreflang alternates `/?lang=lt|ru|en`, but no code reads a `lang` query parameter — the links point to URLs that don't switch language. Search engines therefore see three "alternate" URLs with identical (Lithuanian) content, which can hurt rather than help multilingual ranking for RU/EN-speaking clients.

## What Changes

Minimal-viable option (recommended first step):
- Honor `?lang=` on first load: a small server-side read of `searchParams` (or client-side in `LanguageContext` init) that sets the language and cookie
- Keep hreflang pointing at `/?lang=xx`, now truthful

Documented follow-up option (larger, tracked as a design decision, not implemented here):
- True per-language routes `/lt`, `/ru`, `/en` via a `[lang]` segment with server-rendered translations — the proper long-term SEO fix

## Capabilities

### New Capabilities
- `language-urls`: every language has a URL that actually renders that language, and hreflang annotations match reality

### Modified Capabilities

_None (no existing specs)._

## Impact

- `app/context/LanguageContext.tsx` (init order: query param > cookie/localStorage > navigator)
- `app/layout.tsx` (metadata per `?lang` when present)
- Future: routing restructure if/when `[lang]` segments are adopted

## Non-goals

- Implementing the full `[lang]` route migration in this change (needs its own design + content-parity work)
- Translating any new content
