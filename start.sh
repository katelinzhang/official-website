#!/bin/bash
# QDII 后端启动脚本 — 宝塔 Node 项目"传统项目"模式用
# 用法：宝塔 → 网站 → 添加站点 → Node项目 → 启动文件填 start.sh
# 宝塔识别 .sh 后缀会用 bash 执行，绕过 node 只能跑 .js 的问题
#
# 直接调用项目本地的 tsx（./node_modules/.bin/tsx），
# 不依赖全局 npx，避免某些部署环境 PATH 中没有 npx。
export NODE_ENV=production
exec "$(dirname "$0")/node_modules/.bin/tsx" server/index.ts