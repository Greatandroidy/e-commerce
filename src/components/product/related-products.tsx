"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

import { useStore } from "@/lib/store"
import { ProductCard } from "@/components/shop/product-card"
import { Button } from "@/components/ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"

interface RelatedProductsProps {
  productId: string
}

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const { products } = useStore()
  const [currentProduct, setCurrentProduct] = useState(products.find((p) => p.id === productId))
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(max-width: 1024px)")

  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 4

  useEffect(() => {
    setCurrentProduct(products.find((p) => p.id === productId))
  }, [productId, products])

  if (!currentProduct) return null

  // Filter products by same category and style, excluding current product
  const relatedProducts = products.filter(
    (p) =>
      p.id !== productId &&
      (p.category === currentProduct.category || p.style === currentProduct.style || p.anime === currentProduct.anime),
  )

  if (relatedProducts.length === 0) return null

  const totalPages = Math.ceil(relatedProducts.length / itemsPerPage)
  const displayedProducts = relatedProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayedProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevPage} className="h-8 w-8 rounded-full">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${index === currentPage ? "bg-primary" : "bg-muted-foreground/30"}`}
                onClick={() => setCurrentPage(index)}
              />
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={handleNextPage} className="h-8 w-8 rounded-full">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
        </div>
      )}
    </div>
  )
}
