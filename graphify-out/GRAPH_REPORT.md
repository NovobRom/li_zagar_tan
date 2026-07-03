# Graph Report - .  (2026-07-02)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 242 nodes · 430 edges · 21 communities (16 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `610e07cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_gallery.ts|gallery.ts]]
- [[_COMMUNITY_useLanguage|useLanguage]]
- [[_COMMUNITY_devDependencies|devDependencies]]
- [[_COMMUNITY_compilerOptions|compilerOptions]]
- [[_COMMUNITY_li_zagar_tan — Landing Page|li_zagar_tan — Landing Page]]
- [[_COMMUNITY_ProfilePhotoManager.tsx|ProfilePhotoManager.tsx]]
- [[_COMMUNITY_layout.tsx|layout.tsx]]
- [[_COMMUNITY_dependencies|dependencies]]
- [[_COMMUNITY_index.ts|index.ts]]
- [[_COMMUNITY_GallerySection.tsx|GallerySection.tsx]]
- [[_COMMUNITY_database.ts|database.ts]]
- [[_COMMUNITY_audit.ts|audit.ts]]
- [[_COMMUNITY_copy-script.js|copy-script.js]]
- [[_COMMUNITY_MobileMenu.tsx|MobileMenu.tsx]]
- [[_COMMUNITY_eslint.config.mjs|eslint.config.mjs]]
- [[_COMMUNITY_next.config.ts|next.config.ts]]
- [[_COMMUNITY_postcss.config.mjs|postcss.config.mjs]]

## God Nodes (most connected - your core abstractions)
1. `useLanguage()` - 27 edges
2. `createClient()` - 23 edges
3. `compilerOptions` - 16 edges
4. `success()` - 10 edges
5. `failure()` - 10 edges
6. `logAction()` - 10 edges
7. `li_zagar_tan — Landing Page` - 10 edges
8. `uploadPhoto()` - 8 edges
9. `uploadHeroImage()` - 8 edges
10. `uploadProfilePhoto()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Home()` --calls--> `getHeroImage()`  [EXTRACTED]
  app/page.tsx → app/actions/settings.ts
- `GallerySection()` --calls--> `useLanguage()`  [EXTRACTED]
  app/components/GallerySection.tsx → app/context/LanguageContext.tsx
- `getAuditLogs()` --calls--> `createClient()`  [EXTRACTED]
  app/actions/audit.ts → app/lib/supabase-server.ts
- `login()` --calls--> `createClient()`  [EXTRACTED]
  app/actions/auth.ts → app/lib/supabase-server.ts
- `DashboardLayout()` --calls--> `createClient()`  [EXTRACTED]
  app/admin/dashboard/layout.tsx → app/lib/supabase-server.ts

## Import Cycles
- None detected.

## Communities (21 total, 5 thin omitted)

### Community 0 - "gallery.ts"
Cohesion: 0.13
Nodes (28): logout(), deletePhoto(), getPhotos(), updatePhotosOrder(), uploadPhoto(), deleteHeroImage(), deleteProfilePhoto(), getHeroImage() (+20 more)

### Community 1 - "useLanguage"
Cohesion: 0.13
Nodes (21): BookingSection(), Footer(), Header(), HeroSection(), PreparationSection(), PricingSection(), ReviewsSection(), POINT_ICONS (+13 more)

### Community 2 - "devDependencies"
Cohesion: 0.08
Nodes (24): devDependencies, eslint, eslint-config-next, husky, lint-staged, prettier, tailwindcss, @tailwindcss/postcss (+16 more)

### Community 3 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 4 - "li_zagar_tan — Landing Page"
Cohesion: 0.11
Nodes (17): 👤 Author, 🎨 Brand Colors, 📦 Deployment, Dev Tools, Development Server, Environment Variables, 🚀 Getting Started, Installation (+9 more)

### Community 5 - "ProfilePhotoManager.tsx"
Cohesion: 0.19
Nodes (8): login(), initialState, SubmitButton(), SubmitButtonProps, createImage(), getCroppedImg(), getRadianAngle(), rotateSize()

### Community 6 - "layout.tsx"
Cohesion: 0.17
Nodes (9): ConsentStatus, CookieConsent(), useCookieConsent(), GoogleAnalyticsWrapper(), StructuredData(), LanguageProvider(), geistMono, geistSans (+1 more)

### Community 7 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, lucide-react, next, @next/third-parties, react (+6 more)

### Community 8 - "index.ts"
Cohesion: 0.32
Nodes (7): en, lt, ru, Review, SafetyPoint, ServiceTranslation, Translations

### Community 9 - "GallerySection.tsx"
Cohesion: 0.36
Nodes (6): AboutSection(), GalleryItem, GallerySection(), blurDataURL(), shimmer(), toBase64()

### Community 10 - "database.ts"
Cohesion: 0.29
Nodes (5): Database, InsertTables, Json, Tables, UpdateTables

### Community 12 - "copy-script.js"
Cohesion: 0.50
Nodes (3): dest, fs, path

## Knowledge Gaps
- **93 isolated node(s):** `initialState`, `ConsentStatus`, `GalleryItem`, `MobileMenuProps`, `POINT_ICONS` (+88 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useLanguage()` connect `useLanguage` to `GallerySection.tsx`, `layout.tsx`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Why does `createClient()` connect `gallery.ts` to `audit.ts`, `ProfilePhotoManager.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `initialState`, `ConsentStatus`, `GalleryItem` to the rest of the system?**
  _93 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `gallery.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12727272727272726 - nodes in this community are weakly interconnected._
- **Should `useLanguage` be split into smaller, more focused modules?**
  _Cohesion score 0.13174603174603175 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._