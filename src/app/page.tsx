"use client";

import ResponsiveHero from "@/components/ui/responsiveHero";
import RootLayout from "./layout";
import { FloatingNav } from "@/components/ui/floating-navbar";
import React, { useEffect, useState } from "react";
import RUR_IMG1 from "../../public/Images/RUR (1).jpg";
import RUR_IMG2 from "../../public/Images/RUR (2).jpg";
import RUR_IMG3 from "../../public/Images/RUR (3).jpg";
import RUR_IMG4 from "../../public/Images/RUR (4).jpg";
import RUR_IMG5 from "../../public/Images/RUR (5).jpg";
import RUR_IMG6 from "../../public/Images/RUR (6).jpg";
import RUR_IMG7 from "../../public/Images/RUR (7).jpg";
import RUR_IMG8 from "../../public/Images/RUR (8).jpg";
import RUR_IMG9 from "../../public/Images/RUR (9).jpg";
import RUR_IMG10 from "../../public/Images/RUR (10).jpg";
import RUR_IMG11 from "../../public/Images/RUR (11).jpg";
import RUR_IMG12 from "../../public/Images/RUR (12).jpg";
import RUR_IMG13 from "../../public/Images/RUR (13).jpg";
import RUR_IMG14 from "../../public/Images/RUR (14).jpg";
import RUR_IMG15 from "../../public/Images/RUR (15).jpg";

import SPONSOR from "../../public/Images/sponsor.png";
// import LoadingAnimation from "../../public/animations/RUR.json"
import LoadingAnimation from "../../public/animations/RUR_Loading.json";

import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import ReachUsSection from "@/components/blocks/reach-us-section";
import Footer from "@/components/blocks/footer";
import { GridBackground } from "@/components/ui/backgrounds";
import { ISponsor } from "@/interfaces/ISponsors";
import { getDataFromAggregatedDoc } from "@/services/aggregatedData.service";
import { ITimelineData } from "@/interfaces/ITimeline";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Highlighter } from "@/components/blocks/hilight";
import {
  HomeIcon,
  ClockIcon,
  MegaphoneIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { CardDesign } from "@/components/ui/card-design";
// import Lottie from "react-lottie-player";
import { IContact } from "@/interfaces/IContacts";
import RegistrationStatus from "@/components/ui/google-gemini-effect";
import BackToTopButton from "@/components/ui/back-to-top";
import CodeEvelPara from "@/components/ui/code-evel-para";
import { HeroVideo } from "@/components/ui/hero-video";
import ExpandableCard from "@/components/blocks/expandable-card-standard";
import Head from "next/head";
import { sendGTMEvent } from "@next/third-parties/google";
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet-async';
 
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });


export const products = [
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG1,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG2,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG3,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG4,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG5,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG6,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG7,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG8,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG9,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG10,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG11,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG12,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG13,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG14,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail: RUR_IMG15,
  },
];

const navItms = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Timeline",
    link: "#timeline",
    icon: <ClockIcon />,
  },
  {
    name: "Sponsors",
    link: "#sponsors",
    icon: <MegaphoneIcon />,
  },
  {
    name: "Reach Us",
    link: "#reach_us",
    icon: <PhoneArrowUpRightIcon />,
  },
];

console.log("Home Page");

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
    </div>
  );
};

const Para = ({
  level,
  partnership,
  name,
  imgURL,
  loadCallback,
}: {
  level: string;
  partnership: string;
  name: string;
  imgURL: string | undefined;
  loadCallback?: (count: number) => void;
}): React.ReactNode => {
  const color =
    level === "Gold"
      ? "custom-color-gold dark:custom-dark-color-gold"
      : level === "Silver"
      ? "custom-color-silver dark:custom-dark-color-silver"
      : "custom-color-bronze dark:custom-dark-color-bronze";

  return (
    <div className="w-full h-full max-w-xl mx-auto px-4 md:px-6 lg:px-6 flex flex-col items-center justify-stretch min-h-[400px] lg:min-h-[300px]">
      <h6
        className={
          "text-xl md:text-2xl lg:text-3xl text-center font-bold p-2 py-3" +
          " text-" +
          color
        }
      >
        {partnership}
      </h6>

      {/* Image Section */}
      <div className="w-full h-auto flex justify-center mb-4">
        <Image
          src={imgURL ? imgURL : SPONSOR}
          width={250}
          height={100}
          alt="Sponsor"
          className="object-contain p-2 my-2 rounded-lg"
        />
      </div>
    </div>
  );
};

