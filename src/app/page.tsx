"use client"

import { HeroParallax } from "@/components/ui/hero-parallax";
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
import RUR_IMG16 from "../../public/Images/RUR (16).jpg"
import RUR_IMG17 from "../../public/Images/RUR (17).jpg"
import RUR_IMG18 from "../../public/Images/RUR (18).jpg"
import RUR_IMG19 from "../../public/Images/RUR (19).jpg"
import RUR_IMG20 from "../../public/Images/RUR (20).jpg"
import RUR_IMG21 from "../../public/Images/RUR (21).jpg"
import { Timeline ,ITimelineEntry } from "@/components/ui/timeline";

import LampLighting from "@/components/ui/lamp";
import { GlareCard } from "@/components/ui/glare-card";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import ReachUsSection from "@/components/blocks/reach-us-section";
import Footer from "@/components/blocks/footer";
import { GridBackground } from "@/components/ui/backgrounds";
import { ISponsor } from "@/interfaces/ISponsors";
import { addSponsor, deleteSponsor, getSponsors } from "@/services/sponsors.service";
import { addTimeLineEvent, deleteTimeLineEvent, getTimeLineEvents } from "@/services/timeline.service";
import { ITimelineData } from "@/interfaces/ITimeline";
import { title } from "process";
import { addFile, deleteFile } from "@/services/firebaseStorage.service";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Timestamp } from "firebase/firestore";


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
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG16,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG17,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG18,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG19,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG20,
  },
  {
    title: "Are You Ready?",
    link: "#",
    thumbnail:
      RUR_IMG21,
  }
  
];

const navItms = [
  {
    name:'Home',
    link:'/home',
  },
  {
    name:'Register',
    link:'/register',
  },
];



const Para = ({level}:{level:string}):React.ReactNode => {
  return (
    <div className="max-w-5xl mx-auto py-2 px-0 md:px-0 lg:px-1">
      <Image src={RUR_IMG1} alt="RUR" className="p-0 rounded-lg dark:bg-black bg-white"/>
      <h6 className="text-6xl text-center font-bold dark:text-custom-color-800 text-custom-dark-color-800 p-3">
        {level}
      </h6>
    </div>
  );
}

export default function Home() {

  const [timeline,setTimeline] = useState([] as ITimelineData[]);
  const [sponsors, setSponsors] = useState([] as ISponsor[]);

  useEffect(() => {
      
    getTimeLineEvents().then((data) => {
        setTimeline(data);
      });

    getSponsors("All").then((data) => {
        setSponsors(data);
      }
    );
  },[]);

  const events = timeline.map((t) => ({
    title: t.title,
    content: t.description,
    eventDate: t.eventDate.toDate(),
    btnLink: t.btnLink,
  }));
  console.log("Events",events);
  return (
    
        <RootLayout>
          <FloatingNav navItems={navItms}/>
          <HeroParallax products={products}/>
          <Timeline data={events} />

          <LampLighting firstLine="Sponsers" secondLine="__________"/>

          <TracingBeam className="">
          
          {
            sponsors.filter((sponsor)=>sponsor.level === "Gold").map((sponsor, index) =>(
            <GlareCard key={`${sponsor.level}-${index}`} className="w-5xl" CardColor={sponsor.level}>
              <Para level={` ${sponsor.name} - ${sponsor.level} Sponsor`} />
            </GlareCard>
            ))
          }
          {
            sponsors.filter((sponsor)=>sponsor.level === "Silver").map((sponsor, index) =>(
              <GlareCard key={`${sponsor.level}-${index}`} className="w-5xl" CardColor={sponsor.level}>
                <Para level={` ${sponsor.name} - ${sponsor.level} Sponsor`} />
              </GlareCard>
            ))
          }
          {
            sponsors.filter((sponsor)=>(sponsor.level == "Bronze") ).map((sponsor, index) =>(
              <GlareCard key={`${sponsor.level}-${index}`} className="w-5xl" CardColor={sponsor.level}>
                <Para level={` ${sponsor.name} - ${sponsor.level} Sponsor`} />
              </GlareCard>
            ))
          }

          </TracingBeam>


          <GridBackground title="Reach Us">
          <ReachUsSection/>
          </GridBackground>


          <Footer />

        </RootLayout>
  );
}
