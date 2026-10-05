# PROJECT BRIEF: read this first

> Handoff document for any future Claude session (or human) with **no chat history**.
> It explains **why this project exists**, **how it is architected**, **what the design language is**,
> and **what is done / open**. Keep it current when the architecture changes.
> Companion docs: `README.md` (operating manual, commands) · `NOOMS_FOODS_DESIGN_BRIEF.md` (original
> Qissa-based visual research; may be deleted on branches that don't need it) · **`Qissa Website — UI Reverse-Engineering Spec.md` (source of truth for UI
> BEHAVIOUR: navbar, starfield, hero parallax, gallery, cuisine, signature cards, overlay, reveal; exact numbers)** ·
> **`JummaGujjar_DesignBrief.md` (the Jumma Gujjar rebrand brief) + `restaurants/jumma-gujjar/assets-manifest.md`** ·
> `restaurants/types.ts` (the config contract).

Last verified: 2026-10-05 on branch `jumma-gujjar` (tsc ✓, eslint ✓, `next build` ✓ for Jumma Gujjar **and** the example restaurant, 47-check functional/responsive suite ✓,
43-check promo-reels suite ✓, mobile Lighthouse: performance 88–93 / accessibility 100 / best-practices 100 / SEO 100; software-rendered frame profile: steady 60 fps through every section, see §15).
Earlier: 45-check UI-behaviour suite ✓; Nooms text/links/alts identical to the pre-refactor site.

---

## 1. Purpose (the business context)

The owner builds **restaurant websites and sells essentially the same site to many restaurant/food owners**.
This repo is therefore **a reusable restaurant-website template**, not a one-off site.

> **One shared architecture + one restaurant folder (config + theme + menu + assets) = a fully branded restaurant site.**

- **Nooms Foods** (a shawarma/burger spot in IBEX, Karachi) is the **first restaurant** on the template.
- **Jumma Gujjar Nihari** (a Karachi nihari house, Liaquatabad; Urdu + English; WhatsApp-first ordering; promo reels) is the **second live restaurant**
  and is **the active one on the `jumma-gujjar` branch**. `restaurants/nooms/` is still in the tree (unused on this branch; delete it if the branch should ship alone).
- **`example-burger-house`** is a fictional restaurant (red/white **light** theme) that proves nothing
  shared is restaurant-specific. It doubles as the **starter** that new clients are scaffolded from.
- Delivery model: **one git branch (and deployment) per restaurant**, branched from a template branch.
  Not a SaaS: no admin dashboard, auth, CMS, database or multi-tenancy. Don't add those unprompted.

Original request that created the site: recreate the design language of **qissa.co.uk** (editorial fine-dining
restaurant site) for Nooms Foods, adapted to Nooms' brand. Then refactor it into this template **without
changing how Nooms looks**.

## 2. Golden rules

1. **If it differs between restaurants, it lives in `restaurants/<slug>/` or `public/restaurants/<slug>/`.
   If it's the same for all, it lives in `components/`, `lib/` or `app/`.**
2. **Shared code must never contain** a restaurant name, brand colour, copy, price, phone/address, or asset path.
   (Audited with grep; keep it that way.) Components say "primary colour", never "yellow".
3. **Components are prop-driven.** Only `app/**` and `lib/**` import the active restaurant
   (`@/restaurants/active`); everything below receives data as props.
4. **Single source of truth per fact.** Phone/address/hours/handles are written once in `restaurants/<slug>/brand.ts`;
   other config files import those constants. Don't duplicate.
5. **Never fabricate** menu items, prices, reviews, ratings, hours tables, delivery promises or integrations.
   Only owner-supplied or officially-verified facts. Missing data → omit the field (the UI degrades cleanly).
6. **Preserve the look.** Architecture changes must not alter how an existing restaurant renders. Verify (see §12).
7. **Next.js 16 is not the Next you know**: read `node_modules/next/dist/docs/` before using an API (see §11).

## 3. Repo map

```
restaurants/                     EVERYTHING restaurant-specific
  types.ts                         the contract: RestaurantConfig (+ Img, Theme, Action, MenuItem, …)
  helpers.ts                       authoring helpers: mapLinks, phoneAction, whatsappAction, directionsAction, pos, contain
  active.ts                        ONE-LINE import selecting the restaurant (not a registry; see §10)
  nooms/                           Nooms Foods
    brand.ts                         identity · contact · hours · social · actions · THEME · SEO · footer
    images.ts  fonts.ts              image library (size+alt) · next/font loaders
    home.ts menu.ts story.ts gallery.ts journal.ts contact-page.ts
    index.ts                         assembles RestaurantConfig
  jumma-gujjar/                    Jumma Gujjar Nihari (same files + fonts/ (subset Urdu face) + assets-manifest.md; no journal)
  example-burger-house/            the starter (same shape; no journal; placeholder assets)

public/restaurants/<slug>/       that restaurant's assets only (logo/ food/ storefront/ boards/ seo/ …)
assets-source/<slug>/original/   untouched originals (not served)

app/                             routes + layout + globals.css  (reads the active restaurant)
  layout.tsx page.tsx menu/ story/ gallery/ journal/ journal/[slug]/ contact/ not-found.tsx sitemap.ts robots.ts
components/                      SHARED, prop-driven (see §6)
lib/                             restaurant.ts (resolvers) · seo.ts (metadata/theme/JSON-LD) · utils.ts
scripts/new-restaurant.mjs       scaffold + activate a new restaurant
scripts/subset-font.py           subset a font to the characters a restaurant's config uses (used for the Urdu face)
```

