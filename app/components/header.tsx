"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const prefersDark = saved ? saved === "dark" : systemDark;

    setIsDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const navItems = [
    { href: "/resume", label: "resume" },
    { href: "/project", label: "projects" },
    { href: "/design", label: "design" },
    { href: "/blog", label: "blog" },
  ];

  // Light mode: #374151 (readable dark gray), Dark mode: #9ca3af (muted)
  const navColor = isDark ? "#9ca3af" : "#374151";
  const toggleColor = isDark ? "#6b7280" : "#4b5563";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full pt-5 pb-2 font-mono text-sm">
      <div className="max-w-3xl mx-auto px-6">
        <div
          className="flex items-center justify-between rounded-full px-5 py-2"
          style={{
            border: `1px solid ${isDark ? "#1f2937" : "#e5e7eb"}`,
            background: isDark
              ? "rgba(10,10,10,0.80)"
              : "rgba(249,250,251,0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Home */}
          <Link
            href="/"
            className="tracking-widest transition-opacity hover:opacity-70"
            style={{ color: isDark ? "#4ade80" : "#16a34a" }}
          >
            ~/gourav
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);

              return (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors duration-150 hover:opacity-75"
                  style={{
                    color: isActive
                      ? isDark
                        ? "#4ade80"
                        : "#16a34a"
                      : navColor,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="text-xs transition-colors duration-150 hover:opacity-75"
              style={{ color: toggleColor }}
            >
              {isDark ? "light" : "dark"}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
