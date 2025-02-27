"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ColorTheme =
  | "red"
  | "blue"
  | "green"
  | "purple"
  | "orange"
  | "cyan"
  | "teal"
  | "pink"
  | "slate";
type Radius = "none" | "sm" | "md" | "lg";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  radius: Radius;
  setRadius: (radius: Radius) => void;
};

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  colorTheme: "blue",
  setColorTheme: () => null,
  radius: "md",
  setRadius: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultColorTheme?: ColorTheme;
  defaultRadius?: Radius;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColorTheme = "blue",
  defaultRadius = "md",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultColorTheme);
  const [radius, setRadius] = useState<Radius>(defaultRadius);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme;
      const storedColorTheme = localStorage.getItem(
        "color-theme"
      ) as ColorTheme;
      const storedRadius = localStorage.getItem("radius") as Radius;

      if (storedTheme) setTheme(storedTheme);
      if (storedColorTheme) setColorTheme(storedColorTheme);
      if (storedRadius) setRadius(storedRadius);
    }
  }, []);

  // Apply theme classes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes first
    root.classList.remove("light", "dark");
    root.classList.remove(
      "theme-red",
      "theme-blue",
      "theme-green",
      "theme-purple",
      "theme-orange"
    );
    root.classList.remove("radius-none", "radius-sm", "radius-md", "radius-lg");

    // Add new theme classes
    root.classList.add(theme);
    root.classList.add(`theme-${colorTheme}`);
    root.classList.add(`radius-${radius}`);
  }, [theme, colorTheme, radius]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("theme", theme);
      }
      setTheme(theme);
    },
    colorTheme,
    setColorTheme: (colorTheme: ColorTheme) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("color-theme", colorTheme);
      }
      setColorTheme(colorTheme);
    },
    radius,
    setRadius: (radius: Radius) => {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("radius", radius);
      }
      setRadius(radius);
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
