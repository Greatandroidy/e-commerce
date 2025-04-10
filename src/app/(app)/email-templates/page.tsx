"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

// Demo environment check
const isDemoEnabled = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_DEMO !== "false" : true

export default function EmailTemplatesPage() {
  const [activeTab, setActiveTab] = useState("welcome")

  if (!isDemoEnabled) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
            <CardDescription>Email templates are not available in production mode.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Preview the email templates used for various communications with customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="welcome">Welcome</TabsTrigger>
              <TabsTrigger value="reset">Password Reset</TabsTrigger>
              <TabsTrigger value="order">Order Confirmation</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
              <TabsTrigger value="restock">Restock Alert</TabsTrigger>
              <TabsTrigger value="promo">Promotional</TabsTrigger>
            </TabsList>

            <div className="border rounded-lg overflow-hidden">
              <TabsContent value="welcome" className="m-0 p-6">
                <EmailPreview type="welcome" />
              </TabsContent>

              <TabsContent value="reset" className="m-0 p-6">
                <EmailPreview type="reset" />
              </TabsContent>

              <TabsContent value="order" className="m-0 p-6">
                <EmailPreview type="order" />
              </TabsContent>

              <TabsContent value="newsletter" className="m-0 p-6">
                <EmailPreview type="newsletter" />
              </TabsContent>

              <TabsContent value="restock" className="m-0 p-6">
                <EmailPreview type="restock" />
              </TabsContent>

              <TabsContent value="promo" className="m-0 p-6">
                <EmailPreview type="promo" />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

function EmailPreview({ type }: { type: string }) {
  // Sample email content based on type
  const getEmailContent = () => {
    switch (type) {
      case "welcome":
        return (
          <div className="space-y-4">
            <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-md">
              <h1 className="text-2xl font-bold">Welcome to AnimeFreak!</h1>
            </div>
            <div className="p-6">
              <p className="mb-4">Hello John Doe,</p>
              <p className="mb-4">
                Thank you for creating an account with AnimeFreak! We're excited to have you join our community of anime
                enthusiasts.
              </p>
              <p className="mb-4">To get started, please verify your email address by clicking the button below:</p>
              <div className="text-center my-6">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md">
                  Verify Email Address
                </button>
              </div>
              <p className="mb-4">If you didn't create this account, you can safely ignore this email.</p>
              <p className="mb-4">Happy shopping!</p>
              <p>The AnimeFreak Team</p>
            </div>
          </div>
        )

      case "reset":
        return (
          <div className="space-y-4">
            <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-md">
              <h1 className="text-2xl font-bold">Reset Your Password</h1>
            </div>
            <div className="p-6">
              <p className="mb-4">Hello John Doe,</p>
              <p className="mb-4">
                We received a request to reset your password. If you didn't make this request, you can safely ignore
                this email.
              </p>
              <p className="mb-4">To reset your password, click the button below:</p>
              <div className="text-center my-6">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md">Reset Password</button>
              </div>
              <p className="mb-4">This link will expire in 24 hours.</p>
              <p>The AnimeFreak Team</p>
            </div>
          </div>
        )

      case "order":
        return (
          <div className="space-y-4">
            <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-md">
              <h1 className="text-2xl font-bold">Order Confirmation</h1>
            </div>
            <div className="p-6">
              <p className="mb-4">Hello John Doe,</p>
              <p className="mb-4">Thank you for your order! We're processing it now and will ship it soon.</p>
              <div className="border rounded-md p-4 mb-4">
                <h2 className="font-bold mb-2">Order #ORD-12345</h2>
                <p className="text-sm text-muted-foreground mb-4">Placed on May 15, 2023</p>

                <div className="space-y-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-muted rounded-md"></div>
                    <div>
                      <p className="font-medium">Naruto Uzumaki Hoodie</p>
                      <p className="text-sm text-muted-foreground">Size: L, Color: Orange</p>
                      <p className="text-sm">$75.00 × 1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-muted rounded-md"></div>
                    <div>
                      <p className="font-medium">Demon Slayer Corps T-Shirt</p>
                      <p className="text-sm text-muted-foreground">Size: M, Color: Black</p>
                      <p className="text-sm">$45.00 × 2</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-1">
                    <span>Subtotal:</span>
                    <span>$165.00</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Shipping:</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span>Tax:</span>
                    <span>$13.20</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>$188.20</span>
                  </div>
                </div>
              </div>

              <div className="text-center my-6">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md">Track Your Order</button>
              </div>

              <p>The AnimeFreak Team</p>
            </div>
          </div>
        )

      case "newsletter":
        return (
          <div className="space-y-4">
            <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-md">
              <h1 className="text-2xl font-bold">Summer Anime Collection is Here!</h1>
            </div>
            <div className="p-6">
              <p className="mb-6">
                Check out our latest anime-inspired summer collection featuring your favorite characters.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-md overflow-hidden">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-3">
                    <p className="font-medium">Attack on Titan Beach Shirt</p>
                    <div className="flex justify-between items-center">
                      <p className="line-through text-muted-foreground">$45.00</p>
                      <p className="font-bold">$38.25</p>
                    </div>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-3">
                    <p className="font-medium">My Hero Academia Swim Shorts</p>
                    <p className="font-bold">$35.00</p>
                  </div>
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="h-40 bg-muted"></div>
                  <div className="p-3">
                    <p className="font-medium">One Piece Straw Hat</p>
                    <div className="flex justify-between items-center">
                      <p className="line-through text-muted-foreground">$25.00</p>
                      <p className="font-bold">$22.50</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-md text-center mb-6">
                <p className="font-bold mb-1">Use code: SUMMER25</p>
                <p className="text-sm">Get 25% off your order. Expires June 30, 2023.</p>
              </div>

              <div className="text-center">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md">
                  Shop Summer Collection
                </button>
              </div>
            </div>
          </div>
        )

      case "restock":
        return (
          <div className="space-y-4">
            <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-md">
              <h1 className="text-2xl font-bold">Back in Stock!</h1>
            </div>
            <div className="p-6">
              <p className="mb-4">Hello John Doe,</p>
              <p className="mb-4">Good news! An item you were interested in is back in stock:</p>

              <div className="border rounded-md overflow-hidden mb-6">
                <div className="h-60 bg-muted"></div>
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-1">Limited Edition Demon Slayer Figurine</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="line-through text-muted-foreground">$120.00</p>
                    <p className="font-bold text-lg">$108.00</p>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">10% OFF</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Limited quantities available. Don't miss out again!
                  </p>
                  <button className="bg-primary text-primary-foreground w-full py-2 rounded-md">View Product</button>
                </div>
              </div>

              <p>The AnimeFreak Team</p>
            </div>
          </div>
        )

      case "promo":
        return (
          <div className="space-y-4">
            <div className="bg-primary text-primary-foreground p-6 text-center rounded-t-md">
              <h1 className="text-2xl font-bold">Black Friday Sale - Up to 50% Off!</h1>
            </div>
            <div className="h-40 bg-muted"></div>
            <div className="p-6">
              <p className="mb-4">Hello John Doe,</p>
              <p className="mb-4">
                Our biggest sale of the year is here! For a limited time, enjoy up to 50% off on all anime merchandise.
              </p>
              <p className="mb-4">This is your chance to grab those items you've been eyeing at unbeatable prices.</p>

              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>All T-shirts - 30% off</li>
                <li>Hoodies & Jackets - 40% off</li>
                <li>Figurines & Collectibles - 25% off</li>
                <li>Limited Edition Items - 15% off</li>
              </ul>

              <p className="mb-6">Sale ends Monday at midnight, so don't miss out!</p>

              <div className="bg-muted p-4 rounded-md text-center mb-6">
                <p className="font-bold mb-1">Use code: BLACKFRIDAY50</p>
                <p className="text-sm">Get an extra 10% off your order. Expires November 30, 2023.</p>
              </div>

              <div className="text-center">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md">Shop the Sale</button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Email preview</AlertTitle>
            <AlertDescription>Email template preview is not available for this type.</AlertDescription>
          </Alert>
        )
    }
  }

  return (
    <div className="bg-white text-black rounded-md shadow-sm max-w-2xl mx-auto overflow-hidden">
      {getEmailContent()}
    </div>
  )
}
