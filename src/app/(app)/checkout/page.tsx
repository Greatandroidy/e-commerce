"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  CreditCard,
  Check,
  MapPin,
  Package,
  Truck,
  ShieldCheck,
  ArrowLeft,
  Phone,
  Globe,
  Lock,
  Unlock,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateOrderId, generateTrackingToken, saveOrder, calculateExpiryDate } from "@/lib/order-tracking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TooltipInfo } from "@/components/ui/tooltip-info"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useAuth } from "@/lib/auth"

// Country codes for phone verification
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+44", country: "United Kingdom" },
  { code: "+81", country: "Japan" },
  { code: "+254", country: "Kenya" },
  { code: "+61", country: "Australia" },
  { code: "+49", country: "Germany" },
  { code: "+33", country: "France" },
  { code: "+86", country: "China" },
  { code: "+91", country: "India" },
  { code: "+27", country: "South Africa" },
  { code: "+55", country: "Brazil" },
  { code: "+52", country: "Mexico" },
  { code: "+971", country: "UAE" },
  { code: "+65", country: "Singapore" },
  { code: "+82", country: "South Korea" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getProductById, clearCart } = useStore()
  const { user, isAuthenticated } = useAuth()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [paymentTab, setPaymentTab] = useState("card")
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [mpesaDetails, setMpesaDetails] = useState({
    phoneNumber: "",
    countryCode: "+254",
  })
  const [savePaymentInfo, setSavePaymentInfo] = useState(false)
  const [orderNotes, setOrderNotes] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [trackingToken, setTrackingToken] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationTarget, setVerificationTarget] = useState<"email" | "phone" | null>(null)
  const [emailLocked, setEmailLocked] = useState(false)
  const [phoneLocked, setPhoneLocked] = useState(false)

  // Auto-fill user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // Auto-fill billing info
      setBillingAddress((prev) => ({
        ...prev,
        firstName: user.name.split(" ")[0] || "",
        lastName: user.name.split(" ").slice(1).join(" ") || "",
        email: user.email,
        phone: user.phone || "",
      }))

      // If user has a verified email, mark it as verified and locked
      if (user.emailVerified) {
        setEmailVerified(true)
        setEmailLocked(true)
      }

      // If user has a verified phone, mark it as verified and locked
      if (user.phoneVerified) {
        setPhoneVerified(true)
        setPhoneLocked(true)
      }
    }
  }, [isAuthenticated, user])

  // Auto-fill from previous steps
  useEffect(() => {
    if (step === 2 && sameAsShipping) {
      setBillingAddress((prev) => ({
        ...prev,
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        address: shippingAddress.address,
        apartment: shippingAddress.apartment,
        city: shippingAddress.city,
        state: shippingAddress.state,
        zipCode: shippingAddress.zipCode,
        country: shippingAddress.country,
      }))
    }
  }, [step, sameAsShipping, shippingAddress])

  // Save email and phone to localStorage for future use
  useEffect(() => {
    if (emailVerified && billingAddress.email) {
      localStorage.setItem("checkout_email", billingAddress.email)
    }

    if (phoneVerified && billingAddress.phone) {
      localStorage.setItem("checkout_phone", billingAddress.phone)
    }
  }, [emailVerified, phoneVerified, billingAddress.email, billingAddress.phone])

  // Calculate order summary
  const cartItems = cart.map((item) => {
    const product = getProductById(item.productId)
    return {
      ...item,
      product,
    }
  })

  const subtotal = cartItems.reduce((total, item) => {
    const price = item.product?.price || 0
    const discount = item.product?.discount || 0
    const discountedPrice = price * (1 - discount / 100)
    return total + discountedPrice * item.quantity
  }, 0)

  const shippingCost = shippingMethod === "express" ? 9.99 : shippingMethod === "standard" ? 4.99 : 0
  const tax = subtotal * 0.08 // 8% tax
  const discount = promoApplied ? promoDiscount : 0
  const total = subtotal + shippingCost + tax - discount

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true)
      setPromoDiscount(subtotal * 0.1) // 10% discount
      toast.success("Promo code applied", {
        description: "10% discount has been applied to your order.",
      })
    } else {
      toast.error("Invalid promo code", {
        description: "The promo code you entered is invalid or expired.",
      })
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (emailLocked) return
    setBillingAddress({ ...billingAddress, email: e.target.value })
    if (emailVerified) setEmailVerified(false)
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (phoneLocked) return
    setBillingAddress({ ...billingAddress, phone: e.target.value })
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

  const handleSendVerification = (type: "email" | "phone") => {
    setIsVerifying(true)
    setVerificationTarget(type)

    // Validate input
    if (type === "email" && (!billingAddress.email || !billingAddress.email.includes("@"))) {
      toast.error("Please enter a valid email address")
      setIsVerifying(false)
      return
    }

    if (type === "phone" && (!billingAddress.phone || billingAddress.phone.length < 9)) {
      toast.error("Please enter a valid phone number")
      setIsVerifying(false)
      return
    }

    // Simulate sending verification code
    setTimeout(() => {
      setVerificationSent(true)
      setIsVerifying(false)
      toast.success(`Verification code sent`, {
        description: `A verification code has been sent to your ${type}. (Use code 123456 for demo)`,
      })
    }, 1500)
  }

  const handleVerifyCode = () => {
    setIsVerifying(true)

    // Simulate verifying code
    setTimeout(() => {
      if (verificationCode === "123456") {
        if (verificationTarget === "email") {
          setEmailVerified(true)
          setEmailLocked(true)
        } else if (verificationTarget === "phone") {
          setPhoneVerified(true)
          setPhoneLocked(true)
        }

        setVerificationSent(false)
        setVerificationCode("")
        setVerificationTarget(null)
        setIsVerifying(false)

        toast.success("Verification successful", {
          description: `Your ${verificationTarget} has been verified.`,
        })
      } else {
        toast.error("Invalid code", {
          description: "The verification code you entered is invalid. Please try again.",
        })
        setIsVerifying(false)
      }
    }, 1500)
  }

  const handleContinue = () => {
    if (step === 1) {
      // Validate shipping info
      if (
        !shippingAddress.firstName ||
        !shippingAddress.lastName ||
        !shippingAddress.address ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.zipCode
      ) {
        toast.error("Missing information", {
          description: "Please fill in all required shipping fields.",
        })
        return
      }

      // If same as shipping is checked, copy shipping to billing
      if (sameAsShipping) {
        setBillingAddress({
          ...billingAddress,
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          address: shippingAddress.address,
          apartment: shippingAddress.apartment,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        })
      }

      setStep(2)
    } else if (step === 2) {
      // Validate billing info
      if (
        !billingAddress.firstName ||
        !billingAddress.lastName ||
        !billingAddress.address ||
        !billingAddress.city ||
        !billingAddress.state ||
        !billingAddress.zipCode
      ) {
        toast.error("Missing information", {
          description: "Please fill in all required billing fields.",
        })
        return
      }

      // Validate email or phone is verified
      if (!emailVerified && !phoneVerified) {
        toast.error("Verification required", {
          description: "Please verify either your email or phone number to continue.",
        })
        return
      }

      // Validate email format if provided
      if (billingAddress.email && !emailVerified) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(billingAddress.email)) {
          toast.error("Invalid email", {
            description: "Please enter a valid email address and verify it.",
          })
          return
        }
      }

      // Validate phone format if provided
      if (billingAddress.phone && !phoneVerified) {
        if (!/^\d{9,15}$/.test(billingAddress.phone)) {
          toast.error("Invalid phone number", {
            description: "Please enter a valid phone number and verify it.",
          })
          return
        }
      }

      setStep(3)
    } else if (step === 3) {
      // Validate payment info
      if (paymentTab === "card") {
        if (!cardDetails.cardNumber || !cardDetails.cardName || !cardDetails.expiryDate || !cardDetails.cvv) {
          toast.error("Missing information", {
            description: "Please fill in all required payment fields.",
          })
          return
        }

        // Basic card validation
        if (cardDetails.cardNumber.replace(/\s/g, "").length !== 16) {
          toast.error("Invalid card number", {
            description: "Please enter a valid 16-digit card number.",
          })
          return
        }
      } else if (paymentTab === "mpesa") {
        if (!mpesaDetails.phoneNumber) {
          toast.error("Missing information", {
            description: "Please enter your M-Pesa phone number.",
          })
          return
        }

        // Basic phone validation
        if (!/^\d{9,10}$/.test(mpesaDetails.phoneNumber)) {
          toast.error("Invalid phone number", {
            description: "Please enter a valid M-Pesa phone number.",
          })
          return
        }
      }

      handlePlaceOrder()
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      router.push("/cart")
    }
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)

    // Generate order ID and tracking token
    const newOrderId = generateOrderId()
    const token = generateTrackingToken()

    // Simulate order processing
    setTimeout(() => {
      // Create order object
      const order = {
        id: newOrderId,
        token: token,
        email: billingAddress.email,
        phone: billingAddress.countryCode + billingAddress.phone,
        date: new Date().toISOString(),
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.product?.name || "",
          price: item.product?.price || 0,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          image: item.product?.image || "/placeholder.svg",
        })),
        total: total,
        subtotal: subtotal,
        shipping: shippingCost,
        tax: tax,
        discount: discount > 0 ? discount : undefined,
        paymentMethod:
          paymentTab === "card"
            ? "Credit Card"
            : paymentTab === "mpesa"
              ? "M-Pesa"
              : paymentTab === "paypal"
                ? "PayPal"
                : "Apple Pay",
        shippingMethod:
          shippingMethod === "express"
            ? "Express Shipping"
            : shippingMethod === "standard"
              ? "Standard Shipping"
              : "Free Shipping",
        shippingAddress: {
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          address: shippingAddress.address,
          apartment: shippingAddress.apartment,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
          email: billingAddress.email,
          phone: billingAddress.countryCode + billingAddress.phone,
        },
        status: {
          status: "pending",
          updatedAt: new Date().toISOString(),
          details: "Your order has been received and is being processed.",
          estimatedDelivery: (() => {
            const date = new Date()
            date.setDate(date.getDate() + (shippingMethod === "express" ? 2 : shippingMethod === "standard" ? 5 : 7))
            return date.toISOString()
          })(),
        },
        trackingNumber: `TRK${Math.floor(10000000 + Math.random() * 90000000)}`,
        expiresAt: calculateExpiryDate(new Date().toISOString(), "pending"),
        isLinkedToAccount: isAuthenticated,
        canCancel: true,
      }

      // Save order to localStorage
      saveOrder(order)

      setIsProcessing(false)
      setOrderComplete(true)
      setOrderId(newOrderId)
      setTrackingToken(token)
      clearCart()
    }, 2000)
  }

  if (orderComplete) {
    return (
      <>
        <Header />
        <main className="container px-4 py-8 md:px-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <Card className="bg-background/80 backdrop-blur-md">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-50" />
                </div>
                <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
                <CardDescription>
                  Thank you for your purchase. Your order has been received and is being processed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-muted/50 p-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Order Number:</span>
                      <span className="font-medium">{orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span className="font-medium">{billingAddress.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total:</span>
                      <span className="font-medium">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Payment Method:</span>
                      <span className="font-medium">
                        {paymentTab === "card"
                          ? "Credit Card"
                          : paymentTab === "mpesa"
                            ? "M-Pesa"
                            : paymentTab === "paypal"
                              ? "PayPal"
                              : "Apple Pay"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-primary/10 p-4 border border-primary/20">
                  <h3 className="font-medium mb-2 flex items-center">
                    <Truck className="h-4 w-4 mr-2" />
                    Track Your Order
                  </h3>
                  <p className="text-sm mb-3">
                    You can track your order status using the link below or by visiting your account page.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 rounded-full" variant="outline" asChild>
                      <Link
                        href={`/track-order?token=${trackingToken}&email=${encodeURIComponent(billingAddress.email)}`}
                      >
                        Track Order Status
                      </Link>
                    </Button>
                    <Button className="flex-1 rounded-full" variant="default" asChild>
                      <Link href="/">Continue Shopping</Link>
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Order Details</h3>
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex gap-4">
                        <div className="h-16 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                          <img
                            src={item.product?.image || "/placeholder.svg"}
                            alt={item.product?.name || "Product"}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.product?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.size}, Color: {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                          </p>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm">Qty: {item.quantity}</p>
                            <p className="font-medium">
                              ${((item.product?.price || 0) * (1 - (item.product?.discount || 0) / 100)).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-medium">Shipping Address</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p>{shippingAddress.address}</p>
                      {shippingAddress.apartment && <p>{shippingAddress.apartment}</p>}
                      <p>
                        {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                      </p>
                      <p>{shippingAddress.country}</p>
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="font-medium">Billing Address</h3>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {billingAddress.firstName} {billingAddress.lastName}
                      </p>
                      <p>{billingAddress.address}</p>
                      {billingAddress.apartment && <p>{billingAddress.apartment}</p>}
                      <p>
                        {billingAddress.city}, {billingAddress.state} {billingAddress.zipCode}
                      </p>
                      <p>{billingAddress.country}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button className="flex-1" onClick={() => router.push("/")} asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link href="/account?tab=orders">View All Orders</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <TooltipProvider>
        <main className="container px-4 py-8 md:px-6 md:py-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="mb-6">
              <Button variant="ghost" onClick={handleBack} className="gap-1">
                <ArrowLeft className="h-4 w-4" />
                {step === 1 ? "Back to Cart" : "Back"}
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Main checkout form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Checkout steps */}
                <div className="flex justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                        step >= 1 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                      )}
                    >
                      1
                    </div>
                    <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Shipping</span>
                  </div>
                  <div className="h-px w-12 bg-muted self-center" />
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                        step >= 2 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                      )}
                    >
                      2
                    </div>
                    <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Billing</span>
                  </div>
                  <div className="h-px w-12 bg-muted self-center" />
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium",
                        step >= 3 ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground",
                      )}
                    >
                      3
                    </div>
                    <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Payment</span>
                  </div>
                </div>

                {/* Step 1: Shipping */}
                {step === 1 && (
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Shipping Information
                        </CardTitle>
                        <TooltipInfo
                          content="Enter your shipping details where you want your order to be delivered."
                          size="sm"
                        />
                      </div>
                      <CardDescription>Enter your shipping details to continue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="shipping-first-name">
                            First Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shipping-first-name"
                            value={shippingAddress.firstName}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                            required
                            className="rounded-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping-last-name">
                            Last Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shipping-last-name"
                            value={shippingAddress.lastName}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                            required
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shipping-address">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="shipping-address"
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                          required
                          className="rounded-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shipping-apartment">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="shipping-apartment"
                          value={shippingAddress.apartment}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, apartment: e.target.value })}
                          className="rounded-full"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="shipping-city">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shipping-city"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            required
                            className="rounded-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping-state">
                            State/Province <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shipping-state"
                            value={shippingAddress.state}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                            required
                            className="rounded-full"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shipping-zip">
                            ZIP/Postal Code <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="shipping-zip"
                            value={shippingAddress.zipCode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                            required
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shipping-country">
                          Country <span className="text-red-500">*</span>
                        </Label>
                        <Select
                          value={shippingAddress.country}
                          onValueChange={(value) => setShippingAddress({ ...shippingAddress, country: value })}
                        >
                          <SelectTrigger id="shipping-country" className="rounded-full">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="Japan">Japan</SelectItem>
                            <SelectItem value="Kenya">Kenya</SelectItem>
                            <SelectItem value="South Africa">South Africa</SelectItem>
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="Ghana">Ghana</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="shipping-method">
                            Shipping Method <span className="text-red-500">*</span>
                          </Label>
                          <TooltipInfo
                            content="Choose how quickly you want to receive your order. Free shipping is available for orders over $50."
                            size="sm"
                          />
                        </div>
                        <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="standard" id="standard" />
                              <Label htmlFor="standard" className="flex items-center gap-2 cursor-pointer">
                                <Truck className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Standard Shipping</p>
                                  <p className="text-sm text-muted-foreground">3-5 business days</p>
                                </div>
                              </Label>
                            </div>
                            <p className="font-medium">$4.99</p>
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="express" id="express" />
                              <Label htmlFor="express" className="flex items-center gap-2 cursor-pointer">
                                <Package className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Express Shipping</p>
                                  <p className="text-sm text-muted-foreground">1-2 business days</p>
                                </div>
                              </Label>
                            </div>
                            <p className="font-medium">$9.99</p>
                          </div>

                          <div className="flex items-center justify-between rounded-lg border p-4">
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="free" id="free" disabled={subtotal < 50} />
                              <Label
                                htmlFor="free"
                                className={cn("flex items-center gap-2 cursor-pointer", subtotal < 50 && "opacity-50")}
                              >
                                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <p className="font-medium">Free Shipping</p>
                                  <p className="text-sm text-muted-foreground">
                                    {subtotal < 50
                                      ? `Add ${(50 - subtotal).toFixed(2)} more to qualify`
                                      : "5-7 business days"}
                                  </p>
                                </div>
                              </Label>
                            </div>
                            <p className="font-medium">$0.00</p>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="order-notes">Order Notes (optional)</Label>
                        <Textarea
                          id="order-notes"
                          placeholder="Special instructions for delivery"
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          className="min-h-[100px] rounded-md"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Billing */}
                {step === 2 && (
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Billing Information
                        </CardTitle>
                        <TooltipInfo
                          content="Enter your billing details and verify your contact information."
                          size="sm"
                        />
                      </div>
                      <CardDescription>Enter your billing details to continue</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="same-address"
                          checked={sameAsShipping}
                          onCheckedChange={(checked) => setSameAsShipping(!!checked)}
                        />
                        <label
                          htmlFor="same-address"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Same as shipping address
                        </label>
                      </div>

                      {!sameAsShipping && (
                        <div className="space-y-4 pt-2">
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="billing-first-name">
                                First Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing-first-name"
                                value={billingAddress.firstName}
                                onChange={(e) => setBillingAddress({ ...billingAddress, firstName: e.target.value })}
                                required
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing-last-name">
                                Last Name <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing-last-name"
                                value={billingAddress.lastName}
                                onChange={(e) => setBillingAddress({ ...billingAddress, lastName: e.target.value })}
                                required
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="billing-address">
                              Address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="billing-address"
                              value={billingAddress.address}
                              onChange={(e) => setBillingAddress({ ...billingAddress, address: e.target.value })}
                              required
                              className="rounded-full"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="billing-apartment">Apartment, suite, etc. (optional)</Label>
                            <Input
                              id="billing-apartment"
                              value={billingAddress.apartment}
                              onChange={(e) => setBillingAddress({ ...billingAddress, apartment: e.target.value })}
                              className="rounded-full"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor="billing-city">
                                City <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing-city"
                                value={billingAddress.city}
                                onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                                required
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing-state">
                                State/Province <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing-state"
                                value={billingAddress.state}
                                onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                                required
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="billing-zip">
                                ZIP/Postal Code <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="billing-zip"
                                value={billingAddress.zipCode}
                                onChange={(e) => setBillingAddress({ ...billingAddress, zipCode: e.target.value })}
                                required
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="billing-country">
                              Country <span className="text-red-500">*</span>
                            </Label>
                            <Select
                              value={billingAddress.country}
                              onValueChange={(value) => setBillingAddress({ ...billingAddress, country: value })}
                            >
                              <SelectTrigger id="billing-country" className="rounded-full">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="United States">United States</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                <SelectItem value="Australia">Australia</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                                <SelectItem value="Kenya">Kenya</SelectItem>
                                <SelectItem value="South Africa">South Africa</SelectItem>
                                <SelectItem value="Nigeria">Nigeria</SelectItem>
                                <SelectItem value="Ghana">Ghana</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="billing-email">
                                Email <span className="text-red-500">*</span>
                              </Label>
                              <TooltipInfo
                                content="We'll send your order confirmation and updates to this email. Verification required."
                                size="sm"
                              />
                            </div>
                            {emailVerified ? (
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                Verified
                              </Badge>
                            ) : (
                              billingAddress.email && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={toggleEmailLock}
                                  className="h-6 px-2"
                                >
                                  {emailLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                  <span className="ml-1 text-xs">{emailLocked ? "Unlock" : "Lock"}</span>
                                </Button>
                              )
                            )}
                          </div>
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <Input
                                id="billing-email"
                                type="email"
                                value={billingAddress.email}
                                onChange={handleEmailChange}
                                required={!phoneVerified}
                                disabled={emailLocked}
                                className={cn(
                                  "rounded-full",
                                  emailVerified ? "pr-8 border-green-500" : "",
                                  emailLocked && !emailVerified ? "bg-muted" : "",
                                )}
                              />
                              {emailVerified && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleSendVerification("email")}
                              disabled={!billingAddress.email || isVerifying || emailVerified}
                              className="whitespace-nowrap rounded-full"
                              variant={emailVerified ? "outline" : "default"}
                            >
                              {isVerifying && verificationTarget === "email"
                                ? "Sending..."
                                : emailVerified
                                  ? "Verified"
                                  : "Verify"}
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Label htmlFor="billing-phone">
                                Phone {!emailVerified && <span className="text-red-500">*</span>}
                              </Label>
                              <TooltipInfo
                                content="We'll use this number for delivery updates and order verification."
                                size="sm"
                              />
                            </div>
                            {phoneVerified ? (
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                Verified
                              </Badge>
                            ) : (
                              billingAddress.phone && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={togglePhoneLock}
                                  className="h-6 px-2"
                                >
                                  {phoneLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                  <span className="ml-1 text-xs">{phoneLocked ? "Unlock" : "Lock"}</span>
                                </Button>
                              )
                            )}
                          </div>
                          <div className="flex gap-2">
                            <div className="flex flex-1">
                              <Select
                                value={billingAddress.countryCode}
                                onValueChange={(value) => setBillingAddress({ ...billingAddress, countryCode: value })}
                                disabled={phoneLocked}
                              >
                                <SelectTrigger
                                  className={cn(
                                    "w-[90px] rounded-l-full rounded-r-none border-r-0",
                                    phoneLocked && !phoneVerified ? "bg-muted" : "",
                                  )}
                                >
                                  <SelectValue placeholder="+1" />
                                </SelectTrigger>
                                <SelectContent>
                                  {countryCodes.map((country) => (
                                    <SelectItem key={country.code} value={country.code}>
                                      {country.code}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="relative flex-1">
                                <Input
                                  id="billing-phone"
                                  type="tel"
                                  value={billingAddress.phone}
                                  onChange={handlePhoneChange}
                                  required={!emailVerified}
                                  disabled={phoneLocked}
                                  className={cn(
                                    "rounded-l-none rounded-r-full",
                                    phoneVerified ? "pr-8 border-green-500" : "",
                                    phoneLocked && !phoneVerified ? "bg-muted" : "",
                                  )}
                                  placeholder="Phone number"
                                />
                                {phoneVerified && (
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                    <Check className="h-4 w-4" />
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => handleSendVerification("phone")}
                              disabled={!billingAddress.phone || isVerifying || phoneVerified}
                              className="whitespace-nowrap rounded-full"
                              variant={phoneVerified ? "outline" : "default"}
                            >
                              {isVerifying && verificationTarget === "phone"
                                ? "Sending..."
                                : phoneVerified
                                  ? "Verified"
                                  : "Verify"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Verification code input */}
                      {verificationSent && (
                        <div className="p-4 border rounded-lg bg-muted/30 mt-4">
                          <h3 className="font-medium mb-2">Verification Code</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            We've sent a verification code to your {verificationTarget}.
                            <br />
                            <span className="text-primary">For demo purposes, use code 123456</span>
                          </p>
                          <div className="flex gap-2">
                            <Input
                              value={verificationCode}
                              onChange={(e) => setVerificationCode(e.target.value)}
                              placeholder="Enter verification code"
                              className="rounded-full"
                            />
                            <Button onClick={handleVerifyCode} disabled={!verificationCode || isVerifying}>
                              {isVerifying ? "Verifying..." : "Submit"}
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Warning if neither email nor phone is verified */}
                      {!emailVerified && !phoneVerified && billingAddress.email && billingAddress.phone && (
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-md text-sm flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p>
                            Please verify either your email or phone number to continue. This helps us protect your
                            account and send order updates.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Payment */}
                {step === 3 && (
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Payment Method
                        </CardTitle>
                        <TooltipInfo
                          content="Choose your preferred payment method to complete your purchase."
                          size="sm"
                        />
                      </div>
                      <CardDescription>Choose your preferred payment method</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Tabs value={paymentTab} onValueChange={setPaymentTab} className="w-full">
                        <TabsList className="grid grid-cols-4 mb-4">
                          <TabsTrigger value="card" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span className="hidden sm:inline">Card</span>
                          </TabsTrigger>
                          <TabsTrigger value="mpesa" className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span className="hidden sm:inline">M-Pesa</span>
                          </TabsTrigger>
                          <TabsTrigger value="paypal" className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span className="hidden sm:inline">PayPal</span>
                          </TabsTrigger>
                          <TabsTrigger value="applepay" className="flex items-center gap-2">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                              <path d="M17.72 17.25a6.824 6.824 0 0 1-.677 1.195 5.243 5.243 0 0 1-.722.883 1.394 1.394 0 0 1-.9.396 2.243 2.243 0 0 1-.824-.205 2.41 2.41 0 0 0-.892-.204 2.493 2.493 0 0 0-.928.204 2.13 2.13 0 0 1-.777.217 1.311 1.311 0 0 1-.936-.408 5.522 5.522 0 0 1-.746-.907 6.873 6.873 0 0 1-.795-1.56 5.85 5.85 0 0 1-.33-1.889 3.473 3.473 0 0 1 .456-1.815 2.687 2.687 0 0 1 .96-.96 2.584 2.584 0 0 1 1.296-.36 3.025 3.025 0 0 1 .995.228c.307.137.57.258.787.36.19.09.447.204.77.342.26.114.47.171.63.171.13 0 .32-.06.57-.18s.54-.24.87-.36c.33-.12.68-.23 1.06-.33.38-.09.76-.11 1.14-.06.42.03.8.14 1.14.33.34.19.62.44.84.75a2.348 2.348 0 0 0-.87 1.866c.01.62.16 1.15.45 1.59.29.44.6.75.93.93-.12.34-.24.66-.37.96zm-2.33-14.23a2.748 2.748 0 0 1-.63 1.8c-.42.52-1.03.87-1.83 1.05-.16.03-.28.04-.36.04-.08 0-.2-.02-.36-.07.02-.18.05-.37.09-.57.04-.2.11-.45.21-.75.1-.3.23-.57.39-.81.16-.24.37-.47.63-.69.26-.22.56-.4.9-.54.34-.14.75-.21 1.23-.21.12.19.18.38.18.57 0 .19-.02.38-.05.57-.03.19-.07.38-.12.57-.05.19-.1.36-.15.51-.05.15-.09.27-.12.36-.03.09-.05.15-.06.18z" />
                            </svg>
                            <span className="hidden sm:inline">Apple Pay</span>
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="card" className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="card-number">
                              Card Number <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.cardNumber}
                              onChange={(e) => {
                                // Format card number with spaces
                                const value = e.target.value.replace(/\s/g, "")
                                const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                                setCardDetails({ ...cardDetails, cardNumber: formattedValue })
                              }}
                              maxLength={19}
                              required
                              className="rounded-full"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="card-name">
                              Name on Card <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="card-name"
                              placeholder="John Doe"
                              value={cardDetails.cardName}
                              onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                              required
                              className="rounded-full"
                            />
                          </div>

                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="expiry-date">
                                Expiry Date <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                id="expiry-date"
                                placeholder="MM/YY"
                                value={cardDetails.expiryDate}
                                onChange={(e) => {
                                  // Format expiry date with slash
                                  const value = e.target.value.replace(/\D/g, "")
                                  let formattedValue = value
                                  if (value.length > 2) {
                                    formattedValue = value.slice(0, 2) + "/" + value.slice(2, 4)
                                  }
                                  setCardDetails({ ...cardDetails, expiryDate: formattedValue })
                                }}
                                maxLength={5}
                                required
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Label htmlFor="cvv">
                                  CVV <span className="text-red-500">*</span>
                                </Label>
                                <TooltipInfo
                                  content="The 3 or 4 digit security code on the back of your card."
                                  size="sm"
                                />
                              </div>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, "")
                                  setCardDetails({ ...cardDetails, cvv: value })
                                }}
                                maxLength={4}
                                required
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="save-payment"
                              checked={savePaymentInfo}
                              onCheckedChange={(checked) => setSavePaymentInfo(!!checked)}
                            />
                            <label
                              htmlFor="save-payment"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Save payment information for future purchases
                            </label>
                          </div>
                        </TabsContent>

                        <TabsContent value="mpesa" className="space-y-4">
                          <div className="p-4 bg-muted/30 rounded-lg">
                            <h3 className="font-medium mb-2 flex items-center gap-2">
                              <Phone className="h-4 w-4" />
                              M-Pesa Express
                            </h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Pay directly with M-Pesa. You will receive a prompt on your phone to complete the payment.
                            </p>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="mpesa-phone">
                                  M-Pesa Phone Number <span className="text-red-500">*</span>
                                </Label>
                                <div className="flex">
                                  <Select
                                    value={mpesaDetails.countryCode}
                                    onValueChange={(value) => setMpesaDetails({ ...mpesaDetails, countryCode: value })}
                                  >
                                    <SelectTrigger className="w-[90px] rounded-l-full rounded-r-none border-r-0">
                                      <SelectValue placeholder="+254" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="+254">+254</SelectItem>
                                      <SelectItem value="+255">+255</SelectItem>
                                      <SelectItem value="+256">+256</SelectItem>
                                      <SelectItem value="+250">+250</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    id="mpesa-phone"
                                    type="tel"
                                    value={mpesaDetails.phoneNumber}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/\D/g, "")
                                      setMpesaDetails({ ...mpesaDetails, phoneNumber: value })
                                    }}
                                    placeholder="7XX XXX XXX"
                                    required
                                    className="rounded-l-none rounded-r-full"
                                  />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Enter the phone number registered with M-Pesa
                                </p>
                              </div>

                              <div className="bg-primary/10 p-3 rounded-md border border-primary/20">
                                <p className="text-sm">
                                  When you place your order, you will receive a prompt on your phone to enter your
                                  M-Pesa PIN to complete the payment of{" "}
                                  <span className="font-bold">${total.toFixed(2)}</span>.
                                </p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="paypal" className="space-y-4">
                          <div className="p-4 bg-muted/30 rounded-lg text-center">
                            <div className="mb-4">
                              <div className="h-12 w-12 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-white font-bold text-xl">
                                P
                              </div>
                            </div>
                            <h3 className="font-medium mb-2">Pay with PayPal</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              You will be redirected to PayPal to complete your payment securely.
                            </p>
                            <Button className="rounded-full w-full sm:w-auto">Continue with PayPal</Button>
                          </div>
                        </TabsContent>

                        <TabsContent value="applepay" className="space-y-4">
                          <div className="p-4 bg-muted/30 rounded-lg text-center">
                            <div className="mb-4">
                              <div className="h-12 w-12 bg-black rounded-full mx-auto flex items-center justify-center text-white">
                                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
                                  <path d="M17.72 17.25a6.824 6.824 0 0 1-.677 1.195 5.243 5.243 0 0 1-.722.883 1.394 1.394 0 0 1-.9.396 2.243 2.243 0 0 1-.824-.205 2.41 2.41 0 0 0-.892-.204 2.493 2.493 0 0 0-.928.204 2.13 2.13 0 0 1-.777.217 1.311 1.311 0 0 1-.936-.408 5.522 5.522 0 0 1-.746-.907 6.873 6.873 0 0 1-.795-1.56 5.85 5.85 0 0 1-.33-1.889 3.473 3.473 0 0 1 .456-1.815 2.687 2.687 0 0 1 .96-.96 2.584 2.584 0 0 1 1.296-.36 3.025 3.025 0 0 1 .995.228c.307.137.57.258.787.36.19.09.447.204.77.342.26.114.47.171.63.171.13 0 .32-.06.57-.18s.54-.24.87-.36c.33-.12.68-.23 1.06-.33.38-.09.76-.11 1.14-.06.42.03.8.14 1.14.33.34.19.62.44.84.75a2.348 2.348 0 0 0-.87 1.866c.01.62.16 1.15.45 1.59.29.44.6.75.93.93-.12.34-.24.66-.37.96zm-2.33-14.23a2.748 2.748 0 0 1-.63 1.8c-.42.52-1.03.87-1.83 1.05-.16.03-.28.04-.36.04-.08 0-.2-.02-.36-.07.02-.18.05-.37.09-.57.04-.2.11-.45.21-.75.1-.3.23-.57.39-.81.16-.24.37-.47.63-.69.26-.22.56-.4.9-.54.34-.14.75-.21 1.23-.21.12.19.18.38.18.57 0 .19-.02.38-.05.57-.03.19-.07.38-.12.57-.05.19-.1.36-.15.51-.05.15-.09.27-.12.36-.03.09-.05.15-.06.18z" />
                                </svg>
                              </div>
                            </div>
                            <h3 className="font-medium mb-2">Pay with Apple Pay</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Complete your payment securely with Apple Pay.
                            </p>
                            <Button className="rounded-full w-full sm:w-auto bg-black hover:bg-black/80">
                              <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2" fill="currentColor">
                                <path d="M17.72 17.25a6.824 6.824 0 0 1-.677 1.195 5.243 5.243 0 0 1-.722.883 1.394 1.394 0 0 1-.9.396 2.243 2.243 0 0 1-.824-.205 2.41 2.41 0 0 0-.892-.204 2.493 2.493 0 0 0-.928.204 2.13 2.13 0 0 1-.777.217 1.311 1.311 0 0 1-.936-.408 5.522 5.522 0 0 1-.746-.907 6.873 6.873 0 0 1-.795-1.56 5.85 5.85 0 0 1-.33-1.889 3.473 3.473 0 0 1 .456-1.815 2.687 2.687 0 0 1 .96-.96 2.584 2.584 0 0 1 1.296-.36 3.025 3.025 0 0 1 .995.228c.307.137.57.258.787.36.19.09.447.204.77.342.26.114.47.171.63.171.13 0 .32-.06.57-.18s.54-.24.87-.36c.33-.12.68-.23 1.06-.33.38-.09.76-.11 1.14-.06.42.03.8.14 1.14.33.34.19.62.44.84.75a2.348 2.348 0 0 0-.87 1.866c.01.62.16 1.15.45 1.59.29.44.6.75.93.93-.12.34-.24.66-.37.96zm-2.33-14.23a2.748 2.748 0 0 1-.63 1.8c-.42.52-1.03.87-1.83 1.05-.16.03-.28.04-.36.04-.08 0-.2-.02-.36-.07.02-.18.05-.37.09-.57.04-.2.11-.45.21-.75.1-.3.23-.57.39-.81.16-.24.37-.47.63-.69.26-.22.56-.4.9-.54.34-.14.75-.21 1.23-.21.12.19.18.38.18.57 0 .19-.02.38-.05.57-.03.19-.07.38-.12.57-.05.19-.1.36-.15.51-.05.15-.09.27-.12.36-.03.09-.05.15-.06.18z" />
                              </svg>
                              Pay
                            </Button>
                          </div>
                        </TabsContent>
                      </Tabs>

                      <div className="rounded-lg bg-muted/50 p-4">
                        <p className="text-sm text-muted-foreground">
                          By clicking "Place Order", you agree to our{" "}
                          <Link href="/terms-conditions" className="text-primary hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy-policy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                          .
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between">
                  <Button variant="outline" onClick={handleBack} className="rounded-full">
                    Back
                  </Button>
                  <Button onClick={handleContinue} disabled={isProcessing} className="rounded-full">
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </>
                    ) : step === 3 ? (
                      "Place Order"
                    ) : (
                      "Continue"
                    )}
                  </Button>
                </div>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <Card className="bg-background/80 backdrop-blur-md sticky top-6">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="max-h-80 overflow-auto space-y-3 pr-2">
                      {cartItems.map((item) => (
                        <div key={item.productId} className="flex gap-3">
                          <div className="h-16 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                            <img
                              src={item.product?.image || "/placeholder.svg"}
                              alt={item.product?.name || "Product"}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{item.product?.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Size: {item.size}, Color: {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                            </p>
                            <div className="flex justify-between mt-1">
                              <p className="text-xs">Qty: {item.quantity}</p>
                              <p className="font-medium">
                                ${((item.product?.price || 0) * (1 - (item.product?.discount || 0) / 100)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shippingCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount (WELCOME10)</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    {!promoApplied && (
                      <div className="pt-2">
                        <p className="text-sm mb-2">Have a promo code?</p>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="rounded-full"
                          />
                          <Button
                            variant="outline"
                            onClick={handleApplyPromo}
                            disabled={!promoCode}
                            className="rounded-full"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="rounded-lg bg-muted/50 p-3 flex items-center gap-2 text-sm">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <p className="text-muted-foreground">Secure checkout powered by Stripe</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </main>
      </TooltipProvider>
      <Footer />
    </>
  )
}
