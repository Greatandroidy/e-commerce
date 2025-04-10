"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Check } from "lucide-react"

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
import { Checkbox } from "@/components/ui/checkbox"

interface PaymentMethodFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (paymentMethod: any) => void
  editingPayment?: any
}

export function PaymentMethodForm({ open, onOpenChange, onSuccess, editingPayment }: PaymentMethodFormProps) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [paymentData, setPaymentData] = useState({
    cardNumber: editingPayment?.cardNumber || "",
    cardName: editingPayment?.cardName || "",
    expiryDate: editingPayment?.expiryDate || "",
    cvv: editingPayment?.cvv || "",
    isDefault: editingPayment?.isDefault || false,
  })

  const handleSendVerification = () => {
    // Validate card details
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
      toast.error("Please fill in all card details")
      return
    }

    setIsVerifying(true)

    // Simulate sending verification code
    setTimeout(() => {
      setVerificationSent(true)
      setIsVerifying(false)
      toast.success("Verification code sent", {
        description: "A verification code has been sent to your email. (Use code 123456 for demo)",
      })
    }, 1500)
  }

  const handleVerifyCode = () => {
    setIsVerifying(true)

    // Simulate verifying code
    setTimeout(() => {
      if (verificationCode === "123456") {
        setIsVerified(true)
        setVerificationSent(false)
        toast.success("Card verified successfully", {
          description: "Your card has been verified and is ready to use.",
        })
      } else {
        toast.error("Invalid verification code", {
          description: "The code you entered is incorrect. Please try again.",
        })
      }
      setIsVerifying(false)
    }, 1500)
  }

  const handleSubmit = () => {
    // Validate card details
    if (!paymentData.cardNumber || !paymentData.cardName || !paymentData.expiryDate || !paymentData.cvv) {
      toast.error("Please fill in all card details")
      return
    }

    // Require verification
    if (!isVerified) {
      toast.error("Please verify your card before saving")
      return
    }

    // Create payment method object
    const paymentMethod = {
      id: editingPayment?.id || `pm_${Math.random().toString(36).substring(2, 10)}`,
      type: paymentData.cardNumber.startsWith("4") ? "visa" : "mastercard",
      last4: paymentData.cardNumber.slice(-4),
      expMonth: Number.parseInt(paymentData.expiryDate.split("/")[0]),
      expYear: Number.parseInt(`20${paymentData.expiryDate.split("/")[1]}`),
      isDefault: paymentData.isDefault,
      cardName: paymentData.cardName,
      verified: true,
    }

    onSuccess(paymentMethod)
    onOpenChange(false)

    // Reset form
    if (!editingPayment) {
      setPaymentData({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        isDefault: false,
      })
      setIsVerified(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editingPayment ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
          <DialogDescription>
            {editingPayment ? "Update your payment method details" : "Add a new credit or debit card to your account"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) => {
                // Format card number with spaces
                const value = e.target.value.replace(/\s/g, "")
                const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                setPaymentData({ ...paymentData, cardNumber: formattedValue })
              }}
              maxLength={19}
              className="rounded-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input
              id="card-name"
              placeholder="John Doe"
              value={paymentData.cardName}
              onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
              className="rounded-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input
                id="expiry-date"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) => {
                  // Format expiry date with slash
                  const value = e.target.value.replace(/\D/g, "")
                  // Format expiry date with slash
                  let formattedValue = value
                  if (value.length > 2) {
                    formattedValue = value.slice(0, 2) + "/" + value.slice(2, 4)
                  }
                  setPaymentData({ ...paymentData, expiryDate: formattedValue })
                }}
                maxLength={5}
                className="rounded-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  setPaymentData({ ...paymentData, cvv: value })
                }}
                maxLength={4}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="default-payment"
              checked={paymentData.isDefault}
              onCheckedChange={(checked) => setPaymentData({ ...paymentData, isDefault: !!checked })}
            />
            <Label htmlFor="default-payment">Set as default payment method</Label>
          </div>

          {!isVerified && (
            <div className="mt-2">
              {!verificationSent ? (
                <Button onClick={handleSendVerification} disabled={isVerifying} className="w-full rounded-full">
                  {isVerifying ? "Sending..." : "Verify Card"}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    Enter the verification code sent to your email (use 123456 for demo)
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Verification code"
                      className="rounded-full"
                    />
                    <Button onClick={handleVerifyCode} disabled={isVerifying}>
                      {isVerifying ? "Verifying..." : "Submit"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isVerified && (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="h-4 w-4" />
              <span className="text-sm">Card verified successfully</span>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!isVerified} className="rounded-full">
            {editingPayment ? "Update Card" : "Add Card"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
