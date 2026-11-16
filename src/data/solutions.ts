import type { Solution, RegionDetail } from '../types/product';

export const solutions: Solution[] = [
  {
    id: 'sol-001',
    name_en: 'Flavor Customization',
    name_zh: '风味定制',
    desc_en: 'Tailor taste profiles, aroma intensity and mouthfeel to match your target market preferences. We support clean-label, natural, and organic-compliant formulations.',
    desc_zh: '根据目标市场偏好定制口感、香气强度和质地。支持清洁标签、天然及有机合规配方。',
    image_url: '/images/products/custom-bakery.jpg',
    applications: ['Beverage', 'Sauce', 'Bakery', 'Confectionery'],
  },
  {
    id: 'sol-002',
    name_en: 'Concentration & Packaging Customization',
    name_zh: '浓度与规格定制',
    desc_en: 'Adjust concentration ratios, Brix levels, and packaging formats (pouch, bottle, drum, bag-in-box) to fit your production line and distribution channel.',
    desc_zh: '调整浓缩倍数、糖度及包装形式（袋装、瓶装、桶装、盒中袋），适配您的产线与分销渠道。',
    image_url: '/images/products/custom-tea-coffee.jpg',
    applications: ['Syrup', 'Extract', 'Sauce', 'Jam'],
  },
  {
    id: 'sol-003',
    name_en: 'OEM / ODM Production',
    name_zh: 'OEM / ODM 代工生产',
    desc_en: 'Full turnkey manufacturing under your brand — from recipe development and pilot batch to mass production, quality control, and global logistics.',
    desc_zh: '全套自有品牌交钥匙生产 — 从配方开发、中试到量产、品控及全球物流。',
    image_url: '/images/products/custom-ice-cream.webp',
    applications: ['Private Label', 'Retail', 'Food Service', 'Export'],
  },
];

export const regions: RegionDetail[] = [
  {
    id: 'southeast-asia',
    name_en: 'Southeast Asia',
    name_zh: '东南亚',
    countries: [
      { en: 'Thailand', zh: '泰国' },
      { en: 'Indonesia', zh: '印尼' },
      { en: 'Vietnam', zh: '越南' },
      { en: 'Philippines', zh: '菲律宾' },
      { en: 'Malaysia', zh: '马来西亚' },
      { en: 'Singapore', zh: '新加坡' },
    ],
  },
  {
    id: 'middle-east',
    name_en: 'Middle East',
    name_zh: '中东',
    countries: [
      { en: 'UAE', zh: '阿联酋' },
      { en: 'Saudi Arabia', zh: '沙特阿拉伯' },
      { en: 'Qatar', zh: '卡塔尔' },
      { en: 'Kuwait', zh: '科威特' },
      { en: 'Oman', zh: '阿曼' },
    ],
  },
  {
    id: 'south-asia',
    name_en: 'South Asia',
    name_zh: '南亚',
    countries: [
      { en: 'India', zh: '印度' },
      { en: 'Bangladesh', zh: '孟加拉国' },
      { en: 'Pakistan', zh: '巴基斯坦' },
      { en: 'Sri Lanka', zh: '斯里兰卡' },
    ],
  },
  {
    id: 'north-america',
    name_en: 'North America',
    name_zh: '北美',
    countries: [
      { en: 'United States', zh: '美国' },
      { en: 'Canada', zh: '加拿大' },
      { en: 'Mexico', zh: '墨西哥' },
    ],
  },
];
