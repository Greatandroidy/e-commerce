"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Eye } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { type Product, useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QuickView } from "@/components/shop/quick-view"

// Define product information types with priority levels
interface ProductInfo {
  type: "outOfStock" | "new" | "discount" | "trending" | "bestseller" | "limited"
  label: string
  priority: number
  color?: string
}

const PRODUCT_INFO_CONFIG: Record<ProductInfo["type"], Omit<ProductInfo, "type">> = {
  outOfStock: { label: "Out of Stock", priority: 10, color: "bg-black/70 text-white border-none" },
  new: { label: "New", priority: 8, color: "bg-primary text-primary-foreground hover:bg-primary/90" },
  discount: { label: "", priority: 7, color: "bg-red-500 text-white hover:bg-red-600" }, // Label will be set dynamically
  trending: { label: "Trending", priority: 6, color: "bg-blue-500 text-white hover:bg-blue-600" },
  bestseller: { label: "Best Seller", priority: 5, color: "bg-amber-500 text-white hover:bg-amber-600" },
  limited: { label: "Limited Edition", priority: 4, color: "bg-purple-500 text-white hover:bg-purple-600" },
}

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { favorites, toggleFavorite, isProductInStock } = useStore()
  const [isHovered, setIsHovered] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const isFavorite = favorites.includes(product.id)
  const isInStock = isProductInStock(product.id)

  // Determine product information to display based on priority
  const getProductInfo = (): ProductInfo | null => {
    const infoItems: ProductInfo[] = []

    if (!isInStock) {
      infoItems.push({
        type: "outOfStock",
        ...PRODUCT_INFO_CONFIG.outOfStock,
      })
    }

    if (product.isNew) {
      infoItems.push({
        type: "new",
        ...PRODUCT_INFO_CONFIG.new,
      })
    }

    if (product.discount) {
      infoItems.push({
        type: "discount",
        label: `${product.discount}% OFF`,
        priority: PRODUCT_INFO_CONFIG.discount.priority,
        color: PRODUCT_INFO_CONFIG.discount.color,
      })
    }

    if (product.isTrending) {
      infoItems.push({
        type: "trending",
        ...PRODUCT_INFO_CONFIG.trending,
      })
    }

    if (product.isBestseller) {
      infoItems.push({
        type: "bestseller",
        ...PRODUCT_INFO_CONFIG.bestseller,
      })
    }

    if (product?.isLimited) {
      infoItems.push({
        type: "limited",
        ...PRODUCT_INFO_CONFIG.limited,
      })
    }

    // Sort by priority (highest first) and return the highest priority item
    return infoItems.sort((a, b) => b.priority - a.priority)[0] || null
  }

  const productInfo = getProductInfo()

  return (
    <>
      <motion.div
        className={cn("group relative overflow-hidden rounded-md", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -5 }}
      >
        <Link href={`/product/${product.id}`} className="block" scroll={false}>
          <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Top info bar with heart and product info - positioned at the top */}
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 z-10">
              {productInfo && (
                <Badge variant="outline" className={cn("text-xs font-normal", productInfo.color)}>
                  {productInfo.label}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleFavorite(product.id)
                }}
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground",
                  )}
                />
                <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
              </Button>
            </div>

            {/* Quick view overlay */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-end p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300",
                isHovered && "opacity-100",
              )}
            >
              <Button
                className="w-full bg-white text-black hover:bg-white/90 mb-2"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsQuickViewOpen(true)
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                Quick View
              </Button>
            </div>
          </div>
        </Link>

        <div className="mt-3 space-y-1 px-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium line-clamp-1 text-sm">{product.name}</h3>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{product.brand}</p>
            <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </motion.div>

      <QuickView product={product} open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen} />
    </>
  )
}
