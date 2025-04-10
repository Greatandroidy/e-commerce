"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, Send } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TooltipInfo } from "@/components/ui/tooltip-info"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [method, setMethod] = useState<"email" | "phone">("email")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const identifier = method === "email" ? email : phone

    if (!identifier) {
      setError(`Please enter your ${method}`)
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)
      toast.success("Reset link sent", {
        description: `A password reset link has been sent to your ${method}.`,
      })
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">AnimeFreak</h1>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              {success
                ? "Check your inbox for the reset link"
                : "Enter your email or phone number to reset your password"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <div className="text-center py-4">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <Send className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Check your {method}</h3>
                <p className="text-muted-foreground mb-4">
                  We've sent a password reset link to your {method === "email" ? email : phone}. The link will expire in
                  15 minutes.
                </p>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={() => setSuccess(false)} className="w-full">
                    Try another method
                  </Button>
                  <Button onClick={() => router.push("/login")} className="w-full bg-primary hover:bg-primary/90">
                    Back to login
                  </Button>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="email" value={method} onValueChange={(v) => setMethod(v as "email" | "phone")}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="email" className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-1.5">
                    <Phone className="h-4 w-4" />
                    <span>Phone</span>
                  </TabsTrigger>
                </TabsList>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <TabsContent value="email" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="email">Email</Label>
                        <TooltipProvider>
                          <TooltipInfo content="Enter the email address associated with your account." size="sm" />
                        </TooltipProvider>
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4 mt-0">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <TooltipProvider>
                          <TooltipInfo content="Enter the phone number associated with your account." size="sm" />
                        </TooltipProvider>
                      </div>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </TabsContent>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Tabs>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/login" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
