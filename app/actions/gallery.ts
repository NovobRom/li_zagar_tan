'use server';

import { createClient } from '@/app/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fileUploadSchema } from '@/app/lib/validation';

export async function uploadPhoto(formData: FormData) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin');
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
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

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

    // 3. Insert into Table
    const { error: dbError } = await supabase
        .from('gallery')
        .insert([
            {
                image_url: publicUrl,
                storage_path: filePath,
                created_at: new Date().toISOString(),
            },
        ] as any);

    if (dbError) {
        return { error: `Database error: ${dbError.message}` };
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/'); // Update home page gallery
    return { success: true };
}

export async function deletePhoto(id: number, storagePath: string) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin');
    }

    // RBAC check
    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) {
        return { error: 'Unauthorized: insufficient permissions' };
    }

    // 1. Get photo details to verify ownership/path
    const { data: photo, error: fetchError } = await supabase
        .from('gallery')
        .select('storage_path')
        .eq('id', id)
        .single();

    if (fetchError || !photo) {
        return { error: 'Photo not found' };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((photo as any).storage_path !== storagePath) {
        return { error: 'Invalid storage path provided' };
    }

    // 2. Delete from Storage
    const { error: storageError } = await supabase.storage
        .from('gallery')
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .remove([(photo as any).storage_path]);

    if (storageError) {
        return { error: `Storage delete failed: ${storageError.message}` };
    }

    // 3. Delete from Table
    const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

    if (dbError) {
        return { error: `Database delete failed: ${dbError.message}` };
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/');
    return { success: true };
}

export async function getPhotos() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

    return data || [];
}
