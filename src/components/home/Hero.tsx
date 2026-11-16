import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ProductCategory } from '../../types/product';
import { products } from '../../data/products';
import { categoryIcons } from '../common/Icons';
import { localizePath } from '../../utils/locale';

const allCategories: ProductCategory[] = [
  'dairy', 'plant-extract', 'beverage-syrup', 'fruit-jam', 'savory', 'custom-solution',
];

interface HeroProps {
  onWatchVideo?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onWatchVideo }) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const doSearch = () => {
    if (query.trim()) {
      navigate(localizePath(`/products?q=${encodeURIComponent(query.trim())}`, isZh));
      setFocused(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch();
  };

  const handleCategoryClick = (cat: ProductCategory) => {
    navigate(localizePath(`/products?category=${cat}`, isZh));
    setFocused(false);
  };

  // Real-time search suggestions
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return products
      .filter((p) => {
        const haystack = [
          p.name_en,
          p.name_zh,
          p.short_desc_en,
          p.short_desc_zh,
          ...p.application_tags,
          p.category,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 5);
  }, [query]);

  return (
    <section className="relative z-10 gradient-hero">
      {/* Hero background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url('/images/homepage-hero.webp')` }}
      />
      
      {/* Subtle geometric accents — wrapped in overflow-hidden clip */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-30%] right-[-15%] w-[600px] h-[600px] rounded-full
                        bg-brand-support-green/5 border border-brand-support-green/10" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full
                        bg-brand-orange/5 border border-brand-orange/10" />
      </div>

      {/* Decorative flowing curves */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <path d="M-100 280 Q 200 120 500 250 T 1100 200 T 1600 260" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1.2" />
        <path d="M-100 340 Q 300 200 600 320 T 1300 280" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
        <path d="M200 500 Q 500 320 800 420 T 1600 350" fill="none" stroke="rgba(115,184,57,0.06)" strokeWidth="1" />
      </svg>

      <div className="container-custom section-padding relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* 首屏 H1 —— 遵守项目「B2B 高端视觉风格纪律」：
              禁用 font-extrabold / text-5xl 等 D2C 营销感样式，
              字重封顶 font-bold，字号封顶 text-4xl。
              高级感靠留白与字距，不靠堆字号。*/}
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4 leading-[1.15] tracking-tight text-balance">
            {t('hero.title')}
          </h1>

          {/* Search + QR code + Dropdown */}
          <div ref={containerRef} className={`relative mt-6 md:mt-10 transition-all duration-500 ${focused ? 'mb-28' : 'mb-8'}`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-5">
              {/* Search form (dropdown anchors to this wrapper) */}
              <div className="relative flex-1 min-w-0">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    {/* Search icon */}
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onFocus={() => setFocused(true)}
                      placeholder={t('hero.search_placeholder')}
                      className="w-full pl-12 pr-32 py-4 bg-white border-0 rounded-xl text-base
                                 shadow-2xl shadow-black/20 focus:outline-none focus:border-brand-orange
                                 focus:shadow-[0_0_0_3px_rgba(255,149,54,0.12)]
                                 placeholder:text-gray-500 transition-all duration-300"
                    />

                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 text-white
                                 font-semibold rounded-xl transition-all duration-200 ease-out text-sm
                                 bg-gradient-to-b from-[#FFA040] to-brand-orange
                                 shadow-[0_4px_14px_rgba(255,149,54,0.25)]
                                 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,149,54,0.35)]
                                 active:scale-[0.97]"
                    >
                      {isZh ? '搜索' : 'Search'}
                    </button>
                  </div>
                </form>

                {/* Dropdown panel */}
                <div
                  className={`absolute left-0 right-0 top-full mt-3 bg-white/97 backdrop-blur-xl
                              rounded-2xl shadow-2xl shadow-black/15 border border-brand-support-green/10
                              overflow-hidden transition-all duration-300 origin-top z-20
                              ${focused ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 translate-y-2 pointer-events-none'}`}
                >
                  <div className="p-5">
                    {query.trim() ? (
                      <>
                        {/* Search suggestions */}
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
                            {isZh ? '搜索结果' : 'Search Results'}
                            <span className="ml-2 text-gray-500 font-normal normal-case">
                              ({isZh ? `${suggestions.length} 个匹配` : `${suggestions.length} match${suggestions.length !== 1 ? 'es' : ''}`})
                            </span>
                          </p>
                          {suggestions.length > 0 ? (
                            <div className="space-y-1.5">
                              {suggestions.map((p) => (
                                <button
                                  key={p.id}
                                  type="button"
                                  onClick={() => {
                                    navigate(localizePath(`/products/${p.id}`, isZh));
                                    setFocused(false);
                                    setQuery('');
                                  }}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                                             hover:bg-brand-cream transition-colors text-left group"
                                >
                                  <span className="w-9 h-9 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                    <img
                                      src={p.image_url}
                                      alt={isZh ? p.name_zh : p.name_en}
                                      className="w-full h-full object-cover"
                                      loading="lazy"
                                    />
                                  </span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-brand-green truncate group-hover:text-brand-orange transition-colors">
                                      {isZh ? p.name_zh : p.name_en}
                                    </p>
                                    <p className="text-[11px] text-gray-500 truncate">
                                      {isZh ? p.short_desc_zh : p.short_desc_en}
                                    </p>
                                  </div>
                                  <span className="text-[10px] text-gray-400 flex-shrink-0">
                                    {t(`categories.${p.category}`)}
                                  </span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 py-4 text-center">
                              {isZh ? '未找到匹配的产品' : 'No matching products found'}
                            </p>
                          )}
                        </div>
                        {/* View all results link */}
                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={doSearch}
                            className="text-xs text-brand-green/70 hover:text-brand-orange hover:underline font-medium transition-colors duration-200"
                          >
                            {isZh ? `在产品页查看完整结果 →` : `View all results on Products page →`}
                          </button>
                          <span className="text-[10px] text-gray-500">
                            {isZh ? '按回车搜索' : 'Press Enter to search'}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Category shortcuts (shown when no query) */}
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-xs font-semibold text-brand-green uppercase tracking-wider">
                            {t('hero.hot_categories')}
                          </p>
                          <span className="text-[10px] text-gray-500">
                            {isZh ? '点击标签快速跳转' : 'Click a tag to browse'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {allCategories.map((cat) => {
                            const Icon = categoryIcons[cat];
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => handleCategoryClick(cat)}
                                className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                                           bg-brand-cream hover:bg-brand-support-green/10
                                           border border-transparent hover:border-brand-support-green/20
                                           transition-all duration-200 text-left group"
                              >
                                <span className="w-8 h-8 rounded-lg bg-brand-support-green/10 flex items-center justify-center
                                                 group-hover:bg-brand-support-green/20 transition-colors">
                                  <Icon className="w-4 h-4 text-brand-support-green" />
                                </span>
                                <span className="text-sm font-medium text-brand-green">
                                  {t(`categories.${cat}`)}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2 text-[11px] text-gray-500">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{isZh ? '输入产品名称、品类或应用场景后实时预览' : 'Type a product name, category, or application for live results'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 微信公众号二维码 —— 仅中文版显示。
                实测（iPhone SE 375x667）：移动端布局为 flex-col，二维码排在
                搜索框正下方，112px 宽的码在首屏里占掉约 1/3 宽度，把
                「Our Core Business Lines」整个挤出首屏。
                而站点默认语言是 EN（面向海外买家），微信二维码对他们是纯噪音，
                却占着首屏最宝贵的位置。
                故仅中文版保留；Contact 页两种语言都提供该入口，功能路径不丢失。*/}
              {isZh && (
                <div className="mx-auto md:mx-0 flex-shrink-0 rounded-xl bg-white p-1.5 shadow-xl shadow-black/30 ring-1 ring-white/20">
                  <img
                    src="/images/qrcode-wechat-account.webp"
                    alt={t('hero.qr_alt')}
                    className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Watch Video button */}
            {onWatchVideo && (
              <button
                type="button"
                onClick={onWatchVideo}
                className="group inline-flex items-center gap-2.5 mt-6 px-5 py-2.5
                           bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30
                           rounded-full text-white/80 hover:text-white text-sm font-medium
                           backdrop-blur-sm transition-all duration-300"
              >
                <span className="w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center
                                 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <span>{t('hero.watch_video')}</span>
              </button>
            )}
          </div>
      </div>
    </section>
  );
};

export default Hero;
