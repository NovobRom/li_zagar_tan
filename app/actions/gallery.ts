'use server';

import { createClient } from '@/app/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { fileUploadSchema } from '@/app/lib/validation';
import { validateMagicBytes, logAction, checkRateLimit } from '@/app/lib/security';
import { ActionResult, success, failure } from '@/app/lib/actions';
import { InsertTables, Tables } from '@/app/types/database';

export async function uploadPhoto(formData: FormData): Promise<ActionResult> {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin');
    }

    // RBAC check
    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) {
        return failure('Unauthorized: insufficient permissions');
    }

    // Rate Limit Check (e.g., 5 uploads per minute)
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
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

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

    // 3. Insert into Table
    const newPhoto: InsertTables<'gallery'> = {
        image_url: publicUrl,
        storage_path: filePath,
        created_at: new Date().toISOString(),
    };

    const { error: dbError } = await (supabase
        .from('gallery') as any)
        .insert([newPhoto]);

    if (dbError) {
        return failure(`Database error: ${dbError.message}`);
    }

    // Audit Log
    await logAction({
        action: 'UPLOAD_PHOTO',
        entityType: 'gallery',
        entityId: filePath,
        details: { size: file.size, type: file.type }
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/'); // Update home page gallery
    return success();
}

export async function deletePhoto(id: number | string, storagePath: string): Promise<ActionResult> {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect('/admin');
    }

    // RBAC check
    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) {
        return failure('Unauthorized: insufficient permissions');
    }

    // 1. Get photo details to verify ownership/path
    const { data: photo, error: fetchError } = await (supabase
        .from('gallery') as any)
        .select('storage_path')
        .eq('id', id)
        .single();

    if (fetchError || !photo) {
        return failure('Photo not found');
    }

    if (photo.storage_path !== storagePath) {
        return failure('Invalid storage path provided');
    }

    // 2. Delete from Storage
    const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([photo.storage_path!]);

    if (storageError) {
        return failure(`Storage delete failed: ${storageError.message}`);
    }

    // 3. Delete from Table
    const { error: dbError } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);

    if (dbError) {
        return failure(`Database delete failed: ${dbError.message}`);
    }

    // Audit Log
    await logAction({
        action: 'DELETE_PHOTO',
        entityType: 'gallery',
        entityId: id.toString(),
        details: { storagePath }
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/');
    return success();
}

export async function getPhotos() {
    const supabase = await createClient();
    const { data } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false })
        .returns<Tables<'gallery'>[]>();

    return data || [];
}

export async function updatePhotosOrder(orders: { id: string | number; display_order: number }[]): Promise<ActionResult> {
    const supabase = await createClient();

    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/admin');

    // RBAC check
    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) return failure('Unauthorized');

    // Bulk update
    const updates = orders.map(item =>
        (supabase.from('gallery') as any).update({ display_order: item.display_order }).eq('id', item.id)
    );

    const results = await Promise.all(updates);
    const errors = results.filter(r => r.error);

    if (errors.length > 0) {
        return failure('Failed to update some items');
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/');
    return success();
}
