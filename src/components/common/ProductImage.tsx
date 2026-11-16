import React from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, className = '' }) => {
  return (
    <img
      src={src || '/images/products/placeholder.jpg'}
      alt={alt}
      className={`aspect-[4/3] object-cover w-full ${className}`}
      loading="lazy"
      onError={(e) => {
        (e.target as HTMLImageElement).src = '/images/products/placeholder.jpg';
      }}
    />
  );
};

export default ProductImage;
