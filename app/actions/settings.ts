'use server';

import { createClient } from '@/app/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { fileUploadSchema } from '@/app/lib/validation';

export async function uploadProfilePhoto(formData: FormData) {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  // RBAC check
  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    return { error: 'Unauthorized: insufficient permissions' };
  }

  const file = formData.get('file') as File;
  if (!file) {
    return { error: 'No file provided' };
  }

  // Validation
  const validationResult = fileUploadSchema.safeParse({ file });
  if (!validationResult.success) {
    return { error: validationResult.error.issues[0].message };
  }

  // 1. Upload to Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `profile-photo-${Date.now()}.${fileExt}`;
  const filePath = `settings/${fileName}`;

  // Get current photo to delete later if exists
  const { data: currentPhoto } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'profile_photo')
    .single();

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return { error: 'Upload failed. Please try again.' };
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
      } as any,
      { onConflict: 'key' }
    );

  if (dbError) {
    // Try to cleanup uploaded file if db update fails
    await supabase.storage.from('gallery').remove([filePath]);
    return { error: `Database error: ${dbError.message}` };
  }

  // 4. Delete old photo if exists
  if (currentPhoto && (currentPhoto as any).value && ((currentPhoto as any).value as any).storage_path) {
    const oldPath = ((currentPhoto as any).value as any).storage_path;
    await supabase.storage.from('gallery').remove([oldPath]);
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // Update home page
  return { success: true, url: publicUrl };
}

export async function deleteProfilePhoto() {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }

  // RBAC check
  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    return { error: 'Unauthorized: insufficient permissions' };
  }

  const { data: currentPhoto } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'profile_photo')
    .single();

  if (!currentPhoto || !(currentPhoto as any).value) {
    return { error: 'No profile photo found' };
  }

  const storagePath = ((currentPhoto as any).value as any)?.storage_path;

  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from('gallery')
      .remove([storagePath]);

    if (storageError) {
      console.error('Failed to delete file from storage:', storageError);
    }
  }

  const { error: dbError } = await supabase
    .from('site_settings')
    .delete()
    .eq('key', 'profile_photo');

  if (dbError) {
    return { error: `Database error: ${dbError.message}` };
  }

  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  return { success: true };
}

export async function getProfilePhoto() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'profile_photo')
    .single();

  if (!data || !(data as any).value) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ((data as any).value as any).url as string;
}
