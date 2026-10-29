-- ==============================================================================
-- MANVVI DESIGN STUDIO — COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Instructions:
-- 1. In Supabase Dashboard -> SQL Editor -> New Query
-- 2. Paste this entire file and run it.
-- 3. Everything (tables, RLS policies, storage buckets, starter content) will be ready.
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Only users with app_metadata.role = 'admin' may edit CMS data.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke execute on function public.is_admin() from public;
grant execute on function public.is_admin() to anon;
grant execute on function public.is_admin() to authenticated;

-- ------------------------------------------------------------------------------
-- 1. SITE SETTINGS
-- ------------------------------------------------------------------------------
create table if not exists site_settings (
  id uuid primary key default uuid_generate_v4(),
  studio_name text not null default 'Manvvi Design Studio',
  tagline text not null default 'Interior Architecture & Design Studio',
  city text not null default 'Pune',
  state text not null default 'Maharashtra',
  country text not null default 'India',
  address text not null default 'Koregaon Park & Kalyani Nagar, Pune, Maharashtra 411006',
  email text not null default 'hello@manvvistudio.com',
  phone text not null default '+91 98230 45678',
  instagram text not null default 'https://instagram.com/manvvidesignstudio',
  linkedin text default 'https://linkedin.com/company/manvvi-design-studio',
  pinterest text default 'https://pinterest.com',
  whatsapp_number text not null default '918793616240',
  whatsapp_default_message text not null default 'Hello Manvvi Design Studio, I would like to inquire about a project.',
  google_maps_url text not null default 'https://maps.google.com/?q=Manvvi+Design+Studio',
  google_maps_embed_url text not null default 'https://www.google.com/maps?q=Manvvi+Design+Studio&output=embed',
  footer_description text default 'A full-scale residential and commercial interior design studio.',
  privacy_policy text,
  terms_of_service text,
  working_hours text default 'Monday – Saturday: 10:00 AM – 7:00 PM IST',
  meta_title text default 'Manvvi Design Studio | Interior Architecture & Design Studio in Pune',
  meta_description text default 'A Pune-based design studio shaping homes and workspaces with restraint, craft, and an architectural point of view.',
  updated_at timestamptz not null default now()
);

alter table site_settings add column if not exists pinterest text default 'https://pinterest.com';
alter table site_settings add column if not exists whatsapp_number text not null default '918793616240';
alter table site_settings add column if not exists whatsapp_default_message text not null default 'Hello Manvvi Design Studio, I would like to inquire about a project.';
alter table site_settings add column if not exists google_maps_url text not null default 'https://maps.google.com/?q=Manvvi+Design+Studio';
alter table site_settings add column if not exists google_maps_embed_url text not null default 'https://www.google.com/maps?q=Manvvi+Design+Studio&output=embed';
alter table site_settings add column if not exists footer_description text default 'A full-scale residential and commercial interior design studio.';
alter table site_settings add column if not exists privacy_policy text;
alter table site_settings add column if not exists terms_of_service text;

alter table site_settings enable row level security;
drop policy if exists "Public read site_settings" on site_settings;
drop policy if exists "Authenticated full access site_settings" on site_settings;
create policy "Public read site_settings" on site_settings for select using (true);
create policy "Admin full access site_settings" on site_settings for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 2. HERO CONTENT
-- ------------------------------------------------------------------------------
create table if not exists hero_content (
  id uuid primary key default uuid_generate_v4(),
  eyebrow text not null default 'MANVVI DESIGN STUDIO',
  headline text not null default 'Interiors built around how you actually live.',
  subheadline text not null default 'A Pune-based design studio shaping homes and workspaces with restraint, craft, and a point of view.',
  primary_cta_text text not null default 'View the portfolio ↗',
  primary_cta_link text not null default '/portfolio',
  secondary_cta_text text not null default 'Start a conversation',
  secondary_cta_link text not null default '/contact',
  background_image_url text not null default 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=2400&auto=format&fit=crop',
  updated_at timestamptz not null default now()
);

