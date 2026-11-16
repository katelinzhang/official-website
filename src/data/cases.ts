/** Application cases sourced from the company case deck (anonymized: no client brand names) */

export interface CaseHighlight {
  label_en: string;
  label_zh: string;
  value_en: string;
  value_zh: string;
}

export interface CaseSection {
  heading_en: string;
  heading_zh: string;
  body_en: string;
  body_zh: string;
}

export interface ApplicationCase {
  id: string;
  title_en: string;
  title_zh: string;
  category_en: string;
  category_zh: string;
  years: string;
  hero_image: string;
  gallery: string[];
  summary_en: string;
  summary_zh: string;
  highlights: CaseHighlight[];
  sections: CaseSection[];
  relatedProductIds: string[];
}

export const cases: ApplicationCase[] = [
  // ===== 1. Unsalted Butter =====
  {
    id: 'case-butter',
    title_en: 'Unsalted Butter for Ice Cream & Cheese Slices',
    title_zh: '无盐黄油：冰淇淋全系列与芝士片',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2022 · 2024',
    hero_image: '/images/cases/case-butter-1.jpg',
    gallery: ['/images/cases/case-butter-1.jpg', '/images/cases/case-butter-2.jpg'],
    summary_en:
      'A global premium ice cream brand replaced imported butter with our unsalted butter across its entire product line; an international QSR chain and an international dairy brand both adopted it for cheese slice production.',
    summary_zh:
      '某全球高端冰淇淋品牌以我们的无盐黄油替代进口黄油，覆盖全系列产品；某国际连锁快餐品牌与某国际乳品品牌均将其用于芝士片生产。',
    highlights: [
      { label_en: 'Fat Content', label_zh: '脂肪含量', value_en: '≥ 82%', value_zh: '≥ 82%' },
      { label_en: 'Packaging', label_zh: '包装规格', value_en: '25kg block', value_zh: '25kg 块装' },
      { label_en: 'Application Years', label_zh: '应用年份', value_en: '2022 / 2024', value_zh: '2022 / 2024' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Imported butter carried cost and lead-time pressure for ice cream and dairy manufacturers. Clients needed a domestic replacement that matched imported quality on fat profile, texture and flavor stability.',
        body_zh:
          '进口黄油在成本与供应周期上给冰淇淋和乳品生产企业带来压力，客户需要一款在脂肪指标、质地与风味稳定性上媲美进口品质的国产替代原料。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'In 2022, the entire product line of a global premium ice cream brand adopted our salt-free butter as a replacement for imported alternatives. In 2024, an international quick-service restaurant chain and an international dairy brand both used it to produce cheese slices.',
        body_zh:
          '2022 年，某全球高端冰淇淋品牌全系列产品采用我们的无盐黄油替代进口黄油；2024 年，某国际连锁快餐品牌与某国际乳品品牌均使用我们的无盐黄油生产芝士片。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Stable fat profile with consistent melting behavior, clean dairy flavor, and reliable frozen-chain supply that supports large-volume, multi-year production programs.',
        body_zh:
          '脂肪指标稳定、融化特性一致，乳香纯净；冷冻链供应稳定，可支撑大批量、跨年度的长期生产计划。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Full product-line adoption in 2022, followed by dual cheese slice programs with two international brands in 2024 — sustained repeat orders with stable supply.',
        body_zh:
          '2022 年实现全系列产品替代导入；2024 年同时服务于两个国际品牌的芝士片项目，订单持续复购、供应稳定。',
      },
    ],
    relatedProductIds: ['dairy-002'],
  },

  // ===== 2. Black Truffle Cheese & Black Garlic Seasoning =====
  {
    id: 'case-truffle-seasoning',
    title_en: 'Black Truffle Cheese & Black Garlic Seasoning',
    title_zh: '黑松露芝士与黑蒜调味料',
    category_en: 'Savory Ingredients',
    category_zh: '咸味调味原料',
    years: '2026',
    hero_image: '/images/cases/case-truffle-seasoning-1.webp',
    gallery: ['/images/cases/case-truffle-seasoning-1.webp', '/images/cases/case-truffle-seasoning-2.jpg'],
    summary_en:
      'A bottled gourmet seasoning duo — black truffle cheese and black garlic flavoring — designed for premium ready-to-eat and cooking applications.',
    summary_zh:
      '瓶装高端调味组合 — 黑松露芝士与黑蒜风味调味料，面向高端即食与烹饪应用场景。',
    highlights: [
      { label_en: 'Format', label_zh: '规格', value_en: '145g / bottle', value_zh: '145g/瓶' },
      { label_en: 'Truffle Cheese', label_zh: '黑松露芝士', value_en: '32g per bottle', value_zh: '每瓶 32g' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Premium seasoning categories are moving toward distinctive, gourmet flavor accents. Clients wanted a bottled product that pairs the depth of black truffle with the savory punch of black garlic.',
        body_zh:
          '高端调味品正在向具有辨识度的美食风味升级，客户希望打造一款将黑松露醇厚感与黑蒜浓郁咸香结合的瓶装产品。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'Ready-to-use bottled seasoning for pasta, steak, pizza and gourmet cooking — a dual-component format with 145g of black truffle cheese & black garlic flavoring per bottle, including 32g of black truffle cheese.',
        body_zh:
          '即开即用的瓶装调味料，适用于意面、牛排、披萨及高端烹饪场景；双组分配方，每瓶 145g 黑松露芝士与黑蒜风味调味料，其中黑松露芝士含量 32g。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Balanced truffle intensity without artificial flavoring, fine particle texture for even dispersion, and shelf-stable packaging for retail distribution.',
        body_zh:
          '黑松露风味浓郁度平衡、不使用人工香精，颗粒细腻易于均匀撒布，包装耐储适合零售流通。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Standardized 145g retail format with 32g truffle cheese per bottle, ready for brand customization and OEM production.',
        body_zh:
          '形成 145g 标准零售规格，每瓶含 32g 黑松露芝士，可支持品牌定制与 OEM 生产。',
      },
    ],
    relatedProductIds: ['savory-006'],
  },

  // ===== 3. EVA Creamy Paste =====
  {
    id: 'case-eva-cream',
    title_en: 'EVA Creamy Paste for Shaped Ice Cream',
    title_zh: 'EVA 稀奶油膏：花型冰淇淋',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2018 · 2021',
    hero_image: '/images/cases/case-eva-cream-1.jpg',
    gallery: ['/images/cases/case-eva-cream-1.jpg', '/images/cases/case-eva-cream-2.jpg'],
    summary_en:
      'EVA creamy paste delivered the shaping and stability performance needed for a well-known ice cream brand\u2019s signature multi-petal designs and 1L chilled cream base.',
    summary_zh:
      'EVA 稀奶油膏为某知名冰淇淋品牌的标志性多瓣花型产品与 1L 冷藏奶油基底提供了成型与稳定性能。',
    highlights: [
      { label_en: 'Applications', label_zh: '应用', value_en: 'Shaped ice cream / cream base', value_zh: '花型冰淇淋 / 奶油基底' },
      { label_en: 'Years', label_zh: '年份', value_en: '2021 / 2018', value_zh: '2021 / 2018' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Intricate multi-petal ice cream designs require a cream base that extrudes precisely and holds its shape through freezing and display, without sacrificing mouthfeel.',
        body_zh:
          '精细的多瓣花型冰淇淋要求奶油基底在挤出成型、冻结与陈列全过程中保持形状，同时不能牺牲口感。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'In 2021, a well-known ice cream brand used our EVA cream to produce its adorable multi-petal designs. In 2018, our EVA cream base was used to produce a 1-liter refrigerated cream base.',
        body_zh:
          '2021 年，某知名冰淇淋品牌使用我们的 EVA 稀奶油生产多瓣花型产品；2018 年，我们的 EVA 奶油基底用于生产 1 升装冷藏奶油基底。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Excellent whipping and extrusion performance, stable overrun control, and clean creamy flavor that lets delicate designs shine in both retail and food-service formats.',
        body_zh:
          '搅打与挤出性能优异，膨胀率控制稳定，奶油风味纯净，兼顾零售与餐饮渠道的花型产品表现。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Two production formats validated — shaped novelty ice cream (2021) and 1L chilled cream base (2018) — with consistent shaping performance across full production runs.',
        body_zh:
          '验证了两种生产形态 — 花型创新冰淇淋（2021）与 1L 冷藏奶油基底（2018）— 全批次成型表现稳定。',
      },
    ],
    relatedProductIds: ['dairy-006'],
  },

  // ===== 4. EVA Anhydrous Cream =====
  {
    id: 'case-eva-amf',
    title_en: 'EVA Anhydrous Cream for Sticks, Chocolate & Cookies',
    title_zh: 'EVA 无水奶油：可爱棒、巧克力与曲奇',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2022 · 2024',
    hero_image: '/images/cases/case-eva-amf-1.webp',
    gallery: ['/images/cases/case-eva-amf-1.webp', '/images/cases/case-eva-amf-2.webp', '/images/cases/case-eva-amf-3.webp'],
    summary_en:
      'EVA anhydrous cream powered a well-known ice cream brand\u2019s adorable stick products in 2022, and its chocolate and cookie applications in 2024.',
    summary_zh:
      'EVA 无水奶油于 2022 年用于某知名冰淇淋品牌的可爱棒产品，2024 年进一步应用于巧克力与曲奇。',
    highlights: [
      { label_en: 'Fat Content', label_zh: '脂肪含量', value_en: '≥ 99.8%', value_zh: '≥ 99.8%' },
      { label_en: 'Applications', label_zh: '应用', value_en: 'Sticks / chocolate / cookies', value_zh: '棒类 / 巧克力 / 曲奇' },
      { label_en: 'Years', label_zh: '年份', value_en: '2022 / 2024', value_zh: '2022 / 2024' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Frozen novelties and baked confections need a high-purity milk fat that delivers rich dairy flavor, crisp snap in coatings, and consistent mouthfeel across batches.',
        body_zh:
          '冷冻棒类产品与烘焙甜点需要高纯度乳脂，提供浓郁乳香、涂层脆感与批次间一致的口感。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'In 2022, a well-known ice cream brand used EVA anhydrous cream to produce its adorable stick products. In 2024, the same ingredient was used to produce chocolate and cookies.',
        body_zh:
          '2022 年，某知名冰淇淋品牌使用 EVA 无水奶油生产可爱棒产品；2024 年，该原料进一步用于巧克力与曲奇的生产。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Purity of 99.8% fat with minimal moisture, high oxidative stability, and excellent crystallization behavior for coating and baking applications.',
        body_zh:
          '脂肪纯度 ≥ 99.8%、水分极低，氧化稳定性高，结晶特性优良，适用于涂层与烘焙加工。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'One ingredient extended across three product categories within two years — sticks (2022), chocolate and cookies (2024) — proving multi-application versatility.',
        body_zh:
          '两年内同一原料覆盖三大品类 — 棒类（2022）、巧克力与曲奇（2024）— 验证了多场景适用性。',
      },
    ],
    relatedProductIds: ['dairy-001'],
  },

  // ===== 5. Cheese Powder =====
  {
    id: 'case-cheese-powder',
    title_en: 'Cheese Powder for Chocolate, Cones & Pet Food',
    title_zh: '芝士粉：巧克力脆片、蛋筒与宠物粮',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2021 · 2024 · 2025',
    hero_image: '/images/cases/case-cheese-powder-1.jpg',
    gallery: ['/images/cases/case-cheese-powder-1.jpg'],
    summary_en:
      'Cheese powder applied across four categories — crispy chocolate pieces, chocolate ice cream cones, layered snow cups, and pet food attractants.',
    summary_zh:
      '芝士粉横跨四大应用 — 巧克力脆片、巧克力蛋筒、千层雪杯与宠物粮诱食剂。',
    highlights: [
      { label_en: 'Applications', label_zh: '应用场景', value_en: '4 categories', value_zh: '4 大品类' },
      { label_en: 'Years', label_zh: '年份', value_en: '2021 / 2024 / 2025', value_zh: '2021 / 2024 / 2025' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Snack and frozen dessert makers wanted to add rich dairy aroma and layered flavor depth without complicating production lines. Pet food formulators also needed a palatable, nutritious attractant.',
        body_zh:
          '零食与冷冻甜品企业希望在不大幅改动产线的前提下增加浓郁乳香与层次感；宠物粮配方同样需要一款适口性好、营养高的诱食原料。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'In 2024, cheese powder created crispy chocolate pieces with a golden lemon cheese taste that adds a rich dairy aroma. In 2025, it was added to specific layers of a chocolate ice cream cone to enhance richness of flavor and texture. In 2021, it was used in a layered snow cup dessert. In 2024, cheese powder added to pet food served as an attractant, offering high nutritional value and significantly enhancing palatability.',
        body_zh:
          '2024 年，芝士粉用于制作巧克力脆片，带来金柠芝士风味与浓郁乳香；2025 年，用于巧克力蛋筒的特定分层，提升风味与口感的丰富度；2021 年，应用于千层雪杯甜品；2024 年，芝士粉加入宠物粮作为诱食剂，营养价值高，显著提升宠物粮适口性。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Spray-dried powder with authentic cheese flavor, fine particle size for even mixing in coatings and layers, and stable flavor release in frozen and dry systems.',
        body_zh:
          '喷雾干燥工艺，奶酪风味正宗，颗粒细腻，在涂层与分层中混合均匀，冷冻与干制体系下风味释放稳定。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Four validated application scenarios across confectionery, frozen dessert and pet food within four years, demonstrating cross-category versatility.',
        body_zh:
          '四年内完成糖果、冷冻甜品与宠物食品四大应用场景验证，展现跨品类适配能力。',
      },
    ],
    relatedProductIds: ['dairy-005'],
  },

  // ===== 6. Original Cream Cheese Powder =====
  {
    id: 'case-cream-cheese-powder',
    title_en: 'Original Cream Cheese Powder for Seasonings',
    title_zh: '原味奶油芝士粉：调味粉应用',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2026',
    hero_image: '/images/cases/case-cream-cheese-powder-1.jpg',
    gallery: ['/images/cases/case-cream-cheese-powder-1.jpg', '/images/cases/case-cream-cheese-powder-2.jpg'],
    summary_en:
      'Original cream cheese powder brings a rich, full-bodied cream cheese flavor to seasoning powder blends.',
    summary_zh:
      '原味奶油芝士粉为调味粉产品带来浓郁饱满的奶油芝士风味。',
    highlights: [
      { label_en: 'Flavor Profile', label_zh: '风味特点', value_en: 'Rich cream cheese', value_zh: '浓郁奶油芝士' },
      { label_en: 'Application', label_zh: '应用', value_en: 'Seasoning powders', value_zh: '调味粉' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Seasoning brands wanted a dairy note that stands out in dry blends — creamy, full-bodied and recognizable — without liquid ingredients that complicate mixing and shelf life.',
        body_zh:
          '调味粉品牌希望在干混体系中获得突出、可辨识的乳品风味 — 奶油感浓郁饱满 — 同时避免液体原料带来的混合与保质期问题。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'The original cream cheese powder is used in the production of seasoning powders, delivering a rich and full-bodied cream cheese flavor.',
        body_zh:
          '原味奶油芝士粉用于调味粉的生产，带来浓郁饱满的奶油芝士风味。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Dry powder form blends evenly with other seasonings, survives heat and freezing, and delivers consistent flavor release in finished applications.',
        body_zh:
          '粉末形态与其他调味料均匀混合，耐热耐冻，成品中风味释放一致。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Validated in seasoning powder production as a reliable, dry-state carrier of authentic cream cheese flavor.',
        body_zh:
          '已在调味粉生产中验证，成为干态体系中奶油芝士风味的可靠载体。',
      },
    ],
    relatedProductIds: ['dairy-005'],
  },

  // ===== 7. Cheddar Cheese =====
  {
    id: 'case-cheddar',
    title_en: 'Cheddar Cheese for QSR Cheese Slices',
    title_zh: '切达芝士：连锁快餐芝士片',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2022',
    hero_image: '/images/cases/case-cheddar-1.webp',
    gallery: ['/images/cases/case-cheddar-1.webp', '/images/cases/case-cheddar-2.webp'],
    summary_en:
      'Our cheddar cheese is used by an international quick-service restaurant chain to produce cheese slices, with annual sales of 1,500 tons and stable supply.',
    summary_zh:
      '我们的切达芝士被某国际连锁快餐品牌用于生产芝士片，年销量 1,500 吨，供应稳定。',
    highlights: [
      { label_en: 'Annual Volume', label_zh: '年销量', value_en: '1,500 tons', value_zh: '1,500 吨' },
      { label_en: 'Application', label_zh: '应用', value_en: 'Cheese slices', value_zh: '芝士片' },
      { label_en: 'Since', label_zh: '起用年份', value_en: '2022', value_zh: '2022' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Cheese slices for a global QSR chain demand consistent melt, stretch and flavor at enormous production scale — with zero tolerance for supply interruption.',
        body_zh:
          '全球连锁快餐的芝士片要求融化、拉丝与风味在超大规模生产中保持高度一致，供应中断零容忍。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'Since 2022, an international quick-service restaurant chain has used our cheddar cheese to produce cheese slices for its burger menu.',
        body_zh:
          '自 2022 年起，某国际连锁快餐品牌使用我们的切达芝士生产汉堡用芝士片。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Consistent protein and fat composition batch after batch, calibrated melt behavior, and cold-chain logistics built for high-frequency, high-volume delivery.',
        body_zh:
          '批次间蛋白与脂肪组成一致，融化特性经校准匹配；冷链物流适配高频、大批量交付。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Annual sales volume of 1,500 tons with stable supply since 2022 — a multi-year, high-volume partnership with an international chain.',
        body_zh:
          '自 2022 年起年销量 1,500 吨、供应稳定 — 与国际连锁品牌建立了多年期、大批量的合作关系。',
      },
    ],
    relatedProductIds: ['dairy-005'],
  },

  // ===== 8. Strawberry Extract =====
  {
    id: 'case-strawberry',
    title_en: 'Strawberry Extract: Natural, Clean Label, Low Dosage',
    title_zh: '草莓提取物：天然、清洁标签、低用量',
    category_en: 'Plant Extracts',
    category_zh: '植物提取物',
    years: '2024',
    hero_image: '/images/cases/case-strawberry-1.jpg',
    gallery: ['/images/cases/case-strawberry-1.jpg', '/images/cases/case-strawberry-2.jpg', '/images/cases/case-strawberry-3.jpg'],
    summary_en:
      'A 2024 strawberry extract delivering authentic flavor, clean-label declaration, and rich strawberry character at low dosage.',
    summary_zh:
      '2024 年推出的草莓提取物，风味纯正、标签清洁，低用量即可呈现浓郁草莓风味。',
    highlights: [
      { label_en: 'Label', label_zh: '标签声明', value_en: 'Strawberry extract', value_zh: '草莓提取物' },
      { label_en: 'Dosage', label_zh: '用量', value_en: 'Low addition levels', value_zh: '低添加量' },
      { label_en: 'Launched', label_zh: '推出年份', value_en: '2024', value_zh: '2024' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Beverage and dessert brands are under pressure to remove synthetic flavors while keeping bold, authentic fruit character and controlling cost-in-use.',
        body_zh:
          '饮品与甜品品牌面临去除人工香精的压力，同时要保持浓郁纯正的水果风味并控制使用成本。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'Natural extract: delivers the authentic flavor and is healthier compared to synthetic flavors. Clean label: directly lists strawberry extract (strawberry, water, glucose, fructose). Low dosage: low addition levels deliver a rich strawberry flavor while reducing costs.',
        body_zh:
          '天然提取：呈现真实纯正的风味，相比人工香精更健康。清洁标签：配料表可直接标注草莓提取物（草莓、水、葡萄糖、果糖）。低用量：以低添加量实现浓郁草莓风味，同时降低成本。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Natural extraction process with a simple ingredient declaration, high flavor strength per gram, and good solubility across beverage and dessert systems.',
        body_zh:
          '天然提取工艺、配料声明简洁，单位风味强度高，在饮品与甜品体系中溶解性良好。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Launched in 2024 as a three-in-one solution: authentic flavor, clean-label compliance, and reduced cost-in-use.',
        body_zh:
          '2024 年推出，实现风味纯正、清洁标签合规与使用成本降低的三合一解决方案。',
      },
    ],
    relatedProductIds: ['jam-strawberry'],
  },

  // ===== 9. Fermented Cream Concentrate =====
  {
    id: 'case-fermented-cream',
    title_en: 'Fermented Cream Concentrate (2024)',
    title_zh: '发酵奶油浓缩液（2024）',
    category_en: 'Dairy Ingredients',
    category_zh: '乳制品原料',
    years: '2024',
    hero_image: '/images/cases/case-fermented-cream-1.jpg',
    gallery: ['/images/cases/case-fermented-cream-1.jpg', '/images/cases/case-fermented-cream-2.jpg', '/images/cases/case-fermented-cream-3.jpg'],
    summary_en:
      'A 2024 fermented cream concentrate with a rich flavor profile, stable product quality, easy processing and clean labeling.',
    summary_zh:
      '2024 年推出的发酵奶油浓缩液，风味浓郁、品质稳定、易于加工、标签清洁。',
    highlights: [
      { label_en: 'Flavor', label_zh: '风味', value_en: 'Rich flavor profile', value_zh: '风味浓郁' },
      { label_en: 'Quality', label_zh: '品质', value_en: 'Stable', value_zh: '品质稳定' },
      { label_en: 'Label', label_zh: '标签', value_en: 'Clean labeling', value_zh: '清洁标签' },
      { label_en: 'Launched', label_zh: '推出年份', value_en: '2024', value_zh: '2024' },
    ],
    sections: [
      {
        heading_en: 'Background',
        heading_zh: '背景',
        body_en:
          'Bakery and beverage developers wanted the depth of fermented dairy flavor in a convenient, process-friendly format that keeps labels clean.',
        body_zh:
          '烘焙与饮品研发团队希望在便捷、易加工的形态中获得发酵乳品的浓郁风味，同时保持标签清洁。',
      },
      {
        heading_en: 'Application',
        heading_zh: '应用场景',
        body_en:
          'Concentrated format for bakery fillings, sauces and beverage bases, where a rich fermented cream note is needed without long fermentation steps in the customer\u2019s plant.',
        body_zh:
          '浓缩形态适用于烘焙馅料、酱料与饮品基底，客户无需在工厂内进行长时间发酵即可获得浓郁发酵奶油风味。',
      },
      {
        heading_en: 'Technical Highlights',
        heading_zh: '技术要点',
        body_en:
          'Rich flavor profile, stable product quality, easy processing, and clean labeling — four characteristics delivered through controlled fermentation and concentration.',
        body_zh:
          '通过受控发酵与浓缩工艺实现四大特性 — 风味浓郁、品质稳定、易于加工、标签清洁。',
      },
      {
        heading_en: 'Results',
        heading_zh: '成果数据',
        body_en:
          'Released in 2024 as a ready-to-use fermented dairy concentrate for industrial customers seeking flavor depth with minimal complexity.',
        body_zh:
          '2024 年发布，作为即用型发酵乳品浓缩原料，服务追求风味深度与生产简化的工业客户。',
      },
    ],
    relatedProductIds: ['dairy-007'],
  },
];

export const getCaseById = (id: string): ApplicationCase | undefined =>
  cases.find((c) => c.id === id);
