"use client";
import { useState, useEffect } from "react";
<<<<<<< Updated upstream
import GithubIcon from "../icon/github";
import Linkedin from "../icon/linkedin";
import Gmail from "../icon/gmail";
import Dark from "../icon/dark";
import Light from "../icon/light";
import PhotoIcon from "../icon/photo";
import BlogIcon from "../icon/blog";
import ProjectIcon from "../icon/project";
import Link from "next/link";
import { ResumeIcon } from "../icon/resume";
import DesignIcon from "../icon/design";

export default function Header() {
  const [isDarkmode, setisDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const initialTheme = savedTheme ? savedTheme === "dark" : systemTheme;
      setisDarkMode(initialTheme);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkmode) {
      html.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkmode]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-3 rounded-full shadow-xl backdrop-blur-lg bg-black border border-tertiary flex justify-between items-center animate-fade-in-up">
      {/* Logo */}

      <Link
        href="/"
        className="text-lightPurple text-xl font-semibold tracking-widest"
      >
        GOURAV
      </Link>

      {/* Icon Group */}
      <div className="flex items-center gap-4">
        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <div className="group relative flex flex-col items-center">
            <a
              href="https://www.linkedin.com/in/gourav-anand-jha/"
              target="_blank"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
            >
              <Linkedin />
            </a>
            <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-lightPurple text-sm px-3 py-1 rounded-md shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none z-50">
              LinkedIn
              <span className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/30 backdrop-blur-md rotate-45 z-[-1]" />
            </span>
          </div>
          <div className="group relative flex flex-col items-center">
            <a
              href="https://github.com/venomusblood568"
              target="_blank"
              aria-label="GitHub"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-lightPurple text-sm px-3 py-1 rounded-md shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none z-50">
                Github
                <span className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/30 backdrop-blur-md rotate-45 z-[-1]" />
              </span>
            </a>
          </div>
          <div className="group relative flex flex-col items-center">
            <a href="mailto:gouravanand0354@gamil.com" aria-label="Email">
              <Gmail />
              <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-lightPurple text-sm px-3 py-1 rounded-md shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none z-50">
                Gmail
                <span className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/30 backdrop-blur-md rotate-45 z-[-1]" />
              </span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[2px] h-6 bg-gray-500 mx-2" />

        {/* Navigation Icons */}
        <div className="flex items-center gap-3">
          {[
            { href: "/resume", label: "Resume", icon: <ResumeIcon /> },
            { href: "/project", label: "Project", icon: <ProjectIcon /> },
            { href: "/design", label: "Design", icon: <DesignIcon /> },
            { href: "/picshow", label: "Clicks", icon: <PhotoIcon /> },
            { href: "/blog", label: "Blog", icon: <BlogIcon /> },
          ].map(({ href, label, icon }) => (
            <Link
              href={href}
              key={href}
              aria-label={label}
              className="group relative flex items-center"
            >
              {icon}
              <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md text-lightPurple text-sm px-3 py-1 rounded-md shadow-md opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none z-50">
                {label}
                <span className="absolute top-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white/30 backdrop-blur-md rotate-45 z-[-1]" />
              </span>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="w-[2px] h-6 bg-gray-500 mx-2" />

        {/* Theme Toggle */}
        <div
          onClick={() => setisDarkMode(!isDarkmode)}
          className="cursor-pointer"
=======
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
>>>>>>> Stashed changes
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
