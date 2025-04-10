"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ImageUploaderProps {
  currentImage: string
  onImageSelected: (url: string) => void
}

export function ImageUploader({ currentImage, onImageSelected }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const presetImages = [
    "/placeholder.svg?height=600&width=800",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&q=80",
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=600&q=80",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // In a real app, this would upload to a storage service
    // For now, we'll simulate an upload
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true)

      // Simulate upload delay
      setTimeout(() => {
        const file = e.target.files![0]
        const reader = new FileReader()

        reader.onload = (event) => {
          if (event.target?.result) {
            const imageUrl = event.target.result as string
            onImageSelected(imageUrl)
            setIsUploading(false)
          }
        }

        reader.readAsDataURL(file)
      }, 1000)
    }
  }

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (imageUrl) {
      onImageSelected(imageUrl)
      setImageUrl("")
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-lg border">
        <Image src={currentImage || "/placeholder.svg"} alt="Selected image" fill className="object-cover" />
      </div>

      <div className="grid grid-cols-5 gap-2">
        {presetImages.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative aspect-square overflow-hidden rounded-lg border",
              currentImage === image && "ring-2 ring-primary",
            )}
            onClick={() => onImageSelected(image)}
          >
            <Image src={image || "/placeholder.svg"} alt={`Preset image ${index + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button type="submit" size="sm">
            Use
          </Button>
        </form>

        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
            disabled={isUploading}
          />
          <Button variant="outline" className="w-full" disabled={isUploading} asChild>
            <label htmlFor="image-upload" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload Image"}
            </label>
          </Button>
        </div>
      </div>
    </div>
  )
}
