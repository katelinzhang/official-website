#!/bin/bash
# QDII 一键部署脚本（服务器端用）
# ──────────────────────────────────────────────────────────────
# 在宝塔终端或 SSH 里跑这一行：
#   bash deploy.sh
#
# 脚本会：
#   1. 检查 Node 版本是否 ≥ v20
#   2. 安装生产依赖
#   3. 给 start.sh 执行权限
#   4. 提示创建 .env（如果还没创建）
#   5. 试启动一次确认正常
# ──────────────────────────────────────────────────────────────

set -e

# 切到脚本所在目录（确保 npm install 在正确的目录运行）
cd "$(dirname "$0")"

echo "=========================================="
echo " QDII 后端一键部署"
echo " 当前目录: $(pwd)"
echo "=========================================="
echo ""

# 1. Node 版本检查
NODE_VERSION=$(node -v 2>/dev/null || echo "未安装")
echo "[1/5] 当前 Node 版本: $NODE_VERSION"
if [[ "$NODE_VERSION" == "未安装" ]]; then
  echo "❌ 错误：未检测到 Node。请先在宝塔'Node 版本管理器'安装 v20.x"
  exit 1
fi
NODE_MAJOR=$(echo "$NODE_VERSION" | sed -E 's/^v([0-9]+).*/\1/')
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "❌ 错误：Node 版本必须 ≥ v20（项目用到了 Node 20.12+ 才有的 process.loadEnvFile）"
  echo "   当前是 $NODE_VERSION，请在宝塔装一个 v20.x 或 v22.x"
  exit 1
fi
echo "✅ Node 版本符合要求"
echo ""

# 2. 安装生产依赖
echo "[2/5] 安装生产依赖（npm install --omit=dev）..."
if [ ! -f package.json ]; then
  echo "❌ 错误：当前目录没有 package.json"
  echo "   请确认你在解压后的 website/ 目录里运行此脚本"
  exit 1
fi
npm install --omit=dev
echo "✅ 依赖安装完成"
echo ""

# 3. start.sh 权限
echo "[3/5] 给 start.sh 执行权限..."
chmod +x start.sh
ls -la start.sh
echo "✅ 权限已设"
echo ""

# 4. .env 文件检查
echo "[4/5] 检查 .env 文件..."
if [ ! -f .env ]; then
  echo "⚠️  .env 不存在"
  if [ -f .env.production.example ]; then
    echo "   发现 .env.production.example，复制为 .env"
    cp .env.production.example .env
    echo "   ⚠️  请用 'nano .env' 编辑以下字段："
    echo "      - SMTP_USER     （你的邮箱）"
    echo "      - SMTP_PASS     （邮箱授权码）"
    echo "      - VITE_API_BASE （改成 https://你的域名）"
    echo "      - ADMIN_TOKEN   （可选：默认已生成，若要重生成跑 openssl rand -hex 32）"
    echo ""
    echo "   按任意键打开 nano 编辑 .env，编辑完保存退出（Ctrl+O → Enter → Ctrl+X）"
    read -n 1 -s
    nano .env
  else
    echo "❌ 错误：既没有 .env 也没有 .env.production.example"
    exit 1
  fi
fi
echo "✅ .env 就绪"
echo ""

# 5. 试启动（10 秒后自动终止）
echo "[5/5] 试启动验证（10 秒后自动停止）..."
timeout 10 ./start.sh &
START_PID=$!
sleep 8
if kill -0 $START_PID 2>/dev/null; then
  echo ""
  echo "✅ 服务已正常启动！"
  kill $START_PID 2>/dev/null
  wait $START_PID 2>/dev/null
else
  echo ""
  echo "❌ 服务启动失败，请检查上面日志"
  exit 1
fi

echo ""
echo "=========================================="
echo " ✅ 部署准备完成"
echo "=========================================="
echo ""
echo "下一步：去宝塔面板 → 网站 → 添加站点 → Node项目 → 传统模式"
echo "表单填法："
echo "  项目名称   : qdii-backend"
echo "  Node 版本  : v20.x"
echo "  启动文件   : start.sh"
echo "  运行目录   : $(pwd)"
echo "  参数       : (留空)"
echo "  环境变量   : (留空)"
echo ""