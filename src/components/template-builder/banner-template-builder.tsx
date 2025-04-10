"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function BannerTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Special Offer",
    subheading: "Get 20% off on your first order",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    showButton: true,
    showDismiss: true,
    layout: "standard",
    position: "top",
    backgroundColor: "#4f46e5",
    textColor: "#ffffff",
    buttonVariant: "default",
    paddingY: "small",
    sticky: false,
    fullWidth: true,
    rounded: false,
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  // Helper function to get padding classes
  const getPaddingClasses = (size: string) => {
    switch (size) {
      case "none":
        return "py-0"
      case "small":
        return "py-2"
      case "medium":
        return "py-4"
      case "large":
        return "py-6"
      default:
        return "py-2"
    }
  }

  const renderBannerPreview = () => {
    const {
      heading,
      subheading,
      buttonText,
      showButton,
      showDismiss,
      layout,
      position,
      backgroundColor,
      textColor,
      buttonVariant,
      paddingY,
      sticky,
      fullWidth,
      rounded,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
      borderRadius: rounded ? "0.5rem" : "0",
    }

    const paddingClass = getPaddingClasses(paddingY)
    const widthClass = fullWidth ? "w-full" : "max-w-5xl mx-auto"
    const positionClass = position === "bottom" ? "mt-auto" : ""
    const stickyClass = sticky ? "sticky top-0 z-50" : ""

    // Render different layouts
    switch (layout) {
      case "centered":
        return (
          <div className={`${paddingClass} ${widthClass} ${positionClass} ${stickyClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6 text-center relative">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-sm font-medium">{heading}</h3>
                {subheading && <p className="text-xs opacity-90 mt-1">{subheading}</p>}
                {showButton && (
                  <div className="mt-2">
                    <Button variant={buttonVariant as any} size="sm">
                      {buttonText}
                    </Button>
                  </div>
                )}
              </div>
              {showDismiss && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 absolute right-4 top-1/2 -translate-y-1/2"
                  aria-label="Dismiss"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )

      case "minimal":
        return (
          <div className={`${paddingClass} ${widthClass} ${positionClass} ${stickyClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-xs font-medium">{heading}</span>
                {subheading && <span className="text-xs opacity-90 ml-2 hidden sm:inline">{subheading}</span>}
              </div>
              <div className="flex items-center gap-2">
                {showButton && (
                  <Button variant={buttonVariant as any} size="sm">
                    {buttonText}
                  </Button>
                )}
                {showDismiss && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Dismiss">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )

      case "floating":
        return (
          <div
            className={`${paddingClass} ${positionClass} fixed ${position === "bottom" ? "bottom-4" : "top-4"} left-4 right-4 max-w-md mx-auto z-50`}
            style={{ ...containerStyle, borderRadius: "0.5rem" }}
          >
            <div className="px-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">{heading}</h3>
                {subheading && <p className="text-xs opacity-90 mt-1">{subheading}</p>}
              </div>
              <div className="flex items-center gap-2 ml-4">
                {showButton && (
                  <Button variant={buttonVariant as any} size="sm">
                    {buttonText}
                  </Button>
                )}
                {showDismiss && (
                  <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0" aria-label="Dismiss">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )

      // Standard layout (default)
      default:
        return (
          <div className={`${paddingClass} ${widthClass} ${positionClass} ${stickyClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-sm font-medium">{heading}</h3>
                {subheading && <p className="text-xs opacity-90">{subheading}</p>}
              </div>
              <div className="flex items-center gap-2">
                {showButton && (
                  <Button variant={buttonVariant as any} size="sm">
                    {buttonText}
                  </Button>
                )}
                {showDismiss && (
                  <Button variant="ghost" size="icon" className="h-6 w-6" aria-label="Dismiss">
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderBannerPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="position">Position</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input id="heading" value={template.heading} onChange={(e) => handleChange("heading", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subheading">Subheading</Label>
              <Input
                id="subheading"
                value={template.subheading}
                onChange={(e) => handleChange("subheading", e.target.value)}
              />
            </div>

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

            <div className="flex items-center space-x-2">
              <Switch
                id="showDismiss"
                checked={template.showDismiss}
                onCheckedChange={(checked) => handleChange("showDismiss", checked)}
              />
              <Label htmlFor="showDismiss">Show Dismiss Button</Label>
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="centered">Centered</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="floating">Floating</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

            {template.showButton && (
              <div className="space-y-2">
                <Label>Button Style</Label>
                <Select value={template.buttonVariant} onValueChange={(value) => handleChange("buttonVariant", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Padding</Label>
              <Select value={template.paddingY} onValueChange={(value) => handleChange("paddingY", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select padding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
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

          <TabsContent value="position" className="space-y-4">
            <div className="space-y-2">
              <Label>Position</Label>
              <Select value={template.position} onValueChange={(value) => handleChange("position", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="sticky"
                checked={template.sticky}
                onCheckedChange={(checked) => handleChange("sticky", checked)}
                disabled={template.layout === "floating"}
              />
              <Label htmlFor="sticky">Sticky Position</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="fullWidth"
                checked={template.fullWidth}
                onCheckedChange={(checked) => handleChange("fullWidth", checked)}
                disabled={template.layout === "floating"}
              />
              <Label htmlFor="fullWidth">Full Width</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
