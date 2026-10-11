import { supabase, isSupabaseConfigured } from './supabase';
import {
  HeroContent,
  StudioContent,
  Project,
  Service,
  ProcessStep,
  Testimonial,
  GalleryItem,
  SiteSettings,
  ContactMessage,
} from '../types/database';

function requireSupabase(): void {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Content cannot be loaded.');
  }
}

async function readMany<T>(table: string, orderColumn = 'display_order'): Promise<T[]> {
  requireSupabase();
  const { data, error } = await supabase.from(table).select('*').order(orderColumn, { ascending: true });
  if (error) throw error;
  return (data ?? []) as T[];
}

async function readSingle<T>(table: string): Promise<T> {
  requireSupabase();
  const { data, error } = await supabase.from(table).select('*').limit(1).single();
  if (error) throw error;
  return data as T;
}

async function updateById<T>(table: string, id: string, value: Partial<T>): Promise<T> {
  requireSupabase();
  const { data, error } = await supabase
    .from(table)
    .update(value as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as T;
}

async function insert<T>(table: string, value: Partial<T>): Promise<T> {
  requireSupabase();
  const { data, error } = await supabase
    .from(table)
    .insert([value as Record<string, unknown>])
    .select()
    .single();
  if (error) throw error;
  return data as T;
}

async function remove(table: string, id: string): Promise<void> {
  requireSupabase();
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

export const getHeroContent = (): Promise<HeroContent> => readSingle<HeroContent>('hero_content');

export async function updateHeroContent(content: Partial<HeroContent>): Promise<HeroContent> {
  const current = await getHeroContent();
  return updateById('hero_content', current.id!, {
    ...content,
    updated_at: new Date().toISOString(),
  });
}

export const getStudioContent = (): Promise<StudioContent> =>
  readSingle<StudioContent>('studio_content');

export async function updateStudioContent(content: Partial<StudioContent>): Promise<StudioContent> {
  const current = await getStudioContent();
  return updateById('studio_content', current.id!, {
    ...content,
    updated_at: new Date().toISOString(),
  });
}

export const getProjects = (): Promise<Project[]> => readMany<Project>('projects');

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  requireSupabase();
  const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).maybeSingle();
  if (error) throw error;
  return data as Project | null;
}

export async function saveProject(project: Partial<Project> & { id?: string }): Promise<Project> {
  const { id, ...values } = project;
  if (id) {
    return updateById<Project>('projects', id, {
      ...values,
      updated_at: new Date().toISOString(),
    });
  }
  return insert<Project>('projects', {
    ...values,
    published: project.published ?? true,
    featured: project.featured ?? false,
  });
}

export const deleteProject = (id: string): Promise<void> => remove('projects', id);

export const getServices = (): Promise<Service[]> => readMany<Service>('services');

export async function saveService(service: Partial<Service> & { id?: string }): Promise<Service> {
  const { id, ...values } = service;
  if (id) return updateById<Service>('services', id, values);
  return insert<Service>('services', {
    ...values,
    published: service.published ?? true,
  });
}

export const deleteService = (id: string): Promise<void> => remove('services', id);

export const getProcessSteps = (): Promise<ProcessStep[]> => readMany<ProcessStep>('process_steps');

export async function saveProcessStep(
  step: Partial<ProcessStep> & { id: string },
): Promise<ProcessStep> {
  return updateById<ProcessStep>('process_steps', step.id, step);
}

export const getTestimonials = (): Promise<Testimonial[]> =>
  readMany<Testimonial>('testimonials');

export async function saveTestimonial(
  testimonial: Partial<Testimonial> & { id?: string },
): Promise<Testimonial> {
  const { id, ...values } = testimonial;
  if (id) return updateById<Testimonial>('testimonials', id, values);
  return insert<Testimonial>('testimonials', {
    ...values,
    published: testimonial.published ?? true,
  });
}

export const deleteTestimonial = (id: string): Promise<void> => remove('testimonials', id);

export const getGallery = (): Promise<GalleryItem[]> => readMany<GalleryItem>('gallery');

export async function saveGalleryItem(
  item: Partial<GalleryItem> & { id?: string },
): Promise<GalleryItem> {
  const { id, ...values } = item;
  if (id) return updateById<GalleryItem>('gallery', id, values);
  return insert<GalleryItem>('gallery', {
    ...values,
    published: item.published ?? true,
  });
}

export const deleteGalleryItem = (id: string): Promise<void> => remove('gallery', id);

export async function getContactMessages(): Promise<ContactMessage[]> {
  requireSupabase();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ContactMessage[];
}

export async function submitContactMessage(
  msg: Omit<ContactMessage, 'id' | 'status' | 'created_at'>,
): Promise<ContactMessage> {
  return insert<ContactMessage>('contact_messages', {
    ...msg,
    status: 'New',
  });
}

export async function updateMessageStatus(
  id: string,
  status: ContactMessage['status'],
  admin_notes?: string,
): Promise<void> {
  await updateById<ContactMessage>('contact_messages', id, {
    status,
    admin_notes,
    updated_at: new Date().toISOString(),
  });
}

export const deleteContactMessage = (id: string): Promise<void> =>
  remove('contact_messages', id);

export const getSiteSettings = (): Promise<SiteSettings> =>
  readSingle<SiteSettings>('site_settings');

export async function updateSiteSettings(
  settings: Partial<SiteSettings>,
): Promise<SiteSettings> {
  const current = await getSiteSettings();
  return updateById('site_settings', current.id!, {
    ...settings,
    updated_at: new Date().toISOString(),
  });
}
