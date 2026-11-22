"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────
   DuckFooter
   Pixel duck drifting through a dot-field. Follows the cursor,
   quacks (sound + bubble) on click. Themed by isDark + accent.

   Sound: put your clip at /public/quack.mp3 (or pass soundSrc).
   If the file is missing or blocked, a synthesized quack plays.
   ───────────────────────────────────────────────────────────── */

type Props = {
  isDark?: boolean; // omit to auto-detect from <html class="dark">
  accent?: string; // hex; omit to use the site's green for the current theme
  soundSrc?: string;
  showTagline?: boolean; // "Recently moved to Delhi…" text under the canvas
};

type Star = { x: number; y: number; t: 0 | 1 | 2; p: number };
type Pt = { x: number; y: number };

const DUCK = [
  "......yyy...",
  ".....yyyyy..",
  ".....yeyyooo",
  ".....yyyyoo.",
  "......yyy...",
  "yy...yyyyy..",
  "yyyyyyyyyyy.",
  ".yywwwyyyyy.",
  "..yywwwyyy..",
  "...yyyyyy...",
  "....o..o....",
];
const FEET_B = ".....o.o....";
const DEPTH = [8, 16, 28];
const PX = 4;

function hexToRgb(hex: string): string {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

/* ── Synth fallback (only used if the mp3 can't play) ── */
let audioCtx: AudioContext | null = null;
function synthQuack() {
  try {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") void audioCtx.resume();
    const a = audioCtx;
    const m = 0.92 + Math.random() * 0.16;
    const t0 = a.currentTime + 0.01;
    const bursts: [number, number, number, number][] = [
      [0, 560, 300, 0.14],
      [0.19, 520, 270, 0.16],
    ];
    bursts.forEach(([off, f0, f1, d]) => {
      const s = t0 + off;
      const f = a.createBiquadFilter();
      const g = a.createGain();
      f.type = "bandpass";
      f.frequency.value = 1200;
      f.Q.value = 2.5;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.35, s + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, s + d + 0.04);
      f.connect(g);
      g.connect(a.destination);
      [0, 14].forEach((det) => {
        const o = a.createOscillator();
        o.type = "sawtooth";
        o.detune.value = det;
        o.frequency.setValueAtTime(f0 * m, s);
        o.frequency.exponentialRampToValueAtTime(f1 * m, s + d);
        o.connect(f);
        o.start(s);
        o.stop(s + d + 0.06);
      });
    });
  } catch {
    /* audio unavailable — stay silent */
  }
}

function playQuack(src: string) {
  let fellBack = false;
  const fallback = () => {
    if (fellBack) return;
    fellBack = true;
    synthQuack();
  };
  try {
    const a = new Audio(src) as HTMLAudioElement & {
      preservesPitch?: boolean;
      webkitPreservesPitch?: boolean;
    };
    a.preservesPitch = false;
    a.webkitPreservesPitch = false;
    a.playbackRate = 0.9 + Math.random() * 0.2;
    a.volume = 0.8;
    a.addEventListener("error", fallback, { once: true });
    a.play().catch(fallback);
  } catch {
    fallback();
  }
}