## 4. The config contract (`restaurants/types.ts`)

```ts
RestaurantConfig = {
  identity   // name, slug, tagline, motto?, description, cuisine[], services[], priceNote?, logo{mark, badge?}
  contact    // phone{display,e164,note?}, email?, address{area,lines,street,short,city,country,countryCode,plusCode?,mapQuery}, hours
  social     // [{platform: instagram|facebook|tiktok|youtube|x|whatsapp, href, handle?}]
  theme      // {mode, ambient?: "stars"|"embers"|"none", colors: ThemeColors, fonts:{display,body,urdu?,label?,displayVariation?,articleVariation?}}
  actions    // {order: Action, visit: Action, primary?: "order"|"visit"}  ← the two conversion actions (call+Maps OR WhatsApp OR platforms); `primary` = the solid header pill
  identity   // …also nameUrdu? (Nastaliq name shown above the hero title and in the footer)
  seo        // siteUrl?, defaultTitle, titleTemplate, description, keywords?, locale, ogImage, icons{favicon,icon,apple}, pages{…}
  footer     // {headline: Rich, blurb}
  home       // hero(+chip?), intro, dishes, ribbon, cuisine, kitchen(+beats?), featured, stats, place, follow, split, reels?  ← reels = optional promo-video showcase
  menu       // hero, notice?, navAction?, categories[], items[], cta
  story      // hero, sections[] (media: circle|duo|print), ribbon[], cta
  gallery    // hero, items[], followSuffix, cta
  contactPage// hero, channels{eyebrow,title,lead,items[]}
  journal?   // OPTIONAL: hero, articles[], moreHeading, cta, articleCta  (omit ⇒ nav link, routes, sitemap vanish)
}
```

- **`Img`** = `{src,width,height,alt, position?, fit?: "cover"|"contain"}`: crop focus and logo-contain live **on the
  image**, not in components. Use `pos(img,"50% 30%")` / `contain(img)` per usage.
- **`Rich`** strings: `*accent*` → italic accent word · `[label](/path|https://…|tel:…)` → link (http opens new tab with sr-only note) · `\n` → line break on phones only.
- **`Hours`**: `headline`, `short`, `note?`, optional `schedule[]` (weekly table; machine fields feed JSON-LD `openingHoursSpecification`).
- **Buttons**: configs reference `"order" | "visit" | "menu"` or a custom `Action`; `resolveButtons()` turns them into
  labelled, styled buttons (first = primary, rest = outline; per-button `variant`/`label` overrides).
- **Optional ⇒ graceful**: `journal`, `home.reels`, `contact.email`, `hours.schedule`, `identity.motto/nameUrdu`, `home.intro.sticker`, `home.hero.chip`, `home.kitchen.beats`,
  `home.featured.cards` (falls back to menu items with `featured:true`+`image`), `menu.notice/navAction`, `theme.ambient/fonts.urdu/fonts.label`, extra socials.
- **Urdu**: `identity.nameUrdu`, `MenuCategory.labelUrdu`, `MenuItem.nameUrdu`, `FeaturedCard.titleUrdu`, rendered by `<Urdu>` (`lang="ur" dir="rtl"`, `.urdu` class, line-height 2.1).
  A category with **no `image`/`photos`** renders a typographic plate (`CategoryGlyph`: its Urdu/English name set large) instead of a photo: use that rather than stock imagery.

### Menu data (flat, typed)
```ts
categories: [{ id, label, labelUrdu?, heading, tagline, blurb, image? /*home tile*/, photos?: [Img, Img?] /*menu-page prints*/, homeTile?: false /*menu page only, no homepage tile*/ }]
items:      [{ id, category /*category.id*/, name, nameUrdu?, description?, price?: "Rs 850", badge?: "Signature", tags?: ["V"|"VG"], image?, featured?, featuredTag? }]
```
`MenuSection`, `MenuCategoryNav`, `CuisineGrid` tiles and `FeaturedItems` all render from this. `price` omitted ⇒ nothing shown; a price with a leading integer ("Rs 1,200", "from Rs 750") counts up
when it scrolls into view (`PriceTag`). `badge` is a small red pill: only for claims the owner confirmed.

### Promo reels (`home.reels`, optional)
```ts
reels: { eyebrow, title, lead, marquee?: string[], soundHint?, items: ReelItem[], youtube?: { id, eyebrow, title, blurb?, credit } }
ReelItem = { id, kicker, title, caption?, video: { src, type?, poster: Img }, duration?, credit?: { label, href? } }
```
Portrait (9:16) clips. **Always credit footage that isn't the restaurant's own.** Omit `home.reels` and the section disappears (the example restaurant has none).

## 5. Theme architecture

