import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import { breadcrumbSchema, organizationSchema } from '../utils/jsonld';
import { regions } from '../data/solutions';
import type { MarketRegion } from '../types/product';
import CompanyOverview from '../components/about/CompanyOverview';
import CaseCards from '../components/common/CaseCards';

// WeChat articles data
const articles = [
  {
    url: 'https://mp.weixin.qq.com/s/S7Sq0y6SufKR_-d9uIBmxA',
    image: '/images/articles/article-1.jpg',
    title_zh: 'FIC 2026原料趋势大揭秘：你不知道的5个行业秘密',
    title_en: 'FIC 2026 Ingredient Trends: 5 Industry Secrets Revealed',
    date: '2026-03-16',
    desc_zh: '五大原料趋势不可错过，乳品原料如何影响风味、口感与成本。',
    desc_en: 'Five ingredient trends you cannot miss.',
  },
  {
    url: 'https://mp.weixin.qq.com/s/2Gk8_7jLS54w8mQNhfYcmQ',
    image: '/images/articles/article-2.jpg',
    title_zh: '遇见来自东方牧场的乳脂新力量——跨客广交会首秀邀请函！',
    title_en: 'New Dairy Power from the East — Quark Dairy at Canton Fair',
    date: '2026-04-20',
    desc_zh: '跨客食品科技广交会首秀，展示来自东方牧场的乳脂原料。',
    desc_en: 'Quark Dairy\'s debut at Canton Fair, showcasing dairy ingredients from eastern pastures.',
  },
  {
    url: 'https://mp.weixin.qq.com/s/rLEpnV8rzPFbOPZB-qA3NA',
    image: '/images/articles/article-3.jpg',
    title_zh: '在曼谷，重新认识一口奶香的可能性',
    title_en: 'Rediscovering Dairy Possibilities in Bangkok',
    date: '2026-05-12',
    desc_zh: 'THAIFEX 展会回顾，中国乳品原料在东南亚市场的机遇。',
    desc_en: 'THAIFEX recap — opportunities for Chinese dairy in Southeast Asia.',
  },
  {
    url: 'https://mp.weixin.qq.com/s/Mw6PdiG2ubsSs--jUAeNUw',
    image: '/images/articles/article-4.jpg',
    title_zh: '全球乳业人的共同焦虑：下一个十年的"入场券"在哪里？我们在 Gulfood 2026 找到了',
    title_en: 'The Next Decade of Dairy: Insights from Gulfood 2026',
    date: '2026-02-11',
    desc_zh: 'Gulfood 2026 迪拜参展回顾，全球乳业下一个十年的入场券。',
    desc_en: 'Gulfood 2026 Dubai recap — where is dairy heading in the next decade.',
  },
  {
    url: 'https://mp.weixin.qq.com/s/8DtYmM3OExpTFDqUCNFnmA',
    image: '/images/articles/article-5.jpg',
    title_zh: '跨客应邀参加 MnmpX 高端乳品原料发布会',
    title_en: 'Quark Dairy at MnmpX Premium Dairy Ingredients Launch',
    date: '2026-06-17',
    desc_zh: '中国乳业从基础加工走向深加工，用中国资源做好全球市场。',
    desc_en: 'China\'s dairy moving from basic to deep processing for global markets.',
  },
  {
    url: 'https://mp.weixin.qq.com/s/E20BPDiNv5T9RmsNNt_-Yg',
    image: '/images/articles/article-6.jpg',
    title_zh: '伽力森亮相首尔食品展',
    title_en: 'Kerisom at Seoul Food & Hotel 2026',
    date: '2026-06-10',
    desc_zh: '片状黄油、芝士粉等产品亮相韩国，亚洲食品展再下一城。',
    desc_en: 'Laminated butter, cheese powder showcased in Korea.',
  },
];

const isoMap: Record<string, string> = {
  'Thailand': 'th', 'Indonesia': 'id', 'Vietnam': 'vn', 'Philippines': 'ph',
  'Malaysia': 'my', 'Singapore': 'sg', 'UAE': 'ae', 'Saudi Arabia': 'sa',
  'Qatar': 'qa', 'Kuwait': 'kw', 'Oman': 'om', 'India': 'in',
  'Bangladesh': 'bd', 'Pakistan': 'pk', 'Sri Lanka': 'lk', 'United States': 'us',
  'Canada': 'ca', 'Mexico': 'mx',
};

const AboutPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [expandedRegion, setExpandedRegion] = useState<MarketRegion | null>(regions[0].id);
  const [articlePage, setArticlePage] = useState(0);
  const maxArticlePage = articles.length - 3;

  return (
    <div>
      <Helmet>
        {/* 品牌名由 Layout 的 titleTemplate 统一追加，此处不重复写 */}
                <title>{isZh ? '关于我们：全球食品原料供应商' : 'About Us: Global B2B Food Ingredients Supplier'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? '跨客食品（Quark Dairy）为全球食品饮料品牌提供优质乳制品原料、植物提取物与定制研发。40+ SKU，清真认证，OEM 服务。'
              : 'Quark Dairy Intelligence Institute supplies premium dairy ingredients, plant extracts and custom R&D to global F&B brands — with 40+ SKUs, halal certification and OEM service.'
          }
        />
        <meta
          name="keywords"
          content={
            isZh
              ? '跨客食品,关于我们,食品原料公司,B2B 供应商,清真认证,OEM 代工,中国食品原料'
              : 'about Quark Dairy, food ingredients company, B2B supplier profile, halal certified manufacturer, OEM food ingredients China'
          }
        />
        {seoLinkTags(`/about`, isZh)}
        <meta property="og:title" content={isZh ? '关于我们 | 跨客食品' : 'About Quark Dairy | Global Food Ingredients Supplier'} />
        <meta property="og:description" content={isZh ? '全球食品饮料品牌的乳制品、植提与定制研发合作伙伴。' : 'Premium dairy, plant extracts & custom R&D for global F&B brands — 40+ SKUs, halal certified.'} />
        <meta name="twitter:title" content={isZh ? '关于我们 | 跨客食品' : 'About Quark Dairy'} />
        <meta name="twitter:description" content={isZh ? '40+ SKU，清真认证，OEM 服务。' : 'Global B2B food ingredients supplier with custom R&D.'} />

        {/* JSON-LD: Breadcrumb + Organization (About context) */}
        <script type="application/ld+json">
          {JSON.stringify([
            breadcrumbSchema([
              { name: isZh ? '首页' : 'Home', url: '/' },
              { name: isZh ? '关于我们' : 'About', url: '/about' },
            ]),
            organizationSchema(isZh ? 'zh' : 'en'),
          ])}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="gradient-hero text-white">
        <div className="container-custom section-padding text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-base text-white/70 max-w-2xl mx-auto">
            {t('about.company_full_en')} | {t('about.company_full_zh')}
          </p>
        </div>
      </section>

      {/* Company Overview —— 完整公司介绍呈现（克制 B2B 风格） */}
      <CompanyOverview />

      {/* Company Intro */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {t('about.company_intro')}
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  { num: '6', label_en: 'Core Business Lines', label_zh: '核心业务线' },
                  { num: '30+', label_en: 'Countries Served', label_zh: '服务国家' },
                  { num: '10+', label_en: 'Years Experience', label_zh: '行业经验' },
                ].map((stat) => (
                  <div key={stat.num} className="card p-4 text-center">
                    <div className="text-2xl font-bold text-brand-green mb-1">{stat.num}</div>
                    <div className="text-xs text-gray-500">{isZh ? stat.label_zh : stat.label_en}</div>
                  </div>
                ))}
              </div>
            </div>
            <img
              src="/images/homepage-showcase.webp"
              alt={isZh ? '产品原料展示' : 'Product Ingredients Showcase'}
              className="w-full aspect-square object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* WeChat Articles */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          {/* Article Carousel */}
          <div className="relative max-w-5xl mx-auto">
            {/* Left Arrow */}
            <button
              onClick={() => setArticlePage(Math.max(0, articlePage - 1))}
              disabled={articlePage === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-brand-support-green/10 flex items-center justify-center hover:bg-brand-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Cards carousel wrapper — outer padding prevents shadow clipping */}
            <div className="px-3 py-6">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${articlePage * (100 / 3)}%)` }}
              >
                {articles.map((article) => (
                  <a
                    key={article.url}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover overflow-hidden group block w-full md:w-1/3 flex-shrink-0 mx-3"
                  >
                    <img
                      src={article.image}
                      alt={isZh ? article.title_zh : article.title_en}
                      className="aspect-[16/9] object-cover w-full rounded-t-3xl"
                      loading="lazy"
                    />
                    <div className="p-5">
                      <p className="text-[11px] text-gray-500 mb-1.5">{article.date}</p>
                      <h3 className="font-bold text-brand-green text-sm leading-snug mb-2 group-hover:text-brand-orange transition-colors line-clamp-2">
                        {isZh ? article.title_zh : article.title_en}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {isZh ? article.desc_zh : article.desc_en}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => setArticlePage(Math.min(maxArticlePage, articlePage + 1))}
              disabled={articlePage >= maxArticlePage}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-brand-support-green/10 flex items-center justify-center hover:bg-brand-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxArticlePage + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setArticlePage(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === articlePage ? 'bg-brand-orange w-5' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-10">
            <p className="text-xs text-gray-500 mb-3">WeChat ID: Quarkdairy</p>
            <a
              href="https://mp.weixin.qq.com/s/Mw6PdiG2ubsSs--jUAeNUw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-sm"
            >
              {isZh ? '关注公众号' : 'Follow on WeChat'}
            </a>
          </div>
        </div>
      </section>

      {/* R&D Center */}
      <section className="section-green-tint">
        <div className="container-custom section-padding">
          <h2 className="text-3xl font-bold text-brand-green text-center mb-4">{t('about.rd_title')}</h2>
          <p className="text-lg text-gray-500 text-center max-w-3xl mx-auto mb-12">{t('about.rd_desc')}</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 max-w-4xl mx-auto">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className="px-8 py-6 text-center min-w-[180px] rounded-xl
                                bg-gradient-to-b from-[#FFA040] to-brand-orange
                                shadow-[0_6px_20px_rgba(255,149,54,0.35)]
                                hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(255,149,54,0.5)]
                                active:scale-[0.97]
                                transition-all duration-200 ease-out
                                cursor-pointer">
                  <h3 className="font-bold text-white drop-shadow-sm">{t(`about.rd_steps.step${step}`)}</h3>
                </div>
                {step < 3 && (
                  <svg className="w-9 h-9 text-brand-green mx-2 rotate-90 md:rotate-0 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <h2 className="text-3xl font-bold text-brand-green text-center mb-2">{t('about.cases_title')}</h2>
          <p className="text-center text-gray-500 text-sm mb-10">{t('about.cases_note')}</p>
          <CaseCards />
        </div>
      </section>

      {/* Global Markets Detail */}
      <section className="section-orange-tint">
        <div className="container-custom section-padding">
          <h2 className="text-3xl font-bold text-brand-green text-center mb-12">{t('about.markets_detail_title')}</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {regions.map((region) => (
              <div key={region.id} className="card overflow-hidden">
                <button
                  onClick={() => setExpandedRegion(expandedRegion === region.id ? null : region.id)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50/50 transition-colors"
                >
                  <h3 className="font-bold text-brand-green text-base">
                    {t(`regions.${region.id}`)}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-brand-green/50 group-hover:text-brand-orange transition-all duration-200 ${expandedRegion === region.id ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedRegion === region.id && (
                  <div className="px-5 pb-5">
                    <div className="flex flex-wrap gap-2">
                      {region.countries.map((c) => {
                        const iso = isoMap[c.en];
                        return (
                          <span
                            key={c.en}
                            className="inline-flex items-center gap-2 pl-1.5 pr-3 py-1.5 bg-brand-cream rounded-full text-sm text-gray-700 border border-brand-support-green/15 hover:border-brand-orange/40 hover:bg-brand-orange/5 transition-colors"
                          >
                            {iso && (
                              <img
                                src={`/images/flags/${iso}.png`}
                                alt={`${c.en} flag`}
                                className="w-6 h-4 object-contain rounded-sm bg-brand-cream"
                                loading="lazy"
                                decoding="async"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }}
                              />
                            )}
                            <span>{isZh ? c.zh : c.en}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
