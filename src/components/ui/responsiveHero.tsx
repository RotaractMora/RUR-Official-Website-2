import React, { useState, useEffect } from 'react';
import { HeroParallax } from "./hero-parallax";

const MobileHero = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Images Container */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large circle image 1 */}
        <div className="absolute w-[120%] h-[120%] -top-[10%] -left-[10%]">
          <div className="absolute w-[300px] h-[300px] top-0 left-0">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="/Images/RUR (1).jpg"
                alt="Bread making" 
                className="w-full h-full object-cover opacity-100"
              />
            </div>
          </div>
        </div>

        {/* Large circle image 2 */}
        <div className="absolute w-[100%] h-[320%] -top-[10%] -right-[10%]">
          <div className="absolute w-[300px] h-[300px] top-[10%] right-[10%]">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img 
                src="/Images/RUR (2).jpg"
                alt="Bread making" 
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Small circle image */}
        <div className="absolute w-[300px] h-[300px] bottom-[5%] left-[10%]">
          <div className="w-full h-full rounded-full overflow-hidden">
            <img 
              src="/Images/RUR (3).jpg"
              alt="Bread making" 
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative px-6 py-2 mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-center min-h-screen max-w-2xl">
          {/* Pricing */}
          <p className="text-white text-lg mb-6">
            STARTING AT $9.99/MONTH
          </p>

          {/* Main Title */}
          <h1 className="text-white mb-8">
            <span className="block text-6xl font-normal mb-2">Master</span>
            <span className="block text-6xl italic font-serif">Bread</span>
            <span className="block text-6xl italic font-serif">making</span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-12 max-w-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu penatibus pellentesque dolor consequat liqula egestas massa gravida. Porttitor venenatis enim praesent.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-colors">
              Get started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors flex items-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Watch trailer
            </button>
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