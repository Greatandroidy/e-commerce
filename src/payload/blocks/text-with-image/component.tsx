"use client"

import Link from "next/link"
import Image from "next/image"
import type React from "react"
import { Button } from "@/components/ui/button"

interface TextWithImageProps {
  heading: string
  content: any // Rich text content
  layout: "image-left" | "image-right" | "image-top" | "image-bottom"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  image: {
    url: string
  }
  imageAlt: string
  button?: {
    text?: string
    link?: string
    variant: "default" | "outline" | "secondary"
  }
}

export const TextWithImageBlock: React.FC<TextWithImageProps> = ({
  heading,
  content,
  layout,
  style,
  image,
  imageAlt,
  button,
}) => {
  // Background color classes
  const bgClasses = {
    none: "bg-transparent",
    light: "bg-muted/30",
    dark: "bg-gray-900 text-white",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary",
  }

  // Text alignment classes
  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
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

  // Render rich text content
  const renderContent = () => {
    if (typeof content === "string") {
      return <p className="text-muted-foreground">{content}</p>
    }

    // For now, just return a placeholder
    return <p className="text-muted-foreground">Content placeholder</p>
  }

  // Layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case "image-left":
        return "flex flex-col md:flex-row gap-8 items-center"
      case "image-right":
        return "flex flex-col md:flex-row-reverse gap-8 items-center"
      case "image-top":
        return "flex flex-col gap-8 items-center"
      case "image-bottom":
        return "flex flex-col-reverse gap-8 items-center"
      default:
        return "flex flex-col md:flex-row gap-8 items-center"
    }
  }

  return (
    <section
      className={`
        ${bgClasses[style.backgroundColor]} 
        ${paddingTopClasses[style.paddingTop]} 
        ${paddingBottomClasses[style.paddingBottom]}
      `}
    >
      <div className="container mx-auto px-4">
        <div className={getLayoutClasses()}>
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image src={image.url || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
            </div>
          </div>

          {/* Text Content */}
          <div className={`w-full md:w-1/2 ${textAlignClasses[style.textAlignment]}`}>
            <h2 className="text-3xl font-bold mb-4">{heading}</h2>
            <div className="mb-6">{renderContent()}</div>
            {button?.text && button.link && (
              <Button variant={button.variant} asChild>
                <Link href={button.link}>{button.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
