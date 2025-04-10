"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { ProductGrid } from "@/components/shop/product-grid"
import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
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
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <FilterSidebar />
          </div>
          <div className="md:col-span-3">
            <Card className="mb-6 border shadow-sm">
              <CardContent className="p-4">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Find the section where you display the sort options and replace it with: */}
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Shop</h1>
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
              </CardContent>
            </Card>
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
