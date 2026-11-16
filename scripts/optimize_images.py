#!/usr/bin/env python3
"""Web 图片瘦身：等比缩放到 1200px 宽，转 jpeg 75% 质量覆盖原 webp。"""
import os
import sys
from pathlib import Path
from PIL import Image

ROOT = Path("/Users/a0/Desktop/qdii/website/public/images")
MAX_W = 1200
QUALITY = 75

def human(n):
    for u in ['B', 'KB', 'MB', 'GB']:
        if n < 1024: return f"{n:.1f}{u}"
        n /= 1024
    return f"{n:.1f}TB"

total_before = 0
total_after = 0
count = 0

for sub in ROOT.glob("*"):
    if not sub.is_dir(): continue
    for f in list(sub.glob("*.webp")) + list(sub.glob("*.jpg")):
        if f.stat().st_size == 0: continue
        before = f.stat().st_size
        try:
            im = Image.open(f)
            im.load()
        except Exception as e:
            print(f"SKIP {f.name}: {e}")
            continue
        # 跳过过小（已足够小）
        if im.width <= MAX_W and before < 200_000:
            continue
        # 等比缩放
        if im.width > MAX_W:
            ratio = MAX_W / im.width
            new_h = int(im.height * ratio)
            im = im.resize((MAX_W, new_h), Image.LANCZOS)
        # 转 RGB（防止 RGBA）
        if im.mode in ("RGBA", "P"):
            bg = Image.new("RGB", im.size, (255, 248, 234))
            bg.paste(im, mask=im.split()[-1] if im.mode == "RGBA" else None)
            im = bg
        elif im.mode != "RGB":
            im = im.convert("RGB")
        # 输出为 jpeg（覆盖 .webp 同名文件）
        out = f.with_suffix(".jpg")
        im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)
        # 删除 webp
        if f.suffix == ".webp" and out != f:
            f.unlink()
        after = out.stat().st_size
        total_before += before
        total_after += after
        count += 1
        print(f"  {f.name}: {human(before)} -> {human(after)} ({(1-after/before)*100:.0f}%↓)")

print(f"\n处理 {count} 个文件")
print(f"总计: {human(total_before)} -> {human(total_after)} (节省 {human(total_before-total_after)})")