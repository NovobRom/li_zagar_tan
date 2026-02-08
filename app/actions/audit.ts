'use server';

import { createClient } from '@/app/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function getAuditLogs() {
    const supabase = await createClient();

    // Auth & RBAC check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/admin');

    const { data: isAdmin } = await supabase.rpc('is_admin');
    if (!isAdmin) redirect('/admin/dashboard');

    const { data } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

    return data || [];
}
