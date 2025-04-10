"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"

export default function WishlistPage() {
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
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>

          {favoriteProducts.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center text-center py-16">
              <div className="rounded-full bg-muted p-6">
                <Heart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
              <p className="mt-2 text-muted-foreground max-w-md">
                Save your favorite items to your wishlist so you can easily find them later.
              </p>
              <Button asChild className="mt-8 bg-purple-600 hover:bg-purple-700">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favoriteProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Link href={`/product/${product.id}`}>
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
                        onClick={() => handleRemoveFromWishlist(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <CardContent className="flex flex-col flex-1 p-4">
                      <div className="mb-2">
                        <h3 className="font-medium line-clamp-1">
                          <Link href={`/product/${product.id}`} className="hover:underline">
                            {product.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-semibold">${product.price.toFixed(2)}</p>
                          {product.discount && <Badge className="bg-red-500">{product.discount}% OFF</Badge>}
                        </div>
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
