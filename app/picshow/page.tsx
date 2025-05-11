"use client";
import { useEffect, useState, useRef } from "react";
import Header from "../components/header";
import { UpperIcon } from "../icon/upper";
import { LeftIcon } from "../icon/left";
import { RightIcon } from "../icon/right";
import Image from "next/image";
const images = [
  "/photo_showcase/img1.jpg",
  "/photo_showcase/img2.jpg",
  "/photo_showcase/img3.jpg",
  "/photo_showcase/img4.jpg",
  "/photo_showcase/img5.jpg",
  "/photo_showcase/img6.jpg",
  "/photo_showcase/img7.jpg",
  "/photo_showcase/img8.jpg",
  "/photo_showcase/img9.jpg",
  "/photo_showcase/img12.jpg",
  "/photo_showcase/img13.jpg",
  "/photo_showcase/img14.jpg",
  "/photo_showcase/img15.jpg",
  "/photo_showcase/img16.jpg",
  "/photo_showcase/img17.jpg",
  "/photo_showcase/img18.jpg",
  "/photo_showcase/img19.jpg",
  "/photo_showcase/img20.jpg",
  "/photo_showcase/img21.jpg",
  "/photo_showcase/img22.jpg",
  "/photo_showcase/img23.jpg",
  "/photo_showcase/img24.jpg",
  "/photo_showcase/img25.jpg",
  "/photo_showcase/img26.jpg",
  "/photo_showcase/img27.jpg",
  "/photo_showcase/img28.jpg",
  "/photo_showcase/img30.jpg",
  "/photo_showcase/img31.jpg",
  "/photo_showcase/img32.jpg",
  "/photo_showcase/img33.jpg",
  "/photo_showcase/img34.jpg",
  "/photo_showcase/img36.jpg",
  "/photo_showcase/img39.jpg",
  "/photo_showcase/img40.jpg",
  "/photo_showcase/img41.jpg",
  "/photo_showcase/img42.jpg",
  "/photo_showcase/img43.jpg",
  "/photo_showcase/img45.jpg",
  "/photo_showcase/img47.jpg",
  "/photo_showcase/img48.jpg",
  "/photo_showcase/img49.jpg",
  "/photo_showcase/img50.jpg",
  "/photo_showcase/img52.jpg",
  "/photo_showcase/img53.jpg",
  "/photo_showcase/img54.jpg",
  "/photo_showcase/img55.jpg",
  "/photo_showcase/img56.jpg",
  "/photo_showcase/img57.jpg",
  "/photo_showcase/img58.jpg",
  "/photo_showcase/may_update1.jpeg",
  "/photo_showcase/may_update2.jpeg",
  "/photo_showcase/may_update3.jpeg",
  "/photo_showcase/may_update4.jpeg",
  "/photo_showcase/may_update5.jpeg",
  "/photo_showcase/may_update6.jpeg",
  "/photo_showcase/may_update7.jpeg",
  "/photo_showcase/may_update8.jpeg",
  "/photo_showcase/may_update9.jpeg",
  "/photo_showcase/may_update10.jpeg",
  "/photo_showcase/may_update11.jpeg",
  "/photo_showcase/may_update12.jpeg",
  "/photo_showcase/may_update13.jpeg",
  "/photo_showcase/may_update16.jpeg",
  "/photo_showcase/may_update19.jpeg",
  "/photo_showcase/may_delhi1.jpg",
  "/photo_showcase/may_delhi2.jpg",
  "/photo_showcase/may_delhi3.jpg",
  "/photo_showcase/may_delhi4.jpg",
  "/photo_showcase/may_delhi5.jpg",
  "/photo_showcase/may_delhi6.jpg",
  "/photo_showcase/may_delhi7.jpg",
  "/photo_showcase/may_delhi8.jpeg",
  "/photo_showcase/may_delhi9.jpg",
  "/photo_showcase/may_delhi10.jpg",
  "/photo_showcase/may_delhi11.png",
  "/photo_showcase/may_delhi12.jpg",
  "/photo_showcase/may_delhi13.jpg",
  "/photo_showcase/may_delhi14.jpg",
  "/photo_showcase/may_delhi15.jpg",
  "/photo_showcase/may_delhi16.jpg",
  "/photo_showcase/may_delhi17.jpg",
  "/photo_showcase/may_delhi18.jpg",
  "/photo_showcase/may_delhi19.jpeg",
  "/photo_showcase/may_delhi20.jpg",
  "/photo_showcase/may_delhi21.jpg",
  "/photo_showcase/may_delhi22.jpg",
  "/photo_showcase/may_delhi23.jpg",
  "/photo_showcase/may_delhi24.jpg",
  "/photo_showcase/may_delhi25.jpg",
  "/photo_showcase/may_delhi26.jpg",
  "/photo_showcase/may_delhi27.jpg",
  "/photo_showcase/may_delhi28.jpg",
  "/photo_showcase/may_delhi29.jpg",
  "/photo_showcase/may_delhi30.jpg",
  "/photo_showcase/may_delhi31.jpg",
  "/photo_showcase/may_delhi32.jpg",
  "/photo_showcase/may_delhi33.jpg",
  "/photo_showcase/may_delhi34.jpg",
  "/photo_showcase/may_delhi35.jpg",
  "/photo_showcase/may_delhi36.jpg",
  "/photo_showcase/may_delhi37.jpg",
  "/photo_showcase/may_delhi38.jpg",
  "/photo_showcase/may_delhi39.jpg",
  "/photo_showcase/may_delhi40.jpg",
  "/photo_showcase/may_delhi41.jpg",
  "/photo_showcase/may_delhi42.jpg",
  "/photo_showcase/may_delhi43.jpg",
  "/photo_showcase/may_delhi44.jpg",
  "/photo_showcase/may_delhi45.jpg",
  "/photo_showcase/may_delhi46.jpg",
  "/photo_showcase/may_delhi47.jpg",
  "/photo_showcase/may_delhi48.jpg",
  "/photo_showcase/may_delhi49.jpg",
  "/photo_showcase/may_delhi50.jpg",
  "/photo_showcase/may_delhi51.jpg",
  "/photo_showcase/may_delhi52.jpg",
  "/photo_showcase/may_delhi53.jpg",
  "/photo_showcase/may_delhi54.jpg",
];

