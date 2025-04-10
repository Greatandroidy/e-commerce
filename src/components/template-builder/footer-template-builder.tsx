"use client"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ColorPicker } from "@/components/template-builder/color-picker"

export function FooterTemplateBuilder() {
  const [template, setTemplate] = useState({
    companyName: "Your Company",
    logo: "/placeholder.svg?height=40&width=120",
    tagline: "Building the future, one pixel at a time.",
    copyright: "© 2023 Your Company. All rights reserved.",
    columns: [
      {
        id: "1",
        title: "Products",
        links: [
          { id: "1-1", label: "Features", url: "#features" },
          { id: "1-2", label: "Pricing", url: "#pricing" },
          { id: "1-3", label: "Testimonials", url: "#testimonials" },
          { id: "1-4", label: "FAQ", url: "#faq" },
        ],
      },
      {
        id: "2",
        title: "Resources",
        links: [
          { id: "2-1", label: "Documentation", url: "#docs" },
          { id: "2-2", label: "Guides", url: "#guides" },
          { id: "2-3", label: "API Reference", url: "#api" },
          { id: "2-4", label: "Blog", url: "#blog" },
        ],
      },
      {
        id: "3",
        title: "Company",
        links: [
          { id: "3-1", label: "About Us", url: "#about" },
          { id: "3-2", label: "Careers", url: "#careers" },
          { id: "3-3", label: "Contact", url: "#contact" },
          { id: "3-4", label: "Privacy Policy", url: "#privacy" },
        ],
      },
    ],
    socialLinks: [
      { id: "s1", platform: "twitter", url: "#twitter" },
      { id: "s2", platform: "facebook", url: "#facebook" },
      { id: "s3", platform: "instagram", url: "#instagram" },
      { id: "s4", platform: "github", url: "#github" },
    ],
    layout: "standard",
    style: "default",
    backgroundColor: "#f8fafc",
    textColor: "#0f172a",
    accentColor: "#3b82f6",
    borderColor: "#e2e8f0",
    showLogo: true,
    showTagline: true,
    showSocialLinks: true,
    showNewsletter: true,
    newsletterTitle: "Subscribe to our newsletter",
    newsletterText: "Stay updated with our latest news and offers.",
    newsletterButtonText: "Subscribe",
    newsletterPlaceholder: "Enter your email",
    showBorder: true,
    showBottomLinks: true,
    bottomLinks: [
      { id: "b1", label: "Terms", url: "#terms" },
      { id: "b2", label: "Privacy", url: "#privacy" },
      { id: "b3", label: "Cookies", url: "#cookies" },
    ],
    paddingY: "medium",
    columnCount: 3,
    darkModeSupport: true,
    animation: "fade",
  })

  const handleChange = (key: string, value: any) => {
    setTemplate((prev) => ({ ...prev, [key]: value }))
  }

  const handleColumnChange = (id: string, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      columns: prev.columns.map((column) => (column.id === id ? { ...column, [key]: value } : column)),
    }))
  }

  const handleLinkChange = (columnId: string, linkId: string, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              links: column.links.map((link) => (link.id === linkId ? { ...link, [key]: value } : link)),
            }
          : column,
      ),
    }))
  }

  const handleSocialLinkChange = (id: string, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) => (link.id === id ? { ...link, [key]: value } : link)),
    }))
  }

  const handleBottomLinkChange = (id: string, key: string, value: any) => {
    setTemplate((prev) => ({
      ...prev,
      bottomLinks: prev.bottomLinks.map((link) => (link.id === id ? { ...link, [key]: value } : link)),
    }))
  }

  const addColumn = () => {
    const newId = String(Date.now())
    setTemplate((prev) => ({
      ...prev,
      columns: [
        ...prev.columns,
        {
          id: newId,
          title: "New Column",
          links: [
            { id: `${newId}-1`, label: "Link 1", url: "#" },
            { id: `${newId}-2`, label: "Link 2", url: "#" },
          ],
        },
      ],
    }))
  }

  const removeColumn = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      columns: prev.columns.filter((column) => column.id !== id),
    }))
  }

  const addLink = (columnId: string) => {
    const newId = `${columnId}-${Date.now()}`
    setTemplate((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              links: [...column.links, { id: newId, label: "New Link", url: "#" }],
            }
          : column,
      ),
    }))
  }

  const removeLink = (columnId: string, linkId: string) => {
    setTemplate((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              links: column.links.filter((link) => link.id !== linkId),
            }
          : column,
      ),
    }))
  }

  const addSocialLink = () => {
    const newId = `s${Date.now()}`
    setTemplate((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { id: newId, platform: "linkedin", url: "#" }],
    }))
  }

  const removeSocialLink = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((link) => link.id !== id),
    }))
  }

  const addBottomLink = () => {
    const newId = `b${Date.now()}`
    setTemplate((prev) => ({
      ...prev,
      bottomLinks: [...prev.bottomLinks, { id: newId, label: "New Link", url: "#" }],
    }))
  }

  const removeBottomLink = (id: string) => {
    setTemplate((prev) => ({
      ...prev,
      bottomLinks: prev.bottomLinks.filter((link) => link.id !== id),
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

  // Helper function to get column count classes
  const getColumnCountClass = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 md:grid-cols-2"
      case 3:
        return "grid-cols-1 md:grid-cols-3"
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      case 5:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      default:
        return "grid-cols-1 md:grid-cols-3"
    }
  }

  // Animation classes
  const getAnimationClass = () => {
    switch (template.animation) {
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

  // Social icon component
  const SocialIcon = ({ platform }: { platform: string }) => {
    switch (platform) {
      case "twitter":
        return (
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
            className="h-5 w-5"
          >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
        )
      case "facebook":
        return (
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
            className="h-5 w-5"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        )
      case "instagram":
        return (
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
            className="h-5 w-5"
          >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        )
      case "github":
        return (
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
            className="h-5 w-5"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        )
      case "linkedin":
        return (
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
            className="h-5 w-5"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        )
      case "youtube":
        return (
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
            className="h-5 w-5"
          >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
          </svg>
        )
      default:
        return (
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
            className="h-5 w-5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        )
    }
  }

  const renderFooterPreview = () => {
    const {
      companyName,
      logo,
      tagline,
      copyright,
      columns,
      socialLinks,
      layout,
      style,
      backgroundColor,
      textColor,
      accentColor,
      borderColor,
      showLogo,
      showTagline,
      showSocialLinks,
      showNewsletter,
      newsletterTitle,
      newsletterText,
      newsletterButtonText,
      newsletterPlaceholder,
      showBorder,
      showBottomLinks,
      bottomLinks,
      paddingY,
      columnCount,
    } = template

    // Common styles
    const containerStyle = {
      backgroundColor,
      color: textColor,
    }

    const accentStyle = {
      color: accentColor,
    }

    const borderStyle = {
      borderColor,
    }

    const paddingClass = getPaddingClasses(paddingY)
    const columnCountClass = getColumnCountClass(columnCount)
    const animationClass = getAnimationClass()

    // Render different layouts
    switch (layout) {
      case "centered":
        return (
          <footer className={`${paddingClass} border-t`} style={{ ...containerStyle, ...borderStyle }}>
            <div className="container px-4 md:px-6">
              <div className={`text-center ${animationClass}`}>
                {showLogo && (
                  <div className="mb-6">
                    <img src={logo || "/placeholder.svg"} alt={companyName} className="h-10 mx-auto" />
                  </div>
                )}
                {showTagline && <p className="text-muted-foreground mb-6">{tagline}</p>}

                <div className="flex flex-wrap justify-center gap-8 mb-8">
                  {columns.map((column) => (
                    <div key={column.id} className="mb-8 md:mb-0">
                      <h3 className="font-medium mb-4">{column.title}</h3>
                      <ul className="space-y-2">
                        {column.links.map((link) => (
                          <li key={link.id}>
                            <a
                              href={link.url}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {showSocialLinks && (
                  <div className="flex justify-center space-x-4 mb-8">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <SocialIcon platform={link.platform} />
                        <span className="sr-only">{link.platform}</span>
                      </a>
                    ))}
                  </div>
                )}

                {showNewsletter && (
                  <div className="max-w-md mx-auto mb-8">
                    <h3 className="font-medium mb-2">{newsletterTitle}</h3>
                    <p className="text-muted-foreground mb-4">{newsletterText}</p>
                    <form className="flex gap-2">
                      <Input type="email" placeholder={newsletterPlaceholder} className="flex-1" style={borderStyle} />
                      <Button style={{ backgroundColor: accentColor, color: "#ffffff" }}>{newsletterButtonText}</Button>
                    </form>
                  </div>
                )}

                {showBottomLinks && (
                  <div className="flex justify-center flex-wrap gap-4 mb-4">
                    {bottomLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                <p className="text-sm text-muted-foreground">{copyright}</p>
              </div>
            </div>
          </footer>
        )

      case "minimal":
        return (
          <footer className={`${paddingClass} border-t`} style={{ ...containerStyle, ...borderStyle }}>
            <div className="container px-4 md:px-6">
              <div className={`flex flex-col md:flex-row justify-between items-center ${animationClass}`}>
                <div className="mb-4 md:mb-0">
                  {showLogo && <img src={logo || "/placeholder.svg"} alt={companyName} className="h-8" />}
                  <p className="text-sm text-muted-foreground mt-2">{copyright}</p>
                </div>

                {showBottomLinks && (
                  <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
                    {bottomLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {showSocialLinks && (
                  <div className="flex space-x-4">
                    {socialLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <SocialIcon platform={link.platform} />
                        <span className="sr-only">{link.platform}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </footer>
        )

      // Standard layout (default)
      default:
        return (
          <footer className={`${paddingClass} border-t`} style={{ ...containerStyle, ...borderStyle }}>
            <div className="container px-4 md:px-6">
              <div className={`grid ${columnCountClass} gap-8 ${animationClass}`}>
                <div className="col-span-full md:col-span-1">
                  {showLogo && <img src={logo || "/placeholder.svg"} alt={companyName} className="h-10 mb-4" />}
                  {showTagline && <p className="text-muted-foreground mb-4">{tagline}</p>}
                  {showSocialLinks && (
                    <div className="flex space-x-4 mb-4">
                      {socialLinks.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <SocialIcon platform={link.platform} />
                          <span className="sr-only">{link.platform}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {columns.map((column) => (
                  <div key={column.id}>
                    <h3 className="font-medium mb-4">{column.title}</h3>
                    <ul className="space-y-2">
                      {column.links.map((link) => (
                        <li key={link.id}>
                          <a href={link.url} className="text-muted-foreground hover:text-foreground transition-colors">
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {showNewsletter && (
                  <div>
                    <h3 className="font-medium mb-4">{newsletterTitle}</h3>
                    <p className="text-muted-foreground mb-4">{newsletterText}</p>
                    <form className="flex gap-2">
                      <Input type="email" placeholder={newsletterPlaceholder} className="flex-1" style={borderStyle} />
                      <Button style={{ backgroundColor: accentColor, color: "#ffffff" }}>{newsletterButtonText}</Button>
                    </form>
                  </div>
                )}
              </div>

              {showBorder && <div className="border-t my-8" style={borderStyle}></div>}

              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-muted-foreground mb-4 md:mb-0">{copyright}</p>

                {showBottomLinks && (
                  <div className="flex flex-wrap gap-4">
                    {bottomLinks.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </footer>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="rounded-lg overflow-hidden border">{renderFooterPreview()}</div>

        <Tabs defaultValue="content">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="columns">Columns</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={template.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" value={template.logo} onChange={(e) => handleChange("logo", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline</Label>
              <Input id="tagline" value={template.tagline} onChange={(e) => handleChange("tagline", e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copyright">Copyright Text</Label>
              <Input
                id="copyright"
                value={template.copyright}
                onChange={(e) => handleChange("copyright", e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showLogo"
                checked={template.showLogo}
                onCheckedChange={(checked) => handleChange("showLogo", checked)}
              />
              <Label htmlFor="showLogo">Show Logo</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showTagline"
                checked={template.showTagline}
                onCheckedChange={(checked) => handleChange("showTagline", checked)}
              />
              <Label htmlFor="showTagline">Show Tagline</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showSocialLinks"
                checked={template.showSocialLinks}
                onCheckedChange={(checked) => handleChange("showSocialLinks", checked)}
              />
              <Label htmlFor="showSocialLinks">Show Social Links</Label>
            </div>

            {template.showSocialLinks && (
              <div className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Social Links</h4>
                  <Button onClick={addSocialLink} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Social Link
                  </Button>
                </div>

                <div className="space-y-4">
                  {template.socialLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-2">
                      <Select
                        value={link.platform}
                        onValueChange={(value) => handleSocialLinkChange(link.id, "platform", value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="github">GitHub</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={link.url}
                        onChange={(e) => handleSocialLinkChange(link.id, "url", e.target.value)}
                        placeholder="URL"
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSocialLink(link.id)}
                        disabled={template.socialLinks.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="showNewsletter"
                checked={template.showNewsletter}
                onCheckedChange={(checked) => handleChange("showNewsletter", checked)}
              />
              <Label htmlFor="showNewsletter">Show Newsletter</Label>
            </div>

            {template.showNewsletter && (
              <div className="space-y-4 border p-4 rounded-lg">
                <h4 className="font-medium">Newsletter</h4>

                <div className="space-y-2">
                  <Label htmlFor="newsletterTitle">Newsletter Title</Label>
                  <Input
                    id="newsletterTitle"
                    value={template.newsletterTitle}
                    onChange={(e) => handleChange("newsletterTitle", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsletterText">Newsletter Text</Label>
                  <Input
                    id="newsletterText"
                    value={template.newsletterText}
                    onChange={(e) => handleChange("newsletterText", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsletterButtonText">Button Text</Label>
                  <Input
                    id="newsletterButtonText"
                    value={template.newsletterButtonText}
                    onChange={(e) => handleChange("newsletterButtonText", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsletterPlaceholder">Input Placeholder</Label>
                  <Input
                    id="newsletterPlaceholder"
                    value={template.newsletterPlaceholder}
                    onChange={(e) => handleChange("newsletterPlaceholder", e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="showBottomLinks"
                checked={template.showBottomLinks}
                onCheckedChange={(checked) => handleChange("showBottomLinks", checked)}
              />
              <Label htmlFor="showBottomLinks">Show Bottom Links</Label>
            </div>

            {template.showBottomLinks && (
              <div className="space-y-4 border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Bottom Links</h4>
                  <Button onClick={addBottomLink} size="sm" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Link
                  </Button>
                </div>

                <div className="space-y-4">
                  {template.bottomLinks.map((link) => (
                    <div key={link.id} className="flex items-center gap-2">
                      <Input
                        value={link.label}
                        onChange={(e) => handleBottomLinkChange(link.id, "label", e.target.value)}
                        placeholder="Label"
                      />
                      <Input
                        value={link.url}
                        onChange={(e) => handleBottomLinkChange(link.id, "url", e.target.value)}
                        placeholder="URL"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeBottomLink(link.id)}
                        disabled={template.bottomLinks.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="columns" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={addColumn} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Column
              </Button>
            </div>

            <div className="space-y-6">
              {template.columns.map((column) => (
                <Card key={column.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">{column.title}</h4>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeColumn(column.id)}
                        disabled={template.columns.length <= 1}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Column Title</Label>
                        <Input
                          value={column.title}
                          onChange={(e) => handleColumnChange(column.id, "title", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Links</Label>
                          <Button onClick={() => addLink(column.id)} size="sm" variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Link
                          </Button>
                        </div>

                        <div className="space-y-2">
                          {column.links.map((link) => (
                            <div key={link.id} className="flex items-center gap-2">
                              <Input
                                value={link.label}
                                onChange={(e) => handleLinkChange(column.id, link.id, "label", e.target.value)}
                                placeholder="Label"
                              />
                              <Input
                                value={link.url}
                                onChange={(e) => handleLinkChange(column.id, link.id, "url", e.target.value)}
                                placeholder="URL"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeLink(column.id, link.id)}
                                disabled={column.links.length <= 1}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Accent Color</Label>
                <ColorPicker color={template.accentColor} onChange={(color) => handleChange("accentColor", color)} />
              </div>

              <div className="space-y-2">
                <Label>Border Color</Label>
                <ColorPicker color={template.borderColor} onChange={(color) => handleChange("borderColor", color)} />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showBorder"
                checked={template.showBorder}
                onCheckedChange={(checked) => handleChange("showBorder", checked)}
              />
              <Label htmlFor="showBorder">Show Divider</Label>
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
                  <SelectItem value="minimal">Minimal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Column Count</Label>
              <Select
                value={template.columnCount.toString()}
                onValueChange={(value) => handleChange("columnCount", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select column count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Column</SelectItem>
                  <SelectItem value="2">2 Columns</SelectItem>
                  <SelectItem value="3">3 Columns</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                  <SelectItem value="5">5 Columns</SelectItem>
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
