"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, UserPlus, Lock, Unlock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/lib/auth"
import { TooltipInfo } from "@/components/ui/tooltip-info"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailLocked, setEmailLocked] = useState(false)
  const [phoneLocked, setPhoneLocked] = useState(false)

  // For demo purposes, auto-fill from localStorage if available
  useEffect(() => {
    const savedEmail = localStorage.getItem("checkout_email")
    const savedPhone = localStorage.getItem("checkout_phone")

    if (savedEmail) {
      setEmail(savedEmail)
    }

    if (savedPhone) {
      setPhone(savedPhone)
    }
  }, [])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (emailLocked) return
    setEmail(e.target.value)
    if (emailVerified) setEmailVerified(false)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (phoneLocked) return
    setPhone(e.target.value)
    if (phoneVerified) setPhoneVerified(false)
  }

  const toggleEmailLock = () => {
    setEmailLocked(!emailLocked)
    if (emailLocked && emailVerified) {
      setEmailVerified(false)
    }
  }

  const togglePhoneLock = () => {
    setPhoneLocked(!phoneLocked)
    if (phoneLocked && phoneVerified) {
      setPhoneVerified(false)
    }
  }

  const verifyEmail = () => {
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address")
      return
    }

    // Simulate verification
    toast.loading("Sending verification code...")

    setTimeout(() => {
      toast.dismiss()
      toast.success("Email verified successfully", {
        description: "For demo purposes, all emails are automatically verified.",
      })
      setEmailVerified(true)
      setEmailLocked(true)
    }, 1500)
  }

  const verifyPhone = () => {
    if (!phone || phone.length < 10) {
      toast.error("Please enter a valid phone number")
      return
    }

    // Simulate verification
    toast.loading("Sending verification code...")

    setTimeout(() => {
      toast.dismiss()
      toast.success("Phone verified successfully", {
        description: "For demo purposes, all phone numbers are automatically verified.",
      })
      setPhoneVerified(true)
      setPhoneLocked(true)
    }, 1500)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate email or phone is verified
    if (!emailVerified && !phoneVerified) {
      setError("Please verify your email or phone number")
      setIsLoading(false)
      return
    }

    try {
      const result = await signup(email, password, name, phone)
      if (result.success) {
        toast.success("Account created", {
          description: "Your account has been created successfully!",
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
    <TooltipProvider>
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
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>Sign up to start shopping anime-inspired fashion</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="email">Email</Label>
                      <TooltipInfo
                        content="We'll send a verification code to this email. Either email or phone verification is required."
                        size="sm"
                      />
                    </div>
                    {email && (
                      <Button type="button" variant="ghost" size="sm" onClick={toggleEmailLock} className="h-6 px-2">
                        {emailLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        <span className="ml-1 text-xs">{emailLocked ? "Unlock" : "Lock"}</span>
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={emailLocked}
                        className={emailVerified ? "pr-8 border-green-500" : ""}
                      />
                      {emailVerified && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant={emailVerified ? "outline" : "default"}
                      onClick={verifyEmail}
                      disabled={!email || emailVerified}
                      className="rounded-full"
                    >
                      {emailVerified ? "Verified" : "Verify"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="phone">Phone Number (Recommended)</Label>
                      <TooltipInfo
                        content="Adding a phone number helps with account recovery and order tracking."
                        size="sm"
                      />
                    </div>
                    {phone && (
                      <Button type="button" variant="ghost" size="sm" onClick={togglePhoneLock} className="h-6 px-2">
                        {phoneLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                        <span className="ml-1 text-xs">{phoneLocked ? "Unlock" : "Lock"}</span>
                      </Button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={phone}
                        onChange={handlePhoneChange}
                        disabled={phoneLocked}
                        className={phoneVerified ? "pr-8 border-green-500" : ""}
                      />
                      {phoneVerified && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant={phoneVerified ? "outline" : "default"}
                      onClick={verifyPhone}
                      disabled={!phone || phoneVerified}
                      className="rounded-full"
                    >
                      {phoneVerified ? "Verified" : "Verify"}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
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
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                  <UserPlus className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Login
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
    </TooltipProvider>
  )
}
