"use client"

import type React from "react"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/shop/product-grid"
import { ProductCard } from "@/components/shop/product-card"
import type { Product } from "@/lib/store"

interface FeaturedProductsProps {
  heading: string
  subheading?: string
  layout: "grid" | "carousel" | "featured" | "compact"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  products: Product[]
  viewAllLink?: string
  viewAllLabel?: string
}

export const FeaturedProductsBlock: React.FC<FeaturedProductsProps> = ({
  heading,
  subheading,
  layout,
  style,
  products,
  viewAllLink = "/shop",
  viewAllLabel = "View All Products",
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

  // Render based on layout
  const renderProducts = () => {
    switch (layout) {
      case "carousel":
        return (
          <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide -mx-4 px-4">
            {products.map((product) => (
              <div key={product.id} className="flex-none w-64 md:w-72">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )

      case "featured":
        if (products.length === 0) return null

        const featuredProduct = products[0]
        const otherProducts = products.slice(1, 5)

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-1">
              <ProductCard product={featuredProduct} className="h-full" />
            </div>
            <div className="md:col-span-1">
              <div className="grid grid-cols-2 gap-4 h-full">
                {otherProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        )

      case "compact":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-2 text-sm font-medium truncate">{product.name}</h3>
                <p className="text-sm font-semibold">${product.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>
        )

      // Grid layout (default)
      default:
        return <ProductGrid products={products} />
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
          {renderProducts()}
        </motion.div>

        {viewAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link href={viewAllLink} className="flex items-center">
                {viewAllLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
