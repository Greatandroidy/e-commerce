"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("general")

  const generalFaqs = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Login' button in the top right corner of the page, then select 'Sign up'. Fill in your details and follow the instructions to complete the registration process.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. We also offer cash on delivery for select locations.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on your location. You can check the shipping options available to you during checkout.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has been shipped, you will receive a confirmation email with a tracking number. You can use this number to track your order on our website under 'My Account > Orders' or directly through the carrier's website.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with tags attached. Please note that certain items like cosplay wigs and custom-made products cannot be returned unless they are defective.",
    },
  ]

  const ordersFaqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 5-7 business days within the continental US. Express shipping options are available at checkout for faster delivery. International shipping can take 10-20 business days depending on the destination and customs processing.",
    },
    {
      question: "Can I change or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After that, if the order has not been shipped, you can contact our customer service team who will try to accommodate your request. Once an order has been shipped, it cannot be canceled.",
    },
    {
      question: "What happens if my order is lost or damaged?",
      answer:
        "If your order is lost during shipping or arrives damaged, please contact our customer service team within 48 hours of the delivery date. We will either issue a refund or send a replacement at no additional cost.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer gift wrapping services for an additional $5 per item. You can select this option during checkout and even include a personalized message for the recipient.",
    },
    {
      question: "Can I order items that are out of stock?",
      answer:
        "Unfortunately, you cannot place orders for items that are out of stock. However, you can sign up for notifications to be alerted when the item becomes available again.",
    },
  ]

  const productFaqs = [
    {
      question: "Are your products officially licensed anime merchandise?",
      answer:
        "Yes, all our anime-themed products are officially licensed merchandise. We work directly with content creators and license holders to ensure authenticity and quality.",
    },
    {
      question: "How do I find the right size?",
      answer:
        "We provide detailed size guides for all our clothing items. You can find the size guide link on each product page. If you're between sizes, we generally recommend sizing up for a more comfortable fit.",
    },
    {
      question: "Are your products machine washable?",
      answer:
        "Washing instructions vary by product. Please refer to the care instructions on the product page or the label on the item. Most of our t-shirts and casual wear are machine washable, while cosplay items often require hand washing or dry cleaning.",
    },
    {
      question: "Do you sell limited edition items?",
      answer:
        "Yes, we regularly offer limited edition collections and collaborations with popular anime series. These items are available for a limited time only and in limited quantities. Sign up for our newsletter to stay updated on new releases.",
    },
    {
      question: "Can I request custom designs or specific anime merchandise?",
      answer:
        "While we don't offer custom designs, we do take customer suggestions into consideration when planning our product lineup. If there's a specific anime series or character you'd like to see merchandise for, feel free to contact us with your suggestions.",
    },
  ]

  const accountFaqs = [
    {
      question: "How do I reset my password?",
      answer:
        "To reset your password, click on 'Login', then select 'Forgot password?'. Enter your email address, and we'll send you a link to reset your password. If you don't receive the email, check your spam folder or contact customer support.",
    },
    {
      question: "Can I have multiple shipping addresses?",
      answer:
        "Yes, you can save multiple shipping addresses in your account. When placing an order, you can select from your saved addresses or add a new one.",
    },
    {
      question: "How do I update my personal information?",
      answer:
        "You can update your personal information by logging into your account and navigating to the 'Account Settings' or 'Profile' section. From there, you can edit your name, email, phone number, and other details.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. We use industry-standard encryption to protect your personal and payment information. We never share your data with third parties without your consent, except as required to fulfill your orders.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "To delete your account, please contact our customer service team. Please note that deleting your account will permanently remove all your order history, saved addresses, and other account information.",
    },
  ]

  const getFaqsByCategory = () => {
    switch (activeTab) {
      case "general":
        return generalFaqs
      case "orders":
        return ordersFaqs
      case "products":
        return productFaqs
      case "account":
        return accountFaqs
      default:
        return generalFaqs
    }
  }

  const filteredFaqs = getFaqsByCategory().filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
            <p className="mt-4 text-muted-foreground">
              Find answers to common questions about our products, orders, shipping, and more.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mt-8">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
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
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="orders">Orders & Shipping</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium">No results found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We couldn't find any FAQs matching your search. Try a different query or browse the categories.
                    </p>
                    {searchQuery && (
                      <Button variant="outline" className="mt-4" onClick={() => setSearchQuery("")}>
                        Clear Search
                      </Button>
                    )}
                  </div>
                ) : (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent>{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="max-w-3xl mx-auto mt-12 text-center">
            <h2 className="text-xl font-semibold">Still have questions?</h2>
            <p className="mt-2 text-muted-foreground">
              If you couldn't find the answer to your question, our support team is here to help.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <a href="/contact">Contact Support</a>
              </Button>
              <Button variant="outline">
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
                  className="mr-2 h-4 w-4"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <line x1="10" x2="8" y1="9" y2="9" />
                </svg>
                View Help Guides
              </Button>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
