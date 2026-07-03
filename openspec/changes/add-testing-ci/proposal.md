# Add testing and CI

## Why

The repo has zero tests and no CI, yet the README claims Vitest and husky pre-commit hooks. Regressions (like the stale review count) are only caught by humans looking at the production site. Vitest is already a dependency — it just was never wired up.

## What Changes

- Add `vitest.config.ts` and a `test` npm script
- First unit tests for pure logic: `app/lib/validation.ts` (file schema, magic bytes), `app/lib/security.ts` (rate-limit decision logic, including the fail-closed path), `app/config/reviews.ts` (`formatRating`), i18n completeness (every locale has every key — types already enforce this, a runtime test guards against `as any` bypasses)
- GitHub Actions workflow: lint + type-check + test + build on every push/PR to main
- Configure `.husky/pre-commit` with lint-staged (deps already present), or remove them (decision shared with `cleanup-dead-code`)

## Capabilities

### New Capabilities
- `quality-gates`: every push runs lint, type-check, unit tests and a production build in CI; failures block merging

### Modified Capabilities

_None (no existing specs)._

## Impact

- New `vitest.config.ts`, `app/**/*.test.ts`, `.github/workflows/ci.yml`, `.husky/`
- `package.json` scripts
- No runtime/user-facing changes

## Non-goals

- E2E/browser tests (Playwright) — worthwhile later for the admin upload flow
- Coverage thresholds or visual regression testing
- Testing Supabase-dependent server actions (needs a test harness/mocks; separate change)
