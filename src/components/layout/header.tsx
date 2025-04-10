"use client"

import type React from "react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Heart, LogIn, LogOut, Menu, Search, ShoppingCart, User } from "lucide-react"

import { cn } from "@/lib/utils"
import { useStore } from "@/lib/store"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { WishlistSidebar } from "@/components/shop/wishlist-sidebar"
import { CartSidebar } from "@/components/shop/cart-sidebar"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { SearchModal } from "@/components/search/search-modal"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LogoutDialog } from "@/components/auth/logout-dialog"

const mainNavItems = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "Women", href: "/shop?category=women" },
  { title: "Men", href: "/shop?category=men" },
  { title: "Anime Collections", href: "/collections" },
  { title: "Cosplay", href: "/shop?category=cosplay" },
  { title: "New Arrivals", href: "/shop?category=new" },
  { title: "Sale", href: "/shop?category=sale" },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart, favorites } = useStore()
  const { user, isAuthenticated, logout } = useAuth()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Handle scroll effect for transparent header
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isScrolled])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
    }
  }

  const handleSearchClick = () => {
    if (isMobile) {
      router.push("/search")
    } else {
      setIsSearchModalOpen(true)
    }
  }

  // Remove this function
  // const handleLogout = () => {
  //   logout()
  //   router.push("/")
  // }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-background/70 backdrop-blur-md border-b shadow-sm" : "bg-background/30 backdrop-blur-md",
        )}
      >
        <div className="container flex h-16 items-center">
          <Sheet>
            <SheetTrigger asChild className="mr-2 md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] backdrop-blur-lg bg-background/80">
              <div className="flex flex-col gap-6 py-4">
                <Link href="/" className="flex items-center gap-2">
                  <span className="font-bold text-xl text-primary">AnimeFreak</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-lg transition-colors hover:text-foreground/80",
                        pathname === item.href ? "text-foreground font-semibold" : "text-foreground/60",
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto space-y-4">
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Account</h3>
                    {isAuthenticated ? (
                      <>
                        <Link href="/account" className="text-muted-foreground hover:text-foreground">
                          My Account
                        </Link>
                        <Link href="/orders" className="text-muted-foreground hover:text-foreground">
                          Orders
                        </Link>
                        <Link href="/wishlist" className="text-muted-foreground hover:text-foreground">
                          Wishlist
                        </Link>
                        <button onClick={() => {}} className="text-left text-muted-foreground hover:text-foreground">
                          {/* Logout */}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="text-muted-foreground hover:text-foreground">
                          Login
                        </Link>
                        <Link href="/signup" className="text-muted-foreground hover:text-foreground">
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-medium">Help</h3>
                    <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                    <Link href="/faq" className="text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold text-xl text-primary">AnimeFreak</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === item.href ? "text-foreground font-semibold" : "text-foreground/60",
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex md:hidden">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-primary">AnimeFreak</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block w-full flex-1 md:w-auto md:flex-none">
              <Button
                variant="outline"
                className="w-full md:w-[200px] lg:w-[300px] justify-start text-muted-foreground rounded-full bg-background/50 backdrop-blur-sm border-muted"
                onClick={handleSearchClick}
              >
                <Search className="mr-2 h-4 w-4" />
                Search...
              </Button>
            </div>

            {/* Mobile Search Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleSearchClick}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </div>

            <nav className="flex items-center space-x-2">
              {/* Theme Switcher */}
              <ThemeSwitcher />

              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsWishlistOpen(true)}>
                <div className="relative">
                  <Heart className="h-5 w-5" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {favorites.length}
                    </span>
                  )}
                </div>
                <span className="sr-only">Wishlist</span>
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsCartOpen(true)}>
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {cart.length}
                    </span>
                  )}
                </div>
                <span className="sr-only">Cart</span>
              </Button>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder-user.jpg"} alt={user?.name || "User"} />
                        <AvatarFallback>
                          {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                        </AvatarFallback>
                      </Avatar>
                      <span className="sr-only">Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background/80 backdrop-blur-lg">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/account")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/orders")}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4"
                      >
                        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
                        <path d="M9 9h1" />
                        <path d="M9 13h6" />
                        <path d="M9 17h6" />
                      </svg>
                      <span>Orders</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsWishlistOpen(true)}>
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <LogoutDialog>
                        <button className="flex w-full items-center px-2 py-1.5 text-sm">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </button>
                      </LogoutDialog>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" asChild className="rounded-full">
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} />

      {/* Wishlist Sidebar */}
      <WishlistSidebar open={isWishlistOpen} onOpenChange={setIsWishlistOpen} />

      {/* Cart Sidebar */}
      <CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
