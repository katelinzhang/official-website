import type { ReactNode } from 'react';

export type Locale = 'en' | 'zh';

export interface SEOProps {
  /** Page-specific title (will be templated with " | Quark Dairy" suffix) */
  title?: string;
  /** Meta description (155-160 chars ideal) */
  description?: string;
  /** Meta keywords (comma-separated, optional) */
  keywords?: string;
  /** Canonical path (e.g. "/about") or absolute URL. Absolute wins. */
  canonical?: string;
  /** OG image absolute URL. Defaults to the homepage hero. */
  ogImage?: string;
  /** OG image width */
  ogImageWidth?: number;
  /** OG image height */
  ogImageHeight?: number;
  /** OG type: website (default) | article | product */
  ogType?: 'website' | 'article' | 'product' | 'profile';
  /** Current locale (drives og:locale + html lang) */
  locale?: Locale;
  /** If true, search engines should not index this page */
  noindex?: boolean;
  /** Optional: structured data (JSON-LD) to inject */
  jsonLd?: object | object[];
  /** Override for og:site_name (rare) */
  siteName?: string;
  /** Allow children for additional <meta>, <link>, or nested <script> */
  children?: ReactNode;
}

/**
 * Canonical site constants — keep in sync with public/robots.txt and sitemap
 */
export const SITE = {
  name: 'Quark Dairy',
  alternateName: 'Quark Dairy Intelligence Institute',
  domain: 'https://www.quarkdairy.cn',
  defaultOgImage: 'https://www.quarkdairy.cn/images/homepage-hero.webp',
  defaultOgImageWidth: 1200,
  defaultOgImageHeight: 630,
  defaultLocale: 'en' as Locale,
  organizationLogo: 'https://www.quarkdairy.cn/images/logo.png',
} as const;
