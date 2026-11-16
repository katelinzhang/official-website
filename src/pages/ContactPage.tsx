import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import InquiryForm from '../components/common/InquiryForm';
import { WHATSAPP_NUMBER } from '../config';
import PromiseBadges from '../components/contact/PromiseBadges';
import StageSelector, { type StageKey } from '../components/contact/StageSelector';
import ProcessTimeline from '../components/contact/ProcessTimeline';
import TrustAnchors from '../components/contact/TrustAnchors';
import ContactFAQ from '../components/contact/ContactFAQ';
import SectionDivider from '../components/common/SectionDivider';

const ContactPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [selectedStage, setSelectedStage] = useState<StageKey | null>(null);
  const formAnchorRef = useRef<HTMLDivElement>(null);

  const handleStageSelect = (stage: StageKey) => {
    setSelectedStage(stage);
    // 平滑滚动到表单
    setTimeout(() => {
      formAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  const handleStageSkip = () => {
    setSelectedStage(null);
    setTimeout(() => {
      formAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <div>
      <Helmet>
        {/* 品牌名由 Layout 的 titleTemplate 统一追加，此处不重复写 */}
                <title>{isZh ? '联系我们：食品原料询价、样品申请与 OEM 合作' : 'Contact Us: Ingredient Inquiry, Samples & OEM'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? '联系跨客食品：食品原料询价、样品申请、OEM/ODM 合作。邮箱 info@quarkdairy.cn 或 WhatsApp +86-xxx。24 小时内回复。'
              : 'Contact Quark Dairy for food ingredient inquiries, sample requests, and OEM/ODM cooperation. Email info@quarkdairy.cn or WhatsApp +86-xxx. Reply within 24 hours.'
          }
        />
        <meta
          name="keywords"
          content={
            isZh
              ? '联系我们,跨客食品,食品原料询价,OEM 合作,样品申请,WhatsApp'
              : 'contact Quark Dairy, food ingredient inquiry, OEM cooperation, sample request, WhatsApp supplier'
          }
        />
        {seoLinkTags(`/contact`, isZh)}
        <meta property="og:title" content={isZh ? '联系我们 | 跨客食品' : 'Contact Quark Dairy | Inquiry & OEM'} />
        <meta property="og:description" content={isZh ? '邮件或 WhatsApp 询价、申请样品、OEM 合作。' : 'Email or WhatsApp for food ingredient inquiries, samples and OEM cooperation.'} />
        <meta name="twitter:title" content={isZh ? '联系我们 | 跨客食品' : 'Contact Quark Dairy'} />
        <meta name="twitter:description" content={isZh ? '食品原料询价、样品、OEM 合作。' : 'Inquiry, sample & OEM contact for food ingredients.'} />

        {/* JSON-LD: ContactPage + FAQPage (Google Rich Results) */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'ContactPage',
                '@id': 'https://www.quarkdairy.cn/contact#page',
                url: 'https://www.quarkdairy.cn/contact',
                name: isZh ? '联系我们 | 跨客食品' : 'Contact Quark Dairy',
                description: isZh
                  ? '联系跨客食品提交食品原料询价、样品申请或 OEM/ODM 合作。'
                  : 'Contact Quark Dairy for food ingredient inquiries, sample requests, and OEM/ODM cooperation.',
                inLanguage: isZh ? 'zh-CN' : 'en',
                publisher: { '@id': 'https://www.quarkdairy.cn/#organization' },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://www.quarkdairy.cn/contact#faq',
                mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
                  '@type': 'Question',
                  name: t(`contact.faq${n}_q`),
                  acceptedAnswer: { '@type': 'Answer', text: t(`contact.faq${n}_a`) },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero —— 商务握手背景图 + 深色蒙版 + 标题 + Promise 徽章 */}
      <section className="relative text-white overflow-hidden">
        {/* 背景图 */}
        <div className="absolute inset-0">
          <img
            src="/images/contact/hero-bg.jpg"
            alt={isZh ? '商务合作握手场景' : 'B2B business handshake'}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        {/* 深色蒙版 —— 保证白字可读 */}
        <div className="absolute inset-0 bg-brand-green/75" />
        {/* 渐变疊加 —— 上下深、中间透 */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/40 via-transparent to-brand-green/60" />
        {/* 内容层 */}
        <div className="relative container-custom section-padding text-center">
          <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-semibold mb-5 uppercase tracking-wider">
            {t('contact.hero_eyebrow')}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h1>
          <p className="text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-10">{t('contact.subtitle')}</p>
          <PromiseBadges />
        </div>
      </section>

      {/* Stage Selector —— 4 张 ABM 阶段卡 */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <StageSelector onSelect={handleStageSelect} selected={selectedStage} />
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={handleStageSkip}
              className="text-sm text-gray-500 hover:text-brand-orange underline underline-offset-4 transition-colors"
            >
              {isZh ? '跳过，直接填写表单 →' : 'Skip — just go to the form →'}
            </button>
          </div>
        </div>
      </section>

      <SectionDivider tone="soft" />

      {/* Form + Sidebar */}
      <section id="inquiry-form" ref={formAnchorRef} className="section-cream scroll-mt-20">
        <div className="container-custom section-padding">
          {/* Form Eyebrow + Stage Chip */}
          <div className="mb-8">
            <span className="inline-block text-brand-green/45 font-semibold text-sm uppercase tracking-wider">
              {t('contact.form_eyebrow')}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-green mt-2 mb-2">
              {t('contact.form_title')}
            </h2>
            <p className="text-gray-500 text-sm">{t('contact.form_subtitle')}</p>

            {/* 已选 stage 提示条 */}
            {selectedStage && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-brand-support-green/10 border border-brand-support-green/30 rounded-full text-sm">
                <span className="text-brand-support-green font-semibold">✓</span>
                <span className="text-brand-green font-medium">
                  {t('contact.stage_selected_label')}:&nbsp;
                  <strong>{t(`contact.stage_${selectedStage}_label`)}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedStage(null)}
                  className="ml-1 text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="Clear stage"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form —— col-span-2 */}
            <div className="lg:col-span-2">
              <InquiryForm />
            </div>

            {/* Sidebar —— 联系方式 */}
            <div className="space-y-6">
              {/* Email */}
              <div className="card p-6">
                <h3 className="font-bold text-brand-green mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-support-green" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {t('contact.email_label')}
                </h3>
                <a href="mailto:info@quarkdairy.cn" className="text-brand-green hover:text-brand-orange hover:underline text-sm font-medium transition-colors">
                  info@quarkdairy.cn
                </a>
              </div>

              {/* WeChat + WhatsApp */}
              <div className="card p-6 text-center">
                <h3 className="font-bold text-brand-green mb-3">{t('contact.wechat_title')}</h3>
                <img
                  src="/images/qrcode-wechat.webp"
                  alt="Official Account & WhatsApp"
                  className="w-full max-w-[200px] mx-auto rounded-2xl mb-3"
                  loading="lazy"
                />
                <p className="text-xs text-gray-500 mb-4">{t('contact.wechat_subtitle')}</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in your food ingredients. Could you share more details?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-[0_4px_14px_rgba(22,163,74,0.2)] w-full justify-center"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('contact.whatsapp_cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Anchors —— 4 列 */}
      <section className="section-green-tint">
        <div className="container-custom section-padding">
          <TrustAnchors />
        </div>
      </section>

      <SectionDivider tone="soft" />

      {/* Process Timeline —— 3 步 */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <ProcessTimeline />
        </div>
      </section>

      <SectionDivider tone="soft" />

      {/* FAQ —— 6 条 */}
      <section className="section-cream">
        <div className="container-custom section-padding">
          <ContactFAQ />
        </div>
      </section>

      <SectionDivider tone="strong" />

      {/* Bottom CTA */}
      <section className="bg-brand-green text-white">
        <div className="container-custom section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <p className="text-base md:text-lg text-white/55 max-w-2xl mx-auto mb-8">{t('contact.subtitle')}</p>
          <button
            type="button"
            onClick={handleStageSkip}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold rounded-full transition-all shadow-lg shadow-brand-orange/30 hover:shadow-xl"
          >
            {t('contact.form_title')}
            <span aria-hidden>↑</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;