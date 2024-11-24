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
      {/* First gradient layer with blur */}
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
      
      {/* Second gradient layer without blur */}
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

      {/* Content container */}
      <div className={cn("relative z-10 bg-zinc-900/80 rounded-3xl", className)}>
        {children}
      </div>
    </div>
  );
};

// Para component to display sponsor information
interface ParaProps {
  name: string;
  imgURL: string;
  level: string;
  description?: string;
}

export const Para: React.FC<ParaProps> = ({ name, imgURL, level,  description }) => {
  return (
    <div className="p-6 mt-30">
      <div className="flex items-center  gap-4">
        <img 
          src={imgURL} 
          alt={`${name} logo`} 
          className="w-48 h-48 bg-white text-white object-contain"
       
        />
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-white">{name}</h3>
          {description && (
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          )}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">{level} Sponsor</span>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDesign;