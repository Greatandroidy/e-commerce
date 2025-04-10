"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useAuth } from "@/lib/auth"

// Define product types
export type ProductSize = "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL" | "3XL"
export type ProductStyle = "Casual" | "Formal" | "Party" | "Bohemian" | "Vintage" | "Anime" | "Cosplay" | "Streetwear"
export type ProductColor =
  | "purple"
  | "black"
  | "red"
  | "orange"
  | "brown"
  | "green"
  | "blue"
  | "white"
  | "pink"
  | "blue-light"
  | "yellow"
  | "gray"
  | "violet"
  | "mint"
export type ProductCategory =
  | "blouses"
  | "dresses"
  | "denim-jeans"
  | "knitwear"
  | "pants"
  | "skirts"
  | "tops-tees"
  | "jackets-coats"
  | "cosplay"
  | "accessories"
  | "anime-merch"

export interface ProductColorOption {
  id: ProductColor
  label: string
  value: string
}

export interface CategoryOption {
  id: ProductCategory
  label: string
  children: string[]
}

export interface Product {
  id: string
  name: string
  price: number
  image: string
  brand: string
  isNew?: boolean
  category: ProductCategory
  color: ProductColor
  size: ProductSize
  style: ProductStyle
  description?: string
  rating?: number
  images?: string[]
  colors?: ProductColorOption[]
  sizes?: Array<{ id: ProductSize; label: string }>
  discount?: number
  anime?: string
  stock?: number
  isOutOfStock?: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  size: ProductSize
  color: ProductColor
}

interface StoreContextType {
  products: Product[]
  filteredProducts: Product[]
  favorites: string[]
  cart: CartItem[]
  categories: CategoryOption[]
  colors: ProductColorOption[]
  sizes: Array<{ id: ProductSize; label: string }>
  styles: ProductStyle[]
  filters: {
    category: string[]
    color: string[]
    size: string[]
    style: string[]
    priceRange: [number, number]
    anime?: string[]
  }
  currentPage: number
  totalPages: number
  itemsPerPage: number
  setFilters: (filters: StoreContextType["filters"]) => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (count: number) => void
  applyFilters: () => void
  toggleFavorite: (id: string) => void
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateCartItemQuantity: (productId: string, quantity: number) => void
  getProductById: (id: string) => Product | undefined
  getRelatedProducts: (id: string, limit?: number) => Product[]
  getFeaturedProducts: (limit?: number) => Product[]
  getNewArrivals: (limit?: number) => Product[]
  getBestSellers: (limit?: number) => Product[]
  getAnimeCollections: () => string[]
  clearCart: () => void
  isProductInStock: (productId: string) => boolean
  getPaginatedProducts: () => Product[]
}

// Default values
const defaultCategories: CategoryOption[] = [
  { id: "blouses", label: "Blouses", children: ["Sleeveless", "Short Sleeve", "Long Sleeve"] },
  { id: "dresses", label: "Dresses", children: ["Mini", "Midi", "Maxi", "Bodycon"] },
  { id: "denim-jeans", label: "Denim & Jeans", children: ["Skinny", "Straight", "Mom", "Boyfriend"] },
  { id: "knitwear", label: "Knitwear", children: ["Sweaters", "Cardigans", "Pullovers"] },
  { id: "pants", label: "Pants", children: ["Casual", "Formal", "Leggings"] },
  { id: "skirts", label: "Skirts", children: ["Mini", "Midi", "Maxi", "Pleated"] },
  { id: "tops-tees", label: "Tops & Tees", children: ["T-shirts", "Blouses", "Crop Tops"] },
  { id: "jackets-coats", label: "Jackets & Coats", children: ["Blazers", "Denim", "Leather", "Puffer"] },
  { id: "cosplay", label: "Cosplay", children: ["Character", "Accessories", "Wigs"] },
  { id: "accessories", label: "Accessories", children: ["Jewelry", "Bags", "Hats", "Socks"] },
  { id: "anime-merch", label: "Anime Merch", children: ["Figures", "Posters", "Keychains"] },
]

const defaultColors: ProductColorOption[] = [
  { id: "purple", label: "Purple", value: "#9333ea" },
  { id: "black", label: "Black", value: "#000000" },
  { id: "red", label: "Red", value: "#ef4444" },
  { id: "orange", label: "Orange", value: "#f97316" },
  { id: "brown", label: "Brown", value: "#a16207" },
  { id: "green", label: "Green", value: "#22c55e" },
  { id: "blue", label: "Blue", value: "#3b82f6" },
  { id: "white", label: "White", value: "#ffffff" },
  { id: "pink", label: "Pink", value: "#ec4899" },
  { id: "blue-light", label: "Blue Light", value: "#38bdf8" },
  { id: "yellow", label: "Yellow", value: "#facc15" },
  { id: "gray", label: "Gray", value: "#9ca3af" },
  { id: "violet", label: "Violet", value: "#8b5cf6" },
  { id: "mint", label: "Mint", value: "#4ade80" },
]

