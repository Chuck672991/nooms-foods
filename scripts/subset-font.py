#!/usr/bin/env python3
"""
Subset a web font to only the characters a restaurant's config actually uses.

Why: a script font like Noto Nastaliq Urdu is ~160 KB for the whole Arabic block, but a
restaurant site uses a few dozen letters. Subsetting keeps every contextual form those
letters need (initial/medial/final shapes, ligatures, marks) and drops the rest: ~10x smaller.

  python3 scripts/subset-font.py <input.woff2|ttf> <output.woff2> <dir-to-scan> [--ranges arabic]

  e.g. python3 scripts/subset-font.py /tmp/NotoNastaliqUrdu-500.woff2 \\
         restaurants/jumma-gujjar/fonts/NotoNastaliqUrdu-500.subset.woff2 restaurants/jumma-gujjar

Scans every .ts/.tsx file under <dir-to-scan> for characters in the chosen script ranges
(default: Arabic/Urdu), plus space and the joiners. Re-run it whenever new Urdu text is added;
characters missing from the subset simply fall back to the next font in the stack.
Needs: pip install fonttools brotli
"""
import re
import sys
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

RANGES = {
    # Arabic block, Supplement, Presentation Forms A/B, joiners and directional marks.
    "arabic": r"[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿‌‍‎‏]",
}


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 3:
        print(__doc__)
        return 2
    src, out, scan = args
    ranges = "arabic"
    if "--ranges" in sys.argv:
        ranges = sys.argv[sys.argv.index("--ranges") + 1]
    pattern = re.compile(RANGES[ranges])

    chars = set(" ")
    for path in Path(scan).rglob("*"):
        if path.suffix in (".ts", ".tsx") and path.is_file():
            chars.update(pattern.findall(path.read_text(encoding="utf-8")))
    text = "".join(sorted(chars))
    print(f"{len(chars)} distinct characters found under {scan}")

    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["*"]  # keep init/medi/fina/liga/mark… so shaping still works
    opts.hinting = False
    opts.desubroutinize = True
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    font = TTFont(src)
    subsetter = subset.Subsetter(options=opts)
    subsetter.populate(text=text)
    subsetter.subset(font)
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    font.flavor = "woff2"
    font.save(out)
    print(f"wrote {out}: {Path(out).stat().st_size / 1024:.1f} KB (from {Path(src).stat().st_size / 1024:.1f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
