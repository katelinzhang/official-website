import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 锚点滚动补偿。
 *
 * React Router v6 默认不做 scroll restoration：用 <Link to="/x#anchor"> 跳转时，
 * 地址栏的 hash 变了，但页面仍停在原来的滚动位置 —— 锚点等于失效。
 * 实测首页三张定制维度卡的直达链接全部落空（目标卡片 top = -1969px）。
 *
 * 这里在路由变化后手动补上滚动：带 hash 滚到对应元素，否则回到顶部。
 * scrollIntoView 会遵守 html 上的 scroll-padding-top（4.5rem / 5.5rem），
 * 所以目标不会被 sticky header（实测 65px / 81px）遮住。
 *
 * 动效与 index.css 的 prefers-reduced-motion 保持一致：系统开启减弱动效时
 * 改为瞬时跳转，不强制播放平滑滚动。
 */
const ScrollToHash: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }
    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;