export default function Photo() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showScrollBtn, setScrollBtn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentImgIndex, setCurrentImgIndex] = useState<number | null>(null);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const initialized = useRef(false);

  // Improved shuffle function
  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    if (!initialized.current) {
      setShuffledImages(shuffleArray(images));
      initialized.current = true;
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openImage = (index: number) => {
    setCurrentImgIndex(index);
    setSelectedImg(shuffledImages[index]);
  };

  const closeImage = () => {
    setCurrentImgIndex(null);
    setSelectedImg(null);
  };

  const navigateImage = (direction: "next" | "prev") => {
    if (currentImgIndex === null) return;

    const newIndex =
      direction === "next"
        ? (currentImgIndex + 1) % shuffledImages.length
        : (currentImgIndex - 1 + shuffledImages.length) % shuffledImages.length;

    setCurrentImgIndex(newIndex);
    setSelectedImg(shuffledImages[newIndex]);
  };

  const FrozenCount = ({ length }: { length: number }) => {
    const [count, setCount] = useState(0);
    const animationRef = useRef<number>(0);
    const startTime = useRef<number>(0);
    const duration = 10000;

    useEffect(() => {
      const animate = (timestamp: number) => {
        if (!startTime.current) startTime.current = timestamp;

        const progress = timestamp - startTime.current;
        const percentage = Math.min(progress / duration, 1);
        const currentCount = Math.floor(percentage * length);

        setCount(currentCount);

        if (percentage < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      // Reset animation when length changes
      setCount(0);
      startTime.current = undefined;
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [length]);

    return (
      <h1 className="text-5xl font-bold tracking-tight py-2 px-5 opacity-15 text-outline">
        Frozen Moments: {count.toString().padStart(2, "0")}
      </h1>
    );
  };

  return (
    <>
      <Header />
      <div className="">
        <h1 className="text-8xl font-bold tracking-tight py-20 px-5 opacity-20 text-outline">
          Favorite Frozen Moments
        </h1>
        {!loading && shuffledImages.length > 0 && (
          <FrozenCount length={shuffledImages.length} />
        )}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-16">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-60 bg-gray-200 animate-pulse rounded-lg"
              />
            ))
          : shuffledImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt={`Frozen moment ${index + 1}`}
                width={600}
                height={400}
                onClick={() => openImage(index)}
                className="cursor-pointer object-cover w-full h-60 rounded-lg hover:scale-95 transition-transform duration-300"
                priority={index < 8}
              />
            ))}
      </div>

      {/* Scroll to top button */}
      {showScrollBtn && (
        <button
          className="fixed bottom-6 right-6 bg-black/80 text-white p-3 rounded-full shadow-xl hover:bg-black transition-all"
          onClick={scrollToTop}
        >
          <UpperIcon className="w-6 h-6" />
        </button>
      )}

      {/* Lightbox overlay */}
      {selectedImg && currentImgIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <button
            className="absolute left-6 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
          >
            <LeftIcon className="w-6 h-6" />
          </button>

          <img
            src={selectedImg}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-6 bg-black/50 text-white p-3 rounded-full hover:bg-black/80 transition-all"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
          >
            <RightIcon className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  );
}