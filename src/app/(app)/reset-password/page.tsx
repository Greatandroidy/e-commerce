"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, ShieldCheck } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  // Check password strength
  const checkPasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25

    setPasswordStrength(strength)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    checkPasswordStrength(newPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate token
    if (!token) {
      setError("Invalid or expired reset token. Please request a new password reset link.")
      setIsLoading(false)
      return
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (passwordStrength < 75) {
      setError("Please choose a stronger password")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)
      toast.success("Password reset successful", {
        description: "Your password has been reset. You can now log in with your new password.",
      })
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return ""
    if (passwordStrength <= 25) return "Weak"
    if (passwordStrength <= 50) return "Fair"
    if (passwordStrength <= 75) return "Good"
    return "Strong"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return "bg-red-500"
    if (passwordStrength <= 50) return "bg-yellow-500"
    if (passwordStrength <= 75) return "bg-blue-500"
    return "bg-green-500"
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Invalid Reset Link</CardTitle>
            <CardDescription>The password reset link is invalid or has expired.</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>
                Please request a new password reset link from the forgot password page.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/forgot-password">Request New Link</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
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
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              {success ? "Your password has been reset successfully" : "Enter your new password below"}
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
                  <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">Password Reset Complete</h3>
                <p className="text-muted-foreground mb-4">
                  Your password has been reset successfully. You can now log in with your new password.
                </p>
                <Button onClick={() => router.push("/login")} className="w-full bg-primary hover:bg-primary/90">
                  Go to Login
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
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
                  {password && (
                    <div className="space-y-1 mt-1">
                      <div className="flex justify-between items-center text-xs">
                        <span>Password strength: {getPasswordStrengthText()}</span>
                        <span>{passwordStrength}%</span>
                      </div>
                      <Progress value={passwordStrength} className={getPasswordStrengthColor()} />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="text-sm space-y-2 text-muted-foreground">
                  <p className="font-medium">Password requirements:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className={password.length >= 8 ? "text-green-600 dark:text-green-400" : ""}>
                      At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>
                      At least one uppercase letter
                    </li>
                    <li className={/[0-9]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>
                      At least one number
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(password) ? "text-green-600 dark:text-green-400" : ""}>
                      At least one special character
                    </li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 animate-pulse" />
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      <span>Reset Password</span>
                    </div>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/login">Back to login</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
