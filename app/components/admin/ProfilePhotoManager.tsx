'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { uploadProfilePhoto, deleteProfilePhoto } from '@/app/actions/settings';
import { SubmitButton } from './SubmitButton';
import Image from 'next/image';
import { Upload, Trash2, X, Crop as CropIcon } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '@/app/lib/cropImage';

export default function ProfilePhotoManager({ initialPhotoUrl }: { initialPhotoUrl: string | null }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialPhotoUrl);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // Cleanup preview on unmount
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function handleUpload() {
    if (!preview || !croppedAreaPixels || !selectedFile) return;

    setError(null);
    try {
      // 1. Get cropped image as blob
      const croppedImageBlob = await getCroppedImg(preview, croppedAreaPixels);
      if (!croppedImageBlob) {
        throw new Error('Failed to crop image');
      }

      // 2. Convert to File
      const croppedFile = new File([croppedImageBlob], selectedFile.name, {
        type: 'image/jpeg',
      });

      // 3. Prepare FormData
      const formData = new FormData();
      formData.append('file', croppedFile);

      // 4. Upload
      const result = await uploadProfilePhoto(formData);

      if (result.error) {
        setError(result.error);
      } else if (result.success && result.data?.url) {
        setPhotoUrl(result.data.url);
        setPreview(null);
        setSelectedFile(null);
        setIsCropping(false);
        formRef.current?.reset();
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error occurred while saving');
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

      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      setIsCropping(true);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const clearSelection = () => {
    setPreview(null);
    setSelectedFile(null);
    setIsCropping(false);
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
            <div className={isCropping ? 'hidden' : 'block space-y-3'}>
              <div className="relative">
                <input
                  type="file"
                  id="profile-photo-input"
                  name="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
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

            {isCropping && preview && (
              <div className="space-y-4">
                <div className="relative w-full aspect-[4/5] bg-gray-900 rounded-xl overflow-hidden">
                  <Cropper
                    image={preview}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 5}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Зум:</span>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleUpload}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
                    >
                      <CropIcon className="w-4 h-4" />
                      Обрезать и Сохранить
                    </button>
                    <button
                      type="button"
                      onClick={clearSelection}
                      className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Отмена
                    </button>
                  </div>
                </div>
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
