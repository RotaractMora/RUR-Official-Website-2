'use client';

import React, { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "@/app/layout";
import Image from "next/image";
import { IThemeContextType } from "@/interfaces/IThemeContext";
import SMALL_LOGO from "../../../public/Images/logo/RUR20_small.png"
import { AnimatePresence, motion } from "framer-motion";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const themeContext = useContext<IThemeContextType | null>(ThemeContext);

  if (!themeContext) {
    throw new Error(
      "ThemeToggleButton must be used within a ThemeContext.Provider"
    );
  }

  const { theme } = themeContext;

  return (
    <div>
      {/* Top Navigation Bar */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "px-4 py-3 flex justify-between items-center",
        "backdrop-blur bg-white/70 dark:bg-black/30",
        "border-b border-gray-200 dark:border-gray-800",
        className
      )}>
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <Image
              src={SMALL_LOGO}
              alt="logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              height={40}
              width={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className="text-sm text-neutral-700 dark:text-neutral-300 
                           hover:text-neutral-900 dark:hover:text-neutral-100 
                           transition-colors duration-200"
              >
                {navItem.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-full p-2 
                     hover:bg-neutral-100 dark:hover:bg-neutral-800 
                     transition-colors duration-200"
        >
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full z-40 
                       backdrop-blur bg-white/80 dark:bg-black/80 
                       flex flex-col items-center justify-center"
          >
            <div className="w-full max-w-md px-6 space-y-6">
              {navItems.map((navItem, idx) => (
                <motion.div
                  key={`mobile-link-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: idx * 0.1 
                  }}
                >
                  <Link
                    href={navItem.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 text-center 
                               dark:text-neutral-50 
                               text-neutral-600 
                               dark:hover:text-neutral-300 
                               hover:text-neutral-500"
                  >
                    <span className="text-lg">{navItem.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNav;