"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"
type ColorTheme = "red" | "blue" | "green" | "purple" | "orange"
type Radius = "none" | "sm" | "md" | "lg"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
  radius: Radius
  setRadius: (radius: Radius) => void
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  colorTheme: "blue",
  setColorTheme: () => null,
  radius: "md",
  setRadius: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultColorTheme?: ColorTheme
  defaultRadius?: Radius
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  defaultColorTheme = "blue",
  defaultRadius = "md",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || defaultTheme)
  const [colorTheme, setColorTheme] = useState<ColorTheme>(
    () => (localStorage.getItem("color-theme") as ColorTheme) || defaultColorTheme,
  )
  const [radius, setRadius] = useState<Radius>(() => (localStorage.getItem("radius") as Radius) || defaultRadius)

  // Apply theme classes
  useEffect(() => {
    const root = window.document.documentElement

    // Remove all theme classes first
    root.classList.remove("light", "dark")
    root.classList.remove("theme-red", "theme-blue", "theme-green", "theme-purple", "theme-orange")
    root.classList.remove("radius-none", "radius-sm", "radius-md", "radius-lg")

    // Add new theme classes
    root.classList.add(theme)
    root.classList.add(`theme-${colorTheme}`)
    root.classList.add(`radius-${radius}`)
  }, [theme, colorTheme, radius])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem("theme", theme)
      setTheme(theme)
    },
    colorTheme,
    setColorTheme: (colorTheme: ColorTheme) => {
      localStorage.setItem("color-theme", colorTheme)
      setColorTheme(colorTheme)
    },
    radius,
    setRadius: (radius: Radius) => {
      localStorage.setItem("radius", radius)
      setRadius(radius)
    },
  }

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}

