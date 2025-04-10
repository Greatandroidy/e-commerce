"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [open, setOpen] = useState(false)

  // Predefined color palette
  const colorPalette = [
    "#000000", // Black
    "#ffffff", // White
    "#f43f5e", // Rose
    "#ec4899", // Pink
    "#d946ef", // Fuchsia
    "#a855f7", // Purple
    "#8b5cf6", // Violet
    "#6366f1", // Indigo
    "#3b82f6", // Blue
    "#0ea5e9", // Sky
    "#06b6d4", // Cyan
    "#14b8a6", // Teal
    "#10b981", // Emerald
    "#22c55e", // Green
    "#84cc16", // Lime
    "#eab308", // Yellow
    "#f59e0b", // Amber
    "#f97316", // Orange
    "#ef4444", // Red
    "#6b7280", // Gray
  ]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: color }} />
            <span>{color}</span>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="grid grid-cols-5 gap-1 p-2">
          {colorPalette.map((paletteColor) => (
            <button
              key={paletteColor}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border",
                color === paletteColor && "ring-2 ring-slate-950",
              )}
              style={{ backgroundColor: paletteColor }}
              onClick={() => {
                onChange(paletteColor)
                setOpen(false)
              }}
            >
              {color === paletteColor && (
                <Check className={cn("h-4 w-4", paletteColor === "#ffffff" ? "text-black" : "text-white")} />
              )}
            </button>
          ))}
        </div>
        <div className="p-2 border-t">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md border" style={{ backgroundColor: color }} />
            <Input value={color} onChange={(e) => onChange(e.target.value)} className="h-8" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
