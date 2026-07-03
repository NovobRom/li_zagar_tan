## ADDED Requirements

### Requirement: Single canonical base URL
All SEO surfaces (metadata, JSON-LD, robots, sitemap) SHALL derive the site origin from one shared constant (`app/config/site.ts`), with `https://www.lizagartan.com` as the fallback.

#### Scenario: Env variable absent
- **WHEN** `NEXT_PUBLIC_APP_URL` is not set
- **THEN** canonical URL, JSON-LD `@id`/`url`/`image`, robots sitemap link and sitemap entries all use `https://www.lizagartan.com`

### Requirement: Structured data references existing assets
The `BeautySalon` JSON-LD SHALL only reference image URLs that resolve to real files.

#### Scenario: Schema image resolves
- **WHEN** the JSON-LD `image` URL is requested
- **THEN** it returns HTTP 200 (currently `/opengraph-image.png`)

### Requirement: Complete sitemap
The sitemap SHALL list every indexable public page.

#### Scenario: Privacy page indexed
- **WHEN** `/sitemap.xml` is fetched
- **THEN** it contains both `/` and `/privacy`

### Requirement: Keywords for every locale
Each language's metadata block SHALL include a `keywords` set equivalent in coverage to the Lithuanian one.

#### Scenario: Russian visitor metadata
- **WHEN** metadata is generated with the `ru` language cookie
- **THEN** the `keywords` field is present and non-empty
