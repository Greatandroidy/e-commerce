"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

interface HeroProps {
  heading: string
  subheading?: string
  image: {
    url: string
    alt: string
  }
  buttons?: Array<{
    label: string
    link: string
    variant: "primary" | "secondary" | "outline"
  }>
}

export const HeroBlock: React.FC<HeroProps> = ({ heading, subheading, image, buttons }) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-600/50 z-10" />
      <div className="relative h-[70vh] overflow-hidden">
        <Image src={image.url || "/placeholder.svg"} alt={image.alt} fill className="object-cover" priority />
      </div>
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg"
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">{heading}</h1>
            {subheading && <p className="mt-4 text-lg text-white/90">{subheading}</p>}
            {buttons && buttons.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {buttons.map((button, index) => {
                  if (button.variant === "primary") {
                    return (
                      <Button key={index} asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                        <Link href={button.link}>{button.label}</Link>
                      </Button>
                    )
                  }
                  if (button.variant === "secondary") {
                    return (
                      <Button key={index} asChild size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                        <Link href={button.link}>{button.label}</Link>
                      </Button>
                    )
                  }
                  return (
                    <Button
                      key={index}
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      <Link href={button.link}>{button.label}</Link>
                    </Button>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
