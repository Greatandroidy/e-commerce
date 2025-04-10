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
  const [reviewFilter, setReviewFilter] = useState(0) // 0 = all, 1-5 = star rating
  const [reviewSort, setReviewSort] = useState("newest") // newest, oldest, highest, lowest, most-helpful
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
  })
  const [isWritingReview, setIsWritingReview] = useState(false)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const shippingRef = useRef<HTMLDivElement>(null)

  const isInStock = isProductInStock(product.id)
  const isFavorite = favorites.includes(product.id)
  const selectedColorObj = product.colors?.find((c) => c.id === selectedColor)

  // Filter and sort reviews
  const sortedAndFilteredReviews = [...mockReviews]
    .filter((review) => (reviewFilter === 0 ? true : review.rating === reviewFilter))
    .sort((a, b) => {
      switch (reviewSort) {
        case "newest":
          return b.timestamp - a.timestamp
        case "oldest":
          return a.timestamp - b.timestamp
        case "highest":
          return b.rating - a.rating
        case "lowest":
          return a.rating - b.rating
        case "most-helpful":
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

  // Calculate rating statistics
  const totalReviews = mockReviews.length
  const averageRating = (mockReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1)
  const ratingCounts = [0, 0, 0, 0, 0]
  mockReviews.forEach((review) => {
    ratingCounts[review.rating - 1]++
  })
  const recommendPercentage = Math.round((mockReviews.filter((r) => r.rating >= 4).length / totalReviews) * 100)

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

  const handleSubmitReview = () => {
    toast.success("Review submitted", {
      description: "Thank you for your feedback! Your review will be published after moderation.",
    })
    setIsWritingReview(false)
    setNewReview({
      rating: 5,
      title: "",
      content: "",
    })
  }

  const handleReviewHelpful = (reviewId: number, helpful: boolean) => {
    toast.success(helpful ? "Marked as helpful" : "Marked as not helpful", {
      description: "Thank you for your feedback!",
    })
  }

  const handleReviewReport = (reviewId: number) => {
    toast.success("Review reported", {
      description: "Thank you for helping us maintain quality reviews.",
    })
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

      {/* Section titles above tabs */}
      <div className="mt-8">
        <div className="flex border-b">
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === "description"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === "reviews"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({totalReviews})
          </button>
          <button
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors relative",
              activeTab === "shipping"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Returns
          </button>
        </div>

        <div className="py-4">
          {/* Description Tab */}
          <div ref={descriptionRef} className={activeTab === "description" ? "block" : "hidden"}>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <span className="border-l-4 border-primary pl-3">Product Description</span>
            </h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">{product.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground">Fabric material</h4>
                  <p className="text-muted-foreground">Rayon</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Pocket</h4>
                  <p className="text-muted-foreground">Yes</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Waist</h4>
                  <p className="text-muted-foreground">Elastic</p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Z-Zipper</h4>
                  <p className="text-muted-foreground">Yes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Tab */}
          <div ref={reviewsRef} className={activeTab === "reviews" ? "block" : "hidden"}>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <span className="border-l-4 border-primary pl-3">Customer Reviews</span>
            </h3>

            {/* Reviews summary */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left column - overall rating */}
                <div className="md:w-1/4 flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold">{averageRating}</div>
                  <div className="flex mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-5 w-5",
                          i < Math.round(Number.parseFloat(averageRating))
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground",
                        )}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">{totalReviews} reviews</div>
                  <div className="text-sm mt-2">
                    <span className="font-medium">{recommendPercentage}%</span> of reviewers recommend this product
                  </div>
                </div>

                {/* Middle column - rating breakdown */}
                <div className="md:w-2/4">
                  <h4 className="text-sm font-medium mb-2">Rating snapshot</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-2">
                        <div className="w-16 text-sm">{stars} stars</div>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400 rounded-full"
                            style={{ width: `${(ratingCounts[stars - 1] / totalReviews) * 100}%` }}
                          />
                        </div>
                        <div className="w-8 text-sm text-right">{ratingCounts[stars - 1]}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right column - filter by rating */}
                <div className="md:w-1/4">
                  <h4 className="text-sm font-medium mb-2">Filter by star rating</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={reviewFilter === 0 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setReviewFilter(0)}
                    >
                      All
                    </Button>
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <Button
                        key={stars}
                        variant={reviewFilter === stars ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReviewFilter(stars)}
                        disabled={ratingCounts[stars - 1] === 0}
                      >
                        {stars} ★
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Write a review button and sort options */}
            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">
                  {sortedAndFilteredReviews.length} {reviewFilter === 0 ? "Reviews" : `${reviewFilter}-Star Reviews`}
                </h4>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-2">
                      Sort by:{" "}
                      {reviewSort === "newest"
                        ? "Newest"
                        : reviewSort === "oldest"
                          ? "Oldest"
                          : reviewSort === "highest"
                            ? "Highest Rated"
                            : reviewSort === "lowest"
                              ? "Lowest Rated"
                              : "Most Helpful"}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setReviewSort("newest")}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setReviewSort("oldest")}>Oldest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setReviewSort("highest")}>Highest Rated</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setReviewSort("lowest")}>Lowest Rated</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setReviewSort("most-helpful")}>Most Helpful</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <Button onClick={() => setIsWritingReview(!isWritingReview)} variant="outline">
                {isWritingReview ? "Cancel" : "Write a Review"}
              </Button>
            </div>

            {/* Write a review form */}
            {isWritingReview && (
              <div className="border rounded-lg p-4 space-y-4 mt-4">
                <h4 className="font-medium">Share your thoughts</h4>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          className={cn(
                            "h-6 w-6",
                            star <= newReview.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-title">Review Title</Label>
                  <Input
                    id="review-title"
                    placeholder="Summarize your experience"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review-content">Review</Label>
                  <Textarea
                    id="review-content"
                    placeholder="What did you like or dislike about this product?"
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                  />
                </div>
                <Button onClick={handleSubmitReview}>Submit Review</Button>
              </div>
            )}

            {/* Reviews list */}
            <div className="space-y-6 mt-6">
              {sortedAndFilteredReviews.length > 0 ? (
                sortedAndFilteredReviews.map((review) => (
                  <div key={review.id} className="border-b pb-6 last:border-0">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={review.avatar} alt={review.author} />
                          <AvatarFallback>{review.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{review.author}</div>
                          {review.verified && (
                            <div className="flex items-center text-xs text-green-600">
                              <Check className="h-3 w-3 mr-1" />
                              Verified customer
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{review.date}</div>
                    </div>

                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                        <div className="font-medium">{review.title}</div>
                      </div>
                      <p className="mt-2 text-muted-foreground">{review.content}</p>

                      {/* Review images */}
                      {review.images.length > 0 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                          {review.images.map((image, index) => (
                            <div key={index} className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Review image ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Review actions */}
                      <div className="mt-3 flex items-center gap-4">
                        <div className="text-sm">Helpful?</div>
                        <button
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => handleReviewHelpful(review.id, true)}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{review.helpful}</span>
                        </button>
                        <button
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => handleReviewHelpful(review.id, false)}
                        >
                          <ThumbsUp className="h-4 w-4 rotate-180" />
                          <span>{review.notHelpful}</span>
                        </button>
                        <button
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground ml-auto"
                          onClick={() => handleReviewReport(review.id)}
                        >
                          <Flag className="h-4 w-4" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    No reviews match your filter. Try adjusting your filter or be the first to review this product.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Tab */}
          <div ref={shippingRef} className={activeTab === "shipping" ? "block" : "hidden"}>
            <h3 className="text-lg font-medium flex items-center mb-4">
              <span className="border-l-4 border-primary pl-3">Shipping & Returns</span>
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Shipping Information</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Free standard shipping on all orders over $50</li>
                  <li>Standard shipping (3-5 business days): $4.99</li>
                  <li>Express shipping (1-2 business days): $9.99</li>
                  <li>International shipping available to select countries</li>
                  <li>All orders are processed within 1-2 business days</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Return Policy</h4>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Easy returns within 30 days of delivery</li>
                  <li>Items must be unworn, unwashed, and with original tags attached</li>
                  <li>Return shipping is free for exchanges and store credit</li>
                  <li>Refunds will be issued to the original payment method</li>
                  <li>Special or limited edition items may have different return policies</li>
                </ul>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Need Help?</h4>
                <p className="text-muted-foreground mb-2">
                  If you have any questions about shipping or returns, please contact our customer service team.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/faq">FAQ</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
