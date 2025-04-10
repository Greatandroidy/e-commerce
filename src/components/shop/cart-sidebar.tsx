"use client"

import { Minus, Plus, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"

interface CartSidebarProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CartSidebar({ open, onOpenChange }: CartSidebarProps) {
  const { cart, products, updateCartItemQuantity, removeFromCart } = useStore()

  // Get cart items with product details
  const cartItems = cart.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
      total: product ? product.price * item.quantity : 0,
    }
  })

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const shipping = subtotal > 0 ? 10 : 0
  const total = subtotal + shipping

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-md flex flex-col">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
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
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
              <div className="space-y-1 text-center">
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">Add items to your cart to checkout.</p>
              </div>
              <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex items-start gap-4">
                  <div className="relative aspect-square h-20 w-20 min-w-[5rem] overflow-hidden rounded-md bg-muted">
                    <Image
                      src={item.product?.image || "/placeholder.svg"}
                      alt={item.product?.name || "Product"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{item.product?.name}</h4>
                        <div className="flex text-sm text-muted-foreground">
                          <p>Size: {item.size}</p>
                          <span className="mx-2">•</span>
                          <p>Color: {item.color}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removeFromCart(item.productId)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="font-medium">${item.total.toFixed(2)}</p>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateCartItemQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        >
                          <Minus className="h-3 w-3" />
                          <span className="sr-only">Decrease quantity</span>
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                          <span className="sr-only">Increase quantity</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mt-auto space-y-4 pt-6">
            <Separator />
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/cart">Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
