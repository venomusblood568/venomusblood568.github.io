"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Hex {
  cx: number;
  cy: number;
  size: number;
  e: number;
  phase: number;
  bright: boolean;
}

interface Shock {
  x: number;
  y: number;
  r: number;
  life: number;
  maxLife: number;
}

interface HexBackgroundProps {
  accentColor?: string;
  isDark?: boolean;
}

export default function HexBackground({
  accentColor,
  isDark: isDarkProp,
}: HexBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDarkInternal, setIsDarkInternal] = useState(false);
  const isDark = isDarkProp !== undefined ? isDarkProp : isDarkInternal;
  const accent = accentColor ?? (isDark ? "#4ade80" : "#16a34a");

  useEffect(() => {
    if (isDarkProp !== undefined) return;
    const html = document.documentElement;
    const update = () => setIsDarkInternal(html.classList.contains("dark"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [isDarkProp]);

  const stateRef = useRef({
    mx: -9999,
    my: -9999,
    frame: 0,
    hexes: [] as Hex[],
    shocks: [] as Shock[],
    W: 0,
    H: 0,
    isMobile: false,
    raf: 0,
    isDark,
    accentColor: accent,
  });

  useEffect(() => {
    stateRef.current.isDark = isDark;
    stateRef.current.accentColor = accent;
  }, [isDark, accent]);

  const parseColor = useCallback((hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }, []);

  const buildGrid = useCallback((W: number, H: number, isMobile: boolean) => {
    const hexes: Hex[] = [];
    const size = isMobile ? 32 : 26;
    const w = size * 2;
    const h = Math.sqrt(3) * size;
    const cols = Math.ceil(W / (w * 0.75)) + 2;
    const rows = Math.ceil(H / h) + 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * w * 0.75 - w * 0.5;
        const cy = r * h + (c % 2 === 1 ? h / 2 : 0) - h * 0.5;
        hexes.push({
          cx,
          cy,
          size,
          e: 0,
          phase: Math.random() * Math.PI * 2,
          bright: Math.random() > 0.95,
        });
      }
    }
    return hexes;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current!;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    const S = stateRef.current;

    function rgba(a: number) {
      const [r, g, b] = parseColor(S.accentColor);
      return `rgba(${r},${g},${b},${a.toFixed(3)})`;
    }

    function restingBorder() {
      return S.isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.035)";
    }

    function hexPts(cx: number, cy: number, sz: number) {
      return Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        return [cx + Math.cos(a) * sz, cy + Math.sin(a) * sz];
      });
    }

    function easeOut(t: number) {
      return 1 - Math.pow(1 - Math.min(1, t), 3);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.isMobile = window.innerWidth < 768;
      S.W = window.innerWidth;
      S.H = window.innerHeight;
      canvas.width = S.W * dpr;
      canvas.height = S.H * dpr;
      canvas.style.width = S.W + "px";
      canvas.style.height = S.H + "px";
      ctx.scale(dpr, dpr);
      S.hexes = buildGrid(S.W, S.H, S.isMobile);
    }

    let lastTouch = 0;

    function onMouseMove(e: MouseEvent) {
      S.mx = e.clientX;
      S.my = e.clientY;
    }

    function onTouchMove(e: TouchEvent) {
      const now = Date.now();
      if (now - lastTouch < 32) return;
      lastTouch = now;
      S.mx = e.touches[0].clientX;
      S.my = e.touches[0].clientY;
    }

    function onTouchEnd() {
      setTimeout(() => {
        S.mx = -9999;
        S.my = -9999;
      }, 800);
    }

    function onInteract(e: MouseEvent | TouchEvent) {
      const isTouch = "changedTouches" in e;
      const x = isTouch
        ? (e as TouchEvent).changedTouches[0].clientX
        : (e as MouseEvent).clientX;
      const y = isTouch
        ? (e as TouchEvent).changedTouches[0].clientY
        : (e as MouseEvent).clientY;
      S.shocks.push({ x, y, r: 0, life: 28, maxLife: 28 });
      S.shocks.push({ x, y, r: 12, life: 22, maxLife: 22 });
    }

    const getRadius = () => (S.isMobile ? 85 : 120);

    function draw() {
      S.raf = requestAnimationFrame(draw);
      S.frame++;
      const { W, H, mx, my, frame, isMobile } = S;

      ctx.clearRect(0, 0, W, H);
      S.shocks = S.shocks.filter((s) => s.life > 0);
      S.shocks.forEach((s) => {
        s.r += isMobile ? 4 : 4.5;
        s.life--;
      });

      const R = getRadius();
      const skip = isMobile && frame % 2 !== 0;

      S.hexes.forEach((h) => {
        const dx = h.cx - mx,
          dy = h.cy - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        let inf = Math.max(0, 1 - d / R);

        S.shocks.forEach((s) => {
          const sd = Math.sqrt((h.cx - s.x) ** 2 + (h.cy - s.y) ** 2);
          const ring = Math.abs(sd - s.r);
          inf = Math.max(
            inf,
            Math.max(0, 1 - ring / 26) * (s.life / s.maxLife),
          );
        });

        h.e += (inf - h.e) * (isMobile ? 0.06 : 0.09);
        h.phase += isMobile ? 0.012 : 0.02;

        const e = h.e;
        const pts = hexPts(h.cx, h.cy, h.size);

        if (e < 0.03) {
          ctx.beginPath();
          pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
          ctx.closePath();
          ctx.strokeStyle = restingBorder();
          ctx.lineWidth = 0.4;
          ctx.stroke();
          return;
        }

        if (skip && e < 0.12) return;

        const eo = easeOut(e);
        const gox =
          !isMobile && e > 0.7 && frame % 7 < 2
            ? (Math.random() - 0.5) * e * 3.5
            : 0;
        const goy =
          !isMobile && e > 0.7 && frame % 7 < 2
            ? (Math.random() - 0.5) * e * 3.5
            : 0;
        const gPts = gox || goy ? hexPts(h.cx + gox, h.cy + goy, h.size) : pts;
        const iPts = hexPts(h.cx + gox, h.cy + goy, h.size * 0.7);

        ctx.beginPath();
        gPts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.fillStyle = rgba(eo * 0.04);
        ctx.fill();

        ctx.beginPath();
        gPts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.closePath();
        ctx.strokeStyle = rgba(0.03 + eo * 0.28);
        ctx.lineWidth = e > 0.55 ? 0.75 : 0.35;
        ctx.stroke();

        if (!isMobile && e > 0.22) {
          ctx.beginPath();
          iPts.forEach(([x, y], i) =>
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y),
          );
          ctx.closePath();
          ctx.strokeStyle = rgba((e - 0.22) * 0.14);
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }

        if (e > 0.42) {
          const pulse = Math.sin(h.phase * 3) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(h.cx + gox, h.cy + goy, 1 + pulse * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = rgba((e - 0.42) * 0.55);
          ctx.fill();
        }

        if (!isMobile && h.bright && e > 0.68 && frame % 11 < 2) {
          ctx.beginPath();
          gPts.forEach(([x, y], i) =>
            i ? ctx.lineTo(x, y) : ctx.moveTo(x, y),
          );
          ctx.closePath();
          ctx.fillStyle = `rgba(255,255,255,${((e - 0.68) * 0.1).toFixed(3)})`;
          ctx.fill();
        }
      });

      S.shocks.forEach((s) => {
        const a = s.life / s.maxLife;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(a * 0.3);
        ctx.lineWidth = 0.8;
        ctx.stroke();
        if (s.r > 16) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r - 9, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255,255,255,${(a * 0.07).toFixed(3)})`;
          ctx.lineWidth = 0.35;
          ctx.stroke();
        }
      });
    }

    resize();
    draw();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("click", onInteract);
    window.addEventListener("touchstart", onInteract, { passive: true });

    return () => {
      cancelAnimationFrame(S.raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("click", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, [buildGrid, parseColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