const AboutSection = ({ content }: { content: string }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 md:py-12">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-12 mt-0">
        <h2 className="text-3xl md:text-4xl text-center font-bold dark:text-custom-color-800 bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent mb-4">
          About Are You Ready?
        </h2>
        <div className="prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none leading-10 text-justify">
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
  const [isLoadingAnimComplete, setIsLoadingAnimComplete] = useState(false);
  const [reachUsContacts, setReachUsContacts] = useState([] as IContact[]);
  const [isReachUsGridLoading, setIsReachUsGridLoading] = useState(true);

  const loadingTimeout = () => {
    console.log("Loading animation timeout");
    setTimeout(() => {
      setIsLoadingAnimComplete(true);
    }, 2000);
  };

  useEffect(() => {
    sendGTMEvent({
      event: "page view",
      page: "home",
      path: window.location.pathname,
    });

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
        sendGTMEvent({
          event: "JS_Error",
          error_name: "AggregatedDocLoadError",
          error: err,
        });
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

  function getEvents() {
    const events = timeline.map((t) => ({
      title: t.title,
      content: <CodeEvelPara htmlContent={t.description} />,
      eventDate: t.eventDate.toDate(),
      btnLink: t.btnLink,
      image: t.imgURL,
      btnText: t.btnText,
      isBtnDisabled: t.isBtnDisabled,
    }));

    return events;
  }

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center">
      <HeroHighlight>
        <Highlighter firstString="Error: " secondString={message} />
      </HeroHighlight>
    </div>
  );

  const EmptyStateMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center" id="sponsors">
      <HeroHighlight>
        <Highlighter firstString="" secondString={message} />
      </HeroHighlight>
    </div>
  );

  const content: string =
    '"Are You Ready?" stands as a monumental initiative led by the Rotaract Club of the University of Moratuwa in partnership with the Career Guidance Unit. Our primary focus is 4th year undergraduates from our university, aiming to guide them towards a secure entry into the professional world. The scope of this endeavor knows no bounds, with over 100 companies aligning to provide opportunities for budding professionals. This project promises to be a valuable asset for those aspiring to forge strong connections with companies and their managers, even if the finish line of their degree is still on the horizon. In the initial stages, participants will gain the essential knowledge and training to confidently engage with industry experts.';

  return (
    <>
    <RootLayout>
      <Helmet>
              <meta name="title" content="Are You Ready? 2025" />
              <meta name="robots" content="index, follow"/>
              <meta name="googlebot" content="index, follow"/>
              <meta name="referrer" content="no-referrer" />
              <title> Are You Ready? 2025 </title>

              <link rel="bookmark" href="https://areyouready.uom.lk/#timeline" />
              <link rel="bookmark" href="https://areyouready.uom.lk/#sponsors" />
              <link rel="bookmark" href="https://areyouready.uom.lk/#reach_us" />
              <link rel="bookmark" href="https://areyouready.uom.lk/#registrationStatus" />
              <link rel="bookmark" href="https://areyouready.uom.lk/#registeredCompanies" />
      </Helmet>


      <BackToTopButton />

      <FloatingNav navItems={navItms} />
      {!isLoadingAnimComplete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#545576]">
          <Lottie
            loop={true}
            animationData={LoadingAnimation}
            play
            style={{ width: 150, height: 150 }}
            onLoopComplete={loadingTimeout}
          />
        </div>
      )}

      <div className="space-y-0">
        <HeroVideo
          videoSrc="videos/RUR_Logo.mp4"
          play={isLoadingAnimComplete}
          onLoadedVideo={() => {
            setIsLoadingAnimComplete(true);
          }}
        />
        <ResponsiveHero products={products} />
        <AboutSection content={content} />
      </div>

      <div id="timeline" className="scroll-mt-20">
        {error ? (
          <ErrorMessage message={error} />
        ) : isTimelineLoading ? (
          <Loading />
        ) : getEvents().length > 0 ? (
          <Timeline data={getEvents()} />
        ) : (
          <EmptyStateMessage message="Timeline will be updated soon." />
        )}
      </div>

{ sponsors.length > 0 &&
      <div className="scroll-mt-20 py-8 px-6 text-center bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-custom-color-800 bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent mb-4">
        Sponsors
        </h2>
      </div>
}
<div id="sponsors"></div>

      {error ? (
        <ErrorMessage message={error} />
      ) : isSponsorsLoading ? (
        <Loading />
      ) : sponsors.length > 0 ? (
        <TracingBeam className="px-4 md:px-6 py-24">
          {/* Sponsors Section */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsors
              .sort((a, b) => {
                return a.order - b.order;
              })
              .map((sponsor, index) => (
                <CardDesign
                  key={`${sponsor.level}-${index}`}
                  className="w-full max-w-sm"
                  CardColor={sponsor.level}
                >
                  <Para
                    name={sponsor.name}
                    imgURL={sponsor.imgURL}
                    level={sponsor.level}
                    partnership={sponsor.partnership}
                  />
                </CardDesign>
              ))}
          </div>
        </TracingBeam>
      ) : (
        <EmptyStateMessage message="Sponsors will be available soon." />
      )}

      { sponsors.length > 0 &&
            <div className="scroll-mt-20 py-8 px-6 text-center bg-gray-100 dark:bg-gray-800">
              <h2 className="text-3xl md:text-4xl font-bold text-center dark:text-custom-color-800 bg-gradient-to-r from-[#0f0271] to-[#15c0fe] bg-clip-text text-transparent mb-4">
                Thank You for Your Support!
              </h2>
              <p className="mt-4 max-w-7xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We deeply appreciate your unwavering support in making this event a
                success. Your contributions inspire us to innovate, collaborate, and
                grow. Together, we’re achieving remarkable milestones. Stay tuned for
                exciting updates as we continue this incredible journey. Thank you for
                being a vital part of our mission!
              </p>
            </div>
      }
      
      <section
        id="registrationStatus"
        className="scroll-mt-20 relative w-full"
      >
        <div className="w-full mx-auto">
          <div className="relative w-full z-10">
            <RegistrationStatus />
          </div>
        </div>
      </section>

      <div id="registeredCompanies" className="m-0 p-0">
      <ExpandableCard />
      </div>


      <div id="reach_us" className="scroll-mt-20">
        {!isReachUsGridLoading && (
          <GridBackground title="Reach Us">
            <ReachUsSection grid={reachUsContacts} />
          </GridBackground>
        )}
      </div>

      <Footer />
    </RootLayout>
    </>
  );
}
