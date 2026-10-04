# Qissa Website — UI Reverse-Engineering Spec

Source of truth: [qissa.co.uk](https://www.qissa.co.uk/) (homepage) and [qissa.co.uk/gallery](https://www.qissa.co.uk/gallery/). Stack: a WordPress theme called "qissa", one small vanilla-JS file (`assets/js/qissa.js`, \~17.8 KB, no framework, no build step), plus a stylesheet built on CSS custom properties. Every value below (colors, timings, pixel sizes, easing curves, canvas math) was read directly from the live computed styles, the live stylesheet rules, and the literal source of `qissa.js` — not estimated. Treat this as a literal implementation spec: it should be possible to rebuild each effect byte-for-byte from the numbers given.

## 1. Starfield / twinkle-dots background

It is a single `<canvas class="stars-canvas">`, not an image, SVG, or CSS pattern. It sits once in `<body>` (not repeated per-section) and shows through every dark section because the canvas itself is `position: fixed; inset: 0; z-index: 0; pointer-events: none;` — a full-viewport layer behind all content, sized to `window.innerWidth/innerHeight * devicePixelRatio` so it stays crisp on retina screens. It never scrolls with the page (fixed), so the same star field is visible behind the hero, the cuisine section, the signatures grid, etc.

**Setup (runs once, skipped entirely if `prefers-reduced-motion: reduce`):**

```js
var dpr = Math.min(2, window.devicePixelRatio || 1);
var w = canvas.width = window.innerWidth * dpr;
var h = canvas.height = window.innerHeight * dpr;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';

var n = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 9000));
var stars = [];
for (var i = 0; i < n; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    z: Math.random() * 0.9 + 0.1,       // depth, used for parallax strength (0.1–1.0)
    r: (Math.random() * 1.1 + 0.3) * dpr, // radius 0.3–1.4px, scaled for dpr
    tw: Math.random() * Math.PI * 2,     // phase offset for twinkle
    gold: Math.random() > 0.82           // ~18% of stars are gold-tinted
  });
}
```

Star count is density-based (viewport area ÷ 9000px²) and hard-capped at 180 — on a 1084×851 viewport that's about 102 stars.

**Render loop (`requestAnimationFrame`, runs continuously):**

```js
var t = 0;
function draw() {
  ctx.clearRect(0, 0, w, h);
  t += 0.01;
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];
    // mouse-parallax offset, scaled by each star's own depth (z)
    var px = (mouse.x - 0.5) * s.z * 26 * dpr;
    var py = (mouse.y - 0.5) * s.z * 26 * dpr - (scrollY * s.z * 0.15 * dpr) % h;
    var yy = (s.y + py) % h; if (yy < 0) yy += h;
    // twinkle: brightness oscillates 0.4–1.0 via abs(sin), each star its own speed (z) and phase (tw)
    var tw = 0.4 + 0.6 * Math.abs(Math.sin(s.tw + t * s.z * 2));
    ctx.beginPath();
    ctx.arc(s.x + px, yy, s.r, 0, Math.PI * 2);
    if (s.gold) {
      ctx.fillStyle = 'rgba(233,205,138,' + (tw * 0.9) + ')'; // warm gold, brighter peak
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(233,205,138,.6)'; // soft glow, gold stars only
    } else {
      ctx.fillStyle = 'rgba(246,241,231,' + (tw * 0.6) + ')'; // warm cream-white, no glow
      ctx.shadowBlur = 0;
    }
    ctx.fill();
  }
  ctx.shadowBlur = 0;
  requestAnimationFrame(draw);
}
```

**What this produces, in plain terms:** roughly 100–180 tiny soft-edged dots scattered at random across the full screen. About 4 in 5 are a warm off-white (`rgb(246,241,231)`, the site's `--cream` token — deliberately not pure white) and 1 in 5 are a warm gold (`rgb(233,205,138)`) with an 8px soft glow around them, matching the brand's gold accent. Every dot continuously pulses in opacity between \~40% and 100% on its own sine-wave timer (so the field never stops twinkling, and no two stars pulse in sync). Moving the mouse nudges nearer stars (`z` close to 1) further than distant ones (`z` close to 0.1), giving a subtle parallax/depth feel; scrolling the page also drifts stars slightly and wraps them top-to-bottom (`% h`) so the field is seamless and never runs out of stars. Confirmed live by sampling canvas pixel data: dot coverage is \~0.15% of the screen, peak alpha observed \~230/255, dominant core color `rgb(246,241,231)` with a secondary cluster at `rgb(234,205,137)` (the gold stars) — matching the source exactly.

**To reproduce:** create one fixed full-viewport `<canvas>` behind your dark sections, generate N random points with depth/radius/phase/color as above, and run that draw loop. No external assets needed.

## 2. Navbar scroll-shrink animation

It is a single boolean class toggle driven by scroll position, with all the visual change done through CSS transitions — no scroll-linked JS animation and no `transform: scale()` on the logo (sizes genuinely change via width/height, not a scale trick).

**JS (the entire logic):**

```js
var header = document.querySelector('.site-header');
function onScroll() {
  if (header) header.classList.toggle('scrolled', window.scrollY > 60);
}
onScroll();
window.addEventListener('scroll', onScroll);
```

That's it — one threshold (60px), one class toggle, passive scroll listener.

**CSS state 1 — top of page (`.site-header`, no `.scrolled`):**

- `height: 136px`, `padding: 22px 54.2px`
- `background: transparent`, `backdrop-filter: none`, no border
- logo (`.brand__logo`): `height: 92px`, `width: 130.9px` (aspect-ratio locked)

**CSS state 2 — scrolled past 60px (`.site-header.scrolled`):**

- `height: 91px`, `padding: 12px 54.2px`
- `background: rgba(8,13,32,0.72)`, `backdrop-filter: blur(16px) saturate(1.2)`
- `border-bottom: 1px solid rgba(246,241,231,0.1)`
- logo: `height: 66px`, `width: 93.9px`

So on scroll the header condenses by \~33% (136px → 91px) and the logo shrinks by the same ratio (\~0.717×: 92px → 66px tall, 130.9px → 93.9px wide), while the header gains a frosted-glass background (dark navy at 72% opacity + 16px blur + 1.2× saturation boost) and a faint hairline border. This is what reads as the logo “zooming out” — it is actually the whole header compressing, with the logo's `<img>` box shrinking proportionally inside it; nothing scales up first before shrinking.

**Transition (applied in the base, non-scrolled state, so both directions animate smoothly):**

```css
.site-header {
  transition: padding .5s cubic-bezier(.22,.61,.36,1),
              background .5s cubic-bezier(.22,.61,.36,1),
              backdrop-filter .5s;
}
.brand__logo {
  transition: height .5s cubic-bezier(.22,.61,.36,1);
}
```

Easing curve `cubic-bezier(.22,.61,.36,1)` is the site's global `--ease` token — a snappy ease-out (fast start, gentle settle). Duration 0.5s on everything, so header shrink, background fade-in, blur fade-in and logo shrink all complete together.

**To reproduce:** toggle one class at `scrollY > 60`; define two states for header height/padding/background/backdrop-filter and logo height/width; put `transition` on the base (unscrolled) rule using `cubic-bezier(.22,.61,.36,1)` over `0.5s`.

## 3. Hero background video

The hero's backdrop is a real `<video>` element (one `webm` source), not a GIF or CSS animation, wrapped in `.hero__media`:

```html
<div class="hero__media">
  <video autoplay loop muted playsinline preload="metadata" poster="<fallback-image>">
    <source src="..." type="video/webm">
  </video>
</div>
```

- `autoplay + muted + playsinline` so it starts immediately on both desktop and mobile without a user gesture or native controls bar.
- `loop` so it runs continuously with no visible seam.
- `preload="metadata"` (not `auto`) — only loads enough to get dimensions/poster fast, defers the full video payload slightly for faster first paint; the `poster` image covers that gap.
- A single `webm` source is offered (no mp4 fallback was present at inspection time).

**Layout / crop:**

```css
.hero__media { position: absolute; inset: 0; z-index: 0; }
.hero__media video { width: 100%; height: 100%; object-fit: cover; transform: scale(1.08); will-change: transform; }
.hero__media::after {
  content: "";
  position: absolute; inset: 0;
  background:
    linear-gradient(180deg, rgba(5,9,26,.55) 0%, rgba(5,9,26,.15) 30%, rgba(5,9,26,.72) 78%, var(--navy) 100%),
    linear-gradient(90deg, rgba(5,9,26,.7) 0%, transparent 55%);
}
```

The video is always pre-scaled 1.08× (a small Ken-Burns-style over-crop) so that when it's nudged during scroll (below) there's never a gap at the edges. On top of it sits a two-layer gradient scrim: a vertical dark-to-light-to-dark wash (darkest at the very top and bottom, a lighter band around 15–30% down so the hero headline area is more legible) combined with a horizontal left-to-right fade (dark on the left where the eyebrow/heading text sits, fading to transparent on the right) — this is what makes the white hero text readable over moving footage without a flat overlay.

**Scroll parallax (generic `.parallax`-class handler in `qissa.js`, applied to `.hero__media`):**

```js
window.addEventListener('scroll', function () {
  var vh = window.innerHeight;
  parallaxEls.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return; // skip offscreen elements, cheap perf guard
    var progress = (r.top + r.height / 2 - vh / 2) / vh; // -1..1, 0 = element centered in viewport
    el.style.transform = 'scale(1.08) translateY(' + (progress * -110).toFixed(1) + 'px)';
  });
}, { passive: true });
```

As the hero scrolls up and out of view, `progress` moves from roughly 0 toward -1, so the video translates up to +110px (moving it slightly against the scroll direction — a classic parallax “drift slower than the page” effect) while staying scaled at 1.08× throughout. Confirmed live: at `scrollY ≈ 208px` the video's inline style measured exactly `scale(1.08) translateY(37.5px)`.

**To reproduce:** absolutely-position a muted/looping/autoplay video at 100%×100% `object-fit: cover` with a baseline `scale(1.08)`, layer a two-axis gradient scrim over it for text contrast, and on scroll compute each element's vertical offset-from-viewport-center as a -1..1 `progress` value and apply `translateY(progress * -110px)` alongside the fixed scale.

## 4. Gallery page (/gallery/)

**Page header:** same hero-video treatment as the homepage (dark header image/footage behind cherry-blossom lanterns scene) with a breadcrumb `HOME / GALLERY`, an eyebrow `A VISUAL JOURNEY`, a large serif `Gallery` heading, and a one-line subhead — identical component pattern to every interior page on the site.

**Grid markup and DOM structure:**

```html
<div class="container">
  <div class="masonry">
    <figure class="masonry__item reveal">
      <img class="attachment-large size-large" src="...">
      <figcaption>...</figcaption>
    </figure>
    <!-- repeated per image -->
  </div>
</div>
```

**CSS (exact rules, pulled from the live stylesheet):**

```css
.masonry { columns: 3; column-gap: clamp(12px, 1.6vw, 20px); }
.masonry__item {
  break-inside: avoid;
  margin-bottom: clamp(12px, 1.6vw, 20px);
  position: relative;
  border-radius: var(--radius); /* 14px */
  overflow: hidden;
  border: 1px solid var(--line-soft); /* rgba(246,241,231,.10) */
}
.masonry__item img { width: 100%; display: block; transition: transform 1.2s var(--ease); }
.masonry__item:hover img { transform: scale(1.06); }
.masonry__item::after {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(transparent 60%, rgba(5,9,26,.5));
  opacity: 0;
  transition: opacity .4s;
}
.masonry__item:hover::after { opacity: 1; }
.masonry__item figcaption {
  position: absolute; left: 14px; bottom: 12px; z-index: 2;
  font-size: .76rem; letter-spacing: .08em; color: var(--cream);
  opacity: 0; transform: translateY(6px);
  transition: .4s var(--ease);
  text-shadow: 0 2px 10px rgba(0,0,0,.8);
}
.masonry__item:hover figcaption { opacity: 1; transform: none; }
```

**This is a CSS multi-column masonry** (`columns: 3`), not CSS Grid and not a JS masonry library — each `<figure>` naturally flows into whichever of the 3 columns is shortest, `break-inside: avoid` stops an image splitting across the column break, and images keep their native aspect ratio (no forced crop) which is why row heights are uneven/staggered, matching the screenshot exactly.

**Hover interaction, pixel-accurate:**

1. The image inside the hovered tile scales to `1.06×` over 1.2s with the site's standard ease-out curve (`var(--ease)` = `cubic-bezier(.22,.61,.36,1)`), clipped by the tile's `overflow: hidden` + `14px` border-radius so it zooms without breaking the card shape.
2. A dark gradient scrim (transparent at top, fading to 50%-opacity near-black at the very bottom) fades in over 0.4s, giving the bottom of the image a readable dark zone.
3. A caption label (small, uppercase-tracked, cream-colored, drop-shadowed) slides up 6px and fades in over the same 0.4s, sitting on top of that gradient. All three happen together on `:hover`; nothing else in the grid changes (unlike the Cuisine section below, siblings are not dimmed here).

**Entrance animation:** each `.masonry__item` also carries the site-wide `.reveal` utility — `opacity:0; transform: translateY(34px)`, transitioning to `opacity:1; transform:none` over 1s with the same ease, toggled by adding class `.in` once the tile's `IntersectionObserver` fires (standard “fade up on scroll into view”), so tiles animate in as you scroll down the gallery rather than all appearing at once.

**To reproduce:** `columns:3` masonry container with `break-inside:avoid` figures, `border-radius:14px` + `overflow:hidden` + a 1px translucent border per tile, image `transform` transition for the zoom, an `::after` gradient pseudo-element + `figcaption` both driven by the same `:hover` selector, and an IntersectionObserver-triggered fade-up class for scroll-in.

## 5. The Cuisine section — hover interaction

This is the “Explore the menu, course by course” row of 6 items (Grills & Tandoor, Traditional Curries, Biryani & Rice, Starters & Appetizers, Vegetarian Specials, Drinks). It is NOT a reveal-on-hover effect — every item's image is rendered at all times, above its label, in a flex row of 6 equal columns. What actually happens on hover is a **flex-grow redistribution plus a desaturate/dim** on the non-hovered siblings, which is what gives the illusion of the hovered image “zooming in” while the rest “blur.”

**DOM:**

```html
<div class="region-row">
  <a class="region" href="/menu/#grills">
    <div class="region__img"><img src="..." alt="Curry Fire Prawns"></div>
    <h3>Grills & Tandoor</h3>
    <p>Smoky, charred, straight from the clay oven.</p>
  </a>
  <!-- 5 more .region items -->
</div>
```

**Base CSS:**

```css
.region-row { display: flex; align-items: flex-start; gap: clamp(14px, 1.6vw, 24px); }
.region {
  flex: 1 1 0; /* all 6 equal width by default */
  display: flex; flex-direction: column; align-items: center; text-align: center;
  transition: flex-grow .55s var(--ease), opacity .4s var(--ease), filter .4s var(--ease);
}
.region__img { width: 100%; aspect-ratio: 4/3; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--line-soft); margin-bottom: .8rem; }
.region__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s var(--ease); }
.region h3 { font-size: 1.5rem; font-weight: 360; }
.region p { font-size: .85rem; color: var(--cream-dim); }
```

**Hover rules — this is the entire effect:**

```css
.region-row:hover .region { flex-grow: .95; opacity: .45; filter: grayscale(.9) brightness(.85); }
.region-row:hover .region:hover { flex-grow: 1.6; opacity: 1; filter: none; }
.region:hover .region__img img { transform: scale(1.03); }
```

**Step by step, what the browser actually does when you hover one item:**

1. The moment the pointer enters `.region-row` (any of the 6 items), ALL 6 siblings immediately get `opacity: .45` + `filter: grayscale(.9) brightness(.85)` — this is the “blur” the user perceives; it's actually a near-full desaturation + 15% darkening + 55% fade, not a literal `blur()` filter.
2. The one specific item under the cursor is re-targeted by the second rule (`:hover .region:hover`, higher specificity by hover-chaining) and gets `opacity: 1; filter: none` — full color, fully opaque.
3. Simultaneously, `flex-grow` changes: the hovered item grows to `1.6` while the other five shrink to `.95` each. Since they're all `flex: 1 1 0` (no fixed basis), this redistributes the row's width so the hovered column visibly widens (and its siblings narrow) — animated over `.55s` with the site's standard ease-out. This width change is what reads as “zoom” — the column itself gets bigger, not just the image.
4. On top of that, the image *inside* the hovered tile also scales `1.03×` via its own `transform` (1.2s), a smaller, independent zoom layered on top of the column growth.

All three (dim siblings, grow/shrink flex, image micro-zoom) run together, driven purely by the `.region-row:hover .region` / `.region-row:hover .region:hover` CSS cascade — no JavaScript mouse-tracking involved.

**To reproduce:** lay out N equal `flex:1 1 0` items in a row; on `:hover` of the row, set siblings to `opacity:.45; filter:grayscale(.9) brightness(.85); flex-grow:.95`, and override the specifically-hovered one back to `opacity:1; filter:none; flex-grow:1.6` using a more specific `:hover:hover`-chained selector; transition `flex-grow`, `opacity` and `filter` on the base rule.

## 6. The Signatures — “Dishes with a story to tell.”

**Heading markup:**

```html
<span class="eyebrow reveal">The Signatures</span>
<h2 class="h2 reveal d1">Dishes with <span class="gold-text">a story to tell.</span></h2>
```

- `.eyebrow`: `font-size: .72rem; font-weight:600; letter-spacing:.34em; text-transform:uppercase; color:var(--gold)`, with a `::before` pseudo-element drawing the short 26px gold dash to its left (`content:''; width:26px; height:1px; background:var(--gold)`).
- `.h2`: `font-size: clamp(2rem, 4.6vw, 3.6rem); font-weight:340; letter-spacing:-.015em` — fluid type that scales with viewport width between 32px and 57.6px.
- `.gold-text` is a gradient-filled text clip, not a solid color:

```css
.gold-text {
  background-image: linear-gradient(135deg, #9A7A34 0%, #EFD79A 38%, #C9A24B 62%, #F4E6BC 100%);
  background-clip: text; -webkit-text-fill-color: transparent; color: transparent;
}
```

This is the site's `--gold-grad` token — a diagonal sweep from deep bronze through pale champagne back to mid-gold — reused on every gold-accented headline across the site, not unique to this section.

**Card grid:**

```css
.dishes { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(16px, 2vw, 26px); }
/* each card spans a fraction of the 12 columns, e.g. */
.c-5 { grid-column: span 5; } /* seen on the first "The Legend" card */
```

12-column grid with cards spanning varying widths (`.c-5`, likely `.c-7`, `.c-4` etc. for the others) so cards appear as mixed large/small tiles rather than a uniform grid — matches the 2-large-then-4-smaller layout in the screenshot.

**Card anatomy:**

```html
<a class="dish-card c-5 reveal d1" data-tilt href="/menu/#mains">
  <span class="badge">The Legend</span>
  <div class="dish-card__img"><img src="..." alt="Truck Drivers Lamb Curry"></div>
  <div class="dish-card__body">
    <h3>Truck Drivers Lamb Curry</h3>
    <p>Slow-cooked lamb shank on the bone in a spicy, flavoursome curry.</p>
  </div>
</a>
```

```css
.dish-card {
  position: relative; overflow: hidden; border-radius: var(--radius);
  background: var(--navy-2); border: 1px solid var(--line-soft);
  min-height: 340px; display: flex; flex-direction: column; justify-content: flex-end;
  transform-style: preserve-3d; /* enables real 3D child depth, used by the tilt below */
  transition: transform .4s var(--ease), border-color .5s, box-shadow .6s;
}
.dish-card:hover { border-color: var(--line); box-shadow: 0 30px 70px -30px rgba(0,0,0,.8); }
.dish-card__img { position: absolute; inset: 0; z-index: 0; }
.dish-card__img img { width:100%; height:100%; object-fit:cover; transform: scale(1.02); transition: transform 1.2s var(--ease); }
.dish-card:hover .dish-card__img img { transform: scale(1.09); }
.dish-card__img::after {
  content:''; position:absolute; inset:0;
  background: linear-gradient(rgba(5,9,26,.05) 0%, rgba(5,9,26,.35) 45%, rgba(5,9,26,.92) 100%);
}
.dish-card .badge {
  position:absolute; top:16px; left:16px; z-index:3;
  font-size:.62rem; letter-spacing:.18em; text-transform:uppercase;
  padding:6px 12px; border-radius:100px;
  background:rgba(5,9,26,.6); border:1px solid var(--line); color:var(--gold-hi);
  backdrop-filter: blur(6px);
}
.dish-card__body { position:relative; z-index:2; padding:1.6rem 1.6rem 1.7rem; transform: translateZ(30px); }
.dish-card h3 { font-size:1.42rem; font-weight:360; line-height:1.1; margin-bottom:.5rem; }
.dish-card p { font-size:.85rem; color:var(--cream-dim); margin-bottom:1rem; }
```

So: full-bleed photo as the card background, baseline `scale(1.02)` → `scale(1.09)` zoom on hover (1.2s ease), a bottom-heavy gradient scrim (near-transparent at top, 92% black at the bottom) so the white title/description are always legible regardless of the photo, a small pill `.badge` (“The Legend”, “House Favourite” etc.) floating top-left with its own blur-glass background, and the text body pulled forward in 3D space (`translateZ(30px)`) relative to the image — which matters for the tilt effect below, since it makes the text visibly “float” above the image as the card rotates.

**The 3D tilt (`data-tilt`, mouse-follow, desktop + motion-allowed only):**

```js
if (!isTouch && !reduce) {
  document.querySelectorAll('[data-tilt]').forEach(function (card) {
    var rect;
    card.addEventListener('mouseenter', function () { rect = card.getBoundingClientRect(); });
    card.addEventListener('mousemove', function (e) {
      var px = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5 across card width
      var py = (e.clientY - rect.top) / rect.height - 0.5;  // -0.5..0.5 down card height
      card.style.transform =
        'perspective(900px) rotateY(' + (px * 7).toFixed(2) + 'deg) ' +
        'rotateX(' + (-py * 7).toFixed(2) + 'deg) translateY(-6px)';
    });
    card.addEventListener('mouseleave', function () { card.style.transform = ''; });
  });
}
```

As the cursor moves across a card, it tilts up to ±7° on both axes (rotateY follows horizontal position, rotateX follows vertical — inverted so the top of the card tilts toward the cursor when it's near the top), under a `perspective(900px)` for a convincing depth feel, and lifts 6px (`translateY(-6px)`). It resets instantly (empty string, no transition) on mouse-leave — there is no spring-back animation, it just snaps back the next paint. Disabled entirely on touch devices and when `prefers-reduced-motion: reduce` is set.

**To reproduce:** 12-col CSS grid with cards spanning different column counts; each card is a `position:relative` box with an absolutely-positioned full-bleed image (scale 1.02→1.09 on hover), a bottom gradient scrim, a floating glass-pill badge, and body text at `translateZ(30px)` under `transform-style:preserve-3d`; add a `mousemove` listener per card computing cursor position as a -0.5..0.5 fraction of the card's width/height and mapping it to `rotateY`/`rotateX` (±7°) inside a `perspective(900px)` transform, resetting the inline transform on `mouseleave`.

## Appendix: full design token reference

All of the above is built on one `:root` custom-property system, pulled verbatim from the live stylesheet:

```css
:root {
  --ink: #05091A;
  --navy: #0A1230;
  --navy-2: #0E1838;
  --navy-3: #16224A;
  --navy-line: #1E2C57;
  --gold: #C9A24B;
  --gold-hi: #EFD79A;
  --gold-deep: #9A7A34;
  --amber: #E9A85C;
  --blossom: #E7A6C4;
  --blossom-2: #F2C6D9;
  --cream: #F6F1E7;
  --cream-dim: rgba(246,241,231,.70);
  --cream-faint: rgba(246,241,231,.42);
  --line: rgba(201,162,75,.22);
  --line-soft: rgba(246,241,231,.10);
  --gold-grad: linear-gradient(135deg, #9A7A34 0%, #EFD79A 38%, #C9A24B 62%, #F4E6BC 100%);
  --f-display: 'Cormorant Garamond', 'Times New Roman', serif;
  --f-body: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --gutter: clamp(20px, 5vw, 90px);
  --sec-y: clamp(48px, 7vw, 104px);
  --maxw: 1600px;
  --ease: cubic-bezier(.22,.61,.36,1);      /* snappy ease-out — used almost everywhere */
  --ease-io: cubic-bezier(.65,.05,.36,1);   /* ease-in-out — used for clip-path reveals */
  --radius: 14px;                           /* the one border-radius used on every card/tile */
}
```

**Reading it:** the whole palette is navy/ink darks (`--ink` → `--navy-3`) with a single warm gold family (`--gold`, `--gold-hi`, `--gold-deep`, `--amber`) for accents, plus a soft pink “blossom” pair used sparingly for decorative florals, and `--cream` (not pure white) as the body text color — the same warm off-white used for the starfield dots. Two easing curves cover the entire site: `--ease` for nearly every hover/scroll transition (header, cards, images, the starfield-adjacent reveals), and `--ease-io` specifically for `clip-path` circle-reveal animations (e.g. the full-screen nav menu overlay, not covered in detail above but built the same way: `clip-path: circle(0% at <hamburger position>)` → `circle(150% at <hamburger position>)` over `.8s`).

**Reusable utility classes seen across every section above** (build these once, reuse everywhere):

- `.reveal` / `.reveal.in` — scroll-triggered fade-up (`opacity:0; translateY(34px)` → `opacity:1; none`, 1s, `--ease`), with `.d1`–`.d4` stagger-delay modifiers (`.08s` increments) for sequential reveals of sibling elements. Driven by `IntersectionObserver`, class `.in` added once, never removed (no re-trigger on scroll back up). Disabled under `prefers-reduced-motion`.
- `.reveal-line` — a `clip-path: inset(0 100% 0 0)` → `inset(0)` wipe, for the short gold underline dashes next to section eyebrows.
- `.eyebrow` — the small uppercase gold kicker label pattern used above every section heading (“THE SIGNATURES”, “A VISUAL JOURNEY”, etc.), always paired with a 26px gold dash via `::before`.
- `.gold-text` — the gradient text-clip treatment for the one emphasized phrase inside most H2 headings.

This token + utility system is why the whole site feels cohesive: every section below the hero reuses the same `--ease` curve, the same `14px` radius, the same cream/gold palette, and the same `.reveal` entrance pattern rather than each component inventing its own motion language.
