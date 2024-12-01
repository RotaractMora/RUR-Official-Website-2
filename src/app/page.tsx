"use client"

import ResponsiveHero from "@/components/ui/responsiveHero";
import RootLayout from "./layout";
import { FloatingNav } from "@/components/ui/floating-navbar";
import React, { useEffect, useState } from "react";
import RUR_IMG1 from "../../public/Images/RUR (1).jpg"
import RUR_IMG2 from "../../public/Images/RUR (2).jpg"
import RUR_IMG3 from "../../public/Images/RUR (3).jpg"
import RUR_IMG4 from "../../public/Images/RUR (4).jpg"
import RUR_IMG5 from "../../public/Images/RUR (5).jpg"
import RUR_IMG6 from "../../public/Images/RUR (6).jpg"
import RUR_IMG7 from "../../public/Images/RUR (7).jpg"
import RUR_IMG8 from "../../public/Images/RUR (8).jpg"
import RUR_IMG9 from "../../public/Images/RUR (9).jpg"
import RUR_IMG10 from "../../public/Images/RUR (10).jpg"
import RUR_IMG11 from "../../public/Images/RUR (11).jpg"
import RUR_IMG12 from "../../public/Images/RUR (12).jpg"
import RUR_IMG13 from "../../public/Images/RUR (13).jpg"
import RUR_IMG14 from "../../public/Images/RUR (14).jpg"
import RUR_IMG15 from "../../public/Images/RUR (15).jpg"

import SPONSOR from "../../public/Images/partners/the-ai-team.png"
// import LoadingAnimation from "../../public/animations/RUR.json"
import LoadingAnimation from "../../public/animations/RUR_Loading.json"

import { Timeline } from "@/components/ui/timeline";
import LampLighting from "@/components/ui/lamp";
import { GlareCard } from "@/components/ui/glare-card";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import ReachUsSection from "@/components/blocks/reach-us-section";
import Footer from "@/components/blocks/footer";
import { GridBackground } from "@/components/ui/backgrounds";
import { ISponsor } from "@/interfaces/ISponsors";
import {getDataFromAggregatedDoc} from "@/services/aggregatedData.service";
import { ITimelineData } from "@/interfaces/ITimeline";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Highlighter } from "@/components/blocks/hilight";
import {  HomeIcon, ClockIcon , MegaphoneIcon , PhoneArrowUpRightIcon } from "@heroicons/react/24/solid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import {CardDesign} from "@/components/ui/card-design";
import Lottie from "react-lottie-player";
import { IContact } from "@/interfaces/IContacts";
import { getReachUs } from "@/services/reachus.service";
import RegistrationStatus from "@/components/ui/google-gemini-effect";
import CodeEvelPara from "@/components/ui/code-evel-para";
import { HeroVideo } from "@/components/ui/hero-video";

export const products = [
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG1,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG2,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG3,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG4,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG5,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG6,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG7,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG8,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG9,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG10,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG11,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG12,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG13,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG14,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG15,
  },
  
];


const navItms = [
  {
    name: 'Home',
    link: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'Timeline',
    link: '#timeline',
    icon: <ClockIcon />,
  },
  {
    name: 'Sponsors',
    link: '#sponsors',
    icon: <MegaphoneIcon />,
  },
  {
    name: 'Reach Us',
    link: '#reach_us',
    icon: <PhoneArrowUpRightIcon />,
  },
];


const Loading =()=> {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
    </div>
  );
}


const Para = ({ level, name, imgURL, loadCallback }: { level: string, name: string, imgURL: string | undefined, loadCallback?: (count: number) => void }): React.ReactNode => {
  const color = level ==="Gold"?"custom-color-gold dark:custom-dark-color-gold":(level ==="Silver"?"custom-color-silver dark:custom-dark-color-silver":"custom-color-bronze dark:custom-dark-color-bronze")
  return (
    <div className="w-full h-full max-w-xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center h-full justify-between">
      <h6 className={"text-3xl md:text-4xl lg:text-6xl text-center font-bold p-2 py-3"+ " text-"+color}>
        {`${level} Sponsor`}
      </h6>
      <Image
        src={imgURL ? imgURL : SPONSOR}
        width={300}
        height={100}
        alt="Sponsor"
        className="p-2 my-2 rounded-lg dark:bg-custom-dark-color-600 bg-custom-color-600 h-auto min-w-[250px] max-w-[250px] md:max-w-[300px]"
      />
      <h5 className="text-2xl md:text-3xl lg:text-5xl text-center font-bold dark:text-custom-color-900 text-custom-dark-color-900 p-3">
        {name}
      </h5>
    </div>
  );
};

