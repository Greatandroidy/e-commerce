"use client"

import { X, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useStore } from "@/lib/store"

interface WishlistSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WishlistSidebar({ open, onOpenChange }: WishlistSidebarProps) {
  const { favorites, products, toggleFavorite, addToCart } = useStore()

  // Get favorite products
  const favoriteProducts = products.filter((product) => favorites.includes(product.id))

  const handleRemoveFromWishlist = (productId: string) => {
    toggleFavorite(productId)
  }

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (product) {
      addToCart({
        productId,
        quantity: 1,
        size: product.sizes?.[0]?.id || product.size,
        color: product.colors?.[0]?.id || product.color,
      })
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-xl">Wishlist</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-6">
          {favoriteProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
              <div className="rounded-full bg-muted p-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-muted-foreground"
                >
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-lg font-semibold">Your wishlist is empty</h3>
                <p className="text-sm text-muted-foreground">Items added to your wishlist will appear here.</p>
              </div>
              <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {favoriteProducts.map((product) => (
                  <div key={product.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="relative aspect-square h-20 w-20 min-w-[5rem] overflow-hidden rounded-md bg-muted">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveFromWishlist(product.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">${product.price.toFixed(2)}</p>
                        <Button
                          size="sm"
                          className="h-8 bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Continue Shopping
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/wishlist">View All Wishlist</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
