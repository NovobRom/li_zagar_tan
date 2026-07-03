# Harden the admin area

## Why

Admin route protection is inconsistent: `/admin/dashboard` is guarded by a server-side auth check in its layout, but `/admin/audit-logs` has no page/layout guard and relies solely on the `getAuditLogs()` action redirecting (`app/admin/audit-logs/page.tsx`). There is no `middleware.ts`, so Supabase sessions are never refreshed centrally (the cookie adapter in `app/lib/supabase-server.ts` even has a comment assuming middleware exists). The rate limiter fails open on DB errors (`app/lib/security.ts:66-71`).

## What Changes

- Add `middleware.ts` that refreshes the Supabase session and redirects unauthenticated requests for `/admin/(dashboard|audit-logs)` to `/admin`
- Move the auth guard to the shared `app/admin/layout.tsx` level (defense in depth alongside middleware)
- Make `checkRateLimit` fail closed (deny on DB error) and scope its count to the action being limited
- Localize hardcoded Russian admin strings or explicitly document admin as Russian-only

## Capabilities

### New Capabilities
- `admin-access-control`: every `/admin/*` page (except the login page) requires an authenticated session enforced at middleware and layout level; rate limiting denies when its backing store is unavailable

### Modified Capabilities

_None (no existing specs)._

## Impact

- New `middleware.ts` (repo root)
- `app/admin/layout.tsx`, `app/admin/dashboard/layout.tsx` (guard moves up), `app/admin/audit-logs/page.tsx`
- `app/lib/security.ts`, `app/lib/supabase-server.ts`

## Non-goals

- Changing the Supabase RLS policies or the `is_admin` RPC (DB side, managed outside this repo)
- Adding 2FA / SSO
- Full admin i18n (can stay Russian-only if documented)
