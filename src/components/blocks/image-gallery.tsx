import { StaticImageData } from "next/image";
import React from "react";
import { Roboto_Flex } from "next/font/google";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

interface Product {
  title: string;
  link: string;
  thumbnail: StaticImageData;
}

interface GalleryProps {
  data: Product[];
  onImageClick: (src: string) => void;
}

export function Gallery({ data, onImageClick }: GalleryProps) {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4 max-w-[1400px]">
        <div className="max-w-7xl relative mx-auto pb-10  px-4 w-full left-0 top-0">
          <h1
            className={` text-4xl md:text-5xl text-center dark:text-white bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent font-black`}
          >
            Are you ready?
            <br />
            <span className="text-[2.5rem] md:text-[2.7rem]">2025</span>
          </h1>

          <p className="max-w-2xl text-base md:text-xl pb-4 text-center mx-auto mt-8 text-neutral-800 dark:text-neutral-200">
            The Virtual Odyssey in Corporate Arena
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {data.map((img) => (
            <div
              key={img.title}
              className="group cursor-pointer relative overflow-hidden rounded-lg"
              onClick={() => onImageClick(img.thumbnail.src)}
            >
              <img
                src={img.thumbnail.src}
                alt={img.title}
                className="gallery-img w-full sm:h-72 md:h-72 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ImageModalProps {
  src: string | null;
  onClose: () => void;
}

export function ImageModal({ src, onClose }: ImageModalProps) {
  if (!src) return null;

  return (
    <div
      id="imageModal"
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 opacity-100"
      onClick={onClose}
    >
      <img
        src={src}
        alt="Enlarged view"
        className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <button
        className="absolute top-5 right-5 text-white text-4xl font-bold"
        onClick={onClose}
      >
        &times;
      </button>
    </div>
  );
}
