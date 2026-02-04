import { logout } from '@/app/actions/auth';
import { getPhotos } from '@/app/actions/gallery';
import { getProfilePhoto } from '@/app/actions/settings';
import PhotoGrid from '@/app/components/admin/PhotoGrid';
import ProfilePhotoManager from '@/app/components/admin/ProfilePhotoManager';
import UploadForm from '@/app/components/admin/UploadForm';
import { LogOut, Image as ImageIcon } from 'lucide-react';

/*
  Admin Dashboard
  - Protected by AdminLayout
  - Shows Upload Form
  - Shows Gallery Grid
*/

export default async function DashboardPage() {
    const photos = await getPhotos();
    const profilePhoto = await getProfilePhoto();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <ImageIcon className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Управление галереей</h1>
                        <p className="text-sm text-gray-500">
                            {photos.length} фото загружено
                        </p>
                    </div>
                </div>

                <form action={logout}>
                    <button
                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Выйти
                    </button>
                </form>
            </div>

            {/* Upload Section */}
            <div className="space-y-8">
                <ProfilePhotoManager initialPhotoUrl={profilePhoto} />
                <UploadForm />
            </div>

            {/* Grid Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Галерея</h2>
                <PhotoGrid photos={photos} />
            </div>
        </div>
    );
}
