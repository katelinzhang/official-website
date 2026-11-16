import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import { products } from '../data/products';
import ProductImage from '../components/common/ProductImage';
import InquiryForm from '../components/common/InquiryForm';
import { WaterIcon, CoffeeIcon, WineGlassIcon, TeaIcon } from '../components/common/Icons';
import LocalizedLink from '../components/common/LocalizedLink';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container-custom section-padding text-center">
        <Helmet>
          <title>{isZh ? '未找到该产品' : 'Product Not Found'}</title>
          <html lang={isZh ? 'zh-CN' : 'en'} />
          <meta name="robots" content="noindex, follow" />
          <link rel="canonical" href="https://www.quarkdairy.cn/products" />
        </Helmet>
        <h1 className="text-2xl font-bold text-brand-green mb-4">{t('products.not_found')}</h1>
        <LocalizedLink to="/products" className="btn-primary">{t('products.back_to_products')}</LocalizedLink>
      </div>
    );
  }

  const productName = isZh ? product.name_zh : product.name_en;
  const productDesc = isZh ? product.short_desc_zh : product.short_desc_en;
  const ogImage = product.image_url.startsWith('http')
    ? product.image_url
    : `https://www.quarkdairy.cn${product.image_url}`;

  return (
    <div className="container-custom section-padding">
      <Helmet>
        <title>{productName}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta name="description" content={productDesc} />
        <meta
          name="keywords"
          content={
            isZh
              ? `${productName},${product.application_tags.join(',')},食品原料,定制研发,清真认证,OEM 代工`
              : `${productName},${product.application_tags.join(',')},food ingredients B2B,halal,OEM`
          }
        />
        {seoLinkTags(`/products/${product.id}`, isZh)}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={productName} />
        <meta property="og:description" content={productDesc} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:title" content={productName} />
        <meta name="twitter:description" content={productDesc} />
        <meta name="twitter:image" content={ogImage} />

        {/* JSON-LD: Product Schema (Google Rich Results) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                '@id': `https://www.quarkdairy.cn/products/${product.id}#product`,
                name: productName,
                description: productDesc,
                image: ogImage,
                brand: {
                  '@type': 'Brand',
                  name: isZh ? '跨客食品' : 'Quark Dairy',
                },
                manufacturer: {
                  '@id': 'https://www.quarkdairy.cn/#organization',
                },
                category: isZh
                  ? ({
                      'dairy': '乳制品原料',
                      'plant-extract': '植物提取物',
                      'beverage-syrup': '饮料浓浆',
                      'jam': '果酱',
                      'savory': '咸味调味料',
                      'custom-solution': '定制方案',
                    } as Record<string, string>)[product.category] || product.category
                  : ({
                      'dairy': 'Dairy Ingredients',
                      'plant-extract': 'Plant Extracts',
                      'beverage-syrup': 'Beverage Syrups',
                      'jam': 'Fruit Jams',
                      'savory': 'Savory Ingredients',
                      'custom-solution': 'Custom Solutions',
                    } as Record<string, string>)[product.category] || product.category,
                sku: product.id,
                additionalProperty: product.specs.map((spec) => ({
                  '@type': 'PropertyValue',
                  name: isZh ? spec.label_zh : spec.label_en,
                  value: spec.value,
                })),
                offers: {
                  '@type': 'Offer',
                  availability: product.stockStatus === 'in-stock'
                    ? 'https://schema.org/InStock'
                    : 'https://schema.org/PreOrder',
                  priceCurrency: 'USD',
                  priceSpecification: {
                    '@type': 'PriceSpecification',
                    priceCurrency: 'USD',
                    valueAddedTaxIncluded: false,
                    description: isZh ? '请联系我们获取报价' : 'Contact us for quotation',
                  },
                  seller: { '@id': 'https://www.quarkdairy.cn/#organization' },
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: t('nav.home'),
                    item: 'https://www.quarkdairy.cn/',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: t('nav.products'),
                    item: 'https://www.quarkdairy.cn/products',
                  },
                  {
                    '@type': 'ListItem',
                    position: 3,
                    name: productName,
                    item: `https://www.quarkdairy.cn/products/${product.id}`,
                  },
                ],
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <LocalizedLink to="/" className="hover:text-brand-orange">{t('nav.home')}</LocalizedLink>
        <span>/</span>
        <LocalizedLink to="/products" className="hover:text-brand-orange">{t('nav.products')}</LocalizedLink>
        <span>/</span>
        <span className="text-brand-green">{isZh ? product.name_zh : product.name_en}</span>
      </div>

      {/* Product Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <ProductImage
            src={product.image_url}
            alt={isZh ? product.name_zh : product.name_en}
            className="rounded-2xl"
          />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-3 py-1 bg-brand-cream text-brand-green rounded-full text-sm font-medium">
              {t(`categories.${product.category}`)}
            </span>
            {product.isHalal && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {t('products.halal_certified')}
              </span>
            )}
            {product.isCustomizable && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                {t('products.customizable')}
              </span>
            )}
            {product.stockStatus === 'in-stock' ? (
              <span className="badge-green">{t('home.stock_in_stock')}</span>
            ) : (
              <span className="badge-amber">{t('home.stock_made_to_order')}</span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-green mb-4">
            {isZh ? product.name_zh : product.name_en}
          </h1>
          <p className="text-lg text-gray-500 mb-6">
            {isZh ? product.short_desc_zh : product.short_desc_en}
          </p>

          {/* Specs */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-brand-green mb-3">{t('products.specifications')}</h3>
            <div className="bg-brand-cream rounded-xl p-4 space-y-2">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-500">{isZh ? spec.label_zh : spec.label_en}</span>
                  <span className="font-medium text-brand-green">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div>
            <h3 className="text-lg font-bold text-brand-green mb-3">{t('products.applications')}</h3>
            <div className="flex flex-wrap gap-2">
              {product.application_tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Beverage Syrup Guide (special section) */}
      {product.category === 'beverage-syrup' && (
        <div className="bg-brand-cream rounded-2xl p-8 mb-16 border border-brand-support-green/10">
          <h2 className="text-2xl font-bold text-brand-green mb-3">{t('products.syrup_guide_title')}</h2>
          <p className="text-gray-600 mb-6">{t('products.syrup_guide_desc')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { Icon: WaterIcon, en: '+ Water/Ice', zh: '+ 水/冰' },
              { Icon: CoffeeIcon, en: '+ Coffee Base', zh: '+ 咖啡基底' },
              { Icon: WineGlassIcon, en: '+ Alcohol Base', zh: '+ 酒基底' },
              { Icon: TeaIcon, en: '+ Tea Base', zh: '+ 茶基底' },
            ].map(({ Icon, en, zh }) => (
              <div key={en} className="bg-white rounded-xl p-4 text-center">
                <div className="w-10 h-10 bg-brand-support-green/10 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-brand-support-green" />
                </div>
                <p className="text-sm font-medium text-brand-green">{isZh ? zh : en}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inquiry / COA Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-brand-green mb-2">{t('products.download_coa')}</h2>
          <p className="text-gray-600 mb-4">
            {t('products.coa_prompt')}
          </p>
          <InquiryForm compact />
        </div>
        <div className="bg-gradient-to-b from-brand-green to-[#0f2920] rounded-3xl p-8 text-white flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-3">{t('products.inquiry_form')}</h3>
          <p className="text-gray-400 mb-4">
            {t('products.inquiry_prompt')}
          </p>
          <LocalizedLink to="/contact" className="btn-primary !bg-white !text-brand-green hover:!bg-brand-cream self-start">
            {t('contact.submit')}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
