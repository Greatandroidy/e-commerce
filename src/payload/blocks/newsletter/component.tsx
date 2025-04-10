"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

interface NewsletterProps {
  heading: string
  subheading?: string
  layout: "standard" | "split" | "compact" | "centered"
  style: {
    backgroundColor: "primary" | "secondary" | "dark" | "light" | "custom"
    customBackgroundColor?: string
    textColor: "light" | "dark"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  buttonText: string
  placeholderText: string
  image?: {
    url: string
    alt: string
  }
}

export const NewsletterBlock: React.FC<NewsletterProps> = ({
  heading,
  subheading,
  layout,
  style,
  buttonText,
  placeholderText,
  image,
}) => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      })
    }, 1000)
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
  const renderNewsletter = () => {
    switch (layout) {
      case "split":
        return (
          <div className="flex flex-col md:flex-row items-center">
            {image && (
              <div className="w-full md:w-1/2 mb-8 md:mb-0">
                <div className="relative h-64 md:h-full w-full overflow-hidden rounded-lg">
                  <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                </div>
              </div>
            )}
            <div className={cn("w-full", image ? "md:w-1/2 md:pl-8" : "")}>
              <h2 className={cn("text-3xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
              {subheading && (
                <p className={cn("mt-4", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                  {subheading}
                </p>
              )}
              <form className="mt-6 flex gap-2" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder={placeholderText}
                  className={cn(
                    "flex-1 border-white/20 bg-white/10 focus:ring-2 focus:ring-white/50",
                    style.textColor === "light"
                      ? "text-white placeholder:text-white/50"
                      : "text-gray-900 placeholder:text-gray-500",
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className={style.textColor === "light" ? "bg-white text-primary hover:bg-white/90" : ""}
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : buttonText}
                </Button>
              </form>
            </div>
          </div>
        )

      case "compact":
        return (
          <div className="max-w-md mx-auto">
            <h2 className={cn("text-2xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
            {subheading && (
              <p className={cn("mt-2 text-sm", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                {subheading}
              </p>
            )}
            <form className="mt-4 flex gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder={placeholderText}
                className={cn(
                  "flex-1 border-white/20 bg-white/10 focus:ring-2 focus:ring-white/50",
                  style.textColor === "light"
                    ? "text-white placeholder:text-white/50"
                    : "text-gray-900 placeholder:text-gray-500",
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className={style.textColor === "light" ? "bg-white text-primary hover:bg-white/90" : ""}
                disabled={isLoading}
              >
                {isLoading ? "..." : buttonText}
              </Button>
            </form>
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
            <form className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder={placeholderText}
                className={cn(
                  "flex-1 border-white/20 bg-white/10 focus:ring-2 focus:ring-white/50",
                  style.textColor === "light"
                    ? "text-white placeholder:text-white/50"
                    : "text-gray-900 placeholder:text-gray-500",
                )}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                type="submit"
                className={cn(
                  "sm:flex-shrink-0",
                  style.textColor === "light" ? "bg-white text-primary hover:bg-white/90" : "",
                )}
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : buttonText}
              </Button>
            </form>
          </div>
        )

      // Standard layout (default)
      default:
        return (
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className={cn("text-3xl font-bold tracking-tight", textColorClasses[style.textColor])}>{heading}</h2>
              {subheading && (
                <p className={cn("mt-4", style.textColor === "light" ? "text-white/80" : "text-gray-600")}>
                  {subheading}
                </p>
              )}
            </div>
            <div className="w-full max-w-md">
              <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input
                  type="email"
                  placeholder={placeholderText}
                  className={cn(
                    "flex-1 border-white/20 bg-white/10 focus:ring-2 focus:ring-white/50",
                    style.textColor === "light"
                      ? "text-white placeholder:text-white/50"
                      : "text-gray-900 placeholder:text-gray-500",
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  className={style.textColor === "light" ? "bg-white text-primary hover:bg-white/90" : ""}
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : buttonText}
                </Button>
              </form>
            </div>
          </div>
        )
    }
  }

  return (
    <section
      className={cn(getBgColor(), paddingTopClasses[style.paddingTop], paddingBottomClasses[style.paddingBottom])}
      style={
        style.backgroundColor === "custom" && style.customBackgroundColor
          ? { backgroundColor: style.customBackgroundColor }
          : {}
      }
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {renderNewsletter()}
        </motion.div>
      </div>
    </section>
  )
}
