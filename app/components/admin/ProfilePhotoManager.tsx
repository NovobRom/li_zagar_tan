'use client';

import { useRef, useState, useEffect } from 'react';
import { uploadProfilePhoto, deleteProfilePhoto } from '@/app/actions/settings';
import { SubmitButton } from './SubmitButton';
import Image from 'next/image';
import { Upload, Trash2, X } from 'lucide-react';

export default function ProfilePhotoManager({ initialPhotoUrl }: { initialPhotoUrl: string | null }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialPhotoUrl);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function handleUpload(formData: FormData) {
    setError(null);
    const result = await uploadProfilePhoto(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.url) {
      setPhotoUrl(result.url);
      setPreview(null);
      formRef.current?.reset();
    }
  }

  async function handleDelete() {
    if (!confirm('Вы уверены, что хотите удалить фото профиля?')) return;

    const result = await deleteProfilePhoto();
    if (result.error) {
      setError(result.error);
    } else {
      setPhotoUrl(null);
      setPreview(null);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (file) {
      if (file.size > MAX_SIZE) {
        setError('Файл слишком большой (макс. 10MB)');
        e.target.value = ''; // Reset input
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Неверный формат файла');
        e.target.value = '';
        return;
      }

      setPreview(URL.createObjectURL(file));
    }
  };

  const clearSelection = () => {
    setPreview(null);
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Фото Профиля (О себе)</h2>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Preview Area */}
        <div className="relative w-32 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover opacity-80"
            />
          ) : photoUrl ? (
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

        {/* Controls */}
        <div className="flex-1 w-full max-w-sm">
          <form
            ref={formRef}
            action={handleUpload}
            className="space-y-4"
          >
            {/* 
                Input must remain in DOM to preserve value. 
                We toggle visibility instead of conditional rendering. 
            */}
            <div className={preview ? 'hidden' : 'block space-y-3'}>
              <div className="relative">
                <input
                  type="file"
                  id="profile-photo-input"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                // removed required to avoid browser tooltip issues when hidden, 
                // but logic handles validation manually.
                // Actually, keep required but maybe it's okay if we validate manually.
                />
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 border-dashed rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Выберите новое фото...</span>
                </div>
              </div>

              {photoUrl && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors relative z-20"
                >
                  <Trash2 className="w-4 h-4" />
                  Удалить текущее фото
                </button>
              )}
            </div>

            {preview && (
              // Preview State: Upload confirmation
              <div className="space-y-3">
                <div className="flex gap-2">
                  <SubmitButton text="Сохранить" loadingText="Загрузка..." />
                  <button
                    type="button"
                    onClick={clearSelection}
                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-amber-600">Нажмите "Сохранить", чтобы применить изменения.</p>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Рекомендуемый формат: Вертикальное фото (3:4 или 4:5). Макс. 10MB.
          </p>
        </div>
      </div>
    </div>
  );
}
