// AdminDashboardLayout.tsx
"use client";
import React, { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import Footer from "@/components/blocks/footer";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../../components/ui/navbar-menu"
import Image from "next/image";

interface AdminDashboardLayoutProps {
    children: ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="relative w-full flex items-center justify-center mb-24">
                <Navbar className="top-2" />
            </div>
            
            <main className="flex-grow p-4">               
                {children}
            </main>
            
            <Footer />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
            <Menu setActive={setActive}>

                    {/* <Image src={} alt="RUR" width={40} height={40} className="p-0 rounded-lg dark:bg-black bg-white"/> */}
                    
                    <MenuItem setActive={setActive} active={null} item="Home" />

                    <MenuItem setActive={setActive} active={null} item="Timeline" />
                    
                    <MenuItem setActive={setActive} active={null} item="Sponsors"/>
    
                    <MenuItem setActive={setActive} active={null} item="Logout"/>
            

                {/* <MenuItem setActive={setActive} active={active} item="Logout">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/logout">Logout</HoveredLink>
                    </div>
                </MenuItem> */}

            </Menu>
        </div>
    );
}
