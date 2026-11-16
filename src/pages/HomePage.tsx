import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { seoLinkTags } from '../components/seo/SeoLinks';
import { useTranslation } from 'react-i18next';
import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
import CustomSolutions from '../components/home/CustomSolutions';
import Pasture from '../components/home/Pasture';
import QuarkAtAGlance from '../components/home/QuarkAtAGlance';
import VideoModal from '../components/common/VideoModal';

// Video file is at public/company-story.mp4
const COMPANY_VIDEO_URL = '/company-story.mp4';
const PASTURE_VIDEO_URL = '/pasture-video.mp4';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const [videoOpen, setVideoOpen] = useState(false);
  const [pastureVideoOpen, setPastureVideoOpen] = useState(false);

  return (
    <>
      <Helmet>
        {/* 品牌名不写在这里：Layout 的 titleTemplate 会追加「| 跨客食品」/「| Quark Dairy」，
            写在这里会变成「跨客食品 | ... | 跨客食品」。 */}
        <title>{isZh ? '全球乳品原料与食品配料 B2B 供应商' : 'Global B2B Dairy & Food Ingredients Supplier'}</title>
        <html lang={isZh ? 'zh-CN' : 'en'} />
        <meta
          name="description"
          content={
            isZh
              ? '跨客食品（Quark Dairy）是面向全球食品饮料品牌的 B2B 原料供应商，主营乳制品原料、植物提取物、饮料浓浆、果酱及咸味调味料，并提供定制化研发与 OEM 解决方案。'
              : 'Quark Dairy is a global B2B supplier of dairy ingredients, plant extracts, beverage syrups, fruit jams and savory ingredients — with custom R&D solutions for F&B brands worldwide.'
          }
        />
        <meta
          name="keywords"
          content={
            isZh
              ? '跨客食品,跨客乳业,乳品原料供应商,食品原料,植物提取物,饮料浓浆,果酱,咸味调味料,定制研发,OEM 代工,清真认证原料'
              : 'Quark Dairy, dairy ingredients supplier, plant extracts, beverage syrups, fruit jams, savory ingredients, food ingredients B2B, custom R&D, OEM food manufacturing, Halal ingredients'
          }
        />
        {seoLinkTags(`/`, isZh)}
        <meta property="og:title" content={isZh ? '跨客食品 | 全球食品原料与定制研发' : 'Quark Dairy | Global Food Ingredients & R&D Solutions'} />
        <meta property="og:description" content={isZh ? '面向全球食品饮料品牌的乳制品原料、植物提取物、饮料浓浆、果酱及咸味原料供应商。' : 'Global B2B supplier of dairy, plant extracts, syrups, jams and savory ingredients. Custom R&D for F&B brands.'} />
        <meta property="og:locale" content={isZh ? 'zh_CN' : 'en_US'} />
        <meta property="og:locale:alternate" content={isZh ? 'en_US' : 'zh_CN'} />
        <meta name="twitter:title" content={isZh ? '跨客食品 | 全球食品原料供应商' : 'Quark Dairy | Global Food Ingredients'} />
        <meta name="twitter:description" content={isZh ? '乳制品原料、植物提取物、饮料浓浆、果酱与咸味原料，定制研发与 OEM 解决方案。' : 'Premium dairy, plant extracts, syrups, jams & savory ingredients with custom R&D.'} />

        {/* JSON-LD: FAQPage only.
            Organization + WebSite are injected STATICALLY in index.html so that
            non-JS crawlers (Baiduspider/360/Sogou) can read them. Injecting them
            here too would duplicate the nodes in the live DOM.
            Keep the FAQ copy below in sync with index.html's meta description. */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': 'https://www.quarkdairy.cn/#faq',
            mainEntity: [
                  {
                    '@type': 'Question',
                    name: isZh ? '你们是否提供 OEM/ODM 代工服务？' : 'Do you offer OEM/ODM manufacturing services?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: isZh
                        ? '是的，我们提供从配方研发、原料选择到量产交付的全链路 OEM/ODM 服务。研发周期通常 4–12 周，最小起订量（MOQ）根据品类与定制深度而不同，请通过询盘表单与我们联系。'
                        : 'Yes — we offer end-to-end OEM/ODM services, from formula R&D and ingredient sourcing to mass production. Typical R&D lead time is 4–12 weeks. MOQ varies by product category and customization depth. Please reach out via the inquiry form for details.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: isZh ? '你们的产品是否具备清真（Halal）认证？' : 'Are your products Halal certified?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: isZh
                        ? '我们的大部分乳制品、植物提取物、浓浆与果酱产品已通过国际认可的 Halal 认证机构审核并持有有效证书。猪肉蛋白多肽等部分产品不适用 Halal 认证，产品页已明确标注 isHalal 字段。'
                        : 'Most of our dairy, plant extract, syrup and jam products are certified Halal by internationally recognized certification bodies and hold valid certificates. Products containing porcine proteins (e.g., pork peptide) are explicitly NOT Halal-certified and are flagged on the product page (isHalal: false).',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: isZh ? '最小起订量（MOQ）和交期是多少？' : 'What are your MOQ and lead time?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: isZh
                        ? '现货订单与定制项目的最小起订量因产品类别、包装规格及目的市场法规要求而异；交期根据订单复杂度与目的港确定。我们将根据您的具体需求提供详细的报价与交期方案，欢迎提交询盘。'
                        : 'Minimum order quantities and lead times for both in-stock and custom projects vary by product category, packaging spec and destination-market regulatory requirements. Lead times depend on order complexity and destination port. We will provide a detailed quotation and delivery schedule tailored to your specific needs — please submit an inquiry.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: isZh ? '可以提供样品吗？样品是免费还是收费？' : 'Can I request samples? Are samples free or paid?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: isZh
                        ? '是的，我们通常为新采购方提供 100–500g 的免费样品（运费由客户承担）。请通过询盘表单提交样品需求，我们的销售工程师会在 1–2 个工作日内回复。'
                        : 'Yes — we typically provide 100–500g free samples for new buyers (shipping at buyer’s cost). Submit your request via the inquiry form and our sales engineer will respond within 1–2 business days.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: isZh ? '你们提供哪些质量认证文件？' : 'What quality certifications do you provide?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: isZh
                        ? '常规产品每批次均提供 COA（成分分析报告）。HACCP、ISO 22000、BRC 等体系认证证书以及定制配方的完整规格表可在签订保密协议（NDA）后提供。'
                        : 'Every batch ships with a COA (Certificate of Analysis). System-level certifications (HACCP, ISO 22000, BRC) and full spec sheets for custom formulations are available after NDA execution.',
                    },
                  },
                  {
                    '@type': 'Question',
                    name: isZh ? '你们能出口到哪些国家/地区？' : 'Which countries/regions do you export to?',
                    acceptedAnswer: {
                      '@type': 'Answer',
                      text: isZh
                        ? '我们已出口至东南亚（泰国、马来西亚、印尼、菲律宾、越南）、中东（沙特、阿联酋、卡塔尔）、南亚（印度、孟加拉、巴基斯坦）、北美及欧洲等多个地区。'
                        : 'We currently export to Southeast Asia (Thailand, Malaysia, Indonesia, Philippines, Vietnam), the Middle East (Saudi Arabia, UAE, Qatar), South Asia (India, Bangladesh, Pakistan), North America and Europe.',
                    },
                  },
                ],
          })}
        </script>
      </Helmet>
      <Hero onWatchVideo={() => setVideoOpen(true)} />
      <CategoryGrid />
      <QuarkAtAGlance />
      <CustomSolutions />
      <Pasture onWatchVideo={() => setPastureVideoOpen(true)} />

      <VideoModal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        videoUrl={COMPANY_VIDEO_URL}
      />
      <VideoModal
        isOpen={pastureVideoOpen}
        onClose={() => setPastureVideoOpen(false)}
        videoUrl={PASTURE_VIDEO_URL}
      />
    </>
  );
};

export default HomePage;
