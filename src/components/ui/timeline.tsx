"use client";
import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import CountDown from "./count-down";
import { useRouter } from "next/navigation";
import { HoverBorderGradient } from "./hover-border-gradient";
import Image, { StaticImageData } from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";
export interface ITimelineEntry {
  title: string;
  content: React.ReactNode;
  eventDate: Date;
  btnLink: string;
  image: string | StaticImageData;
  btnText: string;
  isBtnDisabled: boolean;
  category?: string;
}

export const Timeline = ({ data }: { data: ITimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
      console.log("beam h:", rect.height);
      setTimeout(() => {
        console.log("beam h2:", rect.height);
      }, 5000);
      // setHeight(3500);
    }
  }, [ref, ref.current?.offsetHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const categoryMeta = (cat?: string) => {
    const key = (cat || "other").toLowerCase();
    switch (key) {
      case "workshop":
        return {
          label: "Workshop",
          color:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
          icon: (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M12 6v6l4 2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="9" />
            </svg>
          ),
        };
      case "talk":
        return {
          label: "Talk",
          color:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
          icon: (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "panel":
        return {
          label: "Panel",
          color:
            "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300",
          icon: (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M8 9l3 3-3 3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13 6h3v12h-3z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "networking":
        return {
          label: "Networking",
          color:
            "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
          icon: (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle cx="12" cy="7" r="3" />
              <path
                d="M5.5 21c.75-4 2.75-6 6.5-6s5.75 2 6.5 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      case "registration":
        return {
          label: "Registration",
          color:
            "bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-300",
          icon: (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                d="M3 7h18M12 3v18"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ),
        };
      default:
        return {
          label: cat || "General",
          color:
            "bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-300",
          icon: (
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <circle cx="12" cy="12" r="3" />
            </svg>
          ),
        };
    }
  };

  return (
    <div
      className="w-full  bg-[#e9f3f8] dark:bg-custom-dark-color-900 font-sans md:px-10 pb-20"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-custom-dark-color-950 dark:text-custom-color-950 max-w-4xl">
          SESSIONS
        </h2>
        <p className="text-custom-dark-color-neutral-700 dark:text-custom-color-700 text-sm md:text-base max-w-sm">
          Career Fair will be supported by subprojects
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Next session highlight (md+) */}
        {(() => {
          const now = new Date().getTime();
          const upcoming = data
            .filter((d) => d.eventDate && d.eventDate.getTime() > now)
            .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());
          const next = upcoming.length > 0 ? upcoming[0] : null;
          if (!next) return null;
          const meta = categoryMeta((next as ITimelineEntry).category);
          return (
            <motion.aside
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
              animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:block absolute -right-4 top-8 w-80 z-50"
            >
              <div className="bg-white/6 dark:bg-black/60 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-neutral-300 mb-1">
                      Next Session
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${meta.color}`}
                      >
                        {meta.icon}
                        <span>{meta.label}</span>
                      </span>
                      <h3 className="text-lg font-bold text-neutral-100">
                        {next.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <Image
                    src={next.image}
                    alt={next.title + " image"}
                    width={320}
                    height={140}
                    className="rounded-md object-cover w-full h-32"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-300">Starts in</div>
                    <div className="mt-1">
                      <CountDown date={next.eventDate} />
                    </div>
                  </div>
                  <div>
                    <HoverBorderGradient
                      onClick={() => {
                        router.push(next.btnLink);
                      }}
                      isDisabled={next.isBtnDisabled}
                      className="px-3 py-2"
                    >
                      Join
                    </HoverBorderGradient>
                  </div>
                </div>
              </div>
            </motion.aside>
          );
        })()}

        {data.map((item, index) => {
          const meta = categoryMeta(item.category);
          return (
            <div key={index} className="flex justify-start md:pt-40 md:gap-10">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                </div>
                <div className="hidden md:flex items-center gap-4 md:pl-20">
                  <span
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${meta.color}`}
                  >
                    {meta.icon}
                    <span>{meta.label}</span>
                  </span>
                  <h3 className="text-xl md:text-5xl font-bold text-neutral-500 dark:text-dark-nautral-500 ">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full text-neutral-500 dark:text-dark-nautral-100">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-dark-nautral-500">
                  <span
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-semibold ${meta.color} mr-3`}
                  >
                    {meta.icon}
                    <span>{meta.label}</span>
                  </span>
                  {item.title}
                </h3>
                <div className="h-[300px] w-full flex justify-center items-center">
                  <Image
                    src={item.image}
                    height={200}
                    width={400}
                    alt={item.title + " image"}
                    className="rounded-lg mb-5"
                  />
                </div>
                <div>{item.content} </div>

                <div className="flex md:flex-row justify-around items-center mt-5 flex-col">
                  <div className="mt-3 inline-block">
                    <CountDown date={item.eventDate} />
                  </div>
                  {item.btnText.length > 0 && (
                    <div className="inline-block md:mt-3 mt-5 ml-3">
                      <HoverBorderGradient
                        onClick={() => {
                          sendGTMEvent({
                            event: "buttonClicked",
                            section: "timeline",
                            BtnLabel: item.title,
                            link: item.btnLink,
                          });
                          router.push(item.btnLink);
                        }}
                        isDisabled={item.isBtnDisabled}
                      >
                        {item.btnText}
                      </HoverBorderGradient>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
