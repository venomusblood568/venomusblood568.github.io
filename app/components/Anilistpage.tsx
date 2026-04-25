// app/components/Anilistpage.tsx
"use client";

import { useEffect, useState, useRef } from "react";
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
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

// ─── constants ───────────────────────────────────────────────────────────────

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

const STATUS_BADGE: Record<string, string> = {
  COMPLETED: "text-blue-400 bg-blue-950 border-blue-900",
  CURRENT: "text-green-400 bg-green-950 border-green-900",
  PAUSED: "text-yellow-400 bg-yellow-950 border-yellow-900",
  DROPPED: "text-red-400 bg-red-950 border-red-900",
  PLANNING: "text-purple-400 bg-purple-950 border-purple-900",
};

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

// ─── tooltip alignment helper ─────────────────────────────────────────────────

type TooltipAlign = "left" | "center" | "right";

function getTooltipAlign(
  el: HTMLDivElement | null,
  tooltipWidth = 210,
): TooltipAlign {
  if (!el || typeof window === "undefined") return "center";
  const rect = el.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const half = tooltipWidth / 2;

  if (cardCenterX - half < 8) return "left"; // near left edge
  if (cardCenterX + half > window.innerWidth - 8) return "right"; // near right edge
  return "center";
}

function tooltipPositionStyle(align: TooltipAlign): React.CSSProperties {
  switch (align) {
    case "left":
      return { left: 0 };
    case "right":
      return { right: 0 };
    default:
      return { left: "50%", transform: "translateX(-50%)" };
  }
}

// ─── AnimeCard ────────────────────────────────────────────────────────────────

