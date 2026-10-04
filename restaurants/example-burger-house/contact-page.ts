import type { ContactPageContent } from "../types";
import { address, email, hours, instagramUrl, phone } from "./brand";
import { images } from "./images";

export const contactPage: ContactPageContent = {
  hero: {
    eyebrow: "Find us",
    title: "Visit *Us*",
    lead: `${address.area}. ${hours.headline}.`,
    backdrop: images.storefront,
    card: { image: images.room2, caption: "The counter" },
  },
  channels: {
    eyebrow: "Say hello",
    title: "Drop us a *line.*",
    lead: "Questions, large groups or feedback: pick whichever suits you.",
    items: [
      { icon: "phone", title: "Call us", copy: "Quick questions and group bookings.", href: `tel:${phone.e164}`, actionLabel: phone.display },
      { icon: "mail", title: "Email", copy: "Allergies, events and feedback.", href: `mailto:${email}`, actionLabel: "Send an email" },
      { icon: "instagram", title: "Instagram", copy: "Send us a message.", href: instagramUrl, external: true, actionLabel: "@exampleburgerhouse" },
    ],
  },
};
