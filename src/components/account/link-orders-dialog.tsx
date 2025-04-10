"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  findMatchingOrders,
  linkOrdersToUserAccount,
  generateVerificationCode,
  storeVerificationCode,
  verifyCode,
  clearVerificationCode,
} from "@/lib/account-linking"
import { useAuth } from "@/lib/auth"
import type { Order } from "@/lib/order-tracking"
import { TooltipInfo } from "@/components/ui/tooltip-info"
import { TooltipProvider } from "@/components/ui/tooltip"

interface LinkOrdersDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOrdersLinked: () => void
}

export function LinkOrdersDialog({ open, onOpenChange, onOrdersLinked }: LinkOrdersDialogProps) {
  const { user } = useAuth()
  const [matchingOrders, setMatchingOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [trackingNumber, setTrackingNumber] = useState("")

  useEffect(() => {
    if (open && user) {
      setIsLoading(true)
      // Find orders that match the user's email
      const orders = findMatchingOrders(user)
      setMatchingOrders(orders)
      setIsLoading(false)
    }
  }, [open, user])

  const handleSendVerification = () => {
    if (!user) return

    setIsVerifying(true)

    // Generate and store verification code
    const code = generateVerificationCode() // This will always return "123456" for demo
    storeVerificationCode(user.email, code)

    // Simulate sending verification code
    setTimeout(() => {
      setVerificationSent(true)
      setIsVerifying(false)
      toast.success("Verification code sent", {
        description: `A verification code has been sent to ${user.email}. (Use code ${code} for demo)`,
      })
    }, 1500)
  }

  const handleVerifyAndLink = () => {
    if (!user) return

    setIsVerifying(true)

    // Verify code
    setTimeout(() => {
      const isValid = verifyCode(user.email, verificationCode)

      if (isValid) {
        // Link orders to account
        const orderIds = matchingOrders.map((order) => order.id)
        const success = linkOrdersToUserAccount(user, orderIds)

        if (success) {
          clearVerificationCode(user.email)
          toast.success("Orders linked successfully", {
            description: `${matchingOrders.length} order(s) have been linked to your account.`,
          })
          onOrdersLinked()
          onOpenChange(false)
        } else {
          toast.error("Failed to link orders", {
            description: "An error occurred while linking orders to your account.",
          })
        }
      } else {
        toast.error("Invalid verification code", {
          description: "The verification code you entered is invalid. Please try again.",
        })
      }

      setIsVerifying(false)
    }, 1500)
  }

  return (
    <TooltipProvider>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Link Previous Orders</DialogTitle>
            <DialogDescription>
              We found {matchingOrders.length} order(s) associated with your email address. Verify your identity to link
              them to your account.
            </DialogDescription>
          </DialogHeader>

          {isLoading ? (
            <div className="py-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Searching for orders...</p>
            </div>
          ) : matchingOrders.length === 0 ? (
            <div className="py-6 text-center">
              <p>No previous orders found with your email address.</p>
              <div className="mt-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <Label htmlFor="tracking-number">Have a tracking number?</Label>
                  <TooltipInfo content="Enter a tracking number to find and link a specific order." size="sm" />
                </div>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="tracking-number"
                    placeholder="Enter tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="rounded-full"
                  />
                  <Button variant="outline" className="rounded-full" disabled={!trackingNumber}>
                    Find Order
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-4 space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">Orders Found</h3>
                  <TooltipInfo
                    content="These orders were placed with your email address but aren't linked to your account yet."
                    size="sm"
                  />
                </div>
                <ul className="space-y-2 text-sm">
                  {matchingOrders.map((order) => (
                    <li key={order.id} className="flex justify-between">
                      <span>{order.id}</span>
                      <span>${order.total.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {!verificationSent ? (
                <div className="text-center">
                  <Button onClick={handleSendVerification} disabled={isVerifying} className="rounded-full">
                    {isVerifying ? "Sending..." : "Send Verification Code"}
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">We'll send a verification code to {user?.email}</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="verification-code">Verification Code</Label>
                    <div className="text-xs text-muted-foreground">
                      For demo, use code: <span className="font-medium">123456</span>
                    </div>
                  </div>
                  <div className="relative">
                    <Input
                      id="verification-code"
                      placeholder="Enter verification code"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="rounded-full pr-10"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Enter the verification code sent to {user?.email}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
              Cancel
            </Button>
            {verificationSent && matchingOrders.length > 0 && (
              <Button
                onClick={handleVerifyAndLink}
                disabled={isVerifying || !verificationCode}
                className="rounded-full"
              >
                {isVerifying ? "Verifying..." : "Link Orders"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
