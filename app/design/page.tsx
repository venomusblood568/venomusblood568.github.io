"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import { UpperIcon } from "../icon/upper";
import { LeftIcon } from "../icon/left";
import { RightIcon } from "../icon/right";

const images = [
  "/uidesign/design1.png",
  "/uidesign/design2.png",
  "/uidesign/design3.png",
  "/uidesign/design4.png",
  "/uidesign/design5.png",
  "/uidesign/design6.png",
  "/uidesign/design7.png",
  "/uidesign/design8.png",
  "/uidesign/design10.png",
  "/uidesign/design11.png",
  "/uidesign/design12.png",
  "/uidesign/design13.png",
  "/uidesign/design16.png",
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

function FadeCard({
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

export default function Design() {
  const [isDark, setIsDark] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    Array(images.length).fill(false),
  );
  const [showScrollBtn, setShowScrollBtn] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => setShowScrollBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (currentImgIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "Escape") closeImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentImgIndex]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  const openImage = (index: number) => {
    setCurrentImgIndex(index);
    setSelectedImg(images[index]);
  };

  const closeImage = () => {
    setCurrentImgIndex(null);
    setSelectedImg(null);
  };

  const nextImg = () => {
    if (currentImgIndex === null) return;
    const newIndex = (currentImgIndex + 1) % images.length;
    setCurrentImgIndex(newIndex);
    setSelectedImg(images[newIndex]);
  };

  const prevImg = () => {
    if (currentImgIndex === null) return;
    const newIndex = (currentImgIndex - 1 + images.length) % images.length;
    setCurrentImgIndex(newIndex);
    setSelectedImg(images[newIndex]);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const accent = isDark ? "#4ade80" : "#16a34a";
  // const bg = isDark ? "#0a0a0a" : "#f9fafb";
  const divider = isDark ? "#1f2937" : "#e5e7eb";
  const textPri = isDark ? "#f0f0f0" : "#111827";
  const textMid = isDark ? "#9ca3af" : "#6b7280";
  const textDim = isDark ? "#374151" : "#9ca3af";
  const cardBg = isDark ? "#111" : "#fff";
  const cardBorder = isDark ? "#1a1a1a" : "#e5e7eb";

  // Lightbox nav buttons are always dark so they're visible in both light and dark mode
  const navBtnStyle: React.CSSProperties = {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    color: "#e5e7eb",
  };

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      // style={{ backgroundColor: bg }}
    >
      <Header />

      <main className="flex justify-center px-4 pt-36 pb-24 sm:px-10 md:px-16 lg:px-32">
        <div className="w-full max-w-5xl font-mono">
          {/* Hero */}
          <section className="mb-16 max-w-3xl">
            <p
              className="text-sm mb-4 opacity-0 animate-[fadeup_0.4s_ease_0.2s_forwards]"
              style={{ color: accent }}
            >
              $ ls ./design
            </p>
            <h1
              className="text-4xl sm:text-5xl font-normal leading-tight mb-4 opacity-0 animate-[fadeup_0.5s_ease_0.5s_forwards]"
              style={{ color: textPri }}
            >
              Design Showcase
            </h1>
            <p
              className="text-sm leading-relaxed max-w-lg opacity-0 animate-[fadeup_0.5s_ease_0.8s_forwards]"
              style={{ color: textMid }}
            >
              A collection of simple UI samples I built while learning and
              exploring different frontend techniques. Just experiments — no
              rules.
            </p>
          </section>

          <div
            style={{ borderTop: `1px solid ${divider}`, marginBottom: "3rem" }}
          />

          <p
            className="text-[10px] tracking-[0.25em] mb-8 opacity-0 animate-[fadeup_0.4s_ease_1s_forwards]"
            style={{ color: accent }}
          >
            {`// ${images.length} FRAMES`}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((src, index) => (
              <FadeCard key={index} delay={index * 40}>
                <div
                  className="relative h-52 rounded-lg overflow-hidden cursor-pointer group"
                  style={{
                    border: `1px solid ${cardBorder}`,
                    background: cardBg,
                  }}
                  onClick={() => openImage(index)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      isDark ? "#2a2a2a" : "#d1d5db";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor =
                      cardBorder;
                  }}
                >
                  {!loadedImages[index] && (
                    <div
                      className="absolute inset-0 animate-pulse z-10"
                      style={{ background: isDark ? "#1a1a1a" : "#f3f4f6" }}
                    />
                  )}
                  <Image
                    src={src}
                    alt={`design-${index + 1}`}
                    fill
                    quality={75}
                    className={`object-cover transition-all duration-300 ${
                      loadedImages[index]
                        ? "opacity-100 group-hover:scale-[1.02] group-hover:opacity-90"
                        : "opacity-0"
                    }`}
                    onLoadingComplete={() => handleImageLoad(index)}
                  />
                  <div
                    className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                    }}
                  >
                    <span
                      className="text-[10px] tracking-[0.2em]"
                      style={{ color: "#4ade80" }}
                    >
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(images.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </FadeCard>
            ))}
          </div>

          <div
            style={{ borderTop: `1px solid ${divider}`, margin: "3rem 0 2rem" }}
          />

          <p className="text-xs" style={{ color: textDim }}>
            ...more experiments on the way.
          </p>
        </div>
      </main>

      {/* Scroll to top */}
      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full transition-opacity duration-150 z-50 hover:opacity-75"
          style={{
            background: cardBg,
            border: `1px solid ${cardBorder}`,
            color: textMid,
          }}
          aria-label="Scroll to top"
        >
          <UpperIcon />
        </button>
      )}

      {/* Lightbox */}
      {selectedImg && currentImgIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.88)" }}
          onClick={closeImage}
        >
          {/* Counter pill — always dark bg regardless of page theme */}
          <div
            className="fixed top-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] px-4 py-1.5 rounded-full z-50 whitespace-nowrap"
            style={{
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              color: "#4ade80",
            }}
          >
            {String(currentImgIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </div>

          {/* ESC hint */}
          <div
            className="fixed top-6 right-6 text-[10px] tracking-[0.15em] z-50"
            style={{ color: "#6b7280" }}
          >
            ESC to close
          </div>

          {/* Prev — always dark so arrow is visible in light mode */}
          <button
            className="fixed left-4 sm:left-6 p-3 rounded-full transition-opacity duration-150 z-50 hover:opacity-75"
            style={navBtnStyle}
            onClick={(e) => {
              e.stopPropagation();
              prevImg();
            }}
            aria-label="Previous image"
          >
            <LeftIcon />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl w-full mx-20 max-h-[85vh] rounded-lg overflow-hidden"
            style={{ border: "1px solid #1f2937" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImg}
              alt={`design-${currentImgIndex + 1}`}
              width={1600}
              height={900}
              quality={90}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Next — always dark */}
          <button
            className="fixed right-4 sm:right-6 p-3 rounded-full transition-opacity duration-150 z-50 hover:opacity-75"
            style={navBtnStyle}
            onClick={(e) => {
              e.stopPropagation();
              nextImg();
            }}
            aria-label="Next image"
          >
            <RightIcon />
          </button>
        </div>
      )}
    </div>
  );
}
