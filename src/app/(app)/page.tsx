"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { ProductGrid } from "@/components/shop/product-grid"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HomePage() {
  const { getFeaturedProducts, getNewArrivals, getBestSellers, getAnimeCollections } = useStore()
  const [activeTab, setActiveTab] = useState("featured")

  const featuredProducts = getFeaturedProducts(8)
  const newArrivals = getNewArrivals(8)
  const bestSellers = getBestSellers(8)
  const animeCollections = getAnimeCollections()

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-600/50 z-10" />
          <div className="relative h-[70vh] overflow-hidden">
            <Image src="/placeholder.svg" alt="Anime Fashion" fill className="object-cover" priority />
          </div>
          <div className="absolute inset-0 flex items-center z-20">
            <div className="container px-4 md:px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg"
              >
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Anime-Inspired Fashion For Your Lifestyle
                </h1>
                <p className="mt-4 text-lg text-white/90">
                  Express your passion for anime with our exclusive collection of stylish and comfortable clothing.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                    <Link href="/shop">Shop Now</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link href="/collections">Explore Collections</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
              <p className="mt-4 text-muted-foreground max-w-3xl">
                Discover our wide range of anime-inspired fashion categories
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <CategoryCard title="Tops & Tees" image="/placeholder.svg" href="/shop?category=tops-tees" />
              <CategoryCard title="Cosplay" image="/placeholder.svg" href="/shop?category=cosplay" />
              <CategoryCard title="Accessories" image="/placeholder.svg" href="/shop?category=accessories" />
              <CategoryCard title="Anime Merch" image="/placeholder.svg" href="/shop?category=anime-merch" />
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="featured" onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col items-center justify-center text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Our Products</h2>
                <p className="mt-4 text-muted-foreground max-w-3xl">Explore our collection of anime-inspired fashion</p>
                <TabsList className="mt-8">
                  <TabsTrigger value="featured">Featured</TabsTrigger>
                  <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
                  <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="featured">
                <ProductGrid products={featuredProducts} />
              </TabsContent>
              <TabsContent value="new-arrivals">
                <ProductGrid products={newArrivals} />
              </TabsContent>
              <TabsContent value="best-sellers">
                <ProductGrid products={bestSellers} />
              </TabsContent>
            </Tabs>
            <div className="mt-10 text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/shop" className="flex items-center">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Anime Collections */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight">Anime Collections</h2>
              <p className="mt-4 text-muted-foreground max-w-3xl">Shop by your favorite anime series</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {animeCollections.map((anime) => (
                <AnimeCollectionCard
                  key={anime}
                  title={anime}
                  image="/placeholder.svg"
                  href={`/collections/${anime.toLowerCase().replace(/\s+/g, "-")}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-md">
                <h2 className="text-3xl font-bold tracking-tight">Join Our Newsletter</h2>
                <p className="mt-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
              </div>
              <div className="w-full max-w-md">
                <form className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-1 rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                    required
                  />
                  <Button type="submit" className="bg-white text-purple-600 hover:bg-white/90">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function CategoryCard({ title, image, href }: { title: string; image: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-square relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
        <CardContent className="p-4 text-center">
          <h3 className="font-medium">{title}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}

function AnimeCollectionCard({ title, image, href }: { title: string; image: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="aspect-video relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </Card>
    </Link>
  )
}
