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
import { Timeline } from "@/components/ui/timeline";

import LampLighting from "@/components/ui/lamp";
import { GlareCard } from "@/components/ui/glare-card";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import ReachUsSection from "@/components/blocks/reach-us-section";
import Footer from "@/components/blocks/footer";
import { GridBackground } from "@/components/ui/backgrounds";
import { ISponsor } from "@/interfaces/ISponsors";
import {  getSponsors } from "@/services/sponsors.service";
import {  getTimeLineEvents } from "@/services/timeline.service";
import { ITimelineData } from "@/interfaces/ITimeline";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { Highlighter } from "@/components/blocks/hilight";
import {  HomeIcon, ClockIcon , MegaphoneIcon , PhoneArrowUpRightIcon } from "@heroicons/react/24/solid";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";


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


const grid = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    position: "Software Engineer",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "234-567-8901",
    position: "Project Manager",
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "345-678-9012",
    position: "QA Engineer",
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "456-789-0123",
    position: "Software Engineer",
  },
  {
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    phone: "567-890-1234",
    position: "Project Manager",
  },
  {
    name: "Diana Evans",
    email: "diana.evans@example.com",
    phone: "678-901-2345",
    position: "QA Engineer",
  },
  {
    name: "Frank Green",
    email: "frank.green@example.com",
    phone: "789-012-3456",
    position: "Software Engineer",
  },
  {
    name: "Grace Harris",
    email: "grace.harris@example.com",
    phone: "890-123-4567",
    position: "Project Manager",
  },
  {
    name: "Henry Lee",
    email: "henry.lee@example.com",
    phone: "901-234-5678",
    position: "QA Engineer",
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
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center h-full justify-between">
      <h6 className="text-3xl md:text-4xl lg:text-6xl text-center font-bold dark:text-custom-color-800 text-custom-dark-color-800 p-2 py-3">
        {`${level} Sponsor`}
      </h6>
      <Image
        src={imgURL ? imgURL : SPONSOR}
        width={300}
        height={100}
        alt="Sponsor"
        className="p-0 rounded-lg dark:bg-black bg-white h-auto w-full max-w-[250px] md:max-w-[300px]"
      />
      <h5 className="text-2xl md:text-3xl lg:text-5xl text-center font-bold dark:text-custom-color-900 text-custom-dark-color-900 p-3">
        {name}
      </h5>
    </div>
  );
};

const AboutSection = ({ content }: { content: string }) => {
  return (
    <div className="w-full px-4 md:w-3/4 lg:w-1/2 mx-auto py-2  md:py-4">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-8 mt-0">
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

  useEffect(() => {
    getTimeLineEvents().then((data) => {
      setTimeline(data);
      setTimelineLoading(false);
    });

    getSponsors("All").then((data) => {
      setSponsors(data);
      setSponsorsLoading(false);
      const validdata = data.filter((sponsor) => sponsor.level === "Gold" || sponsor.level === "Silver" || sponsor.level === "Bronze");
      console.log(validdata);
    });
  }, []);

  const events = timeline.map((t) => ({
    title: t.title,
    content: t.description,
    eventDate: t.eventDate.toDate(),
    btnLink: t.btnLink,
    image: t.imgURL,
  }));

  const loaderSteps = [
    { text: "This is It" },
    { text: "Make It Count" },
    { text: "Step Into Greatness" },
    { text: "The Time Is Now" },
    { text: "Don't Look Back" },
    { text: "Are You Ready?" },
    { text: "2025" },
  ];

  const content: string = "\"Are You Ready?\" stands as a monumental initiative led by the Rotaract Club of the University of Moratuwa in partnership with the Career Guidance Unit. Our primary focus is 4th year undergraduates from our university, aiming to guide them towards a secure entry into the professional world. The scope of this endeavor knows no bounds, with over 100 companies aligning to provide opportunities for budding professionals. This project promises to be a valuable asset for those aspiring to forge strong connections with companies and their managers, even if the finish line of their degree is still on the horizon. In the initial stages, participants will gain the essential knowledge and training to confidently engage with industry experts.";

  return (
    <RootLayout>
      <div className="relative">
        <FloatingNav navItems={navItms} />
        <MultiStepLoader loop={false} loading={isLoading} loadingStates={loaderSteps} duration={600} exitCallback={() => setIsLoading(false)} />

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