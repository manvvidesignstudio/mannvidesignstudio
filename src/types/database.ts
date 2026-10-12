export interface Project {
  id: string;
  title: string;
  slug: string;
  location: string;
  year: string;
  category: 'Residential' | 'Commercial' | 'Hospitality';
  short_description: string;
  description: string;
  concept?: string;
  material_palette?: string[];
  cover_image: string;
  gallery_images?: string[];
  before_image?: string;
  after_image?: string;
  project_specs?: {
    area?: string;
    scope?: string;
    timeline?: string;
    client?: string;
  };
  featured: boolean;
  published: boolean;
  display_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface HeroContent {
  id?: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
  background_image_url: string;
  updated_at?: string;
}

export interface StudioStat {
  value: string;
  label: string;
  sub?: string;
}

export interface StudioContent {
  id?: string;
  intro_eyebrow: string;
  intro_heading: string;
  intro_body: string;
  story_heading: string;
  story_text: string;
  founder_name: string;
  founder_title: string;
  founder_quote: string;
  founder_image_url: string;
  second_founder_name?: string;
  second_founder_title?: string;
  second_founder_quote?: string;
  second_founder_image_url?: string;
  stats: StudioStat[];
  updated_at?: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  tagline?: string;
  description: string;
  deliverables?: string[];
  process_summary?: string;
  image_url: string;
  icon?: string;
  display_order: number;
  published: boolean;
  created_at?: string;
}

export interface ProcessStep {
  id: string;
  step_number: number;
  step_code: string; // '01', '02', '03', '04', '05', '06'
  title: string;
  subtitle?: string;
  description: string;
  deliverables?: string[];
  image_url: string;
  display_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role?: string;
  project_title?: string;
  testimonial: string;
  image_url?: string;
  published: boolean;
  display_order: number;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  caption?: string;
  display_order: number;
  published: boolean;
  created_at?: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  location: string;
  budget?: string;
  message: string;
  status: InquiryStatus;
  admin_notes?: string;
  created_at: string;
  updated_at?: string;
}

export interface SiteSettings {
  id?: string;
  studio_name: string;
  tagline: string;
  city: string;
  state: string;
  country: string;
  address: string;
  email: string;
  phone: string;
  instagram: string;
  linkedin?: string;
  pinterest?: string;
  whatsapp_number: string;
  whatsapp_default_message: string;
  google_maps_url: string;
  google_maps_embed_url: string;
  footer_description?: string;
  working_hours?: string;
  meta_title?: string;
  meta_description?: string;
  updated_at?: string;
}
