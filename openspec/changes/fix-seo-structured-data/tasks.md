## 1. Single base URL

- [ ] 1.1 Create `app/config/site.ts` exporting `baseUrl` (env `NEXT_PUBLIC_APP_URL` with fallback `https://www.lizagartan.com`)
- [ ] 1.2 Use it in `app/layout.tsx` (`metadataBase`), `app/robots.ts`, `app/sitemap.ts`, `app/components/StructuredData.tsx`

## 2. Structured data fixes

- [ ] 2.1 Change schema `image` to `${baseUrl}/opengraph-image.png` (file exists in `public/`)
- [ ] 2.2 Remove `'use client'` from `StructuredData.tsx` and render it server-side from `layout.tsx`

## 3. Sitemap and keywords

- [ ] 3.1 Add `/privacy` entry to `app/sitemap.ts`
- [ ] 3.2 Add `keywords` arrays to the `ru` and `en` blocks of `metadataByLanguage` in `app/layout.tsx` (translate the `lt` set)

## 4. Verification

- [ ] 4.1 `npm run build`; check page source: one consistent domain in JSON-LD/canonical/OG; validate JSON-LD with Google Rich Results Test; `curl /sitemap.xml` shows both URLs
