# Nooms Foods website

Next.js 16 (App Router) + Tailwind CSS v4. Design follows `NOOMS_FOODS_DESIGN_BRIEF.md`
(a pattern reference built from qissa.co.uk), re-skinned in Nooms Foods' own brand.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://your-domain.com`) in production so canonical
URLs, the sitemap and structured data use the real domain.

## Routes

`/` · `/menu` · `/story` · `/gallery` · `/journal` · `/journal/[slug]` · `/contact` · 404 · `sitemap.xml` · `robots.txt`

## Where to edit content

| What | File |
| --- | --- |
| Phone, address, hours, social links, nav | `lib/site.ts` |
| Menu categories and items (add `price` to show prices) | `lib/menu.ts` |
| Journal articles | `lib/journal.ts` |
| Every photo (one registry; swap a file here and every page updates) | `lib/images.ts` |
| Colours, fonts, buttons, motion | `app/globals.css` |

## Brand tokens

Sampled from the brand's own assets: near-black `#0b0b0a`, cream `#faf3e3`, signage yellow
`#ffc91f` (single accent) with pale tint `#ffe48a` for italic heading words, and the logo's
flame orange `#f2661c` (used sparingly). Fonts: Fraunces (display, with italic accent words)
and Figtree (body/labels), both via `next/font`.

## Content rules

Only verified facts are published: no invented menu items, prices, ratings, reviews or hours
tables. The Instagram bio gives "5 PM till midnight"; daily hours vary, so the site says so.

## Assets

`public/images/` holds the web copies (2x resampled). The original files you supplied are kept
untouched in `assets-source/original/`. The supplied photos are small listing thumbnails
(145-289px wide), so layouts show them as framed prints and use blurred versions only as
atmospheric backdrops. Replacing them with full-resolution photography will lift the whole site.

## Not built (needs input)

See the implementation report: contact-form backend, reservation/online-ordering platform,
verified reviews/ratings, menu prices, PDF menus.
