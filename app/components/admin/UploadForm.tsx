'use client';

import { uploadPhoto } from '@/app/actions/gallery';
import { Upload } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { useRef } from 'react';

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

export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                await uploadPhoto(formData);
                formRef.current?.reset();
            }}
            className="flex gap-4 items-end bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8"
        >
            <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Новое фото
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
    );
}
