export const ru = {
  // Common
  common: {
    bookNow: 'Записаться',
    learnMore: 'Подробнее',
    address: 'A. Goštauto g. 8-211, Vilnius',
    instagram: '@li_zagar_tan',
    rating: '4.9 ★ из 73 отзывов',
    fullBody: 'Всё тело',
    legsOnly: 'Только ноги',
    minutes: 'мин',
  },

  // Hero Section
  hero: {
    title: 'Идеальный загар за 30 минут',
    subtitle: 'Безопасный, натуральный и стойкий моментальный загар в Вильнюсе',
    features: {
      duration: 'Эффект 7-10 дней',
      professional: 'Профессиональные продукты',
      natural: 'Натуральный оттенок',
    },
  },

  // Gallery Section
  gallery: {
    title: 'Наши работы',
    subtitle: 'Результаты, которые говорят сами за себя',
    beforeAfter: 'До / После',
  },

  // Pricing Section
  pricing: {
    title: 'Цены на услуги',
    subtitle: 'Прозрачные цены без скрытых платежей',
    services: {
      fullBody: {
        name: 'Моментальный загар на всё тело',
        description: 'Равномерный, натуральный загар на всё тело',
        price: '40€',
        duration: '30 мин',
      },
      legs: {
        name: 'Моментальный загар только ноги',
        description: 'Идеально для лета и особых случаев',
        price: '20€',
        duration: '20 мин',
      },
      bioPeeling: {
        name: 'Биопилинг',
        description: 'Подготовит кожу к идеальному загару',
        price: '5€',
        duration: '5 мин',
      },
    },
    popular: 'Популярное',
  },

  // Reviews Section
  reviews: {
    title: 'Отзывы клиентов',
    subtitle: 'Что говорят наши клиенты',
    reviewsList: [
      {
        name: 'Анна К.',
        rating: 5,
        text: 'Потрясающий результат! Загар выглядит очень натурально, никто не поверил, что это спрей. Рекомендую!',
      },
      {
        name: 'Мария С.',
        rating: 5,
        text: 'Очень приятная атмосфера и профессиональный сервис. Загар держался 9 дней. Обязательно вернусь!',
      },
      {
        name: 'Екатерина В.',
        rating: 5,
        text: 'Идеальный оттенок для моего типа кожи. Мастер очень внимательная и всё объясняет про уход.',
      },
    ],
    viewAll: 'Все отзывы на Treatwell',
  },

  // Booking Section
  booking: {
    title: 'Готова сиять?',
    subtitle: 'Запишись сейчас и наслаждайся идеальным загаром!',
    cta: 'Записаться через Treatwell',
    note: 'Быстрое и удобное бронирование',
  },

  // Footer
  footer: {
    brand: 'li_zagar_tan',
    tagline: 'Идеальный загар в Вильнюсе',
    contact: 'Контакты',
    followUs: 'Подписывайтесь',
    rights: 'Все права защищены',
    workingHours: 'Часы работы',
    byAppointment: 'По предварительной записи',
  },
} as const;