alter table hero_content enable row level security;
drop policy if exists "Public read hero_content" on hero_content;
drop policy if exists "Authenticated full access hero_content" on hero_content;
create policy "Public read hero_content" on hero_content for select using (true);
create policy "Admin full access hero_content" on hero_content for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 3. STUDIO PROFILE & PHILOSOPHY
-- ------------------------------------------------------------------------------
create table if not exists studio_content (
  id uuid primary key default uuid_generate_v4(),
  intro_eyebrow text not null default 'OUR APPROACH',
  intro_heading text not null default 'Spaces that feel considered, not decorated.',
  intro_body text not null default 'At Manvvi Design Studio, we believe interiors should respond to the people who inhabit them. Our work brings together architecture, material, light and everyday rituals to create spaces that feel timeless and deeply personal.',
  approach_image_one_url text default 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop',
  approach_image_two_url text default 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
  story_heading text not null default 'Rooted in Pune, Crafted for Living',
  story_text text not null default 'Founded in Pune, Manvvi Design Studio approaches every residence and commercial space with quiet discipline. We avoid the temporary allure of transient trends in favor of enduring proportion, natural stone, sculpted timber, and ambient light that moves gracefully through the room.',
  founder_name text not null default 'Manvvi Sharma',
  founder_title text not null default 'Principal Architect & Design Director',
  founder_quote text not null default 'Great interior architecture does not seek to shout; it provides a serene, tactile sanctuary where life naturally unfolds.',
  founder_image_url text not null default 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop',
  second_founder_name text,
  second_founder_title text,
  second_founder_quote text,
  second_founder_image_url text,
  stats jsonb not null default '[
    {"value": "15+", "label": "Selected Projects", "sub": "Completed across Western India"},
    {"value": "8+", "label": "Cities", "sub": "Pune, Mumbai, Goa, Bengaluru & beyond"},
    {"value": "6+", "label": "Years Experience", "sub": "Specialized luxury architectural practice"},
    {"value": "100%", "label": "Personalized Design", "sub": "Bespoke millwork, stone & spatial curation"}
  ]'::jsonb,
  recognitions jsonb not null default '[
    {"title": "Recognition placeholder", "issuer": "Replace with a verified award or certification", "year": "20XX", "description": "Update this entry in the Studio CMS before publishing."}
  ]'::jsonb,
  clients jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table studio_content add column if not exists recognitions jsonb not null default '[]'::jsonb;
alter table studio_content add column if not exists clients jsonb not null default '[]'::jsonb;
alter table studio_content add column if not exists second_founder_name text;
alter table studio_content add column if not exists second_founder_title text;
alter table studio_content add column if not exists second_founder_quote text;
alter table studio_content add column if not exists second_founder_image_url text;
alter table studio_content add column if not exists approach_image_one_url text default 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop';
alter table studio_content add column if not exists approach_image_two_url text default 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop';

alter table studio_content enable row level security;
drop policy if exists "Public read studio_content" on studio_content;
drop policy if exists "Authenticated full access studio_content" on studio_content;
create policy "Public read studio_content" on studio_content for select using (true);
create policy "Admin full access studio_content" on studio_content for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 4. PROJECTS (PORTFOLIO)
-- ------------------------------------------------------------------------------
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  location text not null default 'Pune, Maharashtra',
  year text not null default '2026',
  category text not null default 'Residential', -- Residential, Commercial, Hospitality
  short_description text not null,
  description text not null,
  concept text,
  material_palette jsonb default '["Italian Travertine", "Smoked Oak", "Brushed Brass", "Fluted Glass", "Lime Plaster"]'::jsonb,
  cover_image text not null,
  gallery_images jsonb default '[]'::jsonb,
  before_image text,
  after_image text,
  project_specs jsonb default '{"area": "4,200 sq.ft", "scope": "Complete Interior Architecture", "timeline": "14 Months"}'::jsonb,
  featured boolean not null default false,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table projects enable row level security;
drop policy if exists "Public read published projects" on projects;
drop policy if exists "Authenticated full access projects" on projects;
create policy "Public read published projects" on projects for select using (published = true or public.is_admin());
create policy "Admin full access projects" on projects for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 5. SERVICES
-- ------------------------------------------------------------------------------
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text unique not null,
  tagline text,
  description text not null,
  deliverables jsonb default '[]'::jsonb,
  process_summary text,
  image_url text not null,
  icon text default 'Compass',
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table services enable row level security;
drop policy if exists "Public read published services" on services;
drop policy if exists "Authenticated full access services" on services;
create policy "Public read published services" on services for select using (published = true or public.is_admin());
create policy "Admin full access services" on services for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 6. PROCESS STEPS (01 Discover to 06 Reveal)
-- ------------------------------------------------------------------------------
create table if not exists process_steps (
  id uuid primary key default uuid_generate_v4(),
  step_number integer unique not null,
  step_code text not null, -- '01', '02', '03', '04', '05', '06'
  title text not null,
  subtitle text,
  description text not null,
  deliverables jsonb default '[]'::jsonb,
  image_url text not null,
  display_order integer not null default 0
);

