"use client"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useStore } from "@/lib/store"
import { ProductGrid } from "@/components/shop/product-grid"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function CollectionDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { products } = useStore()

  // Convert slug to collection name (e.g., "attack-on-titan" -> "Attack on Titan")
  const collectionName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Filter products by anime collection
  const collectionProducts = products.filter(
    (product) => product.anime && product.anime.toLowerCase() === collectionName.toLowerCase(),
  )

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-muted-foreground">{collectionName}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{collectionName} Collection</h1>
            <p className="mt-4 text-muted-foreground">
              Explore our exclusive {collectionName} inspired fashion collection. From casual wear to cosplay, find the
              perfect pieces to express your passion.
            </p>
          </div>

          <div className="mt-10">
            <ProductGrid products={collectionProducts} />
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
