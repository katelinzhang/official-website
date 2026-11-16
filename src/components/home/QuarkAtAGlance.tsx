import React from 'react';
import { useTranslation } from 'react-i18next';

// QuarkAtAGlance —— HomePage 轻量版（克制 B2B 高端风格）
// 来自 company-intro.pdf，压缩为 1 句 + 4 个核心数据
// 详细 PDF 内容在 AboutPage / CompanyOverview 中展开
//
// 风格纪律（README §0）：所有数字 font-light tracking-tight，无 card-hover，无 brand-orange 滥用
const QuarkAtAGlance: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { value: '17+', key: 'markets', sub: 'Asia · Middle East · Americas' },
    { value: '25+', key: 'brands', sub: 'International & Domestic Partners' },
    { value: '4', key: 'certs', sub: 'SMETA · ISO 9001 · HACCP · ISO 22000' },
    { value: 'CNAS', key: 'lab', sub: 'HPLC · GC · GC-MS Certified' },
  ];

  return (
    <section className="section-cream">
      <div className="container-custom section-padding">
        {/* Header —— eyebrow + h2 + 描述 */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="section-eyebrow mb-3">
            {t('home.quote_eyebrow')}
          </p>
          <h2 className="section-title mb-4">
            {t('home.quote_title')}
          </h2>
          {/* desc 保留 text-brand-green/65，不套 section-desc（text-gray-500）——
              那是配色改动，超出「归一字号结构」的范围。 */}
          <p className="text-base text-brand-green/65 leading-relaxed">
            {t('home.quote_subtitle')}
          </p>
        </div>

        {/* 数据带 —— 4 列，用 dl 语义 + 细分隔线 */}
        <dl className="grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
          {stats.map((s, idx) => (
            <div
              key={s.key}
              className={`text-center px-4 py-8 ${
                idx > 0 ? 'border-t md:border-t-0 md:border-l border-brand-support-green/15' : ''
              } ${idx >= 2 ? 'border-t md:border-t-0' : ''}`}
            >
              <dt className="text-4xl md:text-4xl font-light tracking-tight text-brand-green mb-2">
                {s.value}
              </dt>
              <dd className="text-sm font-semibold text-brand-green mb-1">
                {t(`home.stat_${s.key}`)}
              </dd>
              <dd className="text-xs text-brand-green/50 leading-snug max-w-[160px] mx-auto">
                {s.sub}
              </dd>
            </div>
          ))}
        </dl>

        {/* Source link —— 次级链接：深绿常驻，hover 升橙。
            不再用橙色，否则会与本页 btn-primary 抢焦点。 */}
        <div className="text-center mt-10">
          <a
            href="/company-intro.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-brand-green/70 hover:text-brand-orange transition-colors duration-200"
          >
            <span>{t('home.quote_source_link')}</span>
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

export default QuarkAtAGlance;