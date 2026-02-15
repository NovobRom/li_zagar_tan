# li_zagar_tan — Landing Page

Landing page for **li_zagar_tan** — a professional spray tan studio in Vilnius.

> 🌐 **Production:** [li-zagar-tan.vercel.app](https://li-zagar-tan.vercel.app)

---

## 🛠 Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) | 16.1.6 |
| **UI Library** | [React](https://react.dev/) | 19.2.3 |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | ^5 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | ^4 |
| **Fonts** | [Geist Sans & Geist Mono](https://vercel.com/font) (via `next/font`) | — |
| **Icons** | [Lucide React](https://lucide.dev/) | ^0.563.0 |
| **Database / Storage** | [Supabase](https://supabase.com/) (Storage, Auth) | ^2.93.3 |
| **Validation** | [Zod](https://zod.dev/) | ^4.3.6 |
| **Drag & Drop** | [@dnd-kit](https://dndkit.com/) | ^6.3.1 |
| **File Upload** | [react-dropzone](https://react-dropzone.js.org/) | ^14.4.0 |
| **Image Cropper** | [react-easy-crop](https://github.com/ValentinH/react-easy-crop) | ^5.5.6 |
| **Deployment** | [Vercel](https://vercel.com/) | — |

### Dev Tools

| Tool | Purpose |
|------|---------|
| ESLint | Code linting |
| Prettier | Code formatting |
| Husky + lint-staged | Pre-commit hooks |
| Vitest | Unit testing |

---

## 🎨 Brand Colors

| Color | HEX | Usage |
|-------|-----|-------|
| ⚫ Black | `#0a0a0a` | Background (dark mode), header |
| ⚪ White | `#ffffff` | Background (light mode) |
| 🟡 Premium Gold | `#fbbf5d` | Accent color, CTA elements, focus states |
| 🟡 Tailwind Gold | `#FFD700` | Secondary gold |
| ⬛ Foreground | `#171717` | Headings (light mode) |
| 🔘 Text Body | `#333333` | Body text (light mode) |
| 🔘 Text Muted | `#9ca3af` | Muted text (light mode) |

> The site supports **dark theme** via `prefers-color-scheme: dark`.

---

## 📁 Project Structure

```
li-zagar-tan-landing/
├── app/
│   ├── actions/          # Server Actions (Supabase API)
│   ├── admin/            # Admin panel (gallery & settings management)
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── GallerySection.tsx
│   │   ├── SafetySection.tsx
│   │   ├── PreparationSection.tsx
│   │   ├── TrainingSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── BookingSection.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── StructuredData.tsx
│   │   ├── TreatwellWidget.tsx
│   │   └── admin/        # Admin panel components
│   ├── context/          # React Context (LanguageContext)
│   ├── i18n/             # Internationalization (lt, ru, en)
│   ├── lib/              # Utilities, Supabase client
│   ├── types/            # TypeScript types
│   ├── globals.css       # Global styles + CSS variables
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Home page
│   ├── robots.ts         # robots.txt generation
│   └── sitemap.ts        # Sitemap generation
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

---

## 🌍 Internationalization (i18n)

The site supports **3 languages**:
- 🇱🇹 **Lithuanian** (lt) — default
- 🇷🇺 **Russian** (ru)
- 🇬🇧 **English** (en)

Language is stored in a cookie and used for SEO metadata. A language switcher is available in the header.

---

## 📄 Landing Page Sections

1. **Header** — navigation, language switcher, mobile menu
2. **Hero** — full-screen banner with CTA
3. **About** — about the procedure
4. **Gallery** — photo gallery (images from Supabase Storage)
5. **Safety** — procedure safety information
6. **Preparation** — how to prepare for the procedure
7. **Training** — training & certification
8. **Pricing** — prices
9. **Reviews** — client testimonials
10. **Booking** — booking via Treatwell
11. **Footer** — contacts, social links

---

## 🔧 SEO

- Dynamic `<title>` and `<meta description>` per language
- Open Graph and Twitter Card metadata
- JSON-LD structured data (`StructuredData.tsx`)
- Auto-generated `robots.txt` and `sitemap.xml`
- Semantic HTML markup

---

## 🚀 Getting Started

### Requirements
- Node.js ≥ 18
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run linter |
| `npm run lint:fix` | Auto-fix lint errors |
| `npm run type-check` | TypeScript type checking |
| `npm run format` | Format code (Prettier) |

---

## 📦 Deployment

The project is deployed on **Vercel** automatically on push to `main`.

---

## 👤 Author

**Roman Novobranets**
