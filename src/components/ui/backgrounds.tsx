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
    <div className="h-[100%] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-blue-900/[0.2] relative flex items-center justify-center flex-wrap">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl md:text-5xl font-bold relative z-20 bg-gradient-to-r from-[#0f0271] to-[#15c0fe]  bg-clip-text text-transparent py-8 block">
        {title}
      </p>
      <br />
      <div className="block w-full">{children}</div>
    </div>
  );
}
