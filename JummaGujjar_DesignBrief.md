# Jumma Gujjar Nihari: Website Rebrand Brief

Audience: the coding agent working on the existing design-ready boilerplate.
Goal: re-theme the boilerplate into the Jumma Gujjar brand. Keep the boilerplate's component architecture. Change tokens, fonts, copy, content, imagery and section order.

---

## 0. Agent instructions (read first)

1. Audit the boilerplate before changing anything. List its theme layer (CSS variables, Tailwind config, theme file, design tokens), its font loading, its section components, and where copy and data live.
2. Rebrand through the **token layer first** (colours, fonts, radii, shadows), then components, then content. Don't hard-code hex values inside components.
3. Move all business content (menu, hours, contact, links) into one data file (`site.config` or `menu.json`) so the owner can edit it without touching components.
4. Mobile-first. Most visitors will arrive from Instagram, TikTok or WhatsApp on a phone in Karachi. Design at 390px wide first.
5. Anything marked **[CONFIRM]** is unverified. Render it from config with a placeholder. Don't invent facts, prices, or claims.
6. No celebrity claims, no "luxury", no "fine dining", no invented awards or years.

---

## 0.1 Assets already in the project (use these first)

The owner has already added brand assets to the codebase:

- Location: `public/Jumma Gujjar/` (note the **space** in the folder name)
- Contents: the **logo**, **images**, **videos**, **branding videos** and **promotional material**

Rules for the agent:

1. **Inventory first.** Before designing, list every file in `public/Jumma Gujjar/` (name, type, dimensions or duration, file size). Write the result to a short `assets-manifest.md` or `assets.config` file. Decide which asset serves which section (hero video, logo, gallery, promo strip, OG image).
2. **Reference paths safely.** The folder name contains a space, so URL-encode it in web paths, e.g. `/Jumma%20Gujjar/logo.png`. Better: keep the paths in one config file, and don't scatter string paths across components. Do **not** rename or move the folder unless asked. If you need cleaner paths, copy or alias, don't break existing references.
3. **Sample the real brand colours from the logo** in that folder. Replace `--jg-gold` and `--jg-red` in section 3.2 with the sampled values. Keep the derived tokens in proportion.
4. **Use the owner's videos and promos in place of generic ones.** The branding and promo videos are first choice for the hero loop, the story section and the "As seen on" strip. Compress or generate poster frames if the files are heavy. Use `preload="metadata"` and lazy-load anything below the fold. Don't autoplay with sound.
5. **Never overwrite or delete** the owner's files. Write optimised copies (WebP/AVIF, trimmed MP4/WebM) to a new subfolder such as `public/Jumma Gujjar/optimized/`.

### If an asset is missing

If the section needs an image the folder doesn't contain (e.g. nalli close-up, sheermal, lassi, the outlet exterior, a favicon, or an OG image), the agent may search the web, download suitable images and add them to the project:

1. Save downloads into `public/Jumma Gujjar/downloaded/` so they are clearly separated from the owner's own files.
2. Prefer, in this order: (a) the brand's own channels (their Facebook, Instagram, official Foodpanda listing), (b) images clearly licensed for reuse (Unsplash, Pexels, Pixabay, Wikimedia Commons), (c) other web images only as **temporary placeholders**.
3. Pick images that match the brand: warm, high-contrast food close-ups of nihari, nalli, desi ghee tarka, sheermal, lassi or Karachi street-food scenes. Reject watermarked, low-resolution (under about 1000 px wide) or off-brand images, and anything showing identifiable people or other restaurants' logos.
4. Record each downloaded file in the manifest: filename, source URL, licence if known, and whether it is **placeholder** or **final**. This lets the owner replace placeholders with their own photos later.
5. Add meaningful `alt` text to every image.
6. Don't re-host vloggers' videos or screenshots from their content. For those, use the platform's official embed or a link-out (see section 6).

---

## 1. Brand snapshot

