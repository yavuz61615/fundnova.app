import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { tr, en, ar, fr, ms, ru, ur } from './locales.js';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
      ar: { translation: ar },
      fr: { translation: fr },
      ms: { translation: ms },
      ru: { translation: ru },
      ur: { translation: ur },
    },
    fallbackLng: 'tr',
    interpolation: { escapeValue: false },
  });

export default i18n;
