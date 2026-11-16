import React from 'react';
import { useTranslation } from 'react-i18next';

interface Badge {
  icon: React.ReactNode;
  key: string;
}

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.063 2.522-.187 3.757a48.345 48.345 0 01-1.118 6.058c-.21.95-.86 1.685-1.728 1.978a48.106 48.106 0 01-15.934 0c-.868-.293-1.518-1.028-1.728-1.978a48.345 48.345 0 01-1.118-6.057A48.107 48.107 0 012.25 12c0-2.927.238-5.815.715-8.159.21-.95.86-1.685 1.728-1.978A48.097 48.097 0 0112 1.5c2.653 0 5.196.231 7.643.678 1.07.288 1.868 1.02 2.073 1.978A48.106 48.106 0 0121.75 12z" />
  </svg>
);

const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.36 3.318-1.414 3.318H4.212c-1.774 0-2.646-2.086-1.414-3.318L5 14.5" />
  </svg>
);

const GlobeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>
);

const PromiseBadges: React.FC = () => {
  const { t } = useTranslation();

  const badges: Badge[] = [
    { icon: <ClockIcon className="w-6 h-6" />, key: 'promise_reply' },
    { icon: <ShieldIcon className="w-6 h-6" />, key: 'promise_nda' },
    { icon: <BeakerIcon className="w-6 h-6" />, key: 'promise_sample' },
    { icon: <GlobeIcon className="w-6 h-6" />, key: 'promise_global' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
      {badges.map((b) => (
        <div
          key={b.key}
          className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-2.5 rounded-xl border border-white/15 text-white text-xs font-medium"
        >
          <span className="text-brand-support-green flex-shrink-0">{b.icon}</span>
          <span className="text-white/85 font-medium">{t(`contact.${b.key}`)}</span>
        </div>
      ))}
    </div>
  );
};

export default PromiseBadges;