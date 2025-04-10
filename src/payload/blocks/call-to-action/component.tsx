"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CallToActionProps {
  heading: string
  subheading?: string
  layout: "standard" | "with-image" | "centered" | "minimal"
  style: {
    backgroundColor: "primary" | "secondary" | "dark" | "light" | "custom"
    customBackgroundColor?: string
    textColor: "light" | "dark"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
    rounded: boolean
  }
  primaryButton: {
    label: string
    link: string
    variant: "default" | "outline" | "secondary"
  }
  secondaryButton?: {
    label?: string
    link?: string
    variant: "default" | "outline" | "secondary"
  }
  image?: {
    url: string
    alt: string
  }
}

export const CallToActionBlock: React.FC<CallToActionProps> = ({
  heading,
  subheading,
  layout,
  style,
  primaryButton,
  secondaryButton,
  image,
}) => {
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
  const paddingTopClasses = {
    none: "pt-0",
    small: "pt-8",
    medium: "pt-16",
    large: "pt-24",
  }

  const paddingBottomClasses = {
    none: "pb-0",
    small: "pb-8",
    medium: "pb-16",
    large: "pb-24",
  }

  // Render based on layout
  const renderCTA = () => {
    switch (layout) {
      case "with-image":
        return (
          <div className="flex flex-col md:flex-row items-center gap-8">
            {image && (
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <div className="relative h-64 md:h-full w-full overflow-hidden rounded-lg">
                  <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            )}
            <div className={cn("w-full", image ? "md:w-1/2" : "")}>
              <h2 className={cn("text-3xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
              {subheading && (
                <p className={cn("mt-4", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                  {subheading}
                </p>
              )}
              <div className="mt-6 flex flex-wrap gap-4">
                <Button asChild variant={primaryButton.variant}>
                  <Link href={primaryButton.link}>{primaryButton.label}</Link>
                </Button>
                {secondaryButton?.label && secondaryButton.link && (
                  <Button asChild variant={secondaryButton.variant}>
                    <Link href={secondaryButton.link}>{secondaryButton.label}</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )

      case "centered":
        return (
          <div className="max-w-2xl mx-auto text-center">
            <h2 className={cn("text-3xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
            {subheading && (
              <p
                className={cn("mt-4 mx-auto max-w-md", style.textColor === "light" ? "text-white/80" : "text-gray-600")}
              >
                {subheading}
              </p>
            )}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button asChild variant={primaryButton.variant}>
                <Link href={primaryButton.link}>{primaryButton.label}</Link>
              </Button>
              {secondaryButton?.label && secondaryButton.link && (
                <Button asChild variant={secondaryButton.variant}>
                  <Link href={secondaryButton.link}>{secondaryButton.label}</Link>
                </Button>
              )}
            </div>
          </div>
        )

      case "minimal":
        return (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className={cn("text-2xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
              {subheading && (
                <p className={cn("mt-2 text-sm", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                  {subheading}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant={primaryButton.variant}>
                <Link href={primaryButton.link}>{primaryButton.label}</Link>
              </Button>
              {secondaryButton?.label && secondaryButton.link && (
                <Button asChild variant={secondaryButton.variant}>
                  <Link href={secondaryButton.link}>{secondaryButton.label}</Link>
                </Button>
              )}
            </div>
          </div>
        )

      // Standard layout (default)
      default:
        return (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className={cn("text-3xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
              {subheading && (
                <p className={cn("mt-4", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                  {subheading}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant={primaryButton.variant}>
                <Link href={primaryButton.link}>{primaryButton.label}</Link>
              </Button>
              {secondaryButton?.label && secondaryButton.link && (
                <Button asChild variant={secondaryButton.variant}>
                  <Link href={secondaryButton.link}>{secondaryButton.label}</Link>
                </Button>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <section
      className={cn(
        getBgColor(),
        paddingTopClasses[style.paddingTop],
        paddingBottomClasses[style.paddingBottom],
        style.rounded && "rounded-lg mx-4 md:mx-6",
      )}
      style={
        style.backgroundColor === "custom" && style.customBackgroundColor
          ? { backgroundColor: style.customBackgroundColor }
          : {}
      }
    >
      <div className={cn("container px-4 md:px-6", style.rounded && "px-4 md:px-6")}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {renderCTA()}
        </motion.div>
      </div>
    </section>
  )
}
