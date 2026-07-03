# Fix analytics consent (GDPR)

## Why

Meta Pixel and Vercel Insights load on every page regardless of the visitor's cookie choice (`app/layout.tsx:125-141`); only Google Analytics respects the consent banner. For an EU-based business this is a GDPR/ePrivacy compliance risk. The GA measurement ID is also hardcoded (`app/components/GoogleAnalyticsWrapper.tsx:6`) while `.env.example` documents an unused `NEXT_PUBLIC_GA_ID`, and consent changes are detected by polling `localStorage` every second.

## What Changes

- Gate Meta Pixel behind the same cookie-consent check that GA uses
- Decide and document a policy for Vercel Insights (anonymous, cookieless — may stay ungated, but the decision must be recorded in the privacy policy text)
- Read the GA ID from `NEXT_PUBLIC_GA_ID` instead of the hardcoded `G-23N94VFY9M`
- Replace the 1-second `setInterval` polling with an event-driven mechanism (custom event dispatched by `CookieConsent` + `storage` event for cross-tab)
- Update the privacy policy translations to list all three trackers

## Capabilities

### New Capabilities
- `analytics-consent`: all marketing/analytics trackers load only after explicit visitor consent; consent state changes take effect without page reload

### Modified Capabilities

_None (no existing specs)._

## Impact

- `app/layout.tsx` (Pixel + Insights script blocks)
- `app/components/GoogleAnalyticsWrapper.tsx`, `app/components/CookieConsent.tsx`
- `app/i18n/translations/{lt,ru,en}.ts` (privacy policy sections)
- `.env.example` (GA ID becomes actually used)

## Non-goals

- Building a full consent-management platform (granular per-vendor toggles)
- Server-side analytics or cookieless tracking migration
