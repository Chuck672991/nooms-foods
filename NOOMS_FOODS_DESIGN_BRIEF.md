# Nooms Foods — Design Brief
### Recreating the Qissa design language for a Next.js rebuild

**Prepared:** October 2026
**Reference site:** https://www.qissa.co.uk/
**Target:** Nooms Foods (Next.js project — `public/` assets not yet reviewed, see §2 and §22)
**Status:** Research and specification only. No implementation performed.

---

## 1. Project overview and design objective

Nooms Foods needs a new marketing website built in Next.js. Rather than design from a blank page, the brief is to **recreate the design language of Qissa** (a Sevenoaks, Kent Indian restaurant site) — its page architecture, section sequencing, layout composition, component patterns, typography system, motion character, and navigation/conversion flow — and **re-skin it entirely in Nooms Foods' own brand**: its colors, logo, photography, menu, copy and business facts.

This is explicitly **not** a generic "premium restaurant website" brief. Every layout claim in this document comes from direct inspection of the live Qissa site (screenshots, extracted computed CSS, and live interaction) on 2026-10-03. Anything not directly observable is labeled as an **estimate** or a **recommendation**, never stated as fact.

**Confirmed brand/content divergence from Qissa:** Qissa is a fine-dining Indian restaurant ("navy velvet, warm brass light and marble," "beneath the blossoms"). Nooms Foods' confirmed service model (per the project owner) is **a sit-down restaurant with casual, playful decor** — guests are seated and served, but the room and brand tone should read livelier and less formal than Qissa's white-tablecloth register. The storefront photos supplied (see §6) show bold amber/yellow-on-black signage with a cartoon-style illustrated mark — consistent with a casual, high-energy brand. Implication for this brief: **keep Qissa's structural pattern** (hero → story intro → dish showcase → menu teaser → stats → "the room" → reviews → private-dining/group CTA → dual reserve/order split → footer) but **rewrite the tone and visual treatment** of every section that currently leans on fine-dining language ("occasion," "velvet," "marble," "beneath the blossoms") so it fits a casual, playful identity. Section-by-section notes below flag exactly where this applies.

---

## 2. Research methodology and inspection limitations

**Method:** Live inspection via the Claude-in-Chrome browser extension — full page navigation, `get_page_text` content extraction, full-page and scroll-sequence screenshots at desktop (≈894–1084px viewport) and mobile (390–400px viewport) widths, `read_page` interactive-element audits, and `javascript_exec` calls against `getComputedStyle()` to pull real color, font, spacing and border-radius values directly from the rendered DOM. Every color and type value in §5 and §7 was extracted this way, not estimated from screenshots.

**What was inspected:** all six pages named in the brief (Home, Menu, Story, Gallery, Journal, Contact/Visit), one full Journal article (the only two articles that exist were both discovered; one was opened in full), the mobile and desktop full-screen navigation overlay, and both third-party conversion destinations (ResOS booking, GonnaOrder takeaway) that the site links out to.

**Limitations and honesty notes:**
- The site is **WordPress**, not Next.js/React (`body` class includes `wp-theme-qissa`, `wp-singular`; no `#__next` or `__NEXT_DATA__` found). Nothing here is reusable code — it is a pattern reference only, and every interaction must be re-implemented natively in React/Next.js.
- No global animation library (GSAP, Lenis, AOS) was detected on `window`, so the scroll-reveal, marquee, and count-up behaviors described in §10 are almost certainly custom or CSS-driven. Their *visible* behavior was captured directly (by screenshotting the same element mid-animation at different scroll moments); their exact easing curves and durations could **not** be extracted and are marked as estimates.
- The animated stat counters ("4.8★ / 410 reviews / 100+ dishes / ∞ stories") were caught mid-animation twice, showing different intermediate values (e.g. "2.5★ / 216 / 53+" and later "3.3★ / 279 / 68+") before settling at the real figures printed in the page's static text ("4.8 / 410 / 100+ / ∞"). This confirms a scroll-triggered count-up/odometer animation rather than live or randomized data.
- The Reviews section content is pulled from Google (visible as "GOOGLE REVIEW" attribution on each card) — this is a live third-party data source, not static copy. Nooms Foods' own review content must come from its own verified Google Business listing; none should be invented.
- **Nooms Foods' Next.js project could not be inspected.** This session has no linked computer and no project files were uploaded at the time of writing (only two photographs of the physical storefront were supplied mid-session — see §6). §18 (asset inventory) and large parts of §6 (color mapping) and §20 (technical guidance) are therefore **provisional** and explicitly marked as blocked pending real project access. Nothing in this document invents a filename, a font name, a hex value as fact, or a piece of business content that wasn't actually observed.
- No page returned an error or was inaccessible; the full inventory in §3 was reachable in full.

---

## 3. Reference website page inventory

| # | Page | URL | Status |
|---|------|-----|--------|
| 1 | Homepage | https://www.qissa.co.uk/ | Inspected in full |
| 2 | Menu | https://www.qissa.co.uk/menu/ | Inspected in full (all 10 category sections) |
| 3 | Our Story | https://www.qissa.co.uk/story/ | Inspected in full |
| 4 | Gallery | https://www.qissa.co.uk/gallery/ | Inspected in full |
| 5 | Journal (listing) | https://www.qissa.co.uk/journal/ | Inspected in full — only 2 articles exist |
| 6 | Journal article — "The road that taught us how to cook lamb" | https://www.qissa.co.uk/truck-drivers-lamb-curry/ | Inspected in full (used as the article template reference) |
| 7 | Journal article — "There's a tree in the middle of our restaurant" | https://www.qissa.co.uk/theres-a-tree-in-the-middle-of-our-restaurant/ | Linked from the listing; not separately opened (template confirmed via article #6, same CMS structure expected) |
| 8 | Visit & Contact | https://www.qissa.co.uk/contact/ | Inspected in full |
| 9 | Reservations (external) | https://qissa-1698715758.resos.com/booking | Inspected — third-party **ResOS** booking widget, opens in a new tab |
| 10 | Takeaway ordering (external) | https://qissa-takeaway.gonnaorder.com/ | Inspected — third-party **GonnaOrder** ordering platform, opens in a new tab |

No other pages were discovered through navigation, footer links, or on-page content. Main nav (desktop and mobile, identical): Home, Our Story, The Menu, Gallery, Private Dining, Journal, Visit & Contact. "Private Dining" is **not a separate page** — it's an in-page anchor/enquiry section on the homepage (see §11, section 12).

---

## 4. Overall visual direction

Qissa's visual language is **editorial fine-dining**: a near-black navy canvas, warm brass/gold accents, a light serif display face set at low font-weight with tight tracking for an elegant, slightly theatrical tone, generous full-bleed photography, and small ornamental details (scattered star-dots, diamond "✦" glyphs, thin gold rule lines) that read as considered rather than decorative filler. Motion is restrained and purposeful: slow auto-scrolling marquees, scroll-triggered count-ups, and a full-screen numbered navigation overlay that behaves like a table of contents.

**What to preserve for Nooms Foods:** the *structural* discipline — full-bleed hero → brand-story intro → visual dish showcase → menu preview → trust signals (stats/reviews) → the physical space → conversion split → rich footer; the eyebrow-label + serif-heading + body-copy rhythm; the pill-shaped buttons and rounded-corner photography; the full-screen nav overlay pattern; the restrained, purposeful motion.

**What must change for Nooms Foods:** the entire color temperature and tone of voice. Where Qissa uses hushed, reverent language ("an occasion," "navy velvet," "let the story begin…"), Nooms Foods' confirmed casual-but-seated identity (plus the bold amber/black playful signage seen in the storefront photos) calls for punchier, warmer, more energetic copy and a brighter, higher-contrast palette — see §6. The underlying grid, spacing and component shapes can carry over almost directly; the mood cannot.

