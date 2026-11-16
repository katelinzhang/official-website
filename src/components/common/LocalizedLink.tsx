import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { addZhPrefix } from '../../utils/locale';

/**
 * 语言感知的内部链接：中文版自动补 /zh 前缀。
 *
 * 新增内链一律用这个组件，**不要直接用 react-router 的 <Link>** ——
 * 直接用会在中文版里跳回英文版，把用户踢出中文索引。
 */
const LocalizedLink: React.FC<LinkProps> = ({ to, ...rest }) => {
  const { i18n } = useTranslation();
  const isZh = i18n.language === 'zh';
  const target = typeof to === 'string' ? (isZh ? addZhPrefix(to) : to) : to;

  return <Link to={target} {...rest} />;
};

export default LocalizedLink;
