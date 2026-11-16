import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import { FlaskIcon } from '../components/common/Icons';
import LocalizedLink from '../components/common/LocalizedLink';
import { localizePath } from '../utils/locale';

const CustomSolutionsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // 5 步流程（杂志风：每步配图，desktop 交错布局）
  const flowSteps = [
    {
      step: 1,
      img: '/images/custom-solutions/flow-1-analysis.jpg',
    },
    {
      step: 2,
      img: '/images/custom-solutions/flow-2-lab.jpg',
    },
    {
      step: 3,
      img: '/images/custom-solutions/flow-3-approval.jpg',
    },
    {
      step: 4,
      img: '/images/custom-solutions/flow-4-production.jpg',
    },
    {
      step: 5,
      img: '/images/custom-solutions/flow-5-delivery.jpg',
    },
  ];

  // 3 个 Custom Dimensions 卡片（图 + 序号 + 标签）
  const dimensions = [
    {
      idx: '01',
      img: '/images/products/custom-bakery.jpg',
      key: 'flavor',
      tags: ['Beverage', 'Sauce', 'Bakery', 'Confectionery'],
    },
    {
      idx: '02',
      img: '/images/products/custom-tea-coffee.jpg',
      key: 'concentration',
      tags: ['Syrup', 'Extract', 'Sauce', 'Jam'],
    },
    {
      idx: '03',
      img: '/images/products/custom-ice-cream.webp',
      key: 'oem',
      tags: ['Private Label', 'Retail', 'Food Service', 'Export'],
    },
  ];

  const faqs = [
    { q: 'faq1_q', a: 'faq1_a' },
    { q: 'faq2_q', a: 'faq2_a' },
    { q: 'faq3_q', a: 'faq3_a' },
    { q: 'faq4_q', a: 'faq4_a' },
  ];

  return (
    <div>
      <Helmet>
        <title>{isZh ? '定制研发方案：烘焙、茶饮、冰淇淋' : 'Custom R&D Solutions: Bakery, Tea Beverage & Ice Cream'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? '为全球食品饮料品牌提供端到端定制研发：烘焙原料包、茶饮咖啡研发、冰淇淋乳品基底。4–12 周从概念到量产。'
              : 'End-to-end custom R&D for global F&B brands — bakery ingredient kits, tea & coffee beverage development, ice cream dairy bases. Concept-to-production in 4–12 weeks.'
          }
        />
        <meta
          name="keywords"
          content={
            isZh
              ? '定制研发,烘焙方案,茶饮研发,冰淇淋基底,OEM 代工,B2B 食品原料解决方案'
              : 'custom food R&D, bakery solution, tea beverage development, ice cream base, OEM food manufacturing, B2B ingredient solutions'
          }
        />
        {seoLinkTags(`/solutions`, isZh)}
        <meta property="og:title" content={isZh ? '定制研发方案 | 跨客食品' : 'Custom R&D Solutions for F&B Brands | Quark Dairy'} />
        <meta property="og:description" content={isZh ? '烘焙、茶饮、冰淇淋定制方案，4–12 周从概念到量产。' : 'Bakery, tea & coffee beverage, ice cream custom solutions — from concept to production in 4–12 weeks.'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content={isZh ? '定制研发方案 | 跨客食品' : 'Custom R&D Solutions | Quark Dairy'} />
        <meta name="twitter:description" content={isZh ? '端到端烘焙、茶饮、冰淇淋原料解决方案。' : 'End-to-end ingredient solutions for bakery, tea beverage and ice cream brands.'} />

        {/* JSON-LD: Service + FAQ Schema (Google Rich Results) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                '@id': 'https://www.quarkdairy.cn/solutions#service',
                name: isZh ? '跨客食品定制研发服务' : 'Quark Dairy Custom R&D Service',
                description: isZh
                  ? '为全球食品饮料品牌提供端到端定制研发：烘焙、茶饮、冰淇淋及咸味原料。'
                  : 'End-to-end custom R&D for global F&B brands — bakery, tea & coffee beverage, ice cream and savory ingredients.',
                provider: { '@id': 'https://www.quarkdairy.cn/#organization' },
                serviceType: isZh ? '食品原料定制研发与 OEM 代工' : 'Food Ingredient Custom R&D and OEM Manufacturing',
                areaServed: 'Worldwide',
                availableLanguage: ['English', 'Chinese'],
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.quarkdairy.cn/solutions#faq',
                mainEntity: faqs.map((f) => ({
                  '@type': 'Question',
                  name: t(`solutions.${f.q}`),
                  acceptedAnswer: { '@type': 'Answer', text: t(`solutions.${f.a}`) },
                })),
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: t('nav.home'), item: 'https://www.quarkdairy.cn/' },
                  { '@type': 'ListItem', position: 2, name: t('nav.solutions'), item: 'https://www.quarkdairy.cn/solutions' },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero —— 背景图叠加杂志风 */}
      <section className="relative overflow-hidden bg-brand-green text-white">
        <div className="absolute inset-0">
          <img
            src="/images/custom-solutions/hero-lab.jpg"
            alt={t('solutions.hero_image_alt')}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green/95 via-brand-green/80 to-brand-green/30" />
        </div>
        <div className="relative container-custom section-padding">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm mb-6">
            <FlaskIcon className="w-4 h-4 text-brand-support-green" />
            <span className="text-white/90">{t('solutions.hero_eyebrow')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl">{t('solutions.title')}</h1>
          <p className="text-lg text-white/80 max-w-2xl leading-relaxed">{t('solutions.subtitle')}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate(localizePath('/contact', isZh))}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold rounded-full transition-all shadow-lg shadow-brand-orange/30"
            >
              {t('solutions.cta_button')}
              <span aria-hidden>→</span>
            </button>
            <a
              href="#workflow"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 backdrop-blur text-white font-semibold rounded-full border border-white/20 transition-all"
            >
              {isZh ? '查看流程' : 'See Workflow'}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Custom Dimensions —— 杂志风卡片 */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <div className="text-center mb-12">
            <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">
              {isZh ? '三大定制维度' : 'Three Dimensions'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mt-2">{t('solutions.custom_dimensions')}</h2>
          </div>
          {/* 每个维度卡加 id，供首页 3 张卡的「直达」链接锚定 —— 原先四个入口
              全指向页首，点击后要手动滚动才能找到对应内容。
              scroll-mt-28 与 html 的 scroll-padding-top 配合，
              跳转后卡片不会被 sticky header 遮住。*/}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dimensions.map((dim) => (
              <article
                key={dim.key}
                id={`dim-${dim.key}`}
                className="group card card-hover overflow-hidden bg-white scroll-mt-28"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={dim.img}
                    alt={t(`solutions.dim_image_alt_${dim.key}`)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-green text-white font-bold text-sm shadow-lg shadow-black/20">
                    {dim.idx}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-green/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-green mb-3">
                    {t(`solutions.dim_${dim.key}`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {t(`solutions.dim_${dim.key}_desc`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {dim.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-brand-cream text-brand-green/80 border border-brand-support-green/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Development Flow Timeline —— 杂志交错布局 */}
      <section id="workflow" className="section-cream">
        <div className="container-custom section-padding">
          <div className="text-center mb-14">
            <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">
              {isZh ? '研发流程' : 'R&D Workflow'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mt-2">{t('solutions.flow_title')}</h2>
            <p className="text-gray-500 text-sm mt-3">
              {isZh
                ? '常规配方调整 2–3 周 · 新概念配方 4–8 周 · 端到端 8–12 周'
                : 'Recipe tweaks 2–3 weeks · New concepts 4–8 weeks · End-to-end 8–12 weeks'}
            </p>
          </div>
          <div className="space-y-12 md:space-y-16">
            {flowSteps.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={item.step}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
                >
                  <div
                    className={`md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                  >
                    <div className="relative aspect-[3/2] overflow-hidden rounded-2xl shadow-lg group">
                      <img
                        src={item.img}
                        alt={t(`solutions.flow_image_alt_${['analysis','lab','approval','production','delivery'][idx]}`)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/95 backdrop-blur text-brand-green font-bold text-lg shadow-lg">
                        {String(item.step).padStart(2, '0')}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`md:col-span-5 ${isEven ? 'md:order-2' : 'md:order-1'}`}
                  >
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-support-green/10 text-brand-support-green font-bold text-sm">
                        STEP {item.step}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-gray-500">
                        / 0{flowSteps.length}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-green mb-3">
                      {t(`solutions.flow_step${item.step}`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`solutions.flow_step${item.step}_desc`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Selected Case Studies —— 升级卡 */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <div className="text-center mb-4">
            <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">
              {isZh ? '精选案例' : 'Selected Cases'}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mt-2">{t('solutions.cases_title')}</h2>
          </div>
          <p className="text-center text-gray-500 text-sm mb-12">{t('solutions.disclaimer')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <article
                key={n}
                className="group card p-6 border-l-4 border-brand-support-green/40 hover:border-brand-support-green hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand-support-green/10 text-brand-support-green font-bold text-sm">
                    {n}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {isZh ? '案例' : 'Case'} {n}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-brand-green mb-3">
                  {t(`solutions.case${n}_title`)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(`solutions.case${n}_desc`)}
                </p>
                <div className="mt-4 pt-4 border-t border-brand-support-green/10 flex items-center gap-1 text-brand-orange text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <LocalizedLink to="/cases" className="hover:underline">
                    {isZh ? '查看更多 →' : 'See more →'}
                  </LocalizedLink>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <div className="text-center mb-12">
            <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-green mt-2">{t('solutions.faq_title')}</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((f, idx) => (
              <div key={f.q} className="card overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-brand-cream/40 transition-colors"
                  aria-expanded={openFaq === idx}
                >
                  <span className="font-semibold text-brand-green flex-1">{t(`solutions.${f.q}`)}</span>
                  <span className={`text-brand-green/45 group-hover:text-brand-orange flex-shrink-0 transition-colors text-xl ${openFaq === idx ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed border-t border-brand-support-green/10 pt-4">
                    {t(`solutions.${f.a}`)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brand-green text-white">
        <div className="container-custom section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('solutions.cta_title')}</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">{t('solutions.cta_subtitle')}</p>
          <button
            type="button"
            onClick={() => navigate(localizePath('/contact', isZh))}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold rounded-full transition-all shadow-lg shadow-brand-orange/30 hover:shadow-xl"
          >
            {t('solutions.cta_button')}
            <span aria-hidden>→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomSolutionsPage;