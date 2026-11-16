import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '../components/common/LocalizedLink';
import { breadcrumbSchema, webPageSchema } from '../utils/jsonld';

const NotFoundPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-brand-cream">
      <Helmet>
        {/* 品牌名由 Layout 的 titleTemplate 统一追加 */}
                <title>{isZh ? '页面未找到 (404)' : 'Page Not Found (404)'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta name="robots" content="noindex, follow" />
        <meta
          name="description"
          content={
            isZh
              ? '抱歉，您访问的页面不存在或已被移除。返回跨客食品官网首页继续浏览。'
              : 'The page you are looking for does not exist or has been moved. Return to the Quark Dairy homepage to continue browsing.'
          }
        />
        {seoLinkTags(`/`, isZh)}
        <meta property="og:title" content={isZh ? '页面未找到 | 跨客食品' : 'Page Not Found | Quark Dairy'} />
        {/* JSON-LD: WebPage + Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify([
            webPageSchema({
              path: '/',
              name: isZh ? '页面未找到' : 'Page Not Found',
              description: isZh ? '您访问的页面不存在。' : 'Page not found.',
              inLanguage: isZh ? 'zh' : 'en',
            }),
            breadcrumbSchema([
              { name: isZh ? '首页' : 'Home', url: '/' },
              { name: isZh ? '404' : '404', url: '/404' },
            ]),
          ])}
        </script>
      </Helmet>

      <div className="container-custom section-padding text-center max-w-2xl mx-auto py-20">
        <div className="mb-6">
          <span className="inline-block text-[120px] md:text-[160px] font-bold leading-none text-brand-green/15 select-none">
            404
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
          {isZh ? '页面未找到' : 'Page not found'}
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-8">
          {isZh
            ? '抱歉，您访问的页面不存在或已被移除。您可以通过下方链接继续浏览网站。'
            : "Sorry, the page you are looking for doesn't exist or has been moved. You can continue browsing using the links below."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <LocalizedLink
            to="/"
            className="btn-primary"
          >
            {isZh ? '返回首页' : 'Back to Home'}
          </LocalizedLink>
          <LocalizedLink
            to="/products"
            className="btn-outline"
          >
            {isZh ? '浏览产品' : 'Browse Products'}
          </LocalizedLink>
          <LocalizedLink
            to="/contact"
            className="btn-outline"
          >
            {isZh ? '联系我们' : 'Contact Us'}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
