"use client"

import type { Block } from "payload/types"

// Import all block components
import { HeroBlock } from "./blocks/HeroBlock"
import { CTABlock } from "./blocks/CTABlock"
import { BannerBlock } from "./blocks/BannerBlock"
import { TestimonialBlock } from "./blocks/TestimonialBlock"
import { FeaturedBlock } from "./blocks/FeaturedBlock"
import { CardBlock } from "./blocks/CardBlock"
import { PricingBlock } from "./blocks/PricingBlock"
import { MediaBlock } from "./blocks/MediaBlock"
import { FAQBlock } from "./blocks/FAQBlock"
import { CarouselBlock } from "./blocks/CarouselBlock"
import { FormBlock } from "./blocks/FormBlock"
import { FooterBlock } from "./blocks/FooterBlock"

// Export all block components
export {
  HeroBlock,
  CTABlock,
  BannerBlock,
  TestimonialBlock,
  FeaturedBlock,
  CardBlock,
  PricingBlock,
  MediaBlock,
  FAQBlock,
  CarouselBlock,
  FormBlock,
  FooterBlock,
}

export * from "./BlockRenderer"
export * from "./blocks/HeroBlock"
export * from "./blocks/CTABlock"
export * from "./blocks/BannerBlock"
export * from "./blocks/TestimonialBlock"
export * from "./blocks/FeaturedBlock"
export * from "./blocks/CardBlock"
export * from "./blocks/PricingBlock"
export * from "./blocks/MediaBlock"
export * from "./blocks/FAQBlock"
export * from "./blocks/CarouselBlock"
export * from "./blocks/FormBlock"
export * from "./blocks/FooterBlock"

// Define block types for Payload CMS
export const blockTypes: Block[] = [
  {
    slug: "hero",
    labels: {
      singular: "Hero Section",
      plural: "Hero Sections",
    },
    fields: [
      {
        name: "heading",
        label: "Heading",
        type: "text",
        required: true,
      },
      {
        name: "subheading",
        label: "Subheading",
        type: "textarea",
      },
      {
        name: "primaryButtonText",
        label: "Primary Button Text",
        type: "text",
      },
      {
        name: "primaryButtonLink",
        label: "Primary Button Link",
        type: "text",
      },
      {
        name: "showSecondaryButton",
        label: "Show Secondary Button",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "secondaryButtonText",
        label: "Secondary Button Text",
        type: "text",
        admin: {
          condition: (data, siblingData) => siblingData.showSecondaryButton,
        },
      },
      {
        name: "secondaryButtonLink",
        label: "Secondary Button Link",
        type: "text",
        admin: {
          condition: (data, siblingData) => siblingData.showSecondaryButton,
        },
      },
      {
        name: "imageUrl",
        label: "Image URL",
        type: "upload",
        relationTo: "media",
      },
      {
        name: "layout",
        label: "Layout",
        type: "select",
        options: [
          { label: "Standard", value: "standard" },
          { label: "Centered", value: "centered" },
          { label: "Split", value: "split" },
          { label: "Minimal", value: "minimal" },
          { label: "Media Only", value: "media-only" },
        ],
        defaultValue: "standard",
      },
      {
        name: "imagePosition",
        label: "Image Position",
        type: "select",
        options: [
          { label: "Right", value: "right" },
          { label: "Left", value: "left" },
        ],
        defaultValue: "right",
        admin: {
          condition: (data, siblingData) => siblingData.layout === "split",
        },
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#ffffff",
      },
      {
        name: "textColor",
        label: "Text Color",
        type: "text",
        defaultValue: "#000000",
      },
      {
        name: "accentColor",
        label: "Accent Color",
        type: "text",
        defaultValue: "#3b82f6",
      },
    ],
  },
  {
    slug: "cta",
    labels: {
      singular: "Call to Action",
      plural: "Call to Actions",
    },
    fields: [
      {
        name: "heading",
        label: "Heading",
        type: "text",
        required: true,
      },
      {
        name: "subheading",
        label: "Subheading",
        type: "textarea",
      },
      {
        name: "buttonText",
        label: "Button Text",
        type: "text",
      },
      {
        name: "buttonLink",
        label: "Button Link",
        type: "text",
      },
      {
        name: "showSecondaryButton",
        label: "Show Secondary Button",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "secondaryButtonText",
        label: "Secondary Button Text",
        type: "text",
        admin: {
          condition: (data, siblingData) => siblingData.showSecondaryButton,
        },
      },
      {
        name: "secondaryButtonLink",
        label: "Secondary Button Link",
        type: "text",
        admin: {
          condition: (data, siblingData) => siblingData.showSecondaryButton,
        },
      },
      {
        name: "layout",
        label: "Layout",
        type: "select",
        options: [
          { label: "Standard", value: "standard" },
          { label: "Centered", value: "centered" },
          { label: "Minimal", value: "minimal" },
          { label: "Card", value: "card" },
        ],
        defaultValue: "standard",
      },
      {
        name: "backgroundColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#4f46e5",
      },
      {
        name: "textColor",
        label: "Text Color",
        type: "text",
        defaultValue: "#ffffff",
      },
    ],
  },
  // Add more block types here...
]