function AnimeCard({
  entry,
  accent,
  isDark,
}: {
  entry: AnimeEntry;
  accent: string;
  isDark: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const [tooltipAlign, setTooltipAlign] = useState<TooltipAlign>("center");
  const wrapRef = useRef<HTMLDivElement>(null);

  const { anime, score, status } = entry;
  const statusColor = STATUS_COLOR[status] ?? "#8b5cf6";
  const isOpen = hovered || tapped;
  const border = isOpen ? accent : isDark ? "#2a2a2a" : "#e5e7eb";

  // Recalculate tooltip alignment whenever card opens
  useEffect(() => {
    if (isOpen) {
      setTooltipAlign(getTooltipAlign(wrapRef.current));
    }
  }, [isOpen]);

  // Close tapped card when touching outside
  useEffect(() => {
    if (!tapped) return;
    const handler = (e: TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setTapped(false);
      }
    };
    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [tapped]);

  return (
    <div
      ref={wrapRef}
      className="relative rounded-lg overflow-visible cursor-pointer"
      style={{
        aspectRatio: "2/3",
        border: `1px solid ${border}`,
        transition: "border-color 0.15s, transform 0.15s",
        transform: isOpen ? "scale(1.03)" : "scale(1)",
        background: isDark ? "#111" : "#f3f4f6",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchEnd={(e) => {
        e.preventDefault();
        setTapped((v) => !v);
      }}
    >
      {/* Cover image */}
      {anime.cover && (
        <Image
          src={anime.cover}
          alt={anime.title}
          fill
          sizes="120px"
          className="object-cover rounded-lg"
        />
      )}

      {/* User score badge */}
      {score > 0 && (
        <div
          className="absolute bottom-5 right-1 text-[9px] px-1.5 py-0.5 rounded z-10"
          style={{
            background: "rgba(0,0,0,0.85)",
            border: `1px solid ${accent}`,
            color: accent,
          }}
        >
          {score}
        </div>
      )}

      {/* Status bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px] z-10"
        style={{ background: statusColor }}
      />

      {/* ── Tooltip / tap card ── */}
      {isOpen && (
        <div
          className="absolute z-50 rounded-xl border"
          style={{
            bottom: "calc(100% + 8px)",
            ...tooltipPositionStyle(tooltipAlign),
            width: 210,
            background: "#141414",
            borderColor: tapped ? accent : "#2a2a2a",
            padding: "10px 12px",
            pointerEvents: "none",
          }}
        >
          {/* Close hint — visible on mobile only */}
          <p
            className="text-[9px] text-right mb-1 sm:hidden"
            style={{ color: "#555" }}
          >
            tap again to close
          </p>

          <p className="text-sm font-medium text-white leading-snug m-0">
            {anime.title}
          </p>

          {anime.nativeTitle && (
            <p className="text-xs m-0 mb-2" style={{ color: "#555" }}>
              {anime.nativeTitle}
            </p>
          )}

          <div
            style={{ height: "0.5px", background: "#222", margin: "0 0 8px" }}
          />

          {/* Status badge + genre tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${
                STATUS_BADGE[status] ??
                "text-gray-400 bg-gray-900 border-gray-800"
              }`}
            >
              {STATUS_LABEL[status] ?? status}
            </span>
            {anime.genres.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-xs px-2 py-0.5 rounded-full border"
                style={{
                  color: "#888",
                  background: "#1e1e1e",
                  borderColor: "#2a2a2a",
                }}
              >
                {g}
              </span>
            ))}
          </div>

          {/* Score */}
          {(score > 0 || (anime.score && anime.score > 0)) && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs" style={{ color: "#555" }}>
                score
              </span>
              <span className="text-sm font-medium text-green-400">
                {score > 0 ? score : (anime.score! / 10).toFixed(1)}
              </span>
              <div
                className="flex-1 rounded-full"
                style={{ height: 3, background: "#222" }}
              >
                <div
                  className="rounded-full bg-green-400"
                  style={{
                    height: 3,
                    width: `${score > 0 ? score * 10 : anime.score}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Format + episode count */}
          <div className="flex justify-between mt-1">
            {anime.format && (
              <span className="text-xs" style={{ color: "#555" }}>
                {anime.format.replace(/_/g, " ")}
              </span>
            )}
            {anime.episodes && (
              <span className="text-xs" style={{ color: "#555" }}>
                {anime.episodes} eps
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export default function AniListPage({ data }: { data: AniListData }) {
  const [isDark, setIsDark] = useState(false);

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
  // const bg = isDark ? "#0a0a0a" : "#f9fafb";
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

  const completed = animeList.filter((e) => e.status === "COMPLETED").length;
  const watching = animeList.filter((e) => e.status === "CURRENT").length;
  const planning = animeList.filter((e) => e.status === "PLANNING").length;

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300 font-mono"
    >
      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl">
          {/* ── Hero ─────────────────────────────────────────── */}
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

          {/* ── Stats ────────────────────────────────────────── */}
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

          {/* ── Genre Overview ───────────────────────────────── */}
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

          {/* ── Cover Gallery ────────────────────────────────── */}
          <FadeSection delay={80}>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-5"
                style={{ color: accent }}
              >
                {"// COVER GALLERY"}
              </p>

              {/* legend */}
              <div className="flex flex-wrap gap-3 mb-5">
                {Object.entries(STATUS_LABEL).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-2 h-2 rounded-sm flex-shrink-0"
                      style={{ background: STATUS_COLOR[key] }}
                    />
                    <span className="text-[10px]" style={{ color: textMid }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* grid */}
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
                }}
              >
                {uniqueAnime.map((entry) => (
                  <AnimeCard
                    key={entry.anime.id}
                    entry={entry}
                    accent={accent}
                    isDark={isDark}
                  />
                ))}
              </div>

              {/* hint — shows "hover" on desktop, "tap" on mobile */}
              <p
                className="text-xs mt-4"
                style={{ color: isDark ? "#4b5563" : "#9ca3af" }}
              >
                {uniqueAnime.length} titles ·{" "}
                <span className="hidden sm:inline">hover</span>
                <span className="sm:hidden">tap</span> for details · colored bar
                = status
              </p>
            </section>
          </FadeSection>
        </div>
      </main>
    </div>
  );
}
