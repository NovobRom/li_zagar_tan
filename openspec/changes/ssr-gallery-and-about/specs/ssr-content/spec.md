## ADDED Requirements

### Requirement: Gallery is server-rendered
Gallery photos and the about-section photo SHALL be fetched on the server and present in the initial HTML response.

#### Scenario: Crawler fetches homepage
- **WHEN** the homepage is requested without JavaScript execution
- **THEN** the response HTML contains the gallery `<img>` elements

### Requirement: Localized alt text
Each gallery image SHALL use the stored `alt_text_<lang>` for the active language, falling back to a translated generic description.

#### Scenario: Row has Russian alt text
- **WHEN** a gallery row has `alt_text_ru` set and the language is `ru`
- **THEN** the rendered `alt` attribute equals `alt_text_ru`

#### Scenario: Row has no alt text
- **WHEN** a gallery row has empty alt columns
- **THEN** the `alt` attribute is the translated fallback string, not an untranslated ID

### Requirement: Data failures are distinguishable
Read paths for public content SHALL NOT silently coerce database errors into empty results.

#### Scenario: Gallery query fails
- **WHEN** the gallery select returns an error
- **THEN** the error is logged and the section renders an explicit fallback state (not an empty gallery indistinguishable from "no photos")
