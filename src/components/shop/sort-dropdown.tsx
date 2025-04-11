"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SortOption {
  label: string
  value: string
}

interface SortDropdownProps {
  options: SortOption[]
  defaultValue?: string
  onSortChange: (value: string) => void
  resultsCount?: number
}

export function SortDropdown({ options, defaultValue, onSortChange, resultsCount }: SortDropdownProps) {
  const [selectedSort, setSelectedSort] = useState(defaultValue || options[0].value)

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    onSortChange(value)
  }

  const selectedLabel = options.find((option) => option.value === selectedSort)?.label || options[0].label

  return (
    <div className="flex items-center justify-end w-full">
      {resultsCount !== undefined && <span className="text-sm text-muted-foreground">{resultsCount} results</span>}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 px-2 h-8">
            <span className="text-sm">
              Sort By: <span className="font-medium">{selectedLabel}</span>
            </span>
            <ChevronDown className="h-4 w-4 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="flex items-center justify-between"
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
              {selectedSort === option.value && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
