"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24">
      <div className="container max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-red-50 dark:bg-red-900/10 rounded-full">
              <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>
          </div>
        </motion.div>

        <motion.h1
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Something went wrong
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          We apologize for the inconvenience. An unexpected error has occurred.
        </motion.p>

        {/* Error details for development */}
        {process.env.NODE_ENV === "development" && (
          <motion.div
            className="bg-muted/30 p-4 rounded-lg mb-8 text-left overflow-auto max-h-40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-sm font-mono text-muted-foreground">{error.message || "Unknown error"}</p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-xs text-muted-foreground cursor-pointer">Stack trace</summary>
                <pre className="mt-2 text-xs overflow-auto p-2 bg-muted/50 rounded">{error.stack}</pre>
              </details>
            )}
          </motion.div>
        )}

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button onClick={reset} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Homepage
            </Button>
          </Link>
        </motion.div>

        {/* Error code */}
        {error.digest && (
          <motion.p
            className="mt-8 text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Error ID: {error.digest}
          </motion.p>
        )}
      </div>
    </div>
  )
}
