import React from 'react';
import LocalizedLink from '../common/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { WHATSAPP_NUMBER, LINKEDIN_URL } from '../../config';

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <footer className="relative bg-gradient-to-b from-brand-green to-[#0f2920] text-white">
      <div className="container-custom section-padding !pt-24 !pb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src="/images/logo-white.png?v=1"
                alt="Quark Dairy Intelligence Institute"
                className="h-10 w-auto object-contain flex-shrink-0"
              />
              <div>
                <p className="text-sm font-bold leading-tight font-heading">{isZh ? '跨客食品科技' : 'Quark Dairy'}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{isZh ? '（上海）有限公司' : 'Intelligence Institute'}</p>
              </div>
            </div>
            <p className="text-gray-500 text-[13px] leading-relaxed">{isZh ? t('about.company_full_zh') : t('about.company_full_en')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-brand-support-green">
              {t('footer.quick_links')}
            </h4>
            <nav className="space-y-2">
              {[
                { key: 'home', path: '/' },
                { key: 'products', path: '/products' },
                { key: 'solutions', path: '/solutions' },
                { key: 'about', path: '/about' },
                { key: 'contact', path: '/contact' },
              ].map(({ key, path }) => (
                <LocalizedLink key={key} to={path} className="block text-gray-500 hover:text-white text-xs transition-colors">
                  {t(`nav.${key}`)}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-brand-support-green">
              {t('footer.contact_us')}
            </h4>
            <div className="space-y-2.5 text-[11px] text-gray-500">
              {/* Address */}
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-support-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span className="leading-snug">{t('footer.address')}</span>
              </div>
              {/* Phone */}
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-support-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:+862158958888" className="hover:text-white transition-colors">
                  {t('footer.phone')}
                </a>
              </div>
              {/* Email */}
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-support-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors break-all">
                  {t('footer.email')}
                </a>
              </div>
              {/* Hours */}
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-support-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span className="leading-snug">{t('footer.hours')}</span>
              </div>
              {/* WeChat */}
              <div className="flex items-start gap-2">
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand-support-green" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9.5 4C5.36 4 2 6.91 2 10.5c0 2.07 1.13 3.9 2.9 5.1L4 18l2.5-1.5c.92.32 1.92.5 3 .5.16 0 .31-.01.47-.02-.31-.71-.47-1.49-.47-2.31 0-3.53 3.36-6.4 7.5-6.4.18 0 .35.01.52.02C16.93 6.08 13.51 4 9.5 4zm-2.5 5a1 1 0 110 2 1 1 0 010-2zm5 0a1 1 0 110 2 1 1 0 010-2zm5.5 2.5c-3.04 0-5.5 2.1-5.5 4.75s2.46 4.75 5.5 4.75c.65 0 1.27-.1 1.85-.28L21 20l-.65-1.6c1.04-.86 1.65-2.04 1.65-3.4 0-2.65-2.46-4.75-5.5-4.75zM15 13a.75.75 0 110 1.5.75.75 0 010-1.5zm4 0a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
                <span>Quarkdairy</span>
              </div>
              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I'm interested in your food ingredients. Could you share more details?")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-xl text-white text-xs font-medium transition-colors"
              >
                WhatsApp
              </a>
              {/* LinkedIn —— 暂未上线（灰色 disabled） */}
              <a
                href={LINKEDIN_URL}
                onClick={(e) => e.preventDefault()}
                aria-disabled="true"
                title={isZh ? 'LinkedIn 页面暂未上线' : 'LinkedIn page coming soon'}
                className="inline-flex items-center gap-1.5 mt-1.5 px-3 py-1.5 bg-gray-700/60 cursor-not-allowed rounded-xl text-white/80 text-xs font-medium transition-colors"
              >
                <svg className="w-3 h-3 opacity-70" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
                <span className="text-[9px] uppercase tracking-wider opacity-90 border border-white/30 px-1 rounded">
                  {t('footer.linkedin_soon')}
                </span>
              </a>
            </div>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-4 text-brand-support-green">
              {t('contact.submit')}
            </h4>
            <p className="text-gray-500 text-xs mb-4 leading-relaxed">
              {t('footer.cta_text')}
            </p>
            <LocalizedLink to="/contact" className="btn-primary !px-4 !py-2 text-xs">
              {t('contact.submit')}
            </LocalizedLink>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700/50 mt-10 pt-6 flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-gray-500 text-[11px]">
              &copy; {new Date().getFullYear()} Quark Dairy Intelligence Institute. {t('footer.copyright')}
            </p>
            <p className="text-gray-600 text-[11px]">
              {t('footer.disclaimer')}
            </p>
          </div>

          {/* ICP & MPS Beian Records */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-[11px] text-gray-500">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gray-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 3c1.66 0 3 1.34 3 3 0 1.31-.83 2.41-2 2.82V19h-2v-2.18c-1.17-.41-2-1.51-2-2.82 0-1.66 1.34-3 3-3z" />
              </svg>
              <span>{t('footer.icp_record')}</span>
            </a>
            <a
              href={`https://beian.gov.cn/portal/registerSystemInfo?recordcode=${'fdbac52f91a7d204c805ff9a3bb55801'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-gray-400 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 3c1.66 0 3 1.34 3 3 0 1.31-.83 2.41-2 2.82V19h-2v-2.18c-1.17-.41-2-1.51-2-2.82 0-1.66 1.34-3 3-3z" />
              </svg>
              <span>{t('footer.police_record')}</span>
            </a>
            <span className="text-gray-600">{isZh ? '跨客食品科技（上海）有限公司' : 'Quark Dairy Intelligence Institute (Shanghai) Co., Ltd.'}</span>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-[11px] text-gray-500">
            <a
              href="/product-portfolio.pdf"
              download="QuarkDairy-Product-Portfolio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-brand-orange transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 20h16" />
              </svg>
              {isZh ? '产品手册' : 'Product Portfolio'}
            </a>
            <span className="text-gray-700">|</span>
            <LocalizedLink to="/privacy" className="hover:text-gray-400 transition-colors underline-offset-2 hover:underline">
              {t('footer.privacy_policy')}
            </LocalizedLink>
            <span className="text-gray-700">|</span>
            <LocalizedLink to="/terms" className="hover:text-gray-400 transition-colors underline-offset-2 hover:underline">
              {t('footer.terms_of_service')}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
