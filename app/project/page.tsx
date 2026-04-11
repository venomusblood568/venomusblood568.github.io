"use client";

import { useState, useEffect, useRef } from "react";
import Header from "../components/header";

type Project = {
  title: string;
  desc: string;
  github: string;
  live?: string;
  badge?: string;
  active?: boolean;
};

const WIP: Project[] = [
  {
    title: "Hound",
    desc: "Lean, developer-friendly monitoring platform that automatically checks websites/APIs, provides insights, and alerts owners in real-time.",
    github: "https://github.com/venomusblood568/hound",
    live: "#",
    badge: "LATEST",
    active: true,
  },
];

const WEBSITES: Project[] = [
  {
    title: "Neuron",
    desc: "Space to store and organize thoughts, inspiration and knowledge.",
    github: "https://github.com/venomusblood568/Neuron-front-end",
    live: "https://neuron-duck.vercel.app/",
  },
  {
    title: "Hue",
    desc: "Mimicking Ray.so to understand how it works under the hood.",
    github: "https://github.com/venomusblood568/hue",
    live: "https://hue-duck.vercel.app/",
  },
  {
    title: "xRayDent",
    desc: "A sleek React app for dental imaging with intuitive tools.",
    github: "https://github.com/venomusblood568/xRayDent",
    live: "https://xraydent-duck.vercel.app/",
  },
  {
    title: "VoltPoint",
    desc: "Web app to manage EV chargers with login, CRUD, and map view.",
    github: "https://github.com/venomusblood568/VoltPoint",
    live: "https://voltpoint-duck.vercel.app/",
  },
  {
    title: "Fine",
    desc: "Track your money, accounts, and stocks. Smart personal finance tool.",
    github: "https://github.com/venomusblood568/fine",
    live: "https://fine-duck.vercel.app/",
  },
];

const PYTHON: Project[] = [
  {
    title: "OceanWatch",
    desc: "Revolutionising ocean waste management with YOLOv8.",
    github: "https://github.com/venomusblood568/OceanWatch",
  },
  {
    title: "Rusher",
    desc: "Platformer game in Python & Pygame with movement and collision detection.",
    github: "https://github.com/venomusblood568/Project5/tree/main/Rusher",
  },
];

const EXTENSIONS: Project[] = [
  {
    title: "Link Vault",
    desc: "Save and organize all your links for later visits.",
    github: "https://github.com/venomusblood568/linkvault",
  },
  {
    title: "Hyper Flow",
    desc: "Adjust YouTube playback speed from 0.5x to 4x with ease.",
    github: "https://github.com/venomusblood568/HyperFlow_playcontrol",
  },
  {
    title: "GitaVerses",
    desc: "Random Bhagavad Gita verse with one click — daily spiritual insight.",
    github: "https://github.com/venomusblood568/Project5/tree/main/GitaVerses",
  },
  {
    title: "Infohub",
    desc: "Save and reuse frequently typed text snippets.",
    github: "https://github.com/venomusblood568/Infohub",
  },
];

const LEARNING: Project[] = [
  {
    title: "Paytm Clone",
    desc: "Full-stack clone with user auth, wallet balance tracking, and money transfer.",
    github: "https://github.com/venomusblood568/paytm-clone",
  },
];

function useInView(threshold = 0.1) {
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
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      {children}
    </div>
  );
}

function ProjectCard({
  project,
  isDark,
  accent,
  textMid,
  textDim,
}: {
  project: Project;
  isDark: boolean;
  accent: string;
  textMid: string;
  textDim: string;
}) {
  return (
    <div
      className="rounded-lg p-5 transition-all duration-150 group"
      style={{
        border: `1px solid ${isDark ? "#1a1a1a" : "#e5e7eb"}`,
        background: isDark ? "#111" : "#fff",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = isDark
          ? "#2a2a2a"
          : "#d1d5db";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = isDark
          ? "#1a1a1a"
          : "#e5e7eb";
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
        <span
          className="text-sm font-medium transition-colors duration-150 group-hover:opacity-80"
          style={{ color: isDark ? "#e5e7eb" : "#1f2937" }}
        >
          {project.title}
        </span>

        {project.badge && (
          <span
            className="text-[9px] tracking-[0.15em] px-2 py-0.5 rounded-full"
            style={{
              background: isDark ? "#052e16" : "#f0fdf4",
              border: `1px solid ${isDark ? "#14532d" : "#bbf7d0"}`,
              color: accent,
            }}
          >
            {project.badge}
          </span>
        )}

        {project.active && (
          <span className="relative flex h-2 w-2 ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
        )}
      </div>

      <p className="text-xs leading-relaxed mb-4" style={{ color: textMid }}>
        {project.desc}
      </p>

      <div className="flex gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs transition-colors duration-150 hover:opacity-100"
          style={{ color: textDim }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = accent)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = textDim)
          }
        >
          &gt; GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-colors duration-150"
            style={{ color: textDim }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = accent)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = textDim)
            }
          >
            &gt; Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

function Section({
  label,
  projects,
  isDark,
  accent,
  textMid,
  textDim,
  divider,
  grid = false,
}: {
  label: string;
  projects: Project[];
  isDark: boolean;
  accent: string;
  textMid: string;
  textDim: string;
  divider: string;
  grid?: boolean;
}) {
  return (
    <FadeSection>
      <section className="mb-12">
        <p
          className="text-[10px] tracking-[0.25em] mb-5"
          style={{ color: accent }}
        >
          {label}
        </p>
        <div
          className={
            grid
              ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
              : "flex flex-col gap-3"
          }
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.title}
              project={p}
              isDark={isDark}
              accent={accent}
              textMid={textMid}
              textDim={textDim}
            />
          ))}
        </div>
      </section>
      <div
        style={{ borderTop: `1px solid ${divider}`, marginBottom: "3rem" }}
      />
    </FadeSection>
  );
}

export default function Projects() {
  const [isDark, setIsDark] = useState(false);

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

  const sharedProps = { isDark, accent, textMid, textDim, divider };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{ backgroundColor: bg }}
    >
      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl font-mono">
          {/* Hero */}
          <section className="mb-16">
            <p
              className="text-sm mb-4 opacity-0 animate-[fadeup_0.4s_ease_0.2s_forwards]"
              style={{ color: accent }}
            >
              $ ls ./projects
            </p>
            <h1
              className="text-4xl sm:text-5xl font-normal leading-tight mb-4 opacity-0 animate-[fadeup_0.5s_ease_0.5s_forwards]"
              style={{ color: textPri }}
            >
              Projects
            </h1>
            <p
              className="text-sm leading-relaxed max-w-lg opacity-0 animate-[fadeup_0.5s_ease_0.8s_forwards]"
              style={{ color: textMid }}
            >
              A collection of things I&apos;ve built or currently maintain —
              across web, Python, and browser tools.
            </p>
          </section>

          <div
            style={{ borderTop: `1px solid ${divider}`, marginBottom: "3rem" }}
          />

          <Section label="// WIP" projects={WIP} {...sharedProps} />
          <Section label="// WEBSITES" projects={WEBSITES} {...sharedProps} />
          <Section label="// PYTHON" projects={PYTHON} {...sharedProps} grid />
          <Section
            label="// CHROME EXTENSIONS"
            projects={EXTENSIONS}
            {...sharedProps}
            grid
          />
          <Section label="// LEARNING" projects={LEARNING} {...sharedProps} />

          <FadeSection>
            <p className="text-xs" style={{ color: textDim }}>
              ...and there&apos;s a lot more on the horizon.
            </p>
          </FadeSection>
        </div>
      </main>
    </div>
  );
}
