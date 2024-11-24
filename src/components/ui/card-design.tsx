'use client';
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

interface CardDesignProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  CardColor?: string;
}

interface ParaProps {
  name: string;
  imgURL: string;
  level: string;
  description?: string;
}

export const CardDesign: React.FC<CardDesignProps> = ({
  children,
  className,
  containerClassName,
  animate = true,
  CardColor = "default"
}) => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div className={cn("relative z-10 bg-zinc-900/80 rounded-3xl", className)}>
        {children}
      </div>
    </div>
  );
};

export const Para: React.FC<ParaProps> = ({ name, imgURL, level, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">{level} Sponsor</h2>
      <div className="w-full max-w-[300px] h-[120px] bg-white rounded-lg p-4 mb-4">
        <img 
          src={imgURL} 
          alt={`${name} logo`} 
          className="w-full h-10 object-contain"
        />
      </div>
      <div className="text-2xl text-white font-medium">
        {description || name}
      </div>
    </div>
  );
};

export default CardDesign;