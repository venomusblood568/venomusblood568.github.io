"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import GithubIcon from "../icon/github";
import Linkedin from "../icon/linkedin";
import Gmail from "../icon/gmail";
import Dark from "../icon/dark";
import Light from "../icon/light";
import PhotoIcon from "../icon/photo";
import BlogIcon from "../icon/blog";
import ProjectIcon from "../icon/project";
import { ResumeIcon } from "../icon/resume";
import DesignIcon from "../icon/design";

export default function Header() {
  const pathname = usePathname(); // ✅ CHANGE: current route
  const [isDarkmode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : systemTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark-theme", isDarkmode);
    localStorage.setItem("theme", isDarkmode ? "dark" : "light");
  }, [isDarkmode]);

  const navItems = [
    { href: "/resume", label: "Resume", icon: ResumeIcon },
    { href: "/project", label: "Project", icon: ProjectIcon },
    { href: "/design", label: "Design", icon: DesignIcon },
    { href: "/picshow", label: "Clicks", icon: PhotoIcon },
    { href: "/blog", label: "Blog", icon: BlogIcon },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl px-6 py-3 rounded-full shadow-xl backdrop-blur-lg bg-black border border-gray-200 flex justify-between items-center">
      <Link
        href="/"
        className="text-lightPurple text-xl font-semibold tracking-widest"
      >
        GOURAV
      </Link>

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

        <div className="w-[2px] h-6 bg-gray-500 mx-2" />

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`); // ✅ CHANGE

            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`group relative flex items-center transition-transform
                  ${isActive ? "scale-110" : "opacity-70 hover:opacity-100"}
                `}
              >
                <Icon
                  className={
                    isActive
                      ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                      : "text-gray-400 group-hover:text-white"
                  }
                />
              </Link>
            );
          })}
        </div>

        <div className="w-[2px] h-6 bg-gray-500 mx-2" />

        {/* Theme Toggle */}
        <div
          onClick={() => setIsDarkMode(!isDarkmode)}
          className="cursor-pointer"
        >
          {isDarkmode ? <Light /> : <Dark />}
        </div>
      </div>
    </header>
  );
}