const defaultSizes = [
  { id: "XXS", label: "XXS" },
  { id: "XS", label: "XS" },
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
  { id: "XL", label: "XL" },
  { id: "XXL", label: "XXL" },
  { id: "3XL", label: "3XL" },
]

const defaultStyles: ProductStyle[] = [
  "Casual",
  "Formal",
  "Party",
  "Bohemian",
  "Vintage",
  "Anime",
  "Cosplay",
  "Streetwear",
]

// Mock data for products
const allProducts: Product[] = [
  {
    id: "raven-top",
    name: "Raven Top With Colored Leaves Design",
    price: 65,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "tops-tees",
    color: "yellow",
    size: "M",
    style: "Casual",
    rating: 4.5,
    description:
      "Eye-catching raven top featuring a colorful leaf design. Perfect for making a statement at parties and special events.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "black", label: "Black", value: "#000000" },
      { id: "yellow", label: "Yellow", value: "#facc15" },
      { id: "pink", label: "Pink", value: "#ec4899" },
      { id: "red", label: "Red", value: "#ef4444" },
    ],
    sizes: [
      { id: "XS", label: "XS" },
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
    ],
    anime: "Original Design",
    stock: 15,
  },
  {
    id: "formal-satin",
    name: "Formal Clothe Satin",
    price: 70,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "dresses",
    color: "black",
    size: "M",
    style: "Formal",
    rating: 4.5,
    description:
      "Elegant formal satin dress perfect for special occasions. Features a flattering silhouette with a subtle sheen that catches the light beautifully.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "black", label: "Black", value: "#000000" },
      { id: "red", label: "Red", value: "#ef4444" },
      { id: "blue", label: "Blue", value: "#3b82f6" },
    ],
    sizes: [
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
    ],
    stock: 8,
  },
  {
    id: "orange-jacket",
    name: "Orange Cotton Jacket",
    price: 60,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "jackets-coats",
    color: "orange",
    size: "L",
    style: "Casual",
    rating: 4.2,
    description:
      "Vibrant orange cotton jacket that adds a pop of color to any outfit. Made from durable cotton with a comfortable fit.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "orange", label: "Orange", value: "#f97316" },
      { id: "yellow", label: "Yellow", value: "#facc15" },
      { id: "red", label: "Red", value: "#ef4444" },
    ],
    sizes: [
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
    ],
    discount: 15,
    stock: 12,
  },
  {
    id: "ruffle-floral",
    name: "Ruffle Floral Print",
    price: 40,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "blouses",
    color: "pink",
    size: "S",
    style: "Bohemian",
    rating: 4.7,
    description:
      "Delicate ruffle floral print blouse with a bohemian flair. Features beautiful floral patterns and elegant ruffle details.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "pink", label: "Pink", value: "#ec4899" },
      { id: "blue-light", label: "Light Blue", value: "#38bdf8" },
      { id: "white", label: "White", value: "#ffffff" },
    ],
    sizes: [
      { id: "XS", label: "XS" },
      { id: "S", label: "S" },
      { id: "M", label: "M" },
    ],
    stock: 0,
    isOutOfStock: true,
  },
  {
    id: "green-sweatshirt",
    name: "Green Sweatshirt",
    price: 50,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    isNew: true,
    category: "tops-tees",
    color: "green",
    size: "XL",
    style: "Casual",
    rating: 4.0,
    description:
      "Comfortable green sweatshirt perfect for casual outings or lounging at home. Made from soft cotton blend material.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "green", label: "Green", value: "#22c55e" },
      { id: "blue", label: "Blue", value: "#3b82f6" },
      { id: "gray", label: "Gray", value: "#9ca3af" },
    ],
    sizes: [
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
      { id: "XXL", label: "XXL" },
    ],
    stock: 20,
  },
  {
    id: "long-sleeve",
    name: "Long Sleeve Shirt",
    price: 70,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "tops-tees",
    color: "blue",
    size: "M",
    style: "Casual",
    rating: 4.3,
    description:
      "Classic long sleeve shirt that's perfect for layering or wearing on its own. Made from high-quality cotton for all-day comfort.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "blue", label: "Blue", value: "#3b82f6" },
      { id: "white", label: "White", value: "#ffffff" },
      { id: "black", label: "Black", value: "#000000" },
    ],
    sizes: [
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
    ],
    stock: 5,
  },
  {
    id: "black-leather",
    name: "Black Leather Jacket",
    price: 80,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "jackets-coats",
    color: "black",
    size: "L",
    style: "Vintage",
    rating: 4.8,
    description:
      "Timeless black leather jacket with a vintage aesthetic. Features quality leather construction and classic styling details.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "black", label: "Black", value: "#000000" },
      { id: "brown", label: "Brown", value: "#a16207" },
    ],
    sizes: [
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
    ],
    stock: 3,
  },
  {
    id: "short-sleeve",
    name: "Short Sleeve Blouse",
    price: 30,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "blouses",
    color: "white",
    size: "S",
    style: "Formal",
    rating: 4.1,
    description:
      "Elegant short sleeve blouse suitable for professional settings. Features a clean design with a comfortable fit.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "white", label: "White", value: "#ffffff" },
      { id: "blue-light", label: "Light Blue", value: "#38bdf8" },
      { id: "pink", label: "Pink", value: "#ec4899" },
    ],
    sizes: [
      { id: "XS", label: "XS" },
      { id: "S", label: "S" },
      { id: "M", label: "M" },
    ],
    discount: 10,
    stock: 0,
    isOutOfStock: true,
  },
  {
    id: "naruto-hoodie",
    name: "Naruto Uzumaki Hoodie",
    price: 75,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "tops-tees",
    color: "orange",
    size: "L",
    style: "Anime",
    rating: 4.9,
    description:
      "Show your love for Naruto with this premium quality hoodie featuring the iconic Uzumaki clan symbol. Perfect for anime fans and casual wear.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "orange", label: "Orange", value: "#f97316" },
      { id: "black", label: "Black", value: "#000000" },
    ],
    sizes: [
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
    ],
    anime: "Naruto",
    isNew: true,
    stock: 25,
  },
  {
    id: "demon-slayer-tshirt",
    name: "Demon Slayer Corps T-Shirt",
    price: 45,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "tops-tees",
    color: "black",
    size: "M",
    style: "Anime",
    rating: 4.7,
    description:
      "Official Demon Slayer merchandise featuring the Demon Slayer Corps emblem. Made with premium cotton for comfort and durability.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "black", label: "Black", value: "#000000" },
      { id: "green", label: "Green", value: "#22c55e" },
    ],
    sizes: [
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
    ],
    anime: "Demon Slayer",
    stock: 18,
  },
  {
    id: "sailor-moon-dress",
    name: "Sailor Moon Inspired Dress",
    price: 85,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "dresses",
    color: "blue",
    size: "S",
    style: "Cosplay",
    rating: 4.6,
    description:
      "Channel your inner Sailor Scout with this Sailor Moon inspired dress. Perfect for conventions or casual cosplay days.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [
      { id: "blue", label: "Blue", value: "#3b82f6" },
      { id: "red", label: "Red", value: "#ef4444" },
      { id: "green", label: "Green", value: "#22c55e" },
    ],
    sizes: [
      { id: "XS", label: "XS" },
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
    ],
    anime: "Sailor Moon",
    stock: 7,
  },
  {
    id: "attack-titan-jacket",
    name: "Survey Corps Jacket",
    price: 95,
    image: "/placeholder.svg",
    brand: "AnimeFreak",
    category: "jackets-coats",
    color: "brown",
    size: "M",
    style: "Cosplay",
    rating: 4.8,
    description:
      "Join the Survey Corps with this high-quality replica jacket from Attack on Titan. Features detailed embroidery and authentic design.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    colors: [{ id: "brown", label: "Brown", value: "#a16207" }],
    sizes: [
      { id: "S", label: "S" },
      { id: "M", label: "M" },
      { id: "L", label: "L" },
      { id: "XL", label: "XL" },
    ],
    anime: "Attack on Titan",
    discount: 20,
    stock: 2,
  },
]

