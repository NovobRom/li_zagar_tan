'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { Trash2, GripVertical } from 'lucide-react';
import { useTransition } from 'react';
import { deletePhoto } from '@/app/actions/gallery';

interface PhotoProps {
    id: number | string;
    image_url: string;
    storage_path: string;
}

export function SortablePhotoItem({ photo }: { photo: PhotoProps }) {
    const [isPending, startTransition] = useTransition();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: photo.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : 1,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
        >
            <Image
                src={photo.image_url}
                alt="Gallery item"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
            />

            {/* Drag Handle */}
            <div
                {...attributes}
                {...listeners}
                className="absolute top-2 left-2 p-1.5 bg-white/80 rounded-md shadow-sm cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity z-20"
                title="Перетащить"
            >
                <GripVertical className="h-4 w-4 text-gray-600" />
            </div>

            {/* Delete Button */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
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
    );
}
