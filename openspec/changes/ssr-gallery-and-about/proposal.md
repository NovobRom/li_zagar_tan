# Server-render gallery and about photos

## Why

`GallerySection` and `AboutSection` fetch their images client-side in `useEffect` (`app/components/GallerySection.tsx:22-43`, `app/components/AboutSection.tsx:15-21`), so the salon's strongest content — before/after results — is absent from server HTML. Crawlers and social previews miss it, and visitors see loading placeholders. The DB already stores localized alt texts (`alt_text_lt/ru/en` in `gallery`), but the UI renders a generic `Spray tan result {id}`.

## What Changes

- Fetch gallery photos and the profile photo in the server component `app/page.tsx` (same pattern already used for the hero image via `getHeroImage()`) and pass them down as props
- Keep client-side interactivity (language switching) but hydrate with server-provided data
- Use the localized `alt_text_*` columns for image alt attributes, falling back to a translated generic string
- Surface read errors instead of silently rendering an empty gallery (`getPhotos` currently swallows the `error` field)

## Capabilities

### New Capabilities
- `ssr-content`: gallery and about images are present in the initial server HTML with localized alt text; a data-layer failure is distinguishable from "no photos yet"

### Modified Capabilities

_None (no existing specs)._

## Impact

- `app/page.tsx`, `app/components/GallerySection.tsx`, `app/components/AboutSection.tsx`
- `app/actions/gallery.ts`, `app/actions/settings.ts` (return errors, not silent empties)
- `app/i18n/translations/*.ts` (fallback alt string)

## Non-goals

- Admin upload flow changes (alt-text editing UI is a separate future change)
- Image CDN/optimization changes (next/image already used)