alter table process_steps enable row level security;
drop policy if exists "Public read process_steps" on process_steps;
drop policy if exists "Authenticated full access process_steps" on process_steps;
create policy "Public read process_steps" on process_steps for select using (true);
create policy "Admin full access process_steps" on process_steps for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 7. TESTIMONIALS
-- ------------------------------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_role text,
  project_title text,
  testimonial text not null,
  image_url text,
  published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Keep existing installations compatible with client portrait support.
alter table testimonials add column if not exists image_url text;

alter table testimonials enable row level security;
drop policy if exists "Public read published testimonials" on testimonials;
drop policy if exists "Authenticated full access testimonials" on testimonials;
create policy "Public read published testimonials" on testimonials for select using (published = true or public.is_admin());
create policy "Admin full access testimonials" on testimonials for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 8. VISUAL GALLERY (INSTAGRAM / EDITORIAL JOURNAL)
-- ------------------------------------------------------------------------------
create table if not exists gallery (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  image_url text not null,
  category text default 'Detail',
  caption text,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table gallery enable row level security;
drop policy if exists "Public read published gallery" on gallery;
drop policy if exists "Authenticated full access gallery" on gallery;
create policy "Public read published gallery" on gallery for select using (published = true or public.is_admin());
create policy "Admin full access gallery" on gallery for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 9. CONTACT INQUIRIES
-- ------------------------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  project_type text not null default 'Residential',
  location text not null,
  budget text,
  message text not null,
  status text not null default 'New', -- 'New', 'Contacted', 'In Progress', 'Completed'
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_messages_name_length check (char_length(name) between 2 and 100),
  constraint contact_messages_email_length check (char_length(email) between 3 and 320),
  constraint contact_messages_message_length check (char_length(message) between 10 and 5000),
  constraint contact_messages_status check (status in ('New', 'Contacted', 'In Progress', 'Completed'))
);

alter table contact_messages enable row level security;
-- Anyone (public client) can submit an inquiry
drop policy if exists "Anyone can insert inquiries" on contact_messages;
drop policy if exists "Authenticated full access inquiries" on contact_messages;
create policy "Anyone can insert inquiries" on contact_messages for insert
  with check (
    char_length(name) between 2 and 100
    and char_length(email) between 3 and 320
    and char_length(message) between 10 and 5000
  );
-- Only an authorized admin can view, edit, or delete inquiries
create policy "Admin full access inquiries" on contact_messages for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 10. STORAGE BUCKETS SETUP & POLICIES
-- ------------------------------------------------------------------------------
insert into storage.buckets (id, name, public) values 
  ('hero-images', 'hero-images', true),
  ('project-images', 'project-images', true),
  ('service-images', 'service-images', true),
  ('gallery-images', 'gallery-images', true),
  ('testimonial-images', 'testimonial-images', true)
on conflict (id) do nothing;

drop policy if exists "Public view hero-images" on storage.objects;
drop policy if exists "Public view project-images" on storage.objects;
drop policy if exists "Public view service-images" on storage.objects;
drop policy if exists "Public view gallery-images" on storage.objects;
drop policy if exists "Public view testimonial-images" on storage.objects;
create policy "Public view hero-images" on storage.objects for select using (bucket_id = 'hero-images');
create policy "Public view project-images" on storage.objects for select using (bucket_id = 'project-images');
create policy "Public view service-images" on storage.objects for select using (bucket_id = 'service-images');
create policy "Public view gallery-images" on storage.objects for select using (bucket_id = 'gallery-images');
create policy "Public view testimonial-images" on storage.objects for select using (bucket_id = 'testimonial-images');

drop policy if exists "Authenticated insert hero-images" on storage.objects;
drop policy if exists "Authenticated insert project-images" on storage.objects;
drop policy if exists "Authenticated insert service-images" on storage.objects;
drop policy if exists "Authenticated insert gallery-images" on storage.objects;
drop policy if exists "Authenticated insert testimonial-images" on storage.objects;
drop policy if exists "Authenticated update/delete storage" on storage.objects;
drop policy if exists "Admin insert hero-images" on storage.objects;
drop policy if exists "Admin insert project-images" on storage.objects;
drop policy if exists "Admin insert service-images" on storage.objects;
drop policy if exists "Admin insert gallery-images" on storage.objects;
drop policy if exists "Admin insert testimonial-images" on storage.objects;
drop policy if exists "Admin update/delete storage" on storage.objects;

