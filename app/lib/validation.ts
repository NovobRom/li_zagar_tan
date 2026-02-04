import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const fileUploadSchema = z.object({
    file: z.instanceof(File, { message: 'File is required' })
        .refine((file) => file.size <= 10 * 1024 * 1024, 'File size must be less than 10MB') // 10MB
        .refine(
            (file) => ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type),
            'Only .jpg, .png, .webp, and .gif formats are supported'
        ),
});

export const settingsSchema = z.object({
    galleryTitleRu: z.string().min(1, 'Gallery title (RU) is required'),
    galleryTitleEn: z.string().min(1, 'Gallery title (EN) is required'),
    galleryTitleLt: z.string().min(1, 'Gallery title (LT) is required'),
    yearsExperienceRu: z.string().min(1, 'Years experience text (RU) is required'),
    yearsExperienceEn: z.string().min(1, 'Years experience text (EN) is required'),
    yearsExperienceLt: z.string().min(1, 'Years experience text (LT) is required'),
});
