/**
 * 百度「普通收录」API 推送 —— 把 dist/sitemap.xml 里的全部 URL 主动推给百度。
 *
 * 为什么需要它：Baiduspider 不会凭空发现一个新域名。没有站长平台提交、也没有
 * 任何外部链接时，服务器日志里的 Baiduspider 记录是 0（实测 2026-10-08 至 10-23
 * 共 0 次）。API 推送是百度官方认可的最快发现通道，sitemap 提交要慢得多。
 *
 * 前置条件（缺一不可）：
 *   1. 在 https://ziyuan.baidu.com 用百度账号添加站点 www.quarkdairy.cn；
 *   2. 完成站点验证（HTML 标签 / CNAME / 文件，任选其一，需要改代码或 DNS）；
 *   3. 进入「普通收录 → API 提交」，复制那串 16 位 token。
 *
 * 用法：
 *   BAIDU_TOKEN=xxxxxxxxxxxxxxxx npm run push:baidu
 *   BAIDU_TOKEN=... npm run push:baidu -- --dry-run   # 只打印，不发送
 *   BAIDU_SITE=www.quarkdairy.cn BAIDU_TOKEN=... ...  # 默认已是它
 *
 * 返回字段（百度官方）：
 *   success        成功推送的 URL 条数
 *   remain         当天剩余额度
 *   not_same_site  不属于本站、被拒的 URL
 *   not_valid      百度认为无效的 URL
 * 每次请求最多 2000 条，本脚本自动分片。
 */
import fs from 'node:fs';
import path from 'node:path';

const SITE = process.env.BAIDU_SITE || 'www.quarkdairy.cn';
const TOKEN = process.env.BAIDU_TOKEN || '';
const DRY_RUN = process.argv.includes('--dry-run');
const CHUNK = 2000;

const sitemapPath = path.resolve(process.cwd(), 'dist/sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('找不到 dist/sitemap.xml —— 先跑 npm run build');
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf-8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (urls.length === 0) {
  console.error('sitemap 里没有 <loc>，拒绝发送。');
  process.exit(1);
}

console.log(`sitemap: ${urls.length} 条 URL，站点 ${SITE}`);

if (DRY_RUN) {
  urls.forEach((u) => console.log(u));
  console.log(`${urls.length} 条（dry-run，未发送）`);
  process.exit(0);
}

if (!TOKEN) {
  console.error('缺少 BAIDU_TOKEN。到 百度搜索资源平台 → 普通收录 → API 提交 复制 token，然后：');
  console.error('  BAIDU_TOKEN=xxxxxxxxxxxxxxxx npm run push:baidu');
  process.exit(1);
}

let totalSuccess = 0;
let remain = null;
const notSameSite = [];
const notValid = [];

for (let i = 0; i < urls.length; i += CHUNK) {
  const batch = urls.slice(i, i + CHUNK);
  const endpoint =
    `http://data.zz.baidu.com/urls?site=${encodeURIComponent(SITE)}` +
    `&token=${encodeURIComponent(TOKEN)}`;

  let res;
  try {
    res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: batch.join('\n'),
    });
  } catch (e) {
    console.error(`第 ${i / CHUNK + 1} 批网络失败：${e.message}`);
    process.exit(1);
  }

  const text = await res.text();
  let data = null;
  try {
    data = JSON.parse(text);
  } catch {
    /* 百度失败时可能返回纯文本 */
  }

  if (!res.ok || !data || typeof data.success !== 'number') {
    console.error(`第 ${i / CHUNK + 1} 批推送失败 HTTP ${res.status}`);
    console.error(text.slice(0, 500));
    console.error('常见原因：token 错误（401 token is not valid）、站点未验证、超出当日额度。');
    process.exit(1);
  }

  totalSuccess += data.success;
  remain = data.remain;
  if (Array.isArray(data.not_same_site)) notSameSite.push(...data.not_same_site);
  if (Array.isArray(data.not_valid)) notValid.push(...data.not_valid);

  console.log(
    `第 ${i / CHUNK + 1} 批：success=${data.success}/${batch.length}，当天剩余额度=${data.remain}`
  );
}

console.log(`\n完成：成功 ${totalSuccess}/${urls.length}，当天剩余额度 ${remain}`);
if (notSameSite.length) console.log(`not_same_site (${notSameSite.length}):`, notSameSite.slice(0, 10));
if (notValid.length) console.log(`not_valid (${notValid.length}):`, notValid.slice(0, 10));

// 部分成功也算失败，避免部署脚本误判为全部推送成功
if (totalSuccess !== urls.length) process.exit(1);
