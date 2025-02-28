"use client";
import {
  useScroll,
  useTransform,
  motion,
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
  image: string|StaticImageData;
  btnText: string;
  isBtnDisabled: boolean;
}

export const Timeline = ({ data }: { data: ITimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 70%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const router = useRouter();

  return (
    <div
      className="w-full bg-custom-color-900 dark:bg-custom-dark-color-900 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto pt-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-custom-dark-color-950 dark:text-custom-color-950 max-w-4xl">
        SESSIONS
        </h2>
        <p className="text-custom-dark-color-neutral-700 dark:text-custom-color-700 text-sm md:text-base max-w-sm">
        Career Fair will be supported by subprojects
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-dark-nautral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full text-neutral-500 dark:text-dark-nautral-100">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-dark-nautral-500">
                {item.title}
              </h3>
              <div>
                <Image
                  src={item.image} width={400} height={200} alt={item.title+" image"} className="rounded-lg mb-5"></Image>
              </div>
              <div>
                {item.content}{" "}
              </div>
            
            <div className="flex md:flex-row justify-around items-center mt-5 flex-col">
              <div className="mt-3 inline-block">
                <CountDown date={item.eventDate} />
              </div>
              {
                item.btnText.length > 0 &&
              <div className="inline-block md:mt-3 mt-5 ml-3">
                <HoverBorderGradient onClick={()=>{
                  sendGTMEvent({ event: 'buttonClicked', section: 'timeline' , BtnLabel: item.title , link: item.btnLink });
                  router.push(item.btnLink)
                }
              } isDisabled={item.isBtnDisabled} >{item.btnText}</HoverBorderGradient>
              </div>
              }
            </div>
              

             
            </div>
          </div>
        ))}
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
