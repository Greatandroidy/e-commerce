"use client"

import type React from "react"
import { ArrowRight } from "lucide-react"

interface HeroBlockProps {
  heading: string
  subheading?: string
  primaryButtonText?: string
  primaryButtonLink?: string
  showSecondaryButton?: boolean
  secondaryButtonText?: string
  secondaryButtonLink?: string
  imageUrl?: string
  layout?: "standard" | "centered" | "split" | "minimal" | "media-only"
  imagePosition?: "right" | "left"
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  fullHeight?: boolean
  textAlignment?: "left" | "center" | "right"
  overlayMode?: boolean
  overlayColor?: string
  overlayPosition?: string
  overlayWidth?: string
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  heading = "Elevate Your Style with Our Latest Collection",
  subheading = "Discover premium fashion that combines comfort, style, and sustainability.",
  primaryButtonText = "Shop Now",
  primaryButtonLink = "#",
  showSecondaryButton = true,
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "#",
  imageUrl = "/placeholder.svg?height=600&width=800",
  layout = "standard",
  imagePosition = "right",
  backgroundColor = "#ffffff",
  textColor = "#000000",
  accentColor = "#3b82f6",
  fullHeight = false,
  textAlignment = "left",
  overlayMode = false,
  overlayColor = "rgba(0, 0, 0, 0.5)",
  overlayPosition = "center",
  overlayWidth = "md",
}) => {
  // Common styles
  const containerStyle = {
    backgroundColor,
    color: textColor,
  }

  const accentStyle = {
    color: accentColor,
  }

  const buttonStyle = {
    backgroundColor: accentColor,
    color: "#ffffff",
  }

  const heightClass = fullHeight ? "min-h-screen" : ""
  const paddingClass = "py-16"

  // Helper function to get text alignment classes
  const getTextAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const textAlignClass = getTextAlignmentClasses(textAlignment)

  // Helper function to get overlay position classes
  const getOverlayPositionClasses = (position: string) => {
    switch (position) {
      case "center":
        return "items-center justify-center"
      case "left":
        return "items-center justify-start"
      case "right":
        return "items-center justify-end"
      case "top":
        return "items-start justify-center"
      case "bottom":
        return "items-end justify-center"
      case "top-left":
        return "items-start justify-start"
      case "top-right":
        return "items-start justify-end"
      case "bottom-left":
        return "items-end justify-start"
      case "bottom-right":
        return "items-end justify-end"
      default:
        return "items-center justify-center"
    }
  }

  const overlayPositionClass = getOverlayPositionClasses(overlayPosition)

  // Helper function to get overlay width classes
  const getOverlayWidthClasses = (width: string) => {
    switch (width) {
      case "sm":
        return "max-w-sm"
      case "md":
        return "max-w-md"
      case "lg":
        return "max-w-lg"
      case "xl":
        return "max-w-xl"
      case "2xl":
        return "max-w-2xl"
      case "3xl":
        return "max-w-3xl"
      case "full":
        return "max-w-full"
      default:
        return "max-w-md"
    }
  }

  const overlayWidthClass = getOverlayWidthClasses(overlayWidth)

  // Media-only layout with overlay
  if (layout === "media-only") {
    return (
      <div className={`${heightClass} ${paddingClass}`} style={containerStyle}>
        <div className="container px-4 md:px-6">
          <div className="relative overflow-hidden rounded-lg">
            <img src={imageUrl || "/placeholder.svg"} alt="Hero" className="w-full" />
            <div className={`absolute inset-0 flex ${overlayPositionClass}`} style={{ backgroundColor: overlayColor }}>
              <div className={`${overlayWidthClass} p-6 md:p-12 ${textAlignClass}`}>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                  {heading}
                </h1>
                <p className="mt-4 text-lg text-white/90">{subheading}</p>
                <div
                  className={`mt-6 flex flex-col sm:flex-row gap-3 ${
                    textAlignment === "center"
                      ? "justify-center"
                      : textAlignment === "right"
                        ? "justify-end"
                        : "justify-start"
                  }`}
                >
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    style={buttonStyle}
                  >
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  {showSecondaryButton && (
                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-white border-white hover:bg-white/10">
                      {secondaryButtonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Render different layouts
  switch (layout) {
    case "centered":
      return (
        <div className={`${heightClass} ${paddingClass}`} style={containerStyle}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{heading}</h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  style={buttonStyle}
                >
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                {showSecondaryButton && (
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
              {!overlayMode && (
                <div className="w-full max-w-3xl aspect-video overflow-hidden rounded-xl">
                  <img src={imageUrl || "/placeholder.svg"} alt="Hero" className="object-cover w-full h-full" />
                </div>
              )}
            </div>
          </div>
        </div>
      )

    case "split":
      return (
        <div className={`${heightClass} ${paddingClass}`} style={containerStyle}>
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className={`space-y-4 ${imagePosition === "left" ? "md:order-2" : "md:order-1"}`}>
                <h1 className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${textAlignClass}`}>
                  {heading}
                </h1>
                <p
                  className={`text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${textAlignClass}`}
                >
                  {subheading}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-3 ${
                    textAlignment === "center"
                      ? "justify-center"
                      : textAlignment === "right"
                        ? "justify-end"
                        : "justify-start"
                  }`}
                >
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    style={buttonStyle}
                  >
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  {showSecondaryButton && (
                    <button
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      style={{ borderColor: accentColor, color: accentColor }}
                    >
                      {secondaryButtonText}
                    </button>
                  )}
                </div>
              </div>
              <div className={`${imagePosition === "left" ? "md:order-1" : "md:order-2"}`}>
                <div className="aspect-video overflow-hidden rounded-xl">
                  <img src={imageUrl || "/placeholder.svg"} alt="Hero" className="object-cover w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case "minimal":
      return (
        <div className={`${heightClass} ${paddingClass}`} style={containerStyle}>
          <div className="container px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{heading}</h1>
              <div className="flex justify-center">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  style={buttonStyle}
                >
                  {primaryButtonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )

    // Standard layout (default)
    default:
      return (
        <div className={`${heightClass} ${paddingClass}`} style={containerStyle}>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    {heading}
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">{subheading}</p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    style={buttonStyle}
                  >
                    {primaryButtonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  {showSecondaryButton && (
                    <button
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      style={{ borderColor: accentColor, color: accentColor }}
                    >
                      {secondaryButtonText}
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="aspect-video overflow-hidden rounded-xl w-full">
                  <img
                    alt="Hero"
                    className="aspect-video overflow-hidden rounded-xl object-cover"
                    src={imageUrl || "/placeholder.svg"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )
  }
}
