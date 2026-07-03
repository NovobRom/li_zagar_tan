# Clean up dead code and duplication

## Why

The repo carries dead weight that confuses maintenance: an unused `PhotoGrid.tsx` component, a `copy-script.js` with a hardcoded Windows path from the author's machine, Next.js boilerplate SVGs in `public/`, Footer classes referencing undefined `brand-*` Tailwind tokens (`app/components/Footer.tsx:78-81`), two separate `SubmitButton` implementations, ~90%-identical `ProfilePhotoManager`/`HeroImageManager`, and the same inline SVGs copy-pasted across sections. Vitest/husky/lint-staged are dependencies but unused (no tests, no `.husky/`).

## What Changes

- Delete: `app/components/admin/PhotoGrid.tsx`, `copy-script.js`, unused `public/{file,globe,next,vercel,window}.svg`
- Fix or remove the undefined `brand-*` classes in `Footer.tsx` (define tokens in `tailwind.config.ts` or use existing colors)
- Extract shared icon components (Instagram, check-circle, arrow) into `app/components/icons.tsx` and reuse
- Merge `ProfilePhotoManager` and `HeroImageManager` into one parameterized `ImageManager`
- Deduplicate `SubmitButton` (keep `app/components/admin/SubmitButton.tsx`)
- Remove unused deps (`@next/third-parties`; husky/lint-staged unless hooks get configured in `add-testing-ci`)
- Replace deprecated `next lint` script with the ESLint CLI

## Capabilities

### New Capabilities
- `codebase-hygiene`: no unreferenced files, no undefined style tokens, shared UI defined once

### Modified Capabilities

_None (no existing specs)._

## Impact

- Deletions and refactors across `app/components/` and root scripts; `package.json`
- No user-visible change; bundle slightly smaller

## Non-goals

- Any visual redesign
- Reducing `'use client'` scope (tracked in review roadmap; touches i18n architecture)
- Fixing `as any` casts in server actions (worth doing opportunistically, not a goal here)
