# Jumma Gujjar: assets manifest

Inventory of every file under `public/restaurants/jumma-gujjar/` (brief §0.1), what serves which
section, and where each one came from. **The owner's originals are never modified or deleted.**
Everything under `optimized/`, `seo/` and `fonts/` is derived from them (or generated), and can be
regenerated. Paths are referenced from one place only: `restaurants/jumma-gujjar/images.ts` (+ the
`reels` block of `home.ts`).

> Note: the brief says the assets live in `public/Jumma Gujjar/`. In this repo they were placed at
> `public/restaurants/jumma-gujjar/` (the template's per-restaurant convention: no space in the path,
> nothing to URL-encode). Nothing was moved.

## Owner-supplied originals (untouched)

| File | Size | Role | Notes |
|---|---|---|---|
| `logo/image.png` | 447×447, 124 KB | Header mark, footer logo, intro sticker, story circle, favicon source | Opaque yellow square (no transparent/vector version). **Colours sampled from it: yellow `#FFCA08`, red `#EA1A23`.** |
| `food/Matka-nihari.png` | 335×597, 311 KB | Hero backdrop, tarka tile/card, story, gallery | A cook with a pan of flame over rows of clay pots. The brand's signature moment. |
| `food/nihari.png` | 335×597, 240 KB | Nalli card, bowl crops (Maghaz card, hero print), menu print | Hand holding bone marrow over a bowl of nihari. |
| `food/canned-nihari.png` | 717×960, 856 KB | Gallery | Looks like an AI-generated pack render (corner sparkle). **See open item 3.** |
| `food/desi-ghee.png` | 382×523, 214 KB | Gallery | Close-up of the same tin (also a render, same sparkle). File name says "desi-ghee" but it shows the nihari tin. |
| `videos/gujjar-promo-tiktok.mp4` | 576×1024, 53 s, 11 MB | Reel "The dairy" | TikTok `@jummagujjar416`. Jumma Gujjar Dairy: shop sign, lassi, desi ghee. Has audio. |
| `videos/nihari-tarka-tiktok.mp4` | 576×1024, 47 s, 19 MB | Reel "The tarka" | TikTok **`@sultanleonet`** (a creator, not the owner's handle). Flames, bowls, "Special Nihari". Has audio. **See open item 2.** |
| `videos/tiktok-nihari-serving.mp4` | 576×1024, 32 s, 8.6 MB | Reel "At the table" | TikTok `@jummagujjar416`. Trays of nihari carried to the outdoor tables. Has audio. |

TikTok's burned-in watermark/handle is **left in** every clip (it is also the attribution).

## Derived copies (`optimized/`)

| File | Size | Made from | How |
|---|---|---|---|
| `tarka-pots.jpg` | 670×1194 | `food/Matka-nihari.png` | 2× Lanczos resample + light sharpen |
| `marrow-bowl.jpg` | 670×1194 | `food/nihari.png` | same |
| `tin-pack.jpg` | 717×898 | `food/canned-nihari.png` | bottom 62 px cropped off (the generator's corner sparkle) |
| `tin-pack-close.jpg` | 764×958 | `food/desi-ghee.png` | sparkle cropped, 2× resample |
| `dairy-sign.jpg` | 576×696 | still @ 0:05 of the dairy promo | top 68 % kept: the storefront sign, above TikTok's watermark band |
| `ghee-tubs.jpg` | 576×716 | still @ 0:50 of the dairy promo | top 70 % kept |
| `lassi-jug.jpg` | 576×716 | still @ 0:36 of the dairy promo | top 70 % kept |
| `poster-*.jpg` ×3 | 480×854 | frames of each reel (0:01, 0:00, 0:13) | JPEG q80; shown before/instead of playback |
| `reel-dairy-promo.mp4` | 480×854, 4.9 MB | `gujjar-promo-tiktok.mp4` | H.264 CRF 31, AAC mono 48 kbps, `faststart` |
| `reel-tarka.mp4` | 480×854, 6.7 MB | `nihari-tarka-tiktok.mp4` | same |
| `reel-serving.mp4` | 480×854, 3.2 MB | `tiktok-nihari-serving.mp4` | same |

The three reels total 15 MB (originals: 38 MB) and are **not downloaded until needed**: `preload="none"`,
only the active reel streams, and posters are requested only when the stage is within a screen of view.
The stills were cropped above the platform watermark from the **owner's own** clips (`@jummagujjar416`).
No watermark was removed from, or cropped out of, the third-party clip.

## Generated (`seo/`, `fonts/`)

| File | Role |
|---|---|
| `seo/og.jpg` 1200×630 | Open Graph / Twitter card: blurred flame backdrop + logo + "Jumma Gujjar Nihari / Asli zaiqa, asli tarka. / Liaquatabad · Karachi" |
| `seo/favicon.ico` (16/32/48), `seo/icon.png` 64 px, `seo/apple-icon.png` 180 px | Icons, all from the logo |
| `restaurants/jumma-gujjar/fonts/NotoNastaliqUrdu-500.subset.woff2` (not under `public/`; bundled by `next/font/local`) | Noto Nastaliq Urdu 500 (SIL OFL), subset to the 20 letters the site uses: 61 KB vs 161 KB. Regenerate with `scripts/subset-font.py` after adding new Urdu text (see the header of `fonts.ts`). |

## Not downloaded

No stock or web images were added (brief §0.1 allows it for gaps). Instead, categories with no honest
photo (**Roti & Sheermal, Curries & Daal**) render as typographic plates: their Urdu names set large in
gold over a warm glow (`CategoryGlyph`). Nothing pretends to be this kitchen's food. A `downloaded/`
folder and a placeholder log were therefore not needed; if placeholders are added later, log filename,
source URL, licence and placeholder/final status here.

## Open items (need the owner)

1. **Photos.** Only 4 photos exist (+3 stills from the owner's clips). The brief aims for 8–15, and
   needs a **nalli close-up, sheermal/roti, curries, lassi, the outlet exterior**, and ideally a
   **clean tarka clip with no TikTok watermark** for the hero (the template already supports
   `home.hero.video`).
2. **The `@sultanleonet` clip** (`reel "tarka"`): it is another creator's video. It is shown with a visible
   credit and link, but the brief says not to re-host creators' footage without permission. Get their OK,
   or delete that item from `home.reels.items`.
3. **The two tin-pack images** look AI-generated and the Daraz seller is unverified (brief §2). They are
   only in the gallery, captioned "The nihari tin pack". Confirm the pack exists and is the owner's, or
   remove them from `gallery.items`.
4. **The YouTube video** (`tTw8k8Ld-7U`) is Saqib Mobeen's, not an owner promo. It is an official
   click-to-load embed (nothing re-hosted), credited to him.
5. **`@jummagujjar416`** was read off the clips' watermark; confirm it is the official TikTok.
6. The brief's own `[CONFIRM]` list: exact address + Maps pin, hours, WhatsApp number, Foodpanda
   branch (its address says Korangi), dine-in prices, lassi price, "from our own dairy" claim, founding year.
