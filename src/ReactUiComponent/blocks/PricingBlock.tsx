"use client"

import type React from "react"

interface PricingBlockProps {
  heading: string
  subheading?: string
  plans?: Array<{
    name: string
    description?: string
    price: string
    currency?: string
    period?: string
    features?: Array<{
      text: string
      included: boolean
    }>
    buttonText?: string
    popular?: boolean
  }>
  backgroundColor?: string
  textColor?: string
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  heading = "Simple, Transparent Pricing",
  subheading = "Choose the plan that's right for you and start your 14-day trial today.",
  plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small projects.",
      price: "29",
      currency: "$",
      period: "month",
      features: [
        { text: "5 Products", included: true },
        { text: "Basic Analytics", included: true },
        { text: "24-hour Support", included: true },
        { text: "Advanced Features", included: false },
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for growing businesses and teams.",
      price: "79",
      currency: "$",
      period: "month",
      features: [
        { text: "25 Products", included: true },
        { text: "Advanced Analytics", included: true },
        { text: "24-hour Support", included: true },
        { text: "Advanced Features", included: true },
      ],
      buttonText: "Get Started",
      popular: true,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden ${
                plan.popular ? "ring-2 ring-primary scale-105 md:scale-110 z-10" : ""
              }`}
            >
              {plan.popular && (
                <div className="w-full text-center py-2 bg-primary text-primary-foreground">Most Popular</div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
                <div className="mt-4 flex items-baseline">
                  <div className="text-4xl font-extrabold">
                    {plan.currency}
                    {plan.price}
                  </div>
                  <div className="ml-2 text-muted-foreground">/{plan.period}</div>
                </div>
                <button
                  className={`w-full mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  } h-10 px-4 py-2`}
                >
                  {plan.buttonText}
                </button>
              </div>
              <div className="p-6 bg-muted/50 border-t">
                <ul className="space-y-3">
                  {plan.features?.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
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
                          className="h-5 w-5 mr-2 text-emerald-500 flex-shrink-0"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
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
                          className="h-5 w-5 mr-2 text-gray-300 flex-shrink-0"
                        >
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </svg>
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
