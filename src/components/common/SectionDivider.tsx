import React from 'react';

export type DividerTone = 'soft' | 'medium' | 'strong';

interface SectionDividerProps {
  /** soft: 同色/近色过渡; medium: 标准; strong: 强色差（如米→深绿） */
  tone?: DividerTone;
  /** 自定义高度 (h-8 / h-12 / h-16 等) */
  className?: string;
}

/**
 * SectionDivider —— B2B 风格的 section 过渡分隔符
 *
 * 设计：
 * - 中央一条极细的水平渐变线（从透明到淡入再淡出）
 * - 中央一个品牌橙色小圆点，作为视觉锚点
 * - 节奏：把相邻 section 之间从"硬切"变成"软过渡"
 *
 * 用法：
 *   <section className="section-cream">...</section>
 *   <SectionDivider tone="medium" />
 *   <section className="section-green-tint">...</section>
 *
 * 风格纪律（README §5.0）：
 * - 不用 emoji，不用花哨 SVG
 * - 圆点 ≤ 2x2，颜色 brand-support-green 透明度 ≤ 70%
 * - 线 ≤ 1px，颜色 brand-support-green 透明度 ≤ 35%
 */
const SectionDivider: React.FC<SectionDividerProps> = ({ tone = 'medium', className = '' }) => {
  const config = {
    soft: {
      wrapper: 'h-10',
      line: 'via-brand-support-green/15',
      dot: 'bg-brand-support-green/25',
      dotSize: 'w-1 h-1',
    },
    medium: {
      wrapper: 'h-14',
      line: 'via-brand-support-green/25',
      dot: 'bg-brand-support-green/35',
      dotSize: 'w-1.5 h-1.5',
    },
    strong: {
      wrapper: 'h-20',
      line: 'via-brand-support-green/35',
      dot: 'bg-brand-support-green/45',
      dotSize: 'w-2 h-2',
    },
  };

  const c = config[tone];

  return (
    <div
      className={`relative ${c.wrapper} flex items-center justify-center ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className={`absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent ${c.line} to-transparent`} />
      <div className={`relative ${c.dotSize} rounded-full ${c.dot}`} />
    </div>
  );
};

export default SectionDivider;