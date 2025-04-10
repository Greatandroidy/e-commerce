"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function HeroTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Elevate Your Style with Our Latest Collection",
    subheading: "Discover premium fashion that combines comfort, style, and sustainability.",
    primaryButtonText: "Shop Now",
    secondaryButtonText: "Learn More",
    showSecondaryButton: true,
    layout: "standard",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#3b82f6",
    imageUrl: "/placeholder.svg?height=600&width=800",
    imagePosition: "right",
    fullHeight: false,
    textAlignment: "left",
    paddingY: "large",
    showArrow: true,
    overlayMode: false,
    overlayColor: "rgba(0, 0, 0, 0.5)",
    overlayPosition: "center",
    overlayWidth: "md",
    backgroundVideo: false,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoMuted: true,
    videoLoop: true,
    videoAutoplay: true,
    gradientBackground: false,
    gradientFrom: "#4f46e5",
    gradientTo: "#818cf8",
    gradientDirection: "to-r",
    darkModeSupport: true,
    animation: "fade",
    borderRadius: 8,
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
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

  // Helper function to get text alignment classes
  const getTextAlignmentClasses = (alignment: string) => {
    switch (alignment) {
      case "left":
        return "text-left"
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  // Helper function to get overlay position classes
  const getOverlayPositionClasses = (position: string) => {
    switch (position) {
      case "center":
        return "items-center justify-center"
      case "left":
        return "items-center justify-start"
      case "right":
        return "items-center justify-end"
      case "top":
        return "items-start justify-center"
      case "bottom":
        return "items-end justify-center"
      case "top-left":
        return "items-start justify-start"
      case "top-right":
        return "items-start justify-end"
      case "bottom-left":
        return "items-end justify-start"
      case "bottom-right":
        return "items-end justify-end"
      default:
        return "items-center justify-center"
    }
  }

  // Helper function to get overlay width classes
  const getOverlayWidthClasses = (width: string) => {
    switch (width) {
      case "sm":
        return "max-w-sm"
      case "md":
        return "max-w-md"
      case "lg":
        return "max-w-lg"
      case "xl":
        return "max-w-xl"
      case "2xl":
        return "max-w-2xl"
      case "3xl":
        return "max-w-3xl"
      case "full":
        return "max-w-full"
      default:
        return "max-w-md"
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

  const renderHeroPreview = () => {
    const {
      heading,
      subheading,
      primaryButtonText,
      secondaryButtonText,
      showSecondaryButton,
      layout,
      backgroundColor,
      textColor,
      accentColor,
      imageUrl,
      imagePosition,
      fullHeight,
      textAlignment,
      paddingY,
      showArrow,
      overlayMode,
      overlayColor,
      overlayPosition,
      overlayWidth,
      backgroundVideo,
      videoUrl,
      videoMuted,
      videoLoop,
      videoAutoplay,
      gradientBackground,
      gradientFrom,
      gradientTo,
      gradientDirection,
      borderRadius,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor: gradientBackground ? "transparent" : backgroundColor,
      color: textColor,
    }

    const accentStyle = {
      color: accentColor,
    }

    const buttonStyle = {
      backgroundColor: accentColor,
      color: "#ffffff",
    }

    const heightClass = fullHeight ? "min-h-screen" : ""
    const paddingClass = getPaddingClasses(paddingY)
    const textAlignClass = getTextAlignmentClasses(textAlignment)
    const overlayPositionClass = getOverlayPositionClasses(overlayPosition)
    const overlayWidthClass = getOverlayWidthClasses(overlayWidth)
    const gradientClass = gradientBackground ? getGradientClasses(gradientDirection) : ""

    // Media-only layout with overlay
    if (layout === "media-only") {
      return (
        <div
          className={`${heightClass} ${paddingClass} ${gradientClass}`}
          style={{
            ...containerStyle,
            ...(gradientBackground
              ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
              : {}),
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-lg" style={{ borderRadius: `${borderRadius}px` }}>
              {backgroundVideo ? (
                <div className="aspect-video w-full">
                  {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                    <iframe
                      src={`${videoUrl}?autoplay=${videoAutoplay ? "1" : "0"}&mute=${
                        videoMuted ? "1" : "0"
                      }&loop=${videoLoop ? "1" : "0"}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      src={videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay={videoAutoplay}
                      muted={videoMuted}
                      loop={videoLoop}
                      playsInline
                    ></video>
                  )}
                </div>
              ) : (
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Hero"
                  className={`w-full ${getAnimationClass("media")}`}
                />
              )}
              <div
                className={`absolute inset-0 flex ${overlayPositionClass}`}
                style={{ backgroundColor: overlayColor }}
              >
                <div className={`${overlayWidthClass} p-6 md:p-12 ${textAlignClass} ${getAnimationClass("text")}`}>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                    {heading}
                  </h1>
                  <p className="mt-4 text-lg text-white/90">{subheading}</p>
                  <div
                    className={`mt-6 flex flex-col sm:flex-row gap-3 ${
                      textAlignment === "center"
                        ? "justify-center"
                        : textAlignment === "right"
                          ? "justify-end"
                          : "justify-start"
                    }`}
                  >
                    <Button style={buttonStyle}>
                      {primaryButtonText}
                      {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    {showSecondaryButton && (
                      <Button variant="outline" className="text-white border-white hover:bg-white/10">
                        {secondaryButtonText}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Render different layouts
    switch (layout) {
      case "centered":
        return (
          <div
            className={`${heightClass} ${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                <h1
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${getAnimationClass("text")}`}
                >
                  {heading}
                </h1>
                <p
                  className={`mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${getAnimationClass(
                    "text",
                  )}`}
                >
                  {subheading}
                </p>
                <div className={`flex flex-col sm:flex-row gap-3 ${getAnimationClass("text")}`}>
                  <Button style={buttonStyle}>
                    {primaryButtonText}
                    {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                  {showSecondaryButton && (
                    <Button variant="outline" style={{ borderColor: accentColor, color: accentColor }}>
                      {secondaryButtonText}
                    </Button>
                  )}
                </div>
                {!overlayMode && (
                  <div
                    className={`w-full max-w-3xl aspect-video overflow-hidden rounded-xl ${getAnimationClass("media")}`}
                  >
                    {backgroundVideo ? (
                      <div className="w-full h-full">
                        {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                          <iframe
                            src={`${videoUrl}?autoplay=${videoAutoplay ? "1" : "0"}&mute=${
                              videoMuted ? "1" : "0"
                            }&loop=${videoLoop ? "1" : "0"}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay={videoAutoplay}
                            muted={videoMuted}
                            loop={videoLoop}
                            playsInline
                          ></video>
                        )}
                      </div>
                    ) : (
                      <img src={imageUrl || "/placeholder.svg"} alt="Hero" className="object-cover w-full h-full" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      case "split":
        return (
          <div
            className={`${heightClass} ${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className={`space-y-4 ${imagePosition === "left" ? "md:order-2" : "md:order-1"}`}>
                  <h1
                    className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${textAlignClass} ${getAnimationClass(
                      "text",
                    )}`}
                  >
                    {heading}
                  </h1>
                  <p
                    className={`text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ${textAlignClass} ${getAnimationClass(
                      "text",
                    )}`}
                  >
                    {subheading}
                  </p>
                  <div
                    className={`flex flex-col sm:flex-row gap-3 ${
                      textAlignment === "center"
                        ? "justify-center"
                        : textAlignment === "right"
                          ? "justify-end"
                          : "justify-start"
                    } ${getAnimationClass("text")}`}
                  >
                    <Button style={buttonStyle}>
                      {primaryButtonText}
                      {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    {showSecondaryButton && (
                      <Button variant="outline" style={{ borderColor: accentColor, color: accentColor }}>
                        {secondaryButtonText}
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  className={`${imagePosition === "left" ? "md:order-1" : "md:order-2"} ${getAnimationClass("media")}`}
                >
                  <div
                    className="aspect-video overflow-hidden rounded-xl"
                    style={{ borderRadius: `${borderRadius}px` }}
                  >
                    {backgroundVideo ? (
                      <div className="w-full h-full">
                        {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                          <iframe
                            src={`${videoUrl}?autoplay=${videoAutoplay ? "1" : "0"}&mute=${
                              videoMuted ? "1" : "0"
                            }&loop=${videoLoop ? "1" : "0"}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay={videoAutoplay}
                            muted={videoMuted}
                            loop={videoLoop}
                            playsInline
                          ></video>
                        )}
                      </div>
                    ) : (
                      <img src={imageUrl || "/placeholder.svg"} alt="Hero" className="object-cover w-full h-full" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case "minimal":
        return (
          <div
            className={`${heightClass} ${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="max-w-2xl mx-auto text-center space-y-4">
                <h1
                  className={`text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl ${getAnimationClass("text")}`}
                >
                  {heading}
                </h1>
                <div className={`flex justify-center ${getAnimationClass("text")}`}>
                  <Button style={buttonStyle}>
                    {primaryButtonText}
                    {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )

      // Standard layout (default)
      default:
        return (
          <div
            className={`${heightClass} ${paddingClass} ${gradientClass}`}
            style={{
              ...containerStyle,
              ...(gradientBackground
                ? { backgroundImage: `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})` }
                : {}),
            }}
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                <div className={`flex flex-col justify-center space-y-4 ${getAnimationClass("text")}`}>
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                      {heading}
                    </h1>
                    <p className="max-w-[600px] text-gray-500 md:text-xl">{subheading}</p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <Button style={buttonStyle}>
                      {primaryButtonText}
                      {showArrow && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                    {showSecondaryButton && (
                      <Button variant="outline" style={{ borderColor: accentColor, color: accentColor }}>
                        {secondaryButtonText}
                      </Button>
                    )}
                  </div>
                </div>
                <div className={`flex items-center justify-center ${getAnimationClass("media")}`}>
                  <div
                    className="aspect-video overflow-hidden rounded-xl w-full"
                    style={{ borderRadius: `${borderRadius}px` }}
                  >
                    {backgroundVideo ? (
                      <div className="w-full h-full">
                        {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
                          <iframe
                            src={`${videoUrl}?autoplay=${videoAutoplay ? "1" : "0"}&mute=${
                              videoMuted ? "1" : "0"
                            }&loop=${videoLoop ? "1" : "0"}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video
                            src={videoUrl}
                            className="w-full h-full object-cover"
                            autoPlay={videoAutoplay}
                            muted={videoMuted}
                            loop={videoLoop}
                            playsInline
                          ></video>
                        )}
                      </div>
                    ) : (
                      <img
                        alt="Hero"
                        className="aspect-video overflow-hidden rounded-xl object-cover"
                        src={imageUrl || "/placeholder.svg"}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderHeroPreview()}</div>

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
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryButtonText">Primary Button Text</Label>
              <Input
                id="primaryButtonText"
                value={template.primaryButtonText}
                onChange={(e) => handleChange("primaryButtonText", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showSecondaryButton"
                checked={template.showSecondaryButton}
                onCheckedChange={(checked) => handleChange("showSecondaryButton", checked)}
              />
              <Label htmlFor="showSecondaryButton">Show Secondary Button</Label>
            </div>

            {template.showSecondaryButton && (
              <div className="space-y-2">
                <Label htmlFor="secondaryButtonText">Secondary Button Text</Label>
                <Input
                  id="secondaryButtonText"
                  value={template.secondaryButtonText}
                  onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="showArrow"
                checked={template.showArrow}
                onCheckedChange={(checked) => handleChange("showArrow", checked)}
              />
              <Label htmlFor="showArrow">Show Button Arrow</Label>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="backgroundVideo"
                checked={template.backgroundVideo}
                onCheckedChange={(checked) => handleChange("backgroundVideo", checked)}
              />
              <Label htmlFor="backgroundVideo">Use Video Background</Label>
            </div>

            {template.backgroundVideo ? (
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={template.videoUrl}
                  onChange={(e) => handleChange("videoUrl", e.target.value)}
                  placeholder="YouTube embed URL or direct video URL"
                />
                <p className="text-xs text-muted-foreground">
                  For YouTube videos, use the embed URL (e.g., https://www.youtube.com/embed/VIDEO_ID)
                </p>

                <div className="flex items-center space-x-2 mt-4">
                  <Switch
                    id="videoAutoplay"
                    checked={template.videoAutoplay}
                    onCheckedChange={(checked) => handleChange("videoAutoplay", checked)}
                  />
                  <Label htmlFor="videoAutoplay">Autoplay</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="videoMuted"
                    checked={template.videoMuted}
                    onCheckedChange={(checked) => handleChange("videoMuted", checked)}
                  />
                  <Label htmlFor="videoMuted">Muted</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="videoLoop"
                    checked={template.videoLoop}
                    onCheckedChange={(checked) => handleChange("videoLoop", checked)}
                  />
                  <Label htmlFor="videoLoop">Loop</Label>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={template.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="overlayMode"
                checked={template.overlayMode}
                onCheckedChange={(checked) => handleChange("overlayMode", checked)}
              />
              <Label htmlFor="overlayMode">Content Overlay on Media</Label>
            </div>

            {template.overlayMode && (
              <>
                <div className="space-y-2">
                  <Label>Overlay Color</Label>
                  <ColorPicker
                    color={template.overlayColor}
                    onChange={(color) => handleChange("overlayColor", color)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Overlay Position</Label>
                  <Select
                    value={template.overlayPosition}
                    onValueChange={(value) => handleChange("overlayPosition", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Overlay Width</Label>
                  <Select value={template.overlayWidth} onValueChange={(value) => handleChange("overlayWidth", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select width" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">X-Large</SelectItem>
                      <SelectItem value="2xl">2X-Large</SelectItem>
                      <SelectItem value="3xl">3X-Large</SelectItem>
                      <SelectItem value="full">Full Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
              <Label>Accent Color (Buttons)</Label>
              <ColorPicker color={template.accentColor} onChange={(color) => handleChange("accentColor", color)} />
            </div>

            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <Select value={template.textAlignment} onValueChange={(value) => handleChange("textAlignment", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
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

            <div className="flex items-center space-x-2">
              <Switch
                id="darkModeSupport"
                checked={template.darkModeSupport}
                onCheckedChange={(checked) => handleChange("darkModeSupport", checked)}
              />
              <Label htmlFor="darkModeSupport">Dark Mode Support</Label>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="centered">Centered</SelectItem>
                  <SelectItem value="split">Split</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="media-only">Media Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.layout === "split" && (
              <div className="space-y-2">
                <Label>Image Position</Label>
                <Select value={template.imagePosition} onValueChange={(value) => handleChange("imagePosition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="fullHeight"
                checked={template.fullHeight}
                onCheckedChange={(checked) => handleChange("fullHeight", checked)}
              />
              <Label htmlFor="fullHeight">Full Height</Label>
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
