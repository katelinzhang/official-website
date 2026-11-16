/**
 * 语言与 URL 的唯一真相源。
 *
 * 约定：**URL 决定语言**，不看浏览器语言、不看 localStorage。
 *   英文 → 无前缀      /  /products  /products/amf
 *   中文 → /zh 前缀    /zh  /zh/products  /zh/products/amf
 *
 * 英文保留无前缀，是为了不破坏 Google 已经收录的既有 URL；
 * 中文用 /zh 前缀，是为了让中文版本有独立、可被索引的地址
 * （否则切换语言不改 URL，中文内容对搜索引擎近乎不可见）。
 */

export const ZH_PREFIX = '/zh';
export const SITE_ORIGIN = 'https://www.quarkdairy.cn';

/** 该路径是否是中文版本 */
export const isZhPath = (pathname: string): boolean =>
  pathname === ZH_PREFIX || pathname.startsWith(ZH_PREFIX + '/');

/** 去掉 /zh 前缀，得到「语言无关路径」。/zh → /，/zh/products/amf → /products/amf */
export const stripZhPrefix = (pathname: string): string => {
  if (pathname === ZH_PREFIX) return '/';
  if (pathname.startsWith(ZH_PREFIX + '/')) return pathname.slice(ZH_PREFIX.length);
  return pathname;
};

/** 给语言无关路径加 /zh 前缀。/ → /zh，/products → /zh/products */
export const addZhPrefix = (pathname: string): string =>
  pathname === '/' ? ZH_PREFIX : ZH_PREFIX + pathname;

/** 当前页面切换到另一种语言后的路径 */
export const counterpartPath = (pathname: string, targetZh: boolean): string => {
  const base = stripZhPrefix(pathname);
  return targetZh ? addZhPrefix(base) : base;
};

/** 路径 → 站点绝对 URL */
export const absoluteUrl = (pathname: string): string => SITE_ORIGIN + pathname;

/** 按当前语言给路径加前缀（用于 navigate() 这类手写跳转） */
export const localizePath = (path: string, isZh: boolean): string =>
  isZh ? addZhPrefix(path) : path;
