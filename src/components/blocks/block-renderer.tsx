import type React from "react"
import { HeroBlock } from "@/payload/blocks/hero/component"
import { FeaturedCategoriesBlock } from "@/payload/blocks/featured-categories/component"
import { ProductTabsBlock } from "@/payload/blocks/product-tabs/component"
import { NewsletterBlock } from "@/payload/blocks/newsletter/component"

interface BlockRendererProps {
  blocks: any[]
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
  return (
    <>
      {blocks?.map((block, index) => {
        switch (block.blockType) {
          case "hero":
            return <HeroBlock key={index} {...block} />
          case "featured-categories":
            return <FeaturedCategoriesBlock key={index} {...block} />
          case "product-tabs":
            return <ProductTabsBlock key={index} {...block} />
          case "newsletter":
            return <NewsletterBlock key={index} {...block} />
          default:
            return null
        }
      })}
    </>
  )
}
