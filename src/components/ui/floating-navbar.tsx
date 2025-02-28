"use client";

import React, { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "@/app/layout";
import Image from "next/image";
import { IThemeContextType } from "@/interfaces/IThemeContext";
import SMALL_LOGO from "../../../public/Images/logo/RUR20_small.png";
import { AnimatePresence, motion } from "framer-motion";
import { HoverBorderGradient } from "./hover-border-gradient";
import { sendGTMEvent } from "@next/third-parties/google";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const themeContext = useContext<IThemeContextType | null>(ThemeContext);
  const portalLink = "#registrationStatus";

  if (!themeContext) {
    throw new Error(
      "ThemeToggleButton must be used within a ThemeContext.Provider"
    );
  }

  const { theme } = themeContext;

  return (
    <div>
      {/* Top Navigation Bar */}
      <div
        className={cn(
          "z-50 px-4 py-3 flex justify-between items-center",
          "bg-white/70 dark:bg-black/30 border-b border-gray-200 dark:border-gray-800",
          "fixed top-0 left-0 right-0 md:relative md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 md:w-max md:px-8 md:py-4 md:rounded-lg md:shadow-lg",
          "border border-gray-300 md:rounded-l-lg md:rounded-r-lg"
        )}
      >
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={SMALL_LOGO}
              alt="logo"
              className="h-10 w-10 object-contain"
              height={40}
              width={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className="text-sm font-medium text-gray-700 hover:text-blue-500 transition-all duration-200 content-center"
              >
                {navItem.name}
              </Link>
            ))}

            <HoverBorderGradient onClick={() =>{
                            sendGTMEvent({ event: 'buttonClicked', section: 'Navbar' , activity: 'navbar register btn'  , link: portalLink ? portalLink : '' })
                            router.push(portalLink ? portalLink : '')
                      }
            }
             isDisabled={false}
             className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-lg text-sm"
             containerClassName="bg-white/0 border-0"
              >Registrations</HoverBorderGradient>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex items-center space-x-2 md:hidden">
          {/* Mobile Registration Button */}

           <HoverBorderGradient onClick={() =>{
                            sendGTMEvent({ event: 'buttonClicked', section: 'Navbar' , activity: 'navbar register btn'  , link: portalLink ? portalLink : '' })
                            router.push(portalLink ? portalLink : '')
                      }
            }
             isDisabled={false} 
             className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded-lg text-sm"
             containerClassName="bg-white/0 border-0"
            >Registrations</HoverBorderGradient>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-full p-2 
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
                    delay: idx * 0.1,
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
