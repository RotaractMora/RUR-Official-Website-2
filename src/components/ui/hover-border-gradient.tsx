import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = React.PropsWithChildren<{
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number; // seconds per rotation
  clockwise?: boolean;
  isDisabled?: boolean;
  borderSize?: number; // px
}> &
  React.HTMLAttributes<HTMLElement>;

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 2.2,
  clockwise = true,
  isDisabled = false,
  borderSize = 2,
  ...props
}: Props) {
  const [hovered, setHovered] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const TagAny = Tag as any;
  const canDisable = Tag === "button";

  const spin = reduceMotion || isDisabled ? 0 : clockwise ? 360 : -360;

  const ringGradient = `conic-gradient(
    from 0deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,1) 10%,
    rgba(255,255,255,0) 20%,
    rgba(136,213,255,1) 35%,
    rgba(255,255,255,0) 50%,
    rgba(255,255,255,1) 65%,
    rgba(255,255,255,0) 80%,
    rgba(136,213,255,1) 92%,
    rgba(255,255,255,0) 100%
  )`;

  return (
    <TagAny
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={canDisable ? isDisabled : undefined}
      aria-disabled={!canDisable && isDisabled ? true : undefined}
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full",
        isDisabled && "cursor-not-allowed opacity-60",
        containerClassName
      )}
      {...props}
    >
      {/* STATIC glow (does NOT rotate) */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -inset-2 rounded-[inherit] opacity-0 transition-opacity duration-300",
          hovered && "opacity-100"
        )}
        style={{
          background:
            "radial-gradient(75% 181.15942028985506% at 50% 50%, rgb(136, 213, 255) 0%, rgba(255,255,255,0) 60%)",
          filter: "blur(14px)",
        }}
      />

      <div className="blur absolute inset-0 rounded-lg -translate-x-1 translate-y-1 bg-gradient-to-br from-cyan-500 to-sky-500"></div>

      {/* Inner surface (your same colors) */}
      <span
        className={cn(
          "relative z-10 rounded-[inherit] px-4 py-2",
          "dark:text-custom-color-900 text-custom-dark-color-900",
          "dark:bg-custom-dark-color-900 bg-custom-color-900",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]",
          "transition duration-300",
          hovered && "shadow-[0_0_0_1px_rgba(136,213,255,0.20)_inset]",
          className
        )}
      >
        {children}
      </span>
    </TagAny>
  );
}
