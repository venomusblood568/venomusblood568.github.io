"use client";
import { useEffect, useState } from "react";

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Java: "#b07219",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Go: "#00ADD8",
  Rust: "#dea584",
  Shell: "#89e051",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
};

const CONTRIB_COLORS = [
  "transparent",
  "#22c55e22",
  "#22c55e55",
  "#22c55e99",
  "#22c55e",
];

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

interface Day {
  date: string;
  count: number;
}

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  updated_at: string;
  languages_url: string;
}

interface Streak {
  current: number;
  longest: number;
}

function calcStreak(contributions: Day[]): Streak {
  const sorted = [...contributions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  let current = 0,
    longest = 0,
    running = 0;
  let prevDate: string | null = null;

  for (const d of sorted) {
    if (d.count > 0) {
      if (!prevDate) {
        running = 1;
      } else {
        const diff =
          (new Date(prevDate).getTime() - new Date(d.date).getTime()) /
          86400000;
        if (diff === 1) running++;
        else {
          if (running > longest) longest = running;
          running = 1;
        }
      }
      prevDate = d.date;
    } else {
      if (running > longest) longest = running;
      if (current === 0 && running > 0 && prevDate) {
        const today = new Date().toISOString().slice(0, 10);
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10);
        if (prevDate === today || prevDate === yesterday) current = running;
      }
      running = 0;
      prevDate = null;
    }
  }
  if (running > longest) longest = running;
  if (current === 0 && running > 0) current = running;
  return { current, longest };
}

