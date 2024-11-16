'use client';

import localFont from "next/font/local";
import "./globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { AuthProvider } from "@/context/auth-provider";
import {ITheme, IThemeContextType} from "@/interfaces/IThemeContext";

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
          <body
            className={`${geistSans.variable} ${geistMono.variable} dark:bg-dark-gradient bg-light-gradient antialiased`}
          >
            {children}
          </body>
        </html>
      </ThemeContext.Provider>
    </AuthProvider>
  );
}
