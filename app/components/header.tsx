"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

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
    { href: "/anilist", label: "anime" },
  ];

  const navColor = isDark ? "#9ca3af" : "#374151";
  const activeColor = isDark ? "#4ade80" : "#16a34a";
  const toggleColor = isDark ? "#6b7280" : "#4b5563";
  const borderColor = isDark ? "#1f2937" : "#e5e7eb";
  const bgColor = isDark ? "rgba(10,10,10,0.92)" : "rgba(249,250,251,0.95)";

  const pillStyle = {
    border: `1px solid ${borderColor}`,
    background: bgColor,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full pt-5 pb-2 font-mono text-sm">
      <div className="max-w-3xl mx-auto px-6" ref={menuRef}>
        {/* ── Main pill ── */}
        <div
          className="flex items-center justify-between rounded-full px-5 py-2"
          style={pillStyle}
        >
          {/* Home */}
          <Link
            href="/"
            className="tracking-widest transition-opacity hover:opacity-70"
            style={{ color: activeColor }}
          >
            ~/gourav
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-6">
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative transition-colors duration-150 hover:opacity-75"
                  style={{ color: isActive ? activeColor : navColor }}
                >
                  {label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 h-[2px] w-full"
                      style={{ background: activeColor }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side: theme toggle + hamburger */}
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="text-xs transition-colors duration-150 hover:opacity-75"
                style={{ color: toggleColor }}
              >
                {isDark ? "light" : "dark"}
              </button>
            )}

            {/* Hamburger — mobile only */}
            <button
              className="sm:hidden flex flex-col justify-center gap-[5px] w-5 h-5 transition-opacity hover:opacity-70"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                // ✕ close icon
                <span
                  className="text-base leading-none"
                  style={{ color: navColor }}
                >
                  ✕
                </span>
              ) : (
                // ☰ three lines
                <>
                  <span
                    className="block h-[1.5px] w-full rounded-full"
                    style={{ background: navColor }}
                  />
                  <span
                    className="block h-[1.5px] w-full rounded-full"
                    style={{ background: navColor }}
                  />
                  <span
                    className="block h-[1.5px] w-full rounded-full"
                    style={{ background: navColor }}
                  />
                </>
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {menuOpen && (
          <div
            className="sm:hidden mt-2 rounded-2xl px-5 py-4 flex flex-col gap-4"
            style={pillStyle}
          >
            {navItems.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors duration-150 hover:opacity-75"
                  style={{ color: isActive ? activeColor : navColor }}
                  onClick={() => setMenuOpen(false)}
                >
                  {isActive && (
                    <span className="mr-1" style={{ color: activeColor }}>
                      ›
                    </span>
                  )}
                  {label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
