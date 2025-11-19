'use client';
import React, { useEffect, useRef } from 'react';

interface HeroVideoProps {
  videoSrc: string;
  play: boolean;
  onLoadedVideo?: () => void;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({ videoSrc, play, onLoadedVideo }) => {
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
          if (onLoadedVideo) {
            onLoadedVideo();
          }
        }}
      />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          zIndex: -1,
          background: '#FFFFFF',
        }}
      ></div>
    </div>
  );
};
