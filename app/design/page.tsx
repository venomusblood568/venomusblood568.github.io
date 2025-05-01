"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
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

export default function Design() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    Array(images.length).fill(false)
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    if (currentImgIndex !== null) {
      const newIndex = (currentImgIndex + 1) % images.length;
      setCurrentImgIndex(newIndex);
      setSelectedImg(images[newIndex]);
    }
  };

  const prevImg = () => {
    if (currentImgIndex !== null) {
      const newIndex = (currentImgIndex - 1 + images.length) % images.length;
      setCurrentImgIndex(newIndex);
      setSelectedImg(images[newIndex]);
    }
  };

  return (
    <div className="min-h-screen text-white">
      <Header />

      {/* Centered Heading Section */}
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto px-4 pt-24 gap-4">
        <h1 className="text-6xl font-bold tracking-tight py-10">Design Showcase</h1>
        <p className="text-xl text-gray-300">
          A collection of simple UI samples I built while learning and exploring
          different frontend techniques. Just experiments — no rules.
        </p>
      </div>

      {/* Image Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-10">
        {images.map((src, index) => (
          <div key={index} className="relative h-60">
            {!loadedImages[index] && (
              <div className="absolute inset-0 bg-gray-500 animate-pulse rounded-lg z-10" />
            )}
            <Image
              src={src}
              alt={`image-${index}`}
              width={400}
              height={300}
              quality={75}
              className={`cursor-pointer object-cover w-full h-60 rounded transition ${
                loadedImages[index] ? "hover:opacity-80" : "opacity-0"
              }`}
              onClick={() => openImage(index)}
              onLoadingComplete={() => handleImageLoad(index)}
            />
          </div>
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showScrollBtn && (
        <button
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
          onClick={scrollToTop}
        >
          <UpperIcon />
        </button>
      )}

      {/* Image Viewer Overlay */}
      {selectedImg && currentImgIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={closeImage}
        >
          {/* Previous Button */}
          <div
            className="fixed left-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
            onClick={(e) => {
              e.stopPropagation();
              prevImg();
            }}
          >
            <LeftIcon />
          </div>

          {/* Enlarged Image */}
          <div className="relative max-w-4xl max-h-[90vh]">
            <Image
              src={selectedImg}
              alt="enlarged"
              width={1600}
              height={900}
              quality={90}
              className="rounded shadow-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Next Button */}
          <div
            className="fixed right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
            onClick={(e) => {
              e.stopPropagation();
              nextImg();
            }}
          >
            <RightIcon />
          </div>
        </div>
      )}
    </div>
  );
}
