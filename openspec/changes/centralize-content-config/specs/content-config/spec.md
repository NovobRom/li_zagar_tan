## ADDED Requirements

### Requirement: One source of truth per business fact
Every business fact displayed on the site (prices, durations, rating, review count, address, social/booking links) SHALL be defined in exactly one place (`app/config/*` or the i18n files), never duplicated inline in components.

#### Scenario: Full-body price changes
- **WHEN** the full-body price is updated in `app/config/pricing.ts`
- **THEN** both the pricing section and the hero badge show the new price with no other edits

#### Scenario: Grep for stray literals
- **WHEN** the codebase is searched for hardcoded price/URL literals outside `app/config/` and `app/i18n/`
- **THEN** no user-visible business values are found in component files

### Requirement: Editable values are documented
The README SHALL contain a table mapping each editable business value to the file where it lives.

#### Scenario: Owner needs to update the rating
- **WHEN** a maintainer consults the README "Where to edit content" table
- **THEN** it names `app/config/reviews.ts` for rating/review count and `app/config/pricing.ts` for prices
