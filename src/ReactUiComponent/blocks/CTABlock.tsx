"use client"

import type React from "react"

interface CTABlockProps {
  heading: string
  subheading?: string
  buttonText?: string
  buttonLink?: string
  showSecondaryButton?: boolean
  secondaryButtonText?: string
  secondaryButtonLink?: string
  layout?: "standard" | "centered" | "minimal" | "card"
  backgroundColor?: string
  textColor?: string
  accentColor?: string
  showArrow?: boolean
}

export const CTABlock: React.FC<CTABlockProps> = ({
  heading = "Ready to get started?",
  subheading = "Join thousands of satisfied customers using our product.",
  buttonText = "Get Started",
  buttonLink = "#",
  showSecondaryButton = true,
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "#",
  layout = "standard",
  backgroundColor = "#4f46e5",
  textColor = "#ffffff",
  accentColor = "#ffffff",
  showArrow = false,
}) => {
  // Common styles
  const containerStyle = {
    backgroundColor,
    color: textColor,
  }

  const buttonStyle = {
    backgroundColor: accentColor,
    color: backgroundColor,
  }

  const secondaryButtonStyle = {
    borderColor: textColor,
    color: textColor,
  }

  // Render different layouts
  switch (layout) {
    case "centered":
      return (
        <div className="py-16" style={containerStyle}>
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
              {subheading && <p className="mt-4 text-lg opacity-90">{subheading}</p>}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  style={buttonStyle}
                >
                  {buttonText}
                  {showArrow && (
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
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </button>
                {showSecondaryButton && (
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    style={secondaryButtonStyle}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )

    case "minimal":
      return (
        <div className="py-8" style={containerStyle}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
                {subheading && <p className="mt-2 text-sm opacity-90">{subheading}</p>}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  style={buttonStyle}
                >
                  {buttonText}
                  {showArrow && (
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
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </button>
                {showSecondaryButton && (
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    style={secondaryButtonStyle}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )

    case "card":
      return (
        <div className="py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-md mx-auto">
              <div className="rounded-lg overflow-hidden" style={containerStyle}>
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
                  {subheading && <p className="mt-4 opacity-90">{subheading}</p>}
                  <div className="mt-6 flex flex-col gap-3">
                    <button
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      style={buttonStyle}
                    >
                      {buttonText}
                      {showArrow && (
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
                          className="ml-2 h-4 w-4"
                        >
                          <path d="M5 12h14" />
                          <path d="m12 5 7 7-7 7" />
                        </svg>
                      )}
                    </button>
                    {showSecondaryButton && (
                      <button
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        style={secondaryButtonStyle}
                      >
                        {secondaryButtonText}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    // Standard layout (default)
    default:
      return (
        <div className="py-16" style={containerStyle}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
                {subheading && <p className="mt-4 opacity-90">{subheading}</p>}
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                  style={buttonStyle}
                >
                  {buttonText}
                  {showArrow && (
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
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  )}
                </button>
                {showSecondaryButton && (
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    style={secondaryButtonStyle}
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
  }
}
