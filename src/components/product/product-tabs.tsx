"use client"

import { useState, useRef, useEffect } from "react"
import {
  Star,
  ThumbsUp,
  Flag,
  Check,
  ChevronDown,
} from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Link from "next/link"

import { cn } from "@/lib/utils"
import type { Product } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ProductTabsProps {
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

const ProductTabs = ({ product }: ProductTabsProps) => {
    const [activeTab, setActiveTab] = useState("description");
    const [reviewFilter, setReviewFilter] = useState(0) // 0 = all, 1-5 = star rating
    const [reviewSort, setReviewSort] = useState("newest") // newest, oldest, highest, lowest, most-helpful
    const [newReview, setNewReview] = useState({
        rating: 5,
        title: "",
        content: "",
    })
    const [isWritingReview, setIsWritingReview] = useState(false)
    const reviewsRef = useRef<HTMLDivElement>(null)
    const descriptionRef = useRef<HTMLDivElement>(null);
    const shippingRef = useRef<HTMLDivElement>(null)


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
    )
}

export default ProductTabs