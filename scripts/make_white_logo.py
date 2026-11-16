"""
把 /Users/a0/Desktop/qdii/website/public/images/logo.png
处理成「白色描边版 logo-white.png」。

思路：
1. 读入彩色 logo
2. 找「非白像素」(R<245 | G<245 | B<245) → mask
3. 把这些像素统一替换为纯白 (255,255,255)
4. 把白色像素当主体，原白色背景变透明
5. 裁掉透明边距 + 加 15% padding（按"宽松裁剪"约定）
6. 保存为 logo-white.png（保留 PNG alpha）+ logo-white.webp
"""

from PIL import Image
import numpy as np
from pathlib import Path

SRC = Path("/Users/a0/Desktop/qdii/website/public/images/logo.png")
OUT_PNG = Path("/Users/a0/Desktop/qdii/website/public/images/logo-white.png")
OUT_WEBP = Path("/Users/a0/Desktop/qdii/website/public/images/logo-white.webp")

img = Image.open(SRC).convert("RGBA")
arr = np.array(img)

# 非白像素 mask（彩色 logo 的全部"墨迹"）
r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]
ink_mask = (r < 245) | (g < 245) | (b < 245)

# 新图像：墨迹通道 = 纯白(255)；保留原 alpha；非墨迹全透明
out_arr = np.zeros_like(arr)
out_arr[..., 0] = 255  # R
out_arr[..., 1] = 255  # G
out_arr[..., 2] = 255  # B
out_arr[..., 3] = np.where(ink_mask, a, 0)

out = Image.fromarray(out_arr, mode="RGBA")

# 裁掉透明边
bbox = out.getbbox()
if bbox:
    out = out.crop(bbox)

# 按 15% 内容宽高加 padding（"宽松裁剪"约定）
w, h = out.size
pad_x = int(w * 0.15)
pad_y = int(h * 0.15)
canvas = Image.new("RGBA", (w + 2 * pad_x, h + 2 * pad_y), (0, 0, 0, 0))
canvas.paste(out, (pad_x, pad_y), out)

# 保存
canvas.save(OUT_PNG, "PNG", optimize=True)
canvas.save(OUT_WEBP, "WEBP", quality=92, method=6)

print(f"SRC  size: {img.size}")
print(f"OUT  size: {canvas.size}")
print(f"Wrote: {OUT_PNG} ({OUT_PNG.stat().st_size} bytes)")
print(f"Wrote: {OUT_WEBP} ({OUT_WEBP.stat().st_size} bytes)")
