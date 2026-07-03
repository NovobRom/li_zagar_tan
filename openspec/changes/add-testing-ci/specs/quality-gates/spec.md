## ADDED Requirements

### Requirement: Unit tests exist and run
The project SHALL have a working `npm test` script running Vitest over unit tests for pure logic (validation, rate-limit decisions, rating formatting, i18n completeness).

#### Scenario: Developer runs tests
- **WHEN** `npm test` is executed on a clean checkout after `npm ci`
- **THEN** the suite runs and passes without network access or Supabase credentials

#### Scenario: Locale key missing
- **WHEN** a key exists in `lt.ts` but is missing in `ru.ts`
- **THEN** the i18n completeness test fails

### Requirement: CI runs on every push
A GitHub Actions workflow SHALL run lint, type-check, unit tests and a production build for every push and pull request to the default branch.

#### Scenario: Broken build pushed
- **WHEN** a commit that fails `npm run build` is pushed to a PR
- **THEN** the workflow reports a failing status on the PR

### Requirement: Declared tooling is real
Development tooling claimed in the README (test runner, pre-commit hooks) MUST actually be configured in the repository.

#### Scenario: README audit
- **WHEN** the README lists Vitest and pre-commit hooks
- **THEN** `vitest.config.ts` and `.husky/pre-commit` exist (or the claims are removed)
