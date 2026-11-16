import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LocalizedLink from '../common/LocalizedLink';
import { counterpartPath, stripZhPrefix } from '../../utils/locale';

const navItems = [
  { key: 'home', path: '/' },
  { key: 'products', path: '/products' },
  { key: 'solutions', path: '/solutions' },
  { key: 'about', path: '/about' },
  { key: 'contact', path: '/contact' },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /**
   * 语言切换 = 跳转到另一语言版本的 URL（而不是只改 i18n 状态）。
   * 这样中文版有独立可索引地址，搜索引擎才能分别收录两种语言。
   */
  const toggleLang = () => {
    navigate(counterpartPath(location.pathname, !isZh));
  };

  // 去掉 /zh 前缀后比较，否则中文版下导航永远不会高亮
  const currentPath = stripZhPrefix(location.pathname);
  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-brand-green to-[#0f2920] border-b border-brand-support-green/20 shadow-header">
      <div className="container-custom section-padding !py-0">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <LocalizedLink to="/" className="inline-flex items-center min-h-[44px]">
              <img
                src="/images/logo-white.png?v=1"
                alt="Quark Dairy Intelligence Institute"
                className="h-10 md:h-12 w-auto object-contain flex-shrink-0"
              />
            </LocalizedLink>
            <a
              href="/company-intro.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block group cursor-pointer hover:opacity-80 transition-opacity relative"
            >
              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-brand-green text-xs font-medium rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {isZh ? '了解更多' : 'Learn More'}
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5 border-4 border-transparent border-t-white" />
              </span>
              <p className="text-lg md:text-xl font-bold text-white leading-tight font-heading tracking-tight">{isZh ? '跨客食品科技' : 'Quark Dairy'}</p>
              <p className="text-[11px] text-white/50 leading-tight tracking-wide">{isZh ? '（上海）有限公司' : 'Intelligence Institute'}</p>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5 bg-white/[0.08] backdrop-blur-md rounded-xl p-1 border border-white/10 shadow-header">
            {navItems.map((item) => (
              <LocalizedLink
                key={item.key}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-brand-orange text-white shadow-[0_2px_8px_rgba(255,149,54,0.3)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(`nav.${item.key}`)}
              </LocalizedLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <LocalizedLink to="/contact" className="hidden sm:inline-flex btn-primary !px-4 !py-2 text-xs">
              {t('home.quick_inquiry')}
            </LocalizedLink>
            <button
              onClick={toggleLang}
              className="px-3 py-1.5 min-h-[44px] inline-flex items-center text-xs font-medium rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
            >
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </button>

            {/* Animated Hamburger Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-11 h-11 rounded-xl hover:bg-white/10 ml-1 flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-3.5">
                {/* Top bar */}
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${
                    mobileOpen ? 'top-[6px] rotate-45' : 'top-0'
                  }`}
                />
                {/* Middle bar */}
                <span
                  className={`absolute left-0 top-[6px] h-0.5 w-5 bg-white rounded-full transition-all duration-200 ${
                    mobileOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                  }`}
                />
                {/* Bottom bar */}
                <span
                  className={`absolute left-0 h-0.5 w-5 bg-white rounded-full transition-all duration-300 ${
                    mobileOpen ? 'top-[6px] -rotate-45' : 'top-[13px]'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Nav — animated slide-down */}
        <div
          className={`lg:hidden grid transition-all duration-300 ease-out ${
            mobileOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <nav className="pb-5 pt-2 space-y-1">
              <div className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/10 p-2 space-y-0.5 shadow-lg">
                {navItems.map((item) => (
                  <LocalizedLink
                    key={item.key}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-brand-orange text-white shadow-[0_2px_8px_rgba(255,149,54,0.25)]'
                        : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {/* Nav icon */}
                    <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      {item.key === 'home' && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      )}
                      {item.key === 'products' && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                      {item.key === 'solutions' && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      )}
                      {item.key === 'about' && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {item.key === 'contact' && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </span>
                    {t(`nav.${item.key}`)}
                  </LocalizedLink>
                ))}
              </div>

              {/* Quick Inquiry CTA */}
              <LocalizedLink
                to="/contact"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold
                           bg-brand-orange text-white shadow-[0_4px_14px_rgba(255,149,54,0.25)]
                           hover:bg-orange-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {t('home.quick_inquiry')}
              </LocalizedLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
