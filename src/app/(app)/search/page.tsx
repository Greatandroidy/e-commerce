"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Filter, SlidersHorizontal } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useStore } from "@/lib/store"
import { ProductGrid } from "@/components/shop/product-grid"
import { FilterSidebar } from "@/components/shop/filter-sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Pagination } from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const { products, setCurrentPage, currentPage, totalPages, getPaginatedProducts } = useStore()
  const [searchResults, setSearchResults] = useState(products)
  const [searchQuery, setSearchQuery] = useState(query)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState(0)

  useEffect(() => {
    setSearchQuery(query)
  }, [query])

  useEffect(() => {
    if (query) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.style.toLowerCase().includes(query.toLowerCase()) ||
          product.anime?.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results)
    } else {
      setSearchResults([])
    }
  }, [query, products])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Update URL without full page reload
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url.toString())

      // Filter products
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.style.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.anime?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      setSearchResults(results)
    }
  }

  // Save search to recent searches
  useEffect(() => {
    if (query) {
      const storedSearches = localStorage.getItem("animefreak_recent_searches")
      let recentSearches: string[] = []

      if (storedSearches) {
        try {
          recentSearches = JSON.parse(storedSearches)
        } catch (error) {
          console.error("Failed to parse recent searches:", error)
        }
      }

      const updatedSearches = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)

      localStorage.setItem("animefreak_recent_searches", JSON.stringify(updatedSearches))
    }
  }, [query])

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative mb-6">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products, brands, anime..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-purple-600 hover:bg-purple-700"
              >
                Search
              </Button>
            </form>

            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Search Results</h1>
              <p className="text-muted-foreground">
                {searchResults.length} results for "{query}"
              </p>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-4 gap-8">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4 flex items-center justify-between">
              <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {activeFilters > 0 && <Badge className="ml-1 bg-purple-600">{activeFilters}</Badge>}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[350px] flex flex-col">
                  <FilterSidebar onFilterChange={(count) => setActiveFilters(count)} />
                </SheetContent>
              </Sheet>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select className="text-sm border rounded-md px-2 py-1">
                  <option value="relevance">Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </h2>
                  {activeFilters > 0 && (
                    <Button variant="link" className="text-sm h-auto p-0">
                      Clear all
                    </Button>
                  )}
                </div>
                <FilterSidebar onFilterChange={(count) => setActiveFilters(count)} />
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {/* Desktop Sort */}
              <div className="hidden lg:flex justify-end mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select className="text-sm border rounded-md px-2 py-1">
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              <ProductGrid products={getPaginatedProducts()} />

              {/* Pagination */}
              {searchResults.length > 0 && totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
