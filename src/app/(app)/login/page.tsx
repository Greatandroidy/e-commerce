"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, LogIn, Mail, Phone } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipInfo } from "@/components/ui/tooltip-info"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const identifier = loginMethod === "email" ? email : phone

    if (!identifier) {
      setError(`Please enter your ${loginMethod}`)
      setIsLoading(false)
      return
    }

    try {
      const result = await login(identifier, password)
      if (result.success) {
        toast.success("Login successful", {
          description: "Welcome back to AnimeFreak!",
        })
        router.push("/")
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setEmail("demo@animefreak.com")
    setPassword("password")
    setLoginMethod("email")
    setIsLoading(true)
    setError("")

    try {
      const result = await login("demo@animefreak.com", "password")
      if (result.success) {
        toast.success("Demo login successful", {
          description: "You are now logged in as a demo user.",
        })
        router.push("/")
      } else {
        setError(result.message)
      }
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
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs
              defaultValue="email"
              value={loginMethod}
              onValueChange={(v) => setLoginMethod(v as "email" | "phone")}
            >
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                  <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Button variant="outline" className="mt-4 w-full" onClick={handleDemoLogin} disabled={isLoading}>
                  Login with Demo Account
                </Button>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
