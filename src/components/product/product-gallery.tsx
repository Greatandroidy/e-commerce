"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const selectImage = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <motion.div
      className="grid gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full w-full"
          >
            <Image
              src={images[currentImage] || "/placeholder.svg"}
              alt={`${productName} - Image ${currentImage + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={prevImage}>
            <ChevronLeft className="h-3 w-3" />
          </Button>
          <span>
            {currentImage + 1} of {images.length}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={nextImage}>
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
        <div className="absolute inset-0 flex items-center justify-between p-2">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={prevImage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous image</span>
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <motion.button
            key={index}
            className={cn(
              "relative aspect-square w-20 overflow-hidden rounded-md bg-muted",
              currentImage === index && "ring-2 ring-purple-600 ring-offset-2",
            )}
            onClick={() => selectImage(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
