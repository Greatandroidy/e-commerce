"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Home, Search, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import './(app)/globals.css'
export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24">
      <div className="container max-w-4xl mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative h-40 md:h-60 mb-8">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="text-[120px] md:text-[180px] font-bold text-primary/10 select-none"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                404
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-4xl md:text-6xl font-bold text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                404
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

        {/* Suggestions */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-muted/30 p-6 rounded-lg">
            <Home className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="font-medium text-lg mb-2">Return Home</h3>
            <p className="text-muted-foreground text-sm mb-4">Go back to our homepage and start fresh.</p>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Go to Homepage
              </Button>
            </Link>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <Search className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="font-medium text-lg mb-2">Search Products</h3>
            <p className="text-muted-foreground text-sm mb-4">Find what you're looking for with our search.</p>
            <Link href="/search">
              <Button variant="outline" className="w-full">
                Search Products
              </Button>
            </Link>
          </div>

          <div className="bg-muted/30 p-6 rounded-lg">
            <ShoppingBag className="h-8 w-8 text-primary mb-3 mx-auto" />
            <h3 className="font-medium text-lg mb-2">Browse Collections</h3>
            <p className="text-muted-foreground text-sm mb-4">Explore our curated collections of products.</p>
            <Link href="/collections">
              <Button variant="outline" className="w-full">
                View Collections
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <Link href="/" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Homepage
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
