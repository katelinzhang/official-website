import React from 'react';
import LocalizedLink from '../common/LocalizedLink';
import { useTranslation } from 'react-i18next';
import type { Product, ProductCategory } from '../../types/product';
import ProductImage from '../common/ProductImage';

interface ProductCardProps {
  product: Product;
}

const categoryColors: Record<ProductCategory, string> = {
  dairy: 'bg-blue-50 text-blue-700',
  'plant-extract': 'bg-green-50 text-green-700',
  'beverage-syrup': 'bg-orange-50 text-orange-700',
  'fruit-jam': 'bg-red-50 text-red-700',
  savory: 'bg-amber-50 text-amber-700',
  'custom-solution': 'bg-purple-50 text-purple-700',
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === 'zh';

  return (
    <div className="card card-hover overflow-hidden group">
      {/* Image */}
      <LocalizedLink to={`/products/${product.id}`} className="block overflow-hidden">
        <ProductImage
          src={product.image_url}
          alt={isZh ? product.name_zh : product.name_en}
          className="group-hover:scale-105 transition-transform duration-500"
        />
      </LocalizedLink>

      {/* Content */}
      <div className="p-5">
        {/* Tags row */}
        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
          <span className={`badge ${categoryColors[product.category].split(' ')[0]} ${categoryColors[product.category].split(' ')[1]}`}>
            {t(`categories.${product.category}`)}
          </span>
          {product.isHalal && (
            <span className="badge-green">Halal</span>
          )}
          {product.stockStatus === 'in-stock' ? (
            <span className="badge-green">{t('home.stock_in_stock')}</span>
          ) : (
            <span className="badge-amber">{t('home.stock_made_to_order')}</span>
          )}
        </div>

        {/* Name */}
        <LocalizedLink to={`/products/${product.id}`}>
          <h3 className="font-bold text-brand-green mb-1 group-hover:text-brand-orange transition-colors text-[15px] leading-snug">
            {isZh ? product.name_zh : product.name_en}
          </h3>
        </LocalizedLink>

        {/* Short desc —— 买家决策的关键信息，用 text-sm (14px) 而非 12px。
            层级原则：信息越重要，字不能越小。 */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {isZh ? product.short_desc_zh : product.short_desc_en}
        </p>

        {/* Key specs preview —— 关键参数是采购询盘依据，提到 13px */}
        {product.specs.slice(0, 2).map((spec, idx) => (
          <div key={idx} className="flex justify-between text-[13px] py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-gray-500">{isZh ? spec.label_zh : spec.label_en}</span>
            <span className="font-medium text-brand-green">{spec.value}</span>
          </div>
        ))}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
          <LocalizedLink
            to={`/products/${product.id}`}
            className="btn-ghost text-[13px] flex-1 justify-center"
          >
            {t('products.view_details')}
          </LocalizedLink>
          <LocalizedLink
            to={`/contact?product=${encodeURIComponent(isZh ? product.name_zh : product.name_en)}`}
            className="btn-primary !px-4 !py-1.5 text-[13px]"
          >
            {t('home.quick_inquiry')}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
