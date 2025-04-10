"use client"

import { useEffect, useState } from "react"
import { notFound, useParams } from "next/navigation"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductGallery } from "@/components/product/product-gallery"
import { ProductInfo } from "@/components/product/product-info"
import { RelatedProducts } from "@/components/product/related-products"
import { CompleteLook } from "@/components/product/complete-look"
import { useStore } from "@/lib/store"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import ProductTabs from "@/components/product/product-tabs"

export default function ProductPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { getProductById } = useStore()
  const [product, setProduct] = useState(getProductById(slug))

  useEffect(() => {
    // Update product if slug changes
    setProduct(getProductById(slug))

    // Scroll to top when the component mounts or slug changes
    window.scrollTo(0, 0)
  }, [slug, getProductById])

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Shop</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/shop?category=${product.category}`}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace("-", " ")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/shop?category=${product.category}&style=${product.style}`}>
                  {product.style}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <span className="text-muted-foreground">{product.name}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid gap-8 md:grid-cols-2">
            <ProductGallery images={product.images || [product.image]} productName={product.name} />
            <ProductInfo product={product} />
          </div>

           <ProductTabs product={product} />
          {/* Complete the Look section */}
          <CompleteLook />

          {/* Similar Products section */}
          <div className="mt-16">
            <h3 className="text-xl font-medium mb-6 flex items-center">
              <span className="border-l-4 border-primary pl-3">Similar Products</span>
            </h3>
            <RelatedProducts productId={product.id} />
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
