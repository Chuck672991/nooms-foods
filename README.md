# Restaurant website template

One shared website architecture + one restaurant folder = a fully branded restaurant site.
**Nooms Foods is the first restaurant on the template**; `example-burger-house` is a second,
fictional one (red/white light theme, its own fonts, a booking/ordering platform instead of
phone + maps, a weekly hours table, no Journal) that proves nothing in the shared code is
Nooms-specific. It is also the starter you copy for the next client.

Next.js 16 (App Router) · Tailwind CSS v4 · TypeScript. The visual design follows
`NOOMS_FOODS_DESIGN_BRIEF.md` (a pattern reference built from qissa.co.uk) and the UI behaviour (navbar,
starfield, parallax, gallery, cuisine, signature cards, menu overlay) follows `Qissa Website — UI Reverse-Engineering Spec.md`.

```bash
npm run dev                                          # http://localhost:3000
npm run build && npm start
npm run lint
npm run new-restaurant -- red-door-diner "Red Door Diner"   # scaffold + activate a new restaurant
```

## How it is organised

```
restaurants/                      ← EVERYTHING that differs between restaurants
  types.ts                          the contract: RestaurantConfig (your editor lists what's required)
  helpers.ts                        small authoring helpers (map links, phone/directions actions…)
  active.ts                         the ONE line that selects the restaurant
  nooms/                            Nooms Foods
    brand.ts                          identity · contact · hours · social · actions · THEME · SEO · footer
    images.ts                         every photo/logo with size + alt text
    fonts.ts                          next/font loaders
    home.ts menu.ts story.ts gallery.ts journal.ts contact-page.ts      copy + menu data
  example-burger-house/             the starter (same shape, placeholder content)

public/restaurants/<slug>/        ← that restaurant's assets only (logo/ food/ storefront/ seo/ …)
assets-source/<slug>/             ← original, un-optimised source files (not served)

components/  lib/  app/           ← SHARED: layouts, sections, animations, SEO. No restaurant names,
                                    colours, copy, prices or asset paths. (Audited: see below.)
```

Rule of thumb: **if it changes between restaurants it lives in `restaurants/<slug>` or
`public/restaurants/<slug>`; if it is the same for every restaurant it lives in `components/`,
`lib/` or `app/`.** Only `app/` and `lib/` import the active restaurant; shared components receive
what they render as props.

## What lives where

| Requirement | Where |
| --- | --- |
| Name, tagline, description, services, logo | `brand.ts` → `identity` |
| Phone, email, address, map query, hours (one line **or** weekly schedule) | `brand.ts` → `contact` |
| Instagram / Facebook / TikTok / YouTube / X / WhatsApp | `brand.ts` → `social` |
| What "Order" and "Visit/Reserve" do (call + Maps, or a booking/ordering platform) | `brand.ts` → `actions` |
| Colours, light/dark mode | `brand.ts` → `theme` |
| Fonts | `fonts.ts` (+ `theme.fonts`) |
| SEO titles, descriptions, keywords, OG image, icons | `brand.ts` → `seo` |
| Hero, sections, stats, split CTA, footer copy | `home.ts`, `brand.ts` → `footer` |
| Menu categories + items + prices | `menu.ts` |
| Story, gallery, journal, contact page | `story.ts`, `gallery.ts`, `journal.ts`, `contact-page.ts` |
| Header/nav/footer layout, cards, buttons, animations, responsive behaviour, a11y, sitemap, JSON-LD | shared (`components/`, `app/`, `lib/`) |

Single source of truth: the phone number, address, hours, handles etc. are written **once** in
`brand.ts`; every component, the footer, the overlay, structured data and the sitemap derive from
it (the other config files import those constants rather than repeating them).

## Theme system

Components never name a colour. They use **roles**, set per restaurant in `theme.colors`:

| Role (Tailwind) | Meaning |
| --- | --- |
| `background` `surface` `surface-raised` `foreground` | the page |
| `primary` / `on-primary` | brand fills (buttons, pills, icon circles) and the text on them |
| `accent` | brand colour for **text, icons, rules** (= `primary`, or `primaryOnDeep` on dark photo sections) |
| `primary-soft` | italic heading words and hover fills (`primarySoftOnDeep` on dark sections) |
| `secondary` | used sparingly for a low glow |
| `deep` / `on-deep` | header, menu overlay, footer and the scrims over photos / the light text on them |

