/**
 * 预渲染产物双模式校验。
 *
 * A. 静态模式（javaScriptEnabled: false）—— 模拟 DeepSeek Fetch / Baiduspider /
 *    360Spider：每个 URL 的静态 HTML 必须自带正确的正文 / title / canonical /
 *    hreflang / og:url / html lang。**这是预渲染的唯一目的，失败即视为没生效。**
 * B. 客户端模式（javascript on）：确认 React 接管预渲染 HTML 后功能不回归
 *    （0 console 错误、无横向溢出、语言正确、SEO 标签仍唯一）。
 *
 * 用法：
 *   # 本地：先在 dist/ 起个静态服务器，再校验
 *   # 端口别用 4190：它在 WHATWG fetch 的 blocked port 列表里（Sieve），
 *   # Node/undici 的 fetch 会直接报 `bad port`，导致 sitemap 读不到、全量退化成抽样。
 *   cd dist && python3 -m http.server 4173 &
 *   VERIFY_BASE=http://127.0.0.1:4173 VERIFY_FULL=1 npm run verify:prerender
 *   # 线上：部署后跑同一套
 *   VERIFY_BASE=https://www.quarkdairy.cn npm run verify:prerender
 *   # 线上全量 112 个 URL（默认只抽样 ROUTES×LANGS）
 *   VERIFY_BASE=https://www.quarkdairy.cn VERIFY_FULL=1 npm run verify:prerender
 *
 * 退出码非 0 表示有问题，可直接用于部署后的卡点。
 */
import { chromium } from 'playwright-core';
import os from 'node:os';
import path from 'node:path';

const EXEC = path.join(
  os.homedir(),
  'Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64',
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
);
const BASE = process.env.VERIFY_BASE || 'http://127.0.0.1:4173';
const DOMAIN = 'https://www.quarkdairy.cn';
const FULL = process.env.VERIFY_FULL === '1';

/** 抽样路由：覆盖首页 / 列表 / 详情 / 静态页，两种语言 */
const ROUTES = [
  '/', '/products', '/products/dairy-001', '/solutions',
  '/cases/case-butter', '/about', '/contact',
];
const LANGS = [
  { code: 'en', prefix: '', htmlLang: 'en' },
  { code: 'zh', prefix: '/zh', htmlLang: 'zh-CN' },
];
const VIEWPORTS = [
  { name: 'desk', width: 1440, height: 900 },
  { name: 'se', width: 375, height: 667 },
];

const abs = (u) => DOMAIN + u;
const problems = [];
const fail = (w, m) => { problems.push(`${w} :: ${m}`); console.log(' ✗ ' + w + ' :: ' + m); };

const browser = await chromium.launch({ executablePath: EXEC, headless: true });

/** 探测 URL 列表：全量模式从站点自己的 sitemap.xml 取，保证与提交给搜索引擎的完全一致 */
async function targetUrls() {
  if (!FULL) {
    return LANGS.flatMap((l) => ROUTES.map((r) => (r === '/' ? l.prefix || '/' : l.prefix + r)));
  }
  try {
    const res = await fetch(BASE + '/sitemap.xml');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    if (!paths.length) throw new Error('未解析出 <loc>');
    console.log(`sitemap 共 ${paths.length} 条 URL，全量校验`);
    return paths;
  } catch (e) {
    console.log(` ⚠️ sitemap 读取失败（${e.message}），回退到抽样路由`);
    return LANGS.flatMap((l) => ROUTES.map((r) => (r === '/' ? l.prefix || '/' : l.prefix + r)));
  }
}

