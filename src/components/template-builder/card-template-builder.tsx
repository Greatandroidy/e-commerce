"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

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
import { ImageUploader } from "@/components/template-builder/image-uploader"

export function CardTemplateBuilder() {
  const [template, setTemplate] = useState({
    title: "Premium Product",
    description: "This is a premium product with high-quality materials and craftsmanship.",
    image: "/placeholder.svg?height=400&width=300",
    buttonText: "Buy Now",
    buttonLink: "/product/premium",
    showButton: true,
    showImage: true,
    imagePosition: "top",
    cardStyle: "default",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#4f46e5",
    borderRadius: 8,
    shadow: "medium",
    aspectRatio: "square",
    hoverEffect: "scale",
    animation: "fade",
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  // Helper function to get shadow classes
  const getShadowClass = (shadow: string) => {
    switch (shadow) {
      case "none":
        return ""
      case "small":
        return "shadow-sm"
      case "medium":
        return "shadow-md"
      case "large":
        return "shadow-lg"
      default:
        return "shadow-md"
    }
  }

  // Helper function to get aspect ratio classes
  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case "square":
        return "aspect-square"
      case "video":
        return "aspect-video"
      case "portrait":
        return "aspect-[3/4]"
      case "wide":
        return "aspect-[16/9]"
      default:
        return "aspect-square"
    }
  }

  // Helper function to get hover effect classes
  const getHoverEffectClass = (effect: string) => {
    switch (effect) {
      case "none":
        return ""
      case "scale":
        return "transition-transform hover:scale-105"
      case "glow":
        return "transition-shadow hover:shadow-xl hover:shadow-primary/20"
      case "border":
        return "transition-colors hover:border-primary"
      default:
        return "transition-transform hover:scale-105"
    }
  }

  const renderCardPreview = () => {
    const {
      title,
      description,
      image,
      buttonText,
      showButton,
      showImage,
      imagePosition,
      cardStyle,
      backgroundColor,
      textColor,
      accentColor,
      borderRadius,
      shadow,
      aspectRatio,
      hoverEffect,
      animation,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
      borderRadius: `${borderRadius}px`,
    }

    const shadowClass = getShadowClass(shadow)
    const aspectRatioClass = getAspectRatioClass(aspectRatio)
    const hoverEffectClass = getHoverEffectClass(hoverEffect)

    // Animation variants
    const variants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.5 },
      },
      slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      },
      slideIn: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 },
      },
      scale: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.5 },
      },
    }

    const selectedAnimation = variants[animation as keyof typeof variants] || variants.fade

    // Render different card styles
    switch (cardStyle) {
      case "minimal":
        return (
          <motion.div
            className={`max-w-sm mx-auto border ${shadowClass} ${hoverEffectClass}`}
            style={containerStyle}
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            transition={selectedAnimation.transition}
          >
            {showImage && imagePosition === "top" && (
              <div className={aspectRatioClass}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              {showButton && (
                <div className="mt-4">
                  <Button variant="link" className="p-0 h-auto" style={{ color: accentColor }}>
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )

      case "bordered":
        return (
          <motion.div
            className={`max-w-sm mx-auto border-2 ${shadowClass} ${hoverEffectClass}`}
            style={{
              ...containerStyle,
              borderColor: accentColor,
            }}
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            transition={selectedAnimation.transition}
          >
            {showImage && imagePosition === "top" && (
              <div className={aspectRatioClass}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
              {showButton && (
                <div className="mt-6">
                  <Button style={{ backgroundColor: accentColor, color: "#ffffff" }}>{buttonText}</Button>
                </div>
              )}
            </div>
          </motion.div>
        )

      case "horizontal":
        return (
          <motion.div
            className={`max-w-md mx-auto border flex ${shadowClass} ${hoverEffectClass}`}
            style={containerStyle}
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            transition={selectedAnimation.transition}
          >
            {showImage && (
              <div className="w-1/3 flex-shrink-0">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4 flex-1">
              <h3 className="text-lg font-medium">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
              {showButton && (
                <div className="mt-4">
                  <Button size="sm" style={{ backgroundColor: accentColor, color: "#ffffff" }}>
                    {buttonText}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )

      // Default card style
      default:
        return (
          <motion.div
            className={`max-w-sm mx-auto border ${shadowClass} ${hoverEffectClass}`}
            style={containerStyle}
            initial={selectedAnimation.initial}
            animate={selectedAnimation.animate}
            transition={selectedAnimation.transition}
          >
            {showImage && imagePosition === "top" && (
              <div className={aspectRatioClass}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-medium">{title}</h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
              {showButton && (
                <div className="mt-6">
                  <Button style={{ backgroundColor: accentColor, color: "#ffffff" }}>{buttonText}</Button>
                </div>
              )}
            </div>
            {showImage && imagePosition === "bottom" && (
              <div className={aspectRatioClass}>
                <Image
                  src={image || "/placeholder.svg"}
                  alt={title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </motion.div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border p-6 flex justify-center">{renderCardPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="effects">Effects</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={template.title} onChange={(e) => handleChange("title", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={template.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showImage"
                checked={template.showImage}
                onCheckedChange={(checked) => handleChange("showImage", checked)}
              />
              <Label htmlFor="showImage">Show Image</Label>
            </div>

            {template.showImage && (
              <div className="space-y-2">
                <Label>Image</Label>
                <ImageUploader currentImage={template.image} onImageSelected={(url) => handleChange("image", url)} />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="showButton"
                checked={template.showButton}
                onCheckedChange={(checked) => handleChange("showButton", checked)}
              />
              <Label htmlFor="showButton">Show Button</Label>
            </div>

            {template.showButton && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={template.buttonText}
                    onChange={(e) => handleChange("buttonText", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={template.buttonLink}
                    onChange={(e) => handleChange("buttonLink", e.target.value)}
                  />
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="space-y-2">
              <Label>Card Style</Label>
              <Select value={template.cardStyle} onValueChange={(value) => handleChange("cardStyle", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="bordered">Bordered</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.showImage && template.cardStyle !== "horizontal" && (
              <div className="space-y-2">
                <Label>Image Position</Label>
                <Select value={template.imagePosition} onValueChange={(value) => handleChange("imagePosition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <Label>Accent Color</Label>
                <ColorPicker color={template.accentColor} onChange={(color) => handleChange("accentColor", color)} />
              </div>
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
              <Label>Shadow</Label>
              <Select value={template.shadow} onValueChange={(value) => handleChange("shadow", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shadow" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.showImage && (
              <div className="space-y-2">
                <Label>Aspect Ratio</Label>
                <Select value={template.aspectRatio} onValueChange={(value) => handleChange("aspectRatio", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square (1:1)</SelectItem>
                    <SelectItem value="video">Video (16:9)</SelectItem>
                    <SelectItem value="portrait">Portrait (3:4)</SelectItem>
                    <SelectItem value="wide">Wide (16:9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div className="space-y-2">
              <Label>Hover Effect</Label>
              <Select value={template.hoverEffect} onValueChange={(value) => handleChange("hoverEffect", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hover effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="scale">Scale</SelectItem>
                  <SelectItem value="glow">Glow</SelectItem>
                  <SelectItem value="border">Border Highlight</SelectItem>
                </SelectContent>
              </Select>
            </div>

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
