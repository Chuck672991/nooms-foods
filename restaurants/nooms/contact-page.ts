import { pos } from "../helpers";
import type { ContactPageContent } from "../types";
import { address, hours, instagramUrl, messengerUrl, phone, social } from "./brand";
import { images } from "./images";

// No contact-form backend or email address exists yet, so "Say hello" uses
// the channels the business actually runs.
export const contactPage: ContactPageContent = {
  hero: {
    eyebrow: "Find us",
    title: "Visit *Us*",
    lead: `${address.area}, on Shahrah-e-Faisal. Evenings, ${hours.short}.`,
    backdrop: pos(images.storefrontNight, "50% 28%"),
    card: { image: pos(images.storefrontDay, "50% 40%"), caption: "Look for the sign" },
  },
  channels: {
    eyebrow: "Say hello",
    title: "Drop us a *line.*",
    lead: "The quickest way to reach us is a call or a message. Pick whichever suits you.",
    items: [
      {
        icon: "phone",
        title: "Call us",
        copy: "Takeaway, home delivery or a quick question.",
        href: `tel:${phone.e164}`,
        actionLabel: phone.display,
      },
      {
        icon: "instagram",
        title: "Instagram",
        copy: "Send us a message or see what's cooking.",
        href: instagramUrl,
        external: true,
        actionLabel: social[0].handle ?? "Instagram",
      },
      {
        icon: "messenger",
        title: "Messenger",
        copy: "Message us on our Facebook page.",
        href: messengerUrl,
        external: true,
        actionLabel: "Open Messenger",
      },
    ],
  },
};
