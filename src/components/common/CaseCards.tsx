import React from 'react';
import LocalizedLink from './LocalizedLink';
import { useTranslation } from 'react-i18next';
import { cases } from '../../data/cases';

/** Grid of application case cards linking to /cases/:id — shared by About & Solutions pages */
const CaseCards: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cases.map((c) => (
        <LocalizedLink
          key={c.id}
          to={`/cases/${c.id}`}
          className="card card-hover overflow-hidden group block"
        >
          <div className="relative overflow-hidden">
            <img
              src={c.hero_image}
              alt={isZh ? c.title_zh : c.title_en}
              className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-green text-white text-xs font-semibold rounded-full shadow">
              {c.years}
            </span>
          </div>
          <div className="p-6">
            <p className="text-xs text-gray-500 mb-1">
              {isZh ? c.category_zh : c.category_en}
            </p>
            <h3 className="font-bold text-brand-green mb-2 group-hover:text-brand-orange transition-colors leading-snug">
              {isZh ? c.title_zh : c.title_en}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-3">
              {isZh ? c.summary_zh : c.summary_en}
            </p>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-support-green group-hover:gap-2 transition-all">
              {isZh ? '查看案例' : 'View case'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </LocalizedLink>
      ))}
    </div>
  );
};

export default CaseCards;
