"use client"

import type React from "react"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQBlockProps {
  heading: string
  subheading?: string
  faqs?: FAQItem[]
  backgroundColor?: string
  textColor?: string
}

export const FAQBlock: React.FC<FAQBlockProps> = ({
  heading = "Frequently Asked Questions",
  subheading = "Find answers to common questions about our products and services.",
  faqs = [
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Orders' section. Alternatively, you can use the tracking number provided in your shipping confirmation email.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all unused and unworn items. Please visit our Returns page for more information on how to initiate a return.",
    },
  ],
  backgroundColor = "#ffffff",
  textColor = "#000000",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-16" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
          {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full text-left py-4 px-6 flex items-center justify-between"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="font-medium">{faq.question}</span>
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
                    className={`h-5 w-5 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
