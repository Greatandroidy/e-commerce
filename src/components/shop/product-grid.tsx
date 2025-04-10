"use client"

import { motion } from "framer-motion"
import type { Product } from "@/lib/store"
import { ProductCard } from "@/components/shop/product-card"

interface ProductGridProps {
  products: Product[]
  title?: string
}

export function ProductGrid({ products, title }: ProductGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-2xl font-bold">{title}</h2>}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-6">
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
              className="h-8 w-8 text-muted-foreground"
            >
              <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" x2="12" y1="9" y2="13" />
              <line x1="12" x2="12.01" y1="17" y2="17" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-semibold">No products found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}
    </div>
  )
}
