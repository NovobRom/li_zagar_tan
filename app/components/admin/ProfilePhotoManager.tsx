'use client';

import { useRef, useState, useTransition } from 'react';
import { uploadProfilePhoto } from '@/app/actions/settings';
import { SubmitButton } from './SubmitButton';
import Image from 'next/image';
import { Upload } from 'lucide-react';

export default function ProfilePhotoManager({ initialPhotoUrl }: { initialPhotoUrl: string | null }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialPhotoUrl);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(formData: FormData) {
    setError(null);
    const result = await uploadProfilePhoto(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.url) {
      setPhotoUrl(result.url);
      formRef.current?.reset();
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Фото Профиля (О себе)</h2>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Preview */}
        <div className="relative w-32 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt="Profile"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs text-center p-2">
              Нет фото
            </div>
          )}
        </div>

        {/* Upload Form */}
        <div className="flex-1 w-full max-w-sm">
          <form
            ref={formRef}
            action={handleUpload}
            className="space-y-4"
          >
            <div className="relative">
              <input
                type="file"
                name="file"
                accept="image/*"
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                required
              />
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Выберите фото...</span>
              </div>
            </div>

            <SubmitButton text="Загрузить" loadingText="Загрузка..." />

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </form>
          <p className="text-xs text-gray-500 mt-2">
            Рекомендуемый формат: Вертикальное фото (3:4 или 4:5).
          </p>
        </div>
      </div>
    </div>
  );
}
