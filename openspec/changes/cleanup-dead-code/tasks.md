## 1. Deletions

- [ ] 1.1 Delete `app/components/admin/PhotoGrid.tsx` (imported nowhere)
- [ ] 1.2 Delete `copy-script.js` (hardcoded local Windows path; one-off)
- [ ] 1.3 Delete unused boilerplate `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`

## 2. Tailwind and icons

- [ ] 2.1 Fix `Footer.tsx` `brand-*` classes: define `brand.accent`/`brand.dark` tokens in `tailwind.config.ts` or swap to the existing amber palette
- [ ] 2.2 Create `app/components/icons.tsx` with Instagram, check-circle and arrow icons; replace inline copies in `GallerySection`, `TrainingSection`, `BookingSection`, `ReviewsSection`, `AboutSection`

## 3. Component dedup

- [ ] 3.1 Merge `ProfilePhotoManager.tsx` + `HeroImageManager.tsx` into one `ImageManager.tsx` taking title/action/current-image props
- [ ] 3.2 Remove the local `SubmitButton` re-definition inside `UploadForm.tsx`; import `admin/SubmitButton`

## 4. Dependencies and scripts

- [ ] 4.1 Remove `@next/third-parties` from `package.json` (unused)
- [ ] 4.2 Replace `"lint": "next lint"` with the ESLint CLI equivalent (`eslint .`); keep `lint:fix` in sync
- [ ] 4.3 Decide husky/lint-staged: configure `.husky/pre-commit` (lint-staged) or drop both deps — coordinate with `add-testing-ci`

## 5. Verification

- [ ] 5.1 `npm run build` + `npm run lint` pass; visual smoke test of all sections and both admin managers (upload, crop, delete)
