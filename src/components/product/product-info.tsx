"use client"

import { useState, useRef, useEffect } from "react"
import {
  ShoppingCart,
  Star,
  ExternalLink,
  AlertCircle,
  Heart,
  Minus,
  Plus,
  ThumbsUp,
  Flag,
  Ruler,
  Check,
  ArrowRight,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Link from "next/link"

import { cn } from "@/lib/utils"
import type { Product } from "@/lib/store"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProductInfoProps {
  product: Product
}

// Mock review data
const mockReviews = [
  {
    id: 1,
    author: "runMiles",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "13 hours ago",
    timestamp: Date.now() - 13 * 60 * 60 * 1000,
    title: "Comfortable relaxed fit",
    content: "The most stylish and funky slippers I've ever owned! Much admired by friends and family.",
    verified: true,
    helpful: 12,
    notHelpful: 0,
    images: ["/placeholder.svg?height=80&width=80", "/placeholder.svg?height=80&width=80"],
  },
  {
    id: 2,
    author: "Sam",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "5 days ago",
    timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
    title: "Top Choice Shoes!",
    content:
      "I've done a review but I don't mind gloating about your product. The pair I have now are my 3rd and love the comfort, design and now the new white sole.",
    verified: true,
    helpful: 11,
    notHelpful: 0,
    images: [
      "/placeholder.svg?height=80&width=80",
      "/placeholder.svg?height=80&width=80",
      "/placeholder.svg?height=80&width=80",
    ],
  },
  {
    id: 3,
    author: "Jessica",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "1 week ago",
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    title: "Great quality",
    content: "Really impressed with the quality. Fits as expected and the material feels premium.",
    verified: true,
    helpful: 8,
    notHelpful: 1,
    images: [],
  },
  {
    id: 4,
    author: "Akira",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2 weeks ago",
    timestamp: Date.now() - 14 * 24 * 60 * 60 * 1000,
    title: "Perfect for anime fans",
    content: "As a huge anime fan, I absolutely love this. The design is spot on and the quality is excellent.",
    verified: true,
    helpful: 15,
    notHelpful: 0,
    images: ["/placeholder.svg?height=80&width=80"],
  },
  {
    id: 5,
    author: "Michael",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 3,
    date: "3 weeks ago",
    timestamp: Date.now() - 21 * 24 * 60 * 60 * 1000,
    title: "Good but sizing runs small",
    content: "The product is good quality but I had to exchange for a larger size. Consider ordering one size up.",
    verified: true,
    helpful: 20,
    notHelpful: 2,
    images: [],
  },
]

// Size guide data
const sizeGuideData = {
  sizes: [
    { id: "XXS", chest: "31-32", waist: "24-25", hips: "34-35", inseam: "30" },
    { id: "XS", chest: "33-34", waist: "26-27", hips: "36-37", inseam: "30.5" },
    { id: "S", chest: "35-36", waist: "28-29", hips: "38-39", inseam: "31" },
    { id: "M", chest: "37-38", waist: "30-31", hips: "40-41", inseam: "31.5" },
    { id: "L", chest: "39-40", waist: "32-33", hips: "42-43", inseam: "32" },
    { id: "XL", chest: "41-42", waist: "34-35", hips: "44-45", inseam: "32.5" },
    { id: "XXL", chest: "43-44", waist: "36-37", hips: "46-47", inseam: "33" },
    { id: "3XL", chest: "45-46", waist: "38-40", hips: "48-49", inseam: "33.5" },
  ],
  howToMeasure: [
    { part: "Chest", instruction: "Measure around the fullest part of your chest, keeping the tape horizontal." },
    { part: "Waist", instruction: "Measure around your natural waistline, keeping the tape comfortably loose." },
    { part: "Hips", instruction: "Measure around the fullest part of your hips, about 8 inches below your waist." },
    { part: "Inseam", instruction: "Measure from the crotch to the bottom of the leg along the inner seam." },
  ],
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart, isProductInStock, toggleFavorite, favorites } = useStore()
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors && product.colors.length > 0 ? product.colors[0].id : undefined,
  )
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes && product.sizes.length > 0 ? product.sizes[2]?.id : undefined,
  )
  const [quantity, setQuantity] = useState(1)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("description")
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)

  const isInStock = isProductInStock(product.id)
  const isFavorite = favorites.includes(product.id)
  const selectedColorObj = product.colors?.find((c) => c.id === selectedColor)

  // Filter and sort reviews

  // Calculate rating statistics
  const totalReviews = mockReviews.length
  const ratingCounts = [0, 0, 0, 0, 0]
  mockReviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })

  const handleAddToCart = () => {
    // Validate selections
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setValidationError("Please select a color")
      return
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setValidationError("Please select a size")
      return
    }

    // Clear any previous validation errors
    setValidationError(null)

    // Add to cart
    const success = addToCart({
      productId: product.id,
      quantity,
      size: (selectedSize as any) || product.size,
      color: (selectedColor as any) || product.color,
    })

    if (success) {
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
      })
    } else {
      toast.error("Error", {
        description: "This item is out of stock.",
      })
    }
  }

  const handleBuyNow = () => {
    const success = addToCart({
      productId: product.id,
      quantity,
      size: (selectedSize as any) || product.size,
      color: (selectedColor as any) || product.color,
    })


    if (success) {
      window.location.href = "/checkout"
    } else {
      toast.error("Error", {
        description: "This item is out of stock.",
      })
    }
  }

  const handleToggleFavorite = () => {
    toggleFavorite(product.id)
    if (!isFavorite) {
      toast.success("Added to wishlist", {
        description: `${product.name} has been added to your wishlist.`,
      })
    } else {
      toast.success("Removed from wishlist", {
        description: `${product.name} has been removed from your wishlist.`,
      })
    }
  }




  // Scroll to section when tab changes
  useEffect(() => {
    if (activeTab === "reviews" && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (activeTab === "description" && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    } else if (activeTab === "shipping" && shippingRef.current) {
      shippingRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [activeTab])

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
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
          <button
            className="text-sm text-primary hover:underline"
            onClick={() => {
              setActiveTab("reviews")
              setTimeout(() => {
                reviewsRef.current?.scrollIntoView({ behavior: "smooth" })
              }, 100)
            }}
          >
            {totalReviews} reviews
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          {product.discount ? (
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">${(product.price * (1 - product.discount / 100)).toFixed(2)}</div>
              <div className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</div>
              <Badge className="bg-red-500">{product.discount}% OFF</Badge>
            </div>
          ) : (
            <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
          )}
          <div className="text-sm text-muted-foreground">{product.brand}</div>
        </div>
        {product.anime && (
          <Badge variant="outline" className="flex items-center gap-1">
            <span>{product.anime}</span>
            <ExternalLink className="h-3 w-3" />
          </Badge>
        )}
      </div>

      {/* Stock information */}
      {product.isOutOfStock || (product.stock !== undefined && product.stock <= 0) ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>This product is currently out of stock</AlertDescription>
        </Alert>
      ) : product.stock !== undefined && product.stock <= 5 ? (
        <Alert
          variant="warning"
          className="bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200 border-amber-200 dark:border-amber-800"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Only {product.stock} items left in stock - order soon</AlertDescription>
        </Alert>
      ) : (
        <Alert
          variant="default"
          className="bg-green-50 text-green-800 dark:bg-green-950 dark:text-green-200 border-green-200 dark:border-green-800"
        >
          <Check className="h-4 w-4" />
          <AlertDescription>In stock and ready to ship</AlertDescription>
        </Alert>
      )}

      {/* Validation error */}
      {validationError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{validationError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">
                Color - {selectedColorObj ? selectedColorObj.label : "Select a color"}
              </h3>
            </div>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <TooltipProvider key={color.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <RadioGroupItem id={`color-${color.id}`} value={color.id} className="peer sr-only" />
                        <Label
                          htmlFor={`color-${color.id}`}
                          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border ring-offset-background peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2"
                        >
                          <span className="h-8 w-8 rounded-full" style={{ backgroundColor: color.value }} />
                          <span className="sr-only">{color.label}</span>
                        </Label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">{color.label}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Size - {selectedSize || "Select a size"}</h3>
              <Dialog open={sizeGuideOpen} onOpenChange={setSizeGuideOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-xs text-primary">
                    <Ruler className="mr-1 h-3 w-3" />
                    Size Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Size Guide</DialogTitle>
                    <DialogDescription>Find your perfect fit with our detailed size chart.</DialogDescription>
                  </DialogHeader>
                  <div className="mt-4 space-y-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border px-4 py-2 text-left">Size</th>
                            <th className="border px-4 py-2 text-left">Chest (in)</th>
                            <th className="border px-4 py-2 text-left">Waist (in)</th>
                            <th className="border px-4 py-2 text-left">Hips (in)</th>
                            <th className="border px-4 py-2 text-left">Inseam (in)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuideData.sizes.map((size) => (
                            <tr key={size.id} className={size.id === selectedSize ? "bg-primary/10" : ""}>
                              <td className="border px-4 py-2 font-medium">{size.id}</td>
                              <td className="border px-4 py-2">{size.chest}</td>
                              <td className="border px-4 py-2">{size.waist}</td>
                              <td className="border px-4 py-2">{size.hips}</td>
                              <td className="border px-4 py-2">{size.inseam}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">How to Measure</h4>
                      <ul className="space-y-2">
                        {sizeGuideData.howToMeasure.map((item, index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{item.part}:</span> {item.instruction}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg text-sm">
                      <p className="font-medium mb-1">Fit Tip:</p>
                      <p>If you're between sizes, we recommend sizing up for a more comfortable fit.</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
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

        {/* Quantity selector */}
        <div>
          <h3 className="text-sm font-medium mb-2">Quantity</h3>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-r-none"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <Input
              type="number"
              min="1"
              max={product.stock || 99}
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              className="h-10 w-16 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-l-none"
              onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
              disabled={product.stock !== undefined && quantity >= product.stock}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={handleAddToCart} disabled={!isInStock}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {isInStock ? "Add to cart" : "Out of stock"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className={cn(
                "w-full border-2",
                isFavorite ? "border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20" : "",
              )}
              onClick={handleToggleFavorite}
            >
              <Heart className={cn("mr-2 h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "")} />
              {isFavorite ? "Saved" : "Wishlist"}
            </Button>
          </motion.div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            onClick={handleBuyNow}
            disabled={!isInStock}
          >
            <ArrowRight className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </motion.div>

        <hr className="border" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <span className="text-sm">Secure payment</span>
          </div>
          <div className="flex items-center gap-2 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              <path d="M9 9h1" />
              <path d="M9 13h6" />
              <path d="M9 17h6" />
            </svg>
            <span className="text-sm">Size & Fit</span>
          </div>
          <div className="flex items-center gap-2 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M12 12v9" />
              <path d="m8 17 4 4 4-4" />
            </svg>
            <span className="text-sm">Free Shipping & Returns</span>
          </div>
          <div className="flex items-center gap-2 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <rect width="16" height="16" x="4" y="4" rx="2" />
              <rect width="4" height="4" x="10" y="10" />
              <path d="M4 10h4" />
              <path d="M4 14h4" />
              <path d="M16 4v4" />
              <path d="M16 14v6" />
            </svg>
            <span className="text-sm">Free shipping</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