export default function GitHubGraph({
  username,
  isDark,
  accent,
}: {
  username: string;
  isDark: boolean;
  accent: string;
}) {
  const [weeks, setWeeks] = useState<Day[][]>([]);
  const [total, setTotal] = useState(0);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [langMap, setLangMap] = useState<Record<string, number>>({});
  const [streak, setStreak] = useState<Streak>({ current: 0, longest: 0 });
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    (async () => {
      try {
        const [contribRes, reposRes] = await Promise.all([
          fetch(
            `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
          ),
          fetch(
            `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          ),
        ]);
        if (!contribRes.ok || !reposRes.ok) throw new Error();

        const [contribData, repoData]: [{ contributions: Day[] }, Repo[]] =
          await Promise.all([contribRes.json(), reposRes.json()]);

        // Group contributions into weeks
        const sorted = [...contribData.contributions].sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        const grouped: Day[][] = [];
        let cur: Day[] = [];
        sorted.forEach((d) => {
          if (new Date(d.date).getDay() === 0) {
            cur = [];
            grouped.push(cur);
          }
          cur.push(d);
        });

        setWeeks(grouped);
        setTotal(sorted.reduce((s, d) => s + d.count, 0));
        setStreak(calcStreak(contribData.contributions));
        setRepos(repoData);

        // Fetch language bytes for top 20 non-fork repos
        const langs: Record<string, number> = {};
        await Promise.all(
          repoData
            .filter((r) => !r.fork && r.language)
            .slice(0, 20)
            .map(async (r) => {
              try {
                const lr = await fetch(r.languages_url);
                if (!lr.ok) return;
                const data: Record<string, number> = await lr.json();
                Object.entries(data).forEach(([l, b]) => {
                  langs[l] = (langs[l] || 0) + b;
                });
              } catch {
                // language fetch failed for this repo, skip
              }
            }),
        );
        setLangMap(langs);
        setStatus("done");
      } catch {
        setStatus("error");
      }
    })();
  }, [username]);

  const borderColor = isDark ? "#2a2a2a" : "#e5e7eb";
  const cardBg = isDark ? "#111" : "#fff";
  const surfaceBg = isDark ? "#0f0f0f" : "#f9fafb";
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const textFaint = isDark ? "#4b5563" : "#9ca3af";
  const dividerColor = isDark ? "#1f2937" : "#e5e7eb";

  if (status === "loading")
    return (
      <p className="text-xs" style={{ color: textMid }}>
        Loading...
      </p>
    );
  if (status === "error")
    return (
      <p className="text-xs" style={{ color: accent }}>
        Could not load GitHub data.
      </p>
    );

  const ownRepos = repos.filter((r) => !r.fork);
  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);

  const topLangs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const langTotal = topLangs.reduce((s, [, b]) => s + b, 0);

  const topRepos = ownRepos
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="font-mono">
      {/* Stats row */}
      <div
        className="grid grid-cols-3 gap-2 mb-4"
        style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
      >
        {[
          { val: ownRepos.length, label: "public repos" },
          { val: totalStars, label: "total stars" },
          { val: total.toLocaleString(), label: "contributions" },
        ].map(({ val, label }) => (
          <div
            key={label}
            className="rounded-lg p-3"
            style={{ background: surfaceBg }}
          >
            <div
              className="text-lg font-medium"
              style={{ color: isDark ? "#f0f0f0" : "#111827" }}
            >
              {val}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: textFaint }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {[
          { val: streak.current, label: "current streak" },
          { val: streak.longest, label: "longest streak" },
        ].map(({ val, label }) => (
          <div
            key={label}
            className="rounded-lg p-3 text-center"
            style={{ background: surfaceBg }}
          >
            <div className="text-2xl font-medium" style={{ color: accent }}>
              {val}
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: textFaint }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ borderTop: `1px solid ${dividerColor}`, marginBottom: 20 }}
      />

      {/* Contribution graph */}
      <p
        className="text-[10px] tracking-[0.25em] mb-3"
        style={{ color: accent }}
      >
        {"// CONTRIBUTIONS (last year)"}
      </p>
      <style>{`
        .gh-cell { width: clamp(10px, 1.4vw, 13px); height: clamp(10px, 1.4vw, 13px); border-radius: 3px; flex-shrink: 0; }
        .gh-col { display: flex; flex-direction: column; gap: clamp(2px, 0.25vw, 3px); }
        .gh-grid { display: flex; gap: clamp(2px, 0.25vw, 3px); min-width: max-content; padding-bottom: 4px; }
        .gh-legend-cell { width: clamp(10px, 1.4vw, 13px); height: clamp(10px, 1.4vw, 13px); border-radius: 3px; flex-shrink: 0; }
      `}</style>
      <div style={{ overflowX: "auto" }}>
        <div className="gh-grid">
          {weeks.map((week, wi) => (
            <div key={wi} className="gh-col">
              {week.map((day) => (
                <div
                  key={day.date}
                  className="gh-cell"
                  title={`${day.date}: ${day.count} contributions`}
                  style={{
                    background: CONTRIB_COLORS[getLevel(day.count)],
                    border:
                      day.count === 0 ? `0.5px solid ${borderColor}` : "none",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
        <span className="text-[10px]" style={{ color: textFaint }}>
          {total.toLocaleString()} contributions in the last year
        </span>
        <div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: textFaint }}>
            less
          </span>
          {CONTRIB_COLORS.map((c, i) => (
            <div
              key={i}
              className="gh-legend-cell"
              style={{
                background: c,
                border: i === 0 ? `0.5px solid ${borderColor}` : "none",
              }}
            />
          ))}
          <span className="text-[10px]" style={{ color: textFaint }}>
            more
          </span>
        </div>
      </div>

      <div
        style={{ borderTop: `1px solid ${dividerColor}`, margin: "20px 0" }}
      />

      {/* Languages */}
      {topLangs.length > 0 && (
        <>
          <p
            className="text-[10px] tracking-[0.25em] mb-3"
            style={{ color: accent }}
          >
            {"// LANGUAGES"}
          </p>
          <div className="mb-6">
            {topLangs.map(([name, bytes]) => {
              const pct = ((bytes / langTotal) * 100).toFixed(1);
              const color = LANG_COLORS[name] || "#9ca3af";
              return (
                <div key={name} className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs shrink-0"
                    style={{
                      color: textMid,
                      width: 88,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {name}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      background: isDark ? "#1f2937" : "#e5e7eb",
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: "100%",
                        background: color,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <span
                    className="text-[10px] shrink-0"
                    style={{ color: textFaint, width: 36, textAlign: "right" }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
          <div
            style={{ borderTop: `1px solid ${dividerColor}`, marginBottom: 20 }}
          />
        </>
      )}

      {/* Top repos */}
      <p
        className="text-[10px] tracking-[0.25em] mb-3"
        style={{ color: accent }}
      >
        {"// TOP REPOS"}
      </p>
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
      >
        {topRepos.map((repo) => {
          const lc = LANG_COLORS[repo.language ?? ""] || "#9ca3af";
          return (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg p-3 transition-opacity hover:opacity-75"
              style={{
                border: `1px solid ${borderColor}`,
                background: cardBg,
                textDecoration: "none",
              }}
            >
              <div className="text-sm mb-1 truncate" style={{ color: accent }}>
                {repo.name}
              </div>
              <div
                className="text-[11px] mb-2 leading-relaxed"
                style={{
                  color: textMid,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}
              >
                {repo.description || "No description"}
              </div>
              <div
                className="flex gap-3 text-[10px]"
                style={{ color: textFaint }}
              >
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: lc,
                        flexShrink: 0,
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                <span>★ {repo.stargazers_count}</span>
                {repo.forks_count > 0 && <span>⑂ {repo.forks_count}</span>}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
