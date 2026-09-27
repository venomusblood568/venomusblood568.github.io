"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const RADIUS = 18;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const IDLE_HIDE_MS = 2000;
const SHOW_AFTER_PCT = 5; // don't show until scrolled past this %

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
    );
    const docHeight = scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    const clamped = Math.min(100, Math.max(0, pct));
    setProgress(clamped);

    if (clamped > SHOW_AFTER_PCT) {
      setVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      // Auto-hide a couple seconds after scrolling stops, unless we're
      // sitting right at 100% — keep it (and the bubble) visible.
      idleTimer.current = setTimeout(() => {
        setVisible(clamped >= 100 ? true : false);
      }, IDLE_HIDE_MS);
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    const settleTimer = setTimeout(updateProgress, 300);
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      clearTimeout(settleTimer);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      resizeObserver.disconnect();
    };
  }, [updateProgress]);

  const dashOffset = CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;
  const isComplete = progress >= 100;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 9999,
        opacity: visible ? 1 : 0,
        transition: "opacity 300ms ease",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
      aria-hidden={!visible}
    >
      {/* ✅ EOF bubble — only rendered once complete, pops in with scale+fade */}
      <div
        style={{
          background: "var(--blog-toc-bg, #0d0f12)",
          border: "1px solid var(--blog-toc-border, #1f2937)",
          borderRadius: "6px",
          padding: "5px 11px",
          position: "relative",
          opacity: isComplete ? 1 : 0,
          transform: isComplete ? "scale(1)" : "scale(0.85)",
          transition: "opacity 200ms ease, transform 200ms ease",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            color: "var(--blog-accent, #4ade80)",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          that's it. ✦
        </span>
        {/* tail pointing at the dot */}
        <div
          style={{
            position: "absolute",
            right: "-5px",
            top: "50%",
            transform: "translateY(-50%) rotate(45deg)",
            width: "8px",
            height: "8px",
            background: "var(--blog-toc-bg, #0d0f12)",
            borderRight: "1px solid var(--blog-toc-border, #1f2937)",
            borderTop: "1px solid var(--blog-toc-border, #1f2937)",
          }}
        />
      </div>

      <svg width="44" height="44" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="var(--blog-toc-tick, #1f2937)"
          strokeWidth="3"
        />
        <circle
          cx="22"
          cy="22"
          r={RADIUS}
          fill="none"
          stroke="var(--blog-accent, #4ade80)"
          strokeWidth="3"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 22 22)"
          style={{ transition: "stroke-dashoffset 120ms linear" }}
        />
        {isComplete && (
          <circle cx="22" cy="22" r="3" fill="var(--blog-accent, #4ade80)" />
        )}
      </svg>
    </div>
  );
}
