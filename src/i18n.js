import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import common_ar from "./locales/ar.json";
import common_en from "./locales/en.json";
import common_tr from "./locales/tr.json";

const resources = {
  en: {
    translation: common_en,
  },
  ar: {
    translation: common_ar,
  },
  tr: {
    translation: common_tr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  // for all options read: https://www.i18next.com/overview/configuration-options

  .init({
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      wait: true,
    },
    resources,
  });

export default i18n;