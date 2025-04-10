"use client"

import { useState } from "react"
import Image from "next/image"
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

export function FeaturedTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Featured Products",
    subheading: "Check out our most popular items this season",
    items: [
      {
        id: "1",
        title: "Premium T-Shirt",
        description: "Comfortable cotton t-shirt with modern design",
        image: "/placeholder.svg?height=400&width=300",
        link: "/product/t-shirt",
      },
      {
        id: "2",
        title: "Designer Jeans",
        description: "High-quality denim with perfect fit",
        image: "/placeholder.svg?height=400&width=300",
        link: "/product/jeans",
      },
      {
        id: "3",
        title: "Casual Sneakers",
        description: "Stylish and comfortable for everyday wear",
        image: "/placeholder.svg?height=400&width=300",
        link: "/product/sneakers",
      },
    ],
    layout: "grid",
    columns: "3",
    showDescription: true,
    showButton: true,
    buttonText: "View Details",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#4f46e5",
    paddingY: "medium",
    rounded: true,
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handleItemChange = (id: string, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }))
  }

  const addItem = () => {
    const newId = String(Date.now())
    setTemplate((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: newId,
          title: "New Item",
          description: "Description for the new item",
          image: "/placeholder.svg?height=400&width=300",
          link: "/product/new",
        },
      ],
    }))
  }

  const removeItem = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

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

  const renderFeaturedPreview = () => {
    const {
      heading,
      subheading,
      items,
      layout,
      columns,
      showDescription,
      showButton,
      buttonText,
      backgroundColor,
      textColor,
      accentColor,
      paddingY,
      rounded,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
      borderRadius: rounded ? "0.5rem" : "0",
    }

    const paddingClass = getPaddingClasses(paddingY)

    // Grid columns class
    const getColumnsClass = () => {
      switch (columns) {
        case "2":
          return "grid-cols-1 sm:grid-cols-2"
        case "3":
          return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        case "4":
          return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        default:
          return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      }
    }

    // Render different layouts
    switch (layout) {
      case "carousel":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
                {subheading && <p className="mt-4 text-muted-foreground">{subheading}</p>}
              </div>

              <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide -mx-4 px-4">
                {items.map((item) => (
                  <div key={item.id} className="flex-none w-64">
                    <div className="overflow-hidden rounded-lg border bg-background">
                      <div className="relative aspect-square">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{item.title}</h3>
                        {showDescription && (
                          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        )}
                        {showButton && (
                          <Button
                            className="mt-4 w-full"
                            size="sm"
                            style={{ backgroundColor: accentColor, color: "#ffffff" }}
                          >
                            {buttonText}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "list":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
                {subheading && <p className="mt-4 text-muted-foreground">{subheading}</p>}
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex overflow-hidden rounded-lg border bg-background">
                    <div className="relative w-24 h-24 sm:w-40 sm:h-40 flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        {showDescription && <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>}
                      </div>
                      {showButton && (
                        <div className="mt-4">
                          <Button size="sm" style={{ backgroundColor: accentColor, color: "#ffffff" }}>
                            {buttonText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      // Grid layout (default)
      default:
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight">{heading}</h2>
                {subheading && <p className="mt-4 text-muted-foreground">{subheading}</p>}
              </div>

              <div className={`grid ${getColumnsClass()} gap-6`}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-lg border bg-background"
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{item.title}</h3>
                      {showDescription && (
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                      )}
                      {showButton && (
                        <Button
                          className="mt-4 w-full"
                          size="sm"
                          style={{ backgroundColor: accentColor, color: "#ffffff" }}
                        >
                          {buttonText}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderFeaturedPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={template.buttonText}
                onChange={(e) => handleChange("buttonText", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showDescription"
                checked={template.showDescription}
                onCheckedChange={(checked) => handleChange("showDescription", checked)}
              />
              <Label htmlFor="showDescription">Show Description</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showButton"
                checked={template.showButton}
                onCheckedChange={(checked) => handleChange("showButton", checked)}
              />
              <Label htmlFor="showButton">Show Button</Label>
            </div>
          </TabsContent>

          <TabsContent value="items" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addItem} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-6">
              {template.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">{item.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        disabled={template.items.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Title</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => handleItemChange(item.id, "title", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={item.description}
                            onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Link</Label>
                          <Input
                            value={item.link}
                            onChange={(e) => handleItemChange(item.id, "link", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Image</Label>
                        <div className="relative aspect-square overflow-hidden rounded-lg border">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => {
                            // In a real app, this would open an image picker
                            handleItemChange(
                              item.id,
                              "image",
                              `/placeholder.svg?height=400&width=300&text=${encodeURIComponent(item.title)}`,
                            )
                          }}
                        >
                          Change Image
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
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
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {template.layout === "grid" && (
              <div className="space-y-2">
                <Label>Columns</Label>
                <Select value={template.columns} onValueChange={(value) => handleChange("columns", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select columns" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Columns</SelectItem>
                    <SelectItem value="3">3 Columns</SelectItem>
                    <SelectItem value="4">4 Columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
