import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Footer from './Footer';
import LocaleSync from '../common/LocaleSync';
import { WHATSAPP_NUMBER } from '../../config';

const Layout: React.FC = () => {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="flex flex-col min-h-screen">
      {/* 路由变化时把语言与 URL 对齐（URL 是语言的唯一真相源） */}
      <LocaleSync />
      {/* 品牌名后缀必须跟着语言走。原先硬编码 "%s | Quark Dairy"，
          导致 54 个中文页的 title 尾部只有英文品牌名，
          用户搜「跨客食品」时完全匹配不上——这是品牌词搜不到的直接原因之一。 */}
      <Helmet
        defaultTitle={isZh ? '跨客食品 | 全球乳品原料与食品配料 B2B 供应商' : 'Quark Dairy | Global Food Ingredients & R&D Solutions'}
        titleTemplate={isZh ? '%s | 跨客食品' : '%s | Quark Dairy'}
      >
        <meta name="author" content={isZh ? '跨客食品科技（上海）有限公司 · Quark Dairy Intelligence Institute' : 'Quark Dairy Intelligence Institute'} />
        <meta
          name="keywords"
          content={isZh
            ? '跨客食品,跨客乳业,乳品原料供应商,食品原料,植物提取物,饮料浓浆,果酱,咸味调味料,定制研发,OEM 代工,清真认证原料'
            : 'Quark Dairy, dairy ingredients supplier, plant extracts, beverage syrups, fruit jams, savory ingredients, food ingredients B2B, custom R&D, OEM food manufacturing, Halal ingredients'}
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:site_name" content={isZh ? '跨客食品' : 'Quark Dairy'} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={isZh ? 'zh_CN' : 'en_US'} />
        <meta property="og:locale:alternate" content={isZh ? 'en_US' : 'zh_CN'} />
        <meta property="og:image" content="https://www.quarkdairy.cn/images/homepage-hero.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isZh ? '跨客食品 | 全球乳品原料与食品配料 B2B 供应商' : 'Quark Dairy | Global Food Ingredients'} />
        <meta
          name="twitter:description"
          content={isZh
            ? '跨客食品：乳制品原料、植物提取物、饮料浓浆、果酱与咸味原料，提供定制研发与 OEM 解决方案。'
            : 'Premium dairy, plant extracts, syrups, jams & savory ingredients with custom R&D and OEM solutions.'}
        />
        <meta name="twitter:image" content="https://www.quarkdairy.cn/images/homepage-hero.webp" />
      </Helmet>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in your food ingredients. Could you share more details?")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-brand-support-green hover:bg-green-600 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default Layout;
