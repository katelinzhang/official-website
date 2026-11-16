import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { ProductCategory } from '../types/product';
import { products } from '../data/products';
import { itemListSchema, breadcrumbSchema } from '../utils/jsonld';
import ProductCard from '../components/products/ProductCard';
import ProductFilter from '../components/products/ProductFilter';

const ProductsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [halalOnly, setHalalOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const cat = searchParams.get('category') as ProductCategory | null;
    if (cat) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (halalOnly) {
      result = result.filter((p) => p.isHalal);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter((p) => {
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
      });
    }
    return result;
  }, [selectedCategory, halalOnly, searchQuery]);

  const clearSearch = () => {
    setSearchQuery('');
    const params = new URLSearchParams(searchParams);
    params.delete('q');
    setSearchParams(params, { replace: true });
  };

  return (
    <div className="container-custom section-padding !pt-8 md:!pt-12">
      <Helmet>
        <title>{isZh ? '食品原料目录：乳制品、植提、浓浆、果酱与咸味系列' : 'Food Ingredients Catalog: Dairy, Plant Extracts, Syrups & Jams'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? '40+ 优质食品原料，涵盖 6 大品类：乳制品原料、植物提取物、饮料浓浆、果酱、咸味调味料与定制解决方案。清真认证，支持 OEM 代工。'
              : 'Browse 40+ premium food ingredients across 6 categories: dairy, plant extracts, beverage syrups, fruit jams, savory ingredients & custom solutions. Halal certified, OEM available.'
          }
        />
        <meta
          name="keywords"
          content={
            isZh
              ? '食品原料目录,乳制品原料,植物提取物,饮料浓浆,果酱,咸味调味料,OEM 代工,清真认证'
              : 'food ingredients catalog, dairy ingredients list, plant extracts supplier, beverage syrups wholesale, fruit jam supplier, savory ingredients, OEM food ingredients'
          }
        />
        {seoLinkTags(`/products`, isZh)}
        <meta property="og:title" content={isZh ? '食品原料目录 | 跨客食品' : 'Food Ingredients Catalog | Quark Dairy'} />
        <meta property="og:description" content={isZh ? '6 大品类 40+ 原料：乳制品、植物提取物、浓浆、果酱、咸味与定制方案。' : '40+ ingredients across 6 categories — dairy, plant extracts, syrups, jams, savory & custom solutions.'} />
        <meta name="twitter:title" content={isZh ? '食品原料目录 | 跨客食品' : 'Food Ingredients Catalog | Quark Dairy'} />
        <meta name="twitter:description" content={isZh ? '优质乳制品、植提、浓浆、果酱、咸味原料，全球食品饮料品牌首选。' : 'Premium dairy, plant extracts, syrups, jams & savory ingredients for global F&B brands.'} />

        {/* JSON-LD: ItemList (catalog) + Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify([
            breadcrumbSchema([
              { name: isZh ? '首页' : 'Home', url: '/' },
              { name: isZh ? '产品目录' : 'Products', url: '/products' },
            ]),
            itemListSchema(
              products.map((p, i) => ({
                name: isZh ? p.name_zh : p.name_en,
                url: `/products/${p.id}`,
                image: p.image_url,
                position: i + 1,
              }))
            ),
          ])}
        </script>
      </Helmet>

      <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-2">
        {t('products.title')}
      </h1>
      <p className="text-lg text-gray-600 mb-4">{t('products.subtitle')}</p>

      {/* Product Portfolio Download CTA */}
      <a
        href="/product-portfolio.pdf"
        download="QuarkDairy-Product-Portfolio.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 p-5 rounded-2xl bg-gradient-to-r from-brand-support-green/10 via-brand-cream to-brand-support-green/10 border border-brand-support-green/20 hover:border-brand-support-green/40 hover:shadow-md transition-all"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-support-green/15 text-brand-support-green flex items-center justify-center group-hover:scale-105 transition-transform">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-brand-green mb-1">
            {t('products.portfolio_download_title')}
          </div>
          <div className="text-sm text-gray-600">
            {t('products.portfolio_download_desc')}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {t('products.portfolio_pages')}
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-orange text-white text-sm font-medium whitespace-nowrap group-hover:bg-brand-orange/90 transition-colors">
          {isZh ? '下载' : 'Download'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
      </a>

      {/* Search query indicator */}
      {searchQuery && (
        <div className="flex items-center gap-2 mb-6 px-4 py-3 bg-brand-cream/60 rounded-xl border border-brand-support-green/10">
          <svg className="w-4 h-4 text-brand-support-green flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-sm text-gray-600">
            {isZh ? '搜索关键词：' : 'Search results for: '}
            <strong className="text-brand-green">{searchQuery}</strong>
          </span>
          <span className="text-xs text-gray-500 ml-1">
            ({isZh ? `找到 ${filtered.length} 个结果` : `${filtered.length} result${filtered.length !== 1 ? 's' : ''}`})
          </span>
          <button
            onClick={clearSearch}
            className="ml-auto text-xs text-gray-500 hover:text-brand-orange transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {isZh ? '清除' : 'Clear'}
          </button>
        </div>
      )}

      <ProductFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        halalOnly={halalOnly}
        onHalalToggle={() => setHalalOnly(!halalOnly)}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">{t('products.no_results')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
