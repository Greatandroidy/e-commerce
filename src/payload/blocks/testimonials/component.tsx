"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialsProps {
  heading: string
  subheading?: string
  layout: "grid" | "carousel" | "masonry" | "simple"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  testimonials: Array<{
    quote: string
    author: string
    role?: string
    avatar?: {
      url: string
      alt: string
    }
    rating?: "1" | "2" | "3" | "4" | "5"
  }>
}

export const TestimonialsBlock: React.FC<TestimonialsProps> = ({
  heading,
  subheading,
  layout,
  style,
  testimonials,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-advance carousel
  useEffect(() => {
    if (layout === "carousel" && testimonials.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [layout, testimonials.length])

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

  // Render stars based on rating
  const renderStars = (rating?: string) => {
    if (!rating) return null

    const ratingNumber = Number.parseInt(rating, 10)
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn("h-4 w-4", i < ratingNumber ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground")}
          />
        ))}
      </div>
    )
  }

  // Render based on layout
  const renderTestimonials = () => {
    switch (layout) {
      case "carousel":
        return (
          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="h-full">
                      <CardHeader className="pb-2">
                        {testimonial.rating && <div className="mb-2">{renderStars(testimonial.rating)}</div>}
                        <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                      </CardHeader>
                      <CardFooter className="pt-4">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            {testimonial.avatar ? (
                              <AvatarImage src={testimonial.avatar.url} alt={testimonial.author} />
                            ) : null}
                            <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{testimonial.author}</div>
                            {testimonial.role && (
                              <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                            )}
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {testimonials.length > 1 && (
              <div className="mt-6 flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous</span>
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "h-2 w-2 rounded-full transition-colors",
                        currentSlide === index ? "bg-primary" : "bg-muted-foreground/30",
                      )}
                      onClick={() => setCurrentSlide(index)}
                    >
                      <span className="sr-only">Go to slide {index + 1}</span>
                    </button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next</span>
                </Button>
              </div>
            )}
          </div>
        )

      case "masonry":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={cn("h-full", index % 3 === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-2" : "")}
              >
                <CardHeader className="pb-2">
                  {testimonial.rating && <div className="mb-2">{renderStars(testimonial.rating)}</div>}
                  <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                </CardHeader>
                <CardFooter className="pt-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {testimonial.avatar ? (
                        <AvatarImage src={testimonial.avatar.url} alt={testimonial.author} />
                      ) : null}
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      {testimonial.role && <div className="text-sm text-muted-foreground">{testimonial.role}</div>}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )

      case "simple":
        return (
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="space-y-4">
                {testimonial.rating && <div>{renderStars(testimonial.rating)}</div>}
                <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-4">
                  <Avatar>
                    {testimonial.avatar ? <AvatarImage src={testimonial.avatar.url} alt={testimonial.author} /> : null}
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    {testimonial.role && <div className="text-sm text-muted-foreground">{testimonial.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      // Grid layout (default)
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="pb-2">
                  {testimonial.rating && <div className="mb-2">{renderStars(testimonial.rating)}</div>}
                  <blockquote className="text-lg italic">"{testimonial.quote}"</blockquote>
                </CardHeader>
                <CardFooter className="pt-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      {testimonial.avatar ? (
                        <AvatarImage src={testimonial.avatar.url} alt={testimonial.author} />
                      ) : null}
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      {testimonial.role && <div className="text-sm text-muted-foreground">{testimonial.role}</div>}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {renderTestimonials()}
        </motion.div>
      </div>
    </section>
  )
}
