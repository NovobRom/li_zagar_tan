export const lt = {
  // Common
  common: {
    bookNow: 'Užsisakyti laiką',
    learnMore: 'Sužinoti daugiau',
    address: 'A. Goštauto g. 8-211, Vilnius',
    instagram: '@li_zagar_tan',
    rating: '4.9 ★ iš 73 atsiliepimų',
    fullBody: 'Visas kūnas',
    legsOnly: 'Tik kojos',
    minutes: 'min',
  },

  // Hero Section
  hero: {
    title: 'Tobulas įdegis per 30 minučių',
    subtitle: 'Saugus, natūralus ir ilgalaikis purškiamas įdegis Vilniuje',
    features: {
      duration: 'Efektas 7-10 dienų',
      professional: 'Profesionalūs produktai',
      natural: 'Natūralus atspalvis',
    },
  },

  // Gallery Section
  gallery: {
    title: 'Mūsų darbai',
    subtitle: 'Rezultatai, kurie kalba patys už save',
    beforeAfter: 'Prieš / Po',
  },

  // Pricing Section
  pricing: {
    title: 'Paslaugų kainos',
    subtitle: 'Skaidrūs įkainiai be paslėptų mokesčių',
    services: {
      fullBody: {
        name: 'Purškiamas įdegis visam kūnui',
        description: 'Tolygus, natūralus įdegis visam kūnui',
        price: '40€',
        duration: '30 min',
      },
      legs: {
        name: 'Purškiamas įdegis kojoms',
        description: 'Idealus vasarai ir specialioms progoms',
        price: '20€',
        duration: '20 min',
      },
      bioPeeling: {
        name: 'Biopilingas',
        description: 'Paruošia odą tobulam įdegiui',
        price: '5€',
        duration: '5 min',
      },
    },
    popular: 'Populiariausias',
  },

  // Reviews Section
  reviews: {
    title: 'Klientų atsiliepimai',
    subtitle: 'Ką sako mūsų klientai',
    reviewsList: [
      {
        name: 'Greta M.',
        rating: 5,
        text: 'Nuostabus rezultatas! Įdegis atrodo labai natūraliai, niekas nepatikėjo, kad tai purškiamas. Rekomenduoju!',
      },
      {
        name: 'Ieva K.',
        rating: 5,
        text: 'Labai maloni aplinka ir profesionali paslauga. Įdegis laikėsi 9 dienas. Tikrai grįšiu!',
      },
      {
        name: 'Austėja R.',
        rating: 5,
        text: 'Idealus atspalvis mano odos tipui. Meistrė labai atidi ir paaiškina viską apie priežiūrą.',
      },
    ],
    viewAll: 'Visi atsiliepimai Treatwell',
  },

  // Booking Section
  booking: {
    title: 'Pasiruošusi spinduliuoti?',
    subtitle: 'Užsisakyk vizitą dabar ir mėgaukis tobulu įdegiu!',
    cta: 'Registruotis per Treatwell',
    note: 'Greitas ir paprastas rezervavimas',
  },

  // Footer
  footer: {
    brand: 'li_zagar_tan',
    tagline: 'Tobulas įdegis Vilniuje',
    contact: 'Kontaktai',
    followUs: 'Sekite mus',
    rights: 'Visos teisės saugomos',
    workingHours: 'Darbo laikas',
    byAppointment: 'Pagal išankstinę registraciją',
  },
} as const;
