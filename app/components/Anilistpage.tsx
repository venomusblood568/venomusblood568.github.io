// app/components/Anilistpage.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Header from "./header";
import { AniListData, AnimeEntry } from "../lib/anilist";

// ─── helpers ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}

// ─── constants ───────────────────────────────────────────────────────────────

const STATUS_ORDER = [
  "CURRENT",
  "COMPLETED",
  "PLANNING",
  "PAUSED",
  "DROPPED",
] as const;

const STATUS_COLOR: Record<string, string> = {
  COMPLETED: "#3b82f6",
  CURRENT: "#4ade80",
  PAUSED: "#f59e0b",
  DROPPED: "#ef4444",
  PLANNING: "#8b5cf6",
};

const STATUS_LABEL: Record<string, string> = {
  COMPLETED: "Completed",
  CURRENT: "Watching",
  PAUSED: "Paused",
  DROPPED: "Dropped",
  PLANNING: "Planning",
};

const STATUS_BADGE_STYLE: Record<string, React.CSSProperties> = {
  COMPLETED: {
    color: "#60a5fa",
    background: "#172554",
    borderColor: "#1e3a8a",
  },
  CURRENT: { color: "#4ade80", background: "#052e16", borderColor: "#14532d" },
  PAUSED: { color: "#fbbf24", background: "#1c1400", borderColor: "#78350f" },
  DROPPED: { color: "#f87171", background: "#1c0707", borderColor: "#7f1d1d" },
  PLANNING: { color: "#c084fc", background: "#1a0533", borderColor: "#581c87" },
};

const CARD_W = 88; // px — single source of truth for card width
const CARD_H = 132; // px — 2:3 ratio

