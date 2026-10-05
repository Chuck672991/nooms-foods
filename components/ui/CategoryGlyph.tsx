import { Urdu } from "./Urdu";

/**
 * Typographic stand-in for a category photo: the category's name set large in
 * the accent colour over a warm radial glow with faint concentric rings.
 * Used where the restaurant has no honest photo of that category yet, so no
 * stock imagery has to pretend to be its food. Prefers the Urdu label.
 */
export function CategoryGlyph({
  label,
  labelUrdu,
  className = "",
}: {
  label: string;
  labelUrdu?: string;
  className?: string;
}) {
  return (
    <div className={`glyph-plate ${className}`} aria-hidden="true">
      {labelUrdu ? (
        <Urdu className="glyph-plate__text">{labelUrdu}</Urdu>
      ) : (
        <span className="glyph-plate__text display">{label}</span>
      )}
    </div>
  );
}
