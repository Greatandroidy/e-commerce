"use client"

import type React from "react"

interface FooterLink {
  label: string
  url: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  platform: string
  url: string
}

interface FooterBlockProps {
  companyName: string
  logo?: string
  tagline?: string
  copyright?: string
  columns?: FooterColumn[]
  socialLinks?: SocialLink[]
  backgroundColor?: string
  textColor?: string
  accentColor?: string
}

export const FooterBlock: React.FC<FooterBlockProps> = ({
  companyName = "Your Company",
  logo = "/placeholder.svg?height=40&width=120",
  tagline = "Building the future, one pixel at a time.",
  copyright = "© 2023 Your Company. All rights reserved.",
  columns = [
    {
      title: "Products",
      links: [
        { label: "Features", url: "#features" },
        { label: "Pricing", url: "#pricing" },
        { label: "FAQ", url: "#faq" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", url: "#about" },
        { label: "Careers", url: "#careers" },
        { label: "Contact", url: "#contact" },
      ],
    },
  ],
  socialLinks = [
    { platform: "twitter", url: "#twitter" },
    { platform: "facebook", url: "#facebook" },
    { platform: "instagram", url: "#instagram" },
  ],
  backgroundColor = "#f8fafc",
  textColor = "#0f172a",
  accentColor = "#3b82f6",
}) => {
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

  return (
    <footer className="py-16 border-t" style={{ backgroundColor, color: textColor }}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-full md:col-span-1">
            <img src={logo || "/placeholder.svg"} alt={companyName} className="h-10 mb-4" />
            <p className="text-muted-foreground mb-4">{tagline}</p>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <SocialIcon platform={link.platform} />
                  <span className="sr-only">{link.platform}</span>
                </a>
              ))}
            </div>
          </div>

          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="font-medium mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.url} className="text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">{copyright}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
