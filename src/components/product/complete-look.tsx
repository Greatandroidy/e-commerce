"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// Types for the complete look feature
interface LookItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  hotspotX: number
  hotspotY: number
  productSlug: string
}

interface Look {
  id: string
  image: string
  title: string
  items: LookItem[]
}

// Sample data for the complete look feature
const completeLooks: Look[] = [
  {
    id: "look-1",
    image: "/placeholder.svg?height=500&width=350",
    title: "Casual Streetwear",
    items: [
      {
        id: "item-1",
        name: "Rust Oversized Hoodie",
        price: 59.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 25,
        hotspotY: 30,
        productSlug: "rust-hoodie-001",
      },
      {
        id: "item-2",
        name: "Relaxed Fit Cargo Pants",
        price: 79.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 25,
        hotspotY: 70,
        productSlug: "cargo-pants-002",
      },
    ],
  },
  {
    id: "look-2",
    image: "/placeholder.svg?height=500&width=350",
    title: "Urban Camo Style",
    items: [
      {
        id: "item-3",
        name: "Camo Print Bomber Jacket",
        price: 89.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 45,
        hotspotY: 30,
        productSlug: "camo-jacket-003",
      },
      {
        id: "item-4",
        name: "Wide-leg Trousers",
        price: 69.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 60,
        hotspotY: 70,
        productSlug: "wide-trousers-004",
      },
      {
        id: "item-5",
        name: "Minimalist Sneakers",
        price: 119.99,
        originalPrice: 149.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 60,
        hotspotY: 90,
        productSlug: "sneakers-005",
      },
    ],
  },
  {
    id: "look-3",
    image: "/placeholder.svg?height=500&width=350",
    title: "Graphic Statement",
    items: [
      {
        id: "item-6",
        name: "Soft Visor Cap",
        price: 29.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 75,
        hotspotY: 15,
        productSlug: "visor-cap-006",
      },
      {
        id: "item-7",
        name: "Everyday Solid Black T-Shirt",
        price: 39.99,
        originalPrice: 59.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 75,
        hotspotY: 40,
        productSlug: "black-tshirt-007",
      },
      {
        id: "item-8",
        name: "Regular-fit Pleated Trousers",
        price: 99.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 75,
        hotspotY: 70,
        productSlug: "pleated-trousers-008",
      },
      {
        id: "item-9",
        name: "Made in USA 990v6",
        price: 189.99,
        image: "/placeholder.svg?height=80&width=80",
        hotspotX: 75,
        hotspotY: 90,
        productSlug: "sneakers-990v6-009",
      },
    ],
  },
]

