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
  span?: "wide" | "tall" | "normal";
};

const WEBSITES: Project[] = [
  {
    title: "Neuron",
    desc: "Space to store and organize thoughts, inspiration and knowledge.",
    github: "https://github.com/venomusblood568/Neuron-front-end",
    live: "https://neuron-duck.vercel.app/",
    badge: "FEATURED",
    active: true,
    span: "wide",
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
    title: "Dash",
    desc: "Keyboard-first browser launcher for instant navigation.",
    github: "https://github.com/venomusblood568/dash",
    badge: "FEATURED",
    active: true,
    span: "wide",
  },
  {
    title: "Link Vault",
    desc: "Save and organize all your links for later visits.",
    github: "https://github.com/venomusblood568/linkvault",
  },
  {
    title: "Infohub",
    desc: "Save and reuse frequently typed text snippets.",
    github: "https://github.com/venomusblood568/Infohub",
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
];

const LEARNING: Project[] = [
  {
    title: "Paytm Clone",
    desc: "Full-stack clone with user auth, wallet balance tracking, and money transfer.",
    github: "https://github.com/venomusblood568/paytm-clone",
    span: "wide",
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
      className={`transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

function ProjectCard({
  project,
  isDark,
  accent,
  accentBg,
  accentBorder,
  textMid,
  textDim,
  featured = false,
}: {
  project: Project;
  isDark: boolean;
  accent: string;
  accentBg: string;
  accentBorder: string;
  textMid: string;
  textDim: string;
  featured?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: project.span === "wide" ? "span 2" : "span 1",
        background: featured
          ? isDark
            ? "#0a1a0f"
            : "#f0fdf4"
          : isDark
            ? "#111"
            : "#fff",
        border: `1px solid ${
          hovered
            ? featured
              ? accentBorder
              : isDark
                ? "#2a2a2a"
                : "#d1d5db"
            : featured
              ? accentBorder
              : isDark
                ? "#1a1a1a"
                : "#e5e7eb"
        }`,
        borderRadius: "12px",
        padding: "1.1rem 1.25rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "130px",
        transition: "border-color 0.15s, transform 0.15s",
        transform: hovered ? "translateY(-1px)" : "none",
        cursor: "default",
      }}
    >
      {/* Top */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "6px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: isDark ? "#e5e7eb" : "#111827",
            }}
          >
            {project.title}
          </span>

          {project.badge && (
            <span
              style={{
                fontSize: "9px",
                letterSpacing: "0.12em",
                padding: "2px 8px",
                borderRadius: "99px",
                background: accentBg,
                border: `1px solid ${accentBorder}`,
                color: accent,
              }}
            >
              {project.badge}
            </span>
          )}

          {project.active && (
            <span
              style={{
                position: "relative",
                display: "inline-flex",
                width: 8,
                height: 8,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#4ade80",
                  opacity: 0.75,
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  borderRadius: "50%",
                  width: 8,
                  height: 8,
                  background: "#22c55e",
                }}
              />
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: "12px",
            lineHeight: 1.6,
            color: textMid,
            marginBottom: "12px",
          }}
        >
          {project.desc}
        </p>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "16px" }}>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "11px",
            color: textDim,
            textDecoration: "none",
            transition: "color 0.15s",
          }}
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
            style={{
              fontSize: "11px",
              color: textDim,
              textDecoration: "none",
              transition: "color 0.15s",
            }}
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

function BentoSection({
  label,
  projects,
  isDark,
  accent,
  accentBg,
  accentBorder,
  textMid,
  textDim,
  divider,
}: {
  label: string;
  projects: Project[];
  isDark: boolean;
  accent: string;
  accentBg: string;
  accentBorder: string;
  textMid: string;
  textDim: string;
  divider: string;
}) {
  const sharedProps = {
    isDark,
    accent,
    accentBg,
    accentBorder,
    textMid,
    textDim,
  };

  return (
    <FadeSection>
      <section style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.25em",
            color: accent,
            marginBottom: "1rem",
          }}
        >
          {label}
        </p>

        {/*
          Bento grid: 2 columns on desktop, 1 column on mobile.
          "wide" cards span 2 cols on desktop, always full width on mobile.
          We use a CSS class + a <style> tag injected once.
        */}
        <div className="bento-grid">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              featured={i === 0 && p.span === "wide"}
              {...sharedProps}
            />
          ))}
        </div>
      </section>

      <div
        style={{
          borderTop: `1px solid ${divider}`,
          marginBottom: "2.5rem",
        }}
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
  const accentBg = isDark ? "#052e16" : "#f0fdf4";
  const accentBorder = isDark ? "#14532d" : "#bbf7d0";
  const divider = isDark ? "#1f2937" : "#e5e7eb";
  const textPri = isDark ? "#f0f0f0" : "#111827";
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const textDim = isDark ? "#4b5563" : "#9ca3af";

  const sharedProps = {
    isDark,
    accent,
    accentBg,
    accentBorder,
    textMid,
    textDim,
    divider,
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Bento grid responsive styles */}
      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* 2-col bento on sm+ screens */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }

        /* On mobile (< 480px): single column, wide cards fill full width */
        @media (max-width: 479px) {
          .bento-grid {
            grid-template-columns: 1fr;
          }
          /* Override inline gridColumn: span 2 */
          .bento-grid > * {
            grid-column: span 1 !important;
          }
        }
      `}</style>

      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-3xl font-mono">
          {/* Hero */}
          <section style={{ marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "13px",
                color: accent,
                marginBottom: "1rem",
                opacity: 0,
                animation: "fadeup 0.4s ease 0.2s forwards",
              }}
            >
              $ ls ./projects
            </p>
            <h1
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: textPri,
                marginBottom: "1rem",
                opacity: 0,
                animation: "fadeup 0.5s ease 0.5s forwards",
              }}
            >
              Projects
            </h1>
            <p
              style={{
                fontSize: "13px",
                lineHeight: 1.7,
                maxWidth: "440px",
                color: textMid,
                opacity: 0,
                animation: "fadeup 0.5s ease 0.8s forwards",
              }}
            >
              A collection of things I&apos;ve built or currently maintain —
              across web, Python, and browser tools.
            </p>
          </section>

          <div
            style={{
              borderTop: `1px solid ${divider}`,
              marginBottom: "2.5rem",
            }}
          />

          <BentoSection
            label="// WEBSITES"
            projects={WEBSITES}
            {...sharedProps}
          />
          <BentoSection label="// PYTHON" projects={PYTHON} {...sharedProps} />
          <BentoSection
            label="// CHROME EXTENSIONS"
            projects={EXTENSIONS}
            {...sharedProps}
          />
          <BentoSection
            label="// LEARNING"
            projects={LEARNING}
            {...sharedProps}
          />

          <FadeSection>
            <p style={{ fontSize: "12px", color: textDim }}>
              ...and there&apos;s a lot more on the horizon.
            </p>
          </FadeSection>
        </div>
      </main>
    </div>
  );
}
