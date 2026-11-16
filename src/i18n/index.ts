import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh from './zh.json';

/**
 * 语言由 URL 决定（/zh/* = 中文，其余 = 英文）。
 *
 * 这里刻意**不再使用** i18next-browser-languagedetector：
 * 它的 detection 会读浏览器语言和 localStorage，
 * 会造成「访问 /products 却显示中文」这类错位，
 * 而 SEO 要求 URL 与语言严格一一对应。
 * 初始化时直接读 pathname；SPA 内部导航后的语言切换由 <LocaleSync /> 负责。
 */
const initialLng =
  typeof window !== 'undefined' && window.location.pathname.startsWith('/zh') ? 'zh' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
    },
    fallbackLng: 'en',
    lng: initialLng,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
