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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface FilterSidebarProps {
  className?: string
}

interface FilterState {
  category: string[]
  color: string[]
  size: string[]
  style: string[]
  priceRange: [number, number]
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
    setExpandedCategories((current: string[]) =>
      current.includes(categoryId) ? current.filter((id: string) => id !== categoryId) : [...current, categoryId],
    )
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((current: string[]) =>
      current.includes(sectionId) ? current.filter((id: string) => id !== sectionId) : [...current, sectionId],
    )
  }

  const toggleFilter = (type: keyof FilterState, value: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFilters({
      ...filters,
      [type]: filters[type].includes(value)
        ? (filters[type] as string[]).filter((item: string) => item !== value)
        : [...(filters[type] as string[]), value],
    })
  }

  const updatePriceRange = (value: number[], e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFilters({
      ...filters,
      priceRange: value as [number, number],
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
              onClick={(e) => toggleFilter("category", cat, e)}
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
              onClick={(e) => toggleFilter("color", color, e)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove</span>
            </Button>
          </Badge>
        ))}
        {filters.size.map((size) => (
          <Badge key={`active-size-${size}`} variant="outline" className="px-2 py-1 gap-1 bg-muted/50">
            {size}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 p-0 ml-1"
              onClick={(e) => toggleFilter("size", size, e)}
            >
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
              onClick={(e) => toggleFilter("style", style, e)}
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
    <div className={cn("w-full border shadow-sm", className)}>
      <div className="flex items-center py-2 px-3 justify-between">
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
                onClick={(e) => toggleFilter("category", cat, e)}
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
                onClick={(e) => toggleFilter("color", color, e)}
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
                onClick={(e) => toggleFilter("size", size, e)}
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
                onClick={(e) => toggleFilter("style", style, e)}
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

      <div className="max-h-[calc(100vh-200px)] overflow-y-auto pb-4 scrollbar-thin">
        {/* Categories */}
        <div className="border shadow-sm">
          <div className="p-3 cursor-pointer" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSection("categories");
          }}>
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium">Categories</h1>
              {expandedSections.includes("categories") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expandedSections.includes("categories") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 pt-0">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <div
                          className="flex items-center justify-between cursor-pointer py-1"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleCategory(category.id);
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`category-${category.id}`}
                              checked={filters.category.includes(category.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  toggleFilter("category", category.id);
                                } else {
                                  toggleFilter("category", category.id);
                                }
                              }}
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
                                    onCheckedChange={(checked) => {
                                      if (checked) {
                                        toggleFilter("category", `${category.id}-${subCategory}`);
                                      } else {
                                        toggleFilter("category", `${category.id}-${subCategory}`);
                                      }
                                    }}
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
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price */}
        <div className="border shadow-sm">
          <div className="p-3 cursor-pointer" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSection("price");
          }}>
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium">Price</h1>
              {expandedSections.includes("price") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expandedSections.includes("price") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3">
                  <div className="space-y-4">
                    <Slider
                      defaultValue={[0, 100]}
                      max={100}
                      step={1}
                      value={filters.priceRange}
                      onValueChange={(value) => updatePriceRange(value)}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-sm">${filters.priceRange[0] * 8}</span>
                      <span className="text-sm">${filters.priceRange[1] * 8}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Colors */}
        <div className="border shadow-sm">
          <div className="p-3 cursor-pointer" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSection("colors");
          }}>
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium">Colors</h1>
              {expandedSections.includes("colors") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expandedSections.includes("colors") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 pt-0">
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
                          onClick={(e) => toggleFilter("color", color.id, e)}
                        />
                        <span className="text-xs text-muted-foreground">{color.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sizes */}
        <div className="border shadow-sm">
          <div className="p-3 cursor-pointer" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSection("sizes");
          }}>
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium">Size</h1>
              {expandedSections.includes("sizes") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expandedSections.includes("sizes") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 pt-0">
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <div key={size.id} className="flex items-center justify-center">
                        <button
                          className={cn(
                            "h-10 w-10 rounded-md border flex items-center justify-center text-sm hover:bg-muted transition-all",
                            filters.size.includes(size.id) &&
                              "bg-purple-600 text-white hover:bg-purple-700 border-purple-600",
                          )}
                          onClick={(e) => toggleFilter("size", size.id, e)}
                        >
                          {size.label}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Styles */}
        <div className="border shadow-sm">
          <div className="p-3 cursor-pointer" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSection("styles");
          }}>
            <div className="flex items-center justify-between">
              <h1 className="text-sm font-medium">Dress Style</h1>
              {expandedSections.includes("styles") ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
          <AnimatePresence>
            {expandedSections.includes("styles") && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 pt-0">
                  <div className="space-y-2">
                    {styles.map((style) => (
                      <div key={style} className="flex items-center gap-2">
                        <Checkbox
                          id={`style-${style}`}
                          checked={filters.style.includes(style)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              toggleFilter("style", style);
                            } else {
                              toggleFilter("style", style);
                            }
                          }}
                        />
                        <label htmlFor={`style-${style}`} className="text-sm text-muted-foreground cursor-pointer">
                          {style}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
                        onCheckedChange={(checked) => {
                          if (checked) {
                            toggleFilter("category", category.id);
                          } else {
                            toggleFilter("category", category.id);
                          }
                        }}
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
                        onClick={(e) => toggleFilter("size", size.id, e)}
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
                          onClick={(e) => toggleFilter("color", color.id, e)}
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
                      onValueChange={(value) => updatePriceRange(value)}
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
