import React from 'react';
import LocalizedLink from '../common/LocalizedLink';
import { useTranslation } from 'react-i18next';
import type { ProductCategory } from '../../types/product';
import { categoryIcons } from '../common/Icons';

const categoryColors: Record<ProductCategory, string> = {
  dairy: 'bg-sky-50 text-sky-600',
  'plant-extract': 'bg-emerald-50 text-emerald-600',
  'beverage-syrup': 'bg-orange-50 text-orange-600',
  'fruit-jam': 'bg-rose-50 text-rose-600',
  savory: 'bg-amber-50 text-amber-600',
  'custom-solution': 'bg-purple-50 text-purple-600',
};

// Representative product image for each category background
const categoryBgImages: Record<ProductCategory, string> = {
  dairy: '/images/products/dairy-unsalted-butter.jpg',
  'plant-extract': '/images/products/plant-extract-coffee.jpg',
  'beverage-syrup': '/images/products/syrup-peach-oolong.jpg',
  'fruit-jam': '/images/products/jam-strawberry.jpg',
  savory: '/images/products/savory-chicken-powder.webp',
  'custom-solution': '/images/products/custom-bakery.jpg',
};

const categories: ProductCategory[] = [
  'dairy', 'plant-extract', 'beverage-syrup', 'fruit-jam', 'savory', 'custom-solution',
];

const CategoryGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="section-green-tint">
      <div className="container-custom section-padding">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="section-eyebrow mb-3">
            {t('home.categories_eyebrow')}
          </p>
          <h2 className="section-title mb-4">
            {t('home.categories_title')}
          </h2>
          <p className="section-desc mx-auto">
            {t('home.categories_subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat];
            const colorClass = categoryColors[cat];
            return (
              <LocalizedLink
                key={cat}
                to={`/products?category=${cat}`}
                className="card card-hover p-5 text-center group relative overflow-hidden"
              >
                {/* Background product image */}
                <img
                  src={categoryBgImages[cat]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-[0.45] group-hover:opacity-[0.60] transition-opacity duration-500"
                  loading="lazy"
                />
                {/* White overlay to keep content readable */}
                <div className="absolute inset-0 bg-white/30" />
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClass} rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-brand-green mb-1">
                    {t(`categories.${cat}`)}
                  </h3>
                  <div className="flex items-center justify-center gap-0.5 text-brand-orange text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>{t('products.view_details')}</span>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </LocalizedLink>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
