'use client'

import localFont from "next/font/local";
import "./globals.css";
import React, { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";


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
        let t = localStorage.getItem('theme') as 'dark'|'light';
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
    <html className={theme} lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark-gradient bg-light-gradient antialiased`} >
        {children}
      </body>
    </html>
    </ThemeContext.Provider>
  );
 


};


