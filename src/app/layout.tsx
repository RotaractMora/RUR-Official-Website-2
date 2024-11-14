'use client'

import localFont from "next/font/local";
import "./globals.css";
import React, { useEffect, useState } from "react";
import { LoadedProvider } from "@/context/loadStateContext";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const ThemeContext = React.createContext<any>(null);

export const handleTheme = () => {

}


export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

  const DEFAULT_THEME:'dark'|'light' = 'dark';
  const [theme,setThemeMode] = useState<'dark'|'light'>(DEFAULT_THEME);
  
      const currentTheme = ():'dark'|'light' => {
        const t = localStorage.getItem('theme') as 'dark'|'light';
        if(!t){
          localStorage.setItem('theme',DEFAULT_THEME);
          return DEFAULT_THEME;
        }
        else{
          return t;
        }
      }


    const setTheme = (newTheme:'dark'|'light') => {
        if(currentTheme()!=newTheme){
        localStorage.setItem('theme',newTheme);
        setThemeMode(newTheme);
      }  
    }

    const tougleTheme = () => {
        setThemeMode((prev) => prev === 'dark' ? 'light' : 'dark');
      }

  return (
    <ThemeContext.Provider value={[setTheme,tougleTheme,currentTheme]}>
      <LoadedProvider>

    <html className={theme} lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark-gradient bg-light-gradient antialiased`} >
        {children}
      </body>
    </html>
    
      </LoadedProvider>
    </ThemeContext.Provider>
  );
 


};


