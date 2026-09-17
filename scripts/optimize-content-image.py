#!/usr/bin/env python3
"""Create a bounded, metadata-free WebP content image.

Usage: optimize-content-image.py INPUT OUTPUT [MAX_WIDTH] [MAX_KIB]
"""

from pathlib import Path
import sys

from PIL import Image, ImageOps


def main() -> None:
    if len(sys.argv) < 3:
        raise SystemExit("Usage: optimize-content-image.py INPUT OUTPUT [MAX_WIDTH] [MAX_KIB]")

    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    max_width = int(sys.argv[3]) if len(sys.argv) > 3 else 1280
    max_bytes = (int(sys.argv[4]) if len(sys.argv) > 4 else 250) * 1024

    target.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)

        quality = 78
        while quality >= 48:
            image.save(target, "WEBP", quality=quality, method=6, exif=b"")
            if target.stat().st_size <= max_bytes:
                break
            quality -= 4

    if target.stat().st_size > max_bytes:
        raise SystemExit(f"{target} remains larger than {max_bytes} bytes")

    print(f"{source.name} -> {target.name}: {image.width}x{image.height}, {target.stat().st_size} bytes")


if __name__ == "__main__":
    main()
