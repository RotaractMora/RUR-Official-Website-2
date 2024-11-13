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
import SPONSOR1 from "../../public/Images/partners/Dimo-logo-1.svg"
import SPONSOR2 from "../../public/Images/partners/JKH Logo.png"
import SPONSOR3 from "../../public/Images/partners/Logo_of_MAS_Holdings.png"
import SPONSOR4 from "../../public/Images/partners/lseg.png"
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
import { useLoadState , LoadedProvider } from "@/context/loadStateContext";
import { loadProjectInfo } from "next/dist/build/webpack-config";


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
    name:'Home',
    link:'/home',
  },
  {
    name:'Register',
    link:'/register',
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


const Para = ({level,name,imgURL,loadCallback}:{level:string,name:string,imgURL:string|undefined,loadCallback?:(count: number) => void}):React.ReactNode => {
  const { markAsLoaded} = useLoadState();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if(isLoaded){
      markAsLoaded(1)
    }
  }
  ,[isLoaded]);

  return (
    <div className="max-w-5xl mx-auto px-0 md:px-0 lg:px-1 flex flex-col items-center h-full justify-between">
      <h6 className="text-6xl text-center font-bold dark:text-custom-color-800 text-custom-dark-color-800 p-2 py-3">
        {`${level} Sponsor`}
      </h6>
      <Image
        onLoad={() => setIsLoaded(true)}
        src={imgURL ? imgURL : SPONSOR1}
        width={300}
        height={100}
        alt="Sponsor"
        className="p-0 rounded-lg dark:bg-black bg-white h-50"
      />
      <h5 className="text-5xl text-center font-bold dark:text-custom-color-900 text-custom-dark-color-900 p-3">
        {name}
      </h5>
    </div>
  );
  
}


export default function Home() {

  const [timeline,setTimeline] = useState([] as ITimelineData[]);
  const [sponsors, setSponsors] = useState([] as ISponsor[]);
  const [isTimelineLoading, setTimelineLoading] = useState(true);
  const [isSponsorsLoading, setSponsorsLoading] = useState(true);
  const {addToTotalImagesCount,loadProgress,totalItms,loadedItms} = useLoadState();

  useEffect(() => {
      
    getTimeLineEvents().then((data) => {
        setTimeline(data);
        setTimelineLoading(false);
      });

    getSponsors("All").then((data) => {
        setSponsors(data);
        setSponsorsLoading(false);
        addToTotalImagesCount(data.filter((sponsor)=>sponsor.level === "Gold" || sponsor.level ==="Silver" || sponsor.level === "Bronze").length);
      }
    );
  },[]);

  const events = timeline.map((t) => ({
    title: t.title,
    content: t.description,
    eventDate: t.eventDate.toDate(),
    btnLink: t.btnLink,
  }));

  

  return (
    
        <RootLayout>
          <FloatingNav navItems={navItms}/>
          <HeroParallax products={products}/>
          {
            isTimelineLoading ? <Loading/> : (events.length > 0 ? <Timeline data={events} /> : <div>Timeline will be updated soon.</div>)
          }
          

          <LampLighting firstLine="Sponsers" secondLine=""/>
          <button type="button" onClick={()=>console.log(loadProgress,totalItms,loadedItms)}>click {loadProgress}</button>

          {
            isSponsorsLoading ? <Loading/> : ( sponsors.length > 0 ?
        
                <TracingBeam className="">
                    
                    {
                      sponsors.filter((sponsor)=>sponsor.level === "Gold").map((sponsor, index) =>(
                      <GlareCard key={`${sponsor.level}-${index}`} className="w-5xl" CardColor={sponsor.level}>
                        <Para name={sponsor.name} imgURL={sponsor.imgURL} level={sponsor.level} />
                      </GlareCard>
                      ))
                    }
                    {
                      sponsors.filter((sponsor)=>sponsor.level === "Silver").map((sponsor, index) =>(
                        <GlareCard key={`${sponsor.level}-${index}`} className="w-5xl" CardColor={sponsor.level}>
                          <Para name={sponsor.name} imgURL={sponsor.imgURL} level={sponsor.level} />
                        </GlareCard>
                      ))
                    }
                    {
                      sponsors.filter((sponsor)=>(sponsor.level == "Bronze") ).map((sponsor, index) =>(
                        <GlareCard key={`${sponsor.level}-${index}`} className="w-5xl" CardColor={sponsor.level}>
                          <Para name={sponsor.name} imgURL={sponsor.imgURL} level={sponsor.level}  />
                        </GlareCard>
                      ))
                    }

                </TracingBeam>
                :
                <div> Sponsors will be updated soon.</div>
            )
        }


          <GridBackground title="Reach Us">
          <ReachUsSection grid={grid} />
          </GridBackground>


          <Footer />
        </RootLayout>
  );
}
