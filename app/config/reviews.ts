// Данные с Treatwell — при росте числа отзывов обновлять только этот файл
export const TREATWELL_RATING = '4.9';
export const TREATWELL_REVIEW_COUNT = '100+'; // для отображения на сайте
export const TREATWELL_REVIEW_COUNT_SCHEMA = '100'; // для schema.org (только число, без «+»)

export function formatRating(template: string): string {
  return template
    .replace('{rating}', TREATWELL_RATING)
    .replace('{count}', TREATWELL_REVIEW_COUNT);
}
