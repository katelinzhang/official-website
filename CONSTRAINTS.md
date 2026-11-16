# QDII 官网项目约束文档

> 版本：v1.0 | 编制日期：2026-08-03 | 执行基准：所有代码变更须遵守本文档

---

## 一、项目定位

### 1.1 目标市场
- **面向海外市场**（东南亚、中东、南亚、北美等）
- 目标用户：海外食品饮料品牌的**采购经理（Procurement Manager）**、**研发工程师（R&D Engineer）**、**产品经理（Product Manager）**
- 非面向国内采购人员

### 1.2 核心目标
- **直接获取销售线索**：降低跳转层级，减少用户决策摩擦
- **建立B2B专业信任**：通过视觉设计、合规展示、产品数据透明度传递专业形象
- **一站式采购入口**：Hero区域即搜索入口，让用户快速定位目标品类/产品

### 1.3 语言策略
- **默认语言：英文（EN）**
- **辅助语言：简体中文（ZH）**
- 前端架构预留印尼语、阿拉伯语等目标市场语言接口
- 所有 i18n 键必须同时包含 EN 和 ZH 翻译，EN 翻译为 authoritative

---

## 二、技术约束

### 2.1 技术栈（不可变更）
| 层级 | 选型 | 说明 |
|------|------|------|
| 框架 | React 18 + TypeScript 5 | 严格模式 |
| 构建 | Vite 5 | HMR 开发 |
| 样式 | Tailwind CSS 3 | 配合自定义组件类 |
| 国际化 | i18next + react-i18next | 命名空间扁平，键名用 snake_case |
| 路由 | React Router 6 | 6个路由：/ /products /products/:id /solutions /about /contact |
| 表单 | React Hook Form + Zod | 仅3必填字段：name + company + email |
| 数据 | 静态 mock 数据 | `src/data/products.ts` + `src/data/solutions.ts` |

### 2.2 代码规范
- 组件：函数式组件 + Hooks，用 `React.FC`
- 文件组织：`components/common/`（通用）、`components/layout/`（布局）、`components/home/`（首页模块）、`components/products/`（产品模块）、`pages/`（页面级）
- 类型定义：集中在 `src/types/product.ts`
- 禁止在组件中使用硬编码字符串（走 i18n）
- 禁止在组件中使用 emoji 作为图标（统一用 SVG 组件）

### 2.3 图片规范
- **禁止图片内嵌文字**：所有标题、数据、说明必须在 HTML 文本层实现（保证 SEO + 多语言）
- **占位图**：使用 `https://placehold.co/600x400/FFF8EA/252525?text=...`
- **正式上线**：必须用高清原始图片（WebP 格式优先），命名规则 `{category}-{product-slug}.webp`
- **图片中不得出现**：水印、Logo、公司标识、干扰背景

### 2.4 产品数据库
```typescript
// 所有产品必须包含以下字段
interface Product {
  id: string;              // 唯一标识
  name_en: string;         // 英文名
  name_zh: string;         // 中文名
  category: ProductCategory; // 六大品类之一
  short_desc_en: string;   // 英文简介
  short_desc_zh: string;   // 中文简介
  image_url: string;       // 图片URL
  isHalal: boolean;        // 清真认证（猪肉产品必须为false）
  application_tags: string[]; // 应用标签
  specs: { label_en, label_zh, value }[]; // 规格参数
  isCustomizable: boolean; // 是否支持定制
  stockStatus: StockStatus; // 'in-stock' | 'made-to-order'
}
```

### 2.5 表单约束
- **仅3个必填字段**：姓名（name）、公司（company）、邮箱（email）
- **可选字段**：电话（phone）、意向产品（productInterest）、留言（message）
- **必须勾选**：隐私条款（agreePrivacy）
- 提交后显示成功状态（不实际发送，mock 行为）
- 所有输入框用 `input-glass` 样式（rounded-2xl + focus ring）

---

## 三、美术风格约束

### 3.1 设计哲学
- **极简几何（Minimal Geometric）**：去装饰化，用圆角半径变化和阴影层次构建视觉结构
- **绿橙铺满（Green-Orange Dominant）**：页面大面积使用绿色和橙色系，减少白色面积，营造温暖、专业的品牌沉浸感
- **柔和阴影（Soft Shadows）**：卡片从 `shadow-sm` 到 hover `shadow-lg`，不位移或仅微位移
- **B2B 专业感**：克制、干净、信息密度适中，拒绝花哨动效

### 3.2 颜色使用原则
- **页面底色**：`brand-cream`（#FFF8EA），不使用纯白（#FFFFFF）作为大面积背景
- **卡片底色**：`brand-cream` 或浅绿色调，不使用纯白
- **输入框底色**：`brand-cream` 或浅绿色调
- **Header**：深绿渐变，不做白色玻璃态
- **Section 交替**：深绿 → 奶油 → 浅绿 → 奶油 → 深绿，形成韵律

### 3.2 品牌色板（不可随意修改）
| Token | Hex | 用途 |
|-------|-----|------|
| brand-orange | `#FF9536` | 主按钮、强调色、CTA |
| brand-green | `#121A18` | 深色背景、标题文字 |
| brand-support-green | `#73B839` | 辅助色、图标、边框 |
| brand-cream | `#FFF8EA` | 页面底色、卡片底色 |
| brand-charcoal | `#252525` | 正文文字 |
| bg-base | `#FFF8EA` | 页面基础背景色（暖奶油，非白色） |