---

## 5. Reference color analysis

All values below were extracted with `getComputedStyle()` against the live site (not estimated from screenshots), sampled across the homepage, menu, story and contact pages.

| Role | Hex | Where observed |
|---|---|---|
| Primary dark background (body/page) | `#0a1230` | `<body>` background; most section backgrounds |
| Secondary dark background (alternate sections) | `#0e1838` | Alternating section backgrounds (slightly lighter navy) |
| Deepest background (footer, darkest bands) | `#05091a` | Footer and a few full-bleed overlay sections |
| Light surface (rare — used sparingly) | `#faf9f5` / `#f6f1e7` | `#f6f1e7` is the dominant warm-cream **text** color on dark backgrounds and occasionally a light card background; `#faf9f5` appears as a near-white surface in isolated light-themed elements |
| Primary accent — brass/gold | `#c9a24b` | CTA button fills, marquee ribbon background, eyebrow label text, divider lines, stat numbers, decorative icons |
| Secondary accent — pale gold/champagne | `#efd79a` | Lighter gold used in hover/secondary states and some heading accent words |
| Dark text on gold buttons | `#241a06` | Button label color when the button fill is gold/light |
| Near-black text/UI | `#141413` / `#000000` | Occasional pure-black UI elements (outline button fills appear near-black with cream text) |
| Pure white | `#ffffff` | Minimal use — a handful of icon/text elements |

**Color roles and structure:**
- **Dark sections dominate** — nearly the entire site runs on 2–3 near-black navy tones, with the lightest neutral (`#f6f1e7` cream) doing double duty as both body text color and the occasional light background.
- **Gold is the single accent** — no secondary brand hue exists; gold (`#c9a24b`) and its paler tint (`#efd79a`) carry every accent, CTA, label, divider and decorative role. This single-accent discipline is a major reason the site feels cohesive.
- **Image overlays:** full-bleed photo sections (hero, "From Our Kitchen", "The Room", Story page hero) use a dark navy gradient/scrim over the photograph — darkest at the edges and bottom, letting photo detail show through the center, so white/cream text stays legible without a flat color block.
- **Borders/dividers** are low-contrast thin gold or translucent cream lines (e.g. the short `—` rule before every eyebrow label), never heavy or high-contrast.
- **Buttons** come in two visual types sampled directly: a filled gold pill (dark `#241a06` text) for primary actions ("Reserve a Table", "Send Message", "Enquire Now") and a dark/outline pill (cream `#f6f1e7` text, near-transparent or near-black fill) for secondary actions ("Order", "View Menu" in some contexts). Both share identical shape and type treatment — only fill/text color flips.

---

## 6. Nooms Foods brand color mapping — **provisional, pending `public/` asset review**

**This section is explicitly incomplete.** Phase 2.2 and Phase 5 of the brief call for deriving Nooms Foods' palette from the actual logo files, photography and theme config inside the project's `public/` directory and Tailwind/CSS config. That directory has not been reviewed — this session has no linked computer and no project files were attached. **Do not treat anything below as a final palette.** It is a reasoned starting point from the two storefront photographs supplied mid-session, clearly labeled as photographic observation, not extracted asset data.

