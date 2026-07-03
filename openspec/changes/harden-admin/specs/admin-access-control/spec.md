## ADDED Requirements

### Requirement: All admin pages require authentication
Every route under `/admin/*` except the login page (`/admin`) SHALL be reachable only with a valid Supabase session, enforced both in middleware and in the shared admin layout.

#### Scenario: Anonymous visits audit logs
- **WHEN** an unauthenticated request targets `/admin/audit-logs`
- **THEN** it is redirected to `/admin` before any page code runs

#### Scenario: Anonymous visits dashboard
- **WHEN** an unauthenticated request targets `/admin/dashboard`
- **THEN** it is redirected to `/admin`

### Requirement: Sessions are refreshed centrally
Middleware SHALL refresh the Supabase auth session on matched requests so server components never observe a stale session.

#### Scenario: Expired access token with valid refresh token
- **WHEN** an admin with an expired access token opens `/admin/dashboard`
- **THEN** the session is refreshed in middleware and the page renders without a redirect to login

### Requirement: Rate limiting fails closed
The upload rate limiter SHALL deny the action when its backing store cannot be queried.

#### Scenario: Audit table unavailable
- **WHEN** the rate-limit count query returns an error
- **THEN** the mutation is rejected with a rate-limit error, not allowed through
