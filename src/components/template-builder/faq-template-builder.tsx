"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function FAQTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Frequently Asked Questions",
    subheading: "Find answers to common questions about our products and services.",
    faqs: [
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
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination. You can see the shipping options available to your location during checkout.",
      },
    ],
    layout: "accordion",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#4f46e5",
    paddingY: "medium",
    rounded: true,
    showIcon: true,
    defaultOpen: 0,
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handleFAQChange = (index: number, key: string, value: string) => {
    setTemplate((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => (i === index ? { ...faq, [key]: value } : faq)),
    }))
  }

  const addFAQ = () => {
    setTemplate((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "New Question", answer: "New Answer" }],
    }))
  }

  const removeFAQ = (index: number) => {
    setTemplate((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
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

  const renderFAQPreview = () => {
    const {
      heading,
      subheading,
      faqs,
      layout,
      backgroundColor,
      textColor,
      accentColor,
      paddingY,
      rounded,
      showIcon,
      defaultOpen,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
    }

    const accentStyle = {
      color: accentColor,
    }

    const paddingClass = getPaddingClasses(paddingY)
    const roundedClass = rounded ? "rounded-lg" : ""

    // Render different layouts
    switch (layout) {
      case "grid":
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
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {faqs.map((faq, index) => (
                  <div key={index} className={`border ${roundedClass} p-6`}>
                    <h3 className="text-lg font-medium mb-2" style={accentStyle}>
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        )

      case "minimal":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="max-w-3xl mx-auto">
                <dl className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="space-y-2">
                      <dt className="text-lg font-medium" style={accentStyle}>
                        {faq.question}
                      </dt>
                      <dd className="text-muted-foreground">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        )

      // Accordion layout (default)
      default:
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className={`border ${roundedClass} overflow-hidden`}>
                      <button
                        className="w-full text-left py-4 px-6 flex items-center justify-between"
                        style={index === defaultOpen ? accentStyle : {}}
                      >
                        <span className="font-medium">{faq.question}</span>
                        {showIcon && (
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
                            className={`h-5 w-5 transition-transform ${index === defaultOpen ? "rotate-180" : ""}`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        )}
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          index === defaultOpen ? "max-h-96" : "max-h-0"
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
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderFAQPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
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
                  <SelectItem value="accordion">Accordion</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.layout === "accordion" && (
              <>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showIcon"
                    checked={template.showIcon}
                    onCheckedChange={(checked) => handleChange("showIcon", checked)}
                  />
                  <Label htmlFor="showIcon">Show Icons</Label>
                </div>

                <div className="space-y-2">
                  <Label>Default Open Question</Label>
                  <Select
                    value={String(template.defaultOpen)}
                    onValueChange={(value) => handleChange("defaultOpen", Number.parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question" />
                    </SelectTrigger>
                    <SelectContent>
                      {template.faqs.map((faq, index) => (
                        <SelectItem key={index} value={String(index)}>
                          Question {index + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addFAQ} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {template.faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Question {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFAQ(index)}
                        disabled={template.faqs.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question</Label>
                        <Input
                          value={faq.question}
                          onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <Textarea
                          value={faq.answer}
                          onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                          rows={3}
                        />
                      </div>
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