### 3.3 渐变与背景类（CSS utility classes）
```css
.gradient-hero        /* 深绿→深色，Hero/页头区域 */
.gradient-cta         /* 深绿→深绿偏暖，CTA 区域 */
.section-cream        /* 纯 brand-cream 背景 */
.section-green-tint   /* 浅绿色调背景（brand-support-green 极低透明度叠加 cream） */
.section-orange-tint  /* 暖橙色调背景（brand-orange 极低透明度叠加 cream） */
```
- **不使用纯白色**（#FFFFFF 或 bg-white）作为 section 背景
- **不使用灰色调**（bg-gray-50）作为 section 背景

### 3.4 组件样式规范
- **卡片**：`card`（bg-brand-cream + rounded-3xl + border-brand-support-green/10 + shadow-sm → hover:shadow-lg）
- **按钮-primary**：`btn-primary`（rounded-full + bg-brand-orange + shadow-sm）
- **按钮-outline**：`btn-outline`（rounded-full + border-2 brand-green）
- **按钮-ghost**：`btn-ghost`（rounded-full + 文字色 + hover 背景）
- **徽章**：`badge`（rounded-full + 对应颜色变体）
- **输入框**：`input-glass`（bg-brand-cream + rounded-2xl + focus ring brand-orange）

### 3.5 图标
- **禁止使用 emoji**
- 所有图标用 SVG 组件（`src/components/common/Icons.tsx`）
- 品类图标 6 个：DairyIcon / PlantIcon / SyrupIcon / JamIcon / SavoryIcon / SolutionIcon
- 应用图标 4 个：WaterIcon / CoffeeIcon / WineGlassIcon / TeaIcon
- 案例图标 3 个：FoodIcon / BowlIcon / FlowerIcon
- 研发图标：FlaskIcon

### 3.6 字体
- 英文：Inter / Manrope
- 中文：Noto Sans SC
- Heading：Manrope（font-heading）
- Body：Inter（font-body）

---

## 四、合规红线（绝对不可违反）

### 4.1 Halal 认证
- 猪肉蛋白多肽（Pork Protein Peptide）**严格禁止**标注 Halal
- 数据库必须维护 `isHalal: boolean` 字段
- Halal 筛选时，猪肉产品不得出现在结果中

### 4.2 关联企业去标识化
- **禁止**在官网内容、图片、元数据中提及或暗示"华宝"、"Kerisom"、"IBT"等企业
- 描述工厂/牧场/研发能力时用独立口径："我们投资并深度合作的国际黄金奶源牧场"

### 4.3 COA 和证书
- 产品详情页仅展示关键商业指标（规格参数）
- 完整 COA、HACCP、ISO、BRC 等证书必须通过表单留资后提供

### 4.4 合作伙伴展示
- **禁止直接使用合作伙伴品牌 Logo 图片**
- 必须用纯文本列表展示
- 底部必须加免责声明：中文版和英文版各一

### 4.5 案例展示
- 成功案例必须**隐去客户品牌名称和 Logo**
- 标注格式："为某国际知名连锁餐饮/零售品牌提供定制化方案"

---

## 五、信息架构

### 5.1 路由表
| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | Hero搜索 + 品类网格 + 方案 + 全球市场 + 合作伙伴 |
| `/products` | 产品中心 | 品类筛选 + Halal筛选 + 产品卡片网格 |
| `/products/:id` | 产品详情 | 规格表 + 应用标签 + 饮料浓浆引导 + COA表单 |
| `/solutions` | 定制方案 | 定制维度 + 研发流程 + 案例 |
| `/about` | 关于我们 | 公司介绍 + R&D + 案例 + 全球市场详细 |
| `/contact` | 联系我们 | 询盘表单 + WhatsApp + 微信 |

### 5.2 首页模块顺序
1. **Hero**（搜索入口 + 热门品类）
2. **CategoryGrid**（6大品类卡片）
3. **CustomSolutions**（R&D 中心介绍 + CTA）
4. **GlobalMarkets**（四大市场区域）
5. **Partners**（合作伙伴纯文本列表）

### 5.3 导航
- Header：Logo + 5个导航项 + 快速询价按钮 + 语言切换
- Footer：品牌信息 + 快速链接 + 联系方式 + CTA

---

## 六、销售转化路径

### 6.1 询盘入口
- 每个产品卡片：快速询价按钮（跳转 /contact?product=xxx）
- 产品详情页：COA 申请表单 + 咨询 CTA
- Header：常驻快速询价按钮
- Footer：询盘 CTA

### 6.2 联系方式
- 邮箱：info@quarkdairy.cn（表单收集目标）
- WhatsApp：页面右下角独立按钮 + 联系页面内嵌（海外用户主要渠道）
- 微信：联系页面 + 页脚（辅助，华人客户）

### 6.3 表单字段
- 必填：Name、Company、Email（3项）
- 选填：Phone/WhatsApp、Product Interest、Message
- 隐私条款复选框（必须勾选）

---

## 七、开发流程

### 7.1 修改后验证清单
- [ ] `npx tsc --noEmit` 零错误
- [ ] 浏览器 console 零 error
- [ ] 所有页面可正常导航
- [ ] EN/ZH 切换正常，无硬编码文本
- [ ] Halal 筛选逻辑正确（猪肉产品不出现）
- [ ] 所有产品卡片显示 stockStatus

### 7.2 禁止事项
- 禁止写入 `node_modules` 或 `dist`
- 禁止修改 `tsconfig.json` / `vite.config.ts` / `tailwind.config.js` 核心配置
- 禁止删除现有产品数据
- 禁止使用 emoji 作为 UI 图标
- 禁止在组件中硬编码中/英文字符串
