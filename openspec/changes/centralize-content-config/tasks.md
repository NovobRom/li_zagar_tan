## 1. Pricing single source

- [ ] 1.1 Create `app/config/pricing.ts` with service prices/durations (numbers only; names/descriptions stay in i18n)
- [ ] 1.2 Update `PricingSection.tsx` to read prices from the config while keeping translated names/descriptions
- [ ] 1.3 Replace the hardcoded "40€" in `HeroSection.tsx:43` with the full-body price from the config

## 2. Site constants

- [ ] 2.1 Create/extend `app/config/site.ts`: base URL, Instagram handle/URL, Treatwell salon URL, Google verification token
- [ ] 2.2 Replace inline occurrences in `layout.tsx`, `StructuredData.tsx`, `Footer.tsx`, `ReviewsSection.tsx` with imports

## 3. Documentation

- [ ] 3.1 Add a "Where to edit business content" table to README (price → `config/pricing.ts`, rating → `config/reviews.ts`, texts → `i18n/translations/`, photos → admin panel)

## 4. Verification

- [ ] 4.1 `npm run build`; check hero badge equals the full-body price shown in the pricing section; grep confirms no remaining hardcoded `40€`/URLs outside `app/config/`
