import { supabase, isSupabaseConfigured } from './supabase';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);

export async function uploadImageToStorage(file: File, bucketName: string): Promise<string> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new Error('Only JPEG, PNG, WebP, and AVIF images are allowed.');
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error('Images must be 10 MB or smaller.');
  }

  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured. Images cannot be uploaded.');
  }

  const fileExt = file.type.split('/')[1] === 'jpeg' ? 'jpg' : file.type.split('/')[1];
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('Storage upload error:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}
