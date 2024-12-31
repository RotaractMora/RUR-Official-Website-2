"use client";
import { IContact } from "@/interfaces/IContacts";
import Image from "next/image";
import React from "react";
import { useId } from "react";

export default function ReachUsSection({ grid }: { grid: IContact[] }) {
  const lines = [
    grid.filter((con) => con.line === 1),
    grid.filter((con) => con.line === 2),
    grid.filter((con) => con.line === 3),
    grid.filter((con) => con.line === 4)
  ];

  return (
    <div className="py-10 lg:py-20 md:mx-8 mx-auto w-fit md:w-full">
      {lines.map((line, index) => (

      <div key={"contactLine-"+index} className="flex flex-wrap md:flex-row flex-col justify-center align-center max-w-12xl mx-auto">
        {line.map((person, index) => (
          <div
            key={person + "-" + index}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden shadow-xl dark:border-custom-dark-color-900 border-custom-color-900 border-2 border-solid my-3 mx-2"
            style={{width: "28rem"}}
          >
            <Grid size={20} />
            <div className="flex items-center">
              <div>
                <Image
                  src={`${person.photo}`}
                  alt={person.name}
                  className="w-20 h-20 rounded-full"
                  width={20}
                  height={20}
                />
                </div>
                <div className="pl-5">
                <h2 className="text-2xl font-bold dark:text-custom-color-600 text-custom-dark-color-900">
                  {person.name}
                </h2>
                <p className="text-sm text-gray-600">{person.post}</p>
              </div>
            </div>
            <div className="flex flex-col items-left space-y-4">
              <div className="flex items-center space-x-2 pt-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.816 18 2 12.184 2 5V3z" />
                </svg>
                <p className="text-gray-700 text-md">{person.contact}</p>
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p className="text-gray-700 text-md">{person.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      ))}

    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zblackinc-900/30 from-blue-100/30 to-blue-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-blue-900/50 fill-blue-700/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          key={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any, index: number) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
