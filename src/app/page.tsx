"use client"

import { HeroParallax } from "@/components/ui/hero-parallax";
import RootLayout from "./layout";
import { FloatingNav } from "@/components/ui/floating-navbar";
import React from "react";
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

export default function Home() {
  return (
    
        <RootLayout>
          <FloatingNav navItems={navItms}/>
          <HeroParallax products={products}/>
        </RootLayout>
  );
}
