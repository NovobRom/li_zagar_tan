import { lt } from './translations/lt';
import { ru } from './translations/ru';
import { en } from './translations/en';

export type Language = 'lt' | 'ru' | 'en';
export type Translations = typeof lt;

export const translations: Record<Language, Translations> = {
  lt,
  ru,
  en,
};

export const languages: { code: Language; name: string }[] = [
  { code: 'lt', name: 'LT' },
  { code: 'ru', name: 'RU' },
  { code: 'en', name: 'EN' },
];

export { lt, ru, en };
