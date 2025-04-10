"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, ArrowLeft, RefreshCw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function VerifyPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const type = searchParams.get("type") || "email"

  const [isLoading, setIsLoading] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Invalid verification link. Please request a new one.")
        setIsLoading(false)
        return
      }

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // For demo purposes, we'll consider all tokens valid except "invalid"
        if (token === "invalid") {
          setError("This verification link has expired or is invalid.")
          setIsVerified(false)
        } else {
          setIsVerified(true)
          toast.success(`Your ${type} has been verified`, {
            description: "You can now log in to your account.",
          })
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    verifyToken()
  }, [token, type])

  const handleResendVerification = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast.success("Verification link sent", {
        description: `A new verification link has been sent to your ${type}.`,
      })
    } catch (err) {
      toast.error("Failed to send verification link", {
        description: "Please try again later.",
      })
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
            <CardTitle>
              {isLoading
                ? "Verifying..."
                : isVerified
                  ? `${type.charAt(0).toUpperCase() + type.slice(1)} Verified`
                  : "Verification Failed"}
            </CardTitle>
            <CardDescription>
              {isLoading
                ? `We're verifying your ${type}...`
                : isVerified
                  ? `Your ${type} has been successfully verified`
                  : `We couldn't verify your ${type}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="text-center py-4">
              {isLoading ? (
                <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                </div>
              ) : isVerified ? (
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
                  <XCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
              )}

              {!isLoading && (
                <>
                  <h3 className="text-lg font-medium mb-2">
                    {isVerified ? "Verification Complete" : "Verification Failed"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {isVerified
                      ? `Your ${type} has been successfully verified. You can now access all features of your account.`
                      : `We couldn't verify your ${type}. The link may have expired or is invalid.`}
                  </p>

                  {isVerified ? (
                    <Button onClick={() => router.push("/login")} className="w-full bg-primary hover:bg-primary/90">
                      Go to Login
                    </Button>
                  ) : (
                    <Button
                      onClick={handleResendVerification}
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Resend Verification Link"}
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