Components never name a colour; they use **semantic roles**. Per restaurant: `theme.colors` →
`lib/seo.ts#themeStyle()` writes CSS custom properties on `<html style>` → `app/globals.css` maps them to Tailwind v4 colours
(`@theme inline`) → utilities like `bg-primary`, `text-foreground`, `bg-surface`.

| Role (Tailwind class) | Meaning |
|---|---|
| `background` `surface` `surface-raised` `foreground` | the page, alternate sections/cards, image placeholders, body text |
| `primary` · `on-primary` | brand **fills** (buttons, pills, icon circles) and the text on them |
| **`accent`** | brand colour for **text, icons, rules, eyebrows**. = `primary`, or `primaryOnDeep` on dark photo sections |
| `primary-soft` | italic heading words, hover fills. = `primarySoft`, or `primarySoftOnDeep` on dark sections |
| `secondary` | used sparingly: one low glow in the "kitchen" section, the reels backdrop, and the red menu **badge** fills (cream text on it must clear 4.5:1) |
| `deep` · `on-deep` | header, menu overlay, footer, scrims over photos · the light text/frames on them |

- **`.scope-deep`** (on header, overlay, footer, Hero, PageHero, CTABanner, KitchenMoment, FollowBand, NotFound) remaps
  `--background/--foreground/--surface/--accent/--accent-soft` to the `deep`/`on-deep` pair, so **the same components read
  correctly on dark and light themes**. Inside it, components still just use `text-foreground`, `border-foreground/15`, etc.
- `theme.mode` sets `data-theme` + `colorScheme`; `--hero-fade` (where scrims fade to) is the page bg on dark themes, `deep` on light.
- `:root` in globals.css holds **neutral fallback** values only (never brand colours).
- **Fonts**: each restaurant's `fonts.ts` calls `next/font/google` (or `next/font/local`; must be literal, module-scope) with variable names
  **`--font-display-face`** / **`--font-body-face`**, plus optional **`--font-urdu-face`** (`theme.fonts.urdu`, used by `.urdu`) and **`--font-label-face`** (`theme.fonts.label`).
  `theme.fonts.displayVariation` → `--display-variation` (Nooms: Fraunces `"SOFT" 100, "WONK" 0`); `articleVariation` → article headings/quotes.
  **Label voice**: `.eyebrow`, `.btn` and every `.uppercase` element (except `.display`) use `--font-label` (falls back to the body face, so themes without one are unchanged) with
  `font-synthesis-weight: none` so single-weight faces such as Bebas Neue are never faux-bolded.
- **Ambient layer** (`theme.ambient`, default `"stars"` on dark / `"none"` on light): `StarField` (twinkling stars) or `Embers` (slow rising sparks: fire/ghee/smoke brands). Both are one fixed z-0 canvas.
- Shared CSS classes (in `globals.css`): `.display` `.h-hero/.h-page/.h-section/.h-card` `.accent-italic` `.eyebrow` `.lead`
  `.btn(.btn-primary/.btn-outline/.btn-sm)` `.scrim-hero/.scrim-band/.scrim-side` `.glow-primary/.glow-secondary`
  `.ribbon-gradient` `.zoom-img` `.marquee` `.reveal` `.hero-rise` `.nav-overlay` `.prose-article` `.scope-deep`
  · behaviour classes from the UI spec: `.site-header(.scrolled)` `.brand-logo` `.starfield` `.section-tint` `.region-row/.region/.region__img`
  `.masonry/.masonry__cell/.masonry__item` `.dish-card/.dish-card__img/.dish-card__badge/.dish-card__body`
  · rebrand layer: `.urdu/.urdu-hero` `.embers(--local)` `.glyph-plate` `.footer-mark` `.reels-bg` `.outline-word` `.reel-*` `.ring-text/.ring-spin` `.yt-*`.
- **Easing tokens**: `--ease` = `cubic-bezier(.22,.61,.36,1)` (snappy ease-out, almost everything) and `--ease-io` = `cubic-bezier(.65,.05,.36,1)`
  (clip-path reveals: menu overlay, eyebrow dash). `--accent-grad` is the gradient used by accent words, derived from the theme tokens.

