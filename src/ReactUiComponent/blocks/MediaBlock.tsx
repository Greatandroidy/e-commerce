"use client"

import type React from "react"

interface MediaBlockProps {
  heading?: string
  subheading?: string
  mediaType?: "video" | "image"
  mediaUrl?: string
  backgroundColor?: string
  textColor?: string
}

export const MediaBlock: React.FC<MediaBlockProps> = ({
  heading = "Discover Our Latest Collection",
  subheading = "Watch the video to see our products in action and learn more about our brand story.",
  mediaType = "image",
  mediaUrl = "/placeholder.svg?height=600&width=800",
  backgroundColor = "#ffffff",
  textColor = "#000000",
}) => {
  return (
    <div className="py-16" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
          {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
        </div>

        <div className="max-w-3xl mx-auto">
          {mediaType === "video" ? (
            <div className="aspect-video overflow-hidden rounded-lg">
              {mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be") ? (
                <iframe
                  src={mediaUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video src={mediaUrl} className="w-full h-full object-cover" controls playsInline></video>
              )}
            </div>
          ) : (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img src={mediaUrl || "/placeholder.svg"} alt={heading} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
