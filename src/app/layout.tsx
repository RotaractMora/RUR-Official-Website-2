'use client'

import localFont from "next/font/local";
import "./globals.css";
import React, {  useCallback, useState } from "react";
import { AuthProvider } from "@/context/auth-provider";


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


export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

  const DEFAULT_THEME:'dark'|'light' = 'dark';
  const [theme,setThemeMode] = useState<'dark'|'light'>(DEFAULT_THEME);
  
      const currentTheme = ():'dark'|'light' => {
        if (typeof window !== 'undefined') {
          const t = localStorage.getItem('theme') as 'dark'|'light';
          if(!t){
            localStorage.setItem('theme',DEFAULT_THEME);
            return DEFAULT_THEME;
          } else {
            return t;
          }
        }
        return DEFAULT_THEME;
      }


    const setTheme = useCallback((newTheme:'dark'|'light') => {
        if(currentTheme()!==newTheme && currentTheme()!==null){
        localStorage.setItem('theme',newTheme);
        setThemeMode(newTheme);
        console.log('theme set to',newTheme);
      }  
    },[]);

    const tougleTheme = () => {
        setThemeMode((prev) => prev === 'dark' ? 'light' : 'dark');
      }

  return (
    <AuthProvider>

    <ThemeContext.Provider value={[setTheme,tougleTheme,currentTheme]}>
        <html className={theme} lang="en">
          <body className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark-gradient bg-light-gradient antialiased`} >
            {children}
          </body>
        </html>    
    </ThemeContext.Provider>
    
    </AuthProvider>
  );
 
    
};


