import React from 'react';

interface IconProps {
  className?: string;
}

// Category icons — food ingredient themed
export const DairyIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {/* Milk carton + cheese wedge */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h8l2 8H3L5 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 2v3M11 2v3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 8l2.5 5.5L15 19" />
  </svg>
);

export const PlantIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {/* Leaf + droplet (extract) */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 14c3 3 7 3 10 0" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C7 6 6 10 6 14" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c5 4 6 8 6 12" />
    <circle cx="18" cy="19" r="1.5" fill="currentColor" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 17.5V22" />
  </svg>
);

export const SyrupIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {/* Bottle pouring a drop */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 2h8l-2 4v14a2 2 0 01-2 2h0a2 2 0 01-2-2V6L8 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 20l3-4" />
    <circle cx="20" cy="19" r="1" fill="currentColor" />
  </svg>
);

export const JamIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {/* Jar with fruit */}
    <rect x="6" y="8" width="12" height="13" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5h8l-1 3H9L8 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12" />
    {/* fruit inside */}
    <circle cx="10" cy="14" r="1.5" fill="currentColor" />
    <circle cx="14" cy="16" r="1" fill="currentColor" />
    <circle cx="12" cy="11" r="1.2" fill="currentColor" />
  </svg>
);

export const SavoryIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {/* Spice bowl/seasoning */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12a9 9 0 0118 0M3 12v4a2 2 0 002 2h14a2 2 0 002-2v-4" />
    {/* seasoning dots */}
    <circle cx="8" cy="9" r="1" fill="currentColor" />
    <circle cx="12" cy="7.5" r="0.7" fill="currentColor" />
    <circle cx="16" cy="9" r="0.8" fill="currentColor" />
    <circle cx="10" cy="6.5" r="0.5" fill="currentColor" />
    {/* steam */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 3v2M14 3v1.5" strokeWidth={1} />
  </svg>
);

export const SolutionIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    {/* Beaker + puzzle/gear — R&D / custom solution */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6l-1 2v4l4 6a2 2 0 01-1.5 3H7.5a2 2 0 01-1.5-3l4-6V5L9 3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 15l2.5 2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12.5L22 15" />
    <circle cx="19" cy="13" r="1.5" fill="currentColor" />
  </svg>
);

export const FlaskIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

// Application icons for syrup guide
export const WaterIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v0m0 0c-3.45 6.75-8.25 12.947-8.25 15.75A8.25 8.25 0 0020.25 18c0-2.803-4.8-9-8.25-15.75z" />
  </svg>
);

export const CoffeeIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V9.75a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9.75V18a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

export const WineGlassIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v0M9.75 18.75v1.5a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-1.5M12 2.25c-5.385 0-9.75 4.365-9.75 9.75 0 4.698 3.318 8.602 7.732 9.55.352.076.699.144 1.018.2.346.062.692.125 1 .2.308.074.666.069 1-.2.319-.138.619-.324.882-.55.264-.225.49-.487.664-.776.173-.289.294-.6.353-.924.059-.325.058-.66-.012-.982-.07-.323-.21-.638-.41-.932a2.294 2.294 0 00-.595-.632M12 2.25V12" />
  </svg>
);

export const TeaIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);

// Case study icons
export const FoodIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
  </svg>
);

export const BowlIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5h18M4.5 10.5L6 21h12l1.5-10.5M7.5 4.5l1.5-3h6l1.5 3M12 7.5v3" />
  </svg>
);

export const FlowerIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m-9-9h2.25m13.5 0H21m-2.636-6.364l-1.591 1.591M7.227 16.773l-1.591 1.591M7.227 7.227L5.636 5.636m12.728 12.728l-1.591-1.591M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
  </svg>
);

// Map category to icon component
import type { ProductCategory } from '../../types/product';

export const categoryIcons: Record<ProductCategory, React.FC<IconProps>> = {
  dairy: DairyIcon,
  'plant-extract': PlantIcon,
  'beverage-syrup': SyrupIcon,
  'fruit-jam': JamIcon,
  savory: SavoryIcon,
  'custom-solution': SolutionIcon,
};
