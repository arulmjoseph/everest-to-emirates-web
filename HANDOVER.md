# PROJECT BRIEF & AI HANDOVER DOCUMENT
## Everest to Emirates 2026 — Bilateral Cultural & Business Summit

> **Target Project**: `everest-repo-imported` (`http://localhost:3000`)  
> **GitHub Repository**: [https://github.com/arulmjoseph/everest-to-emirates-web](https://github.com/arulmjoseph/everest-to-emirates-web)  
> **Date**: October 4, 2026  

---

### 1. Executive Summary & Purpose
**Everest to Emirates 2026** is the official digital platform for the bilateral summit connecting Nepal and the United Arab Emirates taking place on November 28, 2026, at Armani Hotel Dubai. The core highlight of the platform is showcasing and driving inquiries/registrations for the **300+ page commemorative hardcover publication launch**.

---

### 2. Repository & System Connections

| Attribute | Details |
| :--- | :--- |
| **GitHub Repository** | [`https://github.com/arulmjoseph/everest-to-emirates-web`](https://github.com/arulmjoseph/everest-to-emirates-web) |
| **Local Working Directory** | `/Users/aruljoseph/arul/02 - Dev Projects/dev/antigravity.live/everest-repo-imported` |
| **Local Dev Server** | `http://localhost:3000` (`bun run dev --port 3000`) |
| **Active Git Branch** | `main` |
| **Live Vercel Mirror** | [`https://everest-to-emirates-nepal.vercel.app`](https://everest-to-emirates-nepal.vercel.app) |

---

### 3. Architecture & Tech Stack

- **Framework**: React 18 with TanStack Router (file-based routing under `src/routes/`).
- **Styling & System**: Tailwind CSS with custom OkLCH design system tokens, Lucide React icons, and custom CSS in `src/styles.css`.
- **Runtime & Build Tooling**: Vite 8, Bun / Node.js, Nitro server engine.
- **Backend & Data Storage**: Supabase integration (`src/integrations/supabase/`), Drizzle ORM (`drizzle/schema.ts`), serverless inquiry functions (`src/lib/inquiries.functions.ts`).

---

### 4. UI/UX Design System Specifications

1. **Typography & Font Rules**:
   - **Heading & Body Font**: `Noto Sans` (Strict rule: maximum font-weight `400` across headings and text elements).
   - **Text Casing**: Sentence case for headings and titles (avoid aggressive ALL CAPS styling).

2. **Color Palette**:
   - **Dark Background**: `#070B12`
   - **Surface / Card Background**: `#0F1622`
   - **Heritage Saffron Gold Accent**: `#e5cb8a`
   - **Primary Text**: `#FFFFFF`
   - **Secondary Muted Text**: `#A0AEC0`

3. **Fixed Shrinking White Header**:
   - `#FFFFFF` solid background with dark navigation links (`#070B12`) for high contrast against the logo.
   - Smooth shrink animation on scroll (`.header-scrolled` class toggled at `scrollY > 40`).
   - Height transitions smoothly from `80px` to `56px`, and logo height shrinks from `52px` to `38px`.
   - **Dual Header CTA Buttons**:
     1. Outline button: `Become a sponsor`
     2. Solid Gold button: `Participate` (with `ArrowUpRight` icon)
   - Zero hover movement or scale animation on logo image.

4. **Hero Banner**:
   - **Desktop Backdrop**: Auto-playing video (`src/assets/hero-banner.mp4`) with poster image fallback (`src/assets/hero-nepal-uae.jpg`).
   - Attributes: `autoPlay loop muted playsInline`.
   - Content: Bottom-aligned layout with headline size scaled to `clamp(40px, 5.5vw, 76px)`.
   - Zero top dark shade bar underneath the header (backdrop extends seamlessly up to the white header).

5. **About Section ("Two places. One shared journey.")**:
   - Generous top spacing (`padding-top: 160px`) to ensure clean visual separation from the Hero banner.

6. **Registration Card & Inquiry Form ("Let's connect.")**:
   - **Borderless Styling**: Form container, text inputs, textareas, and radio selection pills (`Yes` / `No`) have all outer borders removed (`border: none !important`).
   - Form fields route entries to `dcom@eim.ae` and Supabase backend handler.

7. **3D Book Showcase**:
   - Hardcover artwork (`src/assets/book_mockup.jpg`) displayed on a 100% transparent container (no borders or background boxes).

---

### 5. Directory Structure & Key Files

```
everest-repo-imported/
├── HANDOVER.md                # AI & Developer Handoff Document
├── src/
│   ├── routes/
│   │   ├── index.tsx          # Main Landing Page route (Header, Hero, About, Book, Form)
│   │   ├── thank-you.tsx      # Registration confirmation page
│   │   └── __root.tsx         # Root layout wrapper
│   ├── assets/
│   │   ├── hero-banner.mp4    # Hero desktop background video
│   │   ├── hero-nepal-uae.jpg # Himalayan & Dubai backdrop image
│   │   ├── book_mockup.jpg    # 3D Hardcover book artwork
│   │   └── logo.png           # Everest to Emirates brand logo
│   ├── components/ui/         # Radix / Shadcn UI components (button, card, dialog)
│   ├── lib/
│   │   └── inquiries.functions.ts # Inquiry submission API handler
│   ├── styles.css             # Main styling, custom classes, header shrink & form resets
│   └── video.d.ts             # TypeScript module declaration for .mp4 assets
├── drizzle/                   # Drizzle ORM database migrations
├── vite.config.ts             # Vite build configuration
└── package.json               # Project dependencies and script runner
```

---

### 6. Command Reference for Development

```bash
# 1. Install dependencies
bun install

# 2. Start dev server on port 3000
bun run dev --port 3000

# 3. Build project for production
bun run build

# 4. Commit and push changes to GitHub
git add .
git commit -m "Update feature description"
git push origin main
```

---

### 7. Handoff Checklist for New AI Agent / Developer

- [x] Verify remote git origin is set to `https://github.com/arulmjoseph/everest-to-emirates-web.git`.
- [x] Maintain Noto Sans font-weight limit (`400`) and sentence case formatting.
- [x] Keep the top navigation header fixed, white (`#FFFFFF`), and smoothly shrinking on scroll.
- [x] Preserve the auto-playing desktop background video (`hero-banner.mp4`) in the hero section.
- [x] Maintain borderless styling (`border: none !important`) on the footer inquiry form.
