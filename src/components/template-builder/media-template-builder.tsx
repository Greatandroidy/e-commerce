"use client"

import { useState } from "react"
import { Play, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function MediaTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Discover Our Latest Collection",
    subheading: "Watch the video to see our products in action and learn more about our brand story.",
    mediaType: "video", // video, image, carousel
    mediaUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Default YouTube embed
    imageUrl: "/placeholder.svg?height=600&width=800",
    carouselImages: [
      "/placeholder.svg?height=600&width=800&text=Image+1",
      "/placeholder.svg?height=600&width=800&text=Image+2",
      "/placeholder.svg?height=600&width=800&text=Image+3",
    ],
    layout: "media-right",
    style: "default",
    showOverlay: true,
    overlayOpacity: 50,
    showPlayButton: true,
    autoplay: false,
    muted: true,
    loop: true,
    controls: true,
    backgroundColor: "#ffffff",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    borderRadius: 8,
    aspectRatio: "16/9",
    animation: "fade",
    gradientBackground: false,
    gradientFrom: "#4f46e5",
    gradientTo: "#818cf8",
    gradientDirection: "to-r",
    paddingY: "medium",
    mediaWidth: "50%",
    showCaption: false,
    caption: "Video showcasing our latest products and design process",
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const addCarouselImage = () => {
    setTemplate((prev) => ({
      ...prev,
      carouselImages: [
        ...prev.carouselImages,
        `/placeholder.svg?height=600&width=800&text=Image+${prev.carouselImages.length + 1}`,
      ],
    }))
  }

  const removeCarouselImage = (index: number) => {
    setTemplate((prev) => ({
      ...prev,
      carouselImages: prev.carouselImages.filter((_, i) => i !== index),
    }))
  }

  const updateCarouselImage = (index: number, value: string) => {
    setTemplate((prev) => ({
      ...prev,
      carouselImages: prev.carouselImages.map((img, i) => (i === index ? value : img)),
    }))
  }

  // Helper function to get padding classes
  const getPaddingClasses = (size: string) => {
    switch (size) {
      case "small":
        return "py-8"
      case "medium":
        return "py-16"
      case "large":
        return "py-24"
      default:
        return "py-16"
    }
  }

  // Helper function to get gradient classes
  const getGradientClasses = (direction: string) => {
    switch (direction) {
      case "to-r":
        return "bg-gradient-to-r"
      case "to-l":
        return "bg-gradient-to-l"
      case "to-t":
        return "bg-gradient-to-t"
      case "to-b":
        return "bg-gradient-to-b"
      case "to-tr":
        return "bg-gradient-to-tr"
      case "to-tl":
        return "bg-gradient-to-tl"
      case "to-br":
        return "bg-gradient-to-br"
      case "to-bl":
        return "bg-gradient-to-bl"
      default:
        return "bg-gradient-to-r"
    }
  }

  // Helper function to get aspect ratio classes
  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case "1/1":
        return "aspect-square"
      case "16/9":
        return "aspect-video"
      case "4/3":
        return "aspect-[4/3]"
      case "21/9":
        return "aspect-[21/9]"
      default:
        return "aspect-video"
    }
  }

  // Animation classes
  const getAnimationClass = (element: string) => {
    switch (template.animation) {
      case "fade":
        return "animate-fade-in"
      case "slideUp":
        return element === "media" ? "animate-slide-up" : "animate-slide-up-delayed"
      case "slideIn":
        return element === "media" ? "animate-slide-in-right" : "animate-slide-in-left"
      case "scale":
        return "animate-scale"
      default:
        return ""
    }
  }

  const renderMediaContent = () => {
    const {
      mediaType,
      mediaUrl,
      imageUrl,
      carouselImages,
      showOverlay,
      overlayOpacity,
      showPlayButton,
      autoplay,
      muted,
      loop,
      controls,
      aspectRatio,
      borderRadius,
      accentColor,
      showCaption,
      caption,
    } = template

    const aspectRatioClass = getAspectRatioClass(aspectRatio)
    const borderRadiusStyle = { borderRadius: `${borderRadius}px` }

    switch (mediaType) {
      case "video":
        // Check if it's a YouTube URL
        const isYouTube = mediaUrl.includes("youtube.com") || mediaUrl.includes("youtu.be")

        if (isYouTube) {
          return (
            <div className="relative w-full">
              <div className={`${aspectRatioClass} overflow-hidden`} style={borderRadiusStyle}>
                <iframe
                  src={`${mediaUrl}${autoplay ? "?autoplay=1" : ""}${muted ? "&mute=1" : ""}${loop ? "&loop=1" : ""}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              {showCaption && <p className="text-sm text-muted-foreground mt-2">{caption}</p>}
            </div>
          )
        } else {
          return (
            <div className="relative w-full">
              <div className={`${aspectRatioClass} overflow-hidden relative`} style={borderRadiusStyle}>
                <video
                  src={mediaUrl || "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"}
                  autoPlay={autoplay}
                  muted={muted}
                  loop={loop}
                  controls={controls}
                  className="w-full h-full object-cover"
                ></video>
                {showOverlay && (
                  <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }}></div>
                )}
                {showPlayButton && (
                  <button className="absolute inset-0 flex items-center justify-center" style={{ color: accentColor }}>
                    <div className="h-16 w-16 rounded-full bg-white/80 flex items-center justify-center">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                  </button>
                )}
              </div>
              {showCaption && <p className="text-sm text-muted-foreground mt-2">{caption}</p>}
            </div>
          )
        }

      case "carousel":
        return (
          <div className="relative w-full">
            <div className={`${aspectRatioClass} overflow-hidden relative`} style={borderRadiusStyle}>
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {carouselImages.map((image, index) => (
                  <div key={index} className="flex-none w-full snap-center">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: index === 0 ? accentColor : "#cbd5e1" }}
                  ></button>
                ))}
              </div>
            </div>
            {showCaption && <p className="text-sm text-muted-foreground mt-2">{caption}</p>}
          </div>
        )

      // Image (default)
      default:
        return (
          <div className="relative w-full">
            <div className={`${aspectRatioClass} overflow-hidden relative`} style={borderRadiusStyle}>
              <img src={imageUrl || "/placeholder.svg"} alt="Media content" className="w-full h-full object-cover" />
              {showOverlay && (
                <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }}></div>
              )}
            </div>
            {showCaption && <p className="text-sm text-muted-foreground mt-2">{caption}</p>}
          </div>
        )
    }
  }

  const renderMediaPreview = () => {
    const {
      heading,
      subheading,
      layout,
      backgroundColor,
      textColor,
      gradientBackground,
      gradientFrom,
      gradientTo,
      gradientDirection,
      paddingY,
      mediaWidth,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor: gradientBackground ? "transparent" : backgroundColor,
      color: textColor,
    }

    const paddingClass = getPaddingClasses(paddingY)
    const gradientClass = gradientBackground ? getGradientClasses(gradientDirection) : ""

    // Render different layouts
    switch (layout) {
      case "media-left":
        return (
          <div
            className={`${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={`md:w-[${mediaWidth}] ${getAnimationClass("media")}`}>{renderMediaContent()}</div>
                <div className={`md:flex-1 ${getAnimationClass("text")}`}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">{heading}</h2>
                  <p className="text-muted-foreground">{subheading}</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "media-right":
        return (
          <div
            className={`${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className={`md:flex-1 ${getAnimationClass("text")}`}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">{heading}</h2>
                  <p className="text-muted-foreground">{subheading}</p>
                </div>
                <div className={`md:w-[${mediaWidth}] ${getAnimationClass("media")}`}>{renderMediaContent()}</div>
              </div>
            </div>
          </div>
        )

      case "media-top":
        return (
          <div
            className={`${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col gap-8 items-center">
                <div className={`w-full ${getAnimationClass("media")}`}>{renderMediaContent()}</div>
                <div className={`text-center max-w-2xl mx-auto ${getAnimationClass("text")}`}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">{heading}</h2>
                  <p className="text-muted-foreground">{subheading}</p>
                </div>
              </div>
            </div>
          </div>
        )

      case "media-bottom":
        return (
          <div
            className={`${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col gap-8 items-center">
                <div className={`text-center max-w-2xl mx-auto ${getAnimationClass("text")}`}>
                  <h2 className="text-3xl font-bold tracking-tight mb-4">{heading}</h2>
                  <p className="text-muted-foreground">{subheading}</p>
                </div>
                <div className={`w-full ${getAnimationClass("media")}`}>{renderMediaContent()}</div>
              </div>
            </div>
          </div>
        )

      case "media-overlay":
        return (
          <div
            className={`${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="relative">
                <div className={getAnimationClass("media")}>{renderMediaContent()}</div>
                <div className={`absolute inset-0 flex items-center justify-center ${getAnimationClass("text")}`}>
                  <div className="bg-background/80 p-6 rounded-lg max-w-md text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">{heading}</h2>
                    <p className="text-muted-foreground">{subheading}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      // Media only (default)
      default:
        return (
          <div
            className={`${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className={`max-w-3xl mx-auto ${getAnimationClass("media")}`}>{renderMediaContent()}</div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderMediaPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input id="heading" value={template.heading} onChange={(e) => handleChange("heading", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Textarea
                id="subheading"
                value={template.subheading}
                onChange={(e) => handleChange("subheading", e.target.value)}
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showCaption"
                checked={template.showCaption}
                onCheckedChange={(checked) => handleChange("showCaption", checked)}
              />
              <Label htmlFor="showCaption">Show Media Caption</Label>
            </div>

            {template.showCaption && (
              <div className="space-y-2">
                <Label htmlFor="caption">Caption</Label>
                <Input
                  id="caption"
                  value={template.caption}
                  onChange={(e) => handleChange("caption", e.target.value)}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="space-y-2">
              <Label>Media Type</Label>
              <Select value={template.mediaType} onValueChange={(value) => handleChange("mediaType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="carousel">Image Carousel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.mediaType === "video" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="mediaUrl">Video URL</Label>
                  <Input
                    id="mediaUrl"
                    value={template.mediaUrl}
                    onChange={(e) => handleChange("mediaUrl", e.target.value)}
                    placeholder="YouTube embed URL or direct video URL"
                  />
                  <p className="text-xs text-muted-foreground">
                    For YouTube videos, use the embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoplay"
                    checked={template.autoplay}
                    onCheckedChange={(checked) => handleChange("autoplay", checked)}
                  />
                  <Label htmlFor="autoplay">Autoplay</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="muted"
                    checked={template.muted}
                    onCheckedChange={(checked) => handleChange("muted", checked)}
                  />
                  <Label htmlFor="muted">Muted</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="loop"
                    checked={template.loop}
                    onCheckedChange={(checked) => handleChange("loop", checked)}
                  />
                  <Label htmlFor="loop">Loop</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="controls"
                    checked={template.controls}
                    onCheckedChange={(checked) => handleChange("controls", checked)}
                  />
                  <Label htmlFor="controls">Show Controls</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showPlayButton"
                    checked={template.showPlayButton}
                    onCheckedChange={(checked) => handleChange("showPlayButton", checked)}
                  />
                  <Label htmlFor="showPlayButton">Show Play Button Overlay</Label>
                </div>
              </>
            )}

            {template.mediaType === "image" && (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={template.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                />
              </div>
            )}

            {template.mediaType === "carousel" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Carousel Images</Label>
                  <Button onClick={addCarouselImage} size="sm" variant="outline">
                    Add Image
                  </Button>
                </div>

                {template.carouselImages.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => updateCarouselImage(index, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCarouselImage(index)}
                      disabled={template.carouselImages.length <= 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

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
                <Label>Overlay Opacity ({template.overlayOpacity}%)</Label>
                <Slider
                  value={[template.overlayOpacity]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => handleChange("overlayOpacity", value[0])}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker
                  color={template.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker color={template.textColor} onChange={(color) => handleChange("textColor", color)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Accent Color</Label>
              <ColorPicker color={template.accentColor} onChange={(color) => handleChange("accentColor", color)} />
            </div>

            <div className="space-y-2">
              <Label>Border Radius ({template.borderRadius}px)</Label>
              <Slider
                value={[template.borderRadius]}
                min={0}
                max={24}
                step={1}
                onValueChange={(value) => handleChange("borderRadius", value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label>Aspect Ratio</Label>
              <Select value={template.aspectRatio} onValueChange={(value) => handleChange("aspectRatio", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="16/9">16:9 (Widescreen)</SelectItem>
                  <SelectItem value="4/3">4:3 (Standard)</SelectItem>
                  <SelectItem value="1/1">1:1 (Square)</SelectItem>
                  <SelectItem value="21/9">21:9 (Ultrawide)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Padding</Label>
              <Select value={template.paddingY} onValueChange={(value) => handleChange("paddingY", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select padding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="gradientBackground"
                checked={template.gradientBackground}
                onCheckedChange={(checked) => handleChange("gradientBackground", checked)}
              />
              <Label htmlFor="gradientBackground">Use Gradient Background</Label>
            </div>

            {template.gradientBackground && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Gradient From</Label>
                    <ColorPicker
                      color={template.gradientFrom}
                      onChange={(color) => handleChange("gradientFrom", color)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gradient To</Label>
                    <ColorPicker color={template.gradientTo} onChange={(color) => handleChange("gradientTo", color)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gradient Direction</Label>
                  <Select
                    value={template.gradientDirection}
                    onValueChange={(value) => handleChange("gradientDirection", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select direction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-r">Left to Right</SelectItem>
                      <SelectItem value="to-l">Right to Left</SelectItem>
                      <SelectItem value="to-t">Bottom to Top</SelectItem>
                      <SelectItem value="to-b">Top to Bottom</SelectItem>
                      <SelectItem value="to-tr">Bottom Left to Top Right</SelectItem>
                      <SelectItem value="to-tl">Bottom Right to Top Left</SelectItem>
                      <SelectItem value="to-br">Top Left to Bottom Right</SelectItem>
                      <SelectItem value="to-bl">Top Right to Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="media-only">Media Only</SelectItem>
                  <SelectItem value="media-left">Media Left</SelectItem>
                  <SelectItem value="media-right">Media Right</SelectItem>
                  <SelectItem value="media-top">Media Top</SelectItem>
                  <SelectItem value="media-bottom">Media Bottom</SelectItem>
                  <SelectItem value="media-overlay">Media with Overlay Text</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(template.layout === "media-left" || template.layout === "media-right") && (
              <div className="space-y-2">
                <Label>Media Width</Label>
                <Select value={template.mediaWidth} onValueChange={(value) => handleChange("mediaWidth", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select width" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="33%">One Third</SelectItem>
                    <SelectItem value="40%">40%</SelectItem>
                    <SelectItem value="50%">Half</SelectItem>
                    <SelectItem value="60%">60%</SelectItem>
                    <SelectItem value="66%">Two Thirds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Animation</Label>
              <Select value={template.animation} onValueChange={(value) => handleChange("animation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select animation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade In</SelectItem>
                  <SelectItem value="slideUp">Slide Up</SelectItem>
                  <SelectItem value="slideIn">Slide In</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
