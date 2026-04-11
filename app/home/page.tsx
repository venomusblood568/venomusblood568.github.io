"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/header";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

const TECHS = [
  "TypeScript",
  "Python",
  "React.js",
  "Java",
  "JavaScript",
  "Next.js",
  "Node.js",
];

const EXPERIENCES = [
  {
    id: "unity",
    company: "Unity Internet",
    location: "Bangalore",
    role: "Full-Time Software Development Engineer (SDE)",
    period: "Sep 2025 – Present",
    current: true,
    points: [
      "Building scalable backend and frontend systems for internet infrastructure products.",
    ],
  },
  {
    id: "timbre",
    company: "Timbre",
    location: "Bangalore",
    role: "Frontend Developer Intern",
    period: "Jul 2025 – Aug 2025",
    current: false,
    points: [
      "Built responsive landing pages with modern UI/UX and consistent branding.",
      "Improved SEO score to 100 and boosted Core Web Vitals with Lighthouse scores of 90+.",
    ],
  },
  {
    id: "bel",
    company: "Bharat Electronics Limited (BEL)",
    location: "Bangalore",
    role: "Mil-Com Intern",
    period: "Aug 2023 – Sep 2023",
    current: false,
    points: [
      "Assisted in developing secure communication systems for defense applications.",
      "Improved documentation workflow and optimized testing cycle efficiency by 30%.",
    ],
  },
  {
    id: "diro",
    company: "DIRO",
    location: "Vellore",
    role: "Research & Development Intern",
    period: "Feb 2023 – Mar 2023",
    current: false,
    points: [
      "Conducted analysis of vehicle performance and cost for sustainable mobility.",
      "Migrated documentation workflows from Google Docs to Notion for better collaboration.",
    ],
  },
];