`app/layout.tsx` writes the theme to CSS variables on `<html>`; `globals.css` maps them to
Tailwind. Sections laid over photos use the `scope-deep` class, which flips `background`/`foreground`
to `deep`/`on-deep`, so the **same components read correctly on dark and light themes** (set
`theme.mode`). Fonts: each restaurant's `fonts.ts` loads its own faces with the variable names
`--font-display-face` / `--font-body-face`.

## Menu data

Flat and typed (`restaurants/types.ts`):

```ts
categories: [{ id: "burgers", label, heading, tagline, blurb, image, photos: [Img, Img?] }]
items:      [{ id, category: "burgers", name, description?, price?: "$9", tags?: ["V"|"VG"],
               image?, featured?, featuredTag? }]
```

`MenuSection` / `MenuCategoryNav` / the homepage tiles all render from this. Items with
`featured: true` and an `image` become the homepage "featured" grid automatically (or provide
editorial `home.featured.cards`). Add `price` and it appears; omit it and nothing is shown.

## Copy markup

Any `Rich` string supports `*italic accent*`, `[label](/path or https://… or tel:…)`, and `\n`
(a line break on phones only).

## Optional features

Leave a field out and the feature disappears cleanly: `journal` (nav link, routes, sitemap),
`contact.email`, `hours.schedule` (falls back to the one-line `headline`), `identity.motto`,
`home.intro.sticker`, `menu.notice`, `menu.navAction`, extra social platforms.

## Create the next restaurant

```bash
git checkout -b restaurant/red-door-diner            # branch from the template
npm run new-restaurant -- red-door-diner "Red Door Diner"
```

The script copies `restaurants/example-burger-house` and its placeholder assets, renames
everything, and points `restaurants/active.ts` at the new restaurant. Then:

1. `brand.ts`: name, address, phone, hours, social, **actions** (order/reserve), **theme colours**, SEO.
2. `fonts.ts`: pick the typefaces.
3. Replace the images in `public/restaurants/red-door-diner/` and update `images.ts` (sizes + alt text).
4. `home.ts`, `menu.ts`, `story.ts`, `gallery.ts`, `contact-page.ts`: write the real copy and menu.
   Add `journal.ts` and set `journal` in `index.ts` if you want a Journal.
5. Set the domain: `seo.siteUrl` (or `NEXT_PUBLIC_SITE_URL` at deploy time).
6. `npm run lint && npm run build`.

Suggested branches: **`template`** has `active.ts` pointing at `example-burger-house` (delete
`nooms/` there); **`nooms`** and each client branch point at their own folder. Shared fixes are
merged from `template` into the client branches.

`active.ts` is a plain import, not a registry, on purpose: fonts and images are resolved at build
time, so bundling every restaurant would ship every restaurant's fonts to every site.

## Content rules (carried over from the Nooms brief)

Publish only verified facts: no invented menu items, prices, ratings, reviews, hours or delivery
promises. Structured data (JSON-LD) includes only what the config states; it never contains a
rating, geo, price range or hours unless supplied.

## Known limits of the template

- **Layout is fixed**: section order and structure are shared (by design). Restaurants vary by
  data, theme, fonts and which optional features exist, not by rearranging sections.
- **Shared UI strings are English** ("Skip to content", "Explore", "Get directions", the 404 copy,
  nav labels). Per-restaurant translation/RTL is not built.
- **Typographic scale is tuned for a serif display face** (weights and tracking in
  `globals.css`); a very different display font may want tweaks there.
- **Small photos are shown as framed prints** with blurred backdrops (the Nooms originals are
  145–289px). With full-resolution photography the same layouts work, but a full-bleed mode isn't
  offered.
- **No contact-form backend**: the contact page offers the channels in `contactPage.channels`.
- Still Nooms-specific, by nature: `restaurants/nooms/`, `public/restaurants/nooms/`,
  `assets-source/nooms/`, this repo's package name, and the Nooms design brief.
