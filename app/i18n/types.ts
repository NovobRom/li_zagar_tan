export interface Review {
  name: string;
  rating: number;
  text: string;
}

export interface ServiceTranslation {
  name: string;
  description: string;
  price: number;
  duration: string;
}

export interface SafetyPoint {
  title: string;
  text: string;
}

export interface Translations {
  nav: {
    about: string;
    gallery: string;
    safety: string;
    preparation: string;
    training: string;
    pricing: string;
    reviews: string;
    booking: string;
  };
  common: {
    bookNow: string;
    learnMore: string;
    address: string;
    instagram: string;
    rating: string;
    fullBody: string;
    legsOnly: string;
    minutes: string;
  };
  hero: {
    title: string;
    subtitle: string;
    features: {
      duration: string;
      professional: string;
      natural: string;
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    beforeAfter: string;
    loading: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    services: {
      fullBody: ServiceTranslation;
      legs: ServiceTranslation;
      contouring: ServiceTranslation;
      bioPeeling: ServiceTranslation;
    };
    popular: string;
    homeService: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    reviewsList: Review[];
    viewAll: string;
  };
  booking: {
    title: string;
    subtitle: string;
    cta: string;
    note: string;
  };
  footer: {
    brand: string;
    tagline: string;
    contact: string;
    followUs: string;
    rights: string;
    workingHours: string;
    byAppointment: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    procedureDescription: string;
    experience: string;
    experienceYears: string;
    clients: string;
    clientsCount: string;
    certifications: string;
    certificationsCount: string;
    qualities: {
      professional: string;
      individual: string;
      quality: string;
    };
  };
  safety: {
    title: string;
    intro: string;
    points: SafetyPoint[];
  };
  preparation: {
    title: string;
    beforeTitle: string;
    beforeItems: string[];
    afterTitle: string;
    afterItems: string[];
  };
  training: {
    title: string;
    intro: string;
    courseDescription: string;
    courseItems: string[];
    outro: string;
    closingNote: string;
    cta: string;
  };
  cookieConsent: {
    message: string;
    accept: string;
    decline: string;
  };
}
