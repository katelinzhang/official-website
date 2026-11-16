import React from 'react';
import { useTranslation } from 'react-i18next';

const pastureImages = [
  '/images/pasture/微信图片_20260812140353_2141_1.jpg',
  '/images/pasture/微信图片_20260812141507_2153_1.jpg',
  '/images/pasture/微信图片_20260812141855_2159_1.jpg',
  '/images/pasture/微信图片_20260812142139_2165_1.jpg',
];

interface PastureProps {
  onWatchVideo: () => void;
}

const Pasture: React.FC<PastureProps> = ({ onWatchVideo }) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <section className="relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FFF8EA 0%, #E8F2DD 25%, #DCEACD 50%, #E8F2DD 75%, #FFF8EA 100%)' }}>
      {/* Decorative background circles */}
      <div className="absolute top-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full bg-brand-support-green/[0.03] border border-brand-support-green/[0.06]" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-orange/[0.03] border border-brand-orange/[0.06]" />

      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Magazine-layout photo grid */}
          <div className="space-y-3">
            {/* Hero wide photo */}
            <div className="overflow-hidden rounded-3xl shadow-lg border border-brand-support-green/10 ring-1 ring-black/[0.02]">
              <img
                src={pastureImages[0]}
                alt={isZh ? '自有牧场全景' : 'Pasture panorama'}
                className="w-full aspect-[3/2] object-cover hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            {/* Two square photos below */}
            <div className="grid grid-cols-2 gap-3">
              {[pastureImages[1], pastureImages[2]].map((src, idx) => (
                <div
                  key={idx}
                  className="overflow-hidden rounded-2xl shadow-md border border-brand-support-green/10 ring-1 ring-black/[0.02]"
                >
                  <img
                    src={src}
                    alt={isZh ? `牧场实景 ${idx + 2}` : `Pasture image ${idx + 2}`}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Text */}
          <div>
            {/* eyebrow 内容从「Source Control」改为「Sanmenxia, Henan · A2 Herd」——
                原值与标题「Quality Begins at the Source」里的 Source 重复，
                属于 eyebrow 教程点名的反模式：引导语必须提供标题没有的新信息。
                改成地点 + 品种后，这行说的是标题给不了的“具体是哪”。 */}
            <p className="section-eyebrow mb-3">
              {t('home.pasture_label')}
            </p>
            <h2 className="section-title mb-5">
              {t('home.pasture_title')}
            </h2>
            <p className="text-[15px] text-gray-500 mb-8 leading-relaxed max-w-lg">
              {t('home.pasture_desc')}
            </p>

            {/* Feature cards */}
            <div className="grid grid-cols-3 gap-3 mb-9">
              {[
                { key: 'location', zh: '河南三门峡', en: 'Sanmenxia', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                )},
                { key: 'breed', zh: 'A2 荷斯坦', en: 'A2 Holstein', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763" />
                  </svg>
                )},
                { key: 'cert', zh: '国际认证', en: 'Certified', icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                )},
              ].map((b) => (
                <div
                  key={b.key}
                  className="card p-3.5 text-center group hover:border-brand-support-green/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-support-green/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-support-green/20 transition-colors">
                    <span className="text-brand-support-green">{b.icon}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-brand-green leading-tight">
                    {isZh ? b.zh : b.en}
                  </p>
                </div>
              ))}
            </div>

            <button onClick={onWatchVideo} className="btn-primary text-sm">
              {t('home.pasture_cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pasture;
