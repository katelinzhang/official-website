import React from 'react';
import LocalizedLink from '../common/LocalizedLink';
import { useTranslation } from 'react-i18next';
import { FlaskIcon, SyrupIcon, SolutionIcon } from '../common/Icons';

/** 三个定制维度在 solutions 页的锚点 key，顺序必须与 customDims 一致，
 *  也必须与 CustomSolutionsPage 里 dimensions 的 key 顺序一致。 */
const DIM_ANCHORS = ['flavor', 'concentration', 'oem'];

const CustomSolutions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const customDims: string[] = t('home.custom_dims', { returnObjects: true }) as unknown as string[];
  const dimIcons = [FlaskIcon, SyrupIcon, SolutionIcon];

  return (
    <section className="section-orange-tint">
      <div className="container-custom section-padding">
        {/* 上半：左文右图 + 浮动装饰 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          <div>
            {/* 引导语从 section-tag（药丸）改为 section-eyebrow（无框文本）。
                药丸带底色且前面带圆点，会读成「可点击的标签」或「新」，
                而这里只是区块语境说明，无框文本才不误导。
                desc 仍保留 max-w-md —— 这是左文右图布局，
                宽度由版面决定，不套 section-desc 的 max-w-2xl。 */}
            <p className="section-eyebrow mb-3">
              {t('home.rd_center_label')}
            </p>
            <h2 className="section-title mb-4">
              {t('home.solutions_title')}
            </h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-md">
              {t('home.solutions_desc')}
            </p>
            <div className="mb-6 inline-flex items-center gap-2 text-xs text-gray-500 bg-white px-3 py-1.5 rounded-full border border-brand-support-green/25">
              <FlaskIcon className="w-4 h-4 text-brand-support-green" />
              <span>{t('home.rd_center_desc')}</span>
            </div>
            <div>
              <LocalizedLink to="/solutions" className="btn-primary text-sm">
                {t('home.solutions_cta')}
              </LocalizedLink>
            </div>
          </div>

          <div className="relative">
            <img
              src="/images/homepage-rd.webp"
              alt={isZh ? '应用研发中心' : 'Application R&D Center'}
              className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
              loading="lazy"
            />
            {/* 浮动装饰 1：右下角白色卡片。
                出血量受容器边距约束：.container-custom 是 max-w-7xl(1280)
                且无水平 padding，视口 1024~1280 时容器边距只有 24px，
                而 -left-8(32px) + rotate(-6deg) 的额外外扩≈37px，会顶出
                横向滚动条（实测 768/820 溢出 14px、1024~1280 溢出 6px）。
                故出血限定为 lg 断点以上且不超过 16px。*/}
            <div className="absolute -bottom-5 left-0 lg:-left-4 bg-white rounded-2xl p-4 shadow-xl flex items-center gap-3 border border-brand-support-green/15">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-brand-support-green/10 text-brand-support-green">
                <FlaskIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-brand-green">{t('home.rd_center_card_label')}</div>
                <div className="text-xs text-gray-500">{isZh ? '端到端研发' : 'End-to-End R&D'}</div>
              </div>
            </div>
            {/* 浮动装饰 2：右上角统计徽章 —— 深绿实底。
                橙色留给 CTA（下方 btn-primary），这里再抢就喧宾夺主。 */}
            <div className="absolute -top-5 right-0 lg:-right-4 bg-brand-green text-white rounded-full w-24 h-24 md:w-28 md:h-28 flex items-center justify-center shadow-xl shadow-black/15 rotate-[-6deg]">
              <div className="text-center leading-tight">
                <div className="text-2xl md:text-3xl font-bold">4–12</div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-white/75">
                  {isZh ? '周交付' : 'Weeks'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 下半：3 张杂志风卡片（替换原 pill 标签） */}
        <div className="border-t border-brand-support-green/20 pt-12 md:pt-16">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">
              {t('home.custom_dim_section_label')}
            </span>
            <p className="text-gray-600 max-w-2xl mx-auto mt-3 text-sm leading-relaxed">
              {t('home.custom_dim_section_desc')}
            </p>
          </div>
          {/* 卡片顺序必须与 solutions 页 dimensions 的 key 顺序一致：
            flavor → concentration → oem。链接带上锚点后，点击直达目标卡片，
            而不是像原先那样四个入口全落到页首再手动滚动。
            文案也拆成三个具体动作，避免四个入口都叫「Learn more」——
            既满足 DeepSeek 建议的「具体行动指向」，也符合项目 i18n 去重规范。*/}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customDims.map((title, idx) => {
              const Icon = dimIcons[idx] ?? FlaskIcon;
              const descKey = `custom_dim_0${idx + 1}_desc`;
              const anchor = DIM_ANCHORS[idx];
              return (
                <article
                  key={title}
                  className="group relative card p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-brand-support-green/25"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-support-green/10 text-brand-support-green group-hover:bg-brand-support-green group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-4xl font-bold text-brand-green/15 group-hover:text-brand-support-green/50 transition-colors leading-none">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-green mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {t(`home.${descKey}`)}
                  </p>
                  <LocalizedLink to={`/solutions#dim-${anchor}`} className="link-subtle text-sm">
                    {t(`home.custom_dim_more_${anchor}`)}
                    <span aria-hidden>→</span>
                  </LocalizedLink>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomSolutions;