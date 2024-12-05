'use client';

import localFont from "next/font/local";
import "./globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "@/context/auth-provider";
import {ITheme, IThemeContextType} from "@/interfaces/IThemeContext";
import { GoogleTagManager } from '@next/third-parties/google'

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
  const DEFAULT_THEME = "dark";
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
        <html lang="en">
          <head>
              <meta charSet="UTF-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Are You Ready? 2025</title>
              <meta name="author" content="Rotaract Club of University of Moratuwa" />
              <meta name="description" content="Official website of 'Are You Ready? 2025', organized by the Rotaract Club of University of Moratuwa" />
              <meta name="keywords" content="RUR25,Are You Ready,Rota,Mora,UoM,RUR,RUR?" />
              <meta property="og:title" content="Are You Ready? 2025" />
              <meta property="og:description" content="'Are You Ready? 2025', organized by Rotaract Club of the University of Moratuwa in collaboration with the university's Career Guidance Unit is a much-awaited event in the university calendar which marks the official careers week of the university." />
              <meta property="og:image" content="https://rur.rotaract.social/Images/logo/RUR.png" />
              <meta property="og:url" content="https://rur.rotaract.social/" />
              <meta name="referrer" content="no-referrer" />

          </head>
          <body
            className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark-gradient bg-light-gradient antialiased`}
          >
          <GoogleTagManager gtmId="GTM-MWJNXDZR" />
            {children}
          </body>
        </html>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
