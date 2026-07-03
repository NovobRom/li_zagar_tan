## ADDED Requirements

### Requirement: Trackers load only after consent
Marketing/analytics trackers (Google Analytics, Meta Pixel) SHALL NOT load or send any request until the visitor has explicitly accepted cookies via the consent banner.

#### Scenario: First visit, no decision yet
- **WHEN** a visitor opens any page and has not interacted with the consent banner
- **THEN** no GA or Meta Pixel network requests are made

#### Scenario: Visitor accepts
- **WHEN** the visitor clicks "Accept" on the consent banner
- **THEN** GA and Meta Pixel load in the same session without a page reload

#### Scenario: Visitor declines
- **WHEN** the visitor clicks "Decline"
- **THEN** no tracker requests are made now or on subsequent visits until consent changes

### Requirement: Consent changes are event-driven
The consent state SHALL propagate to tracker components via events (custom event in-tab, `storage` event cross-tab), not by polling.

#### Scenario: No polling loop
- **WHEN** the page is idle after load
- **THEN** no recurring timer reads consent state from localStorage

### Requirement: Analytics IDs come from environment
Tracker identifiers (GA measurement ID, Meta Pixel ID) MUST be read from `NEXT_PUBLIC_*` environment variables; an unset variable disables that tracker.

#### Scenario: GA ID not configured
- **WHEN** `NEXT_PUBLIC_GA_ID` is unset at build time
- **THEN** the GA script is not rendered at all
