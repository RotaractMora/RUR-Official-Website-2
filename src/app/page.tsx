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


    // const timelineEvents: ITimelineData[] = [
    //   {
    //     title: "Heads up",
    //     description: "The curriculum vitae and job interviews play significant roles in a job recruitment process. Presenting a CV that showcases one's life work accurately is the key to open doors for a face-to-face interview.",
    //     eventDate: new Date("2024-11-11"),
    //     btnLink: "#",
    //     imgURL: "path/to/image1.jpg",
    //     btnText: "Learn More",
    //     order: 1,
    //     isBtnDisabled: false,
    //   },
    //   {
    //     title: "The Image",
    //     description: "Personal branding is telling an individual's story in a means that reflects his conduct, behavior, attitudes,and unspoken words. A unique personal brand is what would make a professional stand out from the rest and risealong his career ladder.",
    //     eventDate: new Date("2024-11-12"),
    //     btnLink: "#",
    //     imgURL: "path/to/image2.jpg",
    //     btnText: "Learn More",
    //     order: 2,
    //     isBtnDisabled: false,
    //   },
    //   {
    //     title: "Resume Center",
    //     description: "The curriculum vitae or the CV is the primary opportunity for a job applicant to establish a strong initial impression on a potential employer. A quality CV will surely boost the likelihood of an employment seeker getting a face-to-face interview.",
    //     eventDate: new Date("2024-11-13"),
    //     btnLink: "#",
    //     imgURL: "path/to/image3.jpg",
    //     btnText: "Learn More",
    //     order: 3,
    //     isBtnDisabled: false,
    //   },
    //   {
    //     title: "Career Insights",
    //     description: "Most of the undergraduates manifest a lack of knowledge regarding the career paths they could pursue following their graduation. Hence, a series of webinars will be conducted based on the different career fields catered to different departments of the university by the industry and corporate companies who will be participating the careerfair.",
    //     eventDate: new Date("2024-11-14"),
    //     btnLink: "#",
    //     imgURL: "path/to/image4.jpg",
    //     btnText: "Learn More",
    //     order: 4,
    //     isBtnDisabled: false,
    //   },
    //   {
    //     title: "Flagship Fair",
    //     description: "'Flagship Fair' is the limelight of 'Are you Ready?', in which the prospective employers' role comes intoplay. The employers are given the opportunity to identify skillful and qualified undergraduates of University of Moratuwa, through mock and real interviews.",
    //     eventDate: new Date("2024-11-15"),
    //     btnLink: "#",
    //     imgURL: "path/to/image5.jpg",
    //     btnText: "Learn More",
    //     order: 5,
    //     isBtnDisabled: false,
    //   },
    //   {
    //     title: "Global Pathway",
    //     description: "'Global Pathway' program offers a variety of resources to help students prepare for their international job search. This includes information on how to create a global resume, how to research international job opportunities, and how to effectively network with professionals in different countries. Additionally, the program provides students with access to a wide range of job search tools, including job boards and career fairs, as well as career counseling services to help students identify and pursue their ideal global career.",
    //     eventDate: new Date("2024-11-16"),
    //     btnLink: "#",
    //     imgURL: "path/to/image6.jpg",
    //     btnText: "Learn More",
    //     order: 6,
    //     isBtnDisabled: false,
    //   }
    // ];
    
    // timelineEvents.forEach(event => {
    //   addTimeLineEvent(event).then(response => {
    //     console.log(`Event ${event.title} added successfully`, response);
    //   }).catch(error => {
    //     console.error(`Error adding event ${event.title}`, error);
    //   });
    // });
    
    
    // console.log("Sponsors added",getSponsers("Silver"));
    // const s = {
    //   level: "Silver",
    //   sponsor: "Company D"
    // } as ISponser;
    // addSponser(s);
    // console.log("del",deleteSponser("x2xFMFgzeOQgqKese7fG"));
    
    // const timelineEvent: ITimelineData = {
    //   title: "Global Pathway",
    //   description: "'Global Pathway' program offers a variety of resources to help students prepare for their international job search. This includes information on how to create a global resume, how to research international job opportunities, and how to effectively network with professionals in different countries. Additionally, the program provides students with access to a wide range of job search tools, including job boards and career fairs, as well as career counseling services to help students identify and pursue their ideal global career.",
    //   eventDate: new Date("2024-11-16 1:55:23") ,
    //   btnLink: "#",
    //   imgURL: "path/to/image.jpg",
    //   btnText: "Learn More",
    //   order: 1,
    //   isBtnDisabled: false,
    // };
    
    // console.log(addTimeLineEvent(timelineEvent));
    // console.log(getTimeLineEvents());
    // console.log(deleteTimeLineEvent("yGwprTd3MN2nVi0MdAoX"));

    // deleteFile(ref(getStorage(),'images/test.png')).then((res)=>{
    //   console.log("Deleted",res);
    // }).catch((error)=>{
    //   console.log("Error",error);
    // });


  },[]);
  console.log(timeline);
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

          <label htmlFor="test">File</label>
          <input id="test" name="test" type="file" onChange={(e)=>{
            let reference;
            if(e.target.files){
              reference = addFile(e.target.files[0]).then((ref)=>{
              return ref;
              });
              if(reference != null){
                 reference.then((ref)=>{
                  if(ref){
                     getDownloadURL(ref).then((url)=>{
                    });
                  }
                })
                .catch((error)=>{
                  console.log("Error",error);
                });
              }
            }
          }} />

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
