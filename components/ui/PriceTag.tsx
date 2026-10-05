import { CountUp } from "./CountUp";

/**
 * A preformatted price ("Rs 850", "from Rs 750", "$9.50") whose number counts
 * up when it scrolls into view. Strings without a leading integer render as-is.
 */
export function PriceTag({ price }: { price: string }) {
  const m = /^(\D*)(\d[\d,]*)(.*)$/.exec(price);
  if (!m || m[3].startsWith(".")) return <>{price}</>;
  return <CountUp to={Number(m[2].replace(/,/g, ""))} prefix={m[1]} suffix={m[3]} duration={900} />;
}
