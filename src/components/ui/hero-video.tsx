"use client";
import React, { useEffect, useRef } from 'react';


interface HeroVideoProps {
  videoSrc: string;
  play: boolean;
  onLoadedVideo?: () => void;
  title?: string;
  subtitle?: string;
  overlayOpacity?: number;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoSrc, 
  play,
  onLoadedVideo,
  title = "Are You Ready?", 
  subtitle = "The Virtual Odyssey in Corporate Arena",
  overlayOpacity = 0.5
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (play) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [play]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video 
      ref={videoRef}
      src={videoSrc}
      loop={false}
      muted
      autoPlay={play}
      playsInline
      disablePictureInPicture
      className="absolute top-0 left-0 w-full h-full"
      onLoadedData={() => {
      onLoadedVideo && onLoadedVideo();
      }}
      />
      
      <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{ 
      backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` 
      }}
      >
      </div>
    </div>


  );
};