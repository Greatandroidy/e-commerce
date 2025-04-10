"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/template-builder/color-picker"
import { ImageUploader } from "@/components/template-builder/image-uploader"

export function CarouselTemplateBuilder() {
  const [template, setTemplate] = useState({
    slides: [
      {
        title: "Discover Our Latest Collection",
        description: "Explore our newest arrivals and find your perfect style.",
        image: "/placeholder.svg?height=600&width=1200&text=Slide+1",
        buttonText: "Shop Now",
        buttonLink: "/shop",
      },
      {
        title: "Summer Sale - Up to 50% Off",
        description: "Limited time offer on selected items. Don't miss out!",
        image: "/placeholder.svg?height=600&width=1200&text=Slide+2",
        buttonText: "View Offers",
        buttonLink: "/sale",
      },
      {
        title: "Free Shipping on Orders Over $50",
        description: "Enjoy free shipping on all domestic orders over $50.",
        image: "/placeholder.svg?height=600&width=1200&text=Slide+3",
        buttonText: "Learn More",
        buttonLink: "/shipping",
      },
    ],
    autoplay: true,
    autoplaySpeed: 5000,
    showArrows: true,
    showDots: true,
    showOverlay: true,
    overlayColor: "rgba(0, 0, 0, 0.4)",
    textColor: "#ffffff",
    accentColor: "#4f46e5",
    height: "large",
    rounded: true,
    animation: "fade",
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handleSlideChange = (index: number, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      slides: prev.slides.map((slide, i) => (i === index ? { ...slide, [key]: value } : slide)),
    }))
  }

  const addSlide = () => {
    setTemplate((prev) => ({
      ...prev,
      slides: [
        ...prev.slides,
        {
          title: "New Slide",
          description: "Description for the new slide",
          image: "/placeholder.svg?height=600&width=1200&text=New+Slide",
          buttonText: "Click Here",
          buttonLink: "#",
        },
      ],
    }))
  }

  const removeSlide = (index: number) => {
    setTemplate((prev) => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }))
  }

  // Helper function to get height classes
  const getHeightClasses = (size: string) => {
    switch (size) {
      case "small":
        return "aspect-[21/9]"
      case "medium":
        return "aspect-[16/9]"
      case "large":
        return "aspect-[3/1]"
      case "full":
        return "h-[calc(100vh-4rem)]"
      default:
        return "aspect-[16/9]"
    }
  }

  const renderCarouselPreview = () => {
    const {
      slides,
      autoplay,
      autoplaySpeed,
      showArrows,
      showDots,
      showOverlay,
      overlayColor,
      textColor,
      accentColor,
      height,
      rounded,
      animation,
    } = template

    // Common styles
    const heightClass = getHeightClasses(height)
    const roundedClass = rounded ? "rounded-lg overflow-hidden" : ""

    // Animation classes
    const getAnimationClass = (index: number) => {
      if (index !== 0) return "hidden" // Only show the first slide in preview
      switch (animation) {
        case "fade":
          return "opacity-100"
        case "slide":
          return "translate-x-0"
        case "zoom":
          return "scale-100"
        default:
          return "opacity-100"
      }
    }

    return (
      <div className={`relative ${heightClass} ${roundedClass}`}>
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${getAnimationClass(index)}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            {showOverlay && <div className="absolute inset-0" style={{ backgroundColor: overlayColor }}></div>}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="max-w-xl text-center p-6">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: textColor }}>
                  {slide.title}
                </h2>
                {slide.description && (
                  <p className="text-lg mb-6 opacity-90" style={{ color: textColor }}>
                    {slide.description}
                  </p>
                )}
                {slide.buttonText && (
                  <button
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                    style={{ backgroundColor: accentColor, color: "#ffffff" }}
                  >
                    {slide.buttonText}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {showArrows && (
          <>
            <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="sr-only">Previous slide</span>
            </button>
            <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <span className="sr-only">Next slide</span>
            </button>
          </>
        )}

        {showDots && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === 0 ? "bg-primary" : "bg-white/50"}`}
              ></button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderCarouselPreview()}</div>

        <Tabs defaultValue="slides">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="controls">Controls</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>

          <TabsContent value="slides" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addSlide} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Slide
              </Button>
            </div>

            <div className="space-y-6">
              {template.slides.map((slide, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Slide {index + 1}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSlide(index)}
                        disabled={template.slides.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={slide.title}
                            onChange={(e) => handleSlideChange(index, "title", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={slide.description}
                            onChange={(e) => handleSlideChange(index, "description", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input
                              value={slide.buttonText}
                              onChange={(e) => handleSlideChange(index, "buttonText", e.target.value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Button Link</Label>
                            <Input
                              value={slide.buttonLink}
                              onChange={(e) => handleSlideChange(index, "buttonLink", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Image</Label>
                        <ImageUploader
                          currentImage={slide.image}
                          onImageSelected={(url) => handleSlideChange(index, "image", url)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="controls" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="autoplay"
                checked={template.autoplay}
                onCheckedChange={(checked) => handleChange("autoplay", checked)}
              />
              <Label htmlFor="autoplay">Autoplay</Label>
            </div>

            {template.autoplay && (
              <div className="space-y-2">
                <Label>Autoplay Speed (ms)</Label>
                <Select
                  value={String(template.autoplaySpeed)}
                  onValueChange={(value) => handleChange("autoplaySpeed", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3000">3 seconds</SelectItem>
                    <SelectItem value="5000">5 seconds</SelectItem>
                    <SelectItem value="7000">7 seconds</SelectItem>
                    <SelectItem value="10000">10 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="showArrows"
                checked={template.showArrows}
                onCheckedChange={(checked) => handleChange("showArrows", checked)}
              />
              <Label htmlFor="showArrows">Show Navigation Arrows</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showDots"
                checked={template.showDots}
                onCheckedChange={(checked) => handleChange("showDots", checked)}
              />
              <Label htmlFor="showDots">Show Pagination Dots</Label>
            </div>

            <div className="space-y-2">
              <Label>Animation Type</Label>
              <Select value={template.animation} onValueChange={(value) => handleChange("animation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select animation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="slide">Slide</SelectItem>
                  <SelectItem value="zoom">Zoom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="showOverlay"
                checked={template.showOverlay}
                onCheckedChange={(checked) => handleChange("showOverlay", checked)}
              />
              <Label htmlFor="showOverlay">Show Overlay</Label>
            </div>

            {template.showOverlay && (
              <div className="space-y-2">
                <Label>Overlay Color</Label>
                <ColorPicker color={template.overlayColor} onChange={(color) => handleChange("overlayColor", color)} />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker color={template.textColor} onChange={(color) => handleChange("textColor", color)} />
              </div>

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <ColorPicker color={template.accentColor} onChange={(color) => handleChange("accentColor", color)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Height</Label>
              <Select value={template.height} onValueChange={(value) => handleChange("height", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select height" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (21:9)</SelectItem>
                  <SelectItem value="medium">Medium (16:9)</SelectItem>
                  <SelectItem value="large">Large (3:1)</SelectItem>
                  <SelectItem value="full">Full Height</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="rounded"
                checked={template.rounded}
                onCheckedChange={(checked) => handleChange("rounded", checked)}
              />
              <Label htmlFor="rounded">Rounded Corners</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
