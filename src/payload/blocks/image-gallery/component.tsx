"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImageGalleryProps {
  heading: string
  subheading?: string
  layout: "grid" | "masonry" | "carousel" | "lightbox"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
    gapSize: "none" | "small" | "medium" | "large"
  }
  images: Array<{
    image: {
      url: string
      alt: string
    }
    alt: string
    caption?: string
    link?: string
  }>
}

export const ImageGalleryBlock: React.FC<ImageGalleryProps> = ({ heading, subheading, layout, style, images }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

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

  // Gap size classes
  const gapClasses = {
    none: "gap-0",
    small: "gap-2",
    medium: "gap-4",
    large: "gap-8",
  }

  // Open lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Render based on layout
  const renderGallery = () => {
    switch (layout) {
      case "masonry":
        return (
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", gapClasses[style.gapSize])}>
            {images.map((item, index) => {
              const aspectRatio =
                index % 5 === 0
                  ? "aspect-square"
                  : index % 5 === 1
                    ? "aspect-[3/4]"
                    : index % 5 === 2
                      ? "aspect-[4/3]"
                      : index % 5 === 3
                        ? "aspect-[16/9]"
                        : "aspect-[1/1.5]"

              return (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-md cursor-pointer",
                    index % 5 === 0 ? "md:col-span-2 lg:col-span-1" : "",
                  )}
                  onClick={() => openLightbox(index)}
                >
                  <div className={aspectRatio}>
                    <Image
                      src={item.image.url || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    {item.caption && (
                      <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-4 text-white">{item.caption}</div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )

      case "carousel":
        return (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {images.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-md">
                      <Image src={item.image.url || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                          {item.caption}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {images.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <div className="flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        currentSlide === index ? "bg-primary" : "bg-muted-foreground/30",
                      )}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <span className="sr-only">Go to slide {index + 1}</span>
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            )}
          </div>
        )

      case "lightbox":
        return (
          <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4", gapClasses[style.gapSize])}>
            {images.map((item, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-md cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.image.url || "/placeholder.svg"}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-white"
                    >
                      <path d="M15 3h6v6" />
                      <path d="M10 14 21 3" />
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      // Grid layout (default)
      default:
        return (
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3", gapClasses[style.gapSize])}>
            {images.map((item, index) => (
              <div key={index} className="relative aspect-square overflow-hidden rounded-md">
                {item.link ? (
                  <Link href={item.link} className="block h-full w-full">
                    <Image
                      src={item.image.url || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">{item.caption}</div>
                    )}
                  </Link>
                ) : (
                  <div className="cursor-pointer" onClick={() => openLightbox(index)}>
                    <Image
                      src={item.image.url || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                    {item.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">{item.caption}</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <section
      className={cn(
        bgClasses[style.backgroundColor],
        paddingTopClasses[style.paddingTop],
        paddingBottomClasses[style.paddingBottom],
      )}
    >
      <div className="container px-4 md:px-6">
        <div className={cn("flex flex-col mb-10", textAlignClasses[style.textAlignment])}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight"
          >
            {heading}
          </motion.h2>
          {subheading && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-4 text-muted-foreground max-w-3xl mx-auto"
            >
              {subheading}
            </motion.p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {renderGallery()}
        </motion.div>

        {/* Lightbox */}
        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>

              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={images[lightboxIndex]?.image.url || "/placeholder.svg"}
                  alt={images[lightboxIndex]?.alt || ""}
                  fill
                  className="object-contain"
                />
              </div>

              {images[lightboxIndex]?.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                  {images[lightboxIndex].caption}
                </div>
              )}

              {images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                    onClick={() => setLightboxIndex((prev) => (prev - 1 + images.length) % images.length)}
                  >
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Previous</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70"
                    onClick={() => setLightboxIndex((prev) => (prev + 1) % images.length)}
                  >
                    <ChevronRight className="h-6 w-6" />
                    <span className="sr-only">Next</span>
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
