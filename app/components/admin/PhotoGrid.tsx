'use client';

import { deletePhoto } from '@/app/actions/gallery';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useTransition } from 'react';

interface PhotoProps {
    id: number;
    image_url: string;
    storage_path: string;
}

export default function PhotoGrid({ photos }: { photos: PhotoProps[] }) {
    const [isPending, startTransition] = useTransition();

    if (photos.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                Нет загруженных фотографий
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={photo.image_url}
                        alt="Gallery item"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={() => startTransition(() => { void deletePhoto(photo.id, photo.storage_path) })}
                            disabled={isPending}
                            className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors transform hover:scale-110 disabled:opacity-50"
                            title="Удалить"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
