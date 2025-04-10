"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BannerProps {
  heading: string
  subheading?: string
  layout: "full-width" | "contained" | "sticky" | "floating"
  style: {
    backgroundColor: "primary" | "secondary" | "dark" | "light" | "custom"
    customBackgroundColor?: string
    textColor: "light" | "dark"
    paddingY: "none" | "small" | "medium" | "large"
    rounded: boolean
  }
  button?: {
    label?: string
    link?: string
    variant: "default" | "outline" | "secondary"
  }
  dismissible: boolean
  cookieId?: string
}

export const BannerBlock: React.FC<BannerProps> = ({
  heading,
  subheading,
  layout,
  style,
  button,
  dismissible,
  cookieId,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  // Check if banner was previously dismissed
  useEffect(() => {
    if (dismissible && cookieId) {
      const dismissed = localStorage.getItem(`banner_dismissed_${cookieId}`)
      if (dismissed) {
        setIsVisible(false)
      }
    }
  }, [dismissible, cookieId])

  const handleDismiss = () => {
    setIsVisible(false)
    if (dismissible && cookieId) {
      localStorage.setItem(`banner_dismissed_${cookieId}`, "true")
    }
  }

  // If banner is not visible, don't render anything
  if (!isVisible) {
    return null
  }

  // Background color classes
  const getBgColor = () => {
    if (style.backgroundColor === "custom" && style.customBackgroundColor) {
      return { backgroundColor: style.customBackgroundColor }
    }

    const bgClasses = {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      dark: "bg-gray-900 text-white",
      light: "bg-muted/30 text-foreground",
    }

    return bgClasses[style.backgroundColor] || bgClasses.primary
  }

  // Text color classes
  const textColorClasses = {
    light: "text-white",
    dark: "text-gray-900",
  }

  // Padding classes
  const paddingYClasses = {
    none: "py-0",
    small: "py-2",
    medium: "py-4",
    large: "py-6",
  }

  // Layout specific classes
  const getLayoutClasses = () => {
    switch (layout) {
      case "sticky":
        return "sticky top-0 z-50"
      case "floating":
        return "fixed bottom-4 left-4 right-4 z-50 max-w-lg mx-auto"
      default:
        return ""
    }
  }

  return (
    <div
      className={cn(getBgColor(), paddingYClasses[style.paddingY], getLayoutClasses(), style.rounded && "rounded-lg")}
      style={
        style.backgroundColor === "custom" && style.customBackgroundColor
          ? { backgroundColor: style.customBackgroundColor }
          : {}
      }
    >
      <div className={cn(layout === "contained" ? "container px-4 md:px-6" : "px-4 md:px-6")}>
        <motion.div
          initial={{ opacity: 0, y: layout === "floating" ? 20 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex-1">
            <h3 className={cn("text-sm font-medium", textColorClasses[style.textColor])}>{heading}</h3>
            {subheading && (
              <p className={cn("text-xs", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                {subheading}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            {button?.label && button.link && (
              <Button asChild variant={button.variant} size="sm">
                <Link href={button.link}>{button.label}</Link>
              </Button>
            )}
            {dismissible && (
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleDismiss} aria-label="Dismiss">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
