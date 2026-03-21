"use client";

import {
  BuildingOfficeIcon,
  ClockIcon,
  HomeIcon,
  MegaphoneIcon,
  NewspaperIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import FloatingNav from "@/components/ui/floating-navbar";

export const publicNavItems = [
  {
    name: "Home",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Timeline",
    link: "/#timeline",
    icon: <ClockIcon />,
  },
  {
    name: "Sponsors",
    link: "/#sponsors",
    icon: <MegaphoneIcon />,
  },
  {
    name: "Reach Us",
    link: "/#reach_us",
    icon: <PhoneArrowUpRightIcon />,
  },
  {
    name: "Registered Companies",
    link: "/registered-companies",
    icon: <BuildingOfficeIcon />,
  },
  {
    name: "Informational Pages",
    link: "/info",
    icon: <NewspaperIcon />,
  },
];

export default function PublicNav() {
  return <FloatingNav navItems={publicNavItems} />;
}
