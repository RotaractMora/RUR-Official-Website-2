"use client";

import React from "react";

export function GridBackground({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className="h-[100%] w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-brand-blue/[0.1] relative flex items-center justify-center flex-wrap">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl md:text-5xl font-bold relative z-20 dark:text-white bg-brand-gradient bg-clip-text text-transparent py-8 block">
        {title}
      </p>
      <br />
      <div className="block w-full">{children}</div>
    </div>
  );
}
