// Types for order tracking
export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  email: string
}

export interface OrderStatus {
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"
  updatedAt: string
  details?: string
  location?: string
  estimatedDelivery?: string
  cancellationReason?: string
  refundStatus?: "pending" | "processing" | "completed" | "denied"
  refundMethod?: "original" | "credit" | "exchange"
  refundAmount?: number
  exchangeOrderId?: string
}

export interface TrackingEvent {
  date: string
  status: string
  location: string
  details: string
}

export interface Order {
  id: string
  token: string
  email: string
  phone?: string
  date: string
  items: OrderItem[]
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount?: number
  paymentMethod: string
  shippingMethod: string
  shippingAddress: ShippingAddress
  status: OrderStatus
  trackingNumber?: string
  trackingEvents?: TrackingEvent[]
  expiresAt: string
  accountCredit?: number
  canCancel: boolean
  cancellationDeadline?: string
  isLinkedToAccount?: boolean
}

// Generate a unique order ID
export const generateOrderId = (): string => {
  return `ORD-${Math.floor(100000 + Math.random() * 900000)}`
}

// Generate a unique tracking token
export const generateTrackingToken = (): string => {
  return Array.from(
    { length: 24 },
    () => "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 62)],
  ).join("")
}

// Save order to localStorage
export const saveOrder = (order: Order): void => {
  try {
    localStorage.setItem(`order_${order.id}`, JSON.stringify(order))
  } catch (error) {
    console.error("Failed to save order:", error)
  }
}

// Get order by token and email
export const getOrderByToken = (token: string, email: string): Order | null => {
  try {
    const orders = getAllOrders()
    return orders.find((order) => order.token === token && order.email === email) || null
  } catch (error) {
    console.error("Failed to get order:", error)
    return null
  }
}

// Get order by ID
export const getOrderById = (orderId: string): Order | null => {
  try {
    const orders = getAllOrders()
    return orders.find((order) => order.id === orderId) || null
  } catch (error) {
    console.error("Failed to get order:", error)
    return null
  }
}

// Get all orders for a specific email
export function getOrdersByEmail(email: string): Order[] {
  try {
    // Get all orders from localStorage
    const allOrders = getAllOrders()

    // Filter orders by email
    return allOrders.filter((order) => order.email === email)
  } catch (error) {
    console.error("Error getting orders by email:", error)
    return []
  }
}

// Get all orders for a specific phone
export const getOrdersByPhone = (phone: string): Order[] => {
  try {
    const orders = getAllOrders()
    return orders.filter((order) => order.phone === phone)
  } catch (error) {
    console.error("Failed to get orders:", error)
    return []
  }
}

// Helper function to get all orders
function getAllOrders(): Order[] {
  try {
    const orders: Order[] = []

    // Iterate through localStorage to find all orders
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith("order_")) {
        const orderData = localStorage.getItem(key)
        if (orderData) {
          try {
            const order = JSON.parse(orderData)
            orders.push(order)
          } catch (e) {
            console.error("Error parsing order data:", e)
          }
        }
      }
    }

    return orders
  } catch (error) {
    console.error("Error getting all orders:", error)
    return []
  }
}

// Check if order is expired
export const isOrderExpired = (order: Order): boolean => {
  const expiryDate = new Date(order.expiresAt)
  const now = new Date()
  return now > expiryDate
}

// Calculate expiry date (30 days from order date or immediately after delivery)
export const calculateExpiryDate = (orderDate: string, status: string): string => {
  const date = new Date(orderDate)

  // If delivered, expire in 7 days
  if (status === "delivered") {
    date.setDate(date.getDate() + 7)
  } else {
    // Otherwise expire in 30 days
    date.setDate(date.getDate() + 30)
  }

  return date.toISOString()
}

// Update order status
export const updateOrderStatus = (orderId: string, status: OrderStatus["status"], details?: string): boolean => {
  try {
    const orders = getAllOrders()
    const orderIndex = orders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) return false

    // Update the order status
    orders[orderIndex].status = {
      ...orders[orderIndex].status,
      status,
      updatedAt: new Date().toISOString(),
      details: details || orders[orderIndex].status.details,
    }

    // If status is delivered, update expiry date
    if (status === "delivered") {
      orders[orderIndex].expiresAt = calculateExpiryDate(orders[orderIndex].date, "delivered")
    }

    // Save back to localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orders[orderIndex]))
    return true
  } catch (error) {
    console.error("Failed to update order status:", error)
    return false
  }
}

// Check if a user can cancel an order
export const canCancelOrder = (order: Order, isLoggedIn: boolean): boolean => {
  // Check if order is already cancelled or delivered
  if (
    order.status.status === "cancelled" ||
    order.status.status === "delivered" ||
    order.status.status === "returned"
  ) {
    return false
  }

  // Non-logged in users can only cancel orders in "pending" status
  if (!isLoggedIn && order.status.status !== "pending") {
    return false
  }

  // Check if cancellation is explicitly allowed
  if (!order.canCancel) return false

  // Check if past cancellation deadline
  if (order.cancellationDeadline) {
    const deadline = new Date(order.cancellationDeadline)
    const now = new Date()
    if (now > deadline) return false
  }

  return true
}

// Cancel an order
export const cancelOrder = (
  orderId: string,
  reason: string,
  refundMethod: "original" | "credit" | "exchange" = "original",
  isLoggedIn = false,
): boolean => {
  try {
    const orders = getAllOrders()
    const orderIndex = orders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) return false

    // Check if order can be cancelled
    if (!canCancelOrder(orders[orderIndex], isLoggedIn)) return false

    // Update the order status
    orders[orderIndex].status = {
      ...orders[orderIndex].status,
      status: "cancelled",
      updatedAt: new Date().toISOString(),
      cancellationReason: reason,
      refundStatus: "pending",
      refundMethod,
      refundAmount: orders[orderIndex].total,
    }

    // If refund method is credit, add to account credit (only for logged in users)
    if (refundMethod === "credit" && isLoggedIn) {
      orders[orderIndex].accountCredit = orders[orderIndex].total
    }

    // Add tracking event
    if (!orders[orderIndex].trackingEvents) {
      orders[orderIndex].trackingEvents = []
    }

    orders[orderIndex].trackingEvents.unshift({
      date: new Date().toISOString(),
      status: "Order Cancelled",
      location: "Customer Service",
      details: `Order cancelled. Reason: ${reason}. Refund will be processed via ${
        refundMethod === "original"
          ? "original payment method"
          : refundMethod === "credit"
            ? "account credit"
            : "product exchange"
      }.`,
    })

    // Save back to localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orders[orderIndex]))
    return true
  } catch (error) {
    console.error("Failed to cancel order:", error)
    return false
  }
}

// Process refund (simulate)
export const processRefund = (orderId: string): boolean => {
  try {
    const orders = getAllOrders()
    const orderIndex = orders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) return false

    // Check if order is cancelled and refund is pending
    if (orders[orderIndex].status.status !== "cancelled" || orders[orderIndex].status.refundStatus !== "pending") {
      return false
    }

    // Update refund status
    orders[orderIndex].status.refundStatus = "completed"

    // Add tracking event
    if (!orders[orderIndex].trackingEvents) {
      orders[orderIndex].trackingEvents = []
    }

    orders[orderIndex].trackingEvents.unshift({
      date: new Date().toISOString(),
      status: "Refund Processed",
      location: "Finance Department",
      details: `Refund of ${orders[orderIndex].status.refundAmount?.toFixed(2)} has been processed via ${
        orders[orderIndex].status.refundMethod === "original"
          ? "original payment method"
          : orders[orderIndex].status.refundMethod === "credit"
            ? "account credit"
            : "product exchange"
      }.`,
    })

    // Save back to localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orders[orderIndex]))
    return true
  } catch (error) {
    console.error("Failed to process refund:", error)
    return false
  }
}

// Add tracking event to order
export const addTrackingEvent = (orderId: string, event: TrackingEvent): boolean => {
  try {
    const orders = getAllOrders()
    const orderIndex = orders.findIndex((order) => order.id === orderId)

    if (orderIndex === -1) return false

    // Initialize tracking events array if it doesn't exist
    if (!orders[orderIndex].trackingEvents) {
      orders[orderIndex].trackingEvents = []
    }

    // Add new tracking event
    orders[orderIndex].trackingEvents = [event, ...(orders[orderIndex].trackingEvents || [])]

    // Save back to localStorage
    localStorage.setItem(`order_${orderId}`, JSON.stringify(orders[orderIndex]))
    return true
  } catch (error) {
    console.error("Failed to add tracking event:", error)
    return false
  }
}

// Clean up expired orders
export const cleanupExpiredOrders = (): void => {
  try {
    const orders = getAllOrders()
    const now = new Date()

    // Filter out expired orders
    const validOrders = orders.filter((order) => {
      const expiryDate = new Date(order.expiresAt)
      return now <= expiryDate
    })

    // Save back to localStorage if there are changes
    if (validOrders.length !== orders.length) {
      localStorage.clear()
      validOrders.forEach((order) => localStorage.setItem(`order_${order.id}`, JSON.stringify(order)))
    }
  } catch (error) {
    console.error("Failed to cleanup expired orders:", error)
  }
}