export function CompleteLook() {
  const [currentLookIndex, setCurrentLookIndex] = useState(0)
  const [selectedLook, setSelectedLook] = useState<Look | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null)
  const tooltipRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const currentLook = completeLooks[currentLookIndex]

  const handlePrevLook = () => {
    setCurrentLookIndex((prev) => (prev === 0 ? completeLooks.length - 1 : prev - 1))
  }

  const handleNextLook = () => {
    setCurrentLookIndex((prev) => (prev === completeLooks.length - 1 ? 0 : prev + 1))
  }

  const handleHotspotClick = (look: Look) => {
    setSelectedLook(look)
    setIsDialogOpen(true)
  }

  // Handle mouse enter for hotspot
  const handleHotspotMouseEnter = (itemId: string) => {
    setHoveredItemId(itemId)
  }

  // Handle mouse leave for hotspot and tooltip
  const handleMouseLeave = (e: React.MouseEvent, itemId: string) => {
    // Check if we're moving from hotspot to tooltip or vice versa
    const tooltipElement = tooltipRefs.current[itemId]
    const relatedTarget = e.relatedTarget as Node

    // Don't hide if moving to/from the tooltip and hotspot
    if (tooltipElement && (tooltipElement.contains(relatedTarget) || tooltipElement === relatedTarget)) {
      return
    }

    setHoveredItemId(null)
  }

  return (
    <div className="mt-16">
      <h3 className="text-xl font-medium mb-6 flex items-center">
        <span className="border-l-4 border-primary pl-3">Complete the Look</span>
      </h3>

      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {completeLooks.map((look, index) => (
            <div
              key={look.id}
              className={`relative rounded-lg overflow-hidden bg-muted/20 ${
                index === currentLookIndex ? "block" : "hidden md:block"
              }`}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={look.image || "/placeholder.svg"}
                  alt={look.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {look.items.map((item) => (
                  <div
                    key={item.id}
                    className="absolute z-10"
                    style={{ left: `${item.hotspotX}%`, top: `${item.hotspotY}%` }}
                  >
                    <motion.div
                      className="relative"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Animated ripple effect */}
                      <motion.div
                        className="absolute -inset-4 rounded-full bg-white/30"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.7, 0.2, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />

                      {/* Hotspot dot */}
                      <motion.button
                        className="relative w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer z-10"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleHotspotClick(look)
                        }}
                        onMouseEnter={() => handleHotspotMouseEnter(item.id)}
                        onMouseLeave={(e) => handleMouseLeave(e, item.id)}
                      >
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                      </motion.button>

                      {/* Tooltip on hover - only show for the hovered item */}
                      <AnimatePresence>
                        {hoveredItemId === item.id && (
                          <motion.div
                            ref={(el) => (tooltipRefs.current[item.id] = el)}
                            className="absolute left-8 top-0 bg-white shadow-lg rounded-md p-3 w-48 z-20"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            onMouseEnter={() => handleHotspotMouseEnter(item.id)}
                            onMouseLeave={(e) => handleMouseLeave(e, item.id)}
                          >
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-sm font-bold mt-1">${item.price.toFixed(2)}</div>
                            <div className="flex gap-2 mt-2">
                              <Link href={`/product/${item.productSlug}`} scroll={false}>
                                <Button size="sm" variant="outline" className="text-xs h-8 px-2">
                                  View Product
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="default"
                                className="text-xs h-8 px-2"
                                onClick={() => handleHotspotClick(look)}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Quick View
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center">
                <h4 className="font-medium">{look.title}</h4>
                <p className="text-sm text-muted-foreground">{look.items.length} items</p>
                <Button
                  variant="link"
                  className="mt-1 text-primary p-0 h-auto"
                  onClick={() => handleHotspotClick(look)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Look counter and navigation */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handlePrevLook}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous look</span>
          </Button>
          <span className="text-xs font-medium">
            {currentLookIndex + 1} of {completeLooks.length}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6 p-0" onClick={handleNextLook}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next look</span>
          </Button>
        </div>

        {/* Mobile navigation controls */}
        <div className="md:hidden flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handlePrevLook}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous look</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleNextLook}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next look</span>
          </Button>
        </div>

        {/* Look indicator for mobile */}
        <div className="md:hidden flex justify-center mt-2 gap-1">
          {completeLooks.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentLookIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
              onClick={() => setCurrentLookIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Look detail dialog - improved for mobile */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden max-h-[90vh] md:max-h-[80vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            {/* Left side - Image */}
            <div className="relative aspect-[3/4] md:aspect-auto">
              <Image
                src={selectedLook?.image || "/placeholder.svg"}
                alt={selectedLook?.title || "Look detail"}
                fill
                className="object-cover"
              />
              <DialogClose className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            {/* Right side - Products */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[50vh] md:max-h-[80vh]">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-xl">Shop this look</DialogTitle>
                <DialogDescription>{selectedLook?.title}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 divide-y">
                {selectedLook?.items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm md:text-base">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {item.originalPrice ? (
                            <>
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                              <span className="text-xs md:text-sm text-muted-foreground line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                              <Badge className="bg-red-500 text-xs">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </Badge>
                            </>
                          ) : (
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Link href={`/product/${item.productSlug}`} scroll={false}>
                            <Button size="sm" className="h-8 text-xs md:text-sm">
                              Shop
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Look navigation */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs md:text-sm px-2 md:px-3"
                  onClick={() => {
                    const newIndex = currentLookIndex === 0 ? completeLooks.length - 1 : currentLookIndex - 1
                    setCurrentLookIndex(newIndex)
                    setSelectedLook(completeLooks[newIndex])
                  }}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-xs md:text-sm text-muted-foreground">
                  Look {currentLookIndex + 1} out of {completeLooks.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs md:text-sm px-2 md:px-3"
                  onClick={() => {
                    const newIndex = currentLookIndex === completeLooks.length - 1 ? 0 : currentLookIndex + 1
                    setCurrentLookIndex(newIndex)
                    setSelectedLook(completeLooks[newIndex])
                  }}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
