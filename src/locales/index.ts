import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
//import LanguageDetector from "i18next-browser-languagedetector";
import en from './languages/en_US.json';
import cn from './languages/zh_CN.json';

const resources = {
  cn: {
    translation: cn,
  },
  en: {
    translation: en,
  },
};

const lng = localStorage.getItem('i18nextLng') || 'zh_cn';
i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'cn',
  lng: lng,
});

export default i18n;
