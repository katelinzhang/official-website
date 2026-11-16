import React from 'react';
import { useTranslation } from 'react-i18next';

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5M3.75 15h16.5M12 3c2.485 0 4.5 4.03 4.5 9s-2.015 9-4.5 9m0-18c-2.485 0-4.5 4.03-4.5 9s2.015 9 4.5 9" />
  </svg>
);

const BoltIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.36 3.318-1.414 3.318H4.212c-1.774 0-2.646-2.086-1.414-3.318L5 14.5" />
  </svg>
);

const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.063 2.522-.187 3.757a48.345 48.345 0 01-1.118 6.058c-.21.95-.86 1.685-1.728 1.978a48.106 48.106 0 01-15.934 0c-.868-.293-1.518-1.028-1.728-1.978a48.345 48.345 0 01-1.118-6.057A48.107 48.107 0 012.25 12c0-2.927.238-5.815.715-8.159.21-.95.86-1.685 1.728-1.978A48.097 48.097 0 0112 1.5c2.653 0 5.196.231 7.643.678 1.07.288 1.868 1.02 2.073 1.978A48.106 48.106 0 0121.75 12z" />
  </svg>
);

const TrustAnchors: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { Icon: GlobeIcon, value: '5+', key: 'regions' },
    { Icon: BoltIcon, value: '4–12', key: 'lead_time' },
    { Icon: BeakerIcon, value: '100–500g', key: 'sample' },
    { Icon: ShieldCheckIcon, value: 'BRCGS·HACCP·HALAL', key: 'certified' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-brand-green">
          {t('contact.trust_title')}
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="card p-4 md:p-5 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-support-green/10 text-brand-support-green mb-3">
              <item.Icon className="w-6 h-6" />
            </div>
            {/* 「·」分隔的认证串（如 BRCGS·HACCP·HALAL）在浏览器眼里是
                一个不可拆分的单词，窄屏 2 列布局下会撑破卡片并顶出整页
                横向滚动条（实测 375px 下多出 35px）。
                不用 break-all —— 那会把 BRCGS 拆成 BR / CGS，不可接受。
                改为在分隔点插<wbr>，断行只发生在「·」之后，认证名始终完整。*/}
            <div className="text-lg md:text-xl font-bold text-brand-green leading-tight break-words">
              {item.value.split('·').map((seg, i, arr) => (
                <React.Fragment key={i}>
                  {seg}
                  {i < arr.length - 1 ? '·' : null}
                  {i < arr.length - 1 ? <wbr /> : null}
                </React.Fragment>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-1 leading-snug">
              {t(`contact.trust_${item.key}`)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustAnchors;