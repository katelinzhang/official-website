import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import { getCaseById } from '../data/cases';
import { products } from '../data/products';
import { articleSchema, breadcrumbSchema } from '../utils/jsonld';
import InquiryForm from '../components/common/InquiryForm';
import LocalizedLink from '../components/common/LocalizedLink';

const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  const appCase = getCaseById(id || '');

  if (!appCase) {
    return (
      <div className="container-custom section-padding text-center">
        <Helmet>
          <title>{isZh ? '未找到该案例' : 'Case Study Not Found'}</title>
          <html lang={isZh ? 'zh-CN' : 'en'} />
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href="https://www.quarkdairy.cn/solutions" />
        </Helmet>
        <h1 className="text-2xl font-bold text-brand-green mb-4">
          {isZh ? '未找到该案例' : 'Case study not found'}
        </h1>
        <LocalizedLink to="/solutions" className="btn-primary">
          {isZh ? '返回定制方案' : 'Back to Solutions'}
        </LocalizedLink>
      </div>
    );
  }

  const caseTitle = isZh ? appCase.title_zh : appCase.title_en;
  const caseSummary = isZh ? appCase.summary_zh : appCase.summary_en;
  const ogImage = appCase.hero_image.startsWith('http')
    ? appCase.hero_image
    : `https://www.quarkdairy.cn${appCase.hero_image}`;

  const relatedProducts = appCase.relatedProductIds
    .map((pid) => products.find((p) => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <Helmet>
        <title>{caseTitle}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta name="description" content={caseSummary} />
        <meta
          name="keywords"
          content={
            isZh
              ? `${caseTitle},${isZh ? appCase.category_zh : appCase.category_en},B2B 应用案例,食品原料应用,定制研发`
              : `${caseTitle},${appCase.category_en},B2B case study,food ingredients application,custom R&D`
          }
        />
        {seoLinkTags(`/cases/${appCase.id}`, isZh)}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={caseTitle} />
        <meta property="og:description" content={caseSummary} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={caseTitle} />
        <meta name="twitter:description" content={caseSummary} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD: Article + Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify([
            breadcrumbSchema([
              { name: isZh ? '首页' : 'Home', url: '/' },
              { name: isZh ? '定制方案' : 'Solutions', url: '/solutions' },
              { name: caseTitle, url: `/cases/${appCase.id}` },
            ]),
            articleSchema({
              id: appCase.id,
              headline: caseTitle,
              description: caseSummary,
              imageUrl: ogImage,
              inLanguage: isZh ? 'zh' : 'en',
            }),
          ])}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="gradient-hero text-white">
        <div className="container-custom section-padding !py-12 md:!py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <LocalizedLink to="/" className="hover:text-white">{t('nav.home')}</LocalizedLink>
            <span>/</span>
            <LocalizedLink to="/solutions" className="hover:text-white">{t('nav.solutions')}</LocalizedLink>
            <span>/</span>
            <span className="text-brand-green/70">{isZh ? appCase.title_zh : appCase.title_en}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-brand-support-green/10 text-brand-support-green rounded-full text-sm font-medium">
                  {isZh ? appCase.category_zh : appCase.category_en}
                </span>
                <span className="px-3 py-1 bg-white/10 text-gray-200 rounded-full text-sm font-medium">
                  {appCase.years}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-5">
                {isZh ? appCase.title_zh : appCase.title_en}
              </h1>
              <p className="text-gray-400 leading-relaxed mb-6">
                {isZh ? appCase.summary_zh : appCase.summary_en}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {appCase.highlights.map((h, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-500 mb-1">{isZh ? h.label_zh : h.label_en}</p>
                    <p className="text-sm font-semibold text-brand-green">{isZh ? h.value_zh : h.value_en}</p>
                  </div>
                ))}
              </div>
            </div>
            <img
              src={appCase.hero_image}
              alt={isZh ? appCase.title_zh : appCase.title_en}
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Case body */}
      <section className="section-cream">
        <div className="container-custom section-padding !py-12 md:!py-16">
          <div className="max-w-4xl mx-auto space-y-8">
            {appCase.sections.map((sec, idx) => (
              <div key={idx} className="card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-brand-green text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <h2 className="text-xl font-bold text-brand-green">
                    {isZh ? sec.heading_zh : sec.heading_en}
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {isZh ? sec.body_zh : sec.body_en}
                </p>
              </div>
            ))}
          </div>

          {/* Gallery */}
          {appCase.gallery.length > 1 && (
            <div className="max-w-4xl mx-auto mt-12">
              <h3 className="text-lg font-bold text-brand-green mb-4">
                {isZh ? '案例图集' : 'Case Gallery'}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {appCase.gallery.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${isZh ? appCase.title_zh : appCase.title_en} ${idx + 2}`}
                    className="w-full aspect-[4/3] object-cover rounded-2xl shadow-sm"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-green-tint">
          <div className="container-custom section-padding !py-12 md:!py-16">
            <h2 className="text-2xl font-bold text-brand-green text-center mb-8">
              {isZh ? '相关产品' : 'Related Products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedProducts.map((p) => (
                <LocalizedLink
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="card card-hover overflow-hidden group block"
                >
                  <img
                    src={p.image_url}
                    alt={isZh ? p.name_zh : p.name_en}
                    className="w-full aspect-[4/3] object-cover"
                    loading="lazy"
                  />
                  <div className="p-5">
                    <h3 className="font-bold text-brand-green group-hover:text-brand-orange transition-colors">
                      {isZh ? p.name_zh : p.name_en}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {isZh ? p.short_desc_zh : p.short_desc_en}
                    </p>
                  </div>
                </LocalizedLink>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry */}
      <section className="section-cream">
        <div className="container-custom section-padding !py-12 md:!py-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-brand-green text-center mb-2">
              {isZh ? '对该应用案例感兴趣？' : 'Interested in this application?'}
            </h2>
            <p className="text-gray-500 text-center mb-8">
              {isZh ? '告诉我们您的需求，我们的应用团队将为您提供同类方案。' : 'Tell us about your needs and our application team will tailor a similar solution for you.'}
            </p>
            <div className="card p-6 md:p-8">
              <InquiryForm
                compact
                prefilledProduct={isZh ? appCase.title_zh : appCase.title_en}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseDetailPage;
