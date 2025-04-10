// Helper functions for temporary image storage in localStorage

// Store an image in localStorage with expiration
export const storeTemporaryImage = (imageData: string, key = "temp_image"): void => {
  try {
    const expiryTime = Date.now() + 5 * 60 * 1000 // 5 minutes from now
    const imageObject = {
      data: imageData,
      expiry: expiryTime,
    }

    localStorage.setItem(key, JSON.stringify(imageObject))
  } catch (error) {
    console.error("Error storing image in localStorage:", error)
  }
}

// Retrieve an image from localStorage if not expired
export const getTemporaryImage = (key = "temp_image"): string | null => {
  try {
    const storedData = localStorage.getItem(key)

    if (!storedData) return null

    const imageObject = JSON.parse(storedData)
    const now = Date.now()

    // Check if image has expired
    if (now > imageObject.expiry) {
      localStorage.removeItem(key)
      return null
    }

    return imageObject.data
  } catch (error) {
    console.error("Error retrieving image from localStorage:", error)
    return null
  }
}

// Clear a temporary image from localStorage
export const clearTemporaryImage = (key = "temp_image"): void => {
  localStorage.removeItem(key)
}

// Clean up all expired temporary images
export const cleanupExpiredImages = (): void => {
  try {
    const now = Date.now()

    // Find all temporary image keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)

      if (key && key.startsWith("temp_image")) {
        const storedData = localStorage.getItem(key)

        if (storedData) {
          const imageObject = JSON.parse(storedData)

          if (now > imageObject.expiry) {
            localStorage.removeItem(key)
          }
        }
      }
    }
  } catch (error) {
    console.error("Error cleaning up expired images:", error)
  }
}

// Convert a File object to a data URL
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      resolve(reader.result as string)
    }

    reader.onerror = () => {
      reject(new Error("Failed to read file"))
    }

    reader.readAsDataURL(file)
  })
}

// Handle image upload with preview and temporary storage
export const handleImageUpload = async (
  file: File,
  onSuccess?: (dataUrl: string) => void,
  storageKey = "temp_image",
): Promise<string | null> => {
  try {
    // Check file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image")
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB")
    }

    // Convert to data URL
    const dataUrl = await fileToDataUrl(file)

    // Store in localStorage
    storeTemporaryImage(dataUrl, storageKey)

    // Call success callback if provided
    if (onSuccess) {
      onSuccess(dataUrl)
    }

    return dataUrl
  } catch (error) {
    console.error("Error handling image upload:", error)
    return null
  }
}
