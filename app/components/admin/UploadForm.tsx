'use client';

import { uploadPhoto } from '@/app/actions/gallery';
import { Upload, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRef, useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 transition-colors"
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

interface UploadState {
    error: string;
    success: boolean;
    count: number;
}

export default function UploadForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [state, setState] = useState<UploadState>({ error: '', success: false, count: 0 });

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prev => [...prev, ...acceptedFiles]);

        // Generate previews
        const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);

        // Reset state on new selection
        setState({ error: '', success: false, count: 0 });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'image/webp': [],
            'image/gif': []
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        onDropRejected: (fileRejections) => {
            const errorMsg = fileRejections[0]?.errors[0]?.message || 'Файл отклонён';
            setState(prev => ({ ...prev, error: `Ошибка выбора: ${errorMsg}` }));
        }
    });

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        URL.revokeObjectURL(previews[index]); // Cleanup
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    // Cleanup previews on unmount
    useEffect(() => {
        return () => previews.forEach(url => URL.revokeObjectURL(url));
    }, [previews]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (files.length === 0) {
            setState({ error: 'Выберите хотя бы один файл', success: false, count: 0 });
            return;
        }

        setUploading(true);
        setState({ error: '', success: false, count: 0 });

        try {
            // Parallel uploads with progress tracking
            let completedCount = 0;
            const uploadPromises = files.map(async (file) => {
                const formData = new FormData();
                formData.append('file', file);
                const res = await uploadPhoto(formData);
                completedCount++;
                setProgress(Math.round((completedCount / files.length) * 100));
                return res;
            });

            const results = await Promise.all(uploadPromises);

            let successCount = 0;
            let firstError = '';

            results.forEach(res => {
                if (res.success) successCount++;
                else if (!firstError && res.error) firstError = res.error;
            });

            if (successCount === files.length) {
                // All success
                setFiles([]);
                setPreviews([]);
                setState({ error: '', success: true, count: successCount });
            } else if (successCount > 0) {
                // Partial success
                setState({
                    error: `Загружено ${successCount} из ${files.length}. Ошибка: ${firstError}`,
                    success: true,
                    count: successCount
                });
                // Keep failed files ideally, but for now clear all to simplify or user re-selects
                setFiles([]);
                setPreviews([]);
            } else {
                // All failed
                setState({ error: firstError || 'Ошибка загрузки', success: false, count: 0 });
            }
        } catch (err) {
            console.error(err);
            setState({ error: 'Произошла системная ошибка при загрузке', success: false, count: 0 });
        } finally {
            setUploading(false);
            // Don't reset progress immediately so user sees 100%
            setTimeout(() => setProgress(0), 1000);
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Загрузить новые фото</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                        ${isDragActive ? 'border-amber-500 bg-amber-50' : 'border-gray-300 hover:border-amber-400'}
                        ${state.error ? 'border-red-300' : ''}
                    `}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                        <Upload className="h-8 w-8 text-gray-400" />
                        {isDragActive ? (
                            <p>Перетащите файлы сюда...</p>
                        ) : (
                            <p>Перетащите фото сюда или кликните для выбора</p>
                        )}
                        <p className="text-xs text-gray-400">JPEG, PNG, WebP до 10MB</p>
                    </div>
                </div>

                {/* Progress Bar */}
                {uploading && (
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Загрузка файлов...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-amber-600 h-full transition-all duration-300 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Previews Grid */}
                {files.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mt-4">
                        {previews.map((src, index) => (
                            <div key={index} className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <Image
                                    src={src}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeFile(index)}
                                    className="absolute top-1 right-1 bg-white/80 hover:bg-white text-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-end pt-2">
                    <SubmitButton pending={uploading} />
                </div>
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
