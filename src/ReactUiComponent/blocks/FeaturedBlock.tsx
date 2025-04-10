"use client"

import type React from "react"

interface FeaturedBlockProps {
  heading: string
  subheading?: string
  items?: Array<{
    title: string
    description?: string
    image?: string
  }>
  backgroundColor?: string
  textColor?: string
}

export const FeaturedBlock: React.FC<FeaturedBlockProps> = ({
  heading = "Featured Products",
  subheading = "Check out our most popular items this season",
  items = [
    {
      title: "Premium T-Shirt",
      description: "Comfortable cotton t-shirt with modern design",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Designer Jeans",
      description: "High-quality denim with perfect fit",
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      title: "Casual Sneakers",
      description: "Stylish and comfortable for everyday wear",
      image: "/placeholder.svg?height=400&width=300",
    },
  ],
  backgroundColor = "#ffffff",
  textColor = "#000000",
}) => {
  return (
    <div className="py-16" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
          {subheading && <p className="mt-4 text-muted-foreground">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-lg border bg-background">
              {item.image && (
                <div className="relative aspect-square">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-medium">{item.title}</h3>
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                )}
                <button className="mt-4 w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
