/**
 * 构建后预渲染（post-build pre-render）。
 *
 * 为什么需要：站点是纯 SPA，原始 HTML 里 <div id="root"></div> 是**空的**，
 * 全部正文由 JS 渲染。Googlebot 会执行 JS 所以没问题，但 DeepSeek Fetch、
 * Baiduspider、360Spider 等不执行 JS 的爬虫拿到的是 0 个正文字符——
 * DeepSeek 的 Fetch 文档明确把「没有可提取的 Markdown 正文」列为 404 条件。
 *
 * 做什么：启动 vite preview，逐个访问 sitemap 里的 URL，等 React 渲染完成后
 * 把 document.documentElement.outerHTML 存成对应路径的静态 index.html。
 * 产物形如 dist/zh/products/dairy-001/index.html，Caddy 的
 * `try_files {path} {path}/ /index.html` 会直接命中，无需改服务器配置。
 *
 * 客户端行为不变：React 仍用 createRoot 挂载，静态 HTML 只是给不执行 JS 的
 * 爬虫看的；渲染结果与客户端首次渲染一致，所以用户看不到闪烁。
 *
 * 用法：
 *   npm run build && npm run prerender
 *   npm run prerender -- /products /zh/products   # 只渲染指定路径（试点用）
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const PORT = Number(process.env.PRERENDER_PORT || 4180);
const BASE = `http://127.0.0.1:${PORT}`;
const DIST = path.resolve('dist');
const SITEMAP = path.join(DIST, 'sitemap.xml');

/** 等到正文真的出现，而不是等到网络空闲（图片懒加载会让 networkidle 迟到） */
const READY = `
  (() => {
    const root = document.getElementById('root');
    return !!root && (root.innerText || '').trim().length >= 200;
  })()
`;

/** 只渲染这几个路径；命令行参数为空则渲染 sitemap 全量 */
const requestedPaths = process.argv.slice(2).filter((a) => !a.startsWith('-'));

function pathsFromSitemap() {
  if (!fs.existsSync(SITEMAP)) {
    throw new Error(`找不到 ${SITEMAP}，请先 npm run build`);
  }
  const xml = fs.readFileSync(SITEMAP, 'utf-8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}

function chromiumPath() {
  const cache = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  const dirs = fs.existsSync(cache) ? fs.readdirSync(cache) : [];
  for (const d of dirs.filter((x) => x.startsWith('chromium-')).sort().reverse()) {
    const p = path.join(
      cache, d, 'chrome-mac-arm64',
      'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
    );
    if (fs.existsSync(p)) return p;
    const arm = path.join(
      cache, d, 'chrome-mac',
      'Chromium.app/Contents/MacOS/Chromium'
    );
    if (fs.existsSync(arm)) return arm;
  }
  // 兜底：让 playwright 自己解析
  return undefined;
}

async function waitForServer(url, proc, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    // preview 进程提前退出时立即报错，而不是白等 60 秒
    if (proc.exitCode !== null) {
      throw new Error(`vite preview 提前退出（exit=${proc.exitCode}），请确认 dist/ 已构建`);
    }
    try {
      const r = await fetch(url, { method: 'HEAD' });
      if (r.status < 500) return true;
    } catch { /* 还没起来，继续等 */ }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`preview 服务器未在 ${timeoutMs}ms 内就绪: ${url}`);
}

// 必须显式指定 --host 127.0.0.1：vite preview 默认只监听 IPv6 的 ::1，
// 而 Node 的 fetch 走 127.0.0.1 会直接连接失败（表现为端口探测永远超时）。
const preview = spawn(
  'npx',
  ['vite', 'preview', '--port', String(PORT), '--host', '127.0.0.1', '--strictPort'],
  { stdio: ['ignore', 'ignore', 'inherit'] }
);

let browser;
let failures = [];

try {
  await waitForServer(BASE, preview);
  browser = await chromium.launch({ executablePath: chromiumPath(), headless: true });

  const all = pathsFromSitemap();
  const paths = requestedPaths.length ? requestedPaths : all;
  console.log(`[prerender] 目标 ${paths.length} 个 URL${requestedPaths.length ? '（试点）' : '（全量）'}`);

  const ctx = await browser.newContext();
  let bytes = 0;

  for (const p of paths) {
    const page = await ctx.newPage();
    try {
      await page.goto(BASE + p, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.waitForFunction(READY, null, { timeout: 20000 });
      // 让 Helmet 的副作用与字体/图片解码稳定下来
      await page.waitForTimeout(300);

      const html = await page.evaluate(() => document.documentElement.outerHTML);

      // 抽查：正文为空说明这一页没渲染成功，宁可不写也不能写空壳
      const textLen = await page.evaluate(
        () => (document.getElementById('root')?.innerText || '').trim().length
      );
      if (textLen < 200) throw new Error(`渲染后正文仅 ${textLen} 字符`);

      const outFile =
        p === '/' ? path.join(DIST, 'index.html') : path.join(DIST, p, 'index.html');
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html, 'utf-8');
      bytes += Buffer.byteLength(html);
      console.log(`  ✓ ${p}  正文 ${textLen} 字符  ${(Buffer.byteLength(html) / 1024).toFixed(0)}KB`);
    } catch (e) {
      failures.push([p, e.message]);
      console.log(`  ✗ ${p}  ${e.message}`);
    } finally {
      await page.close();
    }
  }

  console.log(
    `[prerender] 完成 ${paths.length - failures.length}/${paths.length}，共写入 ${(bytes / 1024 / 1024).toFixed(1)}MB`
  );
} finally {
  if (browser) await browser.close();
  preview.kill('SIGTERM');
}

if (failures.length) process.exit(1);