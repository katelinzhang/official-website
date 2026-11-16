import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import { webPageSchema, breadcrumbSchema } from '../utils/jsonld';

const PrivacyPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="bg-white">
      <Helmet>
        <title>{isZh ? '隐私政策' : 'Privacy Policy'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? `跨客食品隐私政策 — 我们如何在 quarkdairy.cn 上收集、使用和保护您的个人信息。最后更新：${__BUILD_DATE_ZH__}。`
              : `Quark Dairy's privacy policy — how we collect, use and protect your personal data on quarkdairy.cn. Last updated: ${__BUILD_DATE_EN__}.`
          }
        />
        <meta
          name="keywords"
          content={isZh ? '隐私政策,跨客食品,数据保护' : 'privacy policy, Quark Dairy, data protection, GDPR'}
        />
        {seoLinkTags(`/privacy`, isZh)}
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={isZh ? '隐私政策 | 跨客食品' : 'Privacy Policy | Quark Dairy'} />
        <meta property="og:description" content={isZh ? '跨客食品如何收集、使用和保护您的个人信息。' : 'How Quark Dairy collects, uses and protects your personal data.'} />

        {/* JSON-LD: WebPage + Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify([
            webPageSchema({
              path: '/privacy',
              name: isZh ? '隐私政策' : 'Privacy Policy',
              description: isZh
                ? '跨客食品隐私政策。'
                : 'Quark Dairy privacy policy.',
              inLanguage: isZh ? 'zh' : 'en',
            }),
            breadcrumbSchema([
              { name: isZh ? '首页' : 'Home', url: '/' },
              { name: isZh ? '隐私政策' : 'Privacy Policy', url: '/privacy' },
            ]),
          ])}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green to-[#0f2920] text-white py-16 md:py-20">
        <div className="container-custom">
          <p className="text-brand-orange text-xs font-bold tracking-[0.2em] uppercase mb-3">
            {t('nav.about')}
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-4xl font-bold leading-tight mb-4">
            {isZh ? '隐私政策' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {isZh ? `最后更新：${__BUILD_DATE_ZH__}` : `Last updated: ${__BUILD_DATE_EN__}`}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-custom section-padding !py-16 max-w-4xl">
        <div className="prose prose-neutral max-w-none text-sm md:text-[15px] leading-relaxed text-gray-700 space-y-6">
          {isZh ? (
            <>
              <p>
                跨客食品（Quark Dairy Intelligence Institute，以下简称"我们"）尊重并保护您的隐私。本政策说明我们在您访问 quarkdairy.cn（以下简称"本网站"）时，如何收集、使用和保护您的个人信息。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">一、我们收集的信息</h2>
              <p>
                当您在本网站提交询盘表单或联系我们时，我们可能会收集：您的姓名、公司名称、邮箱、电话、国家、意向产品、应用场景、预计年用量、留言内容，以及您选择上传的附件照片。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">二、信息使用目的</h2>
              <p>
                我们仅将上述信息用于：响应您的询盘、发送报价与样品、提供技术支持、履行合同义务，以及在您同意的情况下发送产品更新。除非法律要求，我们不会将您的信息共享给任何第三方。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">三、数据存储与安全</h2>
              <p>
                您的数据存储在境内的合规云服务上，并采用加密传输（HTTPS）。我们仅在实现上述目的所必需的最短时间内保留您的数据。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">四、您的权利</h2>
              <p>
                您有权随时查看、更正或要求删除我们持有的您的个人信息。如需行使上述权利，请通过 info@quarkdairy.cn 与我们联系。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">五、Cookie 使用</h2>
              <p>
                本网站仅使用必要的功能性 Cookie 用于记住您的语言偏好。不使用任何第三方追踪或广告 Cookie。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">六、政策更新</h2>
              <p>
                本政策可能不定期更新。重大变更将在本网站显著位置公布。继续使用本网站即视为您接受更新后的政策。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">七、联系我们</h2>
              <p>
                如对本政策有任何疑问，请联系：跨客食品科技（上海）有限公司，邮箱 info@quarkdairy.cn。
              </p>
            </>
          ) : (
            <>
              <p>
                Quark Dairy Intelligence Institute ("we", "us", or "our") respects and protects your privacy. This policy explains how we collect, use, and safeguard your personal information when you visit quarkdairy.cn (the "Website").
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">1. Information We Collect</h2>
              <p>
                When you submit an inquiry form or contact us through the Website, we may collect: your name, company, email, phone number, country, product interest, application scenario, estimated annual volume, your message, and any photo attachments you choose to upload.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">2. Purpose of Use</h2>
              <p>
                We use the information solely to: respond to your inquiry, send quotations and samples, provide technical support, fulfill contractual obligations, and — only with your consent — send product updates. We do not share your information with any third party unless required by law.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">3. Data Storage & Security</h2>
              <p>
                Your data is stored on compliant domestic cloud services with encrypted transmission (HTTPS). We retain your data only for the minimum period necessary to fulfill the purposes above.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">4. Your Rights</h2>
              <p>
                You have the right to access, correct, or request deletion of your personal information held by us at any time. To exercise these rights, please contact us at info@quarkdairy.cn.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">5. Cookie Usage</h2>
              <p>
                The Website uses only essential functional cookies to remember your language preference. We do not use any third-party tracking or advertising cookies.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">6. Policy Updates</h2>
              <p>
                This policy may be updated from time to time. Material changes will be prominently announced on the Website. Continued use of the Website constitutes acceptance of the updated policy.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">7. Contact Us</h2>
              <p>
                For any questions about this policy, please contact: Quark Dairy Intelligence Institute (Shanghai) Co., Ltd., Email info@quarkdairy.cn.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
