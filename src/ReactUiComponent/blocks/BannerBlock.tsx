"use client"

import type React from "react"

interface BannerBlockProps {
  heading: string
  subheading?: string
  buttonText?: string
  buttonLink?: string
  showButton?: boolean
  showDismiss?: boolean
  backgroundColor?: string
  textColor?: string
}

export const BannerBlock: React.FC<BannerBlockProps> = ({
  heading = "Special Offer",
  subheading = "Get 20% off on your first order",
  buttonText = "Shop Now",
  buttonLink = "#",
  showButton = true,
  showDismiss = true,
  backgroundColor = "#4f46e5",
  textColor = "#ffffff",
}) => {
  return (
    <div className="py-2 w-full" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-sm font-medium">{heading}</h3>
          {subheading && <p className="text-xs opacity-90">{subheading}</p>}
        </div>
        <div className="flex items-center gap-2">
          {showButton && (
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-8 px-3 text-xs">
              {buttonText}
            </button>
          )}
          {showDismiss && (
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0"
              aria-label="Dismiss"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
