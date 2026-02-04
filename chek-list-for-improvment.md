✅ ЧЕК-ЛИСТ ИСПРАВЛЕНИЙ
Приоритет 1 — Критические (нужно исправить немедленно)
 1.1 Добавить images.remotePatterns в next.config.ts для домена Supabase Storage

// Пример: добавить ваш Supabase URL
images: {
  remotePatterns: [
    { protocol: 'https', hostname: '*.supabase.co' }
  ]
}

✅ 1.2 Добавить серверную валидацию MIME-типов в gallery.ts и settings.ts

Разрешённые типы: image/jpeg, image/png, image/webp, image/gif
Проверять file.type на сервере
✅ 1.3 Удалять старое фото профиля перед загрузкой нового в settings.ts

Получить текущий storage_path из site_settings
Удалить старый файл из bucket перед upload
✅ 1.4 Добавить валидацию размера файла (10MB) в ProfilePhotoManager.tsx

Перед вызовом uploadProfilePhoto проверить file.size
Приоритет 2 — Важные улучшения
 2.1 Добавить проверку magic bytes (сигнатуры файла) на сервере

JPEG: FF D8 FF
PNG: 89 50 4E 47
WebP: 52 49 46 46 ... 57 45 4Б 50
✅ 2.2 Добавить параллельную загрузку в UploadForm.tsx с использованием Promise.all() или Promise.allSettled()

 2.3 Добавить обработку таймаутов и retry-логику при сетевых ошибках

✅ 2.4 Добавить кнопку удаления фото профиля в ProfilePhotoManager.tsx

Приоритет 3 — Улучшения UX
 3.1 Добавить индикатор прогресса загрузки (progress bar)

Использовать XMLHttpRequest.upload.onprogress или библиотеку типа react-dropzone
✅ 3.2 Добавить превью файлов перед загрузкой в UploadForm.tsx

Использовать URL.createObjectURL(file) для показа миниатюр
✅ 3.3 Реализовать drag-and-drop зону

Можно использовать react-dropzone или нативные события
 3.4 Добавить cropper для фото профиля

Рекомендую библиотеку react-image-crop или react-easy-crop
Обеспечить соотношение 4:5 как указано в UI
🚀 ЧЕК-ЛИСТ РАСШИРЕНИЯ ФУНКЦИОНАЛА
Управление галереей
 4.1 Добавить возможность сортировки фото (drag-and-drop reorder)

Использовать поле display_order из таблицы gallery
Библиотека: @dnd-kit/core или react-beautiful-dnd
 4.2 Добавить категоризацию фото по типу услуги

Использовать поле service_type из таблицы gallery
Фильтры в админ-панели
 4.3 Реализовать "до/после" галерею

Использовать поля before_image_url и after_image_url
Slider-компонент для сравнения
 4.4 Добавить alt-текст для SEO

Использовать поля alt_text_en, alt_text_lt, alt_text_ru
Форма редактирования метаданных фото
 4.5 Добавить переключатель публикации (published/draft)

Использовать поле is_published
Показывать на сайте только опубликованные
 4.6 Добавить избранные фото (featured)

Использовать поле is_featured
Показывать в выделенном месте на главной
Оптимизация изображений
 5.1 Автоматическая конвертация в WebP при загрузке

Использовать sharp на сервере или Supabase Edge Functions
 5.2 Генерация thumbnails (миниатюр)

Создавать версии: original, medium (800px), thumb (200px)
 5.3 Сжатие изображений перед сохранением

Оптимизировать качество до 80-85%
 5.4 Добавить ленивую загрузку (lazy loading) в галерею

Расширенное управление
 6.1 Bulk-операции (выбрать несколько → удалить/переместить)

 6.2 Поиск по alt-тексту и фильтры по дате

 6.3 История изменений (кто загрузил, когда)

 6.4 Backup/Export галереи

 6.5 Интеграция с внешними источниками (Instagram, Google Drive)

📊 ТЕКУЩЕЕ СОСТОЯНИЕ vs РЕКОМЕНДУЕМОЕ
Аспект	Сейчас	Рекомендуется
Ограничение размера	10MB (клиент + сервер)	✅ Оставить 10MB
Форматы	image/* (все)	Ограничить: JPEG, PNG, WebP
Валидация	Только размер на клиенте	+ MIME-тип + magic bytes на сервере
Next.js Image	❌ Не настроен	Настроить remotePatterns
Оптимизация	❌ Нет	WebP + thumbnails + сжатие
UX	Базовый	Drag-drop + preview + progress + crop
