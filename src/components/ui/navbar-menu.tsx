"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  link,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  link: string;
  children?: React.ReactNode;
}) => {
  return (
    <Link href={link} className="relative group">
      <div 
        onMouseEnter={() => setActive(item)} 
        className="relative"
      >
        <motion.p
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white text-sm sm:text-base"
        >
          {item}
        </motion.p>
        
        {active !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={transition}
            className="absolute z-50 w-full"
          >
            {active === item && (
              <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 w-screen max-w-md">
                <motion.div
                  transition={transition}
                  layoutId="active"
                  className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
                >
                  <motion.div
                    layout
                    className="w-full h-full p-4"
                  >
                    {children}
                  </motion.div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Link>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-2 sm:space-x-4 px-4 sm:px-8 py-4 sm:py-6 overflow-x-auto"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link 
      href={href} 
      className="flex space-x-2 sm:space-x-4 items-center hover:bg-neutral-100 dark:hover:bg-neutral-900 p-2 rounded-lg transition-colors"
    >
      <Image
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-2xl w-20 h-12 sm:w-[140px] sm:h-[70px] object-cover"
      />
      <div className="flex-grow">
        <h4 className="text-base sm:text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-xs sm:text-sm max-w-[10rem] dark:text-neutral-300 truncate">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
};

export default { MenuItem, Menu, ProductItem, HoveredLink };