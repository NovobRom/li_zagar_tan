'use server';

import { createClient } from '@/app/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function uploadPhoto(formData: FormData) {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin');
    }

    const file = formData.get('file') as File;
    if (!file) {
        return { error: 'No file provided' };
    }

    // Validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
        return { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' };
    }

    if (file.size > maxSize) {
        return { error: 'File size exceeds 10MB limit.' };
    }

    // 1. Upload to Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

    if (uploadError) {
        return { error: `Upload failed: ${uploadError.message}` };
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

    // 1. Delete from Storage
    const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([storagePath]);

    if (storageError) {
        return { error: `Storage delete failed: ${storageError.message}` };
    }

    // 2. Delete from Table
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
