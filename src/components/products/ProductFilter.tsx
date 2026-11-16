import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ProductCategory } from '../../types/product';

interface ProductFilterProps {
  selectedCategory: ProductCategory | 'all';
  onCategoryChange: (cat: ProductCategory | 'all') => void;
  halalOnly: boolean;
  onHalalToggle: () => void;
}

const categories: { value: ProductCategory | 'all'; key: string }[] = [
  { value: 'all', key: 'all' },
  { value: 'dairy', key: 'dairy' },
  { value: 'plant-extract', key: 'plant-extract' },
  { value: 'beverage-syrup', key: 'beverage-syrup' },
  { value: 'fruit-jam', key: 'fruit-jam' },
  { value: 'savory', key: 'savory' },
  { value: 'custom-solution', key: 'custom-solution' },
];

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  onCategoryChange,
  halalOnly,
  onHalalToggle,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
      <span className="text-sm font-medium text-brand-green">{t('products.filter_category')}:</span>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onCategoryChange(cat.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-out active:scale-95 ${
              selectedCategory === cat.value
                ? 'bg-brand-orange text-white shadow-[0_2px_8px_rgba(255,149,54,0.3)]'
                : 'bg-white text-brand-green border border-brand-support-green/12 hover:border-brand-support-green/30 hover:bg-brand-support-green/3'
            }`}
          >
            {cat.value === 'all' ? t('products.all') : t(`categories.${cat.key}`)}
          </button>
        ))}
      </div>
      <div className="sm:ml-auto">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={halalOnly}
            onChange={onHalalToggle}
            className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
          />
          <span className="text-sm text-gray-600">{t('products.filter_halal')}</span>
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
