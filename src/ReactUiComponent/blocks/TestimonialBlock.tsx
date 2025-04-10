"use client"

import type React from "react"

interface TestimonialBlockProps {
  heading: string
  subheading?: string
  testimonials?: Array<{
    name: string
    role?: string
    content: string
    image?: string
    rating?: number
  }>
  backgroundColor?: string
  textColor?: string
}

export const TestimonialBlock: React.FC<TestimonialBlockProps> = ({
  heading = "What Our Customers Say",
  subheading = "Don't just take our word for it. Read what our customers have to say about our products.",
  testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content:
        "I've been shopping here for years and the quality never disappoints. Their customer service is exceptional and the styles are always on trend.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
    },
  ],
  backgroundColor = "#ffffff",
  textColor = "#000000",
}) => {
  return (
    <div className="py-16" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
          {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex flex-col h-full">
                <div className="flex-1">
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
                    className="h-8 w-8 mb-4 opacity-20"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                  <p className="italic">{testimonial.content}</p>
                </div>
                <div className="flex items-center mt-6">
                  {testimonial.image && (
                    <div className="rounded-full overflow-hidden h-12 w-12 mr-4">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
