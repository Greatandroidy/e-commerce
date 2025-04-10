"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Star, ShoppingCart } from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import type { Product } from "@/lib/store"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

interface QuickViewProps {
  product: Product
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const { addToCart } = useStore()
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.id || "")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2]?.id || "")
  const [currentImage, setCurrentImage] = useState(0)

  if (!product) return null

  const handleAddToCart = () => {
    const success = addToCart({
      productId: product.id,
      quantity: 1,
      size: selectedSize || product.size,
      color: selectedColor || product.color,
    })

    if (success) {
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
      })
      onOpenChange(false)
    } else {
      toast.error("Error", {
        description: "This item is out of stock.",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 z-10">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="relative bg-muted">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.images?.[currentImage] || product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-3 w-3 rounded-full transition-all",
                      currentImage === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80",
                    )}
                    onClick={() => setCurrentImage(index)}
                  >
                    <span className="sr-only">View image {index + 1}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-6 flex flex-col h-full overflow-y-auto max-h-[80vh]">
            <DialogHeader className="text-left mb-4">
              <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
              <DialogDescription className="text-base font-medium text-foreground">
                ${product.price.toFixed(2)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 flex-1">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < (product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating?.toFixed(1) || "0.0"}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground">{product.description}</p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium">Colors Available</h3>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <div key={color.id}>
                        <RadioGroupItem id={`color-${color.id}`} value={color.id} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${color.id}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ring-offset-background peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
                        >
                          <span className="h-8 w-8 rounded-full" style={{ backgroundColor: color.value }} />
                          <span className="sr-only">{color.label}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium">Select Size</h3>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <div key={size.id}>
                        <RadioGroupItem id={`size-${size.id}`} value={size.id} className="peer sr-only" />
                        <Label
                          htmlFor={`size-${size.id}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border bg-background text-sm font-medium ring-offset-background peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                        >
                          {size.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-4">
              <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href={`/product/${product.id}`}>View Full Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
