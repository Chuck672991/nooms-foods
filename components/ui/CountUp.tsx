"use client";

import { useEffect, useRef } from "react";

/**
 * Number that counts up from 0 when scrolled into view (~2s ease-out).
 * The final value is server-rendered, so no-JS and reduced-motion users see
 * the real figure immediately. The animation edits the DOM text directly
 * (no React state) so there are no re-renders per frame.
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 2000,
  delay = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  /** Stagger across columns, in ms. */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const format = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;
    let frame = 0;
    let timer = 0;
    el.textContent = format(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = format(to * eased);
            if (t < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      el.textContent = `${prefix}${to.toLocaleString("en-US")}${suffix}`;
    };
  }, [to, prefix, suffix, duration, delay]);

  return <span ref={ref}>{`${prefix}${to.toLocaleString("en-US")}${suffix}`}</span>;
}