// ---------- A. 静态模式 ----------
{
  const urls = await targetUrls();
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  let checked = 0;
  let chars = 0;

  for (const u of urls) {
    const isZh = u === '/zh' || u.startsWith('/zh/');
    const tag = `静态 ${u}`;

    let resp;
    try {
      resp = await page.goto(BASE + u, { waitUntil: 'domcontentloaded', timeout: 30000 });
    } catch (e) { fail(tag, '请求失败 ' + e.message); continue; }
    if (!resp || resp.status() !== 200) { fail(tag, `HTTP ${resp && resp.status()}`); continue; }

    const d = await page.evaluate(() => {
      const q = (s) => Array.from(document.querySelectorAll(s));
      // 正文主体排除导航/页脚这类全站 chrome：语言切换器「中文」按钮与
      // ICP 备案号「沪公网安备」都长在那里，拿它们判断页面语言会误报。
      const main = q('#root h1, #root h2, #root h3, #root h4, #root p, #root li')
        .map((e) => e.innerText || '').join(' ');
      const cn = (main.match(/[一-龥]/g) || []).length;
      const latin = (main.match(/[A-Za-z]/g) || []).length;
      return {
        text: (document.body.innerText || '').replace(/\s+/g, ' ').trim(),
        title: document.title,
        h1: (document.querySelector('h1')?.innerText || '').trim(),
        canonical: q('link[rel="canonical"]').map((e) => e.getAttribute('href')),
        alt: q('link[rel="alternate"][hreflang]').map((e) => e.getAttribute('hreflang')),
        desc: q('meta[name="description"]').map((e) => e.getAttribute('content')),
        ogUrl: q('meta[property="og:url"]').map((e) => e.getAttribute('content')),
        htmlLang: document.documentElement.lang,
        cnRatio: cn / Math.max(1, cn + latin),
      };
    });
    checked++;
    chars += d.text.length;

    // 核心判据：静态 HTML 必须自带正文，否则爬虫判定「无可提取内容」
    if (d.text.length < 300) fail(tag, `静态正文仅 ${d.text.length} 字符`);
    if (!d.title) fail(tag, '静态 title 为空');
    if (!d.h1) fail(tag, '静态 h1 为空');
    if (d.canonical.length !== 1) fail(tag, `canonical 数量=${d.canonical.length}`);
    else if (d.canonical[0] !== abs(u)) fail(tag, `canonical=${d.canonical[0]} 应为 ${abs(u)}`);
    if (d.alt.length !== 3 || !d.alt.includes('en') || !d.alt.includes('zh-CN') || !d.alt.includes('x-default')) {
      fail(tag, `hreflang=${d.alt.join(',')} 应含 en/zh-CN/x-default 各一个`);
    }
    if (d.desc.length !== 1 || !d.desc[0]) fail(tag, `description 数量=${d.desc.length}`);
    if (d.ogUrl.length !== 1 || d.ogUrl[0] !== abs(u)) fail(tag, `og:url=${JSON.stringify(d.ogUrl)}`);
    if (d.htmlLang !== (isZh ? 'zh-CN' : 'en')) fail(tag, `html lang=${d.htmlLang}`);
    // 语言正确性：/zh 必须真的是中文，英文页不能被中文内容覆盖（重复内容惩罚）
    if (isZh) {
      if (!/[一-龥]/.test(d.title)) fail(tag, `中文页 title 无中文: ${d.title}`);
      if (d.cnRatio < 0.2) fail(tag, `中文页正文汉字占比仅 ${(d.cnRatio * 100).toFixed(0)}%`);
    } else {
      if (/[一-龥]/.test(d.title)) fail(tag, `英文页 title 为中文: ${d.title}`);
      if (d.cnRatio > 0.3) fail(tag, `英文页正文汉字占比 ${(d.cnRatio * 100).toFixed(0)}%`);
    }
  }
  await ctx.close();
  console.log(`\nA. 静态模式（禁用 JS = 爬虫视角）：${checked} 个 URL，合计可见字符 ${chars}\n`);
}

// ---------- B. 客户端模式 ----------
if (!FULL) {
  const ctx = await browser.newContext();
  for (const vp of VIEWPORTS) {
    for (const lang of LANGS) {
      const page = await ctx.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const r of ROUTES) {
        const u = r === '/' ? lang.prefix || '/' : lang.prefix + r;
        const tag = `客户端 ${u} [${vp.name}]`;
        const errs = [];
        const onErr = (e) => errs.push(String(e));
        page.on('pageerror', onErr);
        page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });

        const resp = await page.goto(BASE + u, { waitUntil: 'networkidle', timeout: 45000 });
        await page.waitForTimeout(600);
        const d = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - window.innerWidth,
          text: (document.getElementById('root')?.innerText || '').trim().length,
          canon: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
          canonCount: document.querySelectorAll('link[rel="canonical"]').length,
          altCount: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
          org: document.documentElement.outerHTML.match(/"Organization"/g)?.length || 0,
          lang: document.documentElement.lang,
        }));
        page.off('pageerror', onErr);

        if (resp.status() !== 200) fail(tag, `HTTP ${resp.status()}`);
        if (errs.length) fail(tag, `错误 ${errs.length}: ${errs.slice(0, 2).join(' | ')}`);
        if (d.overflow > 1) fail(tag, `横向溢出 ${d.overflow}px`);
        if (d.text < 200) fail(tag, `正文未渲染 (${d.text})`);
        // React 接管后不能出现双份 canonical/hreflang（预渲染与 Helmet 同时输出）
        if (d.canonCount !== 1) fail(tag, `React 接管后 canonical 数量=${d.canonCount}`);
        if (d.canon !== abs(u)) fail(tag, `React 接管后 canonical=${d.canon}`);
        if (d.altCount !== 3) fail(tag, `React 接管后 hreflang=${d.altCount}`);
        if (u === '/' && d.org !== 1) fail(tag, `Organization 节点=${d.org}`);
        if (d.lang !== lang.htmlLang) fail(tag, `html lang=${d.lang}`);
      }
      await page.close();
    }
  }
  await ctx.close();
  console.log(`B. 客户端模式：${ROUTES.length * LANGS.length * VIEWPORTS.length} 组合\n`);
}

await browser.close();

console.log(`问题数: ${problems.length}`);
if (problems.length) process.exit(1);
console.log('预渲染双模式校验全部通过 ✅');