import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ThemeSelector } from "@/components/theme/theme-selector"

export function Footer() {
  return (
    <footer className="bg-background/80 backdrop-blur-md border-t">
      <div className="container px-4 py-10 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">AnimeFreak</h3>
            <p className="text-sm text-muted-foreground">
              Your destination for anime-inspired fashion. Discover unique styles that blend Japanese animation
              aesthetics with modern trends.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/shop?category=women" className="hover:text-foreground">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop?category=men" className="hover:text-foreground">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop?category=cosplay" className="hover:text-foreground">
                  Cosplay
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="hover:text-foreground">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=new" className="hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/shop?category=sale" className="hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Collections</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/collections/naruto" className="hover:text-foreground">
                  Naruto
                </Link>
              </li>
              <li>
                <Link href="/collections/demon-slayer" className="hover:text-foreground">
                  Demon Slayer
                </Link>
              </li>
              <li>
                <Link href="/collections/attack-on-titan" className="hover:text-foreground">
                  Attack on Titan
                </Link>
              </li>
              <li>
                <Link href="/collections/sailor-moon" className="hover:text-foreground">
                  Sailor Moon
                </Link>
              </li>
              <li>
                <Link href="/collections/my-hero-academia" className="hover:text-foreground">
                  My Hero Academia
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-foreground">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Help</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/customer-service" className="hover:text-foreground">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-foreground">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-foreground">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-foreground">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-foreground">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-medium">Subscribe</h3>
            <p className="text-sm text-muted-foreground">
              Sign up for our newsletter to receive updates and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="max-w-[240px] rounded-full" />
              <Button type="submit" variant="default" className="rounded-full">
                Join
              </Button>
            </div>

            {/* Theme Selector */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Customize Theme</h4>
              <ThemeSelector />
            </div>

            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Download Our App</h4>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-10 rounded-full">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                    <path d="M17.9 19.9l-5.4-2.9-5.5 2.9V4.3l5.5-2.9 5.4 2.9v15.6zM12.5 0L0 6.7v10.7L12.5 24 25 17.4V6.7L12.5 0z" />
                  </svg>
                  App Store
                </Button>
                <Button variant="outline" size="sm" className="h-10 rounded-full">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.293-.707V2.521c0-.265.106-.52.293-.707zM14.5 12.707l2.302 2.302-8.557 4.883L14.5 12.707zm0-1.414L8.245 4.108l8.557 4.883L14.5 11.293zm3.803.207l-2.302 2.302 5.5 3.138v-2.926a1 1 0 0 0-.459-.841l-2.739-1.673zm0-2.012l2.739-1.673A1 1 0 0 1 21.5 8.155v-2.926l-5.5 3.138 2.303 2.303z" />
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AnimeFreak. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="hover:text-foreground">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="hover:text-foreground">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
