"use client";

import { useEffect, useRef } from "react";
import { toRgb, type Rgb } from "./canvas-color";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Radius in device pixels. */
  r: number;
  age: number;
  /** Seconds this spark lives. */
  life: number;
  phase: number;
  /** Hot sparks are brighter and glow. */
  hot: boolean;
  /** Burst sparks are short-lived, fast and never respawn. */
  burst: boolean;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];

/**
 * Rising sparks: warm embers drifting up from the bottom of the screen, each
 * swaying on its own sine, flickering, and cooling from the theme's soft
 * primary to its secondary colour as it ages. The fire-and-smoke counterpart
 * of <StarField>.
 *
 *  - `contained={false}`: one fixed full-viewport canvas behind the page (z 0)
 *  - `contained`: fills its (relative) parent, runs only while on screen, and
 *    answers `ember-burst` events dispatched on the parent (detail: {x, y} in
 *    client pixels) with a fountain of sparks
 *  - colours come from the theme (`--primary-soft`, `--primary`, `--secondary`)
 *  - skipped entirely under prefers-reduced-motion
 */
export function Embers({
  contained = false,
  density = 1,
  className = "",
}: {
  contained?: boolean;
  density?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const css = getComputedStyle(canvas);
    const core = toRgb(css.getPropertyValue("--primary-soft"), [255, 226, 122]);
    const mid = toRgb(css.getPropertyValue("--primary"), [255, 202, 8]);
    const heat = toRgb(css.getPropertyValue("--secondary"), [214, 26, 33]);

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w = 0;
    let h = 0;
    let cssW = 0;
    let target = 0;
    let list: Ember[] = [];
    let last = performance.now();
    let frame = 0;
    let visible = true;

    const spawn = (initial: boolean): Ember => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + Math.random() * 40 * dpr,
      vx: (Math.random() - 0.5) * 10 * dpr,
      vy: -(14 + Math.random() * 34) * dpr,
      r: (0.6 + Math.random() * 1.7) * dpr,
      age: initial ? Math.random() * 4 : 0,
      life: 5 + Math.random() * 7,
      phase: Math.random() * Math.PI * 2,
      hot: Math.random() > 0.62,
      burst: false,
    });

    const size = () => {
      const box = contained ? canvas.getBoundingClientRect() : null;
      cssW = box ? box.width : window.innerWidth;
      const cssH = box ? box.height : window.innerHeight;
      w = canvas.width = Math.max(1, Math.round(cssW * dpr));
      h = canvas.height = Math.max(1, Math.round(cssH * dpr));
      target = Math.round(Math.min(contained ? 110 : 64, (cssW * cssH) / (contained ? 9000 : 24000)) * density);
      list = Array.from({ length: target }, () => spawn(true));
    };

    const loop = (now: number) => {
      if (!visible) {
        frame = 0;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      let ambient = 0;
      for (let i = list.length - 1; i >= 0; i--) {
        const e = list[i];
        e.age += dt;
        if (e.burst) e.vy += 150 * dpr * dt;
        e.x += (e.vx + (e.burst ? 0 : Math.sin(e.age * 1.3 + e.phase) * 9 * dpr)) * dt;
        e.y += e.vy * dt;
        const t = e.age / e.life;
        if (t >= 1 || e.y < -20 * dpr || (e.burst && (e.x < -20 * dpr || e.x > w + 20 * dpr))) {
          list.splice(i, 1);
          continue;
        }
        if (!e.burst) ambient++;
        // Fade in over the first 12%, out over the last 45%, flickering throughout.
        const fade = Math.min(1, t / 0.12) * Math.min(1, (1 - t) / 0.45);
        const flicker = 0.62 + 0.38 * Math.sin(e.age * 7 + e.phase);
        const a = Math.max(0, fade * flicker * (e.hot ? 0.95 : 0.6));
        const [r, g, b] = mix(e.hot ? core : mid, heat, Math.pow(t, 0.8));
        ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a.toFixed(3)})`;
        if (e.hot) {
          ctx.shadowBlur = 9 * dpr;
          ctx.shadowColor = `rgba(${mid[0]},${mid[1]},${mid[2]},${(a * 0.7).toFixed(3)})`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Keep the ambient population topped up (one new spark per frame at most).
      if (ambient < target) list.push(spawn(false));
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const onBurst = (ev: Event) => {
      const { x, y } = (ev as CustomEvent<{ x: number; y: number }>).detail;
      const box = canvas.getBoundingClientRect();
      const cx = (x - box.left) * dpr;
      const cy = (y - box.top) * dpr;
      for (let i = 0; i < 42; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
        const speed = (70 + Math.random() * 190) * dpr;
        list.push({
          x: cx + (Math.random() - 0.5) * 24 * dpr,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: (1 + Math.random() * 1.8) * dpr,
          age: 0,
          life: 0.9 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          hot: true,
          burst: true,
        });
      }
      start();
    };

    // Only a width change rebuilds the field (mobile URL-bar resizes are height-only).
    const onResize = () => {
      const next = contained ? canvas.getBoundingClientRect().width : window.innerWidth;
      if (Math.abs(next - cssW) > 1) size();
    };

    size();
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);

    const host = canvas.parentElement;
    let io: IntersectionObserver | undefined;
    if (contained && host) {
      host.addEventListener("ember-burst", onBurst);
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      });
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      host?.removeEventListener("ember-burst", onBurst);
      io?.disconnect();
    };
  }, [contained, density]);

  return (
    <canvas
      ref={ref}
      className={`embers ${contained ? "embers--local" : ""} ${className}`}
      aria-hidden="true"
    />
  );
}