function useTypewriter(text: string, speed = 80, startDelay = 400) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

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
<<<<<<< Updated upstream
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex items-center justify-center min-h-screen px-4 py-52 sm:px-10 md:px-20 lg:px-40 lg:py-52">
        <div className="w-full max-w-4xl font-mono px-4 sm:px-6 md:px-8 lg:pl-16">
          {/* === Intro Section === */}
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
          {/* === Technologies Section === */}
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

          {/* === Personal Interests === */}
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
          {/* === Work Experience === */}
          <div className="leading-relaxed text-white whitespace-pre-line">
            <p>
              Over time, I’ve had the opportunity to work at multiple places:
            </p>

            <div className="text-white">
              {/* Unity Internet */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(0)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400 flex items-center gap-2">
                    Unity Internet, Bangalore
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-sm italic text-green-300">
                      (Current)
                    </span>
                  </p>
                </div>
                {openIndex === 0 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Full-Time Software Development Engineer (SDE) (Sep 2025 –
                      Present)
                    </p>
                  </div>
                )}
              </div>

              {/* Timbre */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(1)}>
                <div className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-green-400">
                    Timbre, Bangalore
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
                          Landing Page Design:
                        </span>{" "}
                        Built responsive landing pages with modern UI/UX and
                        consistent branding.
                      </li>
                      <li>
                        <span className="font-medium">Performance:</span>{" "}
                        Improved SEO (100) and boosted Core Web Vitals with
                        Lighthouse scores of 90+.
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
                    Bharat Electronics Limited (BEL), Bangalore
                  </p>
                </div>
                {openIndex === 2 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Mil-Com Intern (Aug 2023 – Sep 2023)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        Assisted in developing secure communication systems for
                        defense applications.
                      </li>
                      <li>
                        Improved documentation workflow and optimized testing
                        cycle efficiency by 30%.
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
                    DIRO, Vellore
                  </p>
                </div>
                {openIndex === 3 && (
                  <div className="ml-6 mt-2">
                    <p className="italic">
                      Research & Development Intern (Feb 2023 – Mar 2023)
                    </p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>
                        Conducted analysis of vehicle performance and cost for
                        sustainable mobility.
                      </li>
                      <li>
                        Migrated documentation workflows from Google Docs to
                        Notion for better collaboration.
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* === Research Paper (Foldable, same spacing) === */}
              <div className="mt-4 cursor-pointer" onClick={() => toggle(4)}>
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400 mt-1">▸</span>
                  <p className="font-semibold underline text-xl text-emerald-400">
                    Published Research Paper
                  </p>
                </div>

                {openIndex === 4 && (
                  <div className="ml-6 mt-2 border-l-2 border-emerald-400 pl-4">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      Autonomous NextG Network Control Using Proximal Policy
                      Optimization
                    </h3>
                    <p className="text-sm text-gray-400 italic mb-2">
                      Published in IEEE Xplore, 2025
                    </p>

                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">
                      This work explores the use of Proximal Policy Optimization
                      (PPO) for managing NextG networks, focusing on stabilizing
                      latency and signal strength. The proposed PPO framework
                      dynamically adjusts network parameters to optimize traffic
                      control, ensuring efficient data transmission while
                      maintaining power and latency limits. A PPO-based
                      algorithm for Post Handover Management is introduced to
                      optimize reference signal received power (RSRP) and
                      latency, demonstrating a scalable, self-adaptive approach
                      to enhancing autonomous network performance in
                      next-generation wireless systems.
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <a
                        href="/researchPaper"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-colors"
                      >
                        Read Paper
                      </a>
                      <a
                        href="https://ieeexplore.ieee.org/document/11136080"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 rounded-lg text-sm font-semibold transition-colors"
                      >
                        View Online
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="leading-relaxed text-white whitespace-pre-line mt-6">
              <p>...and there’s a lot more on the horizon.</p>
            </div>

            {/* === Contact Section === */}
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
                <p className="text-xs text-gray-500 dark:text-gray-300 ">
                  © {new Date().getFullYear()} Gourav Anand — v1.1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
=======
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

export default function HomePage() {
  const allIds = EXPERIENCES.map((e) => e.id);
  const [openSet, setOpenSet] = useState<Set<string>>(new Set(allIds));
  const [isDark, setIsDark] = useState(false);
  const { displayed, done } = useTypewriter("Gourav Anand", 90, 500);

  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      const dark = html.classList.contains("dark");
      setIsDark(dark);
      document.body.style.backgroundColor = dark ? "#0a0a0a" : "#f9fafb";
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggle = (id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const accent = isDark ? "#4ade80" : "#16a34a";
  const bg = isDark ? "#0a0a0a" : "#f9fafb";
  const divider = isDark ? "#1f2937" : "#e5e7eb";
  const textPri = isDark ? "#f0f0f0" : "#111827";
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const dotLine = isDark ? "#1f2937" : "#e5e7eb";

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl font-mono">
          <section className="mb-16">
            <p
              className="text-sm mb-4 opacity-0 animate-[fadeup_0.4s_ease_0.2s_forwards]"
              style={{ color: accent }}
            >
              $ whoami
            </p>

            <h1
              className="text-4xl sm:text-5xl font-normal mb-4 leading-tight"
              style={{ color: textPri }}
            >
              <span
                className={`inline-block overflow-hidden whitespace-nowrap border-r-2 pr-1 ${
                  done ? "animate-[blink_0.9s_step-end_infinite]" : ""
                }`}
                style={{ borderColor: accent }}
              >
                {displayed}
              </span>
            </h1>

            <p
              className="text-sm mb-5 opacity-0 animate-[fadeup_0.5s_ease_1.8s_forwards]"
              style={{ color: accent }}
            >
              Software Engineer · Builder · Anime Enjoyer
            </p>

            <p
              className="text-sm leading-relaxed max-w-lg mb-8 opacity-0 animate-[fadeup_0.5s_ease_2.1s_forwards]"
              style={{ color: textMid }}
            >
              I build cool software, document what I learn, and dive into the
              latest in tech. I&apos;m a software guy at heart — driven to
              contribute to the tech universe. I completed my B.Tech from{" "}
              <a
                href="https://vit.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: accent }}
                className="hover:opacity-75 transition-opacity"
              >
                VIT
              </a>{" "}
              in Electronics and Communication. Explore my{" "}
              <a
                href="/project"
                style={{ color: accent }}
                className="hover:opacity-75 transition-opacity"
              >
                projects
              </a>{" "}
              here.
            </p>

            <div className="flex gap-3 flex-wrap opacity-0 animate-[fadeup_0.5s_ease_2.4s_forwards]">
              <a
                href="/project"
                className="px-5 py-2 text-sm rounded transition-opacity hover:opacity-75"
                style={{ border: `1px solid ${accent}`, color: accent }}
              >
                View Projects →
              </a>
              <a
                href="/resume"
                className="px-5 py-2 text-sm rounded transition-opacity hover:opacity-75"
                style={{
                  border: `1px solid ${isDark ? "#374151" : "#d1d5db"}`,
                  color: textMid,
                }}
              >
                Resume
              </a>
            </div>
          </section>

          <div
            className="mb-12"
            style={{ borderTop: `1px solid ${divider}` }}
          />

          <FadeSection>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-4"
                style={{ color: accent }}
              >
                {"// TECHNOLOGIES"}
              </p>
              <div className="flex flex-wrap gap-2">
                {TECHS.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 text-xs rounded-full"
                    style={{
                      border: `1px solid ${isDark ? "#2a2a2a" : "#e5e7eb"}`,
                      background: isDark ? "#111" : "#fff",
                      color: isDark ? "#d1d5db" : "#374151",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </FadeSection>

          <div
            className="mb-12"
            style={{ borderTop: `1px solid ${divider}` }}
          />

          <FadeSection>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-4"
                style={{ color: accent }}
              >
                {"// ABOUT"}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: textMid }}>
                Outside of building things, I love spending time watching{" "}
                <a
                  href="https://anilist.co/user/ElysianEchos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: accent }}
                  className="hover:opacity-75 transition-opacity"
                >
                  anime
                </a>{" "}
                and devlogs (behind-the-scenes game development videos). I enjoy
                gaming, though I&apos;m not playing much these days. When
                I&apos;m on the move, you&apos;ll often find me diving into
                manhwa, manga, or novels.
              </p>
            </section>
          </FadeSection>

          <div
            className="mb-12"
            style={{ borderTop: `1px solid ${divider}` }}
          />

          <FadeSection>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-8"
                style={{ color: accent }}
              >
                {"// EXPERIENCE"}
              </p>

              <div className="flex flex-col">
                {EXPERIENCES.map((exp, idx) => {
                  const isOpen = openSet.has(exp.id);
                  const isLast = idx === EXPERIENCES.length - 1;
                  const dotFill =
                    exp.current || isOpen ? accent : "transparent";
                  const dotBorder =
                    exp.current || isOpen
                      ? accent
                      : isDark
                        ? "#374151"
                        : "#d1d5db";

                  return (
                    <div key={exp.id} className="flex gap-5">
                      <div
                        className="flex flex-col items-center"
                        style={{ width: 16, flexShrink: 0 }}
                      >
                        <div
                          className="mt-1 rounded-full border-2 flex-shrink-0 transition-all duration-200"
                          style={{
                            width: 10,
                            height: 10,
                            borderColor: dotBorder,
                            backgroundColor: dotFill,
                          }}
                        />
                        {!isLast && (
                          <div
                            className="flex-1 w-px mt-1"
                            style={{ minHeight: 28, backgroundColor: dotLine }}
                          />
                        )}
                      </div>

                      <div className="pb-8 flex-1 min-w-0">
                        <button
                          onClick={() => toggle(exp.id)}
                          className="w-full text-left"
                        >
                          <div className="flex items-center gap-2.5 flex-wrap">
                            <span
                              className="text-base font-medium transition-colors duration-200"
                              style={{
                                color:
                                  exp.current || isOpen
                                    ? accent
                                    : isDark
                                      ? "#e5e7eb"
                                      : "#1f2937",
                              }}
                            >
                              {exp.company}
                            </span>

                            {exp.current && (
                              <>
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                                </span>
                                <span
                                  className="text-xs italic"
                                  style={{ color: accent }}
                                >
                                  Current
                                </span>
                              </>
                            )}
                          </div>

                          <p
                            className="text-xs mt-1"
                            style={{ color: "#9ca3af" }}
                          >
                            {exp.role} · {exp.period} · {exp.location}
                          </p>
                        </button>

                        {isOpen && (
                          <ul className="mt-3 space-y-2">
                            {exp.points.map((pt, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm"
                                style={{ color: textMid }}
                              >
                                <span
                                  className="mt-0.5 shrink-0"
                                  style={{ color: accent }}
                                >
                                  ▸
                                </span>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p
                className="text-sm mt-2"
                style={{ color: isDark ? "#4b5563" : "#9ca3af" }}
              >
                ...and there&apos;s a lot more on the horizon.
              </p>
            </section>
          </FadeSection>

          <div
            className="mb-12"
            style={{ borderTop: `1px solid ${divider}` }}
          />

          <FadeSection>
            <section className="mb-12">
              <p
                className="text-[10px] tracking-[0.25em] mb-4"
                style={{ color: accent }}
              >
                {"// RESEARCH"}
              </p>

              <div
                className="rounded-lg p-5"
                style={{
                  border: `1px solid ${isDark ? "#064e3b" : "#bbf7d0"}`,
                  background: isDark ? "#022c22" : "#f0fdf4",
                }}
              >
                <p
                  className="text-[10px] tracking-[0.2em] mb-2"
                  style={{ color: isDark ? "#6ee7b7" : "#15803d" }}
                >
                  IEEE XPLORE · 2025
                </p>
                <h3
                  className="text-base font-medium mb-3 leading-snug"
                  style={{ color: isDark ? "#f0fdf4" : "#14532d" }}
                >
                  Autonomous NextG Network Control Using Proximal Policy
                  Optimization
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: textMid }}
                >
                  This work explores the use of PPO for managing NextG networks,
                  focusing on stabilizing latency and signal strength. The
                  proposed framework dynamically adjusts network parameters to
                  optimize traffic control, ensuring efficient data transmission
                  while maintaining power and latency limits.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/researchPaper"
                    className="px-4 py-1.5 text-xs rounded transition-opacity hover:opacity-80"
                    style={{
                      background: isDark ? "#065f46" : "#16a34a",
                      color: isDark ? "#6ee7b7" : "#fff",
                    }}
                  >
                    Read Paper
                  </a>
                  <a
                    href="https://ieeexplore.ieee.org/document/11136080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 text-xs rounded transition-opacity hover:opacity-80"
                    style={{
                      border: `1px solid ${isDark ? "#065f46" : "#16a34a"}`,
                      color: isDark ? "#34d399" : "#16a34a",
                    }}
                  >
                    IEEE Xplore →
                  </a>
                </div>
              </div>
            </section>
          </FadeSection>

          <div
            className="mb-12"
            style={{ borderTop: `1px solid ${divider}` }}
          />

          <FadeSection>
            <section className="text-center">
              <p className="text-sm mb-1" style={{ color: "#9ca3af" }}>
                Recently moved to Delhi —
              </p>
              <p className="text-sm mb-8" style={{ color: textMid }}>
                feel free to reach out for coffee or collaboration.
              </p>

              <hr
                className="w-10 mx-auto mb-8"
                style={{ borderColor: isDark ? "#2a2a2a" : "#e5e7eb" }}
              />

              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-5"
                style={{ color: isDark ? "#374151" : "#d1d5db" }}
              >
                Find Me On
              </p>

              <div className="flex justify-center gap-10 mb-10">
                {[
                  {
                    Icon: FaGithub,
                    label: "GitHub",
                    href: "https://github.com/venomusblood568",
                  },
                  {
                    Icon: FaEnvelope,
                    label: "Email",
                    href: "mailto:gouravanand0354@gmail.com",
                  },
                  {
                    Icon: FaLinkedin,
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/gourav-anand-jha/",
                  },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="flex flex-col items-center gap-2 group"
                  >
                    <Icon
                      size={22}
                      className="transition-colors duration-200 group-hover:opacity-100"
                      style={{ color: textMid }}
                    />
                    <span
                      className="text-xs transition-colors duration-200"
                      style={{ color: textMid }}
                    >
                      {label}
                    </span>
                  </a>
                ))}
              </div>

              <p
                className="text-xs"
                style={{ color: isDark ? "#1f2937" : "#d1d5db" }}
              >
                © {new Date().getFullYear()} Gourav Anand — v1.1.0
              </p>
            </section>
          </FadeSection>
        </div>
      </main>
>>>>>>> Stashed changes
    </div>
  );
}
