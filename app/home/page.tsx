"use client";
import { useState } from "react";
import Header from "../components/header";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 py-52 sm:px-10 md:px-20 lg:px-40 lg:py-52">
        <div className="w-full max-w-4xl font-mono px-4 sm:px-6 md:px-8 lg:pl-16">
          <h1 className="text-4xl text-white mb-6">
            <span className="typewriter text-5xl">Gourav Anand</span>
          </h1>

          <p className="leading-relaxed text-white whitespace-pre-line">
            I build cool software, document what I learn, and dive into the
            latest in tech. I&apos;m a software guy at heart—driven to
            contribute to the tech universe.
          </p>
          <br />
          <p className="leading-relaxed text-white whitespace-pre-line">
            I completed my B.Tech from{" "}
            <a
              href="https://vit.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-300 hover:text-green-400 transition-colors"
            >
              VIT
            </a>{" "}
            in the Department of Electronics and Communication. Over time, I’ve
            developed a stronger passion for software development and computer
            science. Now, I spend my days (and nights) building cool things—with
            my trusty coffee mug always by my side. Explore my complete list of
            <a
              href="/project"
              className="font-semibold text-green-300 hover:text-green-400 transition-colors"
            >
              {" "}
              projects
            </a>{" "}
            here.
          </p>

          <br />
          <div className="text-white text-lg leading-relaxed whitespace-pre-line font-mono">
            Here are some of the technologies I&apos;ve been working with:
            <br />
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-white text-lg font-mono">
              {["TypeScript", "Python", "React.js", "Java", "JavaScript"].map(
                (tech, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <span className="text-green-400">▸</span>
                    <span>{tech}</span>
                  </div>
                )
              )}
            </div>
            <br />
          </div>

          <p className="leading-relaxed text-white whitespace-pre-line">
            Outside of building things, I love spending time watching{" "}
            <a
              href="https://anilist.co/user/ElysianEchos/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              anime
            </a>{" "}
            and devlogs (those behind-the-scenes videos on game development). I
            do enjoy gaming, though I&apos;m not playing much these days. When
            I&apos;m on the move or stumble upon a great story, you’ll often
            find me diving into manhwa, manga, or novels.
          </p>

          <br />
          <div className="leading-relaxed text-white whitespace-pre-line">
            <p>
              During my time so far, I’ve had the opportunity to work at
              multiple places.
            </p>

            <div className="text-white">
              {/* Unity Internet */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(0)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400 flex items-center gap-2">
                    Unity Internet, Bangalore, India
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm italic text-green-300">
                      (Latest)
                    </span>
                  </p>
                </div>
                {openIndex === 0 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Full-Time SDE II (Sep 2025 – Present)
                    </p>
                  </div>
                )}
              </div>

              {/* Timbre */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(1)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400">
                    Timbre, Bangalore, India
                  </p>
                </div>
                {openIndex === 1 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Frontend Developer Intern (Jul 2025 – Aug 2025)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        <span className="font-medium">
                          Landing Page design:
                        </span>{" "}
                        Designed and launched the company’s landing page with a
                        focus on responsive layouts, modern UI, and brand
                        consistency.
                      </li>
                      <li>
                        <span className="font-medium">
                          Integrations, SEO & Performance Optimization:
                        </span>{" "}
                        Implemented heatmaps, conversion tracking, and optimized
                        SEO (100) with site performance scores of 80+ mobile and
                        90+ desktop.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* BEL */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(2)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400">
                    Bharat Electronics Limited, Bangalore, India
                  </p>
                </div>
                {openIndex === 2 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Mil-Com Intern (Aug 2023 – Sep 2023)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        <span className="font-medium">
                          Military Communications:
                        </span>{" "}
                        Streamlined communication workflows, reducing
                        time-to-market by 30%.
                      </li>
                      <li>
                        <span className="font-medium">Military Radar:</span>{" "}
                        Observed development of secure, interoperable defense
                        communication systems.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* DIRO */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(3)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400">
                    DIRO, Vellore, India
                  </p>
                </div>
                {openIndex === 3 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Research & Development Intern (Feb 2023 – Mar 2023)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        <span className="font-medium">Research:</span> Conducted
                        analysis of vehicle types, performance, and cost.
                      </li>
                      <li>
                        <span className="font-medium">
                          Notion Implementation:
                        </span>{" "}
                        Transitioned team from Google Docs to Notion for better
                        collaboration.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="leading-relaxed text-white whitespace-pre-line">
              <br />
              <p>...and there’s a lot more on the horizon.</p>
            </div>

            {/* Contact Section */}
            <div className="leading-relaxed text-white whitespace-pre-line mt-10">
              <p className="text-center">
                I recently moved to Delhi — if you’re around, feel free to reach
                out for coffee or collaboration.
              </p>

              <br />
              <hr className="w-40 mx-auto border-gray-600" />
              <br />

              <div className="text-center">
                <p className="text-gray-300 mb-4 tracking-wide uppercase text-sm">
                  Find Me On
                </p>

                <div className="flex justify-center gap-8 mb-6">
                  <a
                    href="https://github.com/venomusblood568"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                  >
                    <FaGithub
                      size={28}
                      className="text-white group-hover:text-green-400 transition-colors"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-green-400 transition-colors">
                      GitHub
                    </span>
                  </a>

                  <a
                    href="mailto:gouravanand0354@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                  >
                    <FaEnvelope
                      size={28}
                      className="text-white group-hover:text-green-400 transition-colors"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-green-400 transition-colors">
                      Email
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/gourav-anand-jha/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group transition-transform hover:scale-105"
                  >
                    <FaLinkedin
                      size={28}
                      className="text-white group-hover:text-green-400 transition-colors"
                    />
                    <span className="text-sm text-gray-300 group-hover:text-green-400 transition-colors">
                      LinkedIn
                    </span>
                  </a>
                </div>

                {/* Version Info */}
                <p className="text-xs text-gray-500">
                  © {new Date().getFullYear()} Gourav Anand — v1.0.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
