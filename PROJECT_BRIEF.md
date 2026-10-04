# PROJECT BRIEF: read this first

> Handoff document for any future Claude session (or human) with **no chat history**.
> It explains **why this project exists**, **how it is architected**, **what the design language is**,
> and **what is done / open**. Keep it current when the architecture changes.
> Companion docs: `README.md` (operating manual, commands) · `NOOMS_FOODS_DESIGN_BRIEF.md` (original
> Qissa-based visual research, still the visual source of truth) · `restaurants/types.ts` (the config contract).

Last verified: 2026-10-04 (tsc ✓, eslint ✓, `next build` ✓ for both restaurants, functional + visual regression ✓).

---

## 1. Purpose (the business context)

The owner builds **restaurant websites and sells essentially the same site to many restaurant/food owners**.
This repo is therefore **a reusable restaurant-website template**, not a one-off site.

> **One shared architecture + one restaurant folder (config + theme + menu + assets) = a fully branded restaurant site.**

- **Nooms Foods** (a shawarma/burger spot in IBEX, Karachi) is the **first restaurant** on the template.
- **`example-burger-house`** is a fictional second restaurant (red/white **light** theme) that proves nothing
  shared is Nooms-specific. It doubles as the **starter** that new clients are scaffolded from.
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
  helpers.ts                       authoring helpers: mapLinks, phoneAction, directionsAction, pos, contain
  active.ts                        ONE-LINE import selecting the restaurant (not a registry; see §10)
  nooms/                           Nooms Foods
    brand.ts                         identity · contact · hours · social · actions · THEME · SEO · footer
    images.ts  fonts.ts              image library (size+alt) · next/font loaders
    home.ts menu.ts story.ts gallery.ts journal.ts contact-page.ts
    index.ts                         assembles RestaurantConfig
  example-burger-house/            the starter (same shape; no journal; placeholder assets)

public/restaurants/<slug>/       that restaurant's assets only (logo/ food/ storefront/ boards/ seo/ …)
assets-source/<slug>/original/   untouched originals (not served)

app/                             routes + layout + globals.css  (reads the active restaurant)
  layout.tsx page.tsx menu/ story/ gallery/ journal/ journal/[slug]/ contact/ not-found.tsx sitemap.ts robots.ts
