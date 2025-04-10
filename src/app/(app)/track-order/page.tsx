"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Search,
  ArrowRight,
  XCircle,
  RefreshCw,
  CreditCard,
  RotateCcw,
  ShoppingBag,
  Info,
} from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  getOrderByToken,
  getOrdersByEmail,
  cancelOrder,
  canCancelOrder,
  type Order,
  type TrackingEvent,
  simulateOrderProgression,
} from "@/lib/order-tracking"
import { useAuth } from "@/lib/auth"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { TooltipInfo } from "@/components/ui/tooltip-info"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrackOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const { user, isAuthenticated } = useAuth()

  const [orderToken, setOrderToken] = useState(token || "")
  const [orderEmail, setOrderEmail] = useState(email || "")
  const [order, setOrder] = useState<Order | null>(null)
  const [userOrders, setUserOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")
  const [refundMethod, setRefundMethod] = useState<"original" | "credit" | "exchange">("original")
  const [isProcessingCancel, setIsProcessingCancel] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("active")

  // Try to load order from URL params on initial load
  useEffect(() => {
    if (token && email && isInitialLoad) {
      setIsInitialLoad(false)
      handleTrackOrder()
    } else if (isAuthenticated && user && isInitialLoad) {
      setIsInitialLoad(false)
      loadUserOrders()
    }
  }, [token, email, isInitialLoad, isAuthenticated, user])

  // Simulate order progression every 5 minutes
  useEffect(() => {
    // Run once on load
    simulateOrderProgression()

    // Set up interval
    const interval = setInterval(
      () => {
        simulateOrderProgression()

        // Refresh current order if one is loaded
        if (order) {
          handleTrackOrder()
        } else if (userOrders.length > 0) {
          loadUserOrders()
        }
      },
      5 * 60 * 1000,
    ) // 5 minutes

    return () => clearInterval(interval)
  }, [order, userOrders])

  const loadUserOrders = () => {
    if (!user) return

    setIsLoading(true)

    // Get all orders for the user's email
    const orders = getOrdersByEmail(user.email)

    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setUserOrders(orders)
    setIsLoading(false)
  }

  const handleTrackOrder = () => {
    setIsLoading(true)
    setError("")

    // Validate inputs
    if (!orderToken || !orderEmail) {
      setError("Please enter both tracking number and email")
      setIsLoading(false)
      return
    }

    // Simulate API delay
    setTimeout(() => {
      const foundOrder = getOrderByToken(orderToken, orderEmail)

      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setError("Order not found. Please check your tracking number and email.")
      }

      setIsLoading(false)
    }, 1000)
  }

  const handleViewOrder = (selectedOrder: Order) => {
    setOrder(selectedOrder)
  }

  const handleBackToOrders = () => {
    setOrder(null)
  }

  const handleCancelOrder = () => {
    if (!order) return

    setIsProcessingCancel(true)

    // Validate
    if (!cancellationReason) {
      toast.error("Please provide a reason for cancellation")
      setIsProcessingCancel(false)
      return
    }

    // Process cancellation
    setTimeout(() => {
      const success = cancelOrder(order.id, cancellationReason, refundMethod, isAuthenticated)

      if (success) {
        toast.success("Order cancelled successfully", {
          description: "Your cancellation request has been processed.",
        })

        // Refresh order data
        if (userOrders.length > 0) {
          loadUserOrders()
          setOrder(null)
        } else {
          handleTrackOrder()
        }

        setCancelDialogOpen(false)
        setCancellationReason("") // Reset reason
      } else {
        toast.error("Failed to cancel order", {
          description: "This order cannot be cancelled. Please contact customer support.",
        })
      }

      setIsProcessingCancel(false)
    }, 1500)
  }

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { color: "bg-yellow-500", icon: <Clock className="h-5 w-5" /> }
      case "processing":
        return { color: "bg-blue-500", icon: <Package className="h-5 w-5" /> }
      case "shipped":
        return { color: "bg-purple-500", icon: <Truck className="h-5 w-5" /> }
      case "delivered":
        return { color: "bg-green-500", icon: <CheckCircle className="h-5 w-5" /> }
      case "cancelled":
        return { color: "bg-red-500", icon: <XCircle className="h-5 w-5" /> }
      case "returned":
        return { color: "bg-orange-500", icon: <RotateCcw className="h-5 w-5" /> }
      default:
        return { color: "bg-gray-500", icon: <Clock className="h-5 w-5" /> }
    }
  }

  // Demo tracking events if none exist
  const getTrackingEvents = (): TrackingEvent[] => {
    if (order?.trackingEvents && order.trackingEvents.length > 0) {
      return order.trackingEvents
    }

    // Demo tracking events if none exist
    if (order) {
      const orderDate = new Date(order.date)
      const events: TrackingEvent[] = []

      // Add events based on status
      if (order.status.status === "pending" || order.status.status === "processing") {
        events.push({
          date: order.date,
          status: "Order Placed",
          location: "Online",
          details: "Your order has been received and is being processed.",
        })
      }

      if (
        order.status.status === "processing" ||
        order.status.status === "shipped" ||
        order.status.status === "delivered"
      ) {
        const processingDate = new Date(orderDate)
        processingDate.setDate(processingDate.getDate() + 1)

        events.push({
          date: processingDate.toISOString(),
          status: "Order Processing",
          location: "Distribution Center",
          details: "Your order is being prepared for shipping.",
        })
      }

      if (order.status.status === "shipped" || order.status.status === "delivered") {
        const shippedDate = new Date(orderDate)
        shippedDate.setDate(shippedDate.getDate() + 2)

        events.push({
          date: shippedDate.toISOString(),
          status: "Order Shipped",
          location: order.shippingAddress.city,
          details: `Your order has been shipped via ${order.shippingMethod}.`,
        })
      }

      if (order.status.status === "delivered") {
        const deliveredDate = new Date(orderDate)
        deliveredDate.setDate(deliveredDate.getDate() + 5)

        events.push({
          date: deliveredDate.toISOString(),
          status: "Order Delivered",
          location: `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
          details: "Your order has been delivered successfully.",
        })
      }

      return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    return []
  }

  // Filter orders based on active tab
  const getFilteredOrders = () => {
    if (activeTab === "all") {
      return userOrders
    } else if (activeTab === "active") {
      return userOrders.filter(
        (order) =>
          order.status.status !== "delivered" &&
          order.status.status !== "cancelled" &&
          order.status.status !== "returned",
      )
    } else {
      return userOrders.filter(
        (order) =>
          order.status.status === "delivered" ||
          order.status.status === "cancelled" ||
          order.status.status === "returned",
      )
    }
  }

  return (
    <>
      <Header />
      <TooltipProvider>
        <main className="container px-4 py-8 md:px-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
              <p className="text-muted-foreground">
                {isAuthenticated
                  ? "View and track all your orders in one place"
                  : "Enter your tracking number and email to check your order status"}
              </p>
            </div>

            {/* Show different views based on user state */}
            {isAuthenticated && !order && (
              <>
                {userOrders.length > 0 ? (
                  <div className="space-y-6">
                    <Card className="bg-background/80 backdrop-blur-md">
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <CardTitle>Your Orders</CardTitle>
                            <TooltipInfo
                              content="View and track all your orders. Click on any order to see detailed information."
                              size="sm"
                            />
                          </div>
                          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                            <TabsList>
                              <TabsTrigger value="active">Active</TabsTrigger>
                              <TabsTrigger value="completed">Completed</TabsTrigger>
                              <TabsTrigger value="all">All Orders</TabsTrigger>
                            </TabsList>
                          </Tabs>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {getFilteredOrders().length === 0 ? (
                            <div className="text-center py-8">
                              <p className="text-muted-foreground">No {activeTab} orders found</p>
                            </div>
                          ) : (
                            getFilteredOrders().map((order) => (
                              <div
                                key={order.id}
                                className="border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                                onClick={() => handleViewOrder(order)}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium">{order.id}</h3>
                                      <Badge className={`${getStatusInfo(order.status.status).color}`}>
                                        <span className="flex items-center gap-1">
                                          {getStatusInfo(order.status.status).icon}
                                          <span className="hidden sm:inline">
                                            {order.status.status.charAt(0).toUpperCase() + order.status.status.slice(1)}
                                          </span>
                                        </span>
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      Placed on {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-medium">${order.total.toFixed(2)}</p>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                  </div>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {order.items.slice(0, 3).map((item, index) => (
                                    <div key={index} className="h-10 w-10 rounded-md bg-muted overflow-hidden">
                                      <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ))}
                                  {order.items.length > 3 && (
                                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center text-sm font-medium">
                                      +{order.items.length - 3}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-center">
                      <Button variant="outline" className="rounded-full" asChild>
                        <Link href="/">Continue Shopping</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">No orders found</h3>
                        <p className="mt-2 text-sm text-muted-foreground">You haven't placed any orders yet.</p>
                        <Button asChild className="mt-4 rounded-full">
                          <Link href="/shop">Start Shopping</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}

            {!isAuthenticated && !order && (
              <Card className="bg-background/80 backdrop-blur-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <label htmlFor="tracking-number" className="text-sm font-medium">
                          Tracking Number
                        </label>
                        <TooltipInfo
                          content="Enter the tracking number from your order confirmation email."
                          size="sm"
                        />
                      </div>
                      <Input
                        id="tracking-number"
                        placeholder="Enter your tracking number"
                        value={orderToken}
                        onChange={(e) => setOrderToken(e.target.value)}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <TooltipInfo content="Enter the email address you used when placing the order." size="sm" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={orderEmail}
                        onChange={(e) => setOrderEmail(e.target.value)}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex items-end">
                      <Button onClick={handleTrackOrder} disabled={isLoading} className="w-full md:w-auto rounded-full">
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Tracking...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Search className="mr-2 h-4 w-4" />
                            Track Order
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md text-sm">
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        {error}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      Have an account?{" "}
                      <Link href="/login" className="text-primary hover:underline">
                        Sign in to view all your orders
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {order && (
              <div className="space-y-6">
                {/* Back button */}
                {isAuthenticated && userOrders.length > 0 && (
                  <Button variant="ghost" onClick={handleBackToOrders} className="mb-4 -ml-2">
                    <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
                    Back to all orders
                  </Button>
                )}

                {/* Order Status Card */}
                <Card className="bg-background/80 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">Order #{order.id}</CardTitle>
                        <CardDescription>
                          Placed on {new Date(order.date).toLocaleDateString()} • {order.items.length} items
                        </CardDescription>
                      </div>
                      <Badge className={`${getStatusInfo(order.status.status).color} px-3 py-1.5`}>
                        <span className="flex items-center gap-1.5">
                          {getStatusInfo(order.status.status).icon}
                          {order.status.status.charAt(0).toUpperCase() + order.status.status.slice(1)}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">Shipping Address</h3>
                          <TooltipInfo content="The address where your order will be delivered." size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                          </p>
                          <p>{order.shippingAddress.address}</p>
                          {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                          <p>
                            {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                          </p>
                          <p>{order.shippingAddress.country}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">Shipping Method</h3>
                          <TooltipInfo content="The shipping method you selected for this order." size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>{order.shippingMethod}</p>
                          {order.trackingNumber && (
                            <p className="mt-1">
                              Tracking #: <span className="font-medium text-foreground">{order.trackingNumber}</span>
                            </p>
                          )}
                          {order.status.estimatedDelivery && (
                            <p className="mt-1">
                              Estimated Delivery: {new Date(order.status.estimatedDelivery).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-medium">Payment Information</h3>
                          <TooltipInfo content="Summary of payment details for this order." size="sm" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>Payment Method: {order.paymentMethod}</p>
                          <div className="mt-2">
                            <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
                            <p>Shipping: ${order.shipping.toFixed(2)}</p>
                            <p>Tax: ${order.tax.toFixed(2)}</p>
                            {order.discount && <p>Discount: -${order.discount.toFixed(2)}</p>}
                            <p className="font-medium text-foreground mt-1">Total: ${order.total.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Actions */}
                    {order.status.status !== "cancelled" && order.status.status !== "delivered" && (
                      <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-medium">Order Actions</h3>
                          <TooltipInfo
                            content="Actions available for your order depend on its current status and your account type."
                            size="sm"
                          />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {canCancelOrder(order, isAuthenticated) && (
                            <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="destructive" className="rounded-full">
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel Order
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Cancel Order</DialogTitle>
                                  <DialogDescription>
                                    Please provide a reason for cancellation and select your preferred refund method.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="cancel-reason">Reason for Cancellation</Label>
                                    <Textarea
                                      id="cancel-reason"
                                      placeholder="Please tell us why you're cancelling this order"
                                      value={cancellationReason}
                                      onChange={(e) => setCancellationReason(e.target.value)}
                                      className="min-h-[100px]"
                                    />
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Label>Refund Method</Label>
                                      <TooltipInfo
                                        content="Choose how you'd like to receive your refund. Some options are only available for registered users."
                                        size="sm"
                                      />
                                    </div>
                                    <RadioGroup
                                      value={refundMethod}
                                      onValueChange={(value) => setRefundMethod(value as any)}
                                      className="space-y-3"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="original" id="original" />
                                        <Label htmlFor="original" className="flex items-center gap-2 cursor-pointer">
                                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                                          <div>
                                            <p>Refund to Original Payment Method</p>
                                            <p className="text-xs text-muted-foreground">
                                              Funds will be returned to your original payment method within 3-5 business
                                              days
                                            </p>
                                          </div>
                                        </Label>
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="credit" id="credit" disabled={!isAuthenticated} />
                                        <Label
                                          htmlFor="credit"
                                          className={`flex items-center gap-2 cursor-pointer ${
                                            !isAuthenticated ? "opacity-50" : ""
                                          }`}
                                        >
                                          <RefreshCw className="h-4 w-4 text-muted-foreground" />
                                          <div>
                                            <p>Store Credit</p>
                                            <p className="text-xs text-muted-foreground">
                                              {isAuthenticated
                                                ? "Receive store credit to use on future purchases (processed immediately)"
                                                : "Sign in to use this option"}
                                            </p>
                                          </div>
                                        </Label>
                                      </div>

                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="exchange" id="exchange" disabled={!isAuthenticated} />
                                        <Label
                                          htmlFor="exchange"
                                          className={`flex items-center gap-2 cursor-pointer ${
                                            !isAuthenticated ? "opacity-50" : ""
                                          }`}
                                        >
                                          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                          <div>
                                            <p>Exchange for Another Product</p>
                                            <p className="text-xs text-muted-foreground">
                                              {isAuthenticated
                                                ? "Exchange for another product of equal value"
                                                : "Sign in to use this option"}
                                            </p>
                                          </div>
                                        </Label>
                                      </div>
                                    </RadioGroup>
                                  </div>

                                  {!isAuthenticated && (
                                    <div className="p-3 bg-primary/10 rounded-md border border-primary/20 text-sm">
                                      <p>
                                        <Link href="/login" className="font-medium text-primary hover:underline">
                                          Sign in
                                        </Link>{" "}
                                        to access additional refund options like store credit and product exchanges.
                                      </p>
                                    </div>
                                  )}
                                </div>
                                <DialogFooter>
                                  <Button
                                    variant="outline"
                                    onClick={() => setCancelDialogOpen(false)}
                                    className="rounded-full"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleCancelOrder}
                                    disabled={isProcessingCancel || !cancellationReason}
                                    className="rounded-full"
                                  >
                                    {isProcessingCancel ? "Processing..." : "Confirm Cancellation"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          )}

                          <Button variant="outline" className="rounded-full" asChild>
                            <Link href="/contact">
                              <span className="flex items-center">
                                Contact Support
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </span>
                            </Link>
                          </Button>
                        </div>

                        {order.cancellationDeadline && canCancelOrder(order, isAuthenticated) && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-3">
                            <Clock className="h-3 w-3" />
                            <span>
                              Cancellation available until {new Date(order.cancellationDeadline).toLocaleString()}
                            </span>
                            <TooltipInfo
                              content="After this deadline, you'll need to contact customer support to request cancellation."
                              size="sm"
                            />
                          </div>
                        )}

                        {!isAuthenticated && order.status.status !== "pending" && (
                          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-md text-sm flex items-start gap-2">
                            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <p>
                              Guest users can only cancel orders in "Pending" status. This order is currently in "
                              {order.status.status}" status.
                              <Link href="/login" className="ml-1 font-medium underline">
                                Sign in
                              </Link>{" "}
                              for more options.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Refund Status */}
                    {order.status.status === "cancelled" && order.status.refundStatus && (
                      <div className="mt-6 p-4 border rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2 mb-3">
                          <h3 className="font-medium">Refund Status</h3>
                          <TooltipInfo content="Track the status of your refund after cancellation." size="sm" />
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={
                              order.status.refundStatus === "completed"
                                ? "bg-green-500"
                                : order.status.refundStatus === "processing"
                                  ? "bg-blue-500"
                                  : "bg-yellow-500"
                            }
                          >
                            {order.status.refundStatus.charAt(0).toUpperCase() + order.status.refundStatus.slice(1)}
                          </Badge>
                          <span className="text-sm">
                            ${order.status.refundAmount?.toFixed(2) || order.total.toFixed(2)}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>
                            Refund Method:{" "}
                            {order.status.refundMethod === "original"
                              ? "Original Payment Method"
                              : order.status.refundMethod === "credit"
                                ? "Store Credit"
                                : "Product Exchange"}
                          </p>
                          {order.status.refundMethod === "credit" && (
                            <p className="mt-1 text-primary font-medium">
                              ${order.accountCredit?.toFixed(2)} added to your store credit
                            </p>
                          )}
                          {order.status.refundMethod === "exchange" && order.status.exchangeOrderId && (
                            <p className="mt-1">
                              Exchange Order:{" "}
                              <Link
                                href={`/track-order?token=${token}&email=${email}&exchangeOrder=${order.status.exchangeOrderId}`}
                                className="text-primary hover:underline"
                              >
                                {order.status.exchangeOrderId}
                              </Link>
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tracking Timeline */}
                <Card className="bg-background/80 backdrop-blur-md">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <CardTitle>Tracking Timeline</CardTitle>
                      <TooltipInfo
                        content="This timeline shows the history of your order from placement to delivery."
                        size="sm"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {getTrackingEvents().map((event, index) => (
                        <div key={index} className="relative pl-8">
                          {/* Timeline connector */}
                          {index !== getTrackingEvents().length - 1 && (
                            <div className="absolute left-[15px] top-[24px] bottom-0 w-0.5 bg-muted" />
                          )}

                          {/* Event dot */}
                          <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-primary" />
                          </div>

                          <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                              <h3 className="font-medium">{event.status}</h3>
                              <span className="text-sm text-muted-foreground">
                                {new Date(event.date).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                            <p className="text-sm mt-1">{event.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="bg-background/80 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.productId} className="flex gap-4">
                          <div className="h-16 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size}, Color: {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                            </p>
                            <div className="flex justify-between mt-1">
                              <p className="text-sm">Qty: {item.quantity}</p>
                              <p className="font-medium">${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between">
                  <Button variant="outline" className="rounded-full" asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>

                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full" asChild>
                      <Link href="/contact">
                        <span className="flex items-center">
                          Need Help
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </span>
                      </Link>
                    </Button>

                    {isAuthenticated ? (
                      <Button className="rounded-full" asChild>
                        <Link href="/account?tab=orders">
                          <span className="flex items-center">
                            View All Orders
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </span>
                        </Link>
                      </Button>
                    ) : (
                      <Button className="rounded-full" asChild>
                        <Link href="/login">
                          <span className="flex items-center">
                            Sign In
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </TooltipProvider>
      <Footer />
    </>
  )
}
