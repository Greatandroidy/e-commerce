"use client"

import type React from "react"
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

// Define the block types
type BlockType = {
  blockType: string
  [key: string]: any
}

// Props for the BlockRenderer component
interface BlockRendererProps {
  blocks: BlockType[]
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  // Render nothing if no blocks are provided
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  // Render each block based on its type
  return (
    <>
      {blocks.map((block, index) => {
        // Extract the block type and props
        const { blockType, ...blockProps } = block

        // Render the appropriate component based on the block type
        switch (blockType) {
          case "hero":
            return <HeroBlock key={index} {...blockProps} />
          case "cta":
            return <CTABlock key={index} {...blockProps} />
          case "banner":
            return <BannerBlock key={index} {...blockProps} />
          case "testimonial":
            return <TestimonialBlock key={index} {...blockProps} />
          case "featured":
            return <FeaturedBlock key={index} {...blockProps} />
          case "card":
            return <CardBlock key={index} {...blockProps} />
          case "pricing":
            return <PricingBlock key={index} {...blockProps} />
          case "media":
            return <MediaBlock key={index} {...blockProps} />
          case "faq":
            return <FAQBlock key={index} {...blockProps} />
          case "carousel":
            return <CarouselBlock key={index} {...blockProps} />
          case "form":
            return <FormBlock key={index} {...blockProps} />
          case "footer":
            return <FooterBlock key={index} {...blockProps} />
          default:
            // Return null for unknown block types
            console.warn(`Unknown block type: ${blockType}`)
            return null
        }
      })}
    </>
  )
}