| Item | Detail |
|---|---|
| Name | Jumma Gujjar Nihari (Urdu: جمعہ گجر نہاری). Facebook page lists it as "Jumma Gujjar Nihari"; Instagram shows "Jumma Gujjar Pakwan". Use **Jumma Gujjar Nihari** as the primary name. |
| Type | Street-food nihari house. Dine-in and outdoor seating. |
| Main branch | B-1 Area, Liaquatabad, Karachi, Pakistan |
| Signature | **Desi Ghee ka Tarka Nihari**: slow-cooked beef nihari finished with a sizzling pour of pure desi ghee tempering |
| Tagline (from Instagram bio) | **"Asli zaiqa, asli tarka!"** |
| Personality | Bold, warm, smoky, generous, street-authentic, with a heritage-premium polish. Not luxury. |
| Name meaning | "Jumma" = Friday, the traditional nihari day. "Gujjar" = the dairy-keeping community, which ties to the desi ghee story. |

### Story points (use as copy; marked where unverified)
- Cooked slow, overnight, on a low fire until the beef shank is melt-soft. *(reported by vloggers and the listing)*
- The tarka: hot desi ghee poured over the bowl at the table. This is the brand's visual and flavour signature.
- Desi ghee is described by reviewers as coming from the family's own dairy background. **[CONFIRM with owner before saying "from our own dairy farm".]**
- Dairy heritage "since 1947" and "1996" appear in third-party summaries and **conflict with each other**. The nihari outlet itself dates to roughly 4 to 5 years ago, based on vlog dates. **Do not print any founding year until the owner confirms.** Safe wording: "A dairy family's desi ghee, now in a bowl of nihari."

---

## 2. What they sell and what leads

Source: Foodpanda listing, vlogs and social bios. Prices below are **Foodpanda list prices (delivery)**. Dine-in prices may differ. **[CONFIRM dine-in prices.]**

### Best seller / hero product
No official sales ranking is published. Every vlog, caption and hashtag leads with **Desi Ghee ka Tarka Nihari**, then **Nalli Nihari** (bone marrow) and **Maghaz Nihari** (brain). Make Desi Ghee Tarka Nihari the hero and mark it "Signature" or "Most Ordered" only if the owner confirms.

### Menu data (drop into config)

```json
{
  "categories": [
    {
      "id": "nihari",
      "name": "Nihari",
      "name_ur": "نہاری",
      "items": [
        { "name": "Desi Ghee Wali Nehari", "name_ur": "دیسی گھی والی نہاری", "price": 850, "badge": "Signature", "desc": "Slow-cooked beef nihari finished with a sizzling desi ghee tarka." },
        { "name": "Nalli Nehari", "name_ur": "نلی نہاری", "price": 900, "badge": "Fan favourite", "desc": "Rich nihari with succulent bone marrow." },
        { "name": "Maghaz Nehari", "name_ur": "مغز نہاری", "price": 900, "badge": null, "desc": "Nihari enriched with delicate brain." },
        { "name": "Special Nehari", "name_ur": "اسپیشل نہاری", "price": 1200, "badge": "Sharing size", "desc": "The elevated house nihari with extra garnishes. Serves 1 to 4." },
        { "name": "Nehari", "name_ur": "نہاری", "price": 750, "price_prefix": "from", "badge": null, "desc": "Classic slow-cooked beef in a thick, savoury gravy." }
      ]
    },
    {
      "id": "breads",
      "name": "Roti, Naan & Sheermal",
      "name_ur": "روٹی اور شیرمال",
      "items": [
        { "name": "Sheermal", "price": 160, "desc": "Milk-enriched, lightly sweet, golden-baked." },
        { "name": "Taftaan", "price": 140 },
        { "name": "Roghni Kulcha", "price": 130 },
        { "name": "Lahori Kulcha", "price": 70 },
        { "name": "Doodh Wali Roti", "price": 70 },
        { "name": "Khameeri Roti", "price": 40 },
        { "name": "Farmaishi Chapati", "price": 25 }
      ]
    },
    {
      "id": "mains",
      "name": "Curries, Daal & Mains",
      "name_ur": "سالن اور دال",
      "items": [
        { "name": "Beef Qoorma", "price": 450 },
        { "name": "Chicken Karhayi", "price": 400 },
        { "name": "Daal Mash", "price": 300 },
        { "name": "Daal Channa", "price": 200 },
        { "name": "Sada Chana", "price": 200 },
        { "name": "Mix Sabzi", "price": 200 }
      ]
    },
    {
      "id": "drinks",
      "name": "Drinks",
      "items": [
        { "name": "Lassi", "price": null, "desc": "[CONFIRM price. Earlier social captions showed roughly Rs 150.]" }
      ]
    }
  ],
  "note": "Prices are indicative delivery prices. Confirm dine-in prices with the owner."
}
```