// Simulate order progression (for demo purposes)
export const simulateOrderProgression = (): void => {
  try {
    const orders = getAllOrders()
    const now = new Date()
    let hasChanges = false

    orders.forEach((order, index) => {
      // Skip cancelled or delivered orders
      if (
        order.status.status === "cancelled" ||
        order.status.status === "delivered" ||
        order.status.status === "returned"
      ) {
        return
      }

      // Calculate time since last update
      const lastUpdate = new Date(order.status.updatedAt)
      const minutesSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60))

      // Only progress if at least 5 minutes have passed
      if (minutesSinceUpdate >= 5) {
        hasChanges = true

        // Progress the order status
        if (order.status.status === "pending") {
          orders[index].status.status = "processing"
          orders[index].status.updatedAt = now.toISOString()
          orders[index].status.details = "Your order is being prepared for shipping."

          // Add tracking event
          if (!orders[index].trackingEvents) {
            orders[index].trackingEvents = []
          }

          orders[index].trackingEvents.unshift({
            date: now.toISOString(),
            status: "Order Processing",
            location: "Distribution Center",
            details: "Your order has been processed and is being prepared for shipping.",
          })

          // Update cancellation ability
          orders[index].canCancel = true

          // Set cancellation deadline to 24 hours from now
          const cancellationDeadline = new Date(now)
          cancellationDeadline.setHours(cancellationDeadline.getHours() + 24)
          orders[index].cancellationDeadline = cancellationDeadline.toISOString()
        } else if (order.status.status === "processing") {
          orders[index].status.status = "shipped"
          orders[index].status.updatedAt = now.toISOString()
          orders[index].status.details = `Your order has been shipped via ${order.shippingMethod}.`

          // Add tracking event
          if (!orders[index].trackingEvents) {
            orders[index].trackingEvents = []
          }

          orders[index].trackingEvents.unshift({
            date: now.toISOString(),
            status: "Order Shipped",
            location: "Distribution Center",
            details: `Your order has been shipped via ${order.shippingMethod} with tracking number ${order.trackingNumber}.`,
          })

          // Update cancellation ability (can't cancel once shipped)
          orders[index].canCancel = false
        } else if (order.status.status === "shipped") {
          orders[index].status.status = "delivered"
          orders[index].status.updatedAt = now.toISOString()
          orders[index].status.details = "Your order has been delivered successfully."

          // Add tracking event
          if (!orders[index].trackingEvents) {
            orders[index].trackingEvents = []
          }

          orders[index].trackingEvents.unshift({
            date: now.toISOString(),
            status: "Order Delivered",
            location: `${order.shippingAddress.city}, ${order.shippingAddress.state}`,
            details: "Your order has been delivered successfully.",
          })

          // Update expiry date
          orders[index].expiresAt = calculateExpiryDate(order.date, "delivered")
        }
      }
    })

    // Save back to localStorage if there are changes
    if (hasChanges) {
      localStorage.clear()
      orders.forEach((order) => localStorage.setItem(`order_${order.id}`, JSON.stringify(order)))
    }
  } catch (error) {
    console.error("Failed to simulate order progression:", error)
  }
}

// Get account credit for a user
export const getAccountCredit = (email: string): number => {
  try {
    const orders = getAllOrders()

    // Sum up all account credits for this email
    return orders
      .filter((order) => order.email === email && order.accountCredit && order.accountCredit > 0)
      .reduce((total, order) => total + (order.accountCredit || 0), 0)
  } catch (error) {
    console.error("Failed to get account credit:", error)
    return 0
  }
}

// Link orders to account
export const linkOrdersToAccount = (email: string, phone: string | undefined, orderIds: string[]): boolean => {
  try {
    const orders = getAllOrders()
    let hasChanges = false

    orders.forEach((order, index) => {
      if (orderIds.includes(order.id)) {
        orders[index].isLinkedToAccount = true
        hasChanges = true
      }
    })

    // Save back to localStorage if there are changes
    if (hasChanges) {
      localStorage.clear()
      orders.forEach((order) => localStorage.setItem(`order_${order.id}`, JSON.stringify(order)))
      return true
    }

    return false
  } catch (error) {
    console.error("Failed to link orders to account:", error)
    return false
  }
}
