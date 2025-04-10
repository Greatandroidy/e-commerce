"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function CTATemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Ready to get started?",
    subheading: "Join thousands of satisfied customers using our product.",
    buttonText: "Get Started",
    buttonLink: "/signup",
    secondaryButtonText: "Learn More",
    secondaryButtonLink: "/about",
    showSecondaryButton: true,
    layout: "standard",
    backgroundColor: "#4f46e5",
    textColor: "#ffffff",
    buttonVariant: "default",
    secondaryButtonVariant: "outline",
    paddingY: "medium",
    rounded: false,
    fullWidth: true,
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const layouts = [
    { id: "standard", label: "Standard" },
    { id: "centered", label: "Centered" },
    { id: "minimal", label: "Minimal" },
    { id: "card", label: "Card" },
  ]

  // Helper function to get padding classes
  const getPaddingClasses = (size: string) => {
    switch (size) {
      case "small":
        return "py-4"
      case "medium":
        return "py-8"
      case "large":
        return "py-16"
      default:
        return "py-8"
    }
  }

  const renderCTAPreview = () => {
    const {
      heading,
      subheading,
      buttonText,
      secondaryButtonText,
      showSecondaryButton,
      layout,
      backgroundColor,
      textColor,
      buttonVariant,
      secondaryButtonVariant,
      paddingY,
      rounded,
      fullWidth,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
      borderRadius: rounded ? "0.5rem" : "0",
    }

    const paddingClass = getPaddingClasses(paddingY)
    const widthClass = fullWidth ? "w-full" : "max-w-5xl mx-auto"

    // Render different layouts
    switch (layout) {
      case "centered":
        return (
          <div className={`${paddingClass} ${widthClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6 text-center">
              <div className="max-w-2xl mx-auto">
                <motion.h2
                  className="text-3xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {heading}
                </motion.h2>
                {subheading && (
                  <motion.p
                    className="mt-4 text-lg opacity-90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {subheading}
                  </motion.p>
                )}
                <motion.div
                  className="mt-8 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button variant={buttonVariant as any}>{buttonText}</Button>
                  {showSecondaryButton && (
                    <Button variant={secondaryButtonVariant as any}>{secondaryButtonText}</Button>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        )

      case "minimal":
        return (
          <div className={`${paddingClass} ${widthClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{heading}</h2>
                  {subheading && <p className="mt-2 text-sm opacity-90">{subheading}</p>}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button variant={buttonVariant as any}>{buttonText}</Button>
                  {showSecondaryButton && (
                    <Button variant={secondaryButtonVariant as any}>{secondaryButtonText}</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )

      case "card":
        return (
          <div className={`${widthClass} p-4`}>
            <Card className="overflow-hidden">
              <CardContent className={`${paddingClass} text-center`} style={containerStyle}>
                <motion.h2
                  className="text-2xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {heading}
                </motion.h2>
                {subheading && (
                  <motion.p
                    className="mt-4 opacity-90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {subheading}
                  </motion.p>
                )}
                <motion.div
                  className="mt-6 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button variant={buttonVariant as any}>{buttonText}</Button>
                  {showSecondaryButton && (
                    <Button variant={secondaryButtonVariant as any}>{secondaryButtonText}</Button>
                  )}
                </motion.div>
              </CardContent>
            </Card>
          </div>
        )

      // Standard layout (default)
      default:
        return (
          <div className={`${paddingClass} ${widthClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-2xl">
                  <motion.h2
                    className="text-3xl font-bold tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {heading}
                  </motion.h2>
                  {subheading && (
                    <motion.p
                      className="mt-4 opacity-90"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {subheading}
                    </motion.p>
                  )}
                </div>
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button variant={buttonVariant as any}>{buttonText}</Button>
                  {showSecondaryButton && (
                    <Button variant={secondaryButtonVariant as any}>{secondaryButtonText}</Button>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderCTAPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
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

            <div className="flex items-center space-x-2">
              <Switch
                id="showSecondaryButton"
                checked={template.showSecondaryButton}
                onCheckedChange={(checked) => handleChange("showSecondaryButton", checked)}
              />
              <Label htmlFor="showSecondaryButton">Show Secondary Button</Label>
            </div>

            {template.showSecondaryButton && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="secondaryButtonText">Secondary Button Text</Label>
                  <Input
                    id="secondaryButtonText"
                    value={template.secondaryButtonText}
                    onChange={(e) => handleChange("secondaryButtonText", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondaryButtonLink">Secondary Button Link</Label>
                  <Input
                    id="secondaryButtonLink"
                    value={template.secondaryButtonLink}
                    onChange={(e) => handleChange("secondaryButtonLink", e.target.value)}
                  />
                </div>
              </div>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Primary Button Style</Label>
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

              {template.showSecondaryButton && (
                <div className="space-y-2">
                  <Label>Secondary Button Style</Label>
                  <Select
                    value={template.secondaryButtonVariant}
                    onValueChange={(value) => handleChange("secondaryButtonVariant", value)}
                  >
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
                id="rounded"
                checked={template.rounded}
                onCheckedChange={(checked) => handleChange("rounded", checked)}
              />
              <Label htmlFor="rounded">Rounded Corners</Label>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <Label>Layout Type</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {layouts.map((layoutOption) => (
                  <div
                    key={layoutOption.id}
                    className={`cursor-pointer rounded-lg border-2 p-2 text-center transition-all ${
                      template.layout === layoutOption.id
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-muted-foreground"
                    }`}
                    onClick={() => handleChange("layout", layoutOption.id)}
                  >
                    <div className="h-16 mb-2 bg-muted rounded flex items-center justify-center">
                      {/* Simplified layout preview */}
                      <div
                        className={`
                        ${layoutOption.id === "standard" ? "w-full h-full flex justify-between items-center px-2" : ""}
                        ${layoutOption.id === "centered" ? "w-1/2 h-12 bg-primary/30 mx-auto" : ""}
                        ${layoutOption.id === "minimal" ? "w-full h-full flex justify-between items-center px-2 py-1" : ""}
                        ${layoutOption.id === "card" ? "w-3/4 h-3/4 bg-primary/30 mx-auto rounded" : ""}
                      `}
                      >
                        {layoutOption.id === "standard" && (
                          <>
                            <div className="w-1/2 h-8 bg-primary/30"></div>
                            <div className="w-1/4 h-6 bg-background/50 rounded"></div>
                          </>
                        )}
                        {layoutOption.id === "minimal" && (
                          <>
                            <div className="w-1/2 h-4 bg-primary/30"></div>
                            <div className="w-1/4 h-4 bg-background/50 rounded"></div>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium">{layoutOption.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="fullWidth"
                checked={template.fullWidth}
                onCheckedChange={(checked) => handleChange("fullWidth", checked)}
              />
              <Label htmlFor="fullWidth">Full Width</Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
