## 1. Middleware

- [ ] 1.1 Create `middleware.ts` with a Supabase session refresh (per `@supabase/ssr` docs) and a `matcher` for `/admin/:path*`
- [ ] 1.2 Redirect unauthenticated users to `/admin` for all matched routes except `/admin` itself

## 2. Layout-level guard

- [ ] 2.1 Move the `auth.getUser()` check from `app/admin/dashboard/layout.tsx` into `app/admin/layout.tsx` (skip for the login page) so `/admin/audit-logs` is covered
- [ ] 2.2 Remove the now-duplicated guard from the dashboard layout

## 3. Rate limiter

- [ ] 3.1 In `app/lib/security.ts`, return `false` (deny) when the audit-log count query errors; log the error
- [ ] 3.2 Filter the count by the relevant `action` value so one action's traffic can't exhaust another's limit

## 4. Verification

- [ ] 4.1 `npm run build`; manual check: logged out, `/admin/dashboard` and `/admin/audit-logs` both redirect to `/admin`; logged in, both render; upload still works (rate limiter not tripped by normal use)
