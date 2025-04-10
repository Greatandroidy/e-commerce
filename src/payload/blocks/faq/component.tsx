"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQProps {
  heading: string
  subheading?: string
  layout: "accordion" | "grid" | "tabs" | "simple"
  style: {
    backgroundColor: "none" | "light" | "dark" | "primary" | "secondary"
    textAlignment: "left" | "center" | "right"
    paddingTop: "none" | "small" | "medium" | "large"
    paddingBottom: "none" | "small" | "medium" | "large"
  }
  faqs: Array<{
    question: string
    answer: string
    category?: string
  }>
  contactButton?: {
    show: boolean
    label?: string
    link?: string
  }
}

export const FAQBlock: React.FC<FAQProps> = ({ heading, subheading, layout, style, faqs, contactButton }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState<string>("all")

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

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get unique categories for tabs layout
  const categories = Array.from(new Set(faqs.map((faq) => faq.category).filter(Boolean)))

  // Filter FAQs by category for tabs layout
  const getFaqsByCategory = (category: string) => {
    if (category === "all") return filteredFaqs
    return filteredFaqs.filter((faq) => faq.category === category)
  }

  // Render based on layout
  const renderFAQs = () => {
    switch (layout) {
      case "grid":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredFaqs.map((faq, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )

      case "tabs":
        return (
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category} value={category || ""}>
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category} value={category || ""}>
                <Accordion type="single" collapsible className="w-full">
                  {getFaqsByCategory(category || "").map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        )

      case "simple":
        return (
          <div className="space-y-8">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        )

      // Accordion layout (default)
      default:
        return (
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative mt-6 max-w-md mx-auto w-full"
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {renderFAQs()}

          {contactButton?.show && contactButton.label && contactButton.link && (
            <div className="mt-10 text-center">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button asChild>
                <Link href={contactButton.link}>{contactButton.label}</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
