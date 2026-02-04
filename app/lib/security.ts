import { createClient } from './supabase-server';

/**
 * Validates the magic bytes of a file to ensure it's a valid image.
 * Supported types: JPEG, PNG, WEBP, GIF
 */
export async function validateMagicBytes(file: File): Promise<boolean> {
    const buffer = await file.arrayBuffer();
    const arr = new Uint8Array(buffer).subarray(0, 4);
    let header = '';
    for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16).padStart(2, '0');
    }

    // Magic bytes mapping
    // JPEG: ff d8 ff
    // PNG: 89 50 4e 47
    // GIF: 47 49 46 38
    // WEBP: 52 49 46 46 (RIFF)

    const isJpeg = header.startsWith('ffd8ff');
    const isPng = header.startsWith('89504e47');
    const isGif = header.startsWith('47494638');
    const isWebp = header.startsWith('52494646');

    return isJpeg || isPng || isGif || isWebp;
}

/**
 * Logs an action to the audit_logs table
 */
export async function logAction(params: {
    action: string;
    entityType: string;
    entityId?: string;
    details?: any;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    await (supabase.from('audit_logs') as any).insert({
        user_id: user.id,
        action: params.action,
        entity_type: params.entityType,
        entity_id: params.entityId || null,
        details: params.details || null,
    });
}

/**
 * Basic rate limiting check using audit logs
 * Returns true if the user is within limits
 */
export async function checkRateLimit(userId: string, limit: number = 10, windowMinutes: number = 1): Promise<boolean> {
    const supabase = await createClient();
    const timeWindow = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

    const { count, error } = await supabase
        .from('audit_logs')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .gte('created_at', timeWindow);

    if (error) {
        console.error('Rate limit check error:', error);
        return true; // Fail open to not block users on DB errors, or false to be strict
    }

    return (count || 0) < limit;
}
