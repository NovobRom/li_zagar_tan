'use client';

import { login } from '@/app/actions/auth';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { Lock } from 'lucide-react';

/* 
  Admin Login Page
  - Simple email/password form
  - Uses Server Actions for auth
*/

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg"
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Вход...
                </span>
            ) : (
                'Войти'
            )}
        </button>
    );
}

const initialState = {
    error: '',
};

export default function AdminLoginPage() {
    // @ts-ignore - existing simple action state pattern
    const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
        const res = await login(formData);
        if (res?.error) return { error: res.error };
        return { error: '' };
    }, initialState);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <div className="mx-auto h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center">
                        <Lock className="h-8 w-8 text-amber-600" />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                        Админ Панель
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Вход только для авторизованных пользователей
                    </p>
                </div>

                <form className="mt-8 space-y-6" action={formAction}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email-address" className="sr-only">
                                Email
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Email адрес"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Пароль
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-amber-500 focus:border-amber-500 focus:z-10 sm:text-sm transition-colors"
                                placeholder="Пароль"
                            />
                        </div>
                    </div>

                    {state?.error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="text-sm text-red-700">
                                    {state.error}
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <SubmitButton />
                    </div>
                </form>
            </div>
        </div>
    );
}
