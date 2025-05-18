"use client";
import { useState, useEffect } from "react";
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
          <a
            href="https://www.linkedin.com/in/gourav-anand-jha/"
            target="_blank"
            aria-label="LinkedIn"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
          <a
            href="https://github.com/venomusblood568"
            target="_blank"
            aria-label="GitHub"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
          <a href="mailto:gouravanand0354@gamil.com" aria-label="Email">
            <Gmail />
          </a>
        </div>

        {/* Divider */}
        <div className="w-[2px] h-6 bg-gray-500 mx-2" />

        {/* Navigation Icons */}
        <div className="flex items-center gap-3">
          <Link href="/resume" aria-label="Resume">
            <ResumeIcon />
          </Link>
          <Link href="/project" aria-label="Projects">
            <ProjectIcon />
          </Link>
          <Link href="/design" aria-label="Designs">
            <DesignIcon />
          </Link>
          <Link href="/picshow" aria-label="Photos">
            <PhotoIcon />
          </Link>
          <Link href="/blog" aria-label="Blog">
            <BlogIcon />
          </Link>
        </div>

        {/* Divider */}
        <div className="w-[2px] h-6 bg-gray-500 mx-2" />

        {/* Theme Toggle */}
        <div
          onClick={() => setisDarkMode(!isDarkmode)}
          className="cursor-pointer"
        >
          {isDarkmode ? <Light /> : <Dark />}
        </div>
      </div>
    </header>
  );
}
