export type ProductCategory =
  | 'dairy'
  | 'plant-extract'
  | 'beverage-syrup'
  | 'fruit-jam'
  | 'savory'
  | 'custom-solution';

export type StockStatus = 'in-stock' | 'made-to-order';

export interface Product {
  id: string;
  name_en: string;
  name_zh: string;
  category: ProductCategory;
  short_desc_en: string;
  short_desc_zh: string;
  image_url: string;
  isHalal: boolean;
  application_tags: string[];
  specs: {
    label_en: string;
    label_zh: string;
    value: string;
  }[];
  isCustomizable: boolean;
  stockStatus: StockStatus;
}

export interface Solution {
  id: string;
  name_en: string;
  name_zh: string;
  desc_en: string;
  desc_zh: string;
  image_url: string;
  applications: string[];
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  agreePrivacy: boolean;
  country?: string;
  phone?: string;
  productInterest?: string;
  application?: string;
  estimatedVolume?: string;
  message?: string;
  photos?: FileList;
}

export type MarketRegion = 'southeast-asia' | 'middle-east' | 'south-asia' | 'north-america';

export interface RegionDetail {
  id: MarketRegion;
  name_en: string;
  name_zh: string;
  countries: { en: string; zh: string }[];
}
