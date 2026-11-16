import { SITE } from '../components/seo/types';

const DOMAIN = SITE.domain;

/**
 * Schema.org JSON-LD builders.
 *
 * These return plain objects — pass the result(s) to the <SEO jsonLd={...} /> prop.
 * All builders are static (no I/O) and safe to call inside React render.
 *
 * References:
 *   Organization:   https://schema.org/Organization
 *   WebSite:        https://schema.org/WebSite
 *   BreadcrumbList: https://schema.org/BreadcrumbList
 *   Product:        https://schema.org/Product
 *   ItemList:       https://schema.org/ItemList
 *   WebPage:        https://schema.org/WebPage
 *   Article:        https://schema.org/Article
 *   FAQPage:        https://schema.org/FAQPage
 *   ContactPage:    https://schema.org/ContactPage
 *   AboutPage:      https://schema.org/AboutPage
 */

export interface BreadcrumbItem {
  name: string;
  /** Path or absolute URL. Absolute wins. */
  url: string;
}

/** Organization — emitted on every page via Layout-level JSON-LD (single source of truth). */
export const organizationSchema = (locale: 'en' | 'zh' = 'en') => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${DOMAIN}/#organization`,
  name: SITE.name,
  alternateName: SITE.alternateName,
  url: `${DOMAIN}/`,
  logo: {
    '@type': 'ImageObject',
    url: SITE.organizationLogo,
    width: 600,
    height: 60,
  },
  description:
    locale === 'zh'
      ? '面向全球食品饮料品牌的 B2B 原料供应商，主营乳制品原料、植物提取物、饮料浓浆、果酱及咸味调味料，并提供定制研发与 OEM 解决方案。'
      : 'Global B2B supplier of dairy ingredients, plant extracts, beverage syrups, fruit jams and savory ingredients for F&B brands. Custom R&D and OEM solutions available.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'CN',
    addressLocality: 'Shanghai',
    addressRegion: 'Shanghai',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@quarkdairy.cn',
      availableLanguage: ['English', 'Chinese'],
      areaServed: 'Worldwide',
    },
  ],
  sameAs: [
    // Add social profiles when available
  ],
});

/** WebSite with SearchAction (sitelinks search box). Optional but cheap. */
export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${DOMAIN}/#website`,
  url: `${DOMAIN}/`,
  name: SITE.name,
  inLanguage: ['en', 'zh-CN'],
  publisher: { '@id': `${DOMAIN}/#organization` },
});

/** BreadcrumbList from a list of items (the last one is the current page). */
export const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: /^https?:\/\//.test(item.url) ? item.url : `${DOMAIN}${item.url}`,
  })),
});

/** Product schema for a single SKU. */
export interface ProductSchemaInput {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  brand?: string;
  sku?: string;
  additionalProperty?: { name: string; value: string }[];
}

export const productSchema = (p: ProductSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  '@id': `${DOMAIN}/products/${p.id}#product`,
  name: p.name,
  description: p.description,
  image: /^https?:\/\//.test(p.imageUrl) ? p.imageUrl : `${DOMAIN}${p.imageUrl}`,
  brand: { '@type': 'Brand', name: p.brand ?? SITE.name },
  category: p.category,
  sku: p.sku ?? p.id,
  manufacturer: { '@id': `${DOMAIN}/#organization` },
  additionalProperty: p.additionalProperty?.map((prop) => ({
    '@type': 'PropertyValue',
    name: prop.name,
    value: prop.value,
  })),
});

/** ItemList wrapper for the products catalog page. */
export const itemListSchema = (items: { name: string; url: string; image?: string; position: number }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: items.map((it) => ({
    '@type': 'ListItem',
    position: it.position,
    name: it.name,
    url: /^https?:\/\//.test(it.url) ? it.url : `${DOMAIN}${it.url}`,
    image: it.image ? (/^https?:\/\//.test(it.image) ? it.image : `${DOMAIN}${it.image}`) : undefined,
  })),
});

/** Generic Article for case studies / blog posts. */
export interface ArticleInput {
  id: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished?: string; // ISO 8601
  dateModified?: string;
  authorName?: string;
  inLanguage?: 'en' | 'zh';
}

export const articleSchema = (a: ArticleInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${DOMAIN}/cases/${a.id}#article`,
  headline: a.headline,
  description: a.description,
  image: /^https?:\/\//.test(a.imageUrl) ? a.imageUrl : `${DOMAIN}${a.imageUrl}`,
  datePublished: a.datePublished ?? new Date().toISOString(),
  dateModified: a.dateModified ?? a.datePublished ?? new Date().toISOString(),
  author: { '@type': 'Organization', name: a.authorName ?? SITE.name, '@id': `${DOMAIN}/#organization` },
  publisher: {
    '@type': 'Organization',
    name: SITE.name,
    '@id': `${DOMAIN}/#organization`,
    logo: { '@type': 'ImageObject', url: SITE.organizationLogo },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${DOMAIN}/cases/${a.id}`,
  },
  inLanguage: a.inLanguage === 'zh' ? 'zh-CN' : 'en',
});

/** WebPage fallback (used for static pages like Privacy, Terms). */
export const webPageSchema = (input: {
  path: string;
  name: string;
  description: string;
  inLanguage?: 'en' | 'zh';
}) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${DOMAIN}${input.path}`,
  url: `${DOMAIN}${input.path}`,
  name: input.name,
  description: input.description,
  inLanguage: input.inLanguage === 'zh' ? 'zh-CN' : 'en',
  isPartOf: { '@id': `${DOMAIN}/#website` },
  about: { '@id': `${DOMAIN}/#organization` },
});

/** ContactPage schema with contact point. */
export const contactPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${DOMAIN}/contact#webpage`,
  url: `${DOMAIN}/contact`,
  name: 'Contact Quark Dairy',
  inLanguage: ['en', 'zh-CN'],
  about: { '@id': `${DOMAIN}/#organization` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${DOMAIN}/images/homepage-hero.webp`,
  },
});