create policy "Admin insert hero-images" on storage.objects for insert with check (
  bucket_id = 'hero-images' and public.is_admin()
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);
create policy "Admin insert project-images" on storage.objects for insert with check (
  bucket_id = 'project-images' and public.is_admin()
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);
create policy "Admin insert service-images" on storage.objects for insert with check (
  bucket_id = 'service-images' and public.is_admin()
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);
create policy "Admin insert gallery-images" on storage.objects for insert with check (
  bucket_id = 'gallery-images' and public.is_admin()
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);
create policy "Admin insert testimonial-images" on storage.objects for insert with check (
  bucket_id = 'testimonial-images' and public.is_admin()
  and lower(storage.extension(name)) in ('jpg', 'jpeg', 'png', 'webp', 'avif')
);
create policy "Admin update/delete storage" on storage.objects for all using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------------------------
-- 11. SEED DEFAULT STARTER CONTENT
-- ------------------------------------------------------------------------------

-- Default Site Settings
insert into site_settings (id, studio_name, tagline, city, state, country, address, email, phone)
values (
  '00000000-0000-0000-0000-000000000001',
  'Manvvi Design Studio',
  'Interior Architecture & Design Studio',
  'Pune',
  'Maharashtra',
  'India',
  'Level 4, North Main Road, Koregaon Park, Pune 411001',
  'hello@manvvistudio.com',
  '+91 98230 45678'
) on conflict (id) do nothing;

-- Default Hero Content
insert into hero_content (id, eyebrow, headline, subheadline, primary_cta_text, primary_cta_link, background_image_url)
values (
  '00000000-0000-0000-0000-000000000002',
  'MANVVI DESIGN STUDIO',
  'Interiors built around how you actually live.',
  'A Pune-based design studio shaping homes and workspaces with restraint, craft, and a point of view.',
  'View the portfolio ↗',
  '/portfolio',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=85&w=2400&auto=format&fit=crop'
) on conflict (id) do nothing;

-- Default Studio Content
insert into studio_content (id, intro_eyebrow, intro_heading, intro_body)
values (
  '00000000-0000-0000-0000-000000000003',
  'OUR APPROACH',
  'Spaces that feel considered, not decorated.',
  'At Manvvi Design Studio, we believe interiors should respond to the people who inhabit them. Our work brings together architecture, material, light and everyday rituals to create spaces that feel timeless and deeply personal.'
) on conflict (id) do nothing;

-- Default Process Steps
insert into process_steps (step_number, step_code, title, subtitle, description, deliverables, image_url, display_order)
values
(
  1, '01', 'Discover', 'Immersion & Spatial Audit',
  'We begin with deep architectural observation. We study the site light path, spatial orientation, structural lines, and the client daily rituals before a single sketch is drawn.',
  '["Site & daylight analysis", "Lifestyle & ritual briefing", "Budget & timeline alignment", "Spatial feasibility report"]'::jsonb,
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop', 1
),
(
  2, '02', 'Concept', 'Atmospheric Direction & Spatial Planning',
  'We formulate the core architectural thesis. Mood studies, material tactility boards, and volumetric zoning proposals establish the emotional and physical rhythm of the space.',
  '["Concept narrative & mood boards", "Volumetric space planning", "Preliminary material palette", "Initial spatial sketches"]'::jsonb,
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop', 2
),
(
  3, '03', 'Design', '3D Architectural Visualization & Detailing',
  'Plans evolve into high-fidelity 3D renderings and comprehensive architectural sets. Every junction, millwork detail, lighting beam angle, and ceiling transition is rigorously mapped.',
  '["Photorealistic 3D visualization", "Detailed CAD floor plans & elevations", "Lighting and electrical layout", "Custom millwork design"]'::jsonb,
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop', 3
),
(
  4, '04', 'Detail', 'Material Sourcing & Specification',
  'We physically hand-select stones, timber slabs, natural plasters, woven textiles, and architectural hardware alongside artisans and quarry specialists.',
  '["Physical material swatches & boards", "Hardware & sanitary schedules", "Artisan joinery specifications", "Contractor bid packages"]'::jsonb,
  'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop', 4
),
(
  5, '05', 'Build', 'Rigorous Site Execution & Project Management',
  'Our dedicated team maintains daily on-site quality control. We coordinate specialized trades, verify millwork fabrication, and resolve site nuances with uncompromising precision.',
  '["Weekly site supervision & audits", "Quality control milestones", "Vendor coordination & schedule tracking", "Structural coordination"]'::jsonb,
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop', 5
),
(
  6, '06', 'Reveal', 'Curation, Art Styling & Turnkey Handover',
  'The final layer transforms the architecture into a living home. We curate bespoke art, hand-loomed rugs, sculptural lighting, books, and botanicals before presenting the finished residence.',
  '["Art & object curation", "White-glove deep cleaning & staging", "Comprehensive maintenance manual", "Defect liability walkthrough"]'::jsonb,
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop', 6
)
on conflict (step_number) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  description = excluded.description,
  deliverables = excluded.deliverables,
  image_url = excluded.image_url;
