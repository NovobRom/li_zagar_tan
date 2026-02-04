'use server';

import { createClient } from '@/app/lib/supabase-server';
import { redirect } from 'next/navigation';
import { loginSchema } from '@/app/lib/validation';

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validation
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
        let errorMessage = '';
        result.error.issues.forEach(issue => {
            errorMessage += issue.message + '. ';
        });
        return { error: errorMessage.trim() };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: 'Неверный email или пароль' };
    }

    redirect('/admin/dashboard');
}

export async function logout() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/admin');
}
