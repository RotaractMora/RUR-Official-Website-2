import React, { useState, useEffect } from 'react';
import { Gallery, ImageModal } from "@/components/blocks/image-gallery";
import { StaticImageData } from 'next/image';
import { Button } from '@/components/ui/button';

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
  const [visibleCount, setVisibleCount] = useState(0);
  const [loadStage, setLoadStage] = useState(0); // 0: initial, 1: more, 2: all

  const openModal = (src: string) => setModalImage(src);
  const closeModal = () => setModalImage(null);

  // Calculate visible count based on screen size and load stage
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      
      if (width >= 1024) {
        if (loadStage === 0) setVisibleCount(6);
        else if (loadStage === 1) setVisibleCount(12);
        else setVisibleCount(products.length);
      } else if (width >= 768) {
        if (loadStage === 0) setVisibleCount(6);
        else if (loadStage === 1) setVisibleCount(10);
        else setVisibleCount(products.length);
      } else {
        if (loadStage === 0) setVisibleCount(5);
        else if (loadStage === 1) setVisibleCount(8);
        else setVisibleCount(products.length);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, [loadStage, products.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLoadMore = () => {
    setLoadStage((prev) => (prev + 1) % 3);
  };

  const getButtonText = () => {
    if (loadStage === 0) return 'Load More';
    if (loadStage === 1) return 'Show All';
    return 'Show Less';
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <>
      <Gallery data={visibleProducts} onImageClick={openModal} />
      {products.length > 6 && (
        <div className="flex justify-center mt-8">
          <Button onClick={handleLoadMore} variant="outline">
            {getButtonText()}
          </Button>
        </div>
      )}
      <ImageModal src={modalImage} onClose={closeModal} />
    </>
  );
}