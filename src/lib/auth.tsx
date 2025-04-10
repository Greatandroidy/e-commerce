"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user types
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
}

// Demo user
const DEMO_USER: User = {
  id: "demo-user-1",
  email: "demo@animefreak.com",
  name: "Demo User",
  avatar: "/placeholder-user.jpg",
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("animefreak_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("animefreak_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would be an API call
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === DEMO_USER.email && password === "password") {
      setUser(DEMO_USER)
      localStorage.setItem("animefreak_user", JSON.stringify(DEMO_USER))
      setIsLoading(false)
      return { success: true, message: "Login successful" }
    }

    setIsLoading(false)
    return { success: false, message: "Invalid email or password" }
  }

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    // In a real app, this would be an API call
    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if email is already in use (demo user)
    if (email === DEMO_USER.email) {
      setIsLoading(false)
      return { success: false, message: "Email already in use" }
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      avatar: "/placeholder-user.jpg",
    }

    setUser(newUser)
    localStorage.setItem("animefreak_user", JSON.stringify(newUser))
    setIsLoading(false)
    return { success: true, message: "Account created successfully" }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("animefreak_user")
    // Don't clear cart/wishlist as we want to persist those
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
