import type { Action, Img } from "./types";

/**
 * Small builders used by restaurant configs so values like the phone number
 * or map query are written once and everything derived from them stays in
 * sync. These are authoring helpers only; they contain no restaurant data.
 */

/** Google Maps URLs derived from one search query (address or Plus Code + city). */
export function mapLinks(query: string) {
  const q = encodeURIComponent(query);
  return {
    directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
    open: `https://www.google.com/maps/search/?api=1&query=${q}`,
    embed: `https://www.google.com/maps?q=${q}&output=embed`,
  };
}

/** "Order" by phone call. Swap for an ordering-platform link when one exists. */
export function phoneAction(phone: { display: string; e164: string }): Action {
  return {
    label: "Order",
    longLabel: "Call to order",
    href: `tel:${phone.e164}`,
    detail: phone.display,
    srHint: `by calling ${phone.display}`,
  };
}

/** "Order" on WhatsApp with a prefilled message (`number` without "+", e.g. from `e164`). */
export function whatsappAction(
  phone: { display: string; e164: string },
  message: string,
): Action {
  return {
    label: "Order",
    longLabel: "Order on WhatsApp",
    href: `https://wa.me/${phone.e164.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
    external: true,
    destination: "WhatsApp",
    detail: phone.display,
    srHint: "on WhatsApp",
  };
}

/** "Visit" via Google Maps directions. Swap for a reservation link when one exists. */
export function directionsAction(directionsHref: string): Action {
  return {
    label: "Find us",
    longLabel: "Get directions",
    href: directionsHref,
    external: true,
    destination: "Google Maps directions",
  };
}

/** Same image with a different crop focus, e.g. `pos(photo, "50% 30%")`. */
export const pos = (img: Img, position: string): Img => ({ ...img, position });

/** Logo artwork: shown whole on a light tile instead of cropped. */
export const contain = (img: Img): Img => ({ ...img, fit: "contain" });
