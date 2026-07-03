## 1. Consent infrastructure

- [ ] 1.1 In `CookieConsent.tsx`, dispatch a custom `cookie-consent-changed` event (with the new value) whenever the visitor accepts/declines
- [ ] 1.2 Create a small `useCookieConsent()` hook (e.g. `app/lib/useCookieConsent.ts`) that reads the stored value and subscribes to `cookie-consent-changed` + the native `storage` event; no polling

## 2. Gate the trackers

- [ ] 2.1 Rewrite `GoogleAnalyticsWrapper.tsx` to use `useCookieConsent()` and remove the 1s `setInterval`
- [ ] 2.2 Read the GA ID from `process.env.NEXT_PUBLIC_GA_ID`; render nothing when the variable is unset
- [ ] 2.3 Move the Meta Pixel `<Script>` out of `layout.tsx` into a consent-gated client component (same pattern as GA); keep the `NEXT_PUBLIC_FB_PIXEL_ID` env guard
- [ ] 2.4 Decide Vercel Insights policy: either gate it the same way or document in code + privacy policy why it stays ungated (cookieless)

## 3. Privacy policy text

- [ ] 3.1 Update `privacyPolicy` sections in `lt.ts`, `ru.ts`, `en.ts` to name all trackers in use (GA, Meta Pixel, Vercel Insights) and their consent basis

## 4. Verification

- [ ] 4.1 `npm run build`; manual check: with no consent nothing loads (Network tab), after accept GA+Pixel load without reload, after decline they stop on next navigation; `NEXT_PUBLIC_GA_ID` unset ⇒ no GA script
