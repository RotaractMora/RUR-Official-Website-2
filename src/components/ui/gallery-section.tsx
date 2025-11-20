import React, { useState, useEffect } from 'react';
import { Gallery, ImageModal } from "@/components/blocks/image-gallery";
import { StaticImageData } from 'next/image';

interface Product {
  title: string;
  link: string;
  thumbnail: StaticImageData;
}

interface GallerySectionProps {
  products: Product[];
}

export default function GallerySection({ products }: GallerySectionProps) {
  const [modalImage, setModalImage] = useState<string | null>(null);

  const openModal = (src: string) => setModalImage(src);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Gallery data={products} onImageClick={openModal} />
      <ImageModal src={modalImage} onClose={closeModal} />
    </>
  );
}