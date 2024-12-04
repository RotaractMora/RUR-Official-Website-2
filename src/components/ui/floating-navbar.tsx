'use client';

import React, { useContext, useState } from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
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

  const { toggleTheme, theme } = themeContext;

  return (
    <div>
      <div className={cn("m-5 fixed w-auto z-50 w-full flex justify-center", className)}>
        <div className={"flex justify-center w-auto backdrop-blur bg-white/70 dark:bg-black/30 rounded-3xl border border-white p-2 px-6"}>

          <div className="flex items-center space-x-4">
            <Link href="/" className="relative">
              <Image
          src={SMALL_LOGO}
          alt="logo"
          className="dark:border-custom-dark-color-800 border-custom-color-800 h-4 w-5 md:h-12 md:w-12"
          height={37}
          width={50}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex flex-row items-center space-x-4">
              {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-800 dark:hover:text-neutral-300 hover:text-neutral-500"
              >
                <span className="text-sm">{navItem.name}</span>
              </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button
          onClick={toggleTheme}
          className="border text-sm font-medium relative ml-4 border-neutral-200 dark:border-white/[0.2] text-black dark:text-white p-2 md:px-4 md:py-2 rounded-full"
            >
              {theme === "dark" ? (
            <SunIcon className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
            <MoonIcon className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </button> */}

            {/* Mobile Menu Button */}
            <button
          onClick={() =>{ setIsMenuOpen(!isMenuOpen)}}
          className="md:hidden border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white p-2 rounded-full"
            >
              {isMenuOpen ? (
            <XMarkIcon className="h-4 w-4" />
              ) : (
            <Bars3Icon className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          
          </div>
      </div>

              <AnimatePresence>
              {isMenuOpen && (
            <div className={"w-full z-50 fixed backdrop-blur bg-white/80 dark:bg-black/80 "} style={{ zIndex: '45'  }}>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "100vh" }}
                  exit={{ opacity: 0, height: 0 , padding:0 , margin:0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col space-y-4 mt-24 p-6"
                >
                  {navItems.map((navItem, idx) => (
                    <motion.div
                    initial={{ opacity: 0, left:"10%" }}
                    animate={{ opacity: 1, left:"70%" }}
                    exit={{ opacity: 0, left:"10%" }}
                    transition={{ duration: 0.3 , delay:0.1*(idx+1) }}
                    className="relative"
                    key={`mobile-link-${idx}`}
                  >
                    <Link
                      href={navItem.link}
                      key={`mobile-link-${idx}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="relative dark:text-neutral-50 flex items-center space-x-2 space-y-4 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500"
                      style={{transform:"translateX(-50%)"}}
                    >
                      {navItem.icon && <span>{navItem.icon}</span>}
                      <span className="text-sm">{navItem.name}</span>
                    </Link>
                    </motion.div>

                  ))}
                </motion.div>
            </div>
              )}
            </AnimatePresence>

      </div>
  );
};

export default FloatingNav;
