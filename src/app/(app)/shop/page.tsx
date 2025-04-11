"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { ProductGrid } from "@/components/shop/product-grid"
import { useStore } from "@/lib/store"
import { Pagination } from "@/components/ui/pagination"
// Import the new SortDropdown component
import { SortDropdown } from "@/components/shop/sort-dropdown"

export default function ShopPage() {
  const { filteredProducts, currentPage, totalPages, setCurrentPage } = useStore()
  const [sortOption, setSortOption] = useState("featured")

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value)
  }

  // Apply sorting to products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "newest":
        // In a real app, you would sort by date
        return 0
      case "best-selling":
        // In a real app, you would sort by sales data
        return 0
      default:
        // Featured - default sorting
        return 0
    }
  })

  return (
    <>
      <Header />
      <main className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <FilterSidebar />
          </div>
          <div className="py-8 md:py-10 md:col-span-3">
            <div className="mb-6">
              <div className="p-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Find the section where you display the sort options and replace it with: */}
                  <div className="flex items-center justify-between mb-6">
                    <SortDropdown
                      options={[
                        { label: "Newest", value: "newest" },
                        { label: "Price: Low to High", value: "price_asc" },
                        { label: "Price: High to Low", value: "price_desc" },
                        { label: "Most Popular", value: "popular" },
                        { label: "Best Rating", value: "rating" },
                      ]}
                      defaultValue="newest"
                      onSortChange={(value) => console.log("Sort changed to:", value)}
                      resultsCount={120}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
            <ProductGrid products={sortedProducts} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
