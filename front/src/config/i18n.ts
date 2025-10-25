
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const base = import.meta.env.BASE_URL || '/';

i18n
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'uk',
        supportedLngs: ['uk', 'en'],
        debug: true,

        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },

        interpolation: {
            escapeValue: false,
        },

        backend: {

            loadPath: `${base}locales/{{lng}}/{{ns}}.json`,
        },


        react: {
            useSuspense: true
        }
    });

export default i18n;