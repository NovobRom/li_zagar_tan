## ADDED Requirements

### Requirement: No dead code in the repository
The repository SHALL NOT contain components, scripts or assets that nothing references (currently: `PhotoGrid.tsx`, `copy-script.js`, boilerplate `public/*.svg`).

#### Scenario: Import audit
- **WHEN** every file under `app/` and every root script is checked for inbound references
- **THEN** each one is imported/used at least once or has been deleted

### Requirement: Styles reference defined tokens
Components SHALL only use Tailwind classes whose tokens exist in the Tailwind configuration.

#### Scenario: Footer brand colors
- **WHEN** `Footer.tsx` uses `brand-*` color classes
- **THEN** matching `brand` tokens are defined in `tailwind.config.ts` and produce visible styling

### Requirement: Shared UI is defined once
Icons and buttons reused across components SHALL live in a single shared module rather than being copy-pasted.

#### Scenario: Instagram icon update
- **WHEN** the Instagram icon needs a change
- **THEN** exactly one source file (`app/components/icons.tsx`) requires editing

#### Scenario: Photo manager fix
- **WHEN** a bug is fixed in the image upload/crop manager
- **THEN** one shared `ImageManager` component covers both the profile photo and hero image flows
