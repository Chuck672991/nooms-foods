import { pos } from "../helpers";
import type { MenuContent } from "../types";
import { phone, whatsappUrl } from "./brand";
import { images } from "./images";

/**
 * Menu (brief §2). Items, Urdu names and prices are the brief's Foodpanda list,
 * which are DELIVERY prices: the notice says so, and dine-in prices are [CONFIRM].
 *
 * Deliberately NOT here: Haleem (a Foodpanda cuisine tag, no item), biryani and
 * pulao (mentioned in an Instagram bio, not on Foodpanda), the tin pack (seller
 * unverified). The brief's "Fan favourite" badge on Nalli is left off: there is
 * no published sales ranking, so it would be an unverified popularity claim.
 * Lassi has no price until the owner confirms one.
 *
 * Categories without a photo (breads, mains) render as typographic plates
 * instead of stock imagery pretending to be this kitchen's food.
 */
export const menu: MenuContent = {
  hero: {
    eyebrow: "Nihari · Breads · Curries · Lassi",
    title: "The *Menu*",
    lead: "Slow-cooked nihari, fresh sheermal and roti, curries and daal. Hot, rich and made to share.",
    backdrop: pos(images.marrowBowl, "50% 72%"),
    card: { image: pos(images.tarkaPots, "50% 30%"), caption: "The tarka" },
  },

  notice: `Prices shown are indicative delivery prices, and dine-in prices may differ. [WhatsApp us](${whatsappUrl}) or call [${phone.display}](tel:${phone.e164}) to confirm.`,

  navAction: { label: "Call to confirm", href: `tel:${phone.e164}`, icon: "phone" },

  categories: [
    {
      id: "nihari",
      label: "Nihari",
      labelUrdu: "نہاری",
      heading: "Nihari",
      tagline: "finished with a tarka",
      blurb: "Slow-cooked beef in a thick, savoury gravy, with a pour of desi ghee. The reason you're here.",
      image: pos(images.tarkaPots, "50% 35%"),
      photos: [images.marrowBowl, pos(images.tarkaPots, "50% 40%")],
    },
    {
      id: "breads",
      label: "Roti & Sheermal",
      labelUrdu: "روٹی اور شیرمال",
      heading: "Roti, Naan & Sheermal",
      tagline: "fresh and hot",
      blurb: "Milk-enriched sheermal and the breads that belong next to a bowl of nihari.",
    },
    {
      id: "mains",
      label: "Curries & Daal",
      labelUrdu: "سالن اور دال",
      heading: "Curries, Daal & Mains",
      tagline: "for the rest of the table",
      blurb: "Qoorma, karhayi, daal and vegetables to share alongside the nihari.",
    },
    {
      id: "drinks",
      label: "Drinks",
      heading: "Drinks",
      tagline: "cold and creamy",
      blurb: "Something cold to go with the heat.",
      image: images.lassiJug,
      photos: [images.lassiJug],
    },
  ],

  items: [
    {
      id: "desi-ghee-nihari",
      category: "nihari",
      name: "Desi Ghee Wali Nihari",
      nameUrdu: "دیسی گھی والی نہاری",
      description: "Slow-cooked beef nihari finished with a sizzling desi ghee tarka.",
      price: "Rs 850",
      badge: "Signature",
    },
    {
      id: "nalli-nihari",
      category: "nihari",
      name: "Nalli Nihari",
      nameUrdu: "نلی نہاری",
      description: "Rich nihari with succulent bone marrow.",
      price: "Rs 900",
    },
    {
      id: "maghaz-nihari",
      category: "nihari",
      name: "Maghaz Nihari",
      nameUrdu: "مغز نہاری",
      description: "Nihari enriched with delicate brain.",
      price: "Rs 900",
    },
    {
      id: "special-nihari",
      category: "nihari",
      name: "Special Nihari",
      nameUrdu: "اسپیشل نہاری",
      description: "The elevated house nihari with extra garnishes. Serves 1 to 4.",
      price: "Rs 1,200",
      badge: "Sharing size",
    },
    {
      id: "nihari",
      category: "nihari",
      name: "Nihari",
      nameUrdu: "نہاری",
      description: "Classic slow-cooked beef in a thick, savoury gravy.",
      price: "from Rs 750",
    },

    {
      id: "sheermal",
      category: "breads",
      name: "Sheermal",
      description: "Milk-enriched, lightly sweet, golden-baked.",
      price: "Rs 160",
    },
    { id: "taftaan", category: "breads", name: "Taftaan", price: "Rs 140" },
    { id: "roghni-kulcha", category: "breads", name: "Roghni Kulcha", price: "Rs 130" },
    { id: "lahori-kulcha", category: "breads", name: "Lahori Kulcha", price: "Rs 70" },
    { id: "doodh-wali-roti", category: "breads", name: "Doodh Wali Roti", price: "Rs 70" },
    { id: "khameeri-roti", category: "breads", name: "Khameeri Roti", price: "Rs 40" },
    { id: "farmaishi-chapati", category: "breads", name: "Farmaishi Chapati", price: "Rs 25" },

    { id: "beef-qoorma", category: "mains", name: "Beef Qoorma", price: "Rs 450" },
    { id: "chicken-karhayi", category: "mains", name: "Chicken Karhayi", price: "Rs 400" },
    { id: "daal-mash", category: "mains", name: "Daal Mash", price: "Rs 300" },
    { id: "daal-channa", category: "mains", name: "Daal Channa", price: "Rs 200" },
    { id: "sada-chana", category: "mains", name: "Sada Chana", price: "Rs 200" },
    { id: "mix-sabzi", category: "mains", name: "Mix Sabzi", price: "Rs 200" },

    // [CONFIRM] Lassi price (older social captions showed roughly Rs 150: not used).
    {
      id: "lassi",
      category: "drinks",
      name: "Lassi",
      description: "A cold lassi to go with the bowl.",
    },
  ],

  cta: {
    eyebrow: "Hungry?",
    title: "Order your *bowl.*",
    body: "Message us on WhatsApp, call, or come and sit with us in Liaquatabad.",
    image: pos(images.tarkaPots, "50% 35%"),
    buttons: ["order", "visit"],
  },
};
