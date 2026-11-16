import type { Plugin } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Quark Dairy — sitemap generator (build-time).
 *
 * Reads product/case IDs from src/data/*.ts by regex, merges with static
 * routes, and writes dist/sitemap.xml on every build.
 *
 * - lastmod: build date (YYYY-MM-DD, Asia/Shanghai)
 * - changefreq / priority per route
 * - Bilingual: every route is emitted twice (English without prefix, Chinese
 *   under /zh), and each entry carries the full hreflang set (en / zh-CN /
 *   x-default). Google requires every entry to list ALL alternates including
 *   itself, so the two entries for one logical page reference each other.
 * - Baidu mobile adaptation: every <url> carries <mobile:mobile type="pc,mobile"/>
 *   because the site is responsive (同一 URL 同时服务 PC 与移动). Without this
 *   tag Baidu treats the page as PC-only and mobile search may skip it.
 *   Google ignores the unknown namespace.
 * - Honors public/sitemap.xml deletion: if you keep an old one in public/,
 *   remove it first (this plugin is the source of truth).
 */

const ZH_PREFIX = '/zh';

interface Alternate {
  hreflang: string;
  href: string;
}

interface RouteDef {
  path: string;
  changefreq: string;
  priority: string;
}

/** '/products' -> '/zh/products'；'/' -> '/zh' */
function addZhPrefix(p: string): string {
  return p === '/' ? ZH_PREFIX : ZH_PREFIX + p;
}

export function quarkdairySitemap(): Plugin {
  return {
    name: 'quarkdairy-sitemap',
    apply: 'build',
    closeBundle() {
      const root = process.cwd();
      const distDir = path.resolve(root, 'dist');
      if (!fs.existsSync(distDir)) return;

      const today = new Date().toISOString().slice(0, 10);

      // Static routes (priority hints)
      const staticRoutes: RouteDef[] = [
        { path: '/',           changefreq: 'weekly',  priority: '1.0' },
        { path: '/products',   changefreq: 'weekly',  priority: '0.9' },
        { path: '/solutions',  changefreq: 'weekly',  priority: '0.9' },
        { path: '/about',      changefreq: 'monthly', priority: '0.7' },
        { path: '/contact',    changefreq: 'monthly', priority: '0.8' },
        { path: '/privacy',    changefreq: 'yearly',  priority: '0.3' },
        { path: '/terms',      changefreq: 'yearly',  priority: '0.3' },
      ];

      // Extract product IDs from src/data/products.ts (regex — avoids bundler dep)
      const productIds = extractIds(path.resolve(root, 'src/data/products.ts'));
      // Extract case IDs from src/data/cases.ts
      const caseIds = extractIds(path.resolve(root, 'src/data/cases.ts'));

      const DOMAIN = 'https://www.quarkdairy.cn';

      // Collect every logical (language-agnostic) route once.
      const routes: RouteDef[] = [
        ...staticRoutes,
        ...productIds.map((id) => ({ path: `/products/${id}`, changefreq: 'monthly', priority: '0.7' })),
        ...caseIds.map((id) => ({ path: `/cases/${id}`, changefreq: 'monthly', priority: '0.6' })),
      ];

      const urlEntries: string[] = [];

      for (const r of routes) {
        const enUrl = `${DOMAIN}${r.path}`;
        const zhUrl = `${DOMAIN}${addZhPrefix(r.path)}`;
        const alternates: Alternate[] = [
          { hreflang: 'en', href: enUrl },
          { hreflang: 'zh-CN', href: zhUrl },
          { hreflang: 'x-default', href: enUrl },
        ];
        // 中文版整体略微降权，避免与英文主站争同一批关键词
        urlEntries.push(urlBlock(enUrl, today, r.changefreq, r.priority, alternates));
        urlEntries.push(urlBlock(zhUrl, today, r.changefreq, bumpPriorityDown(r.priority), alternates));
      }

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.baidu.com/schemas/sitemap-mobile/1/">
${urlEntries.join('\n')}
</urlset>
`;

      const outPath = path.join(distDir, 'sitemap.xml');
      fs.writeFileSync(outPath, xml, 'utf-8');
      console.log(
        `[sitemap] wrote ${urlEntries.length} URLs (${routes.length} routes × 2 languages) → ${path.relative(root, outPath)}`
      );
    },
  };
}

function bumpPriorityDown(priority: string): string {
  const n = parseFloat(priority);
  return Number.isNaN(n) ? priority : (n - 0.1).toFixed(1);
}

function urlBlock(
  loc: string,
  lastmod: string,
  changefreq: string,
  priority: string,
  alternates: Alternate[]
): string {
  const links = alternates
    .map((a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`)
    .join('\n');
  return `  <url>
    <loc>${loc}</loc>
    <mobile:mobile type="pc,mobile"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${links}
  </url>`;
}

/**
 * Extract id: 'xxx' from a TS data file.
 * Skips lines inside comments. Good enough for our flat id-first schema.
 */
function extractIds(filePath: string): string[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split(/\r?\n/);
  const ids: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) continue;
    // match: id: 'dairy-001'   or   id: 'case-butter'
    const m = trimmed.match(/^id:\s*['"]([^'"]+)['"]/);
    if (m) ids.push(m[1]);
  }
  return ids;
}