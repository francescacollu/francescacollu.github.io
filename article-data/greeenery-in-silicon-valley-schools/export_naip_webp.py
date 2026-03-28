"""Resize NAIP RGB GeoTIFFs to fixed dimensions for the compare slider (one-off / rerun as needed)."""
from pathlib import Path

import numpy as np
import rasterio
from PIL import Image

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent.parent
OUT_DIR = REPO / "public" / "images" / "articles" / "greenery-sv-schools"

# Square output, smaller than the previous 1600x1610 slider assets
TARGET_W, TARGET_H = 900, 900

JOBS = [
    (
        ROOT / "naip_lexington_school_square.tif",
        "lexington-satellite.webp",
    ),
    (
        ROOT / "naip_kennedy_school_square.tif",
        "rfk-satellite.webp",
    ),
]


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for src, name in JOBS:
        with rasterio.open(src) as ds:
            r, g, b = ds.read(1), ds.read(2), ds.read(3)
        rgb = np.dstack((r, g, b))
        img = Image.fromarray(rgb, mode="RGB")
        img = img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
        dest = OUT_DIR / name
        img.save(dest, format="WEBP", quality=85, method=6)
        print(f"Wrote {dest} ({TARGET_W}x{TARGET_H})")


if __name__ == "__main__":
    main()
