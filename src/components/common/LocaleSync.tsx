import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isZhPath } from '../../utils/locale';

/**
 * 让语言与 URL 保持同步。
 *
 * i18n 初始化时已按当前 URL 设好初始语言（见 src/i18n/index.ts），
 * 这里负责处理 SPA 内部导航（点语言按钮、点内部链接）后的语言切换，
 * 并同步 <html lang>。
 */
const LocaleSync: React.FC = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = isZhPath(location.pathname) ? 'zh' : 'en';
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [location.pathname, i18n]);

  return null;
};

export default LocaleSync;
