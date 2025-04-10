"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductGrid } from "@/components/shop/product-grid"
import type { Product } from "@/lib/store"

interface ProductTabsProps {
  heading: string
  subheading?: string
  layout: "default" | "minimal" | "bordered" | "underlined"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  tabs: Array<{
    label: string
    products: Product[]
  }>
  viewAllLink?: string
  viewAllLabel?: string
}

export const ProductTabsBlock: React.FC<ProductTabsProps> = ({
  heading,
  subheading,
  layout,
  style,
  tabs,
  viewAllLink = "/shop",
  viewAllLabel = "View All Products",
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || "")

  // Background color classes
  const bgClasses = {
    none: "bg-transparent",
    light: "bg-muted/30",
    dark: "bg-gray-900 text-white",
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary",
  }

  // Text alignment classes
  const textAlignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  // Padding classes
  const paddingTopClasses = {
    none: "pt-0",
    small: "pt-8",
    medium: "pt-16",
    large: "pt-24",
  }

  const paddingBottomClasses = {
    none: "pb-0",
    small: "pb-8",
    medium: "pb-16",
    large: "pb-24",
  }

  // Layout specific classes
  const getTabsListClasses = () => {
    switch (layout) {
      case "minimal":
        return "bg-transparent border-none gap-4"
      case "bordered":
        return "border rounded-lg p-1"
      case "underlined":
        return "bg-transparent border-b"
      default:
        return ""
    }
  }

  const getTabTriggerClasses = () => {
    switch (layout) {
      case "minimal":
        return "bg-transparent data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:underline data-[state=active]:underline-offset-4"
      case "bordered":
        return "border-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
      case "underlined":
        return "bg-transparent rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
      default:
        return ""
    }
  }

  return (
    <section
      className={cn(
        bgClasses[style.backgroundColor],
        paddingTopClasses[style.paddingTop],
        paddingBottomClasses[style.paddingBottom],
      )}
    >
      <div className="container px-4 md:px-6">
        <Tabs defaultValue={tabs[0]?.label} onValueChange={setActiveTab} className="w-full">
          <div className={cn("flex flex-col mb-10", textAlignClasses[style.textAlignment])}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tight"
            >
              {heading}
            </motion.h2>
            {subheading && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mt-4 text-muted-foreground max-w-3xl mx-auto"
              >
                {subheading}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 flex justify-center"
            >
              <TabsList className={cn("grid w-full max-w-md grid-cols-3", getTabsListClasses())}>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.label} value={tab.label} className={getTabTriggerClasses()}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>
          </div>

          {tabs.map((tab) => (
            <TabsContent key={tab.label} value={tab.label}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <ProductGrid products={tab.products} />
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {viewAllLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 text-center"
          >
            <Button asChild variant="outline" size="lg">
              <Link href={viewAllLink} className="flex items-center">
                {viewAllLabel}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
