# Полный аудит сайта li_zagar_tan

**Дата аудита:** 4 февраля 2026
**Версия проекта:** 0.1.0
**Технологии:** Next.js 16.1.6 + React 19 + TypeScript + Supabase + Tailwind CSS v4

---

## Оглавление

1. [Критические проблемы безопасности](#1-критические-проблемы-безопасности)
2. [Backend и Server Actions](#2-backend-и-server-actions)
3. [Frontend компоненты](#3-frontend-компоненты)
4. [Интернационализация (i18n)](#4-интернационализация-i18n)
5. [SEO и метаданные](#5-seo-и-метаданные)
6. [Конфигурация и деплой](#6-конфигурация-и-деплой)
7. [Производительность](#7-производительность)
8. [Доступность (a11y)](#8-доступность-a11y)
9. [Рекомендации по расширению](#9-рекомендации-по-расширению)

---

## 1. Критические проблемы безопасности

### 1.1 Аутентификация и авторизация

| # | Проблема | Severity | Файл | Статус |
|---|----------|----------|------|--------|
| 1.1.1 | **Admin Layout не защищён** — проверка `user` выполняется, но результат НЕ используется. Любой может открыть `/admin/*` | 🔴 CRITICAL | `app/admin/layout.tsx:9-12` | ❌ |
| 1.1.2 | **Функция `is_admin()` определена, но НЕ используется** — все actions проверяют только наличие user, но не роль | 🔴 CRITICAL | `app/types/database.ts:547` | ❌ |
| 1.1.3 | **Отсутствует RBAC** — любой авторизованный пользователь может загружать/удалять фото | 🔴 HIGH | Все actions | ❌ |

#### Чек-лист исправлений:

- [ ] **1.1.1** Добавить редирект в `admin/layout.tsx` если user не авторизован:
  ```typescript
  if (!user) {
    redirect('/admin');
  }
  ```
- [ ] **1.1.2** Вызывать `supabase.rpc('is_admin')` в каждом защищённом action
- [ ] **1.1.3** Добавить проверку роли перед операциями с галереей

---

### 1.2 Валидация данных

| # | Проблема | Severity | Файл | Статус |
|---|----------|----------|------|--------|
| 1.2.1 | **Type casting без проверки** — `as string`, `as File`, `as any` без валидации | 🟠 HIGH | Все actions | ❌ |
| 1.2.2 | **Расширение файла берётся без валидации** — может быть `undefined` или опасным (`.php`) | 🟠 HIGH | `gallery.ts:22` | ❌ |
| 1.2.3 | **deletePhoto не проверяет владение** — можно удалить фото по любому ID | 🟠 HIGH | `gallery.ts:59-90` | ❌ |
| 1.2.4 | **Нет валидации email/password** на сервере | 🟡 MEDIUM | `auth.ts` | ❌ |

#### Чек-лист исправлений:

- [ ] **1.2.1** Использовать Zod для валидации FormData:
  ```typescript
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });
  ```
- [ ] **1.2.2** Проверять расширение файла из whitelist: `['jpg', 'jpeg', 'png', 'webp']`
- [ ] **1.2.3** Перед удалением проверять существование фото и совпадение `storage_path`
- [ ] **1.2.4** Добавить regex валидацию email и минимальную длину пароля

---

### 1.3 Прочие уязвимости

| # | Проблема | Severity | Файл | Статус |
|---|----------|----------|------|--------|
| 1.3.1 | **Отсутствует Rate Limiting** — можно заспамить uploads | 🟡 MEDIUM | Все actions | ❌ |
| 1.3.2 | **Потенциальный XSS через URL** — URL из БД не валидируется | 🟢 LOW | `settings.ts` | ❌ |
| 1.3.3 | **Exposure деталей ошибок** — `uploadError.message` отправляется клиенту | 🟢 LOW | `gallery.ts` | ❌ |

#### Чек-лист исправлений:

- [ ] **1.3.1** Добавить rate limiting через Supabase RLS или Redis
- [ ] **1.3.2** Валидировать URL через `z.string().url()` перед сохранением
- [ ] **1.3.3** Логировать полные ошибки на сервере, отправлять generic сообщения клиенту

---

## 2. Backend и Server Actions

### 2.1 Структура Server Actions

| Файл | Функции | Проблемы |
|------|---------|----------|
| `app/actions/auth.ts` | `login`, `logout` | Нет валидации input |
| `app/actions/gallery.ts` | `uploadPhoto`, `deletePhoto`, `getPhotos` | Нет RBAC, нет валидации файлов |
| `app/actions/settings.ts` | `uploadProfilePhoto`, `getProfilePhoto` | Утечка storage при замене фото |

### 2.2 Чек-лист улучшений Backend

#### Валидация (Приоритет: HIGH)

- [ ] Установить и настроить Zod для всех Server Actions
- [ ] Создать общие схемы валидации в `app/lib/validation.ts`
- [ ] Валидировать все FormData перед обработкой
- [ ] Проверять MIME-типы файлов на сервере (не только расширение)

#### Безопасность (Приоритет: HIGH)

- [ ] Настроить Row Level Security (RLS) в Supabase
- [ ] Использовать `SUPABASE_SERVICE_ROLE_KEY` для серверных операций
- [ ] Добавить audit logging для всех операций с данными
- [ ] Реализовать rate limiting

#### Обработка ошибок (Приоритет: MEDIUM)

- [ ] Создать централизованный error handler
- [ ] Не отправлять технические детали ошибок клиенту
- [ ] Добавить error tracking (Sentry или аналог)
- [ ] Генерировать error_id для поддержки

#### Оптимизация (Приоритет: LOW)

- [ ] Кэшировать результаты `getPhotos()` и `getProfilePhoto()`
- [ ] Использовать React Query или SWR на клиенте
- [ ] Добавить pagination для галереи

---

## 3. Frontend компоненты

### 3.1 Список компонентов

| Компонент | Файл | Строк | Проблемы |
|-----------|------|-------|----------|
| Header | `components/Header.tsx` | 220 | Недостаточно ARIA атрибутов |
| HeroSection | `components/HeroSection.tsx` | 110 | Текст 10px на мобиле |
| AboutSection | `components/AboutSection.tsx` | 145 | Нет skeleton loader |
| GallerySection | `components/GallerySection.tsx` | 108 | Нет кэширования фото |
| PricingSection | `components/PricingSection.tsx` | 91 | ✅ OK |
| ReviewsSection | `components/ReviewsSection.tsx` | 81 | Snap scroll на мобиле |
| BookingSection | `components/BookingSection.tsx` | 63 | ✅ OK |
| Footer | `components/Footer.tsx` | 87 | SVG без aria-label |
| TreatwellWidget | `components/TreatwellWidget.tsx` | 72 | console.log в production |

### 3.2 Чек-лист улучшений Frontend

#### Типография (Приоритет: HIGH)

- [ ] Установить минимальный размер шрифта 14px (сейчас 10px в HeroSection)
- [ ] Проверить контраст текста по WCAG AA (4.5:1)
- [ ] Увеличить line-height до 1.6+ для лучшей читаемости

#### Загрузка данных (Приоритет: MEDIUM)

- [ ] Добавить skeleton loader для фото профиля в AboutSection
- [ ] Добавить skeleton loader для галереи
- [ ] Использовать blur placeholder для Next.js Image
- [ ] Внедрить React Query/SWR для кэширования

#### Формы (Приоритет: MEDIUM)

- [ ] Добавить client-side валидацию в форму логина
- [ ] Использовать `aria-invalid` и `aria-describedby` для ошибок
- [ ] Добавить autofocus на первый input
- [ ] Показывать ошибки под конкретными полями

#### Прочее (Приоритет: LOW)

- [ ] Удалить `console.log` из TreatwellWidget.tsx:66
- [ ] Добавить focus-visible стили на все интерактивные элементы
- [ ] Улучшить IntersectionObserver threshold в Header

---

## 4. Интернационализация (i18n)

### 4.1 Текущее состояние

| Аспект | Статус | Оценка |
|--------|--------|--------|
| Поддержка языков (lt, ru, en) | ✅ Реализована | 100% |
| Переводы компонентов | ✅ Полные | 100% |
| Переключатель языков | ✅ Работает | 100% |
| Сохранение выбора языка | ❌ Не реализовано | 0% |
| Динамические мета-теги | ❌ Жёстко закодированы | 0% |
| hreflang атрибуты | ❌ Отсутствуют | 0% |
| HTML lang атрибут | ❌ Всегда "lt" | 0% |
| Форматирование чисел/дат | ❌ Не используется Intl API | 0% |

**Общая оценка i18n: 45%**

### 4.2 Чек-лист улучшений i18n

#### Критические (SEO) (Приоритет: CRITICAL)

- [ ] **Динамические мета-теги** — использовать `generateMetadata()` в layout.tsx:
  ```typescript
  export async function generateMetadata(): Promise<Metadata> {
    const lang = getCurrentLanguage();
    return metadataByLanguage[lang];
  }
  ```
- [ ] **HTML lang атрибут** — сделать динамическим: `<html lang={language}>`
- [ ] **hreflang атрибуты** — добавить в head:
  ```html
  <link rel="alternate" hreflang="lt" href="https://domain.com/" />
  <link rel="alternate" hreflang="ru" href="https://domain.com/" />
  <link rel="alternate" hreflang="en" href="https://domain.com/" />
  ```

#### Важные (UX) (Приоритет: HIGH)

- [ ] **Сохранение языка** — использовать localStorage:
  ```typescript
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  ```
- [ ] **Автоопределение языка** — проверять `navigator.language` при первом визите
- [ ] **URL структура** — рассмотреть /en/, /ru/, /lt/ пути для лучшего SEO

#### Форматирование (Приоритет: MEDIUM)

- [ ] Создать `app/i18n/format.ts` с функциями форматирования
- [ ] Использовать `Intl.NumberFormat` для чисел
- [ ] Использовать `Intl.DateTimeFormat` для дат
- [ ] Форматировать цены через `Intl.NumberFormat` с `style: 'currency'`

#### Дополнительно (Приоритет: LOW)

- [ ] Локализовать TreatwellWidget (если возможно)
- [ ] Добавить переводы для сообщений об ошибках
- [ ] Создать sitemap.xml с hreflang

---

## 5. SEO и метаданные

### 5.1 Текущее состояние

| Аспект | Статус | Проблема |
|--------|--------|----------|
| Title | ⚠️ | Жёстко закодирован на русском |
| Description | ⚠️ | Жёстко закодирован на русском |
| Keywords | ⚠️ | Смешанные языки |
| Open Graph | ⚠️ | Не локализирован |
| Schema.org (JSON-LD) | ❌ | Отсутствует |
| Canonical URL | ❌ | Отсутствует |
| sitemap.xml | ❌ | Отсутствует |
| robots.txt | ❌ | Отсутствует |

### 5.2 Чек-лист улучшений SEO

#### Мета-теги (Приоритет: HIGH)

- [ ] Создать локализованные мета-теги для каждого языка
- [ ] Добавить canonical URL
- [ ] Исправить Open Graph теги для соцсетей
- [ ] Добавить Twitter Card meta tags

#### Structured Data (Приоритет: HIGH)

- [ ] Добавить JSON-LD для LocalBusiness:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "li_zagar_tan",
    "address": { ... },
    "geo": { ... }
  }
  ```
- [ ] Добавить JSON-LD для Services (spray tan, цены)
- [ ] Добавить JSON-LD для Reviews (агрегированный рейтинг)

#### Технические файлы (Приоритет: MEDIUM)

- [ ] Создать `app/sitemap.ts`:
  ```typescript
  export default function sitemap(): MetadataRoute.Sitemap {
    return [{ url: 'https://domain.com/', lastModified: new Date() }];
  }
  ```
- [ ] Создать `app/robots.ts`:
  ```typescript
  export default function robots() {
    return { rules: { userAgent: '*', allow: '/' }, sitemap: '...' };
  }
  ```

---

## 6. Конфигурация и деплой

### 6.1 Проблемы конфигурации

| Файл | Проблема | Severity |
|------|----------|----------|
| `next.config.ts` | Минимальная конфигурация, нет image optimization | 🟠 HIGH |
| `package.json` | Зависимости требуют обновления, неполный lint скрипт | 🟠 HIGH |
| `tailwind.config.ts` | **ОТСУТСТВУЕТ** — критично для кастомизации | 🔴 CRITICAL |
| `vercel.json` | Отсутствует | 🟡 MEDIUM |
| `.env.example` | Неполный, нет SERVICE_ROLE_KEY | 🟡 MEDIUM |

### 6.2 Чек-лист конфигурации

#### Next.js (Приоритет: HIGH)

- [ ] Добавить `images.remotePatterns` для Supabase:
  ```typescript
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' }
    ],
    formats: ['image/avif', 'image/webp']
  }
  ```
- [ ] Добавить `poweredByHeader: false` для безопасности
- [ ] Добавить `compress: true`

#### Tailwind (Приоритет: CRITICAL)

- [ ] Создать `tailwind.config.ts`:
  ```typescript
  export default {
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          gold: '#FFD700',
          // brandbook colors
        }
      }
    }
  } satisfies Config;
  ```

#### Package.json (Приоритет: HIGH)

- [ ] Обновить зависимости:
  ```bash
  npm update react react-dom @supabase/supabase-js
  ```
- [ ] Исправить lint скрипт: `"lint": "eslint . --ext .ts,.tsx"`
- [ ] Добавить скрипты:
  ```json
  "lint:fix": "eslint . --ext .ts,.tsx --fix",
  "type-check": "tsc --noEmit",
  "format": "prettier --write ."
  ```
- [ ] Установить dev зависимости:
  ```bash
  npm install -D prettier husky lint-staged vitest
  ```

#### Environment (Приоритет: MEDIUM)

- [ ] Добавить в `.env.example`:
  ```env
  NODE_ENV=development
  NEXT_PUBLIC_APP_URL=http://localhost:3000
  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
  ```

#### Vercel (Приоритет: LOW)

- [ ] Создать `vercel.json` с настройками регионов и headers
- [ ] Настроить caching headers для статических файлов
- [ ] Настроить redirects для SEO

---

## 7. Производительность

### 7.1 Текущее состояние

| Аспект | Статус | Рекомендация |
|--------|--------|--------------|
| Next.js Image | ✅ Используется | Добавить blur placeholder |
| Lazy loading | ⚠️ Частично | Добавить для галереи |
| Кэширование | ❌ Нет | Внедрить React Query |
| Bundle size | ⚠️ Не оптимизирован | Анализировать с @next/bundle-analyzer |
| Web Vitals | ❌ Не отслеживается | Добавить мониторинг |

### 7.2 Чек-лист производительности

#### Изображения (Приоритет: HIGH)

- [ ] Добавить `blurDataURL` или `placeholder="blur"` для Image
- [ ] Настроить автоматическую конвертацию в WebP/AVIF
- [ ] Создать thumbnails для галереи (200px, 800px)
- [ ] Добавить lazy loading для изображений ниже fold

#### Кэширование (Приоритет: MEDIUM)

- [ ] Внедрить React Query для данных с API
- [ ] Настроить stale-while-revalidate стратегию
- [ ] Добавить HTTP caching headers в next.config.ts

#### Мониторинг (Приоритет: MEDIUM)

- [ ] Подключить Vercel Analytics или Web Vitals
- [ ] Настроить error tracking (Sentry)
- [ ] Добавить performance budgets

#### Bundle (Приоритет: LOW)

- [ ] Установить `@next/bundle-analyzer`
- [ ] Проанализировать и оптимизировать размер бандла
- [ ] Настроить code splitting для больших компонентов

---

## 8. Доступность (a11y)

### 8.1 Текущее состояние

| Аспект | Статус | Проблема |
|--------|--------|----------|
| Semantic HTML | ✅ Хорошо | — |
| ARIA атрибуты | ⚠️ Недостаточно | Только 1 aria-label |
| Focus management | ❌ Нет | Нет focus-visible стилей |
| Skip to content | ❌ Нет | Нет ссылки |
| Color contrast | ⚠️ Не проверен | Золотой цвет может быть проблемой |
| prefers-reduced-motion | ❌ Нет | Не поддерживается |

### 8.2 Чек-лист доступности

#### Критические (Приоритет: HIGH)

- [ ] Добавить `aria-label` ко всем кнопкам-иконкам (особенно в Footer)
- [ ] Добавить `aria-expanded` к мобильному меню
- [ ] Добавить skip-to-main ссылку в начало Header:
  ```tsx
  <a href="#main" className="sr-only focus:not-sr-only">
    Skip to main content
  </a>
  ```
- [ ] Добавить `role="button"` к интерактивным элементам без семантики

#### Визуальные (Приоритет: MEDIUM)

- [ ] Добавить `:focus-visible` стили в globals.css:
  ```css
  *:focus-visible {
    outline: 2px solid #fbbf5d;
    outline-offset: 2px;
  }
  ```
- [ ] Проверить контраст всех цветов по WCAG AA (4.5:1)
- [ ] Увеличить минимальный размер шрифта до 14px

#### Анимации (Приоритет: MEDIUM)

- [ ] Добавить `prefers-reduced-motion` в globals.css:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

#### Тестирование (Приоритет: LOW)

- [ ] Протестировать с screen reader (NVDA, VoiceOver)
- [ ] Проверить навигацию только с клавиатуры
- [ ] Запустить Lighthouse accessibility audit

---

## 9. Рекомендации по расширению

### 9.1 Функциональность галереи

- [ ] **Сортировка фото** — drag-and-drop с использованием `display_order`
- [ ] **Категоризация** — фильтры по `service_type`
- [ ] **До/После галерея** — slider с `before_image_url` / `after_image_url`
- [ ] **Alt-текст для SEO** — форма редактирования `alt_text_*`
- [ ] **Публикация** — toggle `is_published` для черновиков
- [ ] **Избранные** — выделение `is_featured` фото
- [ ] **Bulk операции** — множественное удаление/перемещение

### 9.2 Админ-панель

- [ ] **Breadcrumbs** — навигация в админке
- [ ] **Dashboard метрики** — статистика загрузок, посещений
- [ ] **История изменений** — audit log действий
- [ ] **Управление контентом** — редактирование текстов на сайте
- [ ] **Backup/Export** — экспорт галереи и настроек

### 9.3 Интеграции

- [ ] **Instagram** — автоматический импорт фото
- [ ] **Google Analytics** — отслеживание конверсий
- [ ] **Email уведомления** — о новых бронированиях
- [ ] **WhatsApp** — кнопка быстрой связи

### 9.4 UX улучшения

- [ ] **Drag-and-drop загрузка** — react-dropzone
- [ ] **Cropper для фото** — react-easy-crop (соотношение 4:5)
- [ ] **Progress bar загрузки** — отображение процента
- [ ] **Preview до загрузки** — предпросмотр выбранных файлов
- [ ] **Dark mode** — переключатель темы

---

## Сводная таблица приоритетов

| Приоритет | Категория | Количество задач |
|-----------|-----------|------------------|
| 🔴 CRITICAL | Безопасность, Конфигурация | 6 |
| 🟠 HIGH | Backend, Frontend, SEO, i18n | 24 |
| 🟡 MEDIUM | Производительность, a11y | 18 |
| 🟢 LOW | Расширение, Оптимизация | 15+ |

---

## Следующие шаги

1. **Немедленно** (сегодня):
   - Исправить авторизацию в `admin/layout.tsx`
   - Создать `tailwind.config.ts`
   - Обновить зависимости (`npm update`)

2. **Эта неделя**:
   - Добавить серверную валидацию во все Server Actions
   - Реализовать сохранение языка в localStorage
   - Добавить динамические мета-теги

3. **Следующая неделя**:
   - Настроить SEO (sitemap, robots, JSON-LD)
   - Улучшить доступность (ARIA, focus styles)
   - Внедрить React Query для кэширования

4. **В будущем**:
   - Расширить функционал галереи
   - Добавить мониторинг и аналитику
   - Оптимизировать производительность

---

*Отчёт создан автоматически. Раздел загрузки фотографий исключён (анализировался отдельно).*
