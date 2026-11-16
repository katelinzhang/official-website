import React from 'react';
import { absoluteUrl, addZhPrefix } from '../../utils/locale';

/**
 * 生成每页的 canonical + hreflang + og:url 标签。
 *
 * 必须返回**数组**而不是 React 组件：react-helmet-async 的 mapChildrenToProps
 * 用 React.Children.forEach 遍历子节点，遇到函数类型会先走 warnOnInvalidChildren
 * （内部是 fbjs invariant，条件为假直接 throw），随后落到 default 分支被当成
 * 未知标签写进 props。自定义组件放进 <Helmet> 会直接抛异常导致整页白屏。
 *
 * 数组会被 React.Children.forEach 自动摊平，每个 link/meta 都仍是 Helmet 的
 * 直接子节点，因此完全受 Helmet 管理（自动去重、卸载时自动清理）。
 *
 * path 传「语言无关路径」（如 /products），按当前语言拼出对应绝对 URL。
 */
export const seoLinkTags = (path: string, isZh: boolean): React.ReactElement[] => {
  const enUrl = absoluteUrl(path);
  const zhUrl = absoluteUrl(addZhPrefix(path));
  const currentUrl = isZh ? zhUrl : enUrl;

  return [
    <link key="canonical" rel="canonical" href={currentUrl} />,
    <link key="hreflang-en" rel="alternate" hrefLang="en" href={enUrl} />,
    <link key="hreflang-zh" rel="alternate" hrefLang="zh-CN" href={zhUrl} />,
    <link key="hreflang-xdefault" rel="alternate" hrefLang="x-default" href={enUrl} />,
    // og:url 跟随语言，否则中文页面分享出去仍指向英文地址
    <meta key="og-url" property="og:url" content={currentUrl} />,
  ];
};

export default seoLinkTags;