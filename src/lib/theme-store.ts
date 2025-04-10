"use client"

import { atom } from "jotai"
import { atomWithStorage } from "jotai/utils"

// Check if we should use Jotai
const useJotai = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_JOTAI === "true" : false

// Theme atoms
export const themeAtom = atomWithStorage<string>("theme", "system")
export const themeColorAtom = atomWithStorage<string>("themeColor", "purple")

// Derived atom for the full theme (color + mode)
export const fullThemeAtom = atom(
  (get) => {
    const theme = get(themeAtom)
    const color = get(themeColorAtom)

    if (theme === "system") return "system"
    if (theme === "light" || theme === "dark") return `${color}-${theme}`
    return theme
  },
  (get, set, newTheme: string) => {
    // Handle setting the theme
    if (newTheme === "system") {
      set(themeAtom, "system")
      return
    }

    if (newTheme === "light" || newTheme === "dark") {
      set(themeAtom, newTheme)
      return
    }

    // Handle combined themes like "purple-dark"
    const parts = newTheme.split("-")
    if (parts.length === 2) {
      const [color, mode] = parts
      set(themeColorAtom, color)
      set(themeAtom, mode)
    }
  },
)

// Export a flag indicating if we're using Jotai
export const isUsingJotai = useJotai
