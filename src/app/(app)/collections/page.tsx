"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"

export default function CollectionsPage() {
  const { getAnimeCollections } = useStore()
  const animeCollections = getAnimeCollections()

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
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Anime Collections</h1>
            <p className="mt-4 text-muted-foreground">
              Explore our exclusive collections inspired by your favorite anime series. From casual wear to cosplay,
              find the perfect pieces to express your passion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {animeCollections.map((anime, index) => (
              <CollectionCard
                key={anime}
                title={anime}
                image="/placeholder.svg"
                href={`/collections/${anime.toLowerCase().replace(/\s+/g, "-")}`}
                index={index}
              />
            ))}
            <CollectionCard
              title="Original Designs"
              image="/placeholder.svg"
              href="/collections/original-designs"
              index={animeCollections.length}
            />
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}

function CollectionCard({
  title,
  image,
  href,
  index,
}: {
  title: string
  image: string
  href: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={href}>
        <Card className="overflow-hidden transition-all hover:shadow-md group">
          <div className="aspect-[4/3] relative">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-white/80 text-sm mt-1">View collection</p>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">20+ items</span>
              <span className="text-sm font-medium text-purple-600">Explore</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
