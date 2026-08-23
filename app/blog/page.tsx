"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Header from "../components/header";
import Link from "next/link";
import { slugify } from "../lib/slugify";
import HexBackground from "../components/Hexbackground";

type Post = {
  title: string;
  date: string;
  readTime: string;
  year: number;
  tags?: string[];
};

const posts: Post[] = [
  {
    title: "Want to escape reality read this",
    date: "May 28, 2025",
    readTime: "2 min",
    year: 2025,
  },
  {
    title: "Transactions in Mongoose",
    date: "Jun 2, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "CORS under the hood",
    date: "July 2, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "Microservices: What?",
    date: "Oct 12, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "Simply create portal",
    date: "Dec 30, 2025",
    readTime: "3 min",
    year: 2025,
  },
  {
    title: "When Analytics Miss a User",
    date: "Jan 18, 2026",
    readTime: "3 min",
    year: 2026,
  },
  {
    title: "I Was Reopening the Same 7 Websites Every Day",
    date: "Jun 14, 2026",
    readTime: "2 min",
    year: 2026,
    tags: ["git", "internals", "devtools"],
  },
];

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

export default function Blog() {
  const [isDark, setIsDark] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      setIsDark(html.classList.contains("dark"));
      document.body.style.backgroundColor = html.classList.contains("dark")
        ? "#0a0a0a"
        : "#f9fafb";
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const accent = isDark ? "#4ade80" : "#16a34a";
  const bg = isDark ? "#0a0a0a" : "#f9fafb";
  const divider = isDark ? "#1f2937" : "#e5e7eb";
  const textPri = isDark ? "#f0f0f0" : "#111827";
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const textDim = isDark ? "#374151" : "#9ca3af";
  const tagBorder = isDark ? "#1f3d2a" : "#bbf7d0";
  const inputBorder = isDark ? "#1f2937" : "#e5e7eb";

  // ✅ All unique tags across posts, for the filter row
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  // ✅ Filter by title text match (case-insensitive) and/or active tag
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesQuery = q === "" || post.title.toLowerCase().includes(q);
      const matchesTag = !activeTag || post.tags?.includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  const sortedPosts = [...filteredPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const postsByYear = sortedPosts.reduce(
    (acc, post) => {
      if (!acc[post.year]) acc[post.year] = [];
      acc[post.year].push(post);
      return acc;
    },
    {} as Record<number, Post[]>,
  );

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const hasActiveFilter = query.trim() !== "" || activeTag !== null;

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      {/* ✅ HexBackground — fixed: position:fixed so it sits behind everything */}
      <HexBackground accentColor={accent} isDark={isDark} />

      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl font-mono">
          {/* Hero */}
          <section className="mb-16">
            <p
              className="text-sm mb-4 opacity-0 animate-[fadeup_0.4s_ease_0.2s_forwards]"
              style={{ color: accent }}
            >
              $ ls ./blog
            </p>

            <h1
              className="text-4xl sm:text-5xl font-normal mb-4 leading-tight opacity-0 animate-[fadeup_0.5s_ease_0.5s_forwards]"
              style={{ color: textPri, letterSpacing: "-2px" }}
            >
              BLOG
            </h1>

            <p
              className="text-sm mb-1 opacity-0 animate-[fadeup_0.5s_ease_0.8s_forwards]"
              style={{ color: accent }}
            >
              I write with a cup of coffee ☕
            </p>
            <p
              className="text-xs tracking-widest opacity-0 animate-[fadeup_0.5s_ease_1s_forwards]"
              style={{ color: textDim }}
            >
              dev logs ✦ ideas ✦ reflections
            </p>
          </section>

          {/* ✅ Filter bar: search input + tag pills */}
          <section className="mb-10">
            <div
              className="flex items-center gap-2 px-3 py-2 mb-4 rounded"
              style={{ border: `1px solid ${inputBorder}` }}
            >
              <span className="text-sm flex-shrink-0" style={{ color: accent }}>
                $ grep
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search posts..."
                className="text-sm flex-1 bg-transparent outline-none font-mono"
                style={{ color: textPri }}
              />
              {hasActiveFilter && (
                <button
                  onClick={() => {
                    setQuery("");
                    setActiveTag(null);
                  }}
                  className="text-xs flex-shrink-0 transition-opacity duration-150 hover:opacity-70"
                  style={{ color: textDim }}
                >
                  clear ✕
                </button>
              )}
            </div>

            {allTags.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {allTags.map((tag) => {
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(isActive ? null : tag)}
                      className="text-[11px] px-2.5 py-1 rounded transition-colors duration-150"
                      style={{
                        color: isActive
                          ? isDark
                            ? "#0a0a0a"
                            : "#fff"
                          : accent,
                        background: isActive ? accent : "transparent",
                        border: `1px solid ${isActive ? accent : tagBorder}`,
                      }}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <div
            style={{ borderTop: `1px solid ${divider}`, marginBottom: "3rem" }}
          />

          {/* Posts by year */}
          {years.length === 0 && (
            <p className="text-sm mb-16" style={{ color: textDim }}>
              no posts match &quot;{query}&quot;
              {activeTag ? ` in #${activeTag}` : ""}.
            </p>
          )}

          {years.map((year, yi) => (
            <FadeSection key={year} delay={yi * 80}>
              <section className="mb-16">
                <p
                  className="text-[10px] tracking-[0.25em] mb-6"
                  style={{ color: accent }}
                >
                  {`// ${year}`}
                </p>

                <ul className="flex flex-col">
                  {postsByYear[year].map((post, idx) => {
                    const slug = slugify(post.title);
                    const isLatest = yi === 0 && idx === 0 && !hasActiveFilter;

                    return (
                      <li
                        key={idx}
                        style={{
                          borderBottom: `1px solid ${isDark ? "#111" : "#f3f4f6"}`,
                        }}
                      >
                        <Link
                          href={`/blog/${slug}`}
                          className="flex flex-col gap-1.5 py-3 group"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs flex-shrink-0 transition-colors duration-150 ${
                                isLatest ? "animate-pulse" : ""
                              }`}
                              style={{ color: accent }}
                            >
                              {isLatest ? "✦" : "▸"}
                            </span>
                            <span
                              className="text-sm flex-1 transition-colors duration-150"
                              style={{ color: textMid }}
                            >
                              <span
                                className="group-hover:text-[var(--accent)] transition-colors duration-150"
                                style={{
                                  color: isDark ? "#d1d5db" : "#374151",
                                }}
                              >
                                {post.title}
                              </span>
                            </span>
                            <time
                              className="text-xs flex-shrink-0 whitespace-nowrap"
                              style={{ color: textDim }}
                            >
                              {post.date} · {post.readTime}
                            </time>
                          </div>

                          {post.tags && post.tags.length > 0 && (
                            <div className="flex gap-1.5 flex-wrap pl-6">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-2 py-0.5 rounded"
                                  style={{
                                    color: accent,
                                    border: `1px solid ${tagBorder}`,
                                  }}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <div
                style={{
                  borderTop: `1px solid ${divider}`,
                  marginBottom: "3rem",
                }}
              />
            </FadeSection>
          ))}

          <FadeSection>
            <p className="text-xs" style={{ color: textDim }}>
              ...more posts incoming.
            </p>
          </FadeSection>
        </div>
      </main>
    </div>
  );
}
