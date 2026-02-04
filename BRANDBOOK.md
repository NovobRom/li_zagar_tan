# Brand Book: li_zagar_tan

## 1. Core Identity
**Brand Name:** `li_zagar_tan`
**Mission:** Provide safe, professional, and natural-looking spray tans in Vilnius.
**Vibe:** Premium, Warm, Glowing, Natural, Confidence.

---

## 2. Color Palette

### Primary Colors (The "Glow")
Used for main actions, gradients, and brand recognition.
- **Amber 600**: `#d97706` (Primary Brand Color)
- **Orange 600**: `#ea580c` (Gradient End Color)
- **Gradient Usage**: `bg-gradient-to-r from-amber-600 to-orange-600`

### Accent: Premium Gold (NEW)
Use sparingly to add a premium touch. Best for dark backgrounds or small UI elements.
- **Premium Gold**: `#fbbf5d`
- **Usage**:
    - **Icons & Ratings**: stars, checkmarks, clock icons.
    - **Dark Mode / Footer Text**: headings or highlights on black/dark gray.
    - **Shine Effects**: as a middle stop in gradients to add "lustre".

### Neutrals & Backgrounds
- **Pure White**: `#ffffff` (Main Background)
- **Warm White**: `#fffbeb` (Amber-50 - Hero Sections)
- **Glass White**: `rgba(255, 255, 255, 0.6)` + `backdrop-blur-md` (Cards/Nav)
- **Rich Black**: `#0a0a0a` (Footer / Dark Mode Background)

### Typography Colors
- **Headings**: `#171717` (Neutral-900) - Strong, high contrast.
- **Body Text**: `#333333` (Gray-700 approx) - Readable, softer than black.
- **Muted Text**: `#9ca3af` (Gray-400) - For secondary snippets or footer text.

---

## 3. Typography
**Font Family**: Geist Sans (Modern, Clean, grotesque sans-serif)
**Styles**:
- **Headings**: Bold / ExtraBold. Tight letter spacing for modern feel.
- **Body**: Regular / Medium.
- **Micro-copy**: Medium / SemiBold (e.g., "BOOK NOW" buttons).

---

## 4. UI Components & Usage

### Buttons
- **Primary CTA**: Full gradient background.
    - *Normal*: `from-amber-500 to-orange-500`
    - *Hover*: `from-amber-600 to-orange-600`
    - *Shape*: Fully rounded `rounded-full`.
    - *Shadow*: Soft shadow `shadow-lg` to create depth.

### Cards (Glassmorphism)
- **Style**: Use `bg-white/60` or `bg-white/90` with `backdrop-blur-sm`.
- **Border**: Minimal or no border. Use subtle gradients or shadows to define edges.

### Icons
- **Library**: Lucide React (`Stroke Width: 2px` or `1.5px`).
- **Color**: `text-amber-600` or `#fbbf5d` (Gold) for emphasis.

---

## 5. Design Improvement Suggestions

### 1. "Golden Hour" Gradients
Enhance the current 2-color gradient by adding the new **Premium Gold** in the center to create a metallic/shine effect.
*Current*: `from-amber-600 to-orange-600`
*Suggested*: `from-amber-600 via-[#fbbf5d] to-orange-600` (Use on hover or special promos).

### 2. Luxury Dark Mode Elements
In the Footer or dark sections, use **Premium Gold (#fbbf5d)** for:
- The Brand Logo Text.
- Social Media Icons (Instagram).
- Thin decorative lines or borders.

### 3. Review Highlighting
Make the "5-star" rating pop by strictly using the new Gold color.
- Stars: ★★★★★ (`text-[#fbbf5d]`)
- Review Count: `text-gray-600`

### 4. Interactive "Glow"
Add a soft glow effect behind key images or the "Book Now" button using the Gold color with high blur.
- `shadow-[0_0_20px_rgba(251,191,93,0.3)]`

---

## 6. Accessibility Notes
- **Do NOT** use `#fbbf5d` (Gold) for body text on white backgrounds. Contrast ratio is too low (~1.7:1).
- **DO** use `#fbbf5d` on dark backgrounds (Gray-900). Contrast is excellent (~13:1).
- Always ensure main content text is at least Gray-700 (`#374151`) or darker.
