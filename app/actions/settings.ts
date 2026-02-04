'use server';

import { createClient } from '@/app/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function uploadProfilePhoto(formData: FormData) {
  const supabase = createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  const file = formData.get('file') as File;
  if (!file) {
    return { error: 'No file provided' };
  }

  // 1. Upload to Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `profile-photo-${Date.now()}.${fileExt}`;
  const filePath = `settings/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('gallery') // Using existing public bucket
    .upload(filePath, file);

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  // 2. Get Public URL
  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(filePath);

  // 3. Update Site Settings (upsert)
  const { error: dbError } = await supabase
    .from('site_settings')
    .upsert(
      { 
        key: 'profile_photo', 
        value: { url: publicUrl, storage_path: filePath },
        updated_at: new Date().toISOString()
      },
      { onConflict: 'key' }
    );

  if (dbError) {
    return { error: `Database error: ${dbError.message}` };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // Update home page
  return { success: true, url: publicUrl };
}

export async function getProfilePhoto() {
  const supabase = createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'profile_photo')
    .single();

  if (!data || !data.value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.value as any).url as string;
}
