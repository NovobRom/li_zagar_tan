'use client';

import { uploadPhoto } from '@/app/actions/gallery';
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useRef, useActionState, useEffect } from 'react';

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
};

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [state, formAction] = useActionState(async (prevState: any, formData: FormData) => {
        const result = await uploadPhoto(formData);
        if (result.error) {
            return { error: result.error, success: false };
        }
        return { error: '', success: true };
    }, initialState);

    useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Загрузить новое фото</h2>
            <form
                ref={formRef}
                action={formAction}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-end"
            >
                <div className="flex-1 w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Выберите файл
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept="image/*"
                        required
                        className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-amber-50 file:text-amber-700
                hover:file:bg-amber-100
                transition-colors"
                    />
                </div>
                <SubmitButton />
            </form>

            {state.error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {state.error}
                </div>
            )}

            {state.success && (
                <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Фото успешно загружено!
                </div>
            )}
        </div>
    );
}
