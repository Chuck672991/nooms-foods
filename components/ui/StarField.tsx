"use client";

import { useEffect, useRef } from "react";
import { toRgb } from "./canvas-color";

type Star = {
  x: number;
  y: number;
  /** Depth 0.1–1.0: scales parallax strength and twinkle speed. */
  z: number;
  /** Radius in device pixels. */
  r: number;
  /** Twinkle phase offset. */
  tw: number;
  /** ~18% of stars are tinted with the brand's soft accent and glow. */
  gold: boolean;
};

/**
 * Twinkling starfield: a single fixed, full-viewport canvas behind the page
 * (z-index 0, pointer-events none) that shows through every transparent dark
 * section. Colours come from the active theme (foreground + soft accent).
 *
 *  - density-based: viewport area ÷ 9000, capped at 180 stars
 *  - each star pulses 40–100% on its own sine timer (speed from depth, own phase)
 *  - mouse parallax (nearer stars move more) + a slow scroll drift that wraps
 *  - skipped entirely under prefers-reduced-motion
 */
export function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(document.documentElement);
    const cream = toRgb(css.getPropertyValue("--foreground"), [246, 241, 231]);
    const gold = toRgb(css.getPropertyValue("--primary-soft"), [233, 205, 138]);

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const mouse = { x: 0.5, y: 0.5 };
    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let builtFor = 0;
    let t = 0;
    let frame = 0;

    const setup = () => {
      w = canvas.width = window.innerWidth * dpr;
      h = canvas.height = window.innerHeight * dpr;
      const n = Math.min(180, Math.floor((window.innerWidth * window.innerHeight) / 9000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.9 + 0.1,
        r: (Math.random() * 1.1 + 0.3) * dpr,
        tw: Math.random() * Math.PI * 2,
        gold: Math.random() > 0.82,
      }));
      builtFor = window.innerWidth;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;
      const scrollY = window.scrollY;
      for (const s of stars) {
        const px = (mouse.x - 0.5) * s.z * 26 * dpr;
        const py = (mouse.y - 0.5) * s.z * 26 * dpr - ((scrollY * s.z * 0.15 * dpr) % h);
        let yy = (s.y + py) % h;
        if (yy < 0) yy += h;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(s.tw + t * s.z * 2));
        ctx.beginPath();
        ctx.arc(s.x + px, yy, s.r, 0, Math.PI * 2);
        if (s.gold) {
          ctx.fillStyle = `rgba(${gold[0]},${gold[1]},${gold[2]},${tw * 0.9})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${gold[0]},${gold[1]},${gold[2]},.6)`;
        } else {
          ctx.fillStyle = `rgba(${cream[0]},${cream[1]},${cream[2]},${tw * 0.6})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };
    // Only a width change rebuilds the field: mobile URL-bar show/hide resizes
    // the height constantly and would otherwise reshuffle every star.
    const onResize = () => {
      if (window.innerWidth !== builtFor) setup();
    };

    setup();
    frame = requestAnimationFrame(draw);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="starfield" aria-hidden="true" />;
}
