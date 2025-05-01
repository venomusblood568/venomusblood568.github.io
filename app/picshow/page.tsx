"use client";
import { useEffect, useState } from "react";
import Header from "../components/header";
import { UpperIcon } from "../icon/upper";
import { LeftIcon } from "../icon/left";
import { RightIcon } from "../icon/right";
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
];

export default function Photo() {
  const [selectedImg, setselectedImg] = useState<string | null>(null);
  const [showScrollbtn, setScrollbtn] = useState(false);
  const [loading,setLoading] = useState(true)
  const [currentImgIndex, setCurrentImgIndex] = useState<number | null>(null);

  

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false),1500)
    return () => clearTimeout(timer)
  })


  useEffect(() => {
    const handleScroll = () => {
      setScrollbtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openImage = (index:number) => {
    setCurrentImgIndex(index);
    setselectedImg(images[index]);
  }

  const closeImage = () => {
    setCurrentImgIndex(null);
    setselectedImg(null);
  }

  const nextImg = () => {
    if(currentImgIndex !== null){
      const newIndex = (currentImgIndex + 1) % images.length;
      setCurrentImgIndex(newIndex);
      setselectedImg(images[newIndex]) 
    } 
  }
  const prevImg = () => {
    if(currentImgIndex !== null){
      const newIndex = (currentImgIndex - 1 + images.length) % images.length;
      setCurrentImgIndex(newIndex);
      setselectedImg(images[newIndex]) 
    } 
  }

  
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-25">
        {loading
          ? images.map((_, i) => (
              <div
                key={i}
                className="w-full h-60 bg-gray-500 animate-pulse rounded-lg"
              />
            ))
          : images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`image-${index}`}
                onClick={() => openImage(index)}
                className="cursor-pointer object-cover w-full h-60 rounded hover:opacity-80 transition"
              />
            ))}
      </div>
      {showScrollbtn && (
        <button
          className="fixed bottom-6 right-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
          onClick={scrollToTop}
        >
          <UpperIcon />
        </button>
      )}
      {selectedImg && currentImgIndex !== null && (
        <div
          className="fixed inset-0 bg-opacity-5 flex items-center justify-center z-50 backdrop-blur-sm bg-black/10"
          onClick={closeImage}
        >
          <div
            className="fixed left-6 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition z-50"
            onClick={(e) => {
              e.stopPropagation();
              prevImg();
            }}
          >
            <LeftIcon />
          </div>
          <img
            src={selectedImg}
            alt="enlarged"
            className="max-w-4xl max-h-[90vh] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />
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
    </>
  );
}