Notes for the agent:
- Foodpanda also lists Haleem as a cuisine tag, but no Haleem item. Don't add it.
- The Instagram bio mentions biryani and pulao. They are not on Foodpanda. Don't add them to the menu. **[CONFIRM.]**
- A retail "Jumma Gujjar Nihari with Desi Ghee ka Tarka" 450 g tin pack is listed on Daraz. The seller is unverified. Don't build a shop for it. At most, add an optional "Take it home" teaser once the owner confirms it's theirs.

---

## 3. Visual identity

### 3.1 What's known
- Logo: a yellow/orange circle, red Urdu calligraphy, a steaming bowl. *(from earlier page analysis)*
- Facebook cover: a tarka (sizzling ghee finish) shot.
- Social highlights: "Tarka", "Saturday Night", "Feedback".

### 3.2 Palette: proposed tokens

**Important:** no official brand guide exists, and the logo file could not be colour-sampled in this research. These hex values are a proposal built from the logo description. **Sample the real logo in `public/Jumma Gujjar/` with an eyedropper (or a script) and swap `--jg-gold` and `--jg-red` to match** before launch. Everything else derives from those two.

| Token | Hex | Use |
|---|---|---|
| `--jg-gold` | `#F5A623` | Primary. Ghee / sunflower yellow-orange. Buttons, highlights, prices. **Replace with the logo's yellow.** |
| `--jg-gold-deep` | `#D98A0B` | Hover / pressed states |
| `--jg-red` | `#C8281E` | Chilli red. Accent, badges, Urdu calligraphy accents, CTA fills. **Replace with the logo's red.** |
| `--jg-red-bright` | `#E5483A` | Red used as text or thin lines on dark (the base red is too low-contrast there) |
| `--jg-ember-900` | `#14100E` | Page background (deep charcoal-brown) |
| `--jg-ember-800` | `#1E1815` | Section / card surface |
| `--jg-ember-700` | `#2A211C` | Elevated surfaces, borders |
| `--jg-cream` | `#FFF3DC` | Main text on dark |
| `--jg-cream-muted` | `#B8A58C` | Secondary text |
| `--jg-steam` | `#F7EFE2` | Light-section background (use sparingly, e.g. the menu or story block) |
| `--jg-whatsapp` | `#25D366` | WhatsApp button only (functional) |

Rules:
- Default theme is **dark ember**. Dark backgrounds make the gold and tarka photography glow.
- Gold is for emphasis. Don't flood large areas with it. Max one gold block per viewport.
- Red fills must carry cream text (contrast about 5.6:1). Red-on-dark small text must use `--jg-red-bright`.
- Add a subtle warm radial glow behind the hero bowl (`radial-gradient` from gold at about 18% opacity to transparent). It imitates a flame or ember light.
- Optional texture: faint grain overlay at 4 to 6% opacity. No glossy gradients, no gold foil, no royal ornaments.

### 3.3 Typography

| Role | Font | Notes |
|---|---|---|
| Urdu name / calligraphy accents | **Noto Nastaliq Urdu** (Google Fonts) | Needs generous line-height (2.0 or more) or it clips. Use for the logo lockup, section kickers, Urdu item names. |
| Headings (Latin) | **Fraunces** 700 | Warm, heritage serif. Gives the "premium" polish without luxury. |
| Labels / badges / nav | **Bebas Neue** | Street-signage energy. Uppercase, letter-spaced. |
| Body / UI | **DM Sans** 400/500/700 | Clean and legible on mobile. |

Load with `font-display: swap`. Subset Latin and Urdu. Provide system fallbacks. If the boilerplate already uses a different heading font, replace it through the token layer, not per component.

