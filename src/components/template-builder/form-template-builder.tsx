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

export function FormTemplateBuilder() {
  const [template, setTemplate] = useState({
    heading: "Contact Us",
    subheading: "Fill out the form below and we'll get back to you as soon as possible.",
    fields: [
      {
        type: "text",
        label: "Full Name",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        type: "email",
        label: "Email Address",
        placeholder: "Enter your email address",
        required: true,
      },
      {
        type: "textarea",
        label: "Message",
        placeholder: "Enter your message",
        required: true,
      },
    ],
    submitButtonText: "Send Message",
    layout: "standard",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    accentColor: "#4f46e5",
    paddingY: "medium",
    rounded: true,
    showLabels: true,
    showPlaceholders: true,
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handleFieldChange = (index: number, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      fields: prev.fields.map((field, i) => (i === index ? { ...field, [key]: value } : field)),
    }))
  }

  const addField = () => {
    setTemplate((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          type: "text",
          label: "New Field",
          placeholder: "Enter value",
          required: false,
        },
      ],
    }))
  }

  const removeField = (index: number) => {
    setTemplate((prev) => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index),
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

  const renderFormPreview = () => {
    const {
      heading,
      subheading,
      fields,
      submitButtonText,
      layout,
      backgroundColor,
      textColor,
      accentColor,
      paddingY,
      rounded,
      showLabels,
      showPlaceholders,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
    }

    const accentStyle = {
      backgroundColor: accentColor,
      color: "#ffffff",
    }

    const paddingClass = getPaddingClasses(paddingY)
    const roundedClass = rounded ? "rounded-lg" : ""

    // Render different layouts
    switch (layout) {
      case "compact":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="max-w-md mx-auto">
                <div className={`border ${roundedClass} overflow-hidden p-6`}>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">{heading}</h3>
                    {subheading && <p className="text-sm text-muted-foreground mt-2">{subheading}</p>}
                  </div>

                  <form className="space-y-3">
                    {fields.map((field, index) => (
                      <div key={index} className="space-y-1">
                        {showLabels && (
                          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            {field.label}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                        )}

                        {field.type === "text" && (
                          <input
                            type="text"
                            placeholder={showPlaceholders ? field.placeholder : ""}
                            required={field.required}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        )}

                        {field.type === "email" && (
                          <input
                            type="email"
                            placeholder={showPlaceholders ? field.placeholder : ""}
                            required={field.required}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        )}

                        {field.type === "textarea" && (
                          <textarea
                            placeholder={showPlaceholders ? field.placeholder : ""}
                            required={field.required}
                            rows={3}
                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          ></textarea>
                        )}

                        {field.type === "select" && (
                          <select
                            required={field.required}
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">{showPlaceholders ? field.placeholder : ""}</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                          </select>
                        )}
                      </div>
                    ))}

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 w-full"
                      style={accentStyle}
                    >
                      {submitButtonText}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )

      case "split":
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className={`border ${roundedClass} overflow-hidden`}>
                <div className="grid md:grid-cols-2">
                  <div className="p-6 bg-muted flex items-center">
                    <div>
                      <h3 className="text-2xl font-bold">{heading}</h3>
                      {subheading && <p className="text-muted-foreground mt-2">{subheading}</p>}
                    </div>
                  </div>
                  <div className="p-6">
                    <form className="space-y-4">
                      {fields.map((field, index) => (
                        <div key={index} className="space-y-2">
                          {showLabels && (
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              {field.label}
                              {field.required && <span className="text-red-500 ml-1">*</span>}
                            </label>
                          )}

                          {field.type === "text" && (
                            <input
                              type="text"
                              placeholder={showPlaceholders ? field.placeholder : ""}
                              required={field.required}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          )}

                          {field.type === "email" && (
                            <input
                              type="email"
                              placeholder={showPlaceholders ? field.placeholder : ""}
                              required={field.required}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                          )}

                          {field.type === "textarea" && (
                            <textarea
                              placeholder={showPlaceholders ? field.placeholder : ""}
                              required={field.required}
                              rows={4}
                              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            ></textarea>
                          )}

                          {field.type === "select" && (
                            <select
                              required={field.required}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <option value="">{showPlaceholders ? field.placeholder : ""}</option>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                              <option value="option3">Option 3</option>
                            </select>
                          )}
                        </div>
                      ))}

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
                        style={accentStyle}
                      >
                        {submitButtonText}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      // Standard layout (default)
      default:
        return (
          <div className={`${paddingClass}`} style={containerStyle}>
            <div className="container px-4 md:px-6">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-6">
                  <motion.h2
                    className="text-2xl font-bold"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {heading}
                  </motion.h2>
                  {subheading && (
                    <motion.p
                      className="mt-2 text-muted-foreground"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {subheading}
                    </motion.p>
                  )}
                </div>

                <motion.form
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {fields.map((field, index) => (
                    <div key={index} className="space-y-2">
                      {showLabels && (
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {field.label}
                          {field.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                      )}

                      {field.type === "text" && (
                        <input
                          type="text"
                          placeholder={showPlaceholders ? field.placeholder : ""}
                          required={field.required}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      )}

                      {field.type === "email" && (
                        <input
                          type="email"
                          placeholder={showPlaceholders ? field.placeholder : ""}
                          required={field.required}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          placeholder={showPlaceholders ? field.placeholder : ""}
                          required={field.required}
                          rows={4}
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        ></textarea>
                      )}

                      {field.type === "select" && (
                        <select
                          required={field.required}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">{showPlaceholders ? field.placeholder : ""}</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </select>
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full"
                    style={accentStyle}
                  >
                    {submitButtonText}
                  </button>
                </motion.form>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderFormPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="fields">Fields</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
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
              <Label htmlFor="submitButtonText">Submit Button Text</Label>
              <Input
                id="submitButtonText"
                value={template.submitButtonText}
                onChange={(e) => handleChange("submitButtonText", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Layout</Label>
              <Select value={template.layout} onValueChange={(value) => handleChange("layout", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="split">Split</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showLabels"
                checked={template.showLabels}
                onCheckedChange={(checked) => handleChange("showLabels", checked)}
              />
              <Label htmlFor="showLabels">Show Labels</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showPlaceholders"
                checked={template.showPlaceholders}
                onCheckedChange={(checked) => handleChange("showPlaceholders", checked)}
              />
              <Label htmlFor="showPlaceholders">Show Placeholders</Label>
            </div>
          </TabsContent>

          <TabsContent value="fields" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addField} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </div>

            <div className="space-y-6">
              {template.fields.map((field, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">{field.label}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeField(index)}
                        disabled={template.fields.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label>Field Type</Label>
                        <Select value={field.type} onValueChange={(value) => handleFieldChange(index, "type", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="textarea">Textarea</SelectItem>
                            <SelectItem value="select">Select</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Placeholder</Label>
                        <Input
                          value={field.placeholder}
                          onChange={(e) => handleFieldChange(index, "placeholder", e.target.value)}
                        />
                      </div>

                      <div className="flex items-center space-x-2 h-full pt-8">
                        <Switch
                          id={`required-${index}`}
                          checked={field.required}
                          onCheckedChange={(checked) => handleFieldChange(index, "required", checked)}
                        />
                        <Label htmlFor={`required-${index}`}>Required</Label>
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
        </Tabs>
      </CardContent>
    </Card>
  )
}
