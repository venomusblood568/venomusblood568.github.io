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
    if (typeof document !== "undefined") {
      const html = document.documentElement;
      if (isDarkmode) {
        html.classList.add("dark-theme");
        localStorage.setItem("theme", "dark");
      } else {
        html.classList.remove("dark-theme");
        localStorage.setItem("theme", "light");
      }
    }
  }, [isDarkmode]);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center p-4 bg-black backdrop-blur-lg rounded-full shadow-xl z-50 w-[90%] max-w-4xl border border-tertiary animate-fade-in-up">
      <div className="flex items-center text-gray-400 text-lightPurple text-xl tracking-widest font-sans">
        <Link href="/">GOURAV</Link>
      </div>
      <div className="flex gap-3">
        <div className="transition duration-300">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/gourav-anand-jha/"
            aria-label="LinkedIn Profile"
          >
            <Linkedin />
          </a>
        </div>
        <div className="transition duration-300">
          <a
            href="https://github.com/venomusblood568"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
          >
            <GithubIcon />
          </a>
        </div>
        <div className="transition duration-300">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:gouravanand0354@gamil.com"
            aria-label="Email"
          >
            <Gmail />
          </a>
        </div>
        <div className="transition duration-300">
          <a>
            <ProjectIcon />
          </a>
        </div>
        <div className="transition duration-300">
          <Link href="/picshow">
            <PhotoIcon />
          </Link>
        </div>
        <div className="transition duration-300">
          <a>
            <BlogIcon />
          </a>
        </div>
        <div
          className="transition duration-100 cursor-pointer"
          onClick={() => setisDarkMode(!isDarkmode)}
        >
          {isDarkmode ? <Light /> : <Dark />}
        </div>
      </div>
    </header>
  );
}
