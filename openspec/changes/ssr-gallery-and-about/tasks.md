## 1. Server-side data

- [ ] 1.1 In `app/page.tsx`, call `getPhotos()` and `getProfilePhoto()` alongside `getHeroImage()` (parallel via `Promise.all`) and pass results as props
- [ ] 1.2 Change `GallerySection` to accept `photos` as a prop; remove its `useEffect` fetch and loading state
- [ ] 1.3 Change `AboutSection` to accept `profilePhotoUrl` as a prop; remove its `useEffect` fetch

## 2. Localized alt text

- [ ] 2.1 Render `alt_text_{lang}` from the gallery row for the current language, falling back to a new translated `gallery.photoAlt` string (add to `lt.ts`, `ru.ts`, `en.ts`, `types.ts`)

## 3. Error visibility

- [ ] 3.1 In `getPhotos`/`getProfilePhoto`/`getHeroImage`, stop discarding the Supabase `error`; log it and return a distinguishable failure so the section can render a fallback state

## 4. Verification

- [ ] 4.1 `npm run build` + `curl` the homepage: gallery `<img>` tags with localized alt text are present in the raw HTML (no JS); visual check that reordering in admin still updates the public page after revalidation
