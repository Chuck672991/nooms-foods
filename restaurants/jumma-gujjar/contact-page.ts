import { pos } from "../helpers";
import type { ContactPageContent } from "../types";
import { address, foodpandaUrl, phone, whatsappUrl } from "./brand";
import { images } from "./images";

// No contact-form backend or email exists, so "Say hello" uses the channels the business runs.
export const contactPage: ContactPageContent = {
  hero: {
    eyebrow: "Find us",
    title: "Visit *& Order*",
    lead: `${address.area}, Karachi. Dine in or sit outside. Message us for today's timings.`,
    backdrop: pos(images.marrowBowl, "50% 72%"),
    card: { image: pos(images.tarkaPots, "50% 30%"), caption: "Where the tarka happens" },
  },
  channels: {
    eyebrow: "Get in touch",
    title: "Three ways to *order.*",
    lead: "WhatsApp is the quickest. You can also call, or order through Foodpanda.",
    items: [
      {
        icon: "whatsapp",
        title: "WhatsApp",
        copy: "Open a chat with your order message ready. Also best for today's timings.",
        href: whatsappUrl,
        external: true,
        actionLabel: phone.display,
      },
      {
        icon: "phone",
        title: "Call us",
        copy: "Prefer to talk? Ring us to order or ask a question.",
        href: `tel:${phone.e164}`,
        actionLabel: phone.display,
      },
      {
        icon: "bag",
        title: "Foodpanda",
        copy: "Order for delivery through the app.",
        href: foodpandaUrl,
        external: true,
        actionLabel: "Open Foodpanda",
      },
    ],
  },
};
