import type { Order } from "./order-tracking"
import { getOrdersByEmail, getOrdersByPhone, linkOrdersToAccount } from "./order-tracking"

interface User {
  email: string
  phone?: string
}

// Find orders that match the user's email or phone
export const findMatchingOrders = (user: User): Order[] => {
  const emailOrders = getOrdersByEmail(user.email)
  const phoneOrders = user.phone ? getOrdersByPhone(user.phone) : []

  // Combine and deduplicate orders
  const allOrders = [...emailOrders, ...phoneOrders]
  const uniqueOrders = allOrders.filter((order, index, self) => index === self.findIndex((o) => o.id === order.id))

  // Filter out orders that are already linked to an account
  return uniqueOrders.filter((order) => !order.isLinkedToAccount)
}

// Store verification codes in localStorage (for demo purposes)
const VERIFICATION_STORAGE_KEY = "animefreak_verification_codes"

// Generate a verification code (for demo purposes, always return 123456)
export const generateVerificationCode = (): string => {
  return "123456"
}

// Store verification code
export const storeVerificationCode = (identifier: string, code: string): void => {
  try {
    const codesJson = localStorage.getItem(VERIFICATION_STORAGE_KEY)
    const codes = codesJson ? JSON.parse(codesJson) : {}

    codes[identifier] = {
      code,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 minutes
    }

    localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify(codes))
  } catch (error) {
    console.error("Failed to store verification code:", error)
  }
}

// Verify code
export const verifyCode = (identifier: string, code: string): boolean => {
  try {
    const codesJson = localStorage.getItem(VERIFICATION_STORAGE_KEY)
    if (!codesJson) return false

    const codes = JSON.parse(codesJson)
    const storedData = codes[identifier]

    if (!storedData) return false

    // Check if code is expired
    const expiryDate = new Date(storedData.expiresAt)
    const now = new Date()
    if (now > expiryDate) return false

    // Check if code matches
    return storedData.code === code
  } catch (error) {
    console.error("Failed to verify code:", error)
    return false
  }
}

// Clear verification code
export const clearVerificationCode = (identifier: string): void => {
  try {
    const codesJson = localStorage.getItem(VERIFICATION_STORAGE_KEY)
    if (!codesJson) return

    const codes = JSON.parse(codesJson)
    delete codes[identifier]

    localStorage.setItem(VERIFICATION_STORAGE_KEY, JSON.stringify(codes))
  } catch (error) {
    console.error("Failed to clear verification code:", error)
  }
}

// Link orders to account
export const linkOrdersToUserAccount = (user: User, orderIds: string[]): boolean => {
  try {
    const success = linkOrdersToAccount(user.email, user.phone, orderIds)

    // If successful, update the user's order history in localStorage
    if (success) {
      const userOrdersKey = `user_orders_${user.email}`
      const existingOrdersJson = localStorage.getItem(userOrdersKey)
      const existingOrders = existingOrdersJson ? JSON.parse(existingOrdersJson) : []

      // Add new order IDs
      const updatedOrders = [...new Set([...existingOrders, ...orderIds])]

      // Save back to localStorage
      localStorage.setItem(userOrdersKey, JSON.stringify(updatedOrders))
    }

    return success
  } catch (error) {
    console.error("Failed to link orders to account:", error)
    return false
  }
}

// Get all orders linked to a user account
export const getUserOrders = (email: string): string[] => {
  try {
    const userOrdersKey = `user_orders_${email}`
    const ordersJson = localStorage.getItem(userOrdersKey)
    return ordersJson ? JSON.parse(ordersJson) : []
  } catch (error) {
    console.error("Failed to get user orders:", error)
    return []
  }
}
