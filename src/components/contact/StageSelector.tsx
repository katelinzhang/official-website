import React from 'react';
import { useTranslation } from 'react-i18next';

export type StageKey = '01' | '02' | '03' | '04';

interface StageSelectorProps {
  onSelect: (stage: StageKey) => void;
  selected: StageKey | null;
}

const CompassIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 8.41L13 14l-5.59 2.91L10 11l5.91-2.59z" />
  </svg>
);

const CompareIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L6.75 3m0 0L10.5 7.5M6.75 3v13.5m13.5-9L16.5 3m0 0L12 7.5m4.5-4.5v13.5" />
  </svg>
);

const CartIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const FlaskIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.36 3.318-1.414 3.318H4.212c-1.774 0-2.646-2.086-1.414-3.318L5 14.5" />
  </svg>
);

const STAGES: Array<{
  key: StageKey;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  image: string;
  imageAltKey: string;
}> = [
  { key: '01', Icon: CompassIcon, image: '/images/contact/stages/stage-01-exploring.jpg', imageAltKey: 'stage_01_image_alt' },
  { key: '02', Icon: CompareIcon, image: '/images/contact/stages/stage-02-comparing.jpg', imageAltKey: 'stage_02_image_alt' },
  { key: '03', Icon: CartIcon,    image: '/images/contact/stages/stage-03-sourcing.jpg',  imageAltKey: 'stage_03_image_alt' },
  { key: '04', Icon: FlaskIcon,   image: '/images/contact/stages/stage-04-customizing.jpg', imageAltKey: 'stage_04_image_alt' },
];

const StageSelector: React.FC<StageSelectorProps> = ({ onSelect, selected }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-brand-green/50 mb-3">
          {t('contact.stage_eyebrow')}
        </p>
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-brand-green mb-3">
          {t('contact.stage_title')}
        </h2>
        <p className="text-sm md:text-base text-brand-green/65 leading-relaxed max-w-xl mx-auto">
          {t('contact.stage_subtitle')}
        </p>
      </div>

      {/* Cards grid —— 4 张图卡 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {STAGES.map(({ key, Icon, image, imageAltKey }) => {
          const isSelected = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              className={`group text-left card overflow-hidden transition-all duration-300 ${
                isSelected
                  ? 'ring-2 ring-brand-orange border-brand-orange shadow-card-hover'
                  : 'hover:shadow-card-hover'
              }`}
            >
              {/* 图区域 */}
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-support-green/10">
                <img
                  src={image}
                  alt={t(`contact.${imageAltKey}`)}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isSelected ? 'scale-105' : 'group-hover:scale-105'
                  }`}
                  loading="lazy"
                  decoding="async"
                />
                {/* 渐变蒙版 —— 保证 stage 数字可读 */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/55 via-transparent to-transparent" />
                {/* 装饰大数字 */}
                <span
                  className={`absolute top-3 right-4 text-4xl font-light leading-none ${
                    isSelected ? 'text-white/85' : 'text-white/35 group-hover:text-white/55'
                  } transition-colors`}
                >
                  {key}
                </span>
                {/* 选中态角标 */}
                {isSelected && (
                  <div className="absolute top-3 left-3 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-orange text-white">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>

              {/* 文案区 */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg transition-colors ${
                    isSelected
                      ? 'bg-brand-orange text-white'
                      : 'bg-brand-support-green/10 text-brand-support-green'
                  }`}>
                    <Icon className="w-3.5 h-3.5" />
                  </span>
                  <h3 className="text-base font-semibold text-brand-green">
                    {t(`contact.stage_${key}_label`)}
                  </h3>
                </div>
                <p className="text-xs text-brand-green/60 leading-relaxed mb-3">
                  {t(`contact.stage_${key}_desc`)}
                </p>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
                    isSelected ? 'text-brand-orange' : 'text-brand-green/50 group-hover:text-brand-support-green'
                  }`}
                >
                  {t(`contact.stage_${key}_chip`)}
                  <span aria-hidden>→</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      </div>
  );
};

export default StageSelector;