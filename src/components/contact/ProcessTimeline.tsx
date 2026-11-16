import React from 'react';
import { useTranslation } from 'react-i18next';

const ProcessTimeline: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  const steps = [1, 2, 3];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">
          {isZh ? '询盘之后' : 'After You Submit'}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green mt-2">
          {t('contact.process_title')}
        </h2>
      </div>

      {/* Desktop: 3 列水平时间轴 */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 relative">
        {/* 连接线 */}
        <div className="absolute top-7 left-[16.67%] right-[16.67%] h-0.5 bg-brand-support-green/20 -z-0" />
        {steps.map((n) => (
          <div key={n} className="relative z-10 text-center">
            <div className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-black/20 mx-auto mb-4">
              {n}
            </div>
            <h3 className="text-base font-bold text-brand-green mb-2">
              {t(`contact.process_0${n}_title`)}
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              {t(`contact.process_0${n}_desc`)}
            </p>
          </div>
        ))}
      </div>

      {/* Mobile: 垂直时间轴 */}
      <div className="md:hidden space-y-5 relative">
        <div className="absolute top-7 bottom-7 left-7 w-0.5 bg-brand-support-green/20" />
        {steps.map((n) => (
          <div key={n} className="flex gap-4 relative">
            <div className="w-14 h-14 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-black/20 flex-shrink-0">
              {n}
            </div>
            <div className="pt-2">
              <h3 className="text-base font-bold text-brand-green mb-1">
                {t(`contact.process_0${n}_title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`contact.process_0${n}_desc`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;