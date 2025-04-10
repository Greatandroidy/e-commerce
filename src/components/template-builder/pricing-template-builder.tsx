"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function PricingTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Simple, Transparent Pricing",
    subheading: "Choose the plan that's right for you and start your 14-day trial today.",
    plans: [
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
      {
        name: "Enterprise",
        description: "For large organizations with specific needs.",
        price: "129",
        currency: "$",
        period: "month",
        features: [
          { text: "Unlimited Products", included: true },
          { text: "Custom Analytics", included: true },
          { text: "Priority Support", included: true },
          { text: "Advanced Features", included: true },
        ],
        buttonText: "Contact Sales",
        popular: false,
      },
    ],
    layout: "standard",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#4f46e5",
    paddingY: "medium",
    rounded: true,
    showBadge: true,
    badgeText: "Most Popular",
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handlePlanChange = (planIndex: number, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, index) => (index === planIndex ? { ...plan, [key]: value } : plan)),
    }))
  }

  const handleFeatureChange = (planIndex: number, featureIndex: number, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, pIndex) =>
        pIndex === planIndex
          ? {
              ...plan,
              features: plan.features.map((feature, fIndex) =>
                fIndex === featureIndex ? { ...feature, [key]: value } : feature,
              ),
            }
          : plan,
      ),
    }))
  }

  const addFeature = (planIndex: number) => {
    setTemplate((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, index) =>
        index === planIndex
          ? {
              ...plan,
              features: [...plan.features, { text: "New Feature", included: true }],
            }
          : plan,
      ),
    }))
  }

  const removeFeature = (planIndex: number, featureIndex: number) => {
    setTemplate((prev) => ({
      ...prev,
      plans: prev.plans.map((plan, pIndex) =>
        pIndex === planIndex
          ? {
              ...plan,
              features: plan.features.filter((_, fIndex) => fIndex !== featureIndex),
            }
          : plan,
      ),
    }))
  }

  // Helper function to get padding classes
  const getPaddingClasses = (size: string) => {
    switch (size) {
      case "small":
        return "py-8"
      case "medium":
        return "py-16"
      case "large":
        return "py-24"
      default:
        return "py-16"
    }
  }

  const renderPricingPreview = () => {
    const {
      heading,
      subheading,
      plans,
      layout,
      backgroundColor,
      textColor,
      accentColor,
      paddingY,
      rounded,
      showBadge,
      badgeText,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
    }

    const accentStyle = {
      backgroundColor: accentColor,
      color: "#ffffff",
    }

    const paddingClass = getPaddingClasses(paddingY)
    const roundedClass = rounded ? "rounded-lg" : ""

    // Render different layouts
    switch (layout) {
      case "compact":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`border ${roundedClass} overflow-hidden ${plan.popular ? "ring-2 ring-primary" : ""}`}
                  >
                    {plan.popular && showBadge && (
                      <div className="w-full text-center py-1 text-xs font-medium" style={accentStyle}>
                        {badgeText}
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                      <div className="mt-2 flex items-baseline">
                        <div className="text-2xl font-extrabold">
                          {plan.currency}
                          {plan.price}
                        </div>
                        <div className="ml-1 text-sm text-muted-foreground">/{plan.period}</div>
                      </div>
                      <button
                        className={`w-full mt-3 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                          plan.popular
                            ? "text-primary-foreground h-8 px-3 py-2"
                            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3 py-2"
                        }`}
                        style={plan.popular ? accentStyle : {}}
                      >
                        {plan.buttonText}
                      </button>
                      <ul className="mt-3 space-y-2 text-sm">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
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
                                className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0"
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
                                className="h-4 w-4 mr-2 text-gray-300 flex-shrink-0"
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

      case "horizontal":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className={`border ${roundedClass} overflow-hidden`}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-6 border-b md:border-b-0 md:border-r">
                    <div className="h-full flex flex-col">
                      <div>
                        <h3 className="text-lg font-bold">{plans[0].name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{plans[0].description}</p>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-extrabold">
                            {plans[0].currency}
                            {plans[0].price}
                          </div>
                          <div className="ml-1 text-sm text-muted-foreground">/{plans[0].period}</div>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm flex-1">
                        {plans[0].features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
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
                                className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0"
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
                                className="h-4 w-4 mr-2 text-gray-300 flex-shrink-0"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            )}
                            <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                        {plans[0].buttonText}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 border-b md:border-b-0 md:border-r relative">
                    {plans[1].popular && showBadge && (
                      <div
                        className="absolute top-0 left-0 right-0 text-center py-1 text-xs font-medium"
                        style={accentStyle}
                      >
                        {badgeText}
                      </div>
                    )}
                    <div className={`h-full flex flex-col ${plans[1].popular && showBadge ? "pt-6" : ""}`}>
                      <div>
                        <h3 className="text-lg font-bold">{plans[1].name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{plans[1].description}</p>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-extrabold">
                            {plans[1].currency}
                            {plans[1].price}
                          </div>
                          <div className="ml-1 text-sm text-muted-foreground">/{plans[1].period}</div>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm flex-1">
                        {plans[1].features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
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
                                className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0"
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
                                className="h-4 w-4 mr-2 text-gray-300 flex-shrink-0"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            )}
                            <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className="w-full mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                        style={accentStyle}
                      >
                        {plans[1].buttonText}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="h-full flex flex-col">
                      <div>
                        <h3 className="text-lg font-bold">{plans[2].name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{plans[2].description}</p>
                        <div className="mt-2 flex items-baseline">
                          <div className="text-2xl font-extrabold">
                            {plans[2].currency}
                            {plans[2].price}
                          </div>
                          <div className="ml-1 text-sm text-muted-foreground">/{plans[2].period}</div>
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm flex-1">
                        {plans[2].features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
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
                                className="h-4 w-4 mr-2 text-emerald-500 flex-shrink-0"
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
                                className="h-4 w-4 mr-2 text-gray-300 flex-shrink-0"
                              >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                              </svg>
                            )}
                            <span className={feature.included ? "" : "text-muted-foreground"}>{feature.text}</span>
                          </li>
                        ))}
                      </ul>
                      <button className="w-full mt-6 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                        {plans[2].buttonText}
                      </button>
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
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <motion.h2
                  className="text-3xl font-bold tracking-tight mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {heading}
                </motion.h2>
                {subheading && (
                  <motion.p
                    className="text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {subheading}
                  </motion.p>
                )}
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {plans.map((plan, index) => (
                  <div
                    key={index}
                    className={`border ${roundedClass} overflow-hidden ${
                      plan.popular ? "ring-2 ring-primary scale-105 md:scale-110 z-10" : ""
                    }`}
                  >
                    {plan.popular && showBadge && (
                      <div className="w-full text-center py-2 text-xs font-medium" style={accentStyle}>
                        {badgeText}
                      </div>
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
                            ? "text-primary-foreground h-10 px-4 py-2"
                            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                        }`}
                        style={plan.popular ? accentStyle : {}}
                      >
                        {plan.buttonText}
                      </button>
                    </div>
                    <div className="p-6 bg-muted/50 border-t">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
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
              </motion.div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderPricingPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input id="heading" value={template.heading} onChange={(e) => handleChange("heading", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Textarea
                id="subheading"
                value={template.subheading}
                onChange={(e) => handleChange("subheading", e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showBadge"
                checked={template.showBadge}
                onCheckedChange={(checked) => handleChange("showBadge", checked)}
              />
              <Label htmlFor="showBadge">Show Badge</Label>
            </div>

            {template.showBadge && (
              <div className="space-y-2">
                <Label htmlFor="badgeText">Badge Text</Label>
                <Input
                  id="badgeText"
                  value={template.badgeText}
                  onChange={(e) => handleChange("badgeText", e.target.value)}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <div className="space-y-6">
              {template.plans.map((plan, planIndex) => (
                <Card key={planIndex}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">{plan.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`popular-${planIndex}`}
                          checked={plan.popular}
                          onCheckedChange={(checked) => handlePlanChange(planIndex, "popular", checked)}
                        />
                        <Label htmlFor={`popular-${planIndex}`}>Popular</Label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => handlePlanChange(planIndex, "name", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Input
                          value={plan.description}
                          onChange={(e) => handlePlanChange(planIndex, "description", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Currency</Label>
                        <Input
                          value={plan.currency}
                          onChange={(e) => handlePlanChange(planIndex, "currency", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                          value={plan.price}
                          onChange={(e) => handlePlanChange(planIndex, "price", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Period</Label>
                        <Input
                          value={plan.period}
                          onChange={(e) => handlePlanChange(planIndex, "period", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label>Button Text</Label>
                      <Input
                        value={plan.buttonText}
                        onChange={(e) => handlePlanChange(planIndex, "buttonText", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center mb-2">
                        <Label>Features</Label>
                        <Button variant="outline" size="sm" onClick={() => addFeature(planIndex)}>
                          Add Feature
                        </Button>
                      </div>

                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2 mb-2">
                          <Switch
                            id={`feature-${planIndex}-${featureIndex}`}
                            checked={feature.included}
                            onCheckedChange={(checked) =>
                              handleFeatureChange(planIndex, featureIndex, "included", checked)
                            }
                          />
                          <Input
                            value={feature.text}
                            onChange={(e) => handleFeatureChange(planIndex, featureIndex, "text", e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFeature(planIndex, featureIndex)}
                            disabled={plan.features.length <= 1}
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
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker
                  color={template.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker color={template.textColor} onChange={(color) => handleChange("textColor", color)} />
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <ColorPicker color={template.accentColor} onChange={(color) => handleChange("accentColor", color)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Padding</Label>
              <Select value={template.paddingY} onValueChange={(value) => handleChange("paddingY", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select padding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="rounded"
                checked={template.rounded}
                onCheckedChange={(checked) => handleChange("rounded", checked)}
              />
              <Label htmlFor="rounded">Rounded Corners</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
