import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

  import translationEN from './assets/locales/en/en.json'
  import translationES from './assets/locales/es/es.json'
  import translationFR from './assets/locales/fr/fr.json'


i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
        resources: {
    
      en: {
        translation: translationEN
      },
      es: {
        translation: translationES
      },
      fr: {
        translation: translationFR
    }
  }
  });


export default i18n;































// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-http-backend';


// import translationEN from './assets/locales/en/en.json'
// import translationES from './assets/locales/es/es.json'
// import translationFR from './assets/locales/fr/fr.json'

// i18n


//   .use(Backend)

//   .use(LanguageDetector)

//   .use(initReactI18next)

//   .init({
//     debug: true,
//     fallbackLng: 'en',
//     interpolation: {
//       escapeValue: false, 
//     },
//     resources: {
    
//       en: {
//         translation: translationEN
//       },
//       es: {
//         translation: translationES
//       },
//       fr: {
//         translation: translationFR
//     }
//   }
//   });

// export default i18n;