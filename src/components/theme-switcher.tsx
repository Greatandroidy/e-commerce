"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Check, Moon, Sun, Monitor } from "lucide-react"
import { useAtom } from "jotai"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { isUsingJotai, themeAtom, themeColorAtom } from "@/lib/theme-store"

const themes = [
  {
    name: "zinc",
    label: "Zinc",
    activeColor: "#71717a",
  },
  {
    name: "slate",
    label: "Slate",
    activeColor: "#64748b",
  },
  {
    name: "stone",
    label: "Stone",
    activeColor: "#78716c",
  },
  {
    name: "gray",
    label: "Gray",
    activeColor: "#6b7280",
  },
  {
    name: "neutral",
    label: "Neutral",
    activeColor: "#737373",
  },
  {
    name: "red",
    label: "Red",
    activeColor: "#ef4444",
  },
  {
    name: "rose",
    label: "Rose",
    activeColor: "#f43f5e",
  },
  {
    name: "orange",
    label: "Orange",
    activeColor: "#f97316",
  },
  {
    name: "green",
    label: "Green",
    activeColor: "#22c55e",
  },
  {
    name: "blue",
    label: "Blue",
    activeColor: "#3b82f6",
  },
  {
    name: "yellow",
    label: "Yellow",
    activeColor: "#eab308",
  },
  {
    name: "violet",
    label: "Violet",
    activeColor: "#8b5cf6",
  },
  {
    name: "purple",
    label: "Purple",
    activeColor: "#a855f7",
  },
  {
    name: "pink",
    label: "Pink",
    activeColor: "#ec4899",
  },
  {
    name: "indigo",
    label: "Indigo",
    activeColor: "#6366f1",
  },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<string>("mode")
  const [selectedColor, setSelectedColor] = useState<string>("purple")

  // Jotai state
  const [jotaiTheme, setJotaiTheme] = useAtom(themeAtom)
  const [jotaiColor, setJotaiColor] = useAtom(themeColorAtom)

  // Extract color and mode from theme
  useEffect(() => {
    if (mounted) {
      let currentColor = "purple"
      let currentMode = resolvedTheme || "light"

      // Parse the current theme
      if (theme && theme !== "system") {
        const parts = theme.split("-")
        if (parts.length === 2) {
          // Theme is in format "color-mode"
          currentColor = parts[0]
          currentMode = parts[1]
        } else if (theme === "light" || theme === "dark") {
          // Theme is just mode
          currentMode = theme
        } else {
          // Theme is just color
          currentColor = theme
        }
      }

      setSelectedColor(currentColor)

      // Update jotai state if using jotai
      if (isUsingJotai) {
        setJotaiColor(currentColor)
        if (theme === "system") {
          setJotaiTheme("system")
        } else if (currentMode === "light" || currentMode === "dark") {
          setJotaiTheme(currentMode)
        }
      }
    }
  }, [theme, resolvedTheme, mounted, setJotaiColor, setJotaiTheme])

  // Handle theme change
  const handleThemeChange = (newValue: string, type: "mode" | "color") => {
    if (type === "mode") {
      // Changing mode (light/dark/system)
      if (newValue === "system") {
        if (isUsingJotai) {
          setJotaiTheme("system")
        }
        setTheme("system")
        return
      }

      // Set mode while preserving color
      if (isUsingJotai) {
        setJotaiTheme(newValue as "light" | "dark")
      }

      if (selectedColor && newValue !== "system") {
        setTheme(`${selectedColor}-${newValue}`)
      } else {
        setTheme(newValue)
      }
    } else {
      // Changing color while preserving mode
      setSelectedColor(newValue)

      if (isUsingJotai) {
        setJotaiColor(newValue)
      }

      const currentMode = resolvedTheme === "dark" ? "dark" : "light"
      if (theme !== "system") {
        setTheme(`${newValue}-${currentMode}`)
      } else {
        // If system theme, just store the color preference
        localStorage.setItem("themeColor", newValue)
      }
    }
  }

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          {resolvedTheme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span>Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="p-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mode">Mode</TabsTrigger>
              <TabsTrigger value="color">Color</TabsTrigger>
            </TabsList>

            <TabsContent value="mode" className="mt-2 space-y-1">
              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleThemeChange("light", "mode")}
              >
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </div>
                {resolvedTheme === "light" && theme !== "system" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleThemeChange("dark", "mode")}
              >
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </div>
                {resolvedTheme === "dark" && theme !== "system" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleThemeChange("system", "mode")}
              >
                <div className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  <span>System</span>
                </div>
                {theme === "system" && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            </TabsContent>

            <TabsContent value="color" className="mt-2">
              <div className="grid grid-cols-3 gap-2">
                {themes.map((colorTheme) => (
                  <button
                    key={colorTheme.name}
                    className={cn(
                      "flex h-8 w-full cursor-pointer items-center justify-center rounded-md text-xs font-medium",
                      "border border-transparent transition-all hover:border-primary",
                      selectedColor === colorTheme.name && "border-primary",
                    )}
                    style={{ backgroundColor: colorTheme.activeColor, color: "#fff" }}
                    onClick={() => handleThemeChange(colorTheme.name, "color")}
                  >
                    {colorTheme.label}
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
