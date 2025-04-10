"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface CarouselSlide {
  title: string
  description?: string
  image: string
  buttonText?: string
  buttonLink?: string
}

interface CarouselBlockProps {
  slides?: CarouselSlide[]
  autoplay?: boolean
  autoplaySpeed?: number
  showArrows?: boolean
  showDots?: boolean
  backgroundColor?: string
  textColor?: string
}

export const CarouselBlock: React.FC<CarouselBlockProps> = ({
  slides = [
    {
      title: "Discover Our Latest Collection",
      description: "Explore our newest arrivals and find your perfect style.",
      image: "/placeholder.svg?height=600&width=1200&text=Slide+1",
      buttonText: "Shop Now",
      buttonLink: "/shop",
    },
    {
      title: "Summer Sale - Up to 50% Off",
      description: "Limited time offer on selected items. Don't miss out!",
      image: "/placeholder.svg?height=600&width=1200&text=Slide+2",
      buttonText: "View Offers",
      buttonLink: "/sale",
    },
  ],
  autoplay = true,
  autoplaySpeed = 5000,
  showArrows = true,
  showDots = true,
  backgroundColor = "#ffffff",
  textColor = "#ffffff",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)

  // Handle autoplay
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
      }, autoplaySpeed)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, autoplay, autoplaySpeed, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative">
      <div className="aspect-video overflow-hidden rounded-lg">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="max-w-xl text-center p-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
                  {slide.title}
                </h2>
                {slide.description && (
                  <p className="text-lg mb-6 opacity-90" style={{ color: textColor }}>
                    {slide.description}
                  </p>
                )}
                {slide.buttonText && (
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                    {slide.buttonText}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showArrows && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm"
            onClick={prevSlide}
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
              className="h-6 w-6"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="sr-only">Previous slide</span>
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm"
            onClick={nextSlide}
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
              className="h-6 w-6"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="sr-only">Next slide</span>
          </button>
        </>
      )}

      {showDots && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-primary" : "bg-white/50"}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      )}
    </div>
  )
}
