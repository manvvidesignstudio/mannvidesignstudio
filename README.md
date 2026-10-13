# Manvvi Design Studio — Premium Interior Architecture & Design Platform

A complete, production-ready, ultra-luxury website and custom Content Management System (CMS) designed specifically for **Manvvi Design Studio**, an architectural interior design practice based in **Pune, Maharashtra, India**.

---

## Brand Identity & Aesthetic Direction

- **Brand:** Manvvi Design Studio
- **Location:** Pune, Maharashtra, India
- **Core Philosophy:** *"Interiors built around how you actually live."* / *"Spaces that feel considered, not decorated."*
- **Aesthetic:** High-contrast editorial minimalism, architectural restraint, tactile natural materials (travertine, raw basalt, smoked oak, brushed champagne brass), and tranquil spatial choreography.
- **Color Palette:**
  - Dark Surface / Primary: `#11110F` (Refined near-black / warm charcoal)
  - Light Surface / Ivory: `#F5F2EC` (Warm alabaster & limestone)
  - Accent Gold: `#C8A97E` / `#E0C7A2` (Muted champagne bronze)
  - Secondary Text: `#8E8A82` (Muted taupe / stone)
- **Typography:**
  - Headings: *Cormorant Garamond* (Editorial high-contrast serif)
  - Body & UI: *Plus Jakarta Sans* (Clean architectural sans-serif)

---

## Tech Stack

- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS (v4) with custom luxury tokens and glassmorphism
- **Routing:** React Router v7 with full SPA code-splitting
- **Smooth Scrolling:** Lenis smooth scroll engine integrated with GSAP ticker
- **Animations:** Framer Motion (staggered editorial line reveals, page transitions) & GSAP
- **3D Graphics:** React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`), and Three.js with automatic WebGL detection & low-power mobile fallbacks
- **Backend & Auth:** Supabase Database (PostgreSQL), Supabase Auth, and Supabase Storage
- **Icons:** Lucide React

---

## Public Website Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | **Home** | Fullscreen editorial hero with 3D monolith, Studio Intro, Selected Works grid, Philosophy, Services highlights, Process matrix, Featured project spotlight, Testimonials, Visual Journal, and Contact CTA. |
| `/about` | **About the Studio** | Studio profile, founder story (*Manvvi Sharma*), design values, and editable key statistics. |
| `/services` | **Services & Scope** | In-depth breakdown of 8 core disciplines: Residential, Luxury Villas, Apartments, Commercial, Hospitality, Space Planning, Furniture & Styling, and Turnkey Delivery. |
| `/process` | **Our Process** | Interactive 6-stage architectural timeline (01 Discover, 02 Concept, 03 Design, 04 Detail, 05 Build, 06 Reveal) with synchronized imagery and deliverables. |
| `/portfolio` | **Portfolio Index** | Filterable masonry/editorial project gallery (All, Residential, Commercial, Hospitality). |
| `/portfolio/:slug` | **Project Case Study** | Hero banner, spatial thesis, material composition, technical specs, interactive Before/After comparison slider, and high-res gallery. |
| `/contact` | **Contact & Inquiries** | Editorial inquiry brief form (direct database submission to Supabase) and atelier coordinates in Pune. |

---

## Admin CMS & Management Portal

The administrative dashboard features a clean, high-efficiency, light-neutral interface completely distinct from the dark public aesthetic.

| Route | Feature | Capability |
| :--- | :--- | :--- |
| `/admin/login` | **Authentication** | Secure Supabase Auth login + Instant 1-Click Demo Login mode. |
| `/admin` | **Overview** | Real-time statistics: Total Projects, Published Status, Inquiries Count, and Recent Leads. |
| `/admin/hero` | **Hero CMS** | Live editor for headline, eyebrow, subheadline, CTAs, and cover image upload with preview. |
| `/admin/studio` | **Studio CMS** | Update philosophy statement, founder story, quotes, portrait, and dynamic metric cards. |
| `/admin/projects` | **Projects Manager** | Search, filter, feature on homepage, toggle publish/draft, and delete projects. |
| `/admin/projects/new` | **Project Creator** | Create new case studies with multi-image gallery upload, materials chips, and specs. |
| `/admin/projects/:id` | **Project Editor** | Edit existing project data and reorder images. |
| `/admin/services` | **Services Manager** | Manage service offerings, descriptions, and deliverables. |
| `/admin/process` | **Process CMS** | Configure each of the 6 timeline phases. |
| `/admin/testimonials` | **Testimonials CMS**| Add, edit, or remove client feedback and avatars. |
| `/admin/gallery` | **Visual Journal CMS**| Upload, categorize, and caption tactile detail images. |
| `/admin/messages` | **Inquiries CRM** | Track incoming client leads with status pipeline (`New`, `Contacted`, `In Progress`, `Completed`). |
| `/admin/settings` | **Site Settings** | Manage atelier address, phone, email, hours, and SEO metadata. |

---

## Supabase Database & Storage Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** > **New query**.
3. Open `supabase/schema.sql` from this repository, paste the contents, and click **Run**.
4. The script automatically creates:
   - All 9 application tables (`site_settings`, `hero_content`, `studio_content`, `projects`, `services`, `process_steps`, `testimonials`, `gallery`, `contact_messages`)
   - Strict Row Level Security (RLS) policies (public reads for published items; authenticated full access; public submission for contact inquiries)
   - 5 dedicated Storage buckets (`hero-images`, `project-images`, `service-images`, `gallery-images`, `testimonial-images`) with public read and authenticated write access
   - Complete starter seed content
5. Copy your **Project URL** and **Anon Public Key** from **Project Settings** > **API**.

---

## Environment Variables

Create a `.env` file in the root directory:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
VITE_ENABLE_DEMO_ADMIN=true
```

> **Resilient Architecture Note:** If Supabase credentials are not provided or if testing offline, the application automatically activates **Dual-Mode Persistence**:
> - All public pages render rich, high-end editorial fallback data.
> - All Admin CMS modifications seamlessly persist in browser storage.
> - As soon as live Supabase credentials are set, the app switches to real-time database tables and Supabase Storage buckets.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Default Admin Credentials

- **Email:** `admin@manvvi.com`
- **Password:** `manvvi2026`
- **Or:** Click the **"One-Click Demo Admin Login"** button on the `/admin/login` page for instant preview.
