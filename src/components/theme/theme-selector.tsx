"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Check, Moon, Sun, Monitor } from "lucide-react"

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

export function ThemeSelector() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [activeTab, setActiveTab] = useState<string>("mode")
  const [selectedColor, setSelectedColor] = useState<string>("purple")

  // Update the selected color when the theme changes
  useEffect(() => {
    if (theme) {
      const colorName = theme.split('-')[0]
      if (themes.some((t) => t.name === colorName)) {
        setSelectedColor(colorName)
      }
    }
  }, [theme])

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    if (newTheme === "system") {
      setTheme("system")
      return
    }

    if (newTheme === "light" || newTheme === "dark") {
      // If selecting a mode (light/dark), combine with current color
      setTheme(`${selectedColor}-${newTheme}`)
      return
    }

    // If selecting a color, combine with current mode
    const currentMode = resolvedTheme === "dark" ? "dark" : "light"
    setTheme(`${newTheme}-${currentMode}`)
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
                onClick={() => handleThemeChange("light")}
              >
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <span>Light</span>
                </div>
                {(resolvedTheme === "light" || theme === "light") && <Check className="h-4 w-4" />}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleThemeChange("dark")}
              >
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  <span>Dark</span>
                </div>
                {(resolvedTheme === "dark" || theme === "dark") && <Check className="h-4 w-4" />}
              </DropdownMenuItem>

              <DropdownMenuItem
                className="flex cursor-pointer items-center justify-between"
                onClick={() => handleThemeChange("system")}
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
                    onClick={() => handleThemeChange(colorTheme.name)}
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
