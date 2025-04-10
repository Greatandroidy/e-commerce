"use client"

import { useState } from "react"
import { Plus, Trash, Quote, Star } from "lucide-react"

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
import { cn } from "@/lib/utils"

export function TestimonialTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "What Our Customers Say",
    subheading: "Don't just take our word for it. Read what our customers have to say about our products.",
    testimonials: [
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Fashion Blogger",
        content:
          "I've been shopping here for years and the quality never disappoints. Their customer service is exceptional and the styles are always on trend.",
        rating: 5,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        name: "Michael Chen",
        role: "Loyal Customer",
        content:
          "The attention to detail in their clothing is remarkable. I always receive compliments when I wear their pieces.",
        rating: 4,
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "3",
        name: "Emma Rodriguez",
        role: "Stylist",
        content:
          "As a professional stylist, I recommend this brand to all my clients. The fabrics are premium and the fit is perfect every time.",
        rating: 5,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    layout: "grid",
    style: "card",
    showImages: true,
    showRatings: true,
    showQuoteIcon: true,
    backgroundColor: "#ffffff",
    cardBackgroundColor: "#f8fafc",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    borderRadius: 8,
    animation: "fade",
    enableCarousel: false,
    gradientBackground: false,
    gradientFrom: "#4f46e5",
    gradientTo: "#818cf8",
    gradientDirection: "to-r",
    paddingY: "medium",
    imageShape: "circle",
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handleTestimonialChange = (id: string, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    }))
  }

  const addTestimonial = () => {
    const newId = String(Date.now())
    setTemplate((prev) => ({
      ...prev,
      testimonials: [
        ...prev.testimonials,
        {
          id: newId,
          name: "New Customer",
          role: "Customer",
          content: "This is a testimonial content. Edit this to add the customer's feedback.",
          rating: 5,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
    }))
  }

  const removeTestimonial = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      testimonials: prev.testimonials.filter((item) => item.id !== id),
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

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={cn("h-4 w-4", i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300")} />
        ))}
      </div>
    )
  }

  const renderTestimonialPreview = () => {
    const {
      heading,
      subheading,
      testimonials,
      layout,
      style,
      showImages,
      showRatings,
      showQuoteIcon,
      backgroundColor,
      cardBackgroundColor,
      textColor,
      accentColor,
      borderRadius,
      animation,
      enableCarousel,
      gradientBackground,
      gradientFrom,
      gradientTo,
      gradientDirection,
      paddingY,
      imageShape,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor: gradientBackground ? "transparent" : backgroundColor,
      color: textColor,
    }

    const cardStyle = {
      backgroundColor: cardBackgroundColor,
      color: textColor,
      borderRadius: `${borderRadius}px`,
    }

    const accentStyle = {
      color: accentColor,
    }

    const paddingClass = getPaddingClasses(paddingY)
    const gradientClass = gradientBackground ? getGradientClasses(gradientDirection) : ""
    const gradientColors = gradientBackground ? { from: gradientFrom, to: gradientTo } : {}

    // Animation classes
    const getAnimationClass = (index: number) => {
      const delay = index * 0.1
      switch (animation) {
        case "fade":
          return "animate-fade-in"
        case "slideUp":
          return "animate-slide-up"
        case "slideIn":
          return "animate-slide-in"
        case "scale":
          return "animate-scale"
        default:
          return ""
      }
    }

    // Image shape classes
    const getImageShapeClass = () => {
      switch (imageShape) {
        case "circle":
          return "rounded-full"
        case "square":
          return "rounded-md"
        case "rounded":
          return "rounded-xl"
        default:
          return "rounded-full"
      }
    }

    // Render different layouts
    switch (layout) {
      case "list":
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
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`${getAnimationClass(index)} ${
                      style === "card" ? "border p-6" : "border-b pb-6"
                    } flex flex-col md:flex-row gap-6`}
                    style={style === "card" ? cardStyle : {}}
                  >
                    {showImages && (
                      <div className="flex-shrink-0">
                        <div
                          className={`${getImageShapeClass()} overflow-hidden h-16 w-16 md:h-20 md:w-20 border`}
                          style={{ borderColor: accentColor }}
                        >
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-start">
                        {showQuoteIcon && (
                          <Quote className="h-8 w-8 mr-2 flex-shrink-0 opacity-20" style={{ color: accentColor }} />
                        )}
                        <p className="text-lg italic">{testimonial.content}</p>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                        {showRatings && <div className="mt-1">{renderStars(testimonial.rating)}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "masonry":
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
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {testimonials.map((testimonial, index) => {
                  const cardHeight = 200 + (index % 3) * 50 // Vary heights for masonry effect
                  return (
                    <div
                      key={testimonial.id}
                      className={`${getAnimationClass(index)} break-inside-avoid ${
                        style === "card" ? "border rounded-lg p-6" : ""
                      }`}
                      style={{
                        ...(style === "card" ? cardStyle : {}),
                        minHeight: `${cardHeight}px`,
                      }}
                    >
                      <div className="flex items-start mb-4">
                        {showQuoteIcon && (
                          <Quote className="h-6 w-6 mr-2 flex-shrink-0 opacity-20" style={{ color: accentColor }} />
                        )}
                        <p className="italic">{testimonial.content}</p>
                      </div>
                      <div className="flex items-center mt-4">
                        {showImages && (
                          <div className={`${getImageShapeClass()} overflow-hidden h-12 w-12 mr-4`}>
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                          {showRatings && <div className="mt-1">{renderStars(testimonial.rating)}</div>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )

      case "carousel":
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
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="relative">
                <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 space-x-4">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`${getAnimationClass(index)} flex-none snap-center w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] ${
                        style === "card" ? "border rounded-lg p-6" : ""
                      }`}
                      style={style === "card" ? cardStyle : {}}
                    >
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          {showQuoteIcon && (
                            <Quote className="h-8 w-8 mb-4 opacity-20" style={{ color: accentColor }} />
                          )}
                          <p className="italic">{testimonial.content}</p>
                        </div>
                        <div className="flex items-center mt-6">
                          {showImages && (
                            <div className={`${getImageShapeClass()} overflow-hidden h-12 w-12 mr-4`}>
                              <img
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                            {showRatings && <div className="mt-1">{renderStars(testimonial.rating)}</div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-4 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: index === 0 ? accentColor : "#cbd5e1" }}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      // Grid layout (default)
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
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold tracking-tight mb-2">{heading}</h2>
                {subheading && <p className="text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`${getAnimationClass(index)} ${style === "card" ? "border rounded-lg p-6" : ""}`}
                    style={style === "card" ? cardStyle : {}}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        {showQuoteIcon && <Quote className="h-8 w-8 mb-4 opacity-20" style={{ color: accentColor }} />}
                        <p className="italic">{testimonial.content}</p>
                      </div>
                      <div className="flex items-center mt-6">
                        {showImages && (
                          <div className={`${getImageShapeClass()} overflow-hidden h-12 w-12 mr-4`}>
                            <img
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          {testimonial.role && <p className="text-sm text-muted-foreground">{testimonial.role}</p>}
                          {showRatings && <div className="mt-1">{renderStars(testimonial.rating)}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
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
        <div className="rounded-lg overflow-hidden border">{renderTestimonialPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
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
                id="showImages"
                checked={template.showImages}
                onCheckedChange={(checked) => handleChange("showImages", checked)}
              />
              <Label htmlFor="showImages">Show Profile Images</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showRatings"
                checked={template.showRatings}
                onCheckedChange={(checked) => handleChange("showRatings", checked)}
              />
              <Label htmlFor="showRatings">Show Ratings</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showQuoteIcon"
                checked={template.showQuoteIcon}
                onCheckedChange={(checked) => handleChange("showQuoteIcon", checked)}
              />
              <Label htmlFor="showQuoteIcon">Show Quote Icon</Label>
            </div>
          </TabsContent>

          <TabsContent value="testimonials" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addTestimonial} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            <div className="space-y-6">
              {template.testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeTestimonial(testimonial.id)}
                        disabled={template.testimonials.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Name</Label>
                          <Input
                            value={testimonial.name}
                            onChange={(e) => handleTestimonialChange(testimonial.id, "name", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Role/Title</Label>
                          <Input
                            value={testimonial.role}
                            onChange={(e) => handleTestimonialChange(testimonial.id, "role", e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Rating</Label>
                          <Select
                            value={testimonial.rating.toString()}
                            onValueChange={(value) =>
                              handleTestimonialChange(testimonial.id, "rating", Number.parseInt(value))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 Star</SelectItem>
                              <SelectItem value="2">2 Stars</SelectItem>
                              <SelectItem value="3">3 Stars</SelectItem>
                              <SelectItem value="4">4 Stars</SelectItem>
                              <SelectItem value="5">5 Stars</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Testimonial</Label>
                          <Textarea
                            value={testimonial.content}
                            onChange={(e) => handleTestimonialChange(testimonial.id, "content", e.target.value)}
                            rows={4}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Profile Image URL</Label>
                          <Input
                            value={testimonial.image}
                            onChange={(e) => handleTestimonialChange(testimonial.id, "image", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="style" className="space-y-4">
            <div className="space-y-2">
              <Label>Card Style</Label>
              <Select value={template.style} onValueChange={(value) => handleChange("style", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="card">Card</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Image Shape</Label>
              <Select value={template.imageShape} onValueChange={(value) => handleChange("imageShape", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select shape" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="circle">Circle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="rounded">Rounded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Background Color</Label>
                <ColorPicker
                  color={template.backgroundColor}
                  onChange={(color) => handleChange("backgroundColor", color)}
                />
              </div>

              <div className="space-y-2">
                <Label>Card Background Color</Label>
                <ColorPicker
                  color={template.cardBackgroundColor}
                  onChange={(color) => handleChange("cardBackgroundColor", color)}
                />
              </div>
            </div>

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
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="masonry">Masonry</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
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
