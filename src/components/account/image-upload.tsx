"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { Camera, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { handleImageUpload, getTemporaryImage, clearTemporaryImage } from "@/lib/image-storage"

interface ImageUploadProps {
  onImageChange: (imageData: string | null) => void
  initialImage?: string | null
  storageKey?: string
}

export function ImageUpload({ onImageChange, initialImage = null, storageKey = "temp_image" }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Check for temporarily stored image on mount
  useEffect(() => {
    if (!initialImage) {
      const storedImage = getTemporaryImage(storageKey)
      if (storedImage) {
        setPreviewUrl(storedImage)
        onImageChange(storedImage)
      }
    }
  }, [initialImage, onImageChange, storageKey])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const dataUrl = await handleImageUpload(
        file,
        (url) => {
          setPreviewUrl(url)
          onImageChange(url)
        },
        storageKey,
      )

      if (!dataUrl) {
        toast.error("Failed to process image")
      }
    } catch (error) {
      toast.error("Error uploading image")
      console.error(error)
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    onImageChange(null)
    clearTemporaryImage(storageKey)
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="image-upload"
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-auto rounded-lg object-cover max-h-64"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 rounded-full"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="font-medium">Click to upload image</p>
            <p className="text-sm text-muted-foreground">JPG, PNG or GIF (max. 5MB)</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => {
            // In a real app, this would open the camera
            toast.info("Camera functionality would open here")
          }}
        >
          <Camera className="mr-2 h-4 w-4" />
          Take Photo
        </Button>
      </div>
    </div>
  )
}
