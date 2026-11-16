import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactFAQ: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  const items = [1, 2, 3, 4, 5, 6];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <span className="text-brand-green/45 font-semibold text-sm uppercase tracking-wider">FAQ</span>
        <h2 className="text-2xl md:text-3xl font-bold text-brand-green mt-2">
          {t('contact.faq_title')}
        </h2>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((n, idx) => (
          <div key={n} className="card overflow-hidden">
            <button
              type="button"
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-start justify-between gap-4 p-5 text-left hover:bg-brand-cream/40 transition-colors"
              aria-expanded={open === idx}
            >
              <span className="font-semibold text-brand-green flex-1">
                {t(`contact.faq${n}_q`)}
              </span>
              <span
                className={`text-brand-green/45 group-hover:text-brand-orange flex-shrink-0 transition-colors text-xl ${
                  open === idx ? 'rotate-45' : ''
                }`}
              >
                +
              </span>
            </button>
            {open === idx && (
              <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-brand-support-green/10 pt-4">
                {t(`contact.faq${n}_a`)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactFAQ;