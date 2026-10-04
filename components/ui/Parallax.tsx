"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll parallax for hero media. The layer sits at a constant 1.08× scale (an
 * over-crop so shifting never reveals an edge) and is translated by
 * `progress × -110px`, where progress runs −1…1 with 0 = host centred in the
 * viewport, so the media drifts slower than the page. Offscreen hosts are
 * skipped; reduced motion leaves the layer static.
 */
export function Parallax({
  children,
  scale = 1.08,
  travel = 110,
}: {
  children: ReactNode;
  scale?: number;
  travel?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const apply = () => {
      frame = 0;
      const vh = window.innerHeight;
      // Measure the (untransformed) host so the layer's own movement can't feed back.
      const r = host.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      const progress = (r.top + r.height / 2 - vh / 2) / vh;
      layer.style.transform = `scale(${scale}) translateY(${(progress * -travel).toFixed(1)}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scale, travel]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 will-change-transform"
      style={{ transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
}
