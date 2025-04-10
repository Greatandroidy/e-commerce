"use client"

import type React from "react"

interface CardBlockProps {
  title: string
  description?: string
  image?: string
  buttonText?: string
  backgroundColor?: string
  textColor?: string
}

export const CardBlock: React.FC<CardBlockProps> = ({
  title = "Premium Product",
  description = "This is a premium product with high-quality materials and craftsmanship.",
  image = "/placeholder.svg?height=400&width=300",
  buttonText = "Buy Now",
  backgroundColor = "#ffffff",
  textColor = "#000000",
}) => {
  return (
    <div className="max-w-sm mx-auto border rounded-lg overflow-hidden" style={{ backgroundColor, color: textColor }}>
      {image && (
        <div className="aspect-square">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            width={300}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-medium">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
        <button className="mt-6 w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
          {buttonText}
        </button>
      </div>
    </div>
  )
}
