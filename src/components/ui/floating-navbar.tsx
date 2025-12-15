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
  const portalLink = "https://rur.rotaractmora.org/student/sign-up";

  if (!themeContext) {
    throw new Error(
      "ThemeToggleButton must be used within a ThemeContext.Provider"
    );
  }

  return (
    <div>
      {/* Top Navigation Bar - full width glass/hero style */}
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          "backdrop-blur-md bg-white/10 dark:bg-black/30",
          "border-b border-white/10 dark:border-black/20"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src={SMALL_LOGO}
                  alt="logo"
                  className="h-10 w-10 object-contain"
                  height={40}
                  width={40}
                />
              </Link>
            </div>
          </div>
          {/* Center: Navigation links (desktop only) */}
          <div className="hidden md:flex flex-1 justify-center space-x-12">
            {navItems.map((navItem, idx) => (
              <a
                key={`link-${idx}`}
                href={navItem.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold md:text-lg text-gray-700 dark:text-white hover:text-[#0f4c81] transition-all duration-200 content-center"
              >
                {navItem.name}
              </a>
            ))}
          </div>

          {/* Right: Actions / CTA (desktop) and Mobile controls */}
          <div className="flex items-center space-x-2">
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <HoverBorderGradient
                onClick={() => {
                  sendGTMEvent({
                    event: "buttonClicked",
                    section: "Navbar",
                    activity: "navbar register btn",
                    link: portalLink ? portalLink : "",
                  });
                  router.push(portalLink ? portalLink : "");
                }}
                isDisabled={false}
                className="bg-gradient-to-br from-[#233662] via-[#0f4c81] to-[#0fb4ff] text-white px-4 py-2 rounded-lg text-sm "
                containerClassName="bg-white/0 border-0"
              >
                Registrations
              </HoverBorderGradient>
            </div>

            {/* Mobile: registration + menu toggle */}
            <div className="flex items-center space-x-2 md:hidden">
              <HoverBorderGradient
                onClick={() => {
                  sendGTMEvent({
                    event: "buttonClicked",
                    section: "Navbar",
                    activity: "navbar register btn",
                    link: portalLink ? portalLink : "",
                  });
                  router.push(portalLink ? portalLink : "");
                }}
                isDisabled={false}
                className="bg-gradient-to-br from-[#0f172a] via-[#0f4c81] to-[#0c77a8] text-white px-4 py-2 rounded-lg text-sm"
                containerClassName="bg-white/0 border-0"
              >
                Registrations
              </HoverBorderGradient>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                ) : (
                  <Bars3Icon className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                )}
              </button>
            </div>
          </div>
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
            className="fixed top-0 left-0 w-full h-full z-40 backdrop-blur bg-white/80 dark:bg-black/80 flex flex-col items-center "
          >
            <div className="w-full max-w-md px-6 py-20 space-y-2">
              {navItems.map((navItem, idx) => (
                <motion.div
                  key={`mobile-link-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <Link
                    href={navItem.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-4 px-4 dark:text-neutral-50 text-black dark:hover:text-neutral-300 hover:text-neutral-500"
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
