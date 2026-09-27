"use client";

import { useEffect, useRef, useState } from "react";

export type TocHeading = {
  id: string;
  text: string;
  level: number; // 2 or 3
};

const IDLE_COLLAPSE_MS = 4000;

export default function TableOfContents({
  headings,
}: {
  headings: TocHeading[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Track which heading is currently in view
  useEffect(() => {
    if (headings.length === 0) return;

    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Trigger a bit before a heading fully reaches the top, and give
        // some breathing room below so the "active" section feels natural.
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  // ✅ Collapse on outside click
  useEffect(() => {
    if (!expanded) return;

    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [expanded]);

  // ✅ Auto-collapse after a short idle period
  useEffect(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);

    if (expanded) {
      idleTimer.current = setTimeout(() => {
        setExpanded(false);
      }, IDLE_COLLAPSE_MS);
    }

    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [expanded, activeId]);

  if (headings.length === 0) return null;

  const handleJump = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setExpanded(false);
  };

  return (
    <div
      ref={containerRef}
      className="hidden lg:block fixed top-1/2 -translate-y-1/2 right-6 z-40 font-mono"
    >
      {!expanded ? (
        // ── Collapsed: minimal tick rail ─────────────────────────────
        <button
          onClick={() => setExpanded(true)}
          aria-label="Open table of contents"
          className="flex flex-col items-end gap-2.5 py-2 px-2"
        >
          {headings.map((h) => {
            const isActive = h.id === activeId;
            return (
              <span
                key={h.id}
                className="transition-all duration-200"
                style={{
                  height: "2px",
                  width: isActive ? "22px" : h.level === 3 ? "10px" : "14px",
                  background: isActive
                    ? "var(--blog-accent, #4ade80)"
                    : "var(--blog-toc-tick, #1f2937)",
                  borderRadius: "2px",
                }}
              />
            );
          })}
        </button>
      ) : (
        // ── Expanded: floating labeled box ───────────────────────────
        <div
          className="rounded-lg py-4 px-5 max-w-[240px]"
          style={{
            border: "1px solid var(--blog-toc-border, #1f2937)",
            background: "var(--blog-toc-bg, #0d0f12)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          <div className="flex flex-col gap-2.5">
            {headings.map((h) => {
              const isActive = h.id === activeId;
              return (
                <button
                  key={h.id}
                  onClick={() => handleJump(h.id)}
                  className="flex items-center gap-2 text-left transition-colors duration-150 hover:opacity-80"
                  style={{
                    paddingLeft: h.level === 3 ? "12px" : "0px",
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "var(--blog-accent, #4ade80)",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <span
                    className="text-[12.5px] leading-snug"
                    style={{
                      color: isActive
                        ? "var(--blog-accent, #4ade80)"
                        : "var(--blog-toc-text, #6b7280)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {h.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
