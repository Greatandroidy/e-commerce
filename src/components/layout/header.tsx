"use client"

import React, { useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useCallback, useMemo } from "react"
import { LogIn, LogOut, Menu, Package, Search, Settings, ShoppingCart, User } from "lucide-react"
import debounce from "lodash/debounce"

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
import { CartSidebar } from "@/components/shop/cart-sidebar"
import { SearchModal } from "@/components/search/search-modal"
import { useMediaQuery } from "@/hooks/use-media-query"
import { LogoutDialog } from "@/components/auth/logout-dialog"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


// Define collections data
const collections = [
  {
    title: "Anime Series",
    href: "/collections/anime-series",
    description: "Browse products from your favorite anime series",
  },
  {
    title: "Character Collections",
    href: "/collections/characters",
    description: "Find merchandise featuring your favorite characters",
  },
  {
    title: "Limited Editions",
    href: "/collections/limited-editions",
    description: "Exclusive and limited edition anime merchandise",
  },
  {
    title: "New Arrivals",
    href: "/collections/new-arrivals",
    description: "Check out our latest anime merchandise",
  },
] as const

// Memoize mainNavItems to prevent recreation on each render
const mainNavItems = [
  { title: "Home", href: "/" },/* 
  { title: "Shop", href: "/shop" }, */
  { title: "Women", href: "/shop?category=women" },
  { title: "Men", href: "/shop?category=men" },
  { title: "Anime Collections", href: "/collections" },
  /*   { title: "Cosplay", href: "/shop?category=cosplay" },
    { title: "New Arrivals", href: "/shop?category=new" },
    { title: "Sale", href: "/shop?category=sale" }, */
] as const

// Memoized Navigation Link Component
const NavLink = React.memo(({
  href,
  title,
  pathname
}: {
  href: string;
  title: string;
  pathname: string
}) => (
  <Link
    href={href}
    className={cn(
      "transition-colors hover:text-foreground/80",
      pathname === href ? "text-foreground font-semibold" : "text-foreground/60",
    )}
  >
    {title}
  </Link>
))

// Memoized Mobile Menu Component
const MobileMenu = React.memo(({
  isAuthenticated,
  pathname
}: {
  isAuthenticated: boolean;
  pathname: string
}) => (
  <Sheet>
    <SheetTrigger asChild className="mr-2 md:hidden">
      <Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle menu">
        <Menu className="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="w-[300px] sm:w-[350px] backdrop-blur-lg bg-background/80">
      <div className="flex flex-col gap-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl text-primary">AnimeFreak</span>
        </Link>
        <nav className="flex flex-col gap-4">
          {mainNavItems.map((item) => (
            <NavLink key={item.href} href={item.href} title={item.title} pathname={pathname} />
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
                <LogoutDialog />
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
        </div>
      </div>
    </SheetContent>
  </Sheet>
))

// Memoized User Menu Component
const UserMenu = React.memo(({
  user,
  isAuthenticated,
  getUserInitials,
  setIsLogoutDialogOpen
}: {
  user: any;
  isAuthenticated: boolean;
  getUserInitials: () => string;
  setIsLogoutDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt={user?.name || "User avatar"} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/account" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Account</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/orders" className="cursor-pointer">
            <Package className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setIsLogoutDialogOpen(true)}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild variant="outline" size="sm">
      <Link href="/login">Login</Link>
    </Button>
  )
))

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useStore()
  const { user, isAuthenticated, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Debounced scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      const scrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled)
      }
    }, 100),
    [isScrolled]
  )

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + S to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault()
        setIsSearchOpen(true)
      }

      // Escape to close all dialogs
      if (e.key === "Escape") {
        setIsSearchOpen(false)
        setIsCartOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      handleScroll.cancel()
    }
  }, [handleScroll])

  // Memoize cart count
  const cartCount = useMemo(() => cart.length, [cart])

  const handleSearchClick = () => {
    setIsSearchOpen(true)
  }

  const handleSearchClose = () => {
    setIsSearchOpen(false)
    setSearchQuery("")
  }

  const handleSearchInputClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSearchOpen(true)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
    }
  }

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.name) return "U"
    return user.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled ? "bg-background/70 backdrop-blur-md border-b shadow-sm" : "bg-background/30 backdrop-blur-md",
        )}
      >
        <div className="container flex h-16 items-center gap-4">
          <MobileMenu isAuthenticated={isAuthenticated} pathname={pathname} />

          <div className="mr-4 hidden md:flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl text-primary">AnimeFreak</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/shop" passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Shop</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {collections.map((collection) => (
                          <li key={collection.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={collection.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">{collection.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  {collection.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/faq" passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>FAQ</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link href="/contact" passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              {mainNavItems.map((item) => (
                <NavLink key={item.href} href={item.href} title={item.title} pathname={pathname} />
              ))}
            </nav>
          </div>

          <div className="flex md:hidden">
            <Link href="/" className="flex items-center">
              <span className="font-bold text-xl text-primary">AnimeFreak</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2">
            {!isMobile && (
              <div className="hidden md:block">
                <div
                  className="relative w-[300px] cursor-pointer"
                  onClick={handleSearchInputClick}
                >
                  <Input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search products..."
                    className="w-full"
                    value={searchQuery}
                    readOnly
                  />
                  <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <kbd className="pointer-events-none absolute right-10 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>S
                  </kbd>
                </div>
              </div>
            )}

            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={handleSearchClick}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {cartCount}
                  </span>
                )}
              </div>
            </Button>

            <UserMenu
              user={user}
              isAuthenticated={isAuthenticated}
              getUserInitials={getUserInitials}
              setIsLogoutDialogOpen={setIsLogoutDialogOpen}
            />
          </div>
        </div>
      </header>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleSearchClose}
        className="md:top-16"
      />
      <CartSidebar open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  )
}
