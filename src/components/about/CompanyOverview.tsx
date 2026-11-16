import React from 'react';
import { useTranslation } from 'react-i18next';

// CompanyOverview —— V3 「真实图版本」
//
// 设计原则：
// 1. 图片面积 > 75%，文字比例 < 25%
// 2. 9 张图全部来自公司介绍 PDF（quark-dairy-intro）真实图（牧场/工厂/港口/仓库）
// 3. 不再使用 AI 生成图（用户：别老是烧 token）
// 4. 文字颜色降到 brand-green/55 以下，淡化存在感
// 5. 图片边缘模糊（融入 cream 背景），黑白斑点 mask（行业隐喻）

interface ImageCardProps {
  src: string;
  alt: string;
  index: string;
  caption: string;
  meta: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, index, caption, meta }) => (
  <figure className="group">
    {/* 图主体 —— 奶牛纹 + 边缘模糊 + 暖色 tint */}
    <div className="about-img-frame aspect-[4/3] overflow-hidden">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      <div className="cow-mask" aria-hidden="true" />
    </div>
    {/* 淡色 caption —— brand-green/55 + brand-green/40 */}
    <figcaption className="mt-4 pl-4 border-l border-brand-support-green/25">
      <p className="text-[11px] uppercase tracking-widest text-brand-green/45 font-light mb-1.5">
        {index}
      </p>
      <p className="text-sm text-brand-green/65 leading-snug mb-1">{caption}</p>
      <p className="text-xs text-brand-green/40 leading-snug">{meta}</p>
    </figcaption>
  </figure>
);

const CompanyOverview: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <section className="section-cream">
      <div className="container-custom section-padding">
        {/* Header —— 淡色 eyebrow + 标题 + 简短描述 */}
        <div className="max-w-3xl mb-20">
          <p className="text-xs uppercase tracking-widest text-brand-green/45 mb-4">
            {t('about_co.eyebrow')}
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-green mb-5 leading-tight">
            {t('about_co.title')}
          </h2>
          <p className="text-base md:text-lg text-brand-green/55 leading-relaxed font-light">
            {t('about_co.subtitle')}
          </p>
        </div>

        {/* ─── Section 01 — Heritage & Sourcing（牧场 → 工厂） ─── */}
        <div className="mb-24">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-2xl font-light text-brand-green/25 leading-none">01</span>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-green/75">
              {t('about_co.s1_title')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ImageCard
              src="/images/about/01a-pasture-panorama.jpg"
              alt={isZh ? 'Holstein 奶牛在北纬 40°-47° 黄金奶源带' : 'Holstein herd grazing on the 40°–47° golden-lactation belt'}
              index="01"
              caption={t('about_co.s1_cap_pasture')}
              meta={t('about_co.s1_cap_pasture_meta')}
            />
            <ImageCard
              src="/images/about/01b-ranch-cows.jpg"
              alt={isZh ? '三门峡自有牧场 A2 荷斯坦牛群' : 'A2 Holstein herd at Sanmenxia Ranch'}
              index="02"
              caption={t('about_co.s1_cap_ranch')}
              meta={t('about_co.s1_cap_ranch_meta')}
            />
            <ImageCard
              src="/images/about/01c-factory-aerial.jpg"
              alt={isZh ? '现代化生产工厂鸟瞰' : 'Aerial view of the processing facility'}
              index="03"
              caption={t('about_co.s1_cap_aerial')}
              meta={t('about_co.s1_cap_aerial_meta')}
            />
          </div>
        </div>

        {/* ─── Section 02 — Trade & Supply Chain（仓库 → 港口） ─── */}
        <div className="mb-24">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-2xl font-light text-brand-green/25 leading-none">02</span>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-green/75">
              {t('about_co.s2_title')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ImageCard
              src="/images/about/02a-cold-chain-doors.jpg"
              alt={isZh ? '冷链仓库装卸区' : 'Cold-chain warehouse loading bays'}
              index="01"
              caption={t('about_co.s2_cap_cold')}
              meta={t('about_co.s2_cap_cold_meta')}
            />
            <ImageCard
              src="/images/about/02b-warehouse-shelves.jpg"
              alt={isZh ? '高位货架立体仓库' : 'High-bay pallet warehouse'}
              index="02"
              caption={t('about_co.s2_cap_shelves')}
              meta={t('about_co.s2_cap_shelves_meta')}
            />
            <ImageCard
              src="/images/about/02c-port-container-ship.jpg"
              alt={isZh ? '关键港口集装箱装船' : 'Container vessel at a key export port'}
              index="03"
              caption={t('about_co.s2_cap_port')}
              meta={t('about_co.s2_cap_port_meta')}
            />
          </div>
        </div>

        {/* ─── Section 03 — Quality & Global Reach（工厂 + 乳品全链路） ─── */}
        <div className="mb-16">
          <div className="flex items-baseline gap-4 mb-10">
            <span className="text-2xl font-light text-brand-green/25 leading-none">03</span>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-brand-green/75">
              {t('about_co.s3_title')}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <ImageCard
              src="/images/about/03a-factory-overview.jpg"
              alt={isZh ? '多线生产工厂外景' : 'Multi-line processing plant overview'}
              index="01"
              caption={t('about_co.s3_cap_overview')}
              meta={t('about_co.s3_cap_overview_meta')}
            />
            <ImageCard
              src="/images/about/03b-factory-towers.jpg"
              alt={isZh ? '喷雾干燥塔与深加工产线' : 'Spray-drying towers and deep-processing lines'}
              index="02"
              caption={t('about_co.s3_cap_towers')}
              meta={t('about_co.s3_cap_towers_meta')}
            />
            <ImageCard
              src="/images/about/03c-dairy-collage.jpg"
              alt={isZh ? '从牧场到餐桌的全链路' : 'From farm to table — dairy in one frame'}
              index="03"
              caption={t('about_co.s3_cap_collage')}
              meta={t('about_co.s3_cap_collage_meta')}
            />
          </div>
        </div>

        {/* Footer —— PDF 下载链接（淡色） */}
        <div className="pt-8 border-t border-brand-support-green/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-green/45">{t('about_co.footer_note')}</p>
          <a
            href="/company-intro.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-green/70 hover:text-brand-orange transition-colors"
          >
            <span>{t('about_co.source_link')}</span>
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;