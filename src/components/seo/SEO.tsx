import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE, type SEOProps, type Locale } from './types';

/**
 * SEO — drop-in <head> manager for every page.
 *
 * Usage:
 *   <SEO
 *     title="About"
 *     description="..."
 *     canonical="/about"
 *     jsonLd={[organizationSchema, breadcrumbSchema]}
 *   />
 *
 * Behavior:
 *   - title is wrapped with the Layout's titleTemplate ("%s | Quark Dairy")
 *   - canonical/og:url: pass path (e.g. "/about") OR absolute URL; absolute wins
 *   - og:locale derived from `locale` prop (auto-detected via i18n.language by caller)
 *   - og:locale:alternate is set to the OTHER locale
 *   - noindex: also adds nofollow, blocks all bots
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogImageWidth = SITE.defaultOgImageWidth,
  ogImageHeight = SITE.defaultOgImageHeight,
  ogType = 'website',
  locale = SITE.defaultLocale,
  noindex = false,
  jsonLd,
  siteName,
  children,
}) => {
  const absUrl = (path?: string) => {
    if (!path) return undefined;
    if (/^https?:\/\//.test(path)) return path;
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${SITE.domain}${clean === '/' ? '/' : clean.replace(/\/$/, '')}`;
  };

  const finalCanonical = absUrl(canonical);
  const finalOgImage = ogImage ?? SITE.defaultOgImage;
  const alternateLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  const htmlLang = locale === 'zh' ? 'zh-CN' : 'en';

  return (
    <Helmet>
      <html lang={htmlLang} />
      {title && <title>{title}</title>}

      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {finalCanonical && <link rel="canonical" href={finalCanonical} />}

      {/* Open Graph */}
      <meta property="og:site_name" content={siteName ?? SITE.name} />
      <meta property="og:type" content={ogType} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {finalCanonical && <meta property="og:url" content={finalCanonical} />}
      <meta property="og:locale" content={locale === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:locale:alternate" content={alternateLocale === 'zh' ? 'zh_CN' : 'en_US'} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:secure_url" content={finalOgImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:alt" content={title ? `${title} — ${SITE.name}` : SITE.name} />
      <meta property="og:image:type" content="image/webp" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@quarkdairy" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={finalOgImage} />
      <meta name="twitter:image:alt" content={title ? `${title} — ${SITE.name}` : SITE.name} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}

      {children}
    </Helmet>
  );
};
