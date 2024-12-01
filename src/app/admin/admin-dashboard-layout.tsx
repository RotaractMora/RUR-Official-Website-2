// AdminDashboardLayout.tsx
"use client";
import React, { ReactNode, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import Footer from "@/components/blocks/footer";
import { Menu, MenuItem } from "../../components/ui/navbar-menu"
import Image from "next/image";
import RootLayout, { ThemeContext } from "@/app/layout";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import LOGO_SMALL from "../../../public/Images/logo/RUR20_small.png";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { IThemeContextType } from "@/interfaces/IThemeContext";

interface AdminDashboardLayoutProps {
    children: ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {

    console.log("AdminDashboardLayout");

    return (

            <RootLayout>

                    <div className="min-h-screen flex flex-col">
                        <div className="relative w-full flex items-center justify-center mb-24">
                            <Navbar className="top-2" />
                        </div>
                        
                        <main className="flex-grow p-4">               
                            {children}
                        </main>
                        
                        <Footer />
                    </div>

            </RootLayout>

    );
}

function Navbar({ className }: { className?: string }) {

    const { user , logOut } = useAuth();
    const router = useRouter();
    const [active, setActive] = useState<string | null>(null);

    const themeContext = useContext<IThemeContextType|null>(ThemeContext);
    if (!themeContext) {
        throw new Error("ThemeToggleButton must be used within a ThemeContext.Provider");
    }
    const { toggleTheme, theme } = themeContext;



    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>

                    <Image src={LOGO_SMALL} alt="RUR" width={50} height={37} className="p-0 rounded-lg dark:bg-black bg-white"/>
                    
                    <MenuItem setActive={setActive} active={null} link="/" item="Home" />

                    <MenuItem setActive={setActive} active={null} link="/admin/dashboard/timeline" item="Timeline" />
                    
                    <MenuItem setActive={setActive} active={null} link="/admin/dashboard/sponsors" item="Sponsors"/>
                    
                    <MenuItem setActive={setActive} active={null} link="/admin/dashboard/reachus" item="Reach Us"/>

                    <MenuItem setActive={setActive} active={null} link="/admin/dashboard" item="Dashboard"/>
    
                    {user && <MenuItem setActive={setActive} active={null} link="/admin/logout" item="Logout"/>}

                    <button
                        onClick={toggleTheme}
                        className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                        >
                        {theme == "dark" ? (
                            <SunIcon className="h-5 w-5" />
                        ) : (
                            <MoonIcon className="h-5 w-5" />
                        )}
                    </button>
            

                {/* <MenuItem setActive={setActive} active={active} item="Logout">
                    <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/logout">Logout</HoveredLink>
                    </div>
                    </MenuItem> */}

            </Menu>
        </div>
                    
    );
}
