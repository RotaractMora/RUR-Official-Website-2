"use client";

import { Lato } from "next/font/google";
import "./globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "@/context/auth-provider";
import { ITheme, IThemeContextType } from "@/interfaces/IThemeContext";
import { GoogleTagManager } from "@next/third-parties/google";
import Head from "next/head";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export const ThemeContext = React.createContext<IThemeContextType | null>(null);

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const DEFAULT_THEME = "light";
  const [theme, setThemeMode] = useState<ITheme>(DEFAULT_THEME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as ITheme;
    if (storedTheme) {
      setThemeMode(storedTheme);
    } else {
      localStorage.setItem("theme", DEFAULT_THEME);
      setThemeMode(DEFAULT_THEME);
    }
  }, []);

  useEffect(() => {
    document.documentElement.className = theme as ITheme;
  }, [theme]);

  const setTheme = useCallback(
    (newTheme: ITheme) => {
      if (theme !== newTheme) {
        localStorage.setItem("theme", newTheme);
        setThemeMode(newTheme);
        console.log("Theme set to", newTheme);
      }
    },
    [theme]
  );

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    console.log("Toggled theme to", newTheme);
  }, [theme, setTheme]);

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ setTheme, toggleTheme, theme }}>
        <HelmetProvider>
          <html lang="en">
            <head>
              <title>Are You Ready? 2026 | University of Moratuwa</title>
              <meta name="description" content="Are You Ready? 2026 - Flagship career fair organized by Rotaract Club of University of Moratuwa in partnership with the Career Guidance Unit. Connect with 100+ companies and advance your career." />
              <meta name="google-site-verification" content="ctC6c_Itp6D3M77kEOvPaN9D9i_O6Sq5vXpCX8EyMsY" />
            </head>
            <body
              className={`${lato.variable} font-sans dark:bg-dark-gradient bg-white antialiased`}
            >
              <GoogleTagManager gtmId="GTM-MWJNXDZR" />
              <Helmet>
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Are You Ready? 2026" />
                <meta property="og:title" content="Are You Ready? 2026" />
                <meta
                  property="og:description"
                  content="'Are You Ready? 2026', organized by Rotaract Club of University of Moratuwa in collaboration with the university's Career Guidance Unit is a much-awaited event in the university calendar which marks the official careers week of the university."
                />
                <meta property="og:url" content="https://areyouready.uom.lk/" />
                <meta
                  property="og:image"
                  content="https://areyouready.uom.lk/Images/logo/RUR.png"
                />

                <meta
                  name="author"
                  content="Rotaract Club of University of Moratuwa"
                />
                <link rel="author" href="https://rotaractmora.org" />

                <link
                  rel="icon"
                  href="https://areyouready.uom.lk/Images/logo/icon.ico"
                />
              </Helmet>
              {children}
              {mounted && <Toaster />}
            </body>
          </html>
        </HelmetProvider>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
