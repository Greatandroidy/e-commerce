"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { Provider as JotaiProvider } from "jotai"
import { isUsingJotai } from "@/lib/theme-store"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Update Sonner theme when system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      document.documentElement.setAttribute("data-sonner-theme", mediaQuery.matches ? "dark" : "light")
    }

    // Set initial value
    handleChange()

    // Listen for changes
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  // Wrap with Jotai provider if using Jotai
  if (isUsingJotai) {
    return (
      <JotaiProvider>
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      </JotaiProvider>
    )
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

// Create a context for theme color
type ThemeColorContextType = {
  themeColor: string
  setThemeColor: (color: string) => void
}

const ThemeColorContext = createContext<ThemeColorContextType>({
  themeColor: "purple",
  setThemeColor: () => null,
})

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState<string>("purple")

  useEffect(() => {
    // Load theme color from localStorage
    const savedThemeColor = localStorage.getItem("themeColor") || "purple"
    setThemeColor(savedThemeColor)

    // Apply theme color class to document
    document.documentElement.classList.forEach((className) => {
      if (className.endsWith("-light") || className.endsWith("-dark")) {
        document.documentElement.classList.remove(className)
      }
    })

    const isDark = document.documentElement.classList.contains("dark")
    document.documentElement.classList.add(`${savedThemeColor}-${isDark ? "dark" : "light"}`)
  }, [])

  const handleSetThemeColor = (color: string) => {
    setThemeColor(color)
    localStorage.setItem("themeColor", color)

    // Apply theme color class to document
    document.documentElement.classList.forEach((className) => {
      if (className.endsWith("-light") || className.endsWith("-dark")) {
        document.documentElement.classList.remove(className)
      }
    })

    const isDark = document.documentElement.classList.contains("dark")
    document.documentElement.classList.add(`${color}-${isDark ? "dark" : "light"}`)
  }

  return (
    <ThemeColorContext.Provider value={{ themeColor, setThemeColor: handleSetThemeColor }}>
      {children}
    </ThemeColorContext.Provider>
  )
}

export const useThemeColor = () => useContext(ThemeColorContext)
