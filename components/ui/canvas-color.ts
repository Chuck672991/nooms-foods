export type Rgb = [number, number, number];

/** Resolve any CSS colour string (hex, rgb(), named…) to RGB with a 1×1 canvas. */
export function toRgb(value: string, fallback: Rgb): Rgb {
  const probe = document.createElement("canvas");
  probe.width = probe.height = 1;
  const c = probe.getContext("2d", { willReadFrequently: true });
  if (!c || !value.trim()) return fallback;
  c.fillStyle = "#000";
  c.fillStyle = value.trim();
  c.fillRect(0, 0, 1, 1);
  const [r, g, b] = c.getImageData(0, 0, 1, 1).data;
  return [r, g, b];
}
