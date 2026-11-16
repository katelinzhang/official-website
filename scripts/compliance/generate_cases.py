#!/usr/bin/env python3
"""
ComfyUI 批量生成 6 张无品牌合规案例图
通过 curl 调用本地 ComfyUI server (127.0.0.1:8188)
模型: Realistic_Vision_V5.1_fp16 (SD 1.5)
"""
import json
import subprocess
import time
import sys
import shutil
from pathlib import Path

COMFY_HOST = "127.0.0.1"
COMFY_PORT = 8188
OUTPUT_DIR = Path("/Users/a0/Desktop/qdii/website/public/images/cases-tmp")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# 6 张案例图 prompt（核心要求：无品牌、无 logo、无文字、无水印）
WORKFLOWS = [
    {
        "id": "case-butter-1",
        "title": "Unsalted Butter Block",
        "prompt": "Professional product photography of a large fresh unsalted butter block on a clean white surface, soft natural daylight from side, soft shadows, dairy freshness, warm creamy color, ultra sharp focus, studio shot, 4:3 composition, no text, no logos, no labels, no watermarks, no brands, no packaging, no people",
        "negative": "text, logo, brand, label, packaging, wrapper, watermark, signature, caption, title, words, letters, numbers, blur, low quality, deformed, ugly, distorted"
    },
    {
        "id": "case-cheese-powder-1",
        "title": "Cheese Powder Pile",
        "prompt": "Close-up professional product photography of a pile of fine golden cheese powder in a rustic white ceramic bowl, with a small wooden scoop, natural daylight, soft warm tones, dairy ingredient, ultra sharp focus on the powder texture, no text, no logos, no labels, no brands, no packaging, no people",
        "negative": "text, logo, brand, label, packaging, wrapper, watermark, signature, caption, words, letters, numbers, blur, low quality, deformed, ugly, distorted"
    },
    {
        "id": "case-cheese-powder-2-risky",
        "title": "Chocolate Crispy Pieces",
        "prompt": "Close-up food photography of dark chocolate crispy pieces with golden cheese powder sprinkled on top, arranged on rustic wooden board, natural warm lighting, fine detail of chocolate texture and powder coating, no text, no logos, no labels, no brands, no packaging, no people",
        "negative": "text, logo, brand, label, packaging, wrapper, watermark, signature, caption, words, letters, numbers, blur, low quality, deformed, ugly, distorted"
    },
    {
        "id": "case-eva-cream-1",
        "title": "Whipped Cream Piping",
        "prompt": "Professional bakery photography of fresh whipped cream being piped into elegant floral decorative shapes on a clean white porcelain plate, soft daylight, ultra sharp focus on cream texture, smooth creamy white color, dairy freshness, no text, no logos, no labels, no brands, no people",
        "negative": "text, logo, brand, label, packaging, wrapper, watermark, signature, caption, words, letters, numbers, blur, low quality, deformed, ugly, distorted"
    },
    {
        "id": "case-fermented-cream-1",
        "title": "Fermented Cream Concentrate Jar",
        "prompt": "Clean professional product photography of a clear glass jar filled with thick pale fermented cream, placed on light marble surface, soft side lighting, no label on jar, no text, no logos, no brands, no packaging marks, simple and pure ingredient focus, ultra sharp focus, no people",
        "negative": "text, logo, brand, label, packaging, wrapper, watermark, signature, caption, words, letters, numbers, blur, low quality, deformed, ugly, distorted"
    },
    {
        "id": "case-fermented-cream-3",
        "title": "Fermented Cream with Strawberry Pieces",
        "prompt": "Close-up food photography of fresh fermented cream in a small glass bowl next to fresh strawberry pieces and a drizzle of strawberry juice, soft natural daylight, clean light background, dairy and fruit ingredients composition, ultra sharp focus, no text, no logos, no labels, no brands, no people",
        "negative": "text, logo, brand, label, packaging, wrapper, watermark, signature, caption, words, letters, numbers, blur, low quality, deformed, ugly, distorted"
    },
]


def build_workflow(prompt: str, negative: str, seed: int = 42) -> dict:
    """构造 SD 1.5 txt2img workflow JSON"""
    return {
        "3": {
            "class_type": "KSampler",
            "inputs": {
                "seed": seed,
                "steps": 25,
                "cfg": 7.0,
                "sampler_name": "euler_ancestral",
                "scheduler": "normal",
                "denoise": 1.0,
                "model": ["4", 0],
                "positive": ["6", 0],
                "negative": ["7", 0],
                "latent_image": ["8", 0]
            }
        },
        "4": {
            "class_type": "CheckpointLoaderSimple",
            "inputs": {"ckpt_name": "Realistic_Vision_V5.1_fp16-no-ema.safetensors"}
        },
        "6": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": prompt, "clip": ["4", 1]}
        },
        "7": {
            "class_type": "CLIPTextEncode",
            "inputs": {"text": negative, "clip": ["4", 1]}
        },
        "8": {
            "class_type": "EmptyLatentImage",
            "inputs": {"width": 832, "height": 624, "batch_size": 1}
        },
        "9": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["3", 0], "vae": ["4", 2]}
        },
        "10": {
            "class_type": "SaveImage",
            "inputs": {"filename_prefix": "qdii_case", "images": ["9", 0]}
        }
    }


