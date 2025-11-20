'use client';


import localFont from "next/font/local";
import "./globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "@/context/auth-provider";
import {ITheme, IThemeContextType} from "@/interfaces/IThemeContext";
import { GoogleTagManager } from '@next/third-parties/google'
import Head from "next/head";
import { Helmet, HelmetProvider } from "react-helmet-async";


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

export const ThemeContext = React.createContext<IThemeContextType|null>(null);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const DEFAULT_THEME = "light";
  const [theme, setThemeMode] = useState<ITheme>(DEFAULT_THEME);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as ITheme;
    if (storedTheme) {
      setThemeMode(storedTheme);
    } else {
      localStorage.setItem('theme', DEFAULT_THEME);
      setThemeMode(DEFAULT_THEME);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme as ITheme;
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: ITheme) => {
      if (theme !== newTheme) {
        localStorage.setItem('theme', newTheme);
        setThemeMode(newTheme);
        console.log('Theme set to', newTheme);
      }
    },
    [theme]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    console.log('Toggled theme to', newTheme);
  }, [theme, setTheme]);

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ setTheme, toggleTheme, theme }}>
        <HelmetProvider>
        <html lang="en">
          <head>
          <meta name="google-site-verification" content="ctC6c_Itp6D3M77kEOvPaN9D9i_O6Sq5vXpCX8EyMsY" />          </head>
          <Helmet>

              <meta name="description" content="Official website of 'Are You Ready? 2025', organized by the Rotaract Club of University of Moratuwa" />
              <meta name="keywords" content="RUR25,Are You Ready,Rota,Mora,UoM,RUR,RUR?" />
              
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="Are You Ready? 2025" />
              <meta property="og:title" content="Are You Ready? 2025" />
              <meta property="og:description" content="'Are You Ready? 2025', organized by Rotaract Club of the University of Moratuwa in collaboration with the university's Career Guidance Unit is a much-awaited event in the university calendar which marks the official careers week of the university." />
              <meta property="og:url" content="https://areyouready.uom.lk/" />
              <meta property="og:image" content="https://areyouready.uom.lk/Images/logo/RUR.png" />

              <meta name="author" content="Rotaract Club of University of Moratuwa" />
              <link rel="author" href="https://rotaractmora.org" />

              <link rel="icon" href="https://areyouready.uom.lk/Images/logo/icon.ico" />
          
          </Helmet>
          <body className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark-gradient bg-light-gradient antialiased`} >
              <GoogleTagManager gtmId="GTM-MWJNXDZR" />
                {children}
          </body>
        </html>
        </HelmetProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
