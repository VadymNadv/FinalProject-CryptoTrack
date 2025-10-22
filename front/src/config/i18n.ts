// src/config/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Визначаємо базовий шлях. У режимі розробки це '/', на GitHub Pages - '/repo-name/'
const base = import.meta.env.BASE_URL || '/';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'uk',
        supportedLngs: ['uk', 'en'],
        debug: true, // Залиш debug, щоб бачити помилки завантаження в консолі

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false,
        },

        backend: {
            // 👇 Явно вказуємо шлях, додаючи базовий URL 👇
            // Переконайся, що файли лежать у public/locales/uk/translation.json і т.д.
            loadPath: `${base}locales/{{lng}}/{{ns}}.json`,
        },

        // 👇 Додаємо опцію react, щоб Suspense працював надійніше 👇
        react: {
            useSuspense: true // Явно вказуємо використовувати Suspense
        }
    });

export default i18n;