"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";

export function Highlighter({ firstString, secondString }: { firstString: string, secondString: string }) {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-4xl md:text-5xl px-4 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
      >
        {`${firstString} `}
        <Highlight className="text-black dark:text-white">
          {`${secondString} `}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
