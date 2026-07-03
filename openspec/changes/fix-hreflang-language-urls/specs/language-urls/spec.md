## ADDED Requirements

### Requirement: Language URLs render their language
Every URL advertised in hreflang alternates SHALL render the site in the advertised language on first load.

#### Scenario: Direct visit with lang parameter
- **WHEN** a first-time visitor opens `/?lang=ru`
- **THEN** the client content renders in Russian and `<html lang>` is `ru`

#### Scenario: Parameter overrides stored preference
- **WHEN** a visitor with a stored `lt` preference opens `/?lang=en`
- **THEN** the page renders in English and the stored preference updates to `en`

### Requirement: hreflang annotations match reality
The page SHALL declare hreflang alternates (including `x-default`) only for URLs that actually switch language.

#### Scenario: Alternates list
- **WHEN** the homepage HTML head is inspected
- **THEN** hreflang entries exist for `lt`, `ru`, `en` and `x-default`, each pointing to a URL that renders that language
