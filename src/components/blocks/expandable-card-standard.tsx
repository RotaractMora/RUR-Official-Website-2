"use client";
import Image from "next/image";
import React, { act, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { IExpandableCard } from "@/interfaces/IExpandableCard";
import { ICompany } from "@/interfaces/ICompanies";
import { getDataFromAggregatedCompanyDoc } from "@/services/aggregatedCompanyData.service";
import { HeroHighlight } from "../ui/hero-highlight";
import { Highlighter } from "./hilight";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { sendGTMEvent } from "@next/third-parties/google";

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center">
    <HeroHighlight>
      <Highlighter firstString="Error: " secondString={message} />
    </HeroHighlight>
  </div>
);

const EmptyStateMessage = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center">
    <HeroHighlight>
      <Highlighter firstString="" secondString={message} />
    </HeroHighlight>
  </div>
);

export default function ExpandableCard() {
  const [cards, setCompanies] = useState([] as ICompany[]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }

      
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    async function fetchData() {
      try{
        const data =await getDataFromAggregatedCompanyDoc();

        if (!data) {
          throw new Error("Failed to fetch data");
        }

        setCompanies(data.companies || []);
      }
      catch(err){
        console.error("Error fetching company data:", err);
        setError("Failed to load data. Please try again later.");
      }
      finally {
        console.log("Company Data fetch end");
        setIsLoading(false);
      }
    }

    fetchData();
  },[]);

  useOutsideClick(ref, () => setActive(null));

  if (error) {
    return <ErrorMessage message={"Fail to load company details"} />;
  }
  else if (isLoading) {
    return <div>Loading...</div>;
  }

  else if (cards.length<3 ) {
    return <></>;
  }
  else{
  return (
    <>
    <AnimatePresence>
    <motion.h2
    className="text-5xl py-12 text-center dark:text-white bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent"
    initial={{ opacity: 0 , y: -20 }}
    animate={{ opacity: 1 , y: 0  }}
    exit={{ opacity: 0 , y: -20 , transition: { duration: 0.2 } }}
    viewport={{once:false}}
    
    >
      Registered Companies
    </motion.h2>
    </AnimatePresence>
    <div id="company-data-list" className="p-12 md:w-max mx-auto max-h-screen overflow-y-auto [&::-webkit-scrollbar]:[width:3px] [&::-webkit-scrollbar-thumb]:bg-custom-color-600/20">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.companyId}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.companyId}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.logoUrl}
                  alt={active.companyId}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-contain dark:bg-custom-dark-color-600/20 bg-custom-color-600/20"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4  bg-custom-color-600/10">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.companyId}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 overflow-y-auto"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.companyId}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {` ${active.name} has mentioned ${ active.qualitiesToLook.length } qualities & ${active.preferredFields.length} preferred Fields.`}
                    </motion.p>
                  </div>

                  <motion.button
                    layoutId={`button-${active.companyId}-${id}`}
                    onClick={()=>{
                    sendGTMEvent({ event: 'buttonClicked', section: 'companyData' , activity:'visit website' , company:active.name , link:active.website });
                    window.open(active.website, "_blank");
                  }
                  }
                  >
                    <HoverBorderGradient>
                      View
                    </HoverBorderGradient>
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4 h-60 overflow-y-auto [&::-webkit-scrollbar]:[width:3px] [&::-webkit-scrollbar-thumb]:bg-custom-color-600/20">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    <p>
                       {active.description}
                    </p>
                        <div className="flex justify-center content-center w-[100%] wrap">


                          <div className="w-[50%] row">
                          <h5> Qulities: </h5>
                          {
                            active.qualitiesToLook.map((quality,index)=>(
                                <div className="pl-5" key={index+"_qualities"}>
                                  <h4 className="font-bold">{quality}</h4>
                                </div>
                            ))
                          }
                        </div>


                        <div className="w-[50%] row">
                          <h5> Preferred Fields: </h5>
                          {
                            active.preferredFields.map((field,index)=>(
                              <div className="pl-5" key={index+"fields"}>
                                <h4 className="font-bold">{field}</h4>
                              </div>
                            ))
                          }
                        </div>


                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.companyId}-${id}`}
            key={`card-${card.name}-${id}`}
            onClick={() => {
              setActive(card)
              sendGTMEvent({ event: 'buttonClicked', section: 'companyData' , activity:'view data' , company:card.name  });
            }}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
                <motion.div layoutId={`image-${card.companyId}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.logoUrl}
                  alt={card.name+" logo"}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-contain mx-auto"
                />
                </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.companyId}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.companyId}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left"
                >
                  {` ${card.name} has mentioned ${ card.qualitiesToLook.length } qualities & ${card.preferredFields.length} preferred Fields.`}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.companyId}-${id}`}
              className="pt-4"
            >
              <HoverBorderGradient >
                View
              </HoverBorderGradient>
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </div>
    </>
  );
  }
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
