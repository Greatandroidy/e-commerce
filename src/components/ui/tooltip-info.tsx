"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface TooltipInfoProps {
  content: string
  size?: "sm" | "md" | "lg"
  className?: string
}

export function TooltipInfo({ content, size = "md", className = "" }: TooltipInfoProps) {
  const [open, setOpen] = useState(false)

  const iconSize = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <button
            type="button"
            className={`inline-flex items-center justify-center text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full ${className}`}
            aria-label="More information"
          >
            <Info className={iconSize[size]} />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3 text-sm">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