// ─── StatCard ────────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  barPct,
  accent,
  isDark,
  highlight,
}: {
  value: string | number;
  label: string;
  barPct?: number;
  accent: string;
  isDark: boolean;
  highlight?: boolean;
}) {
  const bg = isDark ? "#111" : "#fff";
  const border = highlight ? accent : isDark ? "#2a2a2a" : "#e5e7eb";
  const textPri = isDark ? "#f0f0f0" : "#111827";
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const barBg = isDark ? "#1f2937" : "#e5e7eb";
  return (
    <div
      className="rounded-lg p-4 relative"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      {highlight && (
        <span
          className="absolute top-3 right-3 text-xs"
          style={{ color: accent }}
        >
          ↑
        </span>
      )}
      <p className="text-2xl font-medium" style={{ color: textPri }}>
        {value}
      </p>
      <p className="text-[10px] mt-1 tracking-wide" style={{ color: textMid }}>
        {label}
      </p>
      {barPct !== undefined && (
        <div className="mt-3 h-px w-full rounded" style={{ background: barBg }}>
          <div
            className="h-px rounded transition-all duration-1000"
            style={{ width: `${Math.min(barPct, 100)}%`, background: accent }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Mobile bottom sheet ──────────────────────────────────────────────────────

function BottomSheet({
  entry,
  onClose,
}: {
  entry: AnimeEntry | null;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (entry) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setVisible(true)),
      );
    } else {
      setVisible(false);
    }
  }, [entry]);

  useEffect(() => {
    document.body.style.overflow = entry ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [entry]);

  if (!entry) return null;

  const { anime, score, status } = entry;
  const statusColor = STATUS_COLOR[status] ?? "#8b5cf6";
  const badgeStyle = STATUS_BADGE_STYLE[status] ?? {};
  const displayScore = score > 0 ? score : null;

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.6)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* sheet */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "#111",
          borderRadius: "18px 18px 0 0",
          borderTop: `1px solid ${statusColor}44`,
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        {/* drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 6px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: "#2a2a2a",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 16, padding: "8px 20px 36px" }}>
          {/* cover art */}
          <div
            style={{
              width: 96,
              height: 144,
              borderRadius: 10,
              overflow: "hidden",
              flexShrink: 0,
              border: `1px solid ${statusColor}55`,
              position: "relative",
            }}
          >
            {anime.cover && (
              <Image
                src={anime.cover}
                alt={anime.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            )}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 3,
                background: statusColor,
              }}
            />
          </div>

          {/* info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 500,
                color: "#f0f0f0",
                lineHeight: 1.3,
                marginBottom: 2,
              }}
            >
              {anime.title}
            </p>
            {anime.nativeTitle && (
              <p style={{ fontSize: 11, color: "#555", marginBottom: 10 }}>
                {anime.nativeTitle}
              </p>
            )}

            <span
              style={{
                display: "inline-block",
                fontSize: 10,
                padding: "2px 10px",
                borderRadius: 99,
                border: "1px solid",
                marginBottom: 10,
                ...badgeStyle,
              }}
            >
              {STATUS_LABEL[status] ?? status}
            </span>

            {anime.genres.length > 0 && (
              <div
                style={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                {anime.genres.slice(0, 3).map((g) => (
                  <span
                    key={g}
                    style={{
                      fontSize: 10,
                      color: "#666",
                      border: "1px solid #252525",
                      padding: "1px 6px",
                      borderRadius: 4,
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>
            )}

            {displayScore !== null ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 26,
                    fontWeight: 500,
                    color: statusColor,
                    lineHeight: 1,
                  }}
                >
                  {displayScore}
                </span>
                <div>
                  <div style={{ fontSize: 10, color: "#555" }}>/ 10</div>
                  {anime.episodes && (
                    <div style={{ fontSize: 10, color: "#555" }}>
                      {anime.episodes} eps
                    </div>
                  )}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: "#222",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${displayScore * 10}%`,
                      background: statusColor,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: 6 }}>
                <p style={{ fontSize: 11, color: "#555", fontStyle: "italic" }}>
                  not started
                </p>
                {anime.episodes && (
                  <p style={{ fontSize: 10, color: "#444", marginTop: 2 }}>
                    {anime.episodes} eps
                  </p>
                )}
              </div>
            )}

            {anime.format && (
              <p style={{ fontSize: 10, color: "#444" }}>
                {anime.format.replace(/_/g, " ")}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── CardBack — the flipped face shown on PC click ───────────────────────────

function CardBack({ entry }: { entry: AnimeEntry }) {
  const { anime, score, status } = entry;
  const statusColor = STATUS_COLOR[status] ?? "#8b5cf6";
  const displayScore = score > 0 ? score : null;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0f0f0f",
        border: `1px solid ${statusColor}55`,
        borderRadius: 8,
        // flip the back face so it reads correctly when rotated
        transform: "rotateY(180deg)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* top status bar */}
      <div
        style={{
          height: 3,
          background: statusColor,
          flexShrink: 0,
        }}
      />

      <div
        style={{
          flex: 1,
          padding: "7px 8px 7px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <div>
          {/* title */}
          <p
            style={{
              fontSize: 9,
              fontWeight: 500,
              color: "#e0e0e0",
              lineHeight: 1.3,
              marginBottom: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {anime.title}
          </p>

          {/* native title */}
          {anime.nativeTitle && (
            <p
              style={{
                fontSize: 8,
                color: "#2e2e2e",
                marginBottom: 6,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {anime.nativeTitle}
            </p>
          )}

          {/* divider */}
          <div
            style={{ height: 0.5, background: "#1c1c1c", marginBottom: 6 }}
          />

          {/* status dot + label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: statusColor,
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: 8,
                letterSpacing: "0.1em",
                color: statusColor,
                textTransform: "uppercase",
              }}
            >
              {STATUS_LABEL[status] ?? status}
            </span>
          </div>

          {/* score */}
          {displayScore !== null ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 4,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 500,
                    color: statusColor,
                    lineHeight: 1,
                  }}
                >
                  {displayScore}
                </span>
                <span style={{ fontSize: 8, color: "#3a3a3a" }}>/ 10</span>
              </div>
              <div
                style={{
                  height: 2,
                  background: "#1a1a1a",
                  borderRadius: 2,
                  overflow: "hidden",
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${displayScore * 10}%`,
                    background: statusColor,
                    borderRadius: 2,
                  }}
                />
              </div>
            </>
          ) : (
            <p
              style={{
                fontSize: 8,
                color: "#444",
                fontStyle: "italic",
                marginBottom: 6,
              }}
            >
              not scored
            </p>
          )}

          {/* genres */}
          {anime.genres.length > 0 && (
            <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
              {anime.genres.slice(0, 3).map((g) => (
                <span
                  key={g}
                  style={{
                    fontSize: 7,
                    color: "#3a3a3a",
                    border: "1px solid #1c1c1c",
                    padding: "1px 4px",
                    borderRadius: 3,
                  }}
                >
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* episodes + format footer */}
        <div style={{ marginTop: "auto", paddingTop: 4 }}>
          {anime.episodes && (
            <p style={{ fontSize: 8, color: "#333" }}>{anime.episodes} eps</p>
          )}
          {anime.format && (
            <p style={{ fontSize: 7, color: "#252525", marginTop: 1 }}>
              {anime.format.replace(/_/g, " ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── AnimeCard ────────────────────────────────────────────────────────────────

function AnimeCard({
  entry,
  isDark,
  onTap,
  isTouch,
}: {
  entry: AnimeEntry;
  isDark: boolean;
  onTap: (entry: AnimeEntry) => void;
  isTouch: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  const { anime, score, status } = entry;
  const statusColor = STATUS_COLOR[status] ?? "#8b5cf6";
  const displayScore = score > 0 ? score : null;

  function handleClick() {
    if (isTouch) {
      onTap(entry);
    } else {
      setFlipped((v) => !v);
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: CARD_W,
        height: CARD_H,
        flexShrink: 0,
        cursor: "pointer",
        perspective: 700,
      }}
    >
      {/* flip container */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            overflow: "hidden",
            border: `1px solid ${flipped ? statusColor + "44" : isDark ? "#1e1e1e" : "#e5e7eb"}`,
            transition: "border-color 0.15s",
            background: isDark ? "#111" : "#f3f4f6",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {anime.cover && (
            <Image
              src={anime.cover}
              alt={anime.title}
              fill
              sizes={`${CARD_W}px`}
              className="object-cover"
            />
          )}

          {/* score badge */}
          {displayScore !== null && (
            <div
              style={{
                position: "absolute",
                bottom: 18,
                right: 3,
                fontSize: 9,
                padding: "1px 4px",
                borderRadius: 3,
                background: "rgba(0,0,0,0.88)",
                border: `1px solid ${statusColor}`,
                color: statusColor,
                zIndex: 2,
              }}
            >
              {displayScore}
            </div>
          )}

          {/* status bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: statusColor,
              zIndex: 2,
            }}
          />

          {/* flip hint — subtle indicator on front */}
          {!flipped && (
            <div
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 3,
              }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path
                  d="M1 4.5C1 4.5 1.5 2 4 2C6 2 7 3.5 7 3.5M7 3.5L5.5 3M7 3.5L7 2"
                  stroke={statusColor}
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </div>

        {/* ── BACK ── */}
        <CardBack entry={entry} />
      </div>
    </div>
  );
}

// ─── GalleryGroup ─────────────────────────────────────────────────────────────

function GalleryGroup({
  status,
  entries,
  isDark,
  defaultOpen,
  onTap,
  isTouch,
}: {
  status: string;
  entries: AnimeEntry[];
  isDark: boolean;
  defaultOpen: boolean;
  onTap: (entry: AnimeEntry) => void;
  isTouch: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const color = STATUS_COLOR[status] ?? "#8b5cf6";
  const label = STATUS_LABEL[status] ?? status;
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const borderCol = isDark ? "#1f2937" : "#e5e7eb";

  if (entries.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full text-left mb-4"
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: color }}
        />
        <span
          className="text-[10px] tracking-[0.2em] uppercase"
          style={{ color }}
        >
          {label}
        </span>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full"
          style={{
            background: isDark ? "#1a1a1a" : "#f3f4f6",
            border: `1px solid ${borderCol}`,
            color: textMid,
          }}
        >
          {entries.length}
        </span>
        <span
          className="ml-auto text-xs transition-transform duration-200"
          style={{
            color: textMid,
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>

      <div
        style={{
          overflow: open ? "visible" : "hidden",
          maxHeight: open ? "none" : 0,
          opacity: open ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {entries.map((entry) => (
            <AnimeCard
              key={entry.anime.id}
              entry={entry}
              isDark={isDark}
              onTap={onTap}
              isTouch={isTouch}
            />
          ))}
        </div>
      </div>

      <div className="mt-6" style={{ borderTop: `1px solid ${borderCol}` }} />
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function AniListPage({ data }: { data: AniListData }) {
  const [isDark, setIsDark] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [sheetEntry, setSheetEntry] = useState<AnimeEntry | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      const dark = html.classList.contains("dark");
      setIsDark(dark);
      document.body.style.backgroundColor = dark ? "#0a0a0a" : "#f9fafb";
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const { user, animeList } = data;
  const st = user.statistics.anime;

  const accent = isDark ? "#4ade80" : "#16a34a";
  const divider = isDark ? "#1f2937" : "#e5e7eb";
  const textPri = isDark ? "#f0f0f0" : "#111827";
  const textMid = isDark ? "#9ca3af" : "#6b7280";

  const hoursWatched = Math.round(st.minutesWatched / 60);
  const daysWatched = (st.minutesWatched / 60 / 24).toFixed(1);

  const topGenres = [...(st.genres ?? [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const seen = new Set<number>();
  const uniqueAnime = animeList.filter((e) => {
    if (!e.anime?.cover || seen.has(e.anime.id)) return false;
    seen.add(e.anime.id);
    return true;
  });

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    entries: uniqueAnime.filter((e) => e.status === status),
  }));

  const completed = animeList.filter((e) => e.status === "COMPLETED").length;
  const watching = animeList.filter((e) => e.status === "CURRENT").length;
  const planning = animeList.filter((e) => e.status === "PLANNING").length;

  const handleTap = useCallback(
    (entry: AnimeEntry) => setSheetEntry(entry),
    [],
  );
  const handleClose = useCallback(() => setSheetEntry(null), []);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 font-mono">
      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl">
          {/* ── Hero ── */}
          <section className="mb-16">
            <p
              className="text-sm mb-5 opacity-0 animate-[fadeup_0.4s_ease_0.2s_forwards]"
              style={{ color: accent }}
            >
              $ ls ./anime
            </p>
            <div className="flex items-center gap-5 mb-6 opacity-0 animate-[fadeup_0.5s_ease_0.5s_forwards]">
              <div className="relative flex-shrink-0">
                <Image
                  src={user.avatar.large}
                  alt={user.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                  style={{ border: `2px solid ${accent}` }}
                />
                <span className="absolute bottom-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
              </div>
              <div>
                <h1
                  className="text-3xl sm:text-4xl font-normal leading-tight"
                  style={{ color: textPri }}
                >
                  {user.name}
                </h1>
                <p className="text-sm mt-1" style={{ color: accent }}>
                  Anime Tracker · AniList
                </p>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed max-w-lg opacity-0 animate-[fadeup_0.5s_ease_0.8s_forwards]"
              style={{ color: textMid }}
            >
              {st.count} anime across {daysWatched} days of watch time. A
              collection of everything watched, paused, and planned — tracked
              obsessively on{" "}
              <a
                href="https://anilist.co/user/ElysianEchos/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent }}
                className="hover:opacity-75 transition-opacity"
              >
                AniList
              </a>
              .
            </p>
          </section>

          <div
            style={{ borderTop: `1px solid ${divider}` }}
            className="mb-12"
          />

          {/* ── Stats ── */}
          <FadeSection>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-5"
                style={{ color: accent }}
              >
                {"// STATS"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard
                  value={st.count}
                  label="anime watched"
                  barPct={(st.count / 300) * 100}
                  accent={accent}
                  isDark={isDark}
                />
                <StatCard
                  value={hoursWatched.toLocaleString()}
                  label="hours watched"
                  barPct={(hoursWatched / 5000) * 100}
                  accent={accent}
                  isDark={isDark}
                />
                <StatCard
                  value={st.meanScore || "—"}
                  label="mean score"
                  barPct={st.meanScore}
                  accent={accent}
                  isDark={isDark}
                />
                <StatCard
                  value={completed}
                  label="completed"
                  accent={accent}
                  isDark={isDark}
                />
                <StatCard
                  value={watching}
                  label="currently watching"
                  accent={accent}
                  isDark={isDark}
                />
                <StatCard
                  value={planning}
                  label="plan to watch"
                  accent={accent}
                  isDark={isDark}
                />
              </div>
            </section>
          </FadeSection>

          <div
            style={{ borderTop: `1px solid ${divider}` }}
            className="mb-12"
          />

          {/* ── Genre Overview ── */}
          <FadeSection delay={50}>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-5"
                style={{ color: accent }}
              >
                {"// GENRE OVERVIEW"}
              </p>
              <div className="flex flex-wrap gap-2">
                {topGenres.map((g) => (
                  <span
                    key={g.genre}
                    className="px-3 py-1.5 text-xs rounded-full flex items-center gap-2"
                    style={{
                      border: `1px solid ${isDark ? "#2a2a2a" : "#e5e7eb"}`,
                      background: isDark ? "#111" : "#fff",
                      color: isDark ? "#d1d5db" : "#374151",
                    }}
                  >
                    {g.genre}
                    <span style={{ color: accent }} className="text-[10px]">
                      {g.count}
                    </span>
                  </span>
                ))}
              </div>
            </section>
          </FadeSection>

          <div
            style={{ borderTop: `1px solid ${divider}` }}
            className="mb-12"
          />

          {/* ── Cover Gallery ── */}
          <FadeSection delay={80}>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-2"
                style={{ color: accent }}
              >
                {"// COVER GALLERY"}
              </p>
              <p className="text-xs mb-8" style={{ color: textMid }}>
                {uniqueAnime.length} titles ·{" "}
                <span className="hidden sm:inline">
                  click to flip for details
                </span>
                <span className="sm:hidden">tap for details</span> · click a
                section to collapse
              </p>

              {grouped.map(({ status, entries }) => (
                <GalleryGroup
                  key={status}
                  status={status}
                  entries={entries}
                  isDark={isDark}
                  defaultOpen={status === "CURRENT" || status === "COMPLETED"}
                  onTap={handleTap}
                  isTouch={isTouch}
                />
              ))}
            </section>
          </FadeSection>
        </div>
      </main>

      {/* mobile bottom sheet — rendered at root so it overlays everything */}
      <BottomSheet entry={sheetEntry} onClose={handleClose} />
    </div>
  );
}
