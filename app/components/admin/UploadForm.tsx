'use client';

import { uploadPhoto } from '@/app/actions/gallery';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useRef, useActionState, useEffect, useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
        >
            {pending ? (
                <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Загрузка...
                </>
            ) : (
                <>
                    <Upload className="h-4 w-4" />
                    Загрузить фото
                </>
            )}
        </button>
    );
}

const initialState = {
    error: '',
    success: false,
    count: 0,
};

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
        const files = formData.getAll('file') as File[];

        if (!files || files.length === 0) {
            return { error: 'Файлы не выбраны', success: false, count: 0 };
        }

        let successCount = 0;
        let firstError = '';


        // Process files one by one to avoid overwhelming the server/connection
        for (const file of files) {
            if (file.size === 0) continue;

            // Check file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                if (!firstError) firstError = `Файл "${file.name}" слишком большой (макс. 10MB)`;
                continue;
            }

            const singleFormData = new FormData();
            singleFormData.append('file', file);

            try {
                const result = await uploadPhoto(singleFormData);

                if (result.success) {
                    successCount++;
                } else {
                    if (!firstError) firstError = result.error || 'Ошибка загрузки';
                }
            } catch (e) {
                console.error('Upload error:', e);
                if (!firstError) firstError = 'Произошла ошибка при загрузке. Возможно, файл слишком большой.';
            }
        }

        if (successCount === 0 && firstError) {
            return { error: firstError, success: false, count: 0 };
        }

        if (successCount < files.length) {
            return { error: `Загружено ${successCount} из ${files.length}. Ошибка: ${firstError}`, success: true, count: successCount };
        }

        return { error: '', success: true, count: successCount };
    }, initialState);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Загрузить новые фото</h2>
            <form
                ref={formRef}
                action={formAction}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-end"
            >
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Выберите файлы
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        multiple // Allow multiple files
                        required
                        className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-amber-50 file:text-amber-700
                hover:file:bg-amber-100
                transition-colors"
                    />
                    <p className="mt-1 text-xs text-gray-500">Можно выбрать несколько файлов сразу</p>
                </div>
                <SubmitButton />
            </form>

            {state.error && (
                <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm ${state.success ? 'bg-amber-50 text-amber-800' : 'bg-red-50 text-red-700'}`}>
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {state.error}
                </div>
            )}

            {state.success && !state.error && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Успешно загружено фото: {state.count}!
                </div>
            )}
        </div>
    );
}