### 3.4 Shape, motion, imagery
- Radii: 14 to 20px on cards, pill buttons. Soft, friendly, not sharp.
- Shadows: warm and dark (`rgba(0,0,0,.45)`) plus a faint gold glow on the primary CTA.
- Motion (respect `prefers-reduced-motion`):
  - **Hero:** looping short video (muted, autoplay, playsinline) of the ghee pour, or a CSS/Lottie "tarka flare" fallback.
  - Steam wisps rising over the bowl (CSS or SVG, subtle).
  - Cards fade up on scroll. Prices count in. Keep durations at 300 to 500 ms.
- Photography: macro close-ups of the tarka sizzle, steam, nalli bone marrow, torn sheermal, lassi. Warm, high-contrast, slightly moody. Hands pouring ghee beat empty plates.
- Iconography: simple line icons, gold stroke. A bowl and steam motif can be reused as a section divider.

---

## 4. Page structure (map onto the boilerplate's sections)

1. **Nav (sticky):** logo, Menu, Story, Visit, and a gold **Order on WhatsApp** button. On mobile, collapse to a hamburger and keep the WhatsApp CTA visible.
2. **Hero:** tarka video or image over ember with glow. Urdu name in Nastaliq above the English name. Tagline "Asli zaiqa, asli tarka." Two CTAs: *Order on WhatsApp* and *View Menu*. A small chip: "Liaquatabad, Karachi".
3. **Signature strip:** three cards: *Desi Ghee Tarka*, *Nalli*, *Maghaz*. One line each.
4. **Menu:** category tabs (Nihari / Breads / Mains / Drinks). Item cards with Urdu name, short description, price, and a badge. Include the note about indicative prices.
5. **The tarka story:** split layout. Left: photo or video. Right: 3 short beats (slow-cooked overnight, desi ghee, served sizzling). A light `--jg-steam` section is allowed here for contrast.
6. **Social proof / "As seen on":** embed or link the vlogger videos (see section 6). Show verified numbers only.
7. **Gallery:** masonry grid of food and outlet photos.
8. **Visit us:** address, embedded Google Map, hours, phone, "Get directions" button. Mention the dine-in and outdoor seating.
9. **Order:** WhatsApp (primary), Foodpanda link (secondary), phone call.
10. **Footer:** logo, links to Facebook, Instagram, TikTok, YouTube, copyright.

---

## 5. Contact, hours, links

| Item | Value |
|---|---|
| Address | B-1 Area, Liaquatabad, Karachi **[CONFIRM exact street address + Google Maps pin]** |
| Phone (Facebook page) | +92 304 1300535 **[CONFIRM this is also the WhatsApp number]** |
| Another page | "Jumma Gujjar Foods" (+92 311 6592375) exists on Facebook. Relationship **unverified**. Do not use this number. |
| Hours | **[CONFIRM.]** The Foodpanda listing shows 09:00 to 24:00 daily, but that listing's address is in Korangi, not Liaquatabad (see section 7). Social bios mention Saturday-night service. |
| Facebook | https://www.facebook.com/JummaGujjarNihari/ |
| Instagram | https://www.instagram.com/jumma_gujjar_niharii/ |
| Foodpanda | https://www.foodpanda.pk/restaurant/msp0/jumma-gujjar-nehari-and-sheermal-house |
| YouTube promo (owner-supplied) | https://www.youtube.com/watch?v=tTw8k8Ld-7U |
| TikTok | **[CONFIRM handle.]** |

WhatsApp deep link pattern: `https://wa.me/<number_without_plus>?text=<urlencoded message>`. Prefilled text: "Assalam o Alaikum, I'd like to order: ".

---

## 6. Social proof: use only what is verified

Say "as of [month year]" next to counts, and keep them in config.

- Facebook page: about 32K followers *(from earlier page analysis)*.
- Instagram: about 3.3K to 3.8K followers (figures differ by snapshot; show a rounded "3K+" or omit).
- Vlogger coverage (food creators, not celebrities):
  - Saqib Mobeen, YouTube, about 98K views
  - Zia Tabarak, TikTok, about 256K views
  - Halal Vlogger, Facebook reel, about 9.9K reactions
  - Taste by Kamal, Street Food PK, and other Karachi food vloggers also feature the place.
