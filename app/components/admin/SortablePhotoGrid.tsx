'use client';

import { useState, useCallback, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortablePhotoItem } from './SortablePhotoItem';
import { updatePhotosOrder } from '@/app/actions/gallery';
import { Save } from 'lucide-react';

interface PhotoProps {
    id: number | string;
    image_url: string;
    storage_path: string;
    display_order?: number;
}

export default function SortablePhotoGrid({ initialPhotos }: { initialPhotos: PhotoProps[] }) {
    const [photos, setPhotos] = useState(initialPhotos);
    const [hasChanges, setHasChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Sync with initialPhotos (e.g., after deletion)
    useEffect(() => {
        setPhotos(initialPhotos);
    }, [initialPhotos]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // Avoid triggering drag on click
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setPhotos((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                setHasChanges(true);
                return newItems;
            });
        }
    }, []);

    const saveOrder = async () => {
        setIsSaving(true);
        const orders = photos.map((photo, index) => ({
            id: photo.id,
            display_order: index,
        }));

        const res = await updatePhotosOrder(orders);
        if (res.success) {
            setHasChanges(false);
        } else {
            alert('Ошибка при сохранении порядка: ' + res.error);
        }
        setIsSaving(false);
    };

    if (photos.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                Нет загруженных фотографий
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {hasChanges && (
                <div className="flex justify-end sticky top-4 z-30">
                    <button
                        onClick={saveOrder}
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {isSaving ? 'Сохранение...' : 'Сохранить порядок'}
                    </button>
                </div>
            )}

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={photos.map((p) => p.id)}
                    strategy={rectSortingStrategy}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {photos.map((photo) => (
                            <SortablePhotoItem key={photo.id} photo={photo} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    );
}
