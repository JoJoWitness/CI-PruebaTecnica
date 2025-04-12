import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import esTranslation from "./languages/es.json";
import enTranslation from "./languages/en.json";

const resources = {
  en: {
    translation: enTranslation
  },
  es: {
    translation: esTranslation
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "es", 
    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;