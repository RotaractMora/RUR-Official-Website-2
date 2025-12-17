"use client";
import { FloatingDock  } from "../ui/floating-dock";
import { FaLinkedin , FaInstagram, FaFacebook, FaYoutube, FaAt } from "react-icons/fa";
import { SiRotaryinternational } from "react-icons/si";
import  LOGO_SMALL  from "../../../public/Images/logo/RUR20_small.png";
import Image from "next/image";

const Footer = () => {

    const floatDockItms = [
        {
            // Rotaract badge: default to gold tone for brand emphasis
            icon: <SiRotaryinternational className="h-6 w-6 text-red-400 dark:text-red-300 hover:text-red-500" />,
            href: "https://rotaractmora.org",
            title: "Rotaract Mora",
        },
        {
            icon: <FaFacebook className="h-6 w-6 text-blue-600 dark:text-blue-400 hover:text-blue-700" />,
            href: "https://www.facebook.com/uom.rur/",
            title: "Facebook",
        },
        {
            icon: <FaLinkedin className="h-6 w-6 text-sky-700 dark:text-sky-400 hover:text-sky-800" />,
            href: "https://www.linkedin.com/company/rotaract-club-of-university-of-moratuwa",
            title: "Linkedin",
        },
        {
            icon: <FaAt className="h-6 w-6 text-gray-600 dark:text-gray-300 hover:text-gray-800" />,
            href: "mailto:areyouready25@rotaractmora.org",
            title: "Email",
        }
    ];
  return (
        <footer className="bg-light-gradient rounded-lg shadow dark:bg-dark-gradient mx-2 sm:mx-4 lg:mx-6">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-6 md:py-8">
                <div className="flex flex-col items-center">
                    <div className="flex items-center mb-4 space-x-3 rtl:space-x-reverse mx-auto">
                        <Image src={LOGO_SMALL} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Are You Ready 2025</span>
                    </div>
                    <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <li>
                            <a href="#timeline" className="hover:underline me-4 md:me-6">Timeline</a>
                        </li>
                        <li>
                            <a href="#sponsors" className="hover:underline me-4 md:me-6">Sponsors</a>
                        </li>
                        <li>
                            <a href="#reach_us" className="hover:underline me-4 md:me-6">Reach Us</a>
                        </li>
                        <li>
                            <a href="#registrationStatus" className="hover:underline me-4 md:me-6">Registration status</a>
                        </li>

                    </ul>
                </div>
                {/* <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" /> */}
                <div className="my-1 flex items-center justify-center">
                    <FloatingDock items={floatDockItms} />
                </div>
                <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm w-full text-gray-500 text-center dark:text-gray-400">© 2025 <a href="https://rotaractmora.org" className="hover:underline">Rotaract Mora</a>. All Rights Reserved.</span>
            </div>
        </footer>
  );
  }

  export default Footer;