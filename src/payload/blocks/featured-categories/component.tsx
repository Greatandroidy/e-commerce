"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedCategoriesProps {
  heading: string
  subheading?: string
  layout: "grid" | "carousel" | "masonry" | "list"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  categories: Array<{
    title: string
    image: {
      url: string
      alt: string
    }
    link: string
  }>
}

export const FeaturedCategoriesBlock: React.FC<FeaturedCategoriesProps> = ({
  heading,
  subheading,
  layout,
  style,
  categories,
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

  // Layout specific rendering
  const renderCategories = () => {
    switch (layout) {
      case "grid":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.link}>
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image.url || "/placeholder.svg"}
                      alt={category.image.alt}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium">{category.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )

      case "carousel":
        return (
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide -mx-4 px-4">
            {categories.map((category, index) => (
              <Link key={index} href={category.link} className="flex-none w-64">
                <Card className="overflow-hidden transition-all hover:shadow-md h-full">
                  <div className="aspect-square relative">
                    <Image
                      src={category.image.url || "/placeholder.svg"}
                      alt={category.image.alt}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium">{category.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )

      case "masonry":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link key={index} href={category.link}>
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <div
                    className={`aspect-[${index % 3 === 0 ? "1/1.5" : index % 3 === 1 ? "1/1" : "1/1.2"}`}
                    style={{ aspectRatio: index % 3 === 0 ? "1/1.5" : index % 3 === 1 ? "1/1" : "1/1.2" }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={category.image.url || "/placeholder.svg"}
                        alt={category.image.alt}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                        <h3 className="font-medium text-white text-lg">{category.title}</h3>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )

      case "list":
        return (
          <div className="space-y-4">
            {categories.map((category, index) => (
              <Link key={index} href={category.link}>
                <Card className="overflow-hidden transition-all hover:shadow-md">
                  <div className="flex items-center">
                    <div className="w-24 h-24 relative flex-shrink-0">
                      <Image
                        src={category.image.url || "/placeholder.svg"}
                        alt={category.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4 flex justify-between items-center flex-1">
                      <h3 className="font-medium">{category.title}</h3>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )

      default:
        return null
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
        <div className={cn("flex flex-col items-center justify-center mb-10", textAlignClasses[style.textAlignment])}>
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
              className="mt-4 text-muted-foreground max-w-3xl"
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
          {renderCategories()}
        </motion.div>
      </div>
    </section>
  )
}
