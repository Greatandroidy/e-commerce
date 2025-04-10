"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeroTemplateBuilder } from "@/components/template-builder/hero-template-builder"
import { CTATemplateBuilder } from "@/components/template-builder/cta-template-builder"
import { BannerTemplateBuilder } from "@/components/template-builder/banner-template-builder"
import { TestimonialTemplateBuilder } from "@/components/template-builder/testimonial-template-builder"
import { FeaturedTemplateBuilder } from "@/components/template-builder/featured-template-builder"
import { CardTemplateBuilder } from "@/components/template-builder/card-template-builder"
import { PricingTemplateBuilder } from "@/components/template-builder/pricing-template-builder"
import { MediaTemplateBuilder } from "@/components/template-builder/media-template-builder"
import { FAQTemplateBuilder } from "@/components/template-builder/faq-template-builder"
import { CarouselTemplateBuilder } from "@/components/template-builder/carousel-template-builder"
import { FormTemplateBuilder } from "@/components/template-builder/form-template-builder"
import { FooterTemplateBuilder } from "@/components/template-builder/footer-template-builder"

export default function TemplateBuilderPage() {
  const [activeTab, setActiveTab] = useState("hero")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">UI Template Builder</h1>
        <p className="text-muted-foreground">
          Create and customize UI components for your e-commerce store. Select a component type below to get started.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="overflow-auto pb-2">
          <TabsList className="inline-flex w-auto">
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="cta">CTA</TabsTrigger>
            <TabsTrigger value="banner">Banner</TabsTrigger>
            <TabsTrigger value="testimonial">Testimonial</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="carousel">Carousel</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="hero" className="space-y-4">
          <HeroTemplateBuilder />
        </TabsContent>

        <TabsContent value="cta" className="space-y-4">
          <CTATemplateBuilder />
        </TabsContent>

        <TabsContent value="banner" className="space-y-4">
          <BannerTemplateBuilder />
        </TabsContent>

        <TabsContent value="testimonial" className="space-y-4">
          <TestimonialTemplateBuilder />
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <FeaturedTemplateBuilder />
        </TabsContent>

        <TabsContent value="card" className="space-y-4">
          <CardTemplateBuilder />
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <PricingTemplateBuilder />
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <MediaTemplateBuilder />
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <FAQTemplateBuilder />
        </TabsContent>

        <TabsContent value="carousel" className="space-y-4">
          <CarouselTemplateBuilder />
        </TabsContent>

        <TabsContent value="form" className="space-y-4">
          <FormTemplateBuilder />
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <FooterTemplateBuilder />
        </TabsContent>
      </Tabs>
    </div>
  )
}
