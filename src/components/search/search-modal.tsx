"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, ArrowRight, History, Loader2 } from "lucide-react"

import { useStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter()
  const { products } = useStore()
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage
  useEffect(() => {
    const storedSearches = localStorage.getItem("animefreak_recent_searches")
    if (storedSearches) {
      try {
        setRecentSearches(JSON.parse(storedSearches))
      } catch (error) {
        console.error("Failed to parse recent searches:", error)
        localStorage.removeItem("animefreak_recent_searches")
      }
    }
  }, [])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle search suggestions
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      return
    }

    const lowerQuery = query.toLowerCase()

    // Simulate loading state
    setIsLoading(true)

    // Debounce search
    const timer = setTimeout(() => {
      // Get unique suggestions from products
      const productSuggestions = Array.from(
        new Set(
          products
            .filter(
              (product) =>
                product.name.toLowerCase().includes(lowerQuery) ||
                product.brand.toLowerCase().includes(lowerQuery) ||
                (product.anime && product.anime.toLowerCase().includes(lowerQuery)),
            )
            .map((product) => product.name)
            .slice(0, 5),
        ),
      )

      setSuggestions(productSuggestions)
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, products])

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    // Save to recent searches
    const updatedSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)

    setRecentSearches(updatedSearches)
    localStorage.setItem("animefreak_recent_searches", JSON.stringify(updatedSearches))

    // Navigate to search page
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-[50%] top-24 z-50 w-full max-w-2xl translate-x-[-50%] rounded-lg border bg-background shadow-lg"
          >
            <div className="flex items-center border-b p-4">
              <Search className="mr-2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search for products, brands, anime..."
                className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              {query && (
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setQuery("")}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => handleSearch()}>
                Search
              </Button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {/* Loading state */}
              {isLoading && query.trim().length > 0 && (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              )}

              {/* Suggestions */}
              {!isLoading && suggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium">Suggestions</h3>
                  <ul className="space-y-1">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleSearch(suggestion)}
                        >
                          <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="flex-1 truncate">{suggestion}</span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recent searches */}
              {recentSearches.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium">Recent Searches</h3>
                  <ul className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <li key={index}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-left"
                          onClick={() => handleSearch(search)}
                        >
                          <History className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="flex-1 truncate">{search}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              const updated = recentSearches.filter((_, i) => i !== index)
                              setRecentSearches(updated)
                              localStorage.setItem("animefreak_recent_searches", JSON.stringify(updated))
                            }}
                          >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No results */}
              {!isLoading && query.trim().length > 1 && suggestions.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No results found for "{query}"</p>
                  <Button variant="link" className="mt-2 text-purple-600" onClick={() => handleSearch()}>
                    Search anyway
                  </Button>
                </div>
              )}

              {/* Empty state */}
              {!isLoading && query.trim().length === 0 && recentSearches.length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">Start typing to search for products, brands, or anime</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
