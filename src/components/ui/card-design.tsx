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

    const gradientClass = CardColor === "Gold"
    ? "bg-[radial-gradient(circle_farthest-side_at_50%_50%,rgba(175,149,0,1),rgba(175,149,0,0.5),rgba(175,149,0,1),rgba(175,149,0,0.5))]"
    : CardColor === "Silver"
    ? "bg-[radial-gradient(circle_farthest-side_at_50%_50%,rgb(165,169,180,1),rgb(165,169,180,0.7),rgb(165,169,180,0.4),rgb(165,169,180,0.5))]"
    : "bg-[radial-gradient(circle_farthest-side_at_50%_50%,rgba(190,121,54,1),rgba(190,121,54,0.7),rgba(190,121,54,0.4),rgba(190,121,54,0.5))]";
    
  //   const gradientClass = CardColor === "Gold"
  // ? "bg-[radial-gradient(circle_farthest-side_at_0_100%,rgba(175,149,0,1),transparent),radial-gradient(circle_farthest-side_at_100%_0,rgba(175,149,0,0.7),transparent),radial-gradient(circle_farthest-side_at_100%_100%,rgba(175,149,0,0.4),transparent),radial-gradient(circle_farthest-side_at_0_0,rgba(175,149,0,0.2),rgba(175,149,0,0.2))]"
  // : CardColor === "Silver"
  // ? "bg-[radial-gradient(circle_farthest-side_at_0_100%,rgba(215,215,215,1),transparent),radial-gradient(circle_farthest-side_at_100%_0,rgba(215,215,215,0.7),transparent),radial-gradient(circle_farthest-side_at_100%_100%,rgba(215,215,215,0.4),transparent),radial-gradient(circle_farthest-side_at_0_0,rgba(215,215,215,0.2),rgba(215,215,215,0.2))]"
  // : "bg-[radial-gradient(circle_farthest-side_at_0_100%,rgba(190,121,54,1),transparent),radial-gradient(circle_farthest-side_at_100%_0,rgba(190,121,54,0.7),transparent),radial-gradient(circle_farthest-side_at_100%_100%,rgba(190,121,54,0.4),transparent),radial-gradient(circle_farthest-side_at_0_0,rgba(190,121,54,0.2),rgba(190,121,54,0.2))]";

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
          gradientClass
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
          gradientClass
        )}    
      />

      <div className={cn("relative h-full w-full z-10 bg-white rounded-3xl", className)}>
        {children}
      </div>
    </div>
  );
};

export default CardDesign;