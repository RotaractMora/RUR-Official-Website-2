"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image, { StaticImageData } from "next/image";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    thumbnail: string|StaticImageData;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 110, damping: 15 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-auto pb-30 pt-10 overflow-hidden antialiased relative flex flex-col"
    >
      <Header />
      <div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product,index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title + index}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-20 space-x-20">
          {secondRow.map((product,index) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title+" "+index }
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product,index) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title+" "+index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-7xl relative mx-auto pb-10  px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl text-center font-bold dark:text-white bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent">
        Are You Ready? <br /> 2025
      </h1>
     
      <p className="max-w-2xl text-base md:text-xl pb-4 text-center mx-auto mt-8 text-neutral-800 dark:text-neutral-200">
        The Virtual Odyssey in Corporate Arena
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    thumbnail: string|StaticImageData;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title+" "+Date.now()}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Image
        src={product.thumbnail}
        height="600"
        width="600"
        className="object-cover object-left-top absolute h-full w-full inset-0 rounded-xl"
        alt={product.title}
        loading="eager"
      />
      {/* <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        // {product.title}
      </h2> */}
    </motion.div>
  );
};