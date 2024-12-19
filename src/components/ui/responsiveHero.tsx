"use client";

import React, { useState, useEffect } from 'react';
import { HeroParallax } from "./hero-parallax";

const MobileHero = () => {
  return (
    <div className="relative min-h-screen dark:bg-custom-dark-color-900 bg-custom-color-900 ">
      {/* Background Images Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle image 1 */}
        <div className="absolute sm2:w-[370px] sm2:h-[370px] sm1:w-[350px] sm1:h-[350px] w-[300px] h-[300px] top-0 left-0">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src="/Images/RUR (1).jpg"
              alt="from Rur previous event" 
              className="w-full h-full object-cover opacity-100"
            />
          </div>
        </div>

        {/* Large circle image 2 */}
        <div className="absolute sm2:w-[385px] sm2:h-[385px] sm1:w-[350px] sm1:h-[350px] w-[300px] h-[300px] top-[50%] right-0">
          <div className="w-full h-full rounded-full overflow-hidden transform translate-y-[-50%]">
            <img 
              src="/Images/RUR (2).jpg"
              alt="from Rur previous event" 
              className="w-full h-full object-cover opacity-100"
            />
          </div>
        </div>

        {/* Small circle image */}
        <div className="absolute sm2:w-[400px] sm2:h-[400px] sm1:w-[350px] sm1:h-[350px] w-[300px] h-[300px] bottom-0 left-0">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src="/Images/RUR (3).jpg"
              alt="from Rur previous event" 
              className="w-full h-full object-cover opacity-95"
            />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0
          bg-gradient-to-r
          from-custom-color-900 
          dark:from-custom-dark-color-900
          sm1:via-custom-color-900/40 
          sm1:dark:via-custom-dark-color-900/40 
          via-custom-color-900/80
          dark:via-custom-dark-color-900/80
          to-transparent
          "></div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-2 mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-center min-h-screen max-w-2xl">

          {/* Main Title */}
          <h1 className="text-black dark:text-white mb-8 sm1:mx-1 mx-auto">
            <span className="block text-6xl font-normal mb-2 sm1:text-left text-center">Are</span>
            <span className="block text-6xl italic font-serif sm1:text-left text-center">You</span>
            <span className="block text-6xl italic font-serif sm1:text-left text-center">Ready?</span>
          </h1>

          {/* Description */}
          <div className='sm1:mx-1 mx-auto'>
            <p className="dark:text-gray-300 text-custom-color-300 text-lg mb-12 max-w-md sm1:text-left text-center">
              The Virtual Odyssey in Corporate Arena
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 sm1:mx-1 mx-auto">
            <button className="px-8 py-3 bg-black dark:bg-white dark:text-black text-white rounded-full dark:hover:bg-gray-100 hover:bg-custom-dark-color-800 transition-colors">
              Registration portal
            </button>
            {/* <button className="px-8 py-3 border-2 dark:border-white border-black dark:text-white text-black rounded-full dark:hover:bg-white/10 hover:bg-black/10 transition-colors flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch trailer
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};


interface ResponsiveHeroProps {
  products: any; // Replace 'any' with the appropriate type if known
}

const ResponsiveHero: React.FC<ResponsiveHeroProps> = ({ products }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full">
      {isMobile ? (
        <MobileHero />
      ) : (
        <HeroParallax products={products} />
      )}
    </div>
  );
};

export default ResponsiveHero;