**What the storefront photos show:**
- Signage background: near-black / charcoal (estimate: `#0D0D0D`–`#1A1A1A` range)
- Wordmark "NOOMS FOODS": bold, rounded, all-caps sans-serif lettering in a saturated amber/gold-yellow (estimate: `#F2A900`–`#FFC233` range — reads brighter and more saturated than Qissa's muted antique-brass `#c9a24b`)
- A playful illustrated mark (stylized eyes/face motif) between the two words, same amber-yellow tone, outlined — signals a mascot-driven, friendly brand personality distinct from Qissa's ornamental sunburst logo
- A secondary sign visible in the window is pink/red-toned — possibly a secondary/accent brand color, but this is a single low-confidence observation from one photo and must be confirmed against real brand assets
- Interior: exposed stainless-steel counter/equipment, warm tungsten-toned string lighting — suggests a warm, lived-in, casual-kitchen atmosphere rather than Qissa's "marble and brass" refinement

**Recommended adaptation logic (to validate once assets are available):**

| Qissa role | Qissa value | Nooms Foods direction (provisional) |
|---|---|---|
| Primary dark background | Navy `#0a1230` | Near-black / charcoal, consistent with the physical signage — exact value TBD from brand assets |
| Primary accent (CTAs, labels, dividers) | Muted brass gold `#c9a24b` | Saturated amber/gold-yellow matching the wordmark — brighter and more energetic than Qissa's gold, TBD exact hex |
| Secondary accent | Pale gold `#efd79a` | A lighter tint of the Nooms yellow, or the pink/red noted above if confirmed as a real secondary brand color |
| Light text/cream | `#f6f1e7` | Likely workable as-is or close to it for legibility on dark backgrounds — but should be re-sampled from any existing packaging/print assets once available |
| Button text-on-accent | `#241a06` (dark brown) | A near-black (matching the charcoal background) for contrast on the brighter Nooms yellow |

**Action required before implementation:** attach the project (`public/` directory + any `tailwind.config`, `globals.css`/theme tokens, or design-tokens file) via chat upload or a repo link so Phase 2.2/5/6/18 can be completed with real values. See §22 for the full blocked-items list.

---

## 7. Typography system

**Reference fonts (extracted via `document.fonts` and computed styles):**

| Role | Font | Weights observed | Notes |
|---|---|---|---|
| Display / headings (h1–h3) | **Cormorant Garamond** | 300–700, incl. italic | Serif, editorial, set at unusually **light** weight (330–360) even at huge sizes — never bold. Italic is used selectively mid-heading for a single accent word/phrase (e.g. "A word that means *a tale.*", "Made by hand, *over fire.*") |
| Body copy, navigation, labels, buttons | **Manrope** | 300–700 | Sans-serif, geometric/humanist, used for everything that isn't a heading |

**Scale and treatment (desktop, extracted values):**

| Element | Font | Size | Weight | Letter-spacing | Line-height | Transform |
|---|---|---|---|---|---|---|
| H1 (hero) | Cormorant Garamond | ~97.6px | 330 | −1.95px | ~0.98em | none |
| H2 (section heading) | Cormorant Garamond | ~49.9px | 340 | −0.75px | ~1.04em | none |
| H3 (sub-heading) | Cormorant Garamond | 24px | 360 | −0.24px | ~1.04em | none |
| Body paragraph | Manrope | ~13–16px (varies by context) | 600 (sampled) | normal | relaxed (~1.5–1.6em visually) | none |
| Eyebrow / label (e.g. "— A TALE OF FOOD —") | Manrope | ~13px | 600–700 | wide, ~2.1px | 1em | **UPPERCASE** |
| Button label | Manrope | ~13–13.4px | 600 | ~1.6–2.2px | 1em | **UPPERCASE** |

**Other typographic patterns observed:**
- Headings consistently pair a light-weight serif with one italic accent word/phrase in the paler gold tint — this is the site's single strongest signature typographic move and is worth preserving structurally.
- Eyebrow labels are always preceded by a short horizontal dash rule ("— LABEL —" or "LABEL ——"), uppercase, gold-colored, wide-tracked.
- Menu item names use the same serif as headings at a small size; prices and dietary tags (V/VG) use the sans body font, right-aligned opposite the item name.
- Numeric stats ("4.8", "410", "100+") are set large in the serif display face, not the sans — numbers are treated as display typography, not data.
- Mobile hero type scales down substantially but keeps the same weight/tracking relationship; no observed shift in font pairing between breakpoints.

**For Nooms Foods:** the project's actual font files/configuration were not reviewed (see §6/§22). Do not assume Cormorant Garamond or Manrope are licensed or installed in the Next.js project. The brief should instruct the implementing agent to (a) check `public/fonts/` and the project's font config (`next/font` usage, `@font-face` declarations) for whatever display/body pairing Nooms Foods already has, and (b) only fall back to a substitute serif+sans pairing with similar character (light-weight editorial serif + clean geometric sans) if nothing exists, flagging that choice for sign-off rather than silently picking one.

---

## 8. Layout, spacing, and responsive rules

| Token | Value | Source |
|---|---|---|
| Max content width (container) | **1600px** | `getComputedStyle` on repeated container `div`s across the homepage |
| Border radius — pill buttons | **100px** (fully rounded) | All primary/secondary CTA buttons |
| Border radius — circular elements | **50%** | Social icons, small avatar-style elements |
| Border radius — photography / cards | **12–14px** | Dish photos, gallery images, info cards, signature-dish cards |
| Section vertical rhythm | Large, generous — each major homepage section reads as a full viewport-height-or-more "chapter" when scrolling | Observed via scroll-sequence screenshots |
| Grid — category tiles (homepage "The Cuisine") | 6 columns desktop | Screenshot at ~1084px viewport showed 6 equal tiles in one row |
| Grid — signature dishes | 2 columns × 3 rows desktop | Screenshot confirmed |
| Grid — gallery | 2-column masonry, variable aspect ratios (portrait, landscape, near-square) | Confirmed via scroll sequence; not a uniform square grid |
| Grid — menu items | 2 columns desktop (name/price/description per row) | Confirmed on every category section |
| Grid — journal article cards | 2 columns desktop | Confirmed (only 2 articles exist, so a 2-up grid reads as one row) |

**Responsive behavior observed directly (390–400px mobile viewport vs. ~894–1084px desktop):**
- Header collapses from a 3-zone layout (hamburger-left / logo-center / Order+Reserve-right) to the same 3-zone layout at smaller scale — **no hamburger-only simplification**; Order and Reserve pill buttons remain visible in the header at all tested widths down to 390px, just smaller.
- The full-screen nav overlay is **identical in structure** between mobile and desktop — same numbered list (00–06), same bottom CTA pair — confirming it's one shared component, not two.
- Hero imagery crops differently on mobile (a tighter, more vertical crop of the storefront/interior) rather than simply scaling the desktop image down.
- Menu category pills wrap to two rows on desktop (observed) and were not tested for horizontal-scroll behavior on mobile in this pass — **recommend** (not verified) implementing them as a horizontally scrollable pill row on narrow viewports, which is the standard pattern for this component type.
- Multi-column grids (signature dishes, category tiles, gallery, journal cards) collapse to a single column on mobile — confirmed for the hero/menu/overlay patterns directly; grid collapse behavior for the dish/gallery/journal grids specifically was not screenshotted at mobile width in this pass and should be verified again before implementation, or implemented per standard single-column mobile convention and checked in QA.

**Breakpoints:** no explicit CSS breakpoint values could be extracted (WordPress/Elementor-style themes typically hardcode breakpoints in compiled CSS rather than exposing them). **Recommendation for Nooms Foods (not observed, a standard default):** mobile `<640px`, tablet `640–1024px`, desktop `≥1024px`, matching common Tailwind/Next.js convention — confirm against whatever breakpoint system the existing Next.js project already uses rather than introducing a new one.

---

## 9. Reusable component library

For each component: purpose, structure, visual treatment, and whether it should be shared site-wide or is page-specific.

| Component | Purpose | Structure & treatment | Shared? |
|---|---|---|---|
| **Header / nav bar** | Primary navigation, persistent brand presence | Sticky, 3-zone: hamburger+"MENU" text (left) · centered logo (center) · Order (outline pill) + Reserve (gold pill) (right). Stays visible on scroll (confirmed sticky via scroll-sequence screenshots — header remained fixed at top through the entire homepage scroll) | Shared, every page |
| **Full-screen nav overlay** | Secondary/full navigation | Triggered by header hamburger. Full-viewport dark overlay, numbered link list (00–06) in large serif type, logo top-left, "CLOSE ✕" top-right, Reserve+Order pill pair pinned at bottom. Identical on mobile and desktop | Shared, every page |
| **Logo treatment** | Brand mark in header/overlay/footer | Small gold ornamental mark + wordmark + italic tagline, scales down in header, larger in footer as a faint oversized background watermark | Shared |
| **Primary button (filled)** | Primary CTA | Gold fill, dark text, pill shape (100px radius), uppercase, wide-tracked, small size, often paired with an arrow "→" or external-link icon | Shared |
| **Secondary button (outline/dark)** | Secondary CTA | Near-black/transparent fill, cream text, same pill shape and type treatment as primary | Shared |
| **External-link indicator** | Signals a link leaves the site (ResOS, GonnaOrder) | Small external-link icon appended to button/link label; `read_page` confirmed accessible labels like "Reserve — opens ResOS booking in a new tab" — a genuinely good accessibility pattern worth keeping | Shared |
| **Eyebrow label** | Section/content category label | Short uppercase Manrope label, wide tracking, gold color, flanked by a thin horizontal rule | Shared |
| **Section heading** | Heading with one italicized accent word | Cormorant Garamond, light weight, large size, one word/phrase in italic + paler gold tint | Shared |
| **Hero (full-bleed)** | Page/site introduction | Full-bleed photo background with dark gradient overlay, centered or left-aligned content block (eyebrow, H1, body, 1–2 CTAs), breadcrumb trail on interior pages ("Home / Page Name") | Shared pattern, homepage version has no breadcrumb |
| **Image + text (zigzag) section** | Narrative/storytelling block | Alternating image-left/text-right and text-left/image-right, rounded-corner photo, eyebrow + heading + 1–2 paragraphs | Shared (Story page; also homepage "What is Qissa?") |
| **Dish/food marquee** | Decorative showcase of signature plates | Horizontally auto-scrolling row of circular/plate-cropped food photos, infinite loop | Homepage-specific (or reusable as a decorative component) |
| **Keyword ribbon marquee** | Brand-word decoration | Full-width gold gradient band, auto-scrolling row of words separated by "✦" diamond glyphs | Shared (used on homepage and Story page) |
| **Category tile grid** | Menu category navigation/preview | Equal-width image tiles (rounded corners) + label underneath, grid of 6 on desktop, links to menu sections | Homepage-specific |
| **Signature dish card** | Showcase individual dishes | Photo card with a small pill tag overlay top-left (e.g. "HOUSE FAVOURITE", "CHEF'S SIGNATURE"), dish name + short description below | Homepage; reusable for a "featured dishes" pattern elsewhere |
| **Stat counter band** | Trust/credibility signals | Bordered card, 4 equal columns, large serif numerals that animate from 0 (or a low value) up to the real figure on scroll-into-view, small uppercase label beneath each | Homepage-specific |
| **Review/testimonial display** | Social proof | Rotates through individual Google reviews over a blurred photo background; star rating + rating number + review count shown large, reviewer name attributed as "NAME · GOOGLE REVIEW" | Homepage-specific |
| **CTA banner (full-bleed)** | Secondary conversion moment (private dining / group enquiries) | Full-bleed photo, dark overlay, centered heading + short copy + single gold pill CTA | Homepage-specific, reusable pattern |
| **Split conversion cards** | Primary dual-path conversion | 2-column bordered cards ("Dine In" / "At Home"), each: eyebrow, heading, short copy, "POWERED BY [partner logo]" line, whole card acts as a link to the external platform | Homepage-specific |
| **Footer** | Site-wide navigation, contact, hours, social, newsletter | 4-column: brand blurb + email signup input; "Explore" link list; "Hours" table; "Contact & Follow" (address, phone, email, social icons); oversized faint wordmark as background texture; bottom bar with copyright + agency credit | Shared, every page |
| **Breadcrumb trail** | Page orientation on interior pages | "HOME / PAGE NAME" (and "/ CATEGORY" on article pages), small uppercase, positioned above the H1 in the hero | Shared, all interior pages |
| **Category pill nav (menu page)** | In-page category navigation | Sticky pill-bar below header once scrolled, wraps to 2 rows, active category highlighted, smooth-scrolls to section on click (confirmed by clicking "VEGAN" — jumped and highlighted correctly) | Menu-page-specific |
| **Menu item row** | Individual dish listing | Name (serif) + price (sans, right-aligned) on one line, description beneath, small "V"/"VG" dietary pill tags next to applicable item names | Menu-page-specific |
| **Menu section header** | Category divider within the menu | Paired food photo banner above a heading + divider rule + italic right-aligned tagline (e.g. "to begin the tale") | Menu-page-specific |
| **Gallery masonry grid** | Visual showcase | 2-column grid, variable aspect ratios, rounded corners, always-visible bottom-left caption text, **no lightbox on click** (verified — clicking an image did nothing) | Gallery-page-specific |
| **Article card** | Journal post preview | Photo (rounded corners) + category/read-time eyebrow + title + excerpt + "READ THE STORY" link | Journal-listing-specific |
| **Article layout (template)** | Individual journal post | Full-bleed photo hero with breadcrumb + title overlaid; metadata row (category · author · read time); single-column prose body with a styled pull-quote (left gold border, italic serif); sign-off line at the end | Journal-article-specific |
| **Contact info card** | Address/phone/email/hours display | Dark bordered card, icon + label + value rows, thin dividers between rows | Contact-page-specific |
| **Contact form** | Direct enquiry | Name + Email side-by-side, full-width Message textarea, dark bordered inputs with placeholder text, gold pill submit button | Contact-page-specific |
| **Embedded map** | Location display | Light-themed embedded Google Map with an "Open in Maps ↗" pill overlay | Contact-page-specific |

---

## 10. Animation and interaction specification

No global animation library was detected on `window` (`gsap`, `Lenis`, `[data-aos]` all absent), so every behavior below was captured by **direct observation** (screenshot sequences at different scroll positions, live clicks) rather than read from code. Durations/easing are therefore estimates where noted; the trigger and visible behavior are verified.

| Interaction | Element | Trigger | Visible behavior | Duration/easing | Mobile | Essential or decorative |
|---|---|---|---|---|---|---|
| Sticky header | Main nav bar | Page scroll | Header remains fixed at the top through the entire page scroll (verified across full homepage scroll sequence) | N/A (persistent) | Verified same behavior | Essential (wayfinding + CTA access) |
| Sticky category nav | Menu page pill bar | Scroll past the hero | Pill bar sticks directly below the header once the page scrolls past it | Not timed, instant | Not separately tested | Essential (in-page navigation) |
| Smooth scroll-to-section | Menu category pills | Click | Page smooth-scrolls to the matching category section; clicked pill becomes visually active/highlighted | Estimate: ~400–600ms ease | Not separately tested | Essential |
| Full-screen nav overlay | Hamburger/"MENU" button | Click | Overlay fades/slides in over the full viewport; numbered link list and CTA pair appear; "CLOSE ✕" replaces the trigger | Estimate: ~300ms fade | Verified identical overlay on mobile | Essential |
| Dish photo marquee | "The Masterpieces" row | Automatic, on page load/scroll into view | Row of circular dish photos scrolls horizontally in a continuous loop, no user input required | Slow, continuous (estimate: ~30–40s per full loop) | Not separately tested | Decorative, but a strong signature visual — recommend keeping |
| Keyword ribbon marquee | Gold "Origin ✦ Spice ✦ Aroma…" band | Automatic | Full-width gold band scrolls a repeating word list horizontally, continuous loop | Slow, continuous (estimate similar to above) | Not separately tested | Decorative |
| Stat count-up | "The Tale So Far" numbers | Scroll into view | Each number animates upward from a low/zero value to its final figure (directly verified — two different mid-animation states were captured at different scroll passes, converging on the static final values of 4.8 / 410 / 100+ / ∞) | Estimate: ~1.5–2.5s ease-out, likely staggered slightly per column | Not separately tested | Decorative but high-impact — recommend keeping, with a reduced-motion fallback that shows the final number immediately |
| Review rotation | Testimonial band over blurred photo | Automatic (and/or scroll-tied — not conclusively isolated) | Displays one Google review at a time with star rating and reviewer attribution; content changes between visits/scrolls | Not timed | Not separately tested | Decorative/trust-building — recommend an accessible auto-rotating carousel with pause-on-hover/focus |
| Button/link hover | All pill buttons and text links | Mouse hover | Not captured as a before/after pair in this pass (static screenshots only) — **recommend** (not verified) a standard subtle treatment: slight brightness/scale shift or fill-color swap between the filled/outline button states already observed, consistent with the two button variants in §9 | Estimate: ~150–200ms | N/A (no hover on touch) | Recommended, not verified |
| Image hover/zoom (gallery, dish cards) | Gallery grid images, signature dish cards | Mouse hover | Not captured directly — clicking a gallery image produced **no** lightbox or modal (verified: screenshot before/after a click on a gallery image showed no change) | N/A | N/A | Not verified — do not assume a hover-zoom or lightbox exists; if desired for Nooms Foods, treat as a new addition, not a reproduction |
| Mobile menu button transition | Hamburger icon → overlay | Click | Icon area transitions to show "CLOSE ✕" label; content area below animates in the numbered list | Estimate: ~300ms | Verified | Essential |
| Scroll-cue | "BEGIN THE STORY" label + vertical line under the hero | Passive (page load) | Static decorative element, not confirmed to animate on its own, but visually functions as a scroll affordance | N/A | Not separately tested | Decorative |
| Decorative background dots/stars | Scattered across dark sections | Passive | Small static dot/star marks scattered across most dark-background sections — appear to be a fixed decorative texture rather than animated particles (no movement observed across multiple screenshots of the same section) | N/A | Not separately tested | Purely decorative |

**Not observed / explicitly not present:** parallax scrolling tied to mouse or scroll position beyond ordinary full-bleed background photos, video/autoplay media anywhere on the site, a gallery lightbox, page-transition animations between routes (this is a WordPress multi-page site with standard full page loads between routes, not an SPA transition).

**Recommendation for the Next.js rebuild:** implement scroll-triggered reveals and count-ups with `IntersectionObserver` (or a small library such as `framer-motion`'s `whileInView`), implement the marquees with a CSS `@keyframes` translate loop (no JS animation loop needed), and respect `prefers-reduced-motion` by disabling the marquees' auto-scroll and showing stat numbers at their final value immediately rather than animating — see §21.

---

## 11. Homepage section-by-section specification

**Reference:** https://www.qissa.co.uk/ · **Purpose:** brand introduction, dish showcase, trust-building, and the primary split into the two conversion paths (reserve / order). **Primary conversion:** Reserve a Table (confirmed to stay for Nooms Foods per §1) and Order Takeaway, presented as parallel, equally-weighted paths throughout.

1. **Header** (sticky, shared — see §9). Hamburger+"MENU" (left) · logo (center) · Order + Reserve pills (right).
2. **Hero.** Full-bleed photo background (restaurant interior) with a dark navy scrim gradient. Centered content: eyebrow "— A TALE OF FOOD —", large serif H1 (restaurant name), one-sentence body copy, two pill CTAs ("View Menu" outline, "Reserve a Table →" filled gold, external-link icon). Below the fold edge: a small "BEGIN THE STORY" label with a thin vertical line, functioning as a scroll cue.
   - *Nooms Foods adaptation:* replace the eyebrow/tagline with Nooms' own positioning line; hero photo should be the casual-but-seated dining room, not a re-staging of Qissa's blossom-tree interior. Keep the dual-CTA pattern (primary menu view + primary reserve action).
3. **"What is Qissa?" — brand intro.** Image (left, rounded corners) + text (right): eyebrow "— WHAT IS QISSA? —", H2 with italic accent word, two short paragraphs explaining the brand's name/meaning, closing italic line, small label "— THE [BRAND] PROMISE —". 
   - *Nooms Foods adaptation:* this is the brand's "why we're called this" moment — needs Nooms Foods' own origin story/name meaning, written in a warmer, more playful voice consistent with the casual brand tone from §1.
4. **Dish photo marquee — "The Masterpieces."** Eyebrow-less H2 ("Crafted icons & signature plates."), "VIEW THE FULL GALLERY" link, then a continuously auto-scrolling horizontal row of circular/plate-cropped food photography (confirmed via scroll-sequence screenshots — the row's position shifted between captures with the page otherwise static, confirming auto-scroll not user-scroll).
5. **Keyword ribbon marquee.** Full-width gold gradient band, auto-scrolling repeating list of brand words separated by "✦" (Origin, Spice, Aroma, Texture, Taste, Craft, Gathering, Celebration…).
   - *Nooms Foods adaptation:* substitute Nooms' own brand-word set once copy is confirmed — do not reuse Qissa's words verbatim.
6. **"The Cuisine" — category grid.** Eyebrow "— THE CUISINE —", H2 + body copy, then a 6-column grid (desktop) of category tiles (image + label), each presumably linking to the matching menu category: Grills & Tandoor, Traditional Curries, Biryani & Rice, Starters & Appetizers, Vegetarian Specials, Drinks.
7. **"From Our Kitchen" — full-bleed photo moment.** Full-viewport food photography with dark overlay, centered eyebrow "FROM OUR KITCHEN", H2, short line of body copy. Small dot-pair indicator visible at the top of the section in one capture — possibly a subtle slideshow/carousel indicator; not conclusively confirmed as interactive, flagged as uncertain.
8. **"The Signatures" — dish showcase grid.** Eyebrow-style small label, H2 ("Dishes with a story to tell."), body line, then a 2×3 grid of signature-dish cards: each has a small pill tag overlay (e.g. "HOUSE FAVOURITE", "THE LEGEND", "HYDERABAD", "CHEF'S SIGNATURE", "VEGETARIAN", "TO SHARE"), dish photo, dish name (serif), one-line description.
9. **Menu CTA row.** Three pill links: "EXPLORE THE FULL MENU →", "DOWNLOAD DINE MENU", "DOWNLOAD DRINKS MENU" (the latter two are PDF downloads).
   - *Nooms Foods adaptation:* only include downloadable PDF menu links if Nooms Foods actually has PDF menu assets — do not fabricate this capability; otherwise link only to the on-site menu page.
10. **"The Tale So Far" — stat band.** Eyebrow "— THE TALE SO FAR —", H2, then a bordered card with 4 equal columns, each a large count-up numeral + small uppercase label: Google rating (e.g. "4.8 ★"), review count ("410 — REVIEWS & COUNTING"), dish count ("100+ — DISHES ON THE MENU"), and a symbolic infinity mark ("∞ — STORIES TOLD").
    - *Nooms Foods adaptation:* every figure here must come from Nooms Foods' real, verifiable Google Business data — do not invent a rating, review count or dish count (see §22).
11. **"The Room" — ambience section.** Eyebrow "— [none directly labeled, heading reads] —", H2 ("Beneath the blossoms." for Qissa), two paragraphs describing the physical space, a "BOOK YOUR TABLE →" pill CTA, and to the right two stacked/offset captioned photos ("The blossom room", "A tale in gold"). Below this, a second full-bleed photo section with a large rating badge overlay (stars + rating number + "Rated by [N] guests on Google").
    - *Nooms Foods adaptation — important:* this is the section where Qissa's fine-dining voice is strongest ("navy velvet," "marble," "an occasion"). Per the confirmed casual-but-seated direction in §1, this section should be **rewritten entirely** — same structural slot (space description + photos + rating proof + book CTA) but in language and imagery that reads lively/casual rather than hushed/formal.
12. **Reviews.** Large rating number + 5-star row + "Rated by [N] guests on Google" heading, then a set of individual review cards (quote + "NAME · GOOGLE REVIEW" attribution) — ten were present in the page content in total; visual presentation rotates/displays them against a blurred photo background (see §10 — exact carousel mechanics not fully isolated).
    - *Nooms Foods adaptation:* must use Nooms Foods' real Google reviews. If real reviews aren't available at build time, the brief for the coding agent must leave this as a clearly marked placeholder requiring real content before launch — never fabricated quotes (see §22).
13. **"Private Dining & Celebrations" — group/enquiry banner.** Full-bleed photo (private dining table setup), dark overlay, centered eyebrow, H2 ("Let the story begin — together."), short copy, single gold "ENQUIRE NOW →" pill CTA.
    - *Nooms Foods adaptation:* confirm with the business owner whether Nooms Foods offers private/group bookings before including this section; if not applicable, this is the one homepage section that may need to be dropped or replaced with a different secondary conversion moment (loyalty signup, catering enquiry, etc. — to be confirmed, not assumed).
14. **"Your Table Awaits" — split conversion.** Eyebrow "— YOUR TABLE AWAITS —", H2 ("Two ways to taste the tale."), then two bordered cards side-by-side: **Dine In** (eyebrow, "Reserve a Table" heading, short copy, "POWERED BY [ResOS logo]") and **At Home** (eyebrow, "Order Takeaway & Delivery" heading, short copy including delivery postcode coverage, "POWERED BY [GonnaOrder logo]"). Each card is a full link out to the respective third-party platform (new tab).
    - *Nooms Foods adaptation:* substitute whichever real reservation and ordering platforms Nooms Foods actually uses — do not assume ResOS/GonnaOrder; this must be confirmed (see §22).
15. **Footer** (shared — see §9 and §16 pattern below).

---

## 12. Menu page specification

**Reference:** https://www.qissa.co.uk/menu/ · **Purpose:** complete, browsable menu with category navigation. **Primary conversion:** Order Takeaway & Delivery / Reserve a Table (end-of-page band).

1. **Header** (shared).
2. **Hero.** Full-bleed spice-themed photo, dark overlay, breadcrumb ("HOME / THE MENU"), eyebrow "— DINE IN · TAKEAWAY —", H1 "The Menu", one-line body copy.
3. **Category pill navigation.** Rounded card containing all category pills, wraps to 2 rows on desktop: Appetisers, Veg Starters, Grills, Biryani, Mains, Traditional Curries, Vegetarian, Rice, Breads, Vegan — plus two differently-styled pills, "DRINKS MENU →" (links elsewhere/external) and "DOWNLOAD DINE MENU" (PDF). Becomes sticky directly under the header once scrolled past (confirmed). Clicking a pill smooth-scrolls to that section and highlights the active pill (confirmed via live click test).
4. **Per-category section** (repeated for all 10 categories), each:
   - A banner of 1–2 paired food photographs (rounded corners) directly above the heading.
   - Category heading (serif) + thin divider rule + right-aligned italic tagline (e.g. "to begin the tale", "plant-based & proud", "choose your protein").
   - 2-column item list. Each row: item name (serif) with optional small "V"/"VG" dietary pill tag, price right-aligned on the same line (or a price range "£x / £y" for side/main options), one-line description beneath in muted body text.
   - The "Traditional Curries" category departs from the per-item-price pattern: it lists dish names only, with a single shared note above the list ("Each available as Veg £10.90 · Chicken £11.90 · Lamb £12.90 · Prawn £13.90") rather than repeating prices per row — worth replicating as a space-saving pattern if Nooms Foods has a similar "choose your protein" menu structure.
5. **Closing CTA band.** "HUNGRY YET?" eyebrow, H2 ("Taste the whole tale."), short copy, two pill CTAs: "ORDER TAKEAWAY & DELIVERY" and "RESERVE A TABLE".
6. **Footer** (shared).

**Content requirement for Nooms Foods:** every category name, dish name, description and price must come from Nooms Foods' real menu. None of Qissa's dish names, prices or category structure should be copied — only the *presentation pattern* (two-column name/price/description rows, dietary tags, sticky category nav) carries over. See §22 for what's still needed.

---

## 13. Story page specification

**Reference:** https://www.qissa.co.uk/story/ · **Purpose:** brand narrative/about page. **Primary conversion:** Reserve a Table / View the Menu (closing band).

1. **Header** (shared).
2. **Hero.** Full-bleed interior photo (blossom-canopy dining room for Qissa), dark overlay, breadcrumb ("HOME / OUR STORY"), eyebrow "— THE MEANING —", H1 "Our Story", one-line body copy explaining the brand name's meaning.
3. **Four alternating image/text sections**, each: small italic eyebrow label (e.g. "The meaning", "The cuisine", "The craft", "The room"), H2 with one italicized accent word, 1–2 paragraphs. Image alternates sides (image-left/text-right, then text-left/image-right, alternating down the page), rounded-corner photography, generous vertical spacing between sections.
   - Section topics for Qissa: the meaning of the name → the cuisine's regional roots → the hands-on craft/cooking philosophy → the physical room/ambience.
   - *Nooms Foods adaptation:* same four-beat narrative structure (name/meaning → food philosophy → craft/process → the space) works for most restaurant brands and should transfer well; content and tone must shift per §1 (less reverent, more energetic), and the fourth "the room" beat should describe Nooms Foods' actual casual-but-seated space rather than Qissa's "navy velvet" imagery.
4. **Keyword/phrase marquee.** A repeating auto-scrolling line of short brand phrases separated by "✦" ("Qissa is a place of gathering ✦ of celebrations ✦ of business ✦ and of pleasure ✦ …") — same marquee component as the homepage, reused with phrase-length content instead of single words.
5. **Closing CTA band.** Eyebrow "LET THE STORY BEGIN", H2 ("Join us in Sevenoaks." for Qissa — i.e., a location-anchored closing line), short copy, two pill CTAs ("Reserve a Table", "View the Menu").
6. **Footer** (shared).

---

## 14. Gallery page specification

**Reference:** https://www.qissa.co.uk/gallery/ · **Purpose:** visual proof/showcase of food, space and events. **Primary conversion:** Reserve a Table / Order Takeaway (closing band).

1. **Header** (shared).
2. **Hero.** Full-bleed interior photo, dark overlay, breadcrumb ("HOME / GALLERY"), eyebrow "— A VISUAL JOURNEY —", H1 "Gallery", one-line body copy.
3. **Masonry image grid.** 2 columns (desktop), variable aspect ratios (portrait, landscape, near-square — confirmed via scroll sequence, not a uniform grid), rounded corners, caption text visible at the bottom-left of every image (appears to be permanently visible, not a hover-only reveal, based on the extracted page text listing every caption inline with no interaction required). Content mixes: the room/interior, individual dishes, special occasions (birthdays, business dinners, large groups), drinks, and one exterior storefront shot. **No lightbox or modal on click** — verified directly by clicking an image and comparing before/after screenshots (no change occurred). No visible category filtering, despite the brief's prompt to check for it — none exists on this page as built.
4. **Social proof line.** "Follow @qissasevenoaks for the latest from the kitchen." — plain text, not an embedded social feed.
5. **Closing CTA band.** "COME AND SEE" eyebrow, H2 ("Better in person."), short copy, two pill CTAs ("Reserve a Table", "Order Takeaway").
6. **Footer** (shared).

**Content requirement:** every image must be Nooms Foods' own verified photography (food, room, team, events) sourced from the `public/` asset inventory in §18 — none should be stock photography or invented.

---

## 15. Journal listing and article page specifications

**Reference (listing):** https://www.qissa.co.uk/journal/ · **Reference (article):** https://www.qissa.co.uk/truck-drivers-lamb-curry/ · **Purpose:** editorial/storytelling content marketing. **Primary conversion:** Reserve a Table / View the Menu.

**Listing page:**
1. **Header** (shared).
2. **Hero.** Full-bleed photo (kitchen/tandoor action shot), dark overlay, breadcrumb ("HOME / JOURNAL"), eyebrow "— STORIES FROM THE KITCHEN —", H1 "Journal", one-line body copy.
3. **Article card grid.** 2 columns (desktop). Only 2 articles currently exist on the live site, so this reads as a single row — the grid should be built to scale to more cards without layout changes. Each card: photo (rounded corners), small eyebrow line ("CATEGORY · N MIN READ"), H3 title, one-line excerpt, "READ THE STORY →" link.
4. **Closing CTA band.** "HUNGRY FOR THE REAL THING?" eyebrow, H2 ("Come write your own chapter."), two pill CTAs ("Reserve a Table", "View the Menu").
5. **Footer** (shared).

**Article template (verified against the one fully-opened article):**
1. **Header** (shared).
2. **Hero.** Full-bleed photo related to the article subject, dark overlay, breadcrumb including the article's category ("HOME / JOURNAL / [CATEGORY]"), H1 article title overlaid at the bottom of the hero image (not a separate block below it — confirmed via screenshot, title sits directly on the photo).
3. **Metadata row.** Category label · author · read time (for Qissa, the author field displayed a raw email address, "ashish@reddashmedia.com" — this is almost certainly a CMS/content configuration mistake on the reference site, not an intentional design pattern, and should **not** be replicated; Nooms Foods' articles should show a proper author name).
4. **Article body.** Single-column prose, generous line-height and paragraph spacing, max-width constrained for readability (not full the 1600px container width). Includes a bolded sub-heading mid-article ("What makes it" in the sample) breaking the narrative into a short second part. One pull-quote styled with a left gold vertical border and italic serif type, set off from the surrounding paragraphs. Article ends with a short italic sign-off line ("— The Qissa kitchen").
5. **No closing CTA band or related-articles module was present at the bottom of the article itself** (confirmed by scrolling to the true end of the content) — this differs from every other page template on the site, which all end with a conversion band. **Recommendation:** consider adding a closing CTA/related-articles module to the Nooms Foods article template even though Qissa's doesn't have one, since every other page type on the reference site reinforces conversion at the end and this is a plausible gap rather than an intentional choice — flag this as a deliberate improvement, not a reproduction, if adopted.
6. **Footer** (shared).

**Content requirement:** article topics, stories and authorship must be Nooms Foods' own real content — none should be invented to fill the template (see §22).

---

## 16. Contact page specification

**Reference:** https://www.qissa.co.uk/contact/ · **Purpose:** location, hours, direct contact and enquiry. **Primary conversion:** Reserve a Table / Order Takeaway, plus a direct-message form as a secondary path.

1. **Header** (shared).
2. **Hero.** Full-bleed photo of the storefront at night, dark overlay, breadcrumb ("HOME / VISIT & CONTACT"), eyebrow "— FIND US —", H1 "Visit Us", one-line body copy.
3. **Info + map split.** Two columns: **left** — a dark bordered card with icon+label+value rows (Address, Phone, Email, Opening Hours — the hours block lists each day range with closed/exception days called out), each row divided by a thin horizontal rule, address/phone/email are live links (`tel:`, `mailto:`, Google Maps); **right** — an embedded Google Map (light-themed, not restyled to match the site) with an "Open in Maps ↗" pill overlay.
4. **CTA pair.** "RESERVE A TABLE" and "ORDER TAKEAWAY & DELIVERY" pill buttons beneath the info/map split.
5. **Contact form.** Eyebrow "— SAY HELLO —", H2 ("Send us a message."), form fields: Name and Email side-by-side (desktop), Message as a full-width textarea beneath, all fields styled as dark bordered inputs with placeholder text (no visible labels above fields — placeholder-as-label pattern), gold "SEND MESSAGE" pill submit button.
6. **Footer** (shared).

**Content requirement:** real address, phone, email and hours for Nooms Foods — none should be invented or copied from Qissa (see §22). Confirm what the contact form actually submits to (email service, CRM, etc.) before implementation — not something this inspection could determine from the outside.

---

## 17. Additional discovered page specifications

Beyond the six core pages and the one journal article template, the inspection surfaced two **external, third-party destinations** that the site treats as part of its conversion flow but are not part of the Qissa site itself:

- **Reservations — ResOS** (`https://qissa-1698715758.resos.com/booking`): a generic, light-themed, white-background 4-step booking widget (People → Date → Time → Submit) with its own cookie-consent banner. It is **not reskinned** to Qissa's navy/gold identity at all — visiting it is a hard visual context-switch away from the brand. Every "Reserve" CTA site-wide (header, overlay, hero, footer, split-conversion card) links here and opens in a new tab, with an accessible label noting the destination ("opens ResOS booking in a new tab").
- **Takeaway ordering — GonnaOrder** (`https://qissa-takeaway.gonnaorder.com/`): a third-party ordering platform that pulls in Qissa's name and brand description as text but otherwise runs its own generic platform UI (own login, own date/time picker, own cookie consent). Also opens in a new tab with an accessible "opens GonnaOrder in a new tab" label.

**Documentation note, not a design recommendation:** both integrations represent a real UX tradeoff — the main site's design language is abandoned entirely at the moment of highest commercial intent (actually booking or ordering). Whether Nooms Foods' equivalent platforms can be visually customized to reduce this jump, or whether this is accepted as a standard limitation of third-party booking/ordering SaaS, is a decision for the business owner and coding agent once the real platforms are known (see §22) — this brief does not take a position on replicating or avoiding the pattern, only documents that it exists.

No other pages, sub-navigation, filtered views, search functionality, user accounts, or CMS-admin-adjacent pages were discovered through any link on the site.

---

## 18. Nooms Foods asset inventory and placement mapping — **BLOCKED**

**This section could not be completed.** Phase 5 of the brief requires inspecting the existing Next.js project's structure, `public/` directory, font configuration, CSS/theme variables, routes, components and integrations — none of which this session can currently reach (no linked computer; no project files uploaded; see §2 and §22). No asset filename, font name, component name or integration is invented below.

**The only Nooms Foods material available at the time of writing** is two photographs of the physical storefront, supplied mid-session (not project files):

| Item | Type | Description | Suggested placement (provisional) |
|---|---|---|---|
| Storefront photo 1 & 2 | Photograph (not a project asset — supplied directly in chat) | Exterior counter/signage shot: black fascia, bold amber/yellow "NOOMS FOODS" wordmark with an illustrated eyes/face mark, stainless-steel counter, warm interior lighting, a pink/red secondary sign visible in-window | Reference only for brand mood/color (§6) — not production-ready for use as a web asset (needs to be evaluated for resolution/cropping once real marketing photography is available) |

**What is needed to complete this section:** the actual contents of the project's `public/` directory (logo files/variations, food photography, restaurant interior photography, packaging/product images, illustrations, promotional graphics), plus the project's styling configuration (Tailwind config / CSS variables / design tokens file) and font files. Once available, this section should be rebuilt as a full table of: filename → type → where it was found → recommended page/section placement (hero, menu, gallery, footer, etc.) → confidence (confirmed intended use vs. uncertain, per the brief's own instruction to mark unclear assets as uncertain rather than assigning unsupported meaning).

---

## 19. Navigation and user journeys

**Primary navigation (confirmed, identical on mobile and desktop via the full-screen overlay):** Home · Our Story · The Menu · Gallery · Private Dining · Journal · Visit & Contact — numbered 00 through 06 in the overlay, in that order. "Private Dining" is an anchor into the homepage, not a standalone route (see §11, section 13).

**Header-persistent actions (every page):** Order (secondary pill) and Reserve (primary pill), both visible in the sticky header at all times, both also repeated in the nav overlay and at the end of most page templates.

**Primary conversion journeys, as built:**
1. **Reserve a table:** any "Reserve" CTA (header, overlay, hero, "Book Your Table," split-conversion card) → external ResOS booking widget (new tab) → 4-step flow (People, Date, Time, Submit) on ResOS's own generic UI.
2. **Order takeaway/delivery:** any "Order" CTA → external GonnaOrder platform (new tab) → GonnaOrder's own login/ordering UI, pre-loaded with Qissa's name/description and delivery postcode coverage (TN13/TN14/TN15/TN16 for Qissa).
3. **Browse the menu → convert:** Home or any page → "The Menu" → category-filtered browsing → closing CTA band (Order or Reserve).
4. **Learn the story → convert:** Home → "Our Story" → four-beat narrative → closing CTA band.
5. **Get inspired visually → convert:** Home → "Gallery" → masonry browse → closing CTA band.
6. **Read content → convert:** Home → "Journal" → article → (no closing CTA on the article itself, see §15) → reader must navigate away manually to convert, a noted gap.
7. **Direct contact:** any page → "Visit & Contact" → info card / map / form, three parallel ways to reach the business without going through either third-party platform.

**For Nooms Foods:** this journey map should transfer almost directly given the confirmed sit-down-with-reservations model (§1) — the main open question is which real platforms stand in for ResOS/GonnaOrder (see §22), and whether "Private Dining" as a homepage anchor is relevant to Nooms Foods' actual group-booking offering.

---

## 20. Technical implementation guidance for the existing Next.js project

**Caveat up front:** none of this section was verified against the actual Nooms Foods codebase (blocked, see §2/§22). It is written as guidance for the implementing agent to validate against the real project on day one, not as a confirmed technical plan.

- **Inspect before building.** The implementing agent must read the existing Next.js project's structure, routing (`app/` vs `pages/` router), existing components, styling approach (Tailwind, CSS Modules, styled-components, vanilla CSS — unknown), and any already-installed animation libraries before writing new code, per Phase 8's requirements.
- **Reference is not reusable code.** Qissa is a WordPress site; nothing can be copied or ported. Every component in §9 needs a clean React/Next.js implementation.
- **Suggested component breakdown** (names illustrative, align with the project's existing conventions once known): `Header`, `NavOverlay`, `Hero`, `EyebrowLabel`, `SectionHeading`, `PillButton` (variant: primary/secondary), `ExternalLinkBadge`, `ImageTextSection` (zigzag), `DishMarquee`, `KeywordMarquee`, `CategoryTileGrid`, `SignatureDishCard`, `StatCounterBand` (with an `IntersectionObserver`-based count-up hook), `ReviewCarousel`, `CTABanner`, `SplitConversionCards`, `Footer`, `Breadcrumb`, `MenuCategoryNav` (sticky + scroll-spy), `MenuItemRow`, `MenuSectionHeader`, `GalleryMasonryGrid`, `ArticleCard`, `ArticleLayout`, `ContactInfoCard`, `ContactForm`, `MapEmbed`.
- **Images:** use `next/image` throughout for automatic optimization, responsive sizing and lazy-loading, matching the rounded-corner (12–14px) and aspect-ratio conventions documented in §8.
- **Motion:** CSS `@keyframes` for the two marquee components (cheapest, smoothest option for continuous loops); `IntersectionObserver` or `framer-motion`'s `whileInView` for scroll-triggered reveals and the stat count-up; avoid heavy scroll-jacking libraries not evidenced on the reference site.
- **Fonts:** load via `next/font` once the real Nooms Foods typefaces are confirmed (§7) rather than loading Cormorant Garamond/Manrope by default — those are Qissa's fonts, not confirmed as licensed or desired for Nooms Foods.
- **Design tokens:** express the color system (§5/§6) and spacing/radius scale (§8) as CSS custom properties or a Tailwind theme extension (whichever the project already uses) rather than hardcoding values per-component, so the as-yet-unconfirmed final Nooms Foods palette can be dropped in without touching component code.
- **Third-party integrations:** confirm Nooms Foods' actual reservation and ordering platforms (§22) before building the split-conversion cards and header CTAs — do not hardcode ResOS/GonnaOrder.
- **Forms:** confirm the contact form's real destination (email service/CRM/API route) before implementation.

---

## 21. Accessibility and performance requirements

- **Reduced motion:** respect `prefers-reduced-motion` — disable both marquees' auto-scroll, skip the stat count-up animation and show final values immediately, and remove/soften scroll-reveal transitions.
- **Color contrast:** once the real Nooms Foods palette is confirmed (§6), verify text-on-background and button-label-on-fill combinations meet WCAG 2.1 AA (4.5:1 for body text, 3:1 for large text/UI) — Qissa's own cream-on-navy and dark-brown-on-gold combinations should be checked too if used as a reference point, not assumed compliant.
- **Alt text:** every photograph (hero backgrounds, dish photos, gallery grid, article images) needs descriptive alt text — none should ship with empty or filename-based alt attributes.
- **Keyboard navigation:** the full-screen nav overlay, sticky menu category pills, gallery grid, and contact form must all be fully operable by keyboard, with visible focus states — not verified on the reference site in this pass, called out as a requirement rather than an observation.
- **Semantic structure:** proper heading hierarchy per page (one H1, logically nested H2/H3), semantic landmarks (`header`, `nav`, `main`, `footer`), and labeled form fields (the reference site's placeholder-only inputs on the contact form are a pattern to improve on, not copy exactly — add proper `<label>` elements, visually hidden if needed, rather than relying on placeholder text alone).
- **External links:** carry over the reference site's good pattern of an accessible label stating the destination and that it opens in a new tab (e.g. "Reserve — opens [Platform] booking in a new tab"), plus `rel="noopener noreferrer"`.
- **Performance:** lazy-load below-the-fold imagery, use `next/image` responsive sizing (§20), avoid layout shift from web font loading (`font-display: swap` or `next/font`'s built-in handling), and keep the marquee/count-up/carousel implementations lightweight (CSS-driven where possible) so they don't become main-thread jank sources, especially on mobile.
- **Testing target:** verify against Lighthouse/axe (or equivalent) for performance and accessibility scores before launch — no specific numeric target was specified in the originating brief, so the implementing team should set one consistent with the project's existing standards.

---

## 22. Missing assets, content, and unresolved questions

**Blocking items — needed before implementation can faithfully follow this brief:**

| # | Item | Why it's needed |
|---|---|---|
| 1 | Access to the Nooms Foods Next.js project (`public/` directory, styling config, font files, existing components/routes) | Phases 2.2, 5, 6, 18 and 20 of the originating brief all depend on real project inspection — currently blocked (no linked computer, no files uploaded; see §2) |
| 2 | Nooms Foods' real logo files and any existing brand guidelines | §6's color mapping is currently based on two photographs only, not actual logo/brand assets |
| 3 | Nooms Foods' real menu (categories, items, descriptions, prices, dietary indicators) | §12 requires real content — none was invented |
| 4 | Nooms Foods' real food, interior and team photography | §11, §14, §18 all require real photography, not stock or placeholder images |
| 5 | Nooms Foods' real Google Business data (rating, review count, dish count or equivalent trust stats) and real customer reviews | §11 sections 10 and 12 explicitly require verified figures and real review quotes — nothing should be fabricated |
| 6 | Nooms Foods' real address, phone, email, and opening hours | §16 requires verified business facts |
| 7 | Nooms Foods' actual reservation platform (if any) and ordering/delivery platform (if any) | §11 section 14, §17, §19, §20 all depend on knowing the real integrations rather than assuming ResOS/GonnaOrder |
| 8 | Confirmation of whether Nooms Foods offers private dining / group bookings | Determines whether §11 section 13 is adapted or dropped |
| 9 | Nooms Foods' journal/blog content (if any), or confirmation that this is a new content type to launch with zero articles | §15 requires real editorial content, not invented stories |
| 10 | Confirmation of the contact form's intended destination (email/CRM/API) | §16, §20 |
| 11 | The project's existing font files/configuration | §7 — do not assume Cormorant Garamond/Manrope should be reused |
| 12 | The project's existing styling approach (Tailwind/CSS Modules/etc.) and any installed animation libraries | §20 |

**Already resolved via direct user input during this research:** Nooms Foods' service model is a sit-down restaurant with casual/playful decor (not counter-service, not strict fine-dining) — this is reflected throughout §1, §11 (section 11), and §13.

---

## 23. Implementation checklist and acceptance criteria

**Before coding begins:**
- [ ] This entire design brief has been read in full by the implementing agent.
- [ ] The existing Next.js project has been inspected (routes, components, styling approach, fonts, installed libraries) before any new code is written or any existing file is modified.
- [ ] All items in §22 have been resolved — real assets, real menu, real copy, real business facts, real third-party platforms — or an explicit decision has been made (with the business owner) to proceed with specific items still pending, clearly tracked.
- [ ] The Nooms Foods color palette (§6) has been finalized from real brand assets, not the provisional photo-based estimate.

**During implementation:**
- [ ] Every component in §9 is built as a reusable component where marked "Shared," not duplicated per page.
- [ ] Every page section in §11–§16 is implemented in the documented order, with content sourced from verified Nooms Foods material — no invented dishes, prices, reviews, stats, or business claims anywhere on the site.
- [ ] No placeholder or non-functional buttons/links ship — every CTA resolves to a real destination (internal route, real external platform, real `tel:`/`mailto:`, or a genuinely working form submission).
- [ ] Responsive behavior matches §8's documented patterns at minimum, verified at mobile/tablet/desktop breakpoints actually used by the project.
- [ ] Animations match §10's documented behaviors and all respect `prefers-reduced-motion` per §21.
- [ ] Accessibility requirements in §21 are met: semantic structure, alt text, keyboard operability, labeled form fields, accessible external-link labeling.
- [ ] Existing integrations (CMS, booking/ordering platforms, analytics) are reused where the project already has them rather than rebuilt from scratch.
- [ ] No unrelated refactoring or redesign of parts of the existing project outside this brief's scope.

**Before launch:**
- [ ] Every page in §3's equivalent Nooms Foods sitemap has been verified against its matching specification section (§11–§17) section-by-section.
- [ ] Every image has real alt text; every form has been tested end-to-end.
- [ ] Lighthouse/accessibility audit completed and reviewed (§21).
- [ ] All stats, reviews, hours, contact details and menu content have been confirmed accurate and current with the business owner.
- [ ] A final side-by-side review confirms the site carries Qissa's structural/interaction DNA (per this brief) while reading unmistakably as Nooms Foods in color, voice and content — not as a re-skinned clone.

---

*End of brief. This document reflects direct inspection performed on 2026-10-03. Sections 6, 18, 20 (and parts of 11, 13, 19, 22) are explicitly provisional pending access to the actual Nooms Foods Next.js project — see §22 for the complete list of what's needed to finalize them.*
