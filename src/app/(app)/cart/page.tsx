"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CartPage() {
  const { cart, products, updateCartItemQuantity, removeFromCart } = useStore()
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  // Calculate cart totals
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0,
    }
  })

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartItemQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId)
  }

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplyingPromo(true)
    // Simulate API call
    setTimeout(() => {
      setIsApplyingPromo(false)
      setPromoCode("")
      // Show success message in a real app
    }, 1000)
  }

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center text-center py-16">
              <div className="rounded-full bg-muted p-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground max-w-md">
                Looks like you haven't added anything to your cart yet. Browse our collections to find something you'll
                love.
              </p>
              <Button asChild className="mt-8 bg-purple-600 hover:bg-purple-700">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.productId} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative aspect-square h-24 w-24 min-w-[6rem] overflow-hidden rounded-md bg-muted">
                            <Image
                              src={item.product?.image || "/placeholder.svg"}
                              alt={item.product?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">
                                  <Link href={`/product/${item.productId}`} className="hover:underline">
                                    {item.product?.name}
                                  </Link>
                                </h3>
                                <div className="mt-1 flex text-sm text-muted-foreground">
                                  <p>Size: {item.size}</p>
                                  <span className="mx-2">•</span>
                                  <p>Color: {item.color}</p>
                                </div>
                              </div>
                              <p className="font-medium">${item.total.toFixed(2)}</p>
                            </div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                                >
                                  <Minus className="h-3 w-3" />
                                  <span className="sr-only">Decrease quantity</span>
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                  <span className="sr-only">Increase quantity</span>
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveItem(item.productId)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <form onSubmit={handleApplyPromo} className="mt-4">
                      <Label htmlFor="promo-code">Promo Code</Label>
                      <div className="mt-1 flex gap-2">
                        <Input
                          id="promo-code"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button type="submit" variant="outline" disabled={!promoCode || isApplyingPromo}>
                          Apply
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Checkout
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/shop">Continue Shopping</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
