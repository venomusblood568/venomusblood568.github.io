"use client";
import { useState, useEffect } from "react";
import GithubIcon from "../icon/github";
import Linkedin from "../icon/linkedin";
import Gmail from "../icon/gmail";
import Dark from "../icon/dark";
import Light from "../icon/light";
import PhotoIcon from "../icon/photo";
import BlogIcon from "../icon/blog";

type HeaderProps = {
  type: string;
};

export default function Header({ type }: HeaderProps) {
  const[isDarkmode,setisDarkMode] = useState(false);
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme ? savedTheme === 'dark' : systemTheme;
    setisDarkMode(initialTheme)
  },[])
  
  useEffect(() =>{
    const html = document.documentElement;
    if(isDarkmode){
      html.classList.add('dark-theme');
      localStorage.setItem('theme','dark');
    }else{
      html.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  },[isDarkmode])

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center p-4 bg-black backdrop-blur-lg rounded-full shadow-xl z-50 w-[95%] max-w-5xl border border-tertiary animate-fade-in-up">
      <div className="flex items-center text-white text-lightPurple text-xl tracking-widest font-sans">
        Ꮐ〇ᑌᖇᗩᐯ
      </div>
      <div className="flex gap-4">
        <div className="transition duration-300 hover:text-lightPurple hover:scale-150">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/gourav-anand-jha/"
          >
            <Linkedin />
          </a>
        </div>
        <div className="transition duration-300 hover:text-lightPurple hover:scale-150">
          <a
            href="https://github.com/venomusblood568"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </div>
        <div className="transition duration-300 hover:text-lightPurple hover:scale-150">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:gouravanand0354@gamil.com"
          >
            <Gmail />
          </a>
        </div>
        <div className="transition duration-300 hover:text-lightPurple hover:scale-150">
          <a>
            <PhotoIcon />
          </a>
        </div>
        <div className="transition duration-300 hover:text-lightPurple hover:scale-150">
          <a>
            <BlogIcon />
          </a>
        </div>
        <div
          className="transition duration-100 hover:scale-150 cursor-pointer"
          onClick={() => setisDarkMode(!isDarkmode)}
        >
          {isDarkmode ? <Light /> : <Dark />}
        </div>
      </div>
    </header>
  );
}