// Create the context
const StoreContext = createContext<StoreContextType | undefined>(undefined)

// Provider component
export function StoreProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [products] = useState<Product[]>(allProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [filters, setFilters] = useState<StoreContextType["filters"]>({
    category: [],
    color: [],
    size: [],
    style: [],
    priceRange: [0, 100],
    anime: [],
  })

  // Load cart and favorites from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("animefreak_cart")
    const storedFavorites = localStorage.getItem("animefreak_favorites")

    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (error) {
        console.error("Failed to parse stored cart:", error)
        localStorage.removeItem("animefreak_cart")
      }
    }

    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse stored favorites:", error)
        localStorage.removeItem("animefreak_favorites")
      }
    }
  }, [])

  // Save cart and favorites to localStorage when they change
  useEffect(() => {
    // Only save to localStorage if user is not authenticated
    if (!isAuthenticated) {
      localStorage.setItem("animefreak_cart", JSON.stringify(cart))
    }
  }, [cart, isAuthenticated])

  useEffect(() => {
    // Only save to localStorage if user is not authenticated
    if (!isAuthenticated) {
      localStorage.setItem("animefreak_favorites", JSON.stringify(favorites))
    }
  }, [favorites, isAuthenticated])

  // Apply filters to products
  const applyFilters = () => {
    let result = [...products]

    // Category filter
    if (filters.category.length > 0) {
      result = result.filter((product) =>
        filters.category.some((cat) => {
          // Handle parent categories and subcategories
          if (cat.includes("-")) {
            const [parent, sub] = cat.split("-")
            return product.category === parent
          }
          return product.category === cat
        }),
      )
    }

    // Color filter
    if (filters.color.length > 0) {
      result = result.filter((product) => filters.color.includes(product.color))
    }

    // Size filter
    if (filters.size.length > 0) {
      result = result.filter((product) => filters.size.includes(product.size))
    }

    // Style filter
    if (filters.style.length > 0) {
      result = result.filter((product) => filters.style.includes(product.style))
    }

    // Anime filter
    if (filters.anime && filters.anime.length > 0) {
      result = result.filter((product) => product.anime && filters.anime?.includes(product.anime))
    }

    // Price filter
    const minPrice = filters.priceRange[0] * 8
    const maxPrice = filters.priceRange[1] * 8
    result = result.filter((product) => product.price >= minPrice && product.price <= maxPrice)

    setFilteredProducts(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  // Add item to cart
  const addToCart = (item: CartItem) => {
    // Check if product is in stock
    const product = products.find((p) => p.id === item.productId)
    if (product?.isOutOfStock || (product?.stock !== undefined && product.stock <= 0)) {
      return false
    }

    setCart((current) => {
      const existingItem = current.find((cartItem) => cartItem.productId === item.productId)
      if (existingItem) {
        return current.map((cartItem) =>
          cartItem.productId === item.productId
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        )
      }
      return [...current, item]
    })

    return true
  }

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId))
  }

  // Update cart item quantity
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    setCart((current) => current.map((item) => (item.productId === productId ? { ...item, quantity } : item)))
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Check if product is in stock
  const isProductInStock = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    return !(product?.isOutOfStock || (product?.stock !== undefined && product.stock <= 0))
  }

  // Get product by ID
  const getProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  // Get related products
  const getRelatedProducts = (id: string, limit = 4) => {
    const product = getProductById(id)
    if (!product) return []

    return products
      .filter(
        (p) =>
          p.id !== id && (p.category === product.category || p.style === product.style || p.anime === product.anime),
      )
      .slice(0, limit)
  }

  // Get featured products
  const getFeaturedProducts = (limit = 8) => {
    return products
      .filter((product) => product.rating && product.rating >= 4.5)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit)
  }

  // Get new arrivals
  const getNewArrivals = (limit = 8) => {
    return products.filter((product) => product.isNew).slice(0, limit)
  }

  // Get best sellers
  const getBestSellers = (limit = 8) => {
    // In a real app, this would be based on sales data
    return products.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, limit)
  }

  // Get anime collections
  const getAnimeCollections = () => {
    const animes = products.filter((product) => product.anime).map((product) => product.anime as string)
    return [...new Set(animes)]
  }

  // Get paginated products
  const getPaginatedProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  // Apply filters when they change
  useEffect(() => {
    applyFilters()
  }, [filters])

  const value = {
    products,
    filteredProducts,
    favorites,
    cart,
    categories: defaultCategories,
    colors: defaultColors,
    sizes: defaultSizes,
    styles: defaultStyles,
    filters,
    currentPage,
    totalPages,
    itemsPerPage,
    setFilters,
    setCurrentPage,
    setItemsPerPage,
    applyFilters,
    toggleFavorite,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getProductById,
    getRelatedProducts,
    getFeaturedProducts,
    getNewArrivals,
    getBestSellers,
    getAnimeCollections,
    clearCart,
    isProductInStock,
    getPaginatedProducts,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// Custom hook to use the store context
export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