components/                      SHARED, prop-driven (see §6)
lib/                             restaurant.ts (resolvers) · seo.ts (metadata/theme/JSON-LD) · utils.ts
scripts/new-restaurant.mjs       scaffold + activate a new restaurant
```

## 4. The config contract (`restaurants/types.ts`)

```ts
RestaurantConfig = {
  identity   // name, slug, tagline, motto?, description, cuisine[], services[], priceNote?, logo{mark, badge?}
  contact    // phone{display,e164,note?}, email?, address{area,lines,street,short,city,country,countryCode,plusCode?,mapQuery}, hours
  social     // [{platform: instagram|facebook|tiktok|youtube|x|whatsapp, href, handle?}]
  theme      // {mode:"dark"|"light", colors: ThemeColors, fonts:{display,body,displayVariation?,articleVariation?}}
  actions    // {order: Action, visit: Action}  ← the two conversion actions (call+Maps  OR  ordering/booking platforms)
  seo        // siteUrl?, defaultTitle, titleTemplate, description, keywords?, locale, ogImage, icons{favicon,icon,apple}, pages{…}
  footer     // {headline: Rich, blurb}
  home       // hero, intro, dishes, ribbon, cuisine, kitchen, featured, stats, place, follow, split
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
- **Optional ⇒ graceful**: `journal`, `contact.email`, `hours.schedule`, `identity.motto`, `home.intro.sticker`,
  `home.featured.cards` (falls back to menu items with `featured:true`+`image`), `menu.notice/navAction`, extra socials.

### Menu data (flat, typed)
```ts
categories: [{ id, label, heading, tagline, blurb, image /*home tile*/, photos: [Img, Img?] /*menu-page prints*/ }]
items:      [{ id, category /*category.id*/, name, description?, price?: "$9", tags?: ["V"|"VG"], image?, featured?, featuredTag? }]
```
`MenuSection`, `MenuCategoryNav`, `CuisineGrid` tiles and `FeaturedItems` all render from this. `price` omitted ⇒ nothing shown.

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
| `secondary` | used sparingly (one low glow in the "kitchen" section) |
| `deep` · `on-deep` | header, menu overlay, footer, scrims over photos · the light text/frames on them |

- **`.scope-deep`** (on header, overlay, footer, Hero, PageHero, CTABanner, KitchenMoment, FollowBand, NotFound) remaps
  `--background/--foreground/--surface/--accent/--accent-soft` to the `deep`/`on-deep` pair, so **the same components read
  correctly on dark and light themes**. Inside it, components still just use `text-foreground`, `border-foreground/15`, etc.
- `theme.mode` sets `data-theme` + `colorScheme`; `--hero-fade` (where scrims fade to) is the page bg on dark themes, `deep` on light.
- `:root` in globals.css holds **neutral fallback** values only (never brand colours).
- **Fonts**: each restaurant's `fonts.ts` calls `next/font/google` (must be literal, module-scope) with variable names
  **`--font-display-face`** / **`--font-body-face`**; `theme.fonts.displayVariation` → `--display-variation`
  (Nooms: Fraunces `"SOFT" 100, "WONK" 0`); `articleVariation` → article headings/quotes.
- Shared CSS classes (in `globals.css`): `.display` `.h-hero/.h-page/.h-section/.h-card` `.accent-italic` `.eyebrow` `.lead`
  `.btn(.btn-primary/.btn-outline/.btn-sm)` `.dots` `.scrim-hero/.scrim-band/.scrim-side` `.glow-primary/.glow-secondary`
  `.ribbon-gradient` `.zoom-img` `.marquee` `.reveal` `.hero-rise` `.nav-overlay` `.prose-article` `.scope-deep`.

**Nooms palette** (sampled from the brand's own assets): background `#0b0b0a`, surface `#131210`, surface-raised `#1c1a16`,
foreground `#faf3e3`, primary (sign yellow) `#ffc91f`, primary-soft `#ffe48a`, on-primary `#171100`, secondary (logo flame) `#f2661c`,
deep `#050505`, on-deep `#faf3e3`. Fonts: **Fraunces** (display, italics) + **Figtree** (body).
**Example palette** (light): bg `#fff`, primary `#c8102e`, primaryOnDeep `#ff5468`, primarySoft `#a50d26`, primarySoftOnDeep `#ff8c9a`,
deep `#1a0a0c`; fonts Playfair Display + Inter.

## 6. Component architecture

Data flow: `restaurants/<slug>` → `restaurants/active.ts` → **`app/**` pages** (read config, resolve buttons) → **prop-driven components**.

| Layer | Components |
|---|---|
| **layout/** | `Header` (client: sticky 3-zone bar, full-screen numbered nav overlay, focus trap, ESC, scroll lock; props: name, logo, links, order, visit, locationLine) · `Footer` (takes `restaurant` + links) |
| **ui/** primitives | `PillButton` `ActionButtons` `Eyebrow` `SectionHeading` `RichText` `Icons`/`Icon` `Reveal` `CountUp` `Marquee` `KeywordRibbon` `Backdrop` `PhotoCard` `PageHero` `Breadcrumb` `CTABanner` `ImageTextSection` `HoursBlock` |
| **home/** sections | `Hero` `BrandIntro` `DishMarquee` `KeywordRibbon` `CuisineGrid` `KitchenMoment` `FeaturedItems` `StatBand` `TheRoom` `FollowBand` `SplitConversion` |
| **menu/** | `MenuCategoryNav` (client: sticky pills + IntersectionObserver scroll-spy) · `MenuSection` |
| others | `story/StoryMedia` · `gallery/GalleryGrid` · `journal/ArticleCard` · `contact/ContactInfoCard`, `MapEmbed` |

`lib/restaurant.ts`: `navLinks` (Journal only if `journal`), `resolveButtons`, `ctaProps`, `featuredCards`, `socialLabel`, `siteUrl`
(env `NEXT_PUBLIC_SITE_URL` → `seo.siteUrl` → Vercel → localhost). `lib/seo.ts`: `rootMetadata`, `rootViewport`, `pageMetadata`,
`themeStyle`, `restaurantJsonLd`. `lib/utils.ts`: `container` (`max-w-page` 1600px, gutters 5/8/14), `sectionY`, `heroDelay`.

**Pages**: `/` · `/menu` · `/story` · `/gallery` · `/journal` · `/journal/[slug]` · `/contact` · 404 · `sitemap.xml` · `robots.txt`.
**Home section order**: Hero → BrandIntro → DishMarquee → KeywordRibbon → CuisineGrid → KitchenMoment → FeaturedItems → StatBand → TheRoom
→ FollowBand → SplitConversion → Footer. Every interior page = PageHero → content → CTABanner → Footer.

## 7. Design language (adapted from qissa.co.uk; see `NOOMS_FOODS_DESIGN_BRIEF.md`)

- **Editorial, single-accent** dark-first design: near-black canvas, one brand accent for CTAs/labels/rules/numerals, light display
  serif with **one italic accent word per heading** (`*word*`), uppercase tracked **eyebrow** labels flanked by thin rules.
- **Type scale** (classes): `.h-hero` clamp(3.4rem,12.5vw,9rem) · `.h-page` clamp(3rem,8.5vw,6.5rem) · `.h-section` clamp(2.2rem,5vw,4rem) ·
  `.h-card`. Eyebrow/buttons: 0.7–0.78rem, 700, tracking 0.15–0.18em, uppercase. Pills are fully rounded; cards `--radius-card` 14px; container 1600px.
- **Header**: sticky, 3 zones (MENU ☰ · logo · Order + Visit pills), transparent at top → blurred `deep` bar after 24px scroll. Pills stay visible on mobile (compact, no external icon <640px).
- **Motion** (transform/opacity only, `prefers-reduced-motion` respected everywhere, `@media (scripting: none)` fallback shows content):
  scroll reveals (0.85s `cubic-bezier(.22,.7,.2,1)`, IntersectionObserver, staggered), hero entrance (`.hero-rise`), CSS-only marquees (60s dish loop,
  pause on hover), stat count-up (~2s ease-out, final value server-rendered), nav overlay (0.3s fade + 55ms staggered link rise), button hover/press.
- **Menu page**: sticky pill bar with scroll-spy + smooth scroll (`scroll-mt-44`), per-category prints + heading/rule/italic tagline + 1- or 2-column items.
- **Gallery**: 2/3-column CSS-columns masonry, captions always visible, **no lightbox** (matches reference).
- **Photo treatment (important, resolution-driven)**: Nooms' supplied photos are tiny (145–289px). Layouts therefore use **`PhotoCard`** (tilted
  light-framed prints at near-native size) and **`Backdrop`** (blurred, scaled, saturated photo + `scrim-*` overlays) instead of full-bleed sharp photos.
  If a restaurant has high-res photography the same layouts work; a true full-bleed mode is not implemented.
- **Adaptations from Qissa** (deliberate): Google-reviews band → `FollowBand` (social); stats use only verified facts; "Private Dining" dropped (unconfirmed);
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
- `ImageTextSection`, `Marquee`, etc. expect items to carry their own end-spacing (margin), not `gap`, so marquee loops are seamless.

## 11. Tooling & gotchas

- **Next 16.3.8 / React 19 / Tailwind v4 (CSS-first, `@theme`) / TypeScript / ESLint 9 (`npm run lint` = `eslint`).** Read `node_modules/next/dist/docs/` before using APIs.
  Differences hit so far: `next/image` **`priority` is deprecated → `preload`**; non-default image `quality` must be allow-listed (`images.qualities: [60,75,90]` in `next.config.ts`);
  route `params` are **Promises**; `PageProps<"/x/[slug]">` / `LayoutProps<"/">` are global helpers; `inert` is a supported prop; Turbopack is default.
- `next.config.ts` pins `turbopack.root` to this folder (a stray `package-lock.json` in the parent dir confuses root detection).
- `next/font/google` needs network at build time; loader options must be literals at module scope.
- **Two `next dev` servers can't share one project directory** (second refuses to start). Use separate copies/ports or run sequentially.
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
5. **Prove genericity**: point `active.ts` at `example-burger-house`, confirm zero Nooms strings/assets/colours in rendered HTML and that optional features (journal) disappear cleanly.

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
- Shared UI strings are English ("Skip to content", "Explore", "Get directions", 404 copy); no i18n/RTL.
- Display-font weights/tracking in `globals.css` are tuned for a serif; a very different face may need tuning.
- No contact-form backend; no review carousel (component intentionally not built until real reviews exist; `FollowBand` holds the slot).
- Light theme verified with one palette only (the example); example mobile layout checked by overflow tests, not full visual review.
- `package.json` name is still `nooms-foods`. Rename when the template branch is cut.
- Nothing is committed (the project folder is untracked inside a larger git repo); the owner decides branching.
