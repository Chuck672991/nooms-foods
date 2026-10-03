import type { ReactNode } from "react";

/** Uppercase label flanked by thin rules: "— LABEL —" (or "— LABEL"). */
export function Eyebrow({
  children,
  both = false,
  className = "",
}: {
  children: ReactNode;
  /** Rule on both sides (centered layouts). */
  both?: boolean;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${className}`}>
      <span className="eyebrow-rule" aria-hidden="true" />
      <span>{children}</span>
      {both ? <span className="eyebrow-rule" aria-hidden="true" /> : null}
    </p>
  );
}
