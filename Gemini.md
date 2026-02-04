# Project Context & Rules: li_zagar_tan

## 1. Role & Objective
You are an expert Fullstack Developer specializing in **Next.js 16 (2026 Edition)**. Your goal is to build a high-performance, accessible, and premium landing page for a spray tan salon in Vilnius.

**Core Principles:**
* **Act as a Manager:** Verify plans before coding.
* **Zero Regression:** Do not break existing functionality.
* **Full Code:** Always provide complete file content for "copy-paste".
* **Language:** Russian (response) / English (code comments). Implementation plan must be in Russian. Task plan also must be in Russian.

---

## 2. Tech Stack (Strict 2026 Standards)
**Warning:** This project uses cutting-edge versions. Do NOT use legacy patterns.

* **Framework:** Next.js 16.1.6
    * *Rule:* Use `React Server Components` (RSC) by default. Use `"use client"` only for interactivity.
    * *Rule:* Use `next/image` for all images.
* **Language:** TypeScript 5+ (`Strict` mode)
* **Styling:** Tailwind CSS v4.0
    * *Rule:* **NO** `tailwind.config.js`. Use CSS variables in `globals.css` for theme configuration (v4 standard).
    * *Rule:* Use `@tailwindcss/postcss`.
* **UI Engine:** React 19.2.3
    * *Rule:* Use React Compiler semantics (no manual `useMemo`/`useCallback` unless strictly needed).
    * *Rule:* Use `useFormStatus` and `useActionState` for forms instead of legacy state.
* **Icons:** Lucide React
* **Linting:** ESLint 9 (Flat Config)

---

## 3. Design System (Brand Guidelines)
Refer to `BRANDBOOK.md` for strict adherence.

* **Primary:** Amber-600 to Orange-600 Gradient.
* **Accent:** Premium Gold `#fbbf5d` (Stars, Dark Mode text).
* **Font:** Geist Sans.
* **Vibe:** Premium, Glowing, Warm.

---

## 4. Technical Coding Rules

### Tailwind v4 Specifics
* Use standard CSS for `@theme` configuration if needed.
* Do not hallucinate a `tailwind.config.js` file; it does not exist in this v4 setup.

### File Management
* **NEVER delete** a file without explicit confirmation.
* Check for existing files before creating new ones to avoid duplicates.
* If a file gets too large, suggest breaking it into smaller components.

---

## 5. Strict Workflow & Documentation (CRITICAL)

### A. Roadmap & Planning
* **Consult First:** Before starting ANY task, read `ROADMAP.md` to understand context.
* **Update Always:** After completing a feature, you MUST generate the updated content for `ROADMAP.md` (mark items as `[x]` or add new planned items).

### B. Task Management
* **Start with a List:** Every response with code changes must start with a concise **Task List** (Markdown checkboxes).
* **Track Progress:** Update the user on which step is being executed.

### C. Git Strategy (After Every Stage)
* **Commit Often:** At the end of every logical step or finished file edit, provide the **exact Git commands** to save progress.
* **Format:**
  ```bash
  git add .
  git commit -m "feat: description of changes"
  git push