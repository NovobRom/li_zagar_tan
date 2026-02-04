import { logout } from '@/app/actions/auth';
import { getPhotos } from '@/app/actions/gallery';
import { getProfilePhoto, getHeroImage } from '@/app/actions/settings';
import SortablePhotoGrid from '@/app/components/admin/SortablePhotoGrid';
import ProfilePhotoManager from '@/app/components/admin/ProfilePhotoManager';
import HeroImageManager from '@/app/components/admin/HeroImageManager';
import UploadForm from '@/app/components/admin/UploadForm';
import { LogOut, Image as ImageIcon, BarChart3, History } from 'lucide-react';
import Link from 'next/link';

/*
  Admin Dashboard
  - Protected by AdminLayout
  - Shows Upload Form
  - Shows Sortable Gallery Grid
*/

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const photos = await getPhotos();
    const profilePhoto = await getProfilePhoto();
    const heroImage = await getHeroImage();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header / Stats Summary */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <ImageIcon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Панель управления</h1>
                        <p className="text-sm text-gray-500">
                            {photos.length} фото в галерее
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Link
                        href="/admin/audit-logs"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                        <History className="h-4 w-4" />
                        Логи аудита
                    </Link>
                    <form action={logout}>
                        <button
                            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Выйти
                        </button>
                    </form>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Management */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-amber-500" />
                            Статистика
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-500 text-sm">Всего фото</span>
                                <span className="font-semibold">{photos.length}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-gray-500 text-sm">Дата последнего фото</span>
                                <span className="text-sm">{photos.length > 0 ? new Date((photos[0] as any).created_at).toLocaleDateString() : '—'}</span>
                            </div>
                        </div>
                    </div>

                    <ProfilePhotoManager initialPhotoUrl={profilePhoto} />
                    <HeroImageManager initialPhotoUrl={heroImage} />
                    <UploadForm />
                </div>

                {/* Right Column: Gallery Reordering */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Галерея</h2>
                            <p className="text-xs text-gray-400">Перетащите для изменения порядка</p>
                        </div>
                        <SortablePhotoGrid initialPhotos={photos as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