const AboutSection = ({ content }: { content: string }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 md:py-12">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-12 mt-0">
        <h2 className="text-xl md:text-2xl text-center font-bold dark:text-custom-color-800 text-custom-dark-color-800 mb-4">
          About Are You Ready?
        </h2>
        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none">
          <TextGenerateEffect words={content} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [timeline, setTimeline] = useState([] as ITimelineData[]);
  const [sponsors, setSponsors] = useState([] as ISponsor[]);
  const [isTimelineLoading, setTimelineLoading] = useState(true);
  const [isSponsorsLoading, setSponsorsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingAnimComplete , setIsLoadingAnimComplete] = useState(false);
  const [reachUsContacts, setReachUsContacts] = useState([] as IContact[]);
  const [isReachUsGridLoading, setIsReachUsGridLoading] = useState(true);

  const loadingTimeout = ()=>{
  console.log("Loading animation timeout");
  setTimeout(() => {
    setIsLoadingAnimComplete(true);
  }, 2000);
}
  
  
  useEffect(() => {
    const fetchData = async () => {

      // getReachUs().then((data) => {
      //   setGrid(data);
      // }).catch((err) => {
      //   console.error("Error fetching data:", err);
      //   setError("Failed to load data. Please try again later.");
      // }
      // ).finally(() => {
      //   setGridLoading(false);
      // });



      try {
        const data = await getDataFromAggregatedDoc();
        
        if (!data) {
          throw new Error("Failed to fetch data");
        }

        setTimeline(data.timelineList || []);
        setSponsors(data.sponsorList || []);
        setReachUsContacts(data.reachUsContactList || []);

        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setTimelineLoading(false);
        setSponsorsLoading(false);
        setIsLoading(false);
        setIsReachUsGridLoading(false);

        console.log("Data fetched end");
      }
    };

    fetchData();
  }, []);

  const events = timeline.map((t) => ({
    title: t.title,
    content: <CodeEvelPara htmlContent={t.description} />,
    eventDate: t.eventDate.toDate(),
    btnLink: t.btnLink,
    image: t.imgURL,
    btnText: t.btnText,
    isBtnDisabled: t.isBtnDisabled,
  }));

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





  const content: string = "\"Are You Ready?\" stands as a monumental initiative led by the Rotaract Club of the University of Moratuwa in partnership with the Career Guidance Unit. Our primary focus is 4th year undergraduates from our university, aiming to guide them towards a secure entry into the professional world. The scope of this endeavor knows no bounds, with over 100 companies aligning to provide opportunities for budding professionals. This project promises to be a valuable asset for those aspiring to forge strong connections with companies and their managers, even if the finish line of their degree is still on the horizon. In the initial stages, participants will gain the essential knowledge and training to confidently engage with industry experts.";

  return (
    <RootLayout>
      <FloatingNav navItems={navItms} />
         { ( !isLoadingAnimComplete ) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#545576]">
            <Lottie
              loop={true}
              animationData={LoadingAnimation}
              play
              style={{ width: 300, height: 300 }}
              onLoopComplete={loadingTimeout}
            />
            </div>
        )}


      <div className="space-y-0">
        <HeroVideo videoSrc="videos/RUR_Logo.mp4" play={isLoadingAnimComplete} onLoadedVideo={()=> {
          setIsLoadingAnimComplete(true);
        }} />
        <ResponsiveHero products={products} />
        <AboutSection content={content} />
      </div>

      <div id="timeline" className="scroll-mt-20">
        {error ? (
          <ErrorMessage message={error} />
        ) : isTimelineLoading ? (
          <Loading />
        ) : events.length > 0 ? (
          <Timeline data={events} />
        ) : (
          <EmptyStateMessage message="Timeline will be updated soon." />
        )}
      </div>

      <div id="sponsors" className="scroll-mt-20">
          {/* <LampLighting firstLine="Sponsors" secondLine="" /> */}
      </div>

      {error ? (
        <ErrorMessage message={error} />
      ) : isSponsorsLoading ? (
        <Loading />
      ) : sponsors.length > 0 ? (
        <TracingBeam className="px-4 md:px-6 py-24">
        {sponsors
          .filter((sponsor) => ["Gold", "Silver", "Bronze"].includes(sponsor.level))
          .map((sponsor, index) => {
            
            return (
            <CardDesign
              key={`${sponsor.level}-${index}`}
              className={"w-[250px] md:w-[400px] sm:w-[300px] max-w-xl  mx-auto"}
              CardColor={sponsor.level}
            >
              <Para name={sponsor.name} imgURL={sponsor.imgURL} level={sponsor.level} />
            </CardDesign>
          )}
          )}
      </TracingBeam>
      ) : (
        <EmptyStateMessage message="Sponsors will be available soon." />
      )}

<section 
        id="registrationStatus" 
        className="scroll-mt-20 relative py-16 w-full">
        <div className="w-full mx-auto">
          <div className="relative w-full z-10">
            <RegistrationStatus />
          </div>
        </div>
      </section>



     <div id="reach_us" className="scroll-mt-20">
        {!isReachUsGridLoading && <GridBackground title="Reach Us">
          <ReachUsSection grid={reachUsContacts} />
        </GridBackground>}
      </div>

      <Footer />
   
  </RootLayout>
);
}