def curl_json(method: str, path: str, body: dict = None) -> dict:
    """用 curl 调用 ComfyUI HTTP API"""
    url = f"http://{COMFY_HOST}:{COMFY_PORT}{path}"
    if body is not None:
        body_file = Path("/tmp/_qdii_comfy_body.json")
        body_file.write_text(json.dumps(body))
        cmd = ["curl", "-s", "-X", method, url,
               "-H", "Content-Type: application/json",
               "--data-binary", f"@{body_file}"]
    else:
        cmd = ["curl", "-s", "-X", method, url]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        raise RuntimeError(f"curl failed: {result.stderr}")
    if not result.stdout.strip():
        raise RuntimeError(f"empty response: {result.stderr}")
    return json.loads(result.stdout)


def queue_prompt(workflow: dict) -> str:
    """提交 prompt 到 ComfyUI queue"""
    payload = {"prompt": workflow, "client_id": "qdii-generator"}
    result = curl_json("POST", "/prompt", payload)
    return result.get("prompt_id")


def get_history(prompt_id: str) -> dict:
    """查询 prompt 执行结果"""
    return curl_json("GET", f"/history/{prompt_id}")


def wait_for_completion(prompt_id: str, timeout: int = 300) -> dict:
    """等待 prompt 完成"""
    start = time.time()
    while time.time() - start < timeout:
        history = get_history(prompt_id)
        if prompt_id in history:
            entry = history[prompt_id]
            if entry.get("status", {}).get("completed"):
                return entry
        time.sleep(2)
    raise TimeoutError(f"Prompt {prompt_id} timeout after {timeout}s")


def download_image(filename: str, subfolder: str, save_path: Path):
    """从 ComfyUI view 接口下载生成的图片"""
    import urllib.parse
    params = urllib.parse.urlencode({
        "filename": filename,
        "subfolder": subfolder,
        "type": "output"
    })
    url = f"http://{COMFY_HOST}:{COMFY_PORT}/view?{params}"
    cmd = ["curl", "-s", "-o", str(save_path), url]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        raise RuntimeError(f"download failed: {result.stderr}")
    return save_path.stat().st_size


def generate_one(workflow_meta: dict, seed: int = 42) -> Path:
    """生成一张图"""
    print(f"\n{'='*60}")
    print(f"[GEN] {workflow_meta['id']} ({workflow_meta['title']})")
    print(f"{'='*60}")

    workflow = build_workflow(workflow_meta["prompt"], workflow_meta["negative"], seed)
    prompt_id = queue_prompt(workflow)
    print(f"   prompt_id: {prompt_id}")

    print("   Waiting for completion...")
    result = wait_for_completion(prompt_id, timeout=300)

    outputs = result.get("outputs", {})
    if "10" not in outputs or "images" not in outputs["10"]:
        raise RuntimeError(f"No images in output: {result}")

    img_meta = outputs["10"]["images"][0]
    filename = img_meta["filename"]
    subfolder = img_meta.get("subfolder", "")

    save_path = OUTPUT_DIR / f"{workflow_meta['id']}.png"
    size = download_image(filename, subfolder, save_path)
    print(f"   OK: {save_path} ({size:,} bytes)")
    return save_path


def main():
    print(f"ComfyUI batch generation start")
    print(f"   Server: http://{COMFY_HOST}:{COMFY_PORT}")
    print(f"   Output: {OUTPUT_DIR}")
    print(f"   Total tasks: {len(WORKFLOWS)}")

    results = []
    for i, wf in enumerate(WORKFLOWS):
        try:
            seed = 42 + i * 1000
            path = generate_one(wf, seed=seed)
            results.append({"id": wf["id"], "status": "ok", "path": str(path)})
        except Exception as e:
            print(f"   FAIL: {e}")
            results.append({"id": wf["id"], "status": "fail", "error": str(e)})

    print(f"\n{'='*60}")
    print(f"Summary: {sum(1 for r in results if r['status']=='ok')}/{len(results)} succeeded")
    print(f"{'='*60}")
    for r in results:
        icon = "OK" if r["status"] == "ok" else "FAIL"
        print(f"   [{icon}] {r['id']}")

    return 0 if all(r["status"] == "ok" for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
