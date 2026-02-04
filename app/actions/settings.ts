'use server';

import { createClient } from '@/app/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { fileUploadSchema } from '@/app/lib/validation';
import { validateMagicBytes, logAction, checkRateLimit } from '@/app/lib/security';
import { ActionResult, success, failure } from '@/app/lib/actions';

export async function uploadHeroImage(formData: FormData): Promise<ActionResult<{ url: string }>> {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return failure('Unauthorized');
  }

  // RBAC check
  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    return failure('Unauthorized: insufficient permissions');
  }

  // Rate Limit Check
  const isWithinLimit = await checkRateLimit(user.id, 5, 1);
  if (!isWithinLimit) {
    return failure('Rate limit exceeded. Please wait a minute.');
  }

  const file = formData.get('file') as File;
  if (!file) {
    return failure('No file provided');
  }

  // Validation
  const validationResult = fileUploadSchema.safeParse({ file });
  if (!validationResult.success) {
    return failure(validationResult.error.issues[0].message);
  }

  // Magic Bytes Validation
  const isValidImage = await validateMagicBytes(file);
  if (!isValidImage) {
    return failure('Invalid file content: not a real image');
  }

  // 1. Upload to Storage
  const fileExt = file.name.split('.').pop();
  const fileName = `hero-image-${Date.now()}.${fileExt}`;
  const filePath = `settings/${fileName}`;

  // Get current photo to delete later if exists
  const { data: currentPhoto } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'hero_image')
    .single();

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, file);

  if (uploadError) {
    console.error('Upload error:', uploadError);
    return failure('Upload failed. Please try again.');
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
        key: 'hero_image',
        value: { url: publicUrl, storage_path: filePath },
        updated_at: new Date().toISOString()
      } as any,
      { onConflict: 'key' }
    );

  if (dbError) {
    // Try to cleanup uploaded file if db update fails
    await supabase.storage.from('gallery').remove([filePath]);
    return failure(`Database error: ${dbError.message}`);
  }

  // 4. Delete old photo if exists
  if (currentPhoto && (currentPhoto as any).value && ((currentPhoto as any).value as any).storage_path) {
    const oldPath = ((currentPhoto as any).value as any).storage_path;
    await supabase.storage.from('gallery').remove([oldPath]);
  }

  // Audit Log
  await logAction({
    action: 'UPLOAD_HERO_IMAGE',
    entityType: 'settings',
    entityId: 'hero_image',
    details: { url: publicUrl }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // Update home page
  return success({ url: publicUrl });
}

export async function deleteHeroImage(): Promise<ActionResult> {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return failure('Unauthorized');
  }

  // RBAC check
  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    return failure('Unauthorized: insufficient permissions');
  }

  const { data: currentPhoto } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'hero_image')
    .single();

  if (!currentPhoto || !(currentPhoto as any).value) {
    return failure('No hero image found');
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
    .eq('key', 'hero_image');

  if (dbError) {
    return failure(`Database error: ${dbError.message}`);
  }

  // Audit Log
  await logAction({
    action: 'DELETE_HERO_IMAGE',
    entityType: 'settings',
    entityId: 'hero_image',
    details: { storagePath }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  return success();
}

export async function getHeroImage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'hero_image')
    .single();

  if (!data || !(data as any).value) return null;
  return ((data as any).value as any).url as string;
}

export async function uploadProfilePhoto(formData: FormData): Promise<ActionResult<{ url: string }>> {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return failure('Unauthorized');
  }

  // RBAC check
  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    return failure('Unauthorized: insufficient permissions');
  }

  // Rate Limit Check (e.g., 3 profile photo changes per minute)
  const isWithinLimit = await checkRateLimit(user.id, 3, 1);
  if (!isWithinLimit) {
    return failure('Rate limit exceeded. Please wait a minute.');
  }

  const file = formData.get('file') as File;
  if (!file) {
    return failure('No file provided');
  }

  // Validation
  const validationResult = fileUploadSchema.safeParse({ file });
  if (!validationResult.success) {
    return failure(validationResult.error.issues[0].message);
  }

  // Magic Bytes Validation
  const isValidImage = await validateMagicBytes(file);
  if (!isValidImage) {
    return failure('Invalid file content: not a real image');
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
    return failure('Upload failed. Please try again.');
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
    return failure(`Database error: ${dbError.message}`);
  }

  // 4. Delete old photo if exists
  if (currentPhoto && (currentPhoto as any).value && ((currentPhoto as any).value as any).storage_path) {
    const oldPath = ((currentPhoto as any).value as any).storage_path;
    await supabase.storage.from('gallery').remove([oldPath]);
  }

  // Audit Log
  await logAction({
    action: 'UPLOAD_PROFILE_PHOTO',
    entityType: 'settings',
    entityId: 'profile_photo',
    details: { url: publicUrl }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath('/'); // Update home page
  return success({ url: publicUrl });
}

export async function deleteProfilePhoto(): Promise<ActionResult> {
  const supabase = await createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return failure('Unauthorized');
  }

  // RBAC check
  const { data: isAdmin } = await supabase.rpc('is_admin');
  if (!isAdmin) {
    return failure('Unauthorized: insufficient permissions');
  }

  const { data: currentPhoto } = await supabase
    .from('site_settings')
    .select('value')
    .eq('key', 'profile_photo')
    .single();

  if (!currentPhoto || !(currentPhoto as any).value) {
    return failure('No profile photo found');
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
    return failure(`Database error: ${dbError.message}`);
  }

  // Audit Log
  await logAction({
    action: 'DELETE_PROFILE_PHOTO',
    entityType: 'settings',
    entityId: 'profile_photo',
    details: { storagePath }
  });

  revalidatePath('/admin/dashboard');
  revalidatePath('/');
  return success();
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