export default function DuckFooter({
  isDark: isDarkProp,
  accent: accentProp,
  soundSrc = "/quack.mp3",
  showTagline = true,
}: Props) {
  const [autoDark, setAutoDark] = useState(false);
  useEffect(() => {
    const html = document.documentElement;
    const update = () => setAutoDark(html.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  const isDark = isDarkProp ?? autoDark;
  const accent = accentProp ?? (isDark ? "#4ade80" : "#16a34a");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef({ isDark, accent });
  const redrawRef = useRef<(() => void) | null>(null);

  themeRef.current = { isDark, accent };

  // repaint static frame when the theme flips (reduced-motion users)
  useEffect(() => {
    redrawRef.current?.();
  }, [isDark, accent]);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;

    const s = {
      stars: [] as Star[],
      moon: [] as [number, number][],
      dia: [] as [number, number][],
      trail: [] as Pt[],
      par: 0,
      dx: 0,
      dy: 0,
      face: 1,
      quack: -99999,
      pt: { x: 0, y: 0, t: -99999 },
    };

    const build = () => {
      const cy = h * 0.5;
      const moonOn = w > 420;
      s.stars = [];
      s.moon = [];
      s.dia = [];
      for (let gx = 14; gx < w - 14; gx += 34) {
        for (let gy = 14; gy < h - 14; gy += 34) {
          if (Math.random() < 0.28) continue;
          const sx = gx + Math.random() * 26;
          const sy = gy + Math.random() * 26;
          if (moonOn && Math.hypot(sx - 70, sy - cy) < 54) continue;
          if (Math.hypot(sx - w / 2, sy - h / 2) < 30) continue;
          const r = Math.random();
          s.stars.push({
            x: sx,
            y: sy,
            t: r < 0.68 ? 0 : r < 0.94 ? 1 : 2,
            p: Math.random() * 6.28,
          });
        }
      }
      if (moonOn) {
        for (let mx = 30; mx < 112; mx += 6) {
          for (let my = cy - 46; my < cy + 46; my += 6) {
            if (
              Math.hypot(mx - 70, my - cy) < 40 &&
              Math.hypot(mx - 88, my - cy) > 36
            )
              s.moon.push([mx, my]);
          }
        }
      }
      for (let i = -3; i <= 3; i++) {
        for (let j = -3; j <= 3; j++) {
          if (Math.abs(i) + Math.abs(j) <= 3)
            s.dia.push([w - 76 + i * 6, h * 0.68 + j * 6]);
        }
      }
      s.dx = Math.min(Math.max(s.dx || w / 2, 54), w - 54);
      s.dy = s.dy || h * 0.45;
    };

    const draw = (t: number) => {
      const { isDark: dark, accent: acHex } = themeRef.current;
      const acc = hexToRgb(acHex);
      const st = dark ? "156,163,175" : "107,114,128";
      const sb = dark ? "209,213,219" : "75,85,99";
      const k = dark ? 1 : 1.5;
      const c: Record<string, string> = dark
        ? { y: "#facc15", w: "#ca8a04", o: "#f97316", e: "#0a0a0a" }
        : { y: "#fbbf24", w: "#d97706", o: "#ea580c", e: "#111827" };

      ctx.clearRect(0, 0, w, h);

      const near = t - s.pt.t < 2000;
      s.par += ((near ? (s.pt.x - w / 2) / w : 0) - s.par) * 0.05;

      s.stars.forEach((star) => {
        const tw = 0.5 + 0.5 * Math.sin(t * 0.002 + star.p);
        const ox = star.x - s.par * DEPTH[star.t];
        if (star.t === 0) {
          ctx.fillStyle = `rgba(${st},${Math.min(1, (0.12 + 0.25 * tw) * k)})`;
          ctx.fillRect(ox, star.y, 1, 1);
        } else if (star.t === 1) {
          ctx.fillStyle = `rgba(${st},${Math.min(1, (0.2 + 0.4 * tw) * k)})`;
          ctx.fillRect(ox, star.y, 1.6, 1.6);
        } else {
          ctx.fillStyle = `rgba(${sb},${0.5 + 0.5 * tw})`;
          ctx.fillRect(ox, star.y, 2, 2);
          if (tw > 0.6) {
            ctx.fillStyle = `rgba(${acc},${0.6 * tw})`;
            ctx.fillRect(ox - 3, star.y + 0.5, 3, 1);
            ctx.fillRect(ox + 2, star.y + 0.5, 3, 1);
            ctx.fillRect(ox + 0.5, star.y - 3, 1, 3);
            ctx.fillRect(ox + 0.5, star.y + 2, 1, 3);
          }
        }
      });

      ctx.fillStyle = `rgba(${acc},0.3)`;
      s.moon.forEach((m) => {
        ctx.beginPath();
        ctx.arc(m[0] - s.par * 4, m[1], 1.4, 0, 6.2832);
        ctx.fill();
      });
      s.dia.forEach((m, n) => {
        ctx.fillStyle = `rgba(${acc},${0.12 + 0.22 * (0.5 + 0.5 * Math.sin(t * 0.0012 + n * 0.4))})`;
        ctx.beginPath();
        ctx.arc(m[0] - s.par * 4, m[1], 1.2, 0, 6.2832);
        ctx.fill();
      });

      let tx = near ? s.pt.x : w / 2 + Math.cos(t * 0.0005) * w * 0.3;
      let ty = near ? s.pt.y : h * 0.42 + Math.sin(t * 0.0008) * h * 0.16;
      tx = Math.max(54, Math.min(w - 54, tx));
      ty = Math.max(50, Math.min(h - 72, ty));
      const vx = tx - s.dx;
      const moving = Math.abs(vx) > 8;
      s.dx += vx * 0.035;
      s.dy += (ty - s.dy) * 0.035;
      if (Math.abs(vx) > 6) s.face = vx > 0 ? 1 : -1;

      const last = s.trail[s.trail.length - 1];
      if (!last || Math.hypot(s.dx - last.x, s.dy - last.y) > 12) {
        s.trail.push({ x: s.dx, y: s.dy });
        if (s.trail.length > 10) s.trail.shift();
      }
      s.trail.forEach((p, n) => {
        const q = n / 10;
        const sz = 2 + q * 2;
        ctx.fillStyle = `rgba(${acc},${q * 0.35})`;
        ctx.fillRect(p.x - sz / 2, p.y + 14, sz, sz);
      });

      const floor = h - 36;
      const sh = Math.max(0.05, 0.35 * (s.dy / (h - 72)));
      ctx.fillStyle = `rgba(${acc},${sh})`;
      [-12, -4, 4, 12].forEach((d) => ctx.fillRect(s.dx + d - 1.5, floor, 3, 2));

      const bob = moving
        ? -Math.abs(Math.sin(t * 0.008)) * 4
        : Math.sin(t * 0.004) * 2;
      const ox = s.dx - 24;
      const oy = s.dy - 22 + bob;
      const flip = s.face < 0;
      for (let r = 0; r < DUCK.length; r++) {
        const row =
          r === 10 && moving && Math.floor(t / 140) % 2 ? FEET_B : DUCK[r];
        for (let q = 0; q < 12; q++) {
          const ch = row[q];
          if (ch === ".") continue;
          ctx.fillStyle = c[ch];
          ctx.fillRect(ox + (flip ? 11 - q : q) * PX, oy + r * PX, PX, PX);
        }
      }
      if (t % 4200 < 160) {
        const ex = ox + (flip ? 5 : 6) * PX;
        ctx.fillStyle = c.y;
        ctx.fillRect(ex, oy + 2 * PX, PX, PX);
        ctx.fillStyle = c.e;
        ctx.fillRect(ex, oy + 2 * PX + 2, PX, 2);
      }

      if (t - s.quack < 1400) {
        ctx.fillStyle = acHex;
        ctx.font = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText(
          "> quack!",
          Math.max(8, Math.min(ox + 44, w - 80)),
          oy - 8,
        );
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = visible ? requestAnimationFrame(loop) : 0;
    };
    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const r = cv.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = r.width;
      h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      if (reduce) draw(0);
    };

    const onMove = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      s.pt = { x: e.clientX - b.left, y: e.clientY - b.top, t: performance.now() };
    };
    const onLeave = () => {
      s.pt.t = -99999;
    };
    const onClick = () => {
      s.quack = performance.now();
      playQuack(soundSrc);
      if (reduce) draw(s.quack);
    };

    resize();
    redrawRef.current = () => {
      if (reduce) draw(0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(cv);

    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerleave", onLeave);
    cv.addEventListener("click", onClick);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerleave", onLeave);
      cv.removeEventListener("click", onClick);
      redrawRef.current = null;
    };
  }, [soundSrc]);

  const textMid = isDark ? "#9ca3af" : "#6b7280";

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="A pixel duck that follows your cursor. Click it to quack."
        className="block w-full cursor-pointer"
        style={{ height: 250 }}
      />

      {showTagline && (
        <>
          <p className="text-sm mt-1 text-center" style={{ color: "#9ca3af" }}>
            Recently moved to Delhi —
          </p>
          <p
            className="text-sm mt-1 mb-8 text-center"
            style={{ color: textMid }}
          >
            feel free to reach out for coffee or collaboration.
          </p>
        </>
      )}
    </div>
  );
}