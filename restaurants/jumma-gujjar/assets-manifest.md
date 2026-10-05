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
| `food/biryani.png` | 335×597, 277 KB | Biryani & Pulao tile + menu print, marquee, gallery | A plate of golden biryani lifted from a large pot. **Added by the owner on 2026-10-05.** |
| `food/gujjar-pulaao.png` | 335×597, 375 KB | Pulao print (plates only), marquee, gallery | **Added by the owner.** It is a screenshot of a creator's video (a man's face, "Allah Ki bhot MEHARBANI RAHI" captions), so **only the plates at the bottom are used** (cropped); the person and captions are left out. Swap in an own pulao photo when there is one. |
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
| `biryani-plate.jpg` | 670×1194 | `food/biryani.png` | 2× Lanczos resample + light sharpen |
| `pulao-plates.jpg` | 1005×405 | `food/gujjar-pulaao.png` | bottom 135 px only (the plates), 3× resample |
| `lassi-pour.jpg` | 1152×1454 | still @ 0:35 of the dairy promo | top 71 % kept (above the watermark), 2× resample. A thick stream of lassi into a steel glass. Homepage **Lassi** tile + menu print. |
| `biryani-thali.jpg` | 1152×880 | still @ 0:13 of the serving clip | band between 27 % and 70 % of the frame (above the watermark), 2× resample. A thali with two plates of golden rice. Marquee + gallery. |
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

## Downloaded (`downloaded/`): one placeholder

| File | Source | Licence | Status |
|---|---|---|---|
| `downloaded/milk-bottles.jpg` (1400×933, unmodified) | Jason Murphy on Unsplash, <https://unsplash.com/photos/GBmqt8_zMVc> (file `photo-1557759171-258278b1578b`) | Unsplash License (free for commercial use, no attribution required) | **PLACEHOLDER**: used for the homepage **Doodh ki Bottle** tile and its menu print. The footage has no bottled milk. Replace with the owner's own photo. Its `alt` says "Placeholder photo: …". |

Everything else the site shows is the owner's own material. Categories with no honest photo (**Roti &
Sheermal, Curries & Daal**) render as typographic plates on the menu page (their Urdu names set large in
gold over a warm glow, `CategoryGlyph`) and are kept off the homepage tile row (`homeTile: false`).
Log any further placeholder here: filename, source URL, licence, placeholder/final status.

## Open items (need the owner)

0. **Biryani & Pulao, Doodh ki Bottle** were added at the owner's request. The brief had found biryani/pulao
   only in an Instagram bio (not on Foodpanda), and a milk bottle appears nowhere. No prices, no descriptions
   beyond the name: confirm what is actually served and the prices (and replace the milk-bottle placeholder).

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
