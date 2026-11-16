import React from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import { webPageSchema, breadcrumbSchema } from '../utils/jsonld';

const TermsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="bg-white">
      <Helmet>
        <title>{isZh ? '用户协议' : 'Terms of Service'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? `跨客食品用户协议 — quarkdairy.cn 的使用条款，包括使用权利、知识产权、免责声明及责任限制。最后更新：${__BUILD_DATE_ZH__}。`
              : `Quark Dairy's terms of service for using quarkdairy.cn — usage rights, IP, disclaimers and liability. Last updated: ${__BUILD_DATE_EN__}.`
          }
        />
        <meta
          name="keywords"
          content={isZh ? '用户协议,跨客食品,使用条款' : 'terms of service, Quark Dairy, user agreement'}
        />
        {seoLinkTags(`/terms`, isZh)}
        <meta property="og:title" content={isZh ? '用户协议 | 跨客食品' : 'Terms of Service | Quark Dairy'} />
        <meta property="og:description" content={isZh ? 'quarkdairy.cn 的使用条款。' : 'Terms of service for using quarkdairy.cn.'} />

        {/* JSON-LD: WebPage + Breadcrumb */}
        <script type="application/ld+json">
          {JSON.stringify([
            webPageSchema({
              path: '/terms',
              name: isZh ? '用户协议' : 'Terms of Service',
              description: isZh ? '跨客食品用户协议。' : 'Quark Dairy terms of service.',
              inLanguage: isZh ? 'zh' : 'en',
            }),
            breadcrumbSchema([
              { name: isZh ? '首页' : 'Home', url: '/' },
              { name: isZh ? '用户协议' : 'Terms of Service', url: '/terms' },
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
            {isZh ? '用户协议' : 'Terms of Service'}
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
                欢迎访问 quarkdairy.cn（以下简称"本网站"）。本网站由跨客食品科技（上海）有限公司（以下简称"我们"）运营。请仔细阅读以下使用条款，您访问或使用本网站即视为同意接受本协议约束。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">一、网站内容使用</h2>
              <p>
                本网站展示的产品信息、技术规格、应用案例等内容仅供参考。我们尽力确保信息准确，但不对其绝对准确性、完整性或时效性作任何明示或暗示的保证。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">二、知识产权</h2>
              <p>
                本网站包含的所有文字、图片、Logo、设计、视频等内容，其著作权、商标权及其他知识产权均归我们或合法授权方所有。未经事先书面许可，任何人不得复制、传播、修改或用于商业用途。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">三、产品询价与合同</h2>
              <p>
                您通过本网站提交的询盘不构成具有法律约束力的订单。具体合作以双方另行签署的购销合同或报价单为准。产品规格、包装、交付条件等以最终合同约定为准。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">四、第三方链接</h2>
              <p>
                本网站可能包含指向第三方网站（如微信公众号、WhatsApp、行业媒体）的链接。这些链接仅为方便用户而提供，我们不对第三方网站的内容、政策或服务承担任何责任。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">五、免责声明</h2>
              <p>
                在法律允许的最大范围内，我们不对因使用或无法使用本网站所造成的任何直接或间接损失承担责任，包括但不限于利润损失、数据丢失或业务中断。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">六、协议变更与终止</h2>
              <p>
                我们保留随时修改本协议的权利。重大变更将在本网站显著位置公布。如您不同意修改后的协议，请停止使用本网站。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">七、适用法律</h2>
              <p>
                本协议受中华人民共和国法律管辖。如发生争议，双方应友好协商；协商不成的，提交上海仲裁委员会按其届时有效的仲裁规则进行仲裁。
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">八、联系我们</h2>
              <p>
                如对本协议有任何疑问，请联系：跨客食品科技（上海）有限公司，邮箱 info@quarkdairy.cn。
              </p>
            </>
          ) : (
            <>
              <p>
                Welcome to quarkdairy.cn (the "Website"). The Website is operated by Quark Dairy Intelligence Institute (Shanghai) Co., Ltd. ("we", "us", or "our"). Please read these terms of service carefully. By accessing or using the Website, you agree to be bound by these terms.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">1. Use of Website Content</h2>
              <p>
                Product information, technical specifications, application cases and other content on the Website are provided for reference only. We strive to ensure accuracy but make no express or implied warranties as to the absolute accuracy, completeness, or timeliness of such information.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">2. Intellectual Property</h2>
              <p>
                All text, images, logos, designs, videos and other content on the Website are protected by copyright, trademark and other intellectual property rights belonging to us or our licensors. No copying, distribution, modification or commercial use is permitted without prior written consent.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">3. Inquiries & Contracts</h2>
              <p>
                Inquiries submitted through the Website do not constitute legally binding orders. Specific cooperation is subject to separately signed sales contracts or quotations. Product specifications, packaging, delivery terms and other details are governed by the final contract.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">4. Third-Party Links</h2>
              <p>
                The Website may contain links to third-party sites (such as WeChat official accounts, WhatsApp, and industry media). These links are provided for convenience only. We assume no responsibility for the content, policies or services of any third-party sites.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">5. Disclaimer of Liability</h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any direct or indirect loss arising from the use of, or inability to use, the Website, including but not limited to loss of profits, data loss, or business interruption.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">6. Modification & Termination</h2>
              <p>
                We reserve the right to modify these terms at any time. Material changes will be prominently announced on the Website. If you do not agree to the modified terms, please stop using the Website.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">7. Governing Law</h2>
              <p>
                These terms are governed by the laws of the People's Republic of China. Any disputes shall first be resolved through friendly negotiation; failing which, they shall be submitted to the Shanghai International Arbitration Center for arbitration in accordance with its then-effective rules.
              </p>
              <h2 className="text-xl font-bold text-brand-green mt-8 mb-3">8. Contact Us</h2>
              <p>
                For any questions about these terms, please contact: Quark Dairy Intelligence Institute (Shanghai) Co., Ltd., Email info@quarkdairy.cn.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
