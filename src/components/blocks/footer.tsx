"use client";
import { FloatingDock  } from "../ui/floating-dock";
import { FaLinkedin , FaInstagram, FaFacebook, FaYoutube, FaAt } from "react-icons/fa";
import { SiRotaryinternational } from "react-icons/si";
import  LOGO_SMALL  from "../../../public/Images/logo/RUR20_small.png";
import Image from "next/image";

const Footer = () => {

    const floatDockItms = [
        {
            icon: <SiRotaryinternational className="h-6 w-6 dark:text-custom-color-700 text-custom-color-600 hover:text-custom-dark-color-900 dark:hover:text-custom-color-900" />,
            href: "https://rotaractmora.org",
            title: "Rotaract Mora",
        },
        {
            icon: <FaFacebook className="h-6 w-6 dark:text-custom-color-700 text-custom-color-600 hover:text-custom-dark-color-900 dark:hover:text-custom-color-900" />,
            href: "https://www.facebook.com/uom.rur/",
            title: "Facebook",
        },
        {
            icon: <FaInstagram className="h-6 w-6 dark:text-custom-color-700 text-custom-color-600 hover:text-custom-dark-color-900 dark:hover:text-custom-color-900" />,
            href: "https://www.instagram.com/rotaractmora/",
            title: "Instagram",
        },
        {
            icon: <FaYoutube className="h-6 w-6 dark:text-custom-color-700 text-custom-color-600 hover:text-custom-dark-color-900 dark:hover:text-custom-color-900" />,
            href: "https://www.youtube.com/user/rotaractmora",
            title: "Youtube",
        },
        {
            icon: <FaLinkedin className="h-6 w-6 dark:text-custom-color-700 text-custom-color-600 hover:text-custom-dark-color-900 dark:hover:text-custom-color-900" />,
            href: "https://www.linkedin.com/company/rotaract-club-of-university-of-moratuwa",
            title: "Linkedin",
        },
        {
            icon: <FaAt className="h-6 w-6 dark:text-custom-color-700 text-custom-color-600 hover:text-custom-dark-color-900 dark:hover:text-custom-color-900" />,
            href: "mailto:areyouready@rotaractmora.org",
            title: "Email",
        }
    ];
  return (
        <footer className="bg-light-gradient rounded-lg shadow dark:bg-dark-gradient m-1">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Image src={LOGO_SMALL} className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Are You Ready 2025</span>
                    </div>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
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
                            <a href="/admin" className="hover:underline">Admin</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="flex items-center justify-between">
                    <FloatingDock items={floatDockItms} />
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm w-full text-gray-500 text-center dark:text-gray-400">© 2024 <a href="https://rotaractmora.org" className="hover:underline">Rotaract Mora</a>. All Rights Reserved.</span>
            </div>
        </footer>
  );
  }

  export default Footer;