**Nooms palette** (sampled from the brand's own assets): background `#0b0b0a`, surface `#131210`, surface-raised `#1c1a16`,
foreground `#faf3e3`, primary (sign yellow) `#ffc91f`, primary-soft `#ffe48a`, on-primary `#171100`, secondary (logo flame) `#f2661c`,
deep `#050505`, on-deep `#faf3e3`. Fonts: **Fraunces** (display, italics) + **Figtree** (body).
**Example palette** (light): bg `#fff`, primary `#c8102e`, primaryOnDeep `#ff5468`, primarySoft `#a50d26`, primarySoftOnDeep `#ff8c9a`,
deep `#1a0a0c`; fonts Playfair Display + Inter.
**Jumma Gujjar palette** (dark ember; the gold and red are **sampled from the supplied logo**, the brief's proposed values were placeholders): background `#14100e`, surface `#1e1815`, surface-raised `#2a211c`,
foreground (cream) `#fff3dc`, primary (logo yellow) `#ffca08`, primary-soft `#ffe270`, on-primary `#14100e`, secondary (logo red, deepened from `#ea1a23` for cream-text contrast) `#d61a21`, deep `#0b0807`, on-deep `#fff3dc`.
Fonts: **Fraunces** (display, weight axis only) + **DM Sans** (body) + **Bebas Neue** (labels) + **Noto Nastaliq Urdu** 500 (Urdu; a local **subset** file). `ambient: "embers"`.

## 6. Component architecture

Data flow: `restaurants/<slug>` → `restaurants/active.ts` → **`app/**` pages** (read config, resolve buttons) → **prop-driven components**.

| Layer | Components |
|---|---|
| **layout/** | `Header` (client: sticky 3-zone bar, full-screen numbered nav overlay, focus trap, ESC, scroll lock; props: name, logo, links, order, visit, locationLine) · `Footer` (takes `restaurant` + links) |
| **ui/** primitives | `PillButton` `ActionButtons` `Eyebrow` `SectionHeading` `RichText` `Icons`/`Icon` `Reveal` `CountUp` `Marquee` `KeywordRibbon` `Backdrop` `PhotoCard` `PageHero` `Breadcrumb` `CTABanner` `ImageTextSection` `HoursBlock` |
| **ui/** behaviour (client) | `StarField` (fixed twinkling canvas) · `Embers` (rising-sparks canvas: global, or `contained` with `ember-burst` events) · `Parallax` (hero media drift) · `HeroVideo` (optional footage) · `TiltCard` (3D mouse-follow tilt) · `Reveal` · `CountUp` · `ReelStage` (3D coverflow video player) · `YouTubeFacade` (click-to-load embed) |
| **ui/** rebrand layer | `Urdu` (lang/dir/font) · `CategoryGlyph` (typographic plate) · `PriceTag` (price count-in) · `RingText` (SVG text on a circle) · `canvas-color` (`toRgb` helper for canvases) |
| **home/** sections | `Hero` `BrandIntro` `DishMarquee` `KeywordRibbon` `CuisineGrid` (flex-grow hover row) `KitchenMoment` `FeaturedItems` (12-col dish cards + tilt) **`PromoReels`** (optional) `StatBand` `TheRoom` `FollowBand` `SplitConversion` |
| **menu/** | `MenuCategoryNav` (client: sticky pills + IntersectionObserver scroll-spy) · `MenuSection` |
| others | `story/StoryMedia` · `gallery/GalleryGrid` (masonry hover) · `journal/ArticleCard` · `contact/ContactInfoCard`, `MapEmbed` |

`Header` also takes `primary` (which pill is solid). `lib/restaurant.ts`: `navLinks` (Journal only if `journal`), `resolveButtons`, `ctaProps`, `featuredCards`, `socialLabel`, `siteUrl`
(env `NEXT_PUBLIC_SITE_URL` → `seo.siteUrl` → Vercel → localhost). `lib/seo.ts`: `rootMetadata`, `rootViewport`, `pageMetadata`,
`themeStyle`, `restaurantJsonLd`. `lib/utils.ts`: `container` (`max-w-page` 1600px, gutters 5/8/14), `sectionY`, `heroDelay`.

**Pages**: `/` · `/menu` · `/story` · `/gallery` · `/journal` · `/journal/[slug]` · `/contact` · 404 · `sitemap.xml` · `robots.txt`.
**Home section order**: Hero → BrandIntro → DishMarquee → KeywordRibbon → CuisineGrid → KitchenMoment → FeaturedItems → **PromoReels (if `home.reels`)** → StatBand → TheRoom
→ FollowBand → SplitConversion → Footer. Every interior page = PageHero → content → CTABanner → Footer.

## 7. Design language (adapted from qissa.co.uk; see `NOOMS_FOODS_DESIGN_BRIEF.md`)

- **Editorial, single-accent** dark-first design: near-black canvas, one brand accent for CTAs/labels/rules/numerals, light display
  serif with **one italic accent word per heading** (`*word*`), uppercase tracked **eyebrow** labels flanked by thin rules.
- **Type scale** (classes): `.h-hero` clamp(3.4rem,12.5vw,9rem) · `.h-page` clamp(3rem,8.5vw,6.5rem) · `.h-section` clamp(2.2rem,5vw,4rem) ·
  `.h-card`. Eyebrow/buttons: 0.7–0.78rem, 700, tracking 0.15–0.18em, uppercase. Pills are fully rounded; cards `--radius-card` 14px; container 1600px.
- **Header (spec §2)**: fixed, 3 zones (MENU ☰ · logo · Order + Visit pills). One class, `.scrolled`, toggled past **60px** (no re-render); height = logo + padding so
  transitioning padding and logo size together condenses it **136px → 91px, logo 92px → 66px** (phones 77px → 61px) over **0.5s `--ease`**, while the bar gains
  `deep` at 72% + `blur(16px) saturate(1.2)` + a hairline (light themes use 92% opacity). Pills stay visible on phones (compact, no external icon <640px).
  Sticky/anchor offsets that depend on it: `MenuCategoryNav` `top-[57px] md:top-[91px]`, `scroll-padding-top: 6rem`, `MenuSection scroll-mt-44`, `PageHero pt-40`.
- **Full-screen menu (spec appendix)**: `clip-path: circle(0% → 150% at <hamburger centre>)` over **0.8s `--ease-io`** (origin written to `--cx/--cy` on open),
  collapses the same way; links rise in with a 60ms stagger after it starts.
- **Starfield (spec §1)**: one fixed full-viewport `<canvas class="starfield">` (z-0, pointer-events none), ≤180 stars (viewport area ÷ 9000), ~18% soft-accent stars with an 8px glow,
  each pulsing 40–100%, mouse parallax by depth + slow scroll drift. Colours come from the theme (`--foreground`, `--primary-soft`). `main` is `relative z-[1]`; opaque alternate
  sections use `.section-tint` (surface at 82%) so stars show through. **Only rendered when `theme.mode === "dark"`**; skipped under reduced motion; rebuilt only on width change.
- **Hero media (spec §3)**: scale **1.08** + scroll **parallax** (`translateY(progress × -110px)`, progress −1…1, skipped offscreen) on hero/PageHero backdrops, a two-layer scrim
  (vertical dark→light→dark + left→right fade, `.scrim-hero`), and **optional muted/looping/autoplay `<video>`** via `hero.video` / `PageHeroContent.video` (poster = backdrop image;
  Nooms has no footage, so it still uses the blurred photo).
- **Gallery (spec §4)**: CSS multi-column masonry (2 cols phone, 3 from lg; gap `clamp(12px,1.6vw,20px)`), 14px radius + hairline border; hover/focus-within: image zoom **1.06 over 1.2s**,
  bottom scrim fades in (0.4s), caption (hidden at rest) slides up 6px + fades in; touch screens always show captions. No lightbox.
- **Cuisine (spec §5)**: from lg a flex row of equal columns; hovering the row dims every tile (`opacity .45; grayscale(.9) brightness(.85); flex-grow .95`) and the hovered/keyboard-focused one
  returns to colour and grows (`flex-grow 1.6`, `.55s`), image micro-zoom 1.03. Image height is fixed from the row width (container-query units, `--n` tiles) so the row never jumps. Below lg: plain grid.
- **Signatures (spec §6)**: 12-column grid, first two cards large (5+7), the rest in even spans of up to four per row; full-bleed photo cards (`min-height 340px`, bottom scrim, hover zoom 1.02→1.09 over 1.2s,
  border + shadow on hover), glass badge pill, body at `translateZ(30px)`, and **`TiltCard`** (±7° rotateY/rotateX, `perspective(900px)`, 6px lift; off on touch and reduced motion). Cards link to `/menu#<category>`
  when built from menu items; editorial cards link only if `href` is set.
- **Type & reveal (spec §6/appendix)**: eyebrow `.72rem / 600 / .34em` with a 26px dash that wipes in (clip-path, `--ease-io`); H2 `clamp(2rem,4.6vw,3.6rem)`; accent words are **gradient text**
  (`--accent-grad`); `.reveal` = 34px rise, 1s, `--ease`, siblings staggered in 0.08s steps capped at 4 (`stagger()` in `lib/utils.ts`).
- **Promo reels (`PromoReels` → `ReelStage`)**: portrait clips on a **3D coverflow**. Each card carries `--o` (offset from the active card) and `--d`; CSS derives translate/rotateY (±30°)/scale/opacity from them.
  The centre reel autoplays **muted, inline** while the stage is on screen and ends → next (story-style progress segments); the others sit on their poster (`preload="none"`; posters are requested only
  when the stage is within a screen of view). Click a side card, swipe/drag, arrow keys, Home/End, prev/next or segments change reel; each change fires an `ember-burst` the section's `Embers` canvas
  answers with sparks. Cards "deal" out from a stack on first sight (`data-dealt` fresh → done); the scene tilts up into place with scroll (`--sp`); the active card has a spinning conic glow halo,
  a mouse-follow tilt (flattened while over a button, otherwise controls slide away) + specular glare. **Sound is opt-in**: the spinning-text ring button unmutes (a user gesture); a fullscreen button
  expands the frame. Focus is kept alive across changes (only the active card renders controls). Cards are deliberately **not `preserve-3d` inside**: the tilting frame would slice through its own halo.
  Giant outlined words drift behind on two CSS marquees. Reduced motion: no autoplay/deal-in/tilt/spin; play is one tap away. Under it, an optional **click-to-load YouTube** facade (youtube-nocookie, nothing loads until clicked).
- **Other motion** (transform/opacity only, `prefers-reduced-motion` respected everywhere, `@media (scripting: none)` fallback shows content): hero entrance (`.hero-rise`), CSS-only marquees
  (60s dish loop, pause on hover), stat count-up (~2s ease-out, final value server-rendered), button hover/press.
- **Menu page**: sticky pill bar with scroll-spy + smooth scroll, per-category prints + heading/rule/italic tagline + 1- or 2-column items.
- **Photo treatment (important, resolution-driven)**: Nooms' supplied photos are tiny (145–289px). Layouts therefore use **`PhotoCard`** (tilted
  light-framed prints at near-native size) and **`Backdrop`** (blurred, scaled, saturated photo + `scrim-*` overlays) instead of full-bleed sharp photos.
  If a restaurant has high-res photography the same layouts work; a true full-bleed mode is not implemented.
- **Adaptations from Qissa** (deliberate; colours, copy and data are never changed by behaviour work): Google-reviews band → `FollowBand` (social); stats use only verified facts; "Private Dining" dropped (unconfirmed);
  no PDF menus; no contact form (no backend) → `contactPage.channels`; Reserve/Order → config `actions`.

## 8. Nooms Foods: facts, content rules, assets

- **Business**: Nooms Foods · IBEX, Karachi · `V353+PFW, Shahrah-e-Faisal, P.E.C.H.S. Block 2, Block A, SMCHS, Karachi` · phone **0304 3542289**
  (`+923043542289`) · IG `@nooomsfood` (`instagram.com/nooomsfood`) · FB `facebook.com/noomshawarmahouse` (Messenger `m.me/noomshawarmahouse`).
- **Hours**: only "Evenings, 5 PM till midnight" (from the official Instagram bio); **daily hours vary, so no weekly table** and no `openingHoursSpecification`.
- **Services**: dine in · takeaway · home delivery. **Price**: "typically under PKR 1,000 per person" (indicative, owner-supplied).
- **Taglines**: "Our taste is all it takes" (on the sign) · "Shawarma on fire" (on the FB logo). **Two logos**: Facebook badge (orange spit + flames, 720px) and Instagram
  avatar / current sign (black + yellow "eyes" mark, 100px). Header mark = the IG avatar; footer/sticker = the FB badge.
- **Verified menu only**: Shawarma · Beef Burger · Mega Zinger · Doppler Burger (spelling to confirm) · Loaded Fries · Pasta · Deals 1–8 (board is unreadable → **no prices**).
- **Content rules**: no invented dishes/prices/ratings/reviews/hours/delivery zones; JSON-LD contains no rating/geo/priceRange/hours; unknown ⇒ omit.
- **Assets**: `public/restaurants/nooms/{logo,storefront,food,boards,seo}`; 8 tiny photos (2× resampled copies; originals in `assets-source/nooms/original`). Instagram post images need
  a login and were **not** scraped. Photo→dish pairings were matched by eye; owner should confirm.
- **Open gaps (need owner input)**: full-resolution food photos · vector logo · menu items + prices · real reviews/Google rating · reservation/ordering platform (if any) ·
  contact email / form destination · whether private dining exists · real domain (`seo.siteUrl` / `NEXT_PUBLIC_SITE_URL`) · the meaning/origin of the name (Story page jokes around it).
  The two Journal articles are written from verified facts only; **owner should approve the copy**.

## 9. Example restaurant & scaffold

- `restaurants/example-burger-house/`: fictional (555-01xx phone, `example.com`); light red/white theme, Playfair+Inter, ordering+booking platform actions, weekly hours table,
  email, TikTok, items with prices/tags, **featured grid derived from menu items**, **no journal**. Placeholder images are generated, labelled "PLACEHOLDER". **Never ship its content.**
- `npm run new-restaurant -- <slug> "<Name>"` copies it + its assets, renames slug/exports/paths/name, and **rewrites `restaurants/active.ts`** to point at the copy.
- Suggested branches: `template` (active → example, no `nooms/`), `nooms` and each client branch (active → own folder); merge shared fixes from `template`.

## 10. Key decisions and why (so you don't undo them)

- **`active.ts` is a plain one-line import, not a registry/env switch.** A registry imported every restaurant's `next/font` loaders and shipped the example's fonts
  to Nooms (6 font preloads vs 3). Fonts/images resolve at build time, so only the active restaurant may be imported.
- **`accent` token separate from `primary`.** Fills use `primary`; text/icons/rules use `accent` so light themes can brighten them on dark photo sections.
- **`scope-deep` instead of per-component dark/light variants** to keep components theme-agnostic.
- **Per-image `position`/`fit`** live on `Img`, and are overridden per usage with `pos()`/`contain()`; layouts stay generic.
- **`.prose-article` uses `articleVariation`** (Fraunces' automatic "wonky" forms are kept for article headings/quotes) so the Nooms refactor stayed pixel-identical.
- Photo-print caption ink uses `deep` (was a yellow-theme token); the only intentional visual delta of the refactor (`#171100`→`#050505`, imperceptible). Hero scroll cue anchor is `#intro`.
- **Behaviour follows the Qissa UI spec; colours/copy/data stay the restaurant's.** Spec colours (navy/gold) are mapped to theme tokens; font weights stay the display font's (not Cormorant's 340);
  our photos are tiny, so the full-bleed signature cards are inherently soft (the hover/tilt effects are what the spec asks for).
- **Starfield is dark-theme only** (cream dots on white would read as dust); the old static `.dots` texture was removed.
- **Header height is derived** (logo + padding), not fixed, so the shrink animates with two transitions exactly as in the spec.
- **Jumma Gujjar rebrand decisions**: colours **sampled from the logo**, not the brief's placeholders; `ambient: "embers"` instead of stars; **no stock photos**, categories without a photo become typographic
  plates; the brief's "Fan favourite" badge left off (no verified ranking); lassi has no price; no founding year, no "own dairy farm" claim; hours show "Message or call for today's timings" (the Foodpanda hours
  belong to a Korangi address). WhatsApp is the primary action (`actions.primary: "order"`). Stills for gallery/hero prints are cropped from the owner's own clips **above** TikTok's watermark band; the third-party clip is
  credited and left uncropped.
- **Fonts kept lean for performance** (Lighthouse mobile ≥85 was a brief requirement): Fraunces loads the weight axis only (79 KB vs 263 KB with SOFT/WONK/opsz), Noto Nastaliq Urdu is a **61 KB subset**
  (`scripts/subset-font.py`; 160 KB for the full Arabic block) and stays preloaded (un-preloading it made first paint *later*). Backdrops request small images (`sizes` ~55vw) because they are always blurred.
  Lighthouse's simulated LCP tracks bytes requested on first load, so trim bytes before micro-tuning.
- **Footer watermark is a pseudo-element** (`.footer-mark::before { content: attr(data-mark) }`) so the decorative text isn't scanned by contrast audits or read by screen readers.
- `ImageTextSection`, `Marquee`, etc. expect items to carry their own end-spacing (margin), not `gap`, so marquee loops are seamless.

## 11. Tooling & gotchas

- **Next 16.3.8 / React 19 / Tailwind v4 (CSS-first, `@theme`) / TypeScript / ESLint 9 (`npm run lint` = `eslint`).** Read `node_modules/next/dist/docs/` before using APIs.
  Differences hit so far: `next/image` **`priority` is deprecated → `preload`**; non-default image `quality` must be allow-listed (`images.qualities: [60,75,90]` in `next.config.ts`);
  route `params` are **Promises**; `PageProps<"/x/[slug]">` / `LayoutProps<"/">` are global helpers; `inert` is a supported prop; Turbopack is default.
- `next.config.ts` pins `turbopack.root` to this folder (a stray `package-lock.json` in the parent dir confuses root detection).
- `next/font/google` needs network at build time; loader options must be literals at module scope.
- **Two `next dev` servers can't share one project directory** (second refuses to start). Use separate copies/ports or run sequentially. The owner often has `next dev` running on :3000 already:
  check `lsof -nP -iTCP:3000 -sTCP:LISTEN` and **reuse it** (HMR picks edits up) rather than killing it. Next 16 writes dev output to `.next/dev`, so `next build` / `next start` on another port is safe alongside it.
  To build a *different* restaurant without touching `active.ts` (which would hot-swap the owner's dev site), copy the repo (`rsync` excluding node_modules/.next, `cp -Rc node_modules`) and edit `active.ts` in the copy.
- `next/font/local` works for a bundled subset file (path relative to `fonts.ts`); `next/font/google` can't take a `text=` subset.
- zsh doesn't word-split unquoted variables and globs unquoted `--include=*.ts`: quote patterns in shell loops/greps.
- Client components with effects: avoid synchronous `setState` in effects (React-compiler lint). Header derives "overlay open" from `pathname` so navigation closes it without an effect.
- `CountUp` and `Reveal` mutate the DOM directly (no React state) so scroll/animation never re-renders.
- Don't hand-edit the managed block in `AGENTS.md` (re-added by `next dev`); `CLAUDE.md` just imports it plus this brief.

## 12. How to verify changes (what "done" means)

1. `npx tsc --noEmit` · `npm run lint` · `npm run build`: all clean (build the active restaurant; scaffold/point `active.ts` at the example to build that too).
2. Shared-layer audit (expect no hits): restaurant words, hex/rgb brand colours, brand Tailwind classes, and components importing restaurant data (only `types`/`helpers` allowed).
3. **Visual + text regression** for any refactor: run the old and new sites side by side (separate copies/ports), capture full-page screenshots with
   `prefers-reduced-motion` emulated at 1440 and 390px, compare `innerText`, link/alt lists and pixels. Last result: identical text/links/alts, identical heights, ≤0.02% pixels.
   (Tooling used: `puppeteer-core` driving local Google Chrome; keep such scripts out of the repo or under `scripts/`.)
4. **Functional**: nav overlay opens/ESC closes/focus returns/Tab trap; header actions match config; menu pills scroll-spy; count-up; reduced-motion; all internal links 200;
   one `<h1>` per page; every `<img>` has `alt`; external links `target=_blank rel=noopener`; no horizontal overflow at 360/390/768/1024/1920; no console errors.
5. **UI behaviour**: measure each spec'd behaviour in headless Chrome (header 136→91px and logo 92→66px at the 60px threshold, 0.5s/`--ease`; star canvas fixed z-0 with animating pixels;
   parallax = formula; reveal 34px/1s; eyebrow/H2 metrics; cuisine flex-grow/opacity/filter + no row jump + image widens; 12-col card widths; tilt transform ≤±7°; gallery hover; overlay circle
   0%→150% from the hamburger; reduced-motion and touch fallbacks). Last result: 45/45.
6. **Prove genericity**: build `example-burger-house` (in a copy, see §11), confirm zero Nooms/Jumma strings/assets/colours in rendered HTML, no reels section, no ambient canvas, and that optional features disappear cleanly.
7. **Reels** (Jumma): deal-in, `--o` offsets, only the active reel plays, muted by default, side-click/arrow/Home/segment/swipe navigation, sound + pause + fullscreen controls, `ember-burst`, tilt vars,
   clip-end hand-over, YouTube facade → nocookie iframe, reduced motion (no autoplay), mobile touch swipe and no overflow. Last result: 43/43.
8. **Lighthouse (mobile, production build via `next start`)**: `npx lighthouse@12 <url> --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo`.
   Last result: home 85–88, inner pages 89–93 perf; 100/100/100 elsewhere. Run 2–3 times (±3 points of noise).

## 13. Common tasks

- **Change Nooms copy/menu/colours** → edit `restaurants/nooms/*` only.
- **Add a menu item** → append to `menu.items` (`category` = a `categories[].id`); add `price`/`tags`/`image`/`featured` as needed.
- **Add a new section/field** → add to `types.ts`, implement a prop-driven component in `components/`, render it from the relevant `app/**` page, add data to **both** `nooms/` and `example-burger-house/`
  (the example is the proof it stays generic), re-run §12.
- **Add a social platform** → extend `SocialPlatform`/`IconName`/`PLATFORM_NAMES` and `Icons.tsx`.
- **New restaurant** → `npm run new-restaurant …`, then follow `README.md` ("Create the next restaurant").
- **Swap in real photos** → replace files under `public/restaurants/<slug>/…` and update sizes/alt in `images.ts`.

## 14. Known limits / backlog

- Section order/structure is fixed by design; restaurants vary by data, theme, fonts and optional features.
- Shared UI strings are English ("Skip to content", "Explore", "Get directions", "Watch with sound", 404 copy). **Urdu names/labels are supported inline, but there is no full-site Urdu/RTL mode** (the brief lists it as an optional later switch).
- Reel videos have no captions track (the clips are mixed speech/music); sound is opt-in and the visuals carry the content.
- Display-font weights/tracking in `globals.css` are tuned for a serif; a very different face may need tuning.
- No contact-form backend; no review carousel (component intentionally not built until real reviews exist; `FollowBand` holds the slot).
- Light theme verified with one palette only (the example); example mobile layout checked by overflow tests, not full visual review.
- `package.json` name is still `nooms-foods`. Rename when the template branch is cut.
- Branching: `jumma-gujjar` was cut before the Qissa behaviour work landed on `main`, so `main` was merged in (`git merge --no-commit`, **left uncommitted for the owner**). The Jumma work itself is also uncommitted.
- Jumma open items live in `restaurants/jumma-gujjar/assets-manifest.md` (more photos, a clean tarka clip, permission for the third-party TikTok clip, whether the tin pack is real, the TikTok handle, and the brief's `[CONFIRM]` list).

## 15. Performance rules (learned the hard way; keep them)

The reels section once dropped a mid-range laptop to single-digit fps. JavaScript was never the problem (script time was ~0.15 s over a whole session);
**paint and composite cost** was. The fixes, and the rules they imply for any new section:

- **Canvas decoration must be cheap.** `Embers` uses pre-rendered sprites + `drawImage` (no per-spark gradients, `shadowBlur` or template strings), 1× pixel density, a 30 fps cap,
  and **no `mix-blend-mode`**. It samples the page's own frame rate: if the page struggles it halves its sparks, then switches itself off (after a 2.5 s warm-up so load jank can't trigger it).
  A `contained` canvas must cover only the area that needs it, never a 2000px-tall section.
- **No `backdrop-filter` over anything that animates or plays video** (it re-blurs every frame): reel controls, the sound ring, the YouTube play button, `.btn-outline` and the dish badges now use
  solid translucent fills. The scrolled header uses a single `blur(10px)`.
- **No big `filter: blur()` on animated layers, no filters on `<video>`.** The reel halo is soft radial gradients on a square that only rotates (compositor-only), each radius smaller than its
  distance to the square's edge (otherwise the edge shows as the square turns). Side reels are dimmed by an overlay's opacity, not `filter: brightness`.
- **Pointer-driven effects write once per frame.** `ReelStage` and `TiltCard` record the pointer and apply ONE `transform` inside `requestAnimationFrame`; scroll-linked effects write a transform
  directly (not a CSS custom property, which restyles the whole subtree) and only while near the viewport.
- **Don't render what isn't seen.** `.cv-section` / `.cv-ribbon` / `.reels` use `content-visibility: auto` + `contain-intrinsic-size: auto …`, so off-screen home sections (and their marquees,
  halos and counters) cost nothing until near the viewport. Posters/video load lazily (`preload="none"`, posters armed only within a screen of the stage).
- **Measure, don't guess.** Harness used (kept out of the repo, trivial to recreate with `puppeteer-core`): launch Chrome with `--disable-gpu` (software rendering is a harsh proxy for a weak
  integrated GPU), optionally `Emulation.setCPUThrottlingRate`, sample `requestAnimationFrame` deltas while scrolling through each section and hovering/tilting, and report fps / p95 / % frames over 33 ms.
  Before: reels ≈ 4 fps, hero ≈ 10 fps, cuisine hover ≈ 36 fps. After: 60 fps everywhere, also at 4× CPU throttle and at 2× pixel ratio. Re-run it after adding any animated section.
