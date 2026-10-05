"use client";

import { useEffect, useRef } from "react";
import { toRgb, type Rgb } from "./canvas-color";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Drawn size in CSS px (the sprite already contains its own glow). */
  size: number;
  age: number;
  /** Seconds this spark lives. */
  life: number;
  phase: number;
  /** Hot sparks are brighter. */
  hot: boolean;
  /** Burst sparks are short-lived, fast and never respawn. */
  burst: boolean;
};

/** A soft round glow, pre-rendered once so every spark is a single cheap drawImage. */
function makeSprite(rgb: Rgb): HTMLCanvasElement {
  const s = 32;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const g = c.getContext("2d");
  if (g) {
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    const [r, gr, b] = rgb;
    grad.addColorStop(0, `rgba(${r},${gr},${b},1)`);
    grad.addColorStop(0.18, `rgba(${r},${gr},${b},0.85)`);
    grad.addColorStop(0.5, `rgba(${r},${gr},${b},0.22)`);
    grad.addColorStop(1, `rgba(${r},${gr},${b},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  }
  return c;
}

const FRAME_MS = 1000 / 30;

/**
 * Rising sparks: warm embers drifting up from the bottom, each swaying on its
 * own sine, flickering, and cooling from the theme's soft primary to its
 * secondary colour as it ages. The fire-and-smoke counterpart of <StarField>.
 *
 *  - `contained={false}`: one fixed full-viewport canvas behind the page (z 0)
 *  - `contained`: fills its (relative) parent, runs only while on screen, and
 *    answers `ember-burst` events dispatched on the parent (detail: {x, y} in
 *    client pixels) with a fountain of sparks
 *  - colours come from the theme (`--primary-soft`, `--primary`, `--secondary`)
 *  - skipped entirely under prefers-reduced-motion
 *
 * Built to be cheap, because it is decoration: sprites instead of per-spark
 * gradients/shadows, a 30 fps cap, 1× pixel density (the glow is soft anyway),
 * and no CSS blend modes. It also watches its own frame rate: if the page is
 * struggling it sheds half its sparks, and if it still is, it switches itself off.
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
    const sprites = {
      core: makeSprite(toRgb(css.getPropertyValue("--primary-soft"), [255, 226, 112])),
      mid: makeSprite(toRgb(css.getPropertyValue("--primary"), [255, 202, 8])),
      heat: makeSprite(toRgb(css.getPropertyValue("--secondary"), [214, 26, 33])),
    };

    let w = 0;
    let h = 0;
    let target = 0;
    let scale = 1; // 1 → 0.5 when the governor sheds load
    let list: Ember[] = [];
    let last = performance.now();
    let lastDraw = 0;
    let frame = 0;
    let visible = true;
    let alive = true;
    // Frame-rate governor: rAF interval samples.
    let samples = 0;
    let slow = 0;
    let lastTick = 0;
    let strikes = 0;
    /** Ignore frame-rate samples until then (hydration, image decode and first paint are slow for everyone). */
    let warmUntil = performance.now() + 2500;

    const spawn = (initial: boolean): Ember => ({
      x: Math.random() * w,
      y: initial ? Math.random() * h : h + Math.random() * 40,
      vx: (Math.random() - 0.5) * 10,
      vy: -(14 + Math.random() * 34),
      size: 4 + Math.random() * 9,
      age: initial ? Math.random() * 4 : 0,
      life: 5 + Math.random() * 7,
      phase: Math.random() * Math.PI * 2,
      hot: Math.random() > 0.62,
      burst: false,
    });

    const size = () => {
      const box = contained ? canvas.getBoundingClientRect() : null;
      w = canvas.width = Math.max(1, Math.round(box ? box.width : window.innerWidth));
      h = canvas.height = Math.max(1, Math.round(box ? box.height : window.innerHeight));
      target = Math.round(Math.min(contained ? 70 : 40, (w * h) / (contained ? 14000 : 36000)) * density * scale);
      list = Array.from({ length: target }, () => spawn(true));
    };

    const stop = () => {
      alive = false;
      cancelAnimationFrame(frame);
      frame = 0;
      ctx.clearRect(0, 0, w, h);
      canvas.style.display = "none";
    };

    const loop = (now: number) => {
      if (!alive) return;
      if (!visible) {
        frame = 0;
        return;
      }
      // Governor: judge the page's frame rate, not our own cost (the expensive part is compositing).
      if (now > warmUntil && lastTick && now - lastTick < 250) {
        samples++;
        if (now - lastTick > 50) slow++;
        if (samples >= 90) {
          if (slow / samples > 0.5) {
            strikes++;
            if (strikes === 1) {
              scale = 0.5;
              target = Math.round(target * 0.5);
              list.length = Math.min(list.length, target);
            } else {
              stop();
              return;
            }
          }
          samples = slow = 0;
        }
      }
      lastTick = now;

      if (now - lastDraw < FRAME_MS - 2) {
        frame = requestAnimationFrame(loop);
        return;
      }
      lastDraw = now;
      const dt = Math.min(0.08, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      let ambient = 0;
      for (let i = list.length - 1; i >= 0; i--) {
        const e = list[i];
        e.age += dt;
        if (e.burst) e.vy += 150 * dt;
        e.x += (e.vx + (e.burst ? 0 : Math.sin(e.age * 1.3 + e.phase) * 9)) * dt;
        e.y += e.vy * dt;
        const t = e.age / e.life;
        if (t >= 1 || e.y < -20 || (e.burst && (e.x < -20 || e.x > w + 20))) {
          list.splice(i, 1);
          continue;
        }
        if (!e.burst) ambient++;
        // Fade in over the first 12%, out over the last 45%, flickering throughout.
        const fade = Math.min(1, t / 0.12) * Math.min(1, (1 - t) / 0.45);
        const flicker = 0.62 + 0.38 * Math.sin(e.age * 7 + e.phase);
        const a = fade * flicker * (e.hot ? 0.95 : 0.6);
        if (a < 0.02) continue;
        const sprite = t < 0.45 ? (e.hot ? sprites.core : sprites.mid) : t < 0.75 ? sprites.mid : sprites.heat;
        const d = e.size * (e.hot ? 1.5 : 1.15);
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, e.x - d / 2, e.y - d / 2, d, d);
      }
      ctx.globalAlpha = 1;

      // Keep the ambient population topped up (one new spark per drawn frame at most).
      if (ambient < target) list.push(spawn(false));
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (frame || !alive) return;
      last = performance.now();
      lastTick = 0;
      warmUntil = last + 1500;
      samples = slow = 0;
      frame = requestAnimationFrame(loop);
    };

    const onBurst = (ev: Event) => {
      const { x, y } = (ev as CustomEvent<{ x: number; y: number }>).detail;
      const box = canvas.getBoundingClientRect();
      const cx = x - box.left;
      const cy = y - box.top;
      for (let i = 0; i < 30; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
        const speed = 70 + Math.random() * 190;
        list.push({
          x: cx + (Math.random() - 0.5) * 24,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 6 + Math.random() * 8,
          age: 0,
          life: 0.9 + Math.random() * 1.1,
          phase: Math.random() * Math.PI * 2,
          hot: true,
          burst: true,
        });
      }
      start();
    };

    // Only a size change rebuilds the field (mobile URL-bar resizes are height-only for the fixed one).
    let builtW = 0;
    const onResize = () => {
      const next = contained ? canvas.getBoundingClientRect().width : window.innerWidth;
      if (Math.abs(next - builtW) > 1) {
        size();
        builtW = next;
      }
    };

    size();
    builtW = w;
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);

    // Bursts bubble up to the section that owns the stage, not necessarily the canvas's parent.
    const host = canvas.closest<HTMLElement>("[data-ember-host]") ?? canvas.parentElement;
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
      alive = false;
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
