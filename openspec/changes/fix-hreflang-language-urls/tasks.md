## 1. Honor ?lang on load

- [ ] 1.1 In `LanguageContext.tsx`, read `lang` from `window.location.search` during init with priority: query param > localStorage > `navigator.language`; persist it to cookie/localStorage
- [ ] 1.2 In `app/layout.tsx` `generateMetadata`, prefer a valid `?lang` searchParam over the cookie when choosing the metadata language

## 2. Keep annotations truthful

- [ ] 2.1 Verify hreflang alternates in `layout.tsx` match the now-working URLs (`/?lang=lt|ru|en`) and add `x-default`
- [ ] 2.2 Add a short note to `docs/ARCHITECTURE.md` recording the decision and the future `[lang]` route option

## 3. Verification

- [ ] 3.1 `npm run build`; open `/?lang=ru` and `/?lang=en` in a fresh incognito session — page renders in that language on first paint of client content and `<html lang>` matches; hreflang tags present