- Foodpanda: 4.6/5 from 29 ratings on the listing. Recent written reviews there are mixed, mostly about delivery items like karahi, not the nihari. Don't quote reviews unless you can cite them and have permission. Don't cherry-pick or fabricate.
- For videos, **use the platforms' official embed or link-out**. Don't download or re-host creators' footage without permission. Use a lazy-loaded embed with a poster image.

---

## 7. Open questions and risks (confirm with owner)

1. **Foodpanda address mismatch.** The Foodpanda listing's address text mentions Korangi (Plot R-6), not Liaquatabad. It may be a separate outlet or a mislabelled listing. Ask whether there are multiple branches before adding a "Locations" section.
2. Heritage dates (1947 / 1996 / about 5 years). Pick one story and confirm it.
3. Whether the desi ghee is truly from the family's own dairy (a strong selling point if true).
4. Dine-in prices, lassi price, and whether biryani, pulao or a tin-pack product are real offerings.
5. Opening hours and Friday / Saturday-night specials.
6. WhatsApp number and Google Maps pin.
7. The logo, videos, branding videos and promos are already in `public/Jumma Gujjar/` (section 0.1). Check whether that folder has enough food photos (aim for 8 to 15), a transparent SVG/PNG logo and a short tarka clip. Gaps can be filled with downloaded placeholders, then replaced with owned photos. These matter more to the "eye-catching" result than any other input.
8. Language: English with Urdu accents is the proposed default. If the owner wants a full Urdu mode, add an RTL toggle and a language switch to the config.

---

## 8. SEO and technical

- `<title>`: "Jumma Gujjar Nihari | Desi Ghee Tarka Nihari in Liaquatabad, Karachi"
- Meta description: "Slow-cooked beef nihari finished with a sizzling desi ghee tarka. Nalli and maghaz nihari, fresh sheermal and lassi. Liaquatabad, Karachi."
- Add `Restaurant` JSON-LD: name, address, telephone, servesCuisine ("Pakistani, Nihari"), priceRange, openingHours (once confirmed), sameAs (social links), `hasMenu`.
- Open Graph image: hero tarka shot with logo, 1200 x 630.
- Performance: compress images to WebP/AVIF, lazy-load below the fold, keep the hero video under about 2 MB with a poster fallback.
- Accessibility: contrast checks per the palette rules, alt text on all food images, visible focus states, large tap targets (44 px minimum), a `lang="ur"` attribute on Urdu spans.

---

## 9. Copy bank

- Hero H1: **Asli Zaiqa. Asli Tarka.**
- Hero sub: "Slow-cooked beef nihari, finished with a sizzling pour of desi ghee. Liaquatabad, Karachi."
- Signature heading: "The tarka is the whole point."
- Story beat 1: "Simmered overnight until the beef shank melts."
- Story beat 2: "Finished at the table with hot desi ghee."
- Story beat 3: "Best with fresh sheermal, khameeri roti and a cold lassi."
- Order CTA: "Order on WhatsApp"
- Visit heading: "Come hungry. Sit outside. Watch the tarka."
- Footer line: "Jumma Gujjar Nihari, Liaquatabad, Karachi."

---

## 10. Acceptance checklist

- [ ] `public/Jumma Gujjar/` inventoried; manifest written; owner files untouched
- [ ] Logo, hero video and promos from that folder are used; paths with the space are encoded or centralised in config
- [ ] Any downloaded images live in `downloaded/`, are logged with source and placeholder/final status, and have alt text
- [ ] All colours, fonts, radii come from tokens; no stray hex in components
- [ ] Logo, Urdu name and tagline appear in the nav and hero
- [ ] Menu renders from the JSON config, with an indicative-price note
- [ ] WhatsApp, Foodpanda, phone and map CTAs all work on a 390px screen
- [ ] No luxury, celebrity, founding-year or "best in Karachi" claims
- [ ] Every **[CONFIRM]** item is either resolved or a visible placeholder in config
- [ ] Lighthouse mobile: Performance 85 or more, Accessibility 95 or more
- [ ] `prefers-reduced-motion` respected