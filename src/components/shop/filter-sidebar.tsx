"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FilterSidebarProps {
  className?: string
}

export function FilterSidebar({ className }: FilterSidebarProps) {
  const { categories, colors, sizes, styles, filters, setFilters, applyFilters } = useStore()

  const [expandedCategories, setExpandedCategories] = useState<string[]>([])
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "categories",
    "price",
    "colors",
    "sizes",
    "styles",
  ])
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Reset scroll position when filter sheet is opened
  useEffect(() => {
    if (isSheetOpen) {
      // Reset scroll position inside the sheet
      const sheetContent = document.querySelector('[role="dialog"]')
      if (sheetContent) {
        sheetContent.scrollTop = 0
      }
    }
  }, [isSheetOpen])

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((current) =>
      current.includes(categoryId) ? current.filter((id) => id !== categoryId) : [...current, categoryId],
    )
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current) =>
      current.includes(sectionId) ? current.filter((id) => id !== sectionId) : [...current, sectionId],
    )
  }

  const toggleFilter = (type: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [type]: filters[type].includes(value)
        ? filters[type].filter((item) => item !== value)
        : [...filters[type], value],
    })
  }

  const updatePriceRange = (value: [number, number]) => {
    setFilters({
      ...filters,
      priceRange: value,
    })
  }

  const clearFilters = () => {
    setFilters({
      category: [],
      color: [],
      size: [],
      style: [],
      priceRange: [0, 100],
    })
  }

  const getActiveFilterCount = () => {
    return (
      filters.category.length +
      filters.color.length +
      filters.size.length +
      filters.style.length +
      (filters.priceRange[0] > 0 || filters.priceRange[1] < 100 ? 1 : 0)
    )
  }

  const isFilterApplied = getActiveFilterCount() > 0

  const renderActiveFilters = () => {
    if (!isFilterApplied) return null

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.category.map((cat) => (
          <Badge key={`active-cat-${cat}`} variant="outline" className="px-2 py-1 gap-1 bg-muted/50">
            {cat}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => toggleFilter("category", cat)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
        {filters.color.map((color) => (
          <Badge key={`active-color-${color}`} variant="outline" className="px-2 py-1 gap-1 bg-muted/50">
            {color}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => toggleFilter("color", color)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
        {filters.size.map((size) => (
          <Badge key={`active-size-${size}`} variant="outline" className="px-2 py-1 gap-1 bg-muted/50">
            {size}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => toggleFilter("size", size)}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
        {filters.style.map((style) => (
          <Badge key={`active-style-${style}`} variant="outline" className="px-2 py-1 gap-1 bg-muted/50">
            {style}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1"
              onClick={() => toggleFilter("style", style)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
      </div>
    )
  }

  const FilterContent = () => (
    <div className={cn("w-full space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Filter</h3>
        {isFilterApplied && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
            Clear all
          </Button>
        )}
      </div>

      {isFilterApplied && (
        <div className="flex flex-wrap gap-2">
          {filters.category.map((cat) => (
            <Badge key={`cat-${cat}`} variant="secondary" className="px-2 py-1">
              {cat}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("category", cat)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          ))}
          {filters.color.map((color) => (
            <Badge key={`color-${color}`} variant="secondary" className="px-2 py-1">
              {color}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("color", color)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          ))}
          {filters.size.map((size) => (
            <Badge key={`size-${size}`} variant="secondary" className="px-2 py-1">
              {size}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("size", size)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          ))}
          {filters.style.map((style) => (
            <Badge key={`style-${style}`} variant="secondary" className="px-2 py-1">
              {style}
              <Button
                variant="ghost"
                size="icon"
                className="ml-1 h-4 w-4 p-0"
                onClick={() => toggleFilter("style", style)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </Button>
            </Badge>
          ))}
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
            <Badge variant="secondary" className="px-2 py-1">
              ${filters.priceRange[0] * 8} - ${filters.priceRange[1] * 8}
            </Badge>
          )}
        </div>
      )}

      <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 pb-4 scrollbar-thin">
        {/* Categories */}
        <Card className="border shadow-sm">
          <CardHeader className="p-3 cursor-pointer" onClick={() => toggleSection("categories")}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              {expandedSections.includes("categories") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.includes("categories") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <div
                          className="flex items-center justify-between cursor-pointer py-1"
                          onClick={() => toggleCategory(category.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={filters.category.includes(category.id)}
                              onCheckedChange={() => toggleFilter("category", category.id)}
                              onClick={(e) => e.stopPropagation()}
                            />
                            <label
                              htmlFor={`category-${category.id}`}
                              className="text-sm cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {category.label}
                            </label>
                          </div>
                          {expandedCategories.includes(category.id) ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <AnimatePresence>
                          {expandedCategories.includes(category.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 mt-1 space-y-1"
                            >
                              {category.children.map((subCategory) => (
                                <div key={subCategory} className="flex items-center gap-2">
                                  <Checkbox
                                    id={`${category.id}-${subCategory}`}
                                    checked={filters.category.includes(`${category.id}-${subCategory}`)}
                                    onCheckedChange={() => toggleFilter("category", `${category.id}-${subCategory}`)}
                                  />
                                  <label
                                    htmlFor={`${category.id}-${subCategory}`}
                                    className="text-sm text-muted-foreground cursor-pointer"
                                  >
                                    {subCategory}
                                  </label>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Price */}
        <Card className="border shadow-sm">
          <CardHeader className="p-3 cursor-pointer" onClick={() => toggleSection("price")}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Price</CardTitle>
              {expandedSections.includes("price") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.includes("price") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-3 pt-0">
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={filters.priceRange}
                      onValueChange={updatePriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${filters.priceRange[0] * 8}</span>
                      <span className="text-sm">${filters.priceRange[1] * 8}</span>
                    </div>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Colors */}
        <Card className="border shadow-sm">
          <CardHeader className="p-3 cursor-pointer" onClick={() => toggleSection("colors")}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Colors</CardTitle>
              {expandedSections.includes("colors") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.includes("colors") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-3 pt-0">
                  <div className="grid grid-cols-4 gap-2 py-2">
                    {colors.map((color) => (
                      <div key={color.id} className="flex flex-col items-center gap-1">
                        <button
                          className={cn(
                            "h-8 w-8 rounded-full border transition-all",
                            filters.color.includes(color.id) && "ring-2 ring-purple-600 ring-offset-2",
                          )}
                          style={{ backgroundColor: color.value }}
                          aria-label={`Filter by ${color.label}`}
                          onClick={() => toggleFilter("color", color.id)}
                        />
                        <span className="text-xs text-muted-foreground">{color.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Sizes */}
        <Card className="border shadow-sm">
          <CardHeader className="p-3 cursor-pointer" onClick={() => toggleSection("sizes")}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Size</CardTitle>
              {expandedSections.includes("sizes") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.includes("sizes") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-3 pt-0">
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <div key={size.id} className="flex items-center justify-center">
                        <button
                          className={cn(
                            "h-10 w-10 rounded-md border flex items-center justify-center text-sm hover:bg-muted transition-all",
                            filters.size.includes(size.id) &&
                              "bg-purple-600 text-white hover:bg-purple-700 border-purple-600",
                          )}
                          onClick={() => toggleFilter("size", size.id)}
                        >
                          {size.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Styles */}
        <Card className="border shadow-sm">
          <CardHeader className="p-3 cursor-pointer" onClick={() => toggleSection("styles")}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Dress Style</CardTitle>
              {expandedSections.includes("styles") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.includes("styles") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-3 pt-0">
                  <div className="space-y-2">
                    {styles.map((style) => (
                      <div key={style} className="flex items-center gap-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={filters.style.includes(style)}
                          onCheckedChange={() => toggleFilter("style", style)}
                        />
                        <label htmlFor={`style-${style}`} className="text-sm text-muted-foreground cursor-pointer">
                          {style}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      <div className="sticky bottom-0 bg-background pt-4 border-t mt-auto">
        <Button className="w-full bg-primary hover:bg-primary/90" onClick={applyFilters}>
          Apply Filters
          {getActiveFilterCount() > 0 && <Badge className="ml-2 bg-white text-primary">{getActiveFilterCount()}</Badge>}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:block sticky top-[80px]">
        <FilterContent />
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center justify-between gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filter</span>
              {getActiveFilterCount() > 0 && <Badge className="ml-1 bg-primary">{getActiveFilterCount()}</Badge>}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Filter</h3>
              {isFilterApplied && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                  Clear all
                </Button>
              )}
            </div>

            {renderActiveFilters()}

            <div className="grid grid-cols-2 gap-2 mb-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Category</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category.id}
                      className="flex items-center gap-2"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Checkbox
                        id={`mobile-category-${category.id}`}
                        checked={filters.category.includes(category.id)}
                        onCheckedChange={() => toggleFilter("category", category.id)}
                      />
                      <label htmlFor={`mobile-category-${category.id}`} className="flex-1 cursor-pointer">
                        {category.label}
                      </label>
                      <span className="text-xs text-muted-foreground">({category.children.length})</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Size</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="grid grid-cols-3 gap-2 p-2">
                    {sizes.map((size) => (
                      <Button
                        key={size.id}
                        variant={filters.size.includes(size.id) ? "default" : "outline"}
                        size="sm"
                        className="h-10"
                        onClick={() => toggleFilter("size", size.id)}
                      >
                        {size.label}
                      </Button>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Color</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="grid grid-cols-4 gap-2 p-2">
                    {colors.map((color) => (
                      <div key={color.id} className="flex flex-col items-center gap-1">
                        <button
                          className={cn(
                            "h-8 w-8 rounded-full border transition-all",
                            filters.color.includes(color.id) && "ring-2 ring-purple-600 ring-offset-2",
                          )}
                          style={{ backgroundColor: color.value }}
                          aria-label={`Filter by ${color.label}`}
                          onClick={() => toggleFilter("color", color.id)}
                        />
                        <span className="text-xs text-muted-foreground">{color.label}</span>
                      </div>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Price</span>
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 p-4">
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={filters.priceRange}
                      onValueChange={updatePriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${filters.priceRange[0] * 8}</span>
                      <span className="text-sm">${filters.priceRange[1] * 8}</span>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="sticky bottom-0 bg-background pt-4 border-t mt-auto">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  applyFilters()
                  setIsSheetOpen(false)
                }}
              >
                Apply Filters
                {getActiveFilterCount() > 0 && (
                  <Badge className="ml-2 bg-white text-primary">{getActiveFilterCount()}</Badge>
                )}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
