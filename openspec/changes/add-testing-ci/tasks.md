## 1. Vitest wiring

- [ ] 1.1 Add `vitest.config.ts` (node environment, `@/*` path alias matching tsconfig)
- [ ] 1.2 Add `"test": "vitest run"` and `"test:watch": "vitest"` scripts to `package.json`

## 2. First tests

- [ ] 2.1 Tests for `app/lib/validation.ts`: accepts valid image types/sizes, rejects wrong magic bytes
- [ ] 2.2 Tests for `app/lib/security.ts` rate-limit logic (allow under limit, deny over limit, deny on DB error once fail-closed lands)
- [ ] 2.3 Test for `formatRating()` in `app/config/reviews.ts` (placeholders replaced in all three locale templates)
- [ ] 2.4 i18n completeness test: `lt`, `ru`, `en` objects are deep-key-identical

## 3. CI

- [ ] 3.1 Add `.github/workflows/ci.yml`: checkout, setup-node 22 with npm cache, `npm ci`, `npm run lint`, `npm run type-check`, `npm test`, `npm run build` (with dummy `NEXT_PUBLIC_SUPABASE_*` env)
- [ ] 3.2 Configure `.husky/pre-commit` running lint-staged (prettier + eslint on staged files) — or remove husky/lint-staged deps if declined

## 4. Verification

- [ ] 4.1 `npm test` green locally; push a branch and confirm the workflow runs and passes on GitHub; README testing claims now true
