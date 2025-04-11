import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { StoreProvider } from "@/lib/store"
import { AuthProvider } from "@/lib/auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AnimeFreak - Anime-Inspired Fashion",
  description: "Discover the latest anime-inspired fashion trends and unique anime clothing collections.",
  keywords: ["anime", "fashion", "clothing", "cosplay", "anime merchandise", "anime-inspired fashion"],
  authors: [{ name: "AnimeFreak" }],
  creator: "AnimeFreak",
  publisher: "AnimeFreak",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://animefreak.com",
    title: "AnimeFreak - Anime-Inspired Fashion",
    description: "Discover the latest anime-inspired fashion trends and unique anime clothing collections.",
    siteName: "AnimeFreak",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AnimeFreak - Anime-Inspired Fashion",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AnimeFreak - Anime-Inspired Fashion",
    description: "Discover the latest anime-inspired fashion trends and unique anime clothing collections.",
    images: ["/og-image.jpg"],
    creator: "@animefreak",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          forcedTheme={undefined}
        >
          <AuthProvider>
            <StoreProvider>
              {children}
              <Toaster richColors closeButton position="top-right" theme="system" />
            </StoreProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'