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
import LoadingAnimation from "../../public/animations/RUR.json"
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
import { HomeIcon, ClockIcon, MegaphoneIcon, PhoneArrowUpRightIcon } from "@heroicons/react/24/solid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Lottie from "react-lottie-player";

// Products array remains unchanged
export const products = [/* ... products array content ... */];

// Navigation items array remains unchanged
const navItms = [/* ... navItms array content ... */];

// Grid array remains unchanged
const grid = [/* ... grid array content ... */];

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-transparent"></div>
    </div>
  );
}

const Para = ({ level, name, imgURL, loadCallback }: { level: string, name: string, imgURL: string | undefined, loadCallback?: (count: number) => void }): React.ReactNode => {
  // Para component implementation remains unchanged
  return (/* ... Para component JSX ... */);
};

const AboutSection = ({ content }: { content: string }) => {
  // AboutSection component implementation remains unchanged
  return (/* ... AboutSection component JSX ... */);
};

export default function Home() {
  const [timeline, setTimeline] = useState([] as ITimelineData[]);
  const [sponsors, setSponsors] = useState([] as ISponsor[]);
  const [isTimelineLoading, setTimelineLoading] = useState(true);
  const [isSponsorsLoading, setSponsorsLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingAnimComplete, setIsLoadingAnimComplete] = useState(false);
  
  const loadingTimeout = () => {
    setTimeout(() => setIsLoadingAnimComplete(true), 1000);
  };

  useEffect(() => {
    getDataFromAggregatedDoc().then((data) => {
      console.log("aggregated data ", data);
      setTimeline(data.timelineList);
      setSponsors(data.sponsorList);
      setTimelineLoading(false);
      setSponsorsLoading(false);
      setIsLoading(false);
    });
  }, []);

  const events = timeline.map((t) => ({
    title: t.title,
    content: t.description,
    eventDate: t.eventDate.toDate(),
    btnLink: t.btnLink,
    image: t.imgURL,
  }));

  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center p-8">
      <HeroHighlight>
        <Highlighter firstString="Error: " secondString={message} />
      </HeroHighlight>
    </div>
  );

  const EmptyStateMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center p-8">
      <HeroHighlight>
        <Highlighter firstString="" secondString={message} />
      </HeroHighlight>
    </div>
  );

  const content: string = "\"Are You Ready?\" stands as a monumental initiative led by the Rotaract Club of the University of Moratuwa in partnership with the Career Guidance Unit. Our primary focus is 4th year undergraduates from our university, aiming to guide them towards a secure entry into the professional world. The scope of this endeavor knows no bounds, with over 100 companies aligning to provide opportunities for budding professionals. This project promises to be a valuable asset for those aspiring to forge strong connections with companies and their managers, even if the finish line of their degree is still on the horizon. In the initial stages, participants will gain the essential knowledge and training to confidently engage with industry experts.";

  return (
    <RootLayout>
      <div className="relative">
        <FloatingNav navItems={navItms} />
        {(isLoading || !isLoadingAnimComplete) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#545576]">
            <Lottie
              loop={false}
              animationData={LoadingAnimation}
              onComplete={loadingTimeout}
              play
              style={{ width: 500, height: 500 }}
            />
          </div>
        )}

        <div className="space-y-0">
          <ResponsiveHero products={products} />
          <AboutSection content={content} />
        </div>

        <div id="timeline" className="scroll-mt-20">
          {isTimelineLoading ? (
            <Loading />
          ) : events.length > 0 ? (
            <Timeline data={events} />
          ) : (
            <HeroHighlight>
              <Highlighter firstString="" secondString="Timeline will be available soon." />
            </HeroHighlight>
          )}
        </div>

        <div id="sponsors" className="scroll-mt-20">
          <LampLighting firstLine="Sponsors" secondLine="" />
        </div>

        {isSponsorsLoading ? (
          <Loading />
        ) : sponsors.length > 0 ? (
          <TracingBeam className="px-4 md:px-6">
            {sponsors
              .filter((sponsor) => ["Gold", "Silver", "Bronze"].includes(sponsor.level))
              .map((sponsor, index) => (
                <GlareCard
                  key={`${sponsor.level}-${index}`}
                  className="w-full max-w-5xl mx-auto"
                  CardColor={sponsor.level}
                >
                  <Para name={sponsor.name} imgURL={sponsor.imgURL} level={sponsor.level} />
                </GlareCard>
              ))}
          </TracingBeam>
        ) : (
          <HeroHighlight>
            <Highlighter firstString="" secondString="Sponsors will be available soon." />
          </HeroHighlight>
        )}

        <div id="reach_us" className="scroll-mt-20">
          <GridBackground title="Reach Us">
            <ReachUsSection grid={grid} />
          </GridBackground>
        </div>

        <Footer />
      </div>
    </RootLayout>
  );
}