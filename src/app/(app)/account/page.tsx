"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LinkOrdersDialog } from "@/components/account/link-orders-dialog"
import { findMatchingOrders } from "@/lib/account-linking"
import { motion } from "framer-motion"
import {
  User,
  Package,
  Heart,
  LogOut,
  Settings,
  CreditCard,
  HelpCircle,
  Bell,
  Gift,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Shield,
  Edit,
  Camera,
  Plus,
  Trash2,
} from "lucide-react"
import { toast } from "sonner"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth"
import { useStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Footer } from "@/components/layout/footer"

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()
  const { favorites, cart } = useStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [loyaltyPoints, setLoyaltyPoints] = useState(350)
  const [nextRewardAt, setNextRewardAt] = useState(500)
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
  })
  const [addingAddress, setAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [newAddress, setNewAddress] = useState({
    id: "",
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    isDefault: false,
  })
  const [addingPayment, setAddingPayment] = useState(false)
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  })
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: string } | null>(null)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")
  const [showLinkOrdersDialog, setShowLinkOrdersDialog] = useState(false)
  const [hasMatchingOrders, setHasMatchingOrders] = useState(false)
  const searchParams = useSearchParams()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !user) {
      router.push("/login")
    } else if (user) {
      setEditedUser({
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        birthday: user.birthday || "",
        address: {
          line1: user.address?.line1 || "",
          line2: user.address?.line2 || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          postalCode: user.address?.postalCode || "",
          country: user.address?.country || "",
        },
      })
    }
  }, [isAuthenticated, user, router])

  // Check for matching orders when user logs in
  useEffect(() => {
    if (isAuthenticated && user) {
      const matchingOrders = findMatchingOrders(user)
      setHasMatchingOrders(matchingOrders.length > 0)

      // Show dialog if there are matching orders and not coming from order linking
      if (matchingOrders.length > 0 && !searchParams.get("linked")) {
        setShowLinkOrdersDialog(true)
      }
    }
  }, [isAuthenticated, user, searchParams])

  const handleLogout = () => {
    logout()
    toast.success("Logged out", {
      description: "You have been logged out successfully.",
    })
    router.push("/")
  }

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    toast.success("Profile updated", {
      description: "Your profile has been updated successfully.",
    })
    setIsEditing(false)
  }

  const handleAddAddress = () => {
    // Generate a random ID for the new address
    const id = `addr_${Math.random().toString(36).substring(2, 10)}`
    setNewAddress({ ...newAddress, id })

    // In a real app, this would add the address to the database
    toast.success("Address added", {
      description: "Your new address has been added successfully.",
    })
    setAddingAddress(false)

    // Reset the form
    setNewAddress({
      id: "",
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "United States",
      isDefault: false,
    })
  }

  const handleEditAddress = () => {
    // In a real app, this would update the address in the database
    toast.success("Address updated", {
      description: "Your address has been updated successfully.",
    })
    setEditingAddress(null)
  }

  const handleSetDefaultAddress = (id: string) => {
    // In a real app, this would set the address as default in the database
    toast.success("Default address updated", {
      description: "Your default address has been updated.",
    })
  }

  const handleDeleteItem = () => {
    if (!itemToDelete) return

    // In a real app, this would delete the item from the database
    if (itemToDelete.type === "address") {
      toast.success("Address deleted", {
        description: "Your address has been deleted successfully.",
      })
    } else if (itemToDelete.type === "payment") {
      toast.success("Payment method deleted", {
        description: "Your payment method has been deleted successfully.",
      })
    }

    setDeleteConfirmOpen(false)
    setItemToDelete(null)
  }

  const handleAddPayment = () => {
    // In a real app, this would add the payment method to the database
    toast.success("Payment method added", {
      description: "Your new payment method has been added successfully.",
    })
    setAddingPayment(false)

    // Reset the form
    setNewPayment({
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      isDefault: false,
    })
  }

  const handleChangePassword = () => {
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters")
      return
    }

    // In a real app, this would update the password in the database
    toast.success("Password changed", {
      description: "Your password has been changed successfully.",
    })
    setChangePasswordOpen(false)

    // Reset the form
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
    setPasswordError("")
  }

  const handleOrdersLinked = () => {
    // Refresh the page with a query param to prevent showing the dialog again
    router.push("/account?tab=orders&linked=true")
  }

  // Demo user recent orders
  const recentOrders = [
    {
      id: "ORD-12345",
      date: "2023-04-15",
      status: "Delivered",
      total: 125.99,
      items: 3,
      products: [
        { name: "Naruto Hoodie", price: 49.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { name: "Demon Slayer T-Shirt", price: 29.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { name: "Attack on Titan Cap", price: 19.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
    },
    {
      id: "ORD-12346",
      date: "2023-03-28",
      status: "Delivered",
      total: 89.5,
      items: 2,
      products: [
        { name: "My Hero Academia Backpack", price: 59.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
        { name: "One Piece Figurine", price: 29.99, quantity: 1, image: "/placeholder.svg?height=80&width=80" },
      ],
    },
  ]

  // Demo payment methods
  const paymentMethods = [
    {
      id: "pm_1",
      type: "visa",
      last4: "4242",
      expMonth: 4,
      expYear: 2025,
      isDefault: true,
    },
    {
      id: "pm_2",
      type: "mastercard",
      last4: "5555",
      expMonth: 8,
      expYear: 2024,
      isDefault: false,
    },
  ]

  // Demo addresses
  const addresses = [
    {
      id: "addr_1",
      name: "Home",
      line1: "123 Anime Street",
      line2: "Apt 4B",
      city: "Tokyo",
      state: "Kanto",
      postalCode: "100-0001",
      country: "Japan",
      isDefault: true,
    },
    {
      id: "addr_2",
      name: "Work",
      line1: "456 Manga Avenue",
      line2: "Suite 7C",
      city: "Osaka",
      state: "Kansai",
      postalCode: "530-0001",
      country: "Japan",
      isDefault: false,
    },
  ]

  if (!isAuthenticated || !user) {
    return null // Will redirect to login
  }

  const isDemo = user.email === "demo@animefreak.com"

  return (
    <>
      <Header />
      <main className="container px-4 py-8 md:px-6 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Welcome Banner */}
          <Card className="bg-gradient-to-r from-primary/80 to-primary/60 text-white backdrop-blur-md border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-white">
                      <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                      <AvatarFallback className="text-xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full"
                        >
                          <Camera className="h-3 w-3" />
                          <span className="sr-only">Change profile picture</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Change Profile Picture</DialogTitle>
                          <DialogDescription>Upload a new profile picture or choose from our gallery</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center justify-center">
                            <Avatar className="h-24 w-24 border-2 border-primary">
                              <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                              <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="picture">Upload Picture</Label>
                            <Input id="picture" type="file" accept="image/*" />
                          </div>
                          <div>
                            <Label>Or choose an avatar</Label>
                            <div className="grid grid-cols-4 gap-2 mt-2">
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                <button
                                  key={i}
                                  className="rounded-md overflow-hidden border-2 hover:border-primary focus:border-primary focus:outline-none transition-colors"
                                >
                                  <img
                                    src={`/placeholder.svg?height=60&width=60&text=Avatar${i}`}
                                    alt={`Avatar ${i}`}
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit" onClick={() => toast.success("Profile picture updated")}>
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                    <p className="text-white/80">{isDemo ? "Demo Account" : "Member since April 2023"}</p>
                  </div>
                </div>
                <div className="flex flex-col items-start md:items-end gap-2">
                  <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    <span className="font-medium">{loyaltyPoints} Loyalty Points</span>
                  </div>
                  <div className="w-full md:w-48">
                    <Progress value={(loyaltyPoints / nextRewardAt) * 100} className="h-2 bg-white/20" />
                    <p className="text-xs text-white/80 mt-1">
                      {nextRewardAt - loyaltyPoints} points until your next reward
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <Card className="md:w-64 lg:w-72 bg-background/80 backdrop-blur-md">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar || "/placeholder-user.jpg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription className="text-xs">{user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button
                    variant={activeTab === "profile" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                    <Badge className="ml-auto bg-primary">{isDemo ? "2" : "0"}</Badge>
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                    <Badge className="ml-auto bg-primary">{favorites.length}</Badge>
                  </Button>
                  <Button
                    variant={activeTab === "addresses" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === "payment" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button
                    variant={activeTab === "notifications" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                  <Button
                    variant={activeTab === "settings" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant={activeTab === "help" ? "secondary" : "ghost"}
                    className="justify-start rounded-none"
                    onClick={() => setActiveTab("help")}
                  >
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Help & Support
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>

            {/* Main Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsContent value="profile" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Profile</CardTitle>
                        <CardDescription>Manage your personal information</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          "Cancel"
                        ) : (
                          <>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {isEditing ? (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={editedUser.email}
                                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                value={editedUser.phone}
                                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                                className="rounded-full"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="birthday">Birthday</Label>
                              <Input
                                id="birthday"
                                type="date"
                                value={editedUser.birthday}
                                onChange={(e) => setEditedUser({ ...editedUser, birthday: e.target.value })}
                                className="rounded-full"
                              />
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="address1">Address Line 1</Label>
                                <Input
                                  id="address1"
                                  value={editedUser.address.line1}
                                  onChange={(e) =>
                                    setEditedUser({
                                      ...editedUser,
                                      address: { ...editedUser.address, line1: e.target.value },
                                    })
                                  }
                                  className="rounded-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input
                                  id="address2"
                                  value={editedUser.address.line2}
                                  onChange={(e) =>
                                    setEditedUser({
                                      ...editedUser,
                                      address: { ...editedUser.address, line2: e.target.value },
                                    })
                                  }
                                  className="rounded-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                  id="city"
                                  value={editedUser.address.city}
                                  onChange={(e) =>
                                    setEditedUser({
                                      ...editedUser,
                                      address: { ...editedUser.address, city: e.target.value },
                                    })
                                  }
                                  className="rounded-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="state">State/Province</Label>
                                <Input
                                  id="state"
                                  value={editedUser.address.state}
                                  onChange={(e) =>
                                    setEditedUser({
                                      ...editedUser,
                                      address: { ...editedUser.address, state: e.target.value },
                                    })
                                  }
                                  className="rounded-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input
                                  id="postalCode"
                                  value={editedUser.address.postalCode}
                                  onChange={(e) =>
                                    setEditedUser({
                                      ...editedUser,
                                      address: { ...editedUser.address, postalCode: e.target.value },
                                    })
                                  }
                                  className="rounded-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select
                                  value={editedUser.address.country}
                                  onValueChange={(value) =>
                                    setEditedUser({
                                      ...editedUser,
                                      address: { ...editedUser.address, country: value },
                                    })
                                  }
                                >
                                  <SelectTrigger id="country" className="rounded-full">
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Japan">Japan</SelectItem>
                                    <SelectItem value="United States">United States</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 flex justify-end">
                            <Button className="rounded-full" onClick={handleSaveProfile}>
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <label className="text-sm font-medium">Full Name</label>
                              </div>
                              <p className="text-foreground">{user.name}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <label className="text-sm font-medium">Email</label>
                              </div>
                              <p className="text-foreground">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <label className="text-sm font-medium">Phone</label>
                              </div>
                              <p className="text-foreground">{isDemo ? "+81 90-1234-5678" : "Not provided"}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <label className="text-sm font-medium">Birthday</label>
                              </div>
                              <p className="text-foreground">{isDemo ? "May 15, 1995" : "Not provided"}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge className="h-4 w-4 text-muted-foreground" />
                                <label className="text-sm font-medium">Account Type</label>
                              </div>
                              <p className="text-foreground">{isDemo ? "Premium Member" : "Standard Account"}</p>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <label className="text-sm font-medium">Member Since</label>
                              </div>
                              <p className="text-foreground">April 2023</p>
                            </div>
                          </div>

                          <div className="border-t pt-4">
                            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              Default Shipping Address
                            </h3>
                            {isDemo ? (
                              <div className="bg-muted/50 p-4 rounded-lg backdrop-blur-sm">
                                <p className="font-medium">Home</p>
                                <p>123 Anime Street</p>
                                <p>Apt 4B</p>
                                <p>Tokyo, Kanto 100-0001</p>
                                <p>Japan</p>
                              </div>
                            ) : (
                              <p className="text-muted-foreground">No shipping address added yet.</p>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="orders" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Orders</CardTitle>
                      <CardDescription>View your order history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isDemo && recentOrders.length > 0 ? (
                        <div className="space-y-4">
                          {recentOrders.map((order) => (
                            <Card key={order.id} className="overflow-hidden bg-background/50 backdrop-blur-sm">
                              <CardHeader className="p-4 bg-muted/30">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                  <div>
                                    <p className="font-medium">{order.id}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {new Date(order.date).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={order.status === "Delivered" ? "bg-green-500" : "bg-blue-500"}>
                                      {order.status}
                                    </Badge>
                                    <p className="font-medium">${order.total.toFixed(2)}</p>
                                  </div>
                                </div>
                              </CardHeader>
                              <CardContent className="p-4">
                                <div className="space-y-3">
                                  {order.products.map((product, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                      <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                                        <img
                                          src={product.image || "/placeholder.svg"}
                                          alt={product.name}
                                          className="h-full w-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">Qty: {product.quantity}</p>
                                      </div>
                                      <p className="font-medium">${product.price.toFixed(2)}</p>
                                    </div>
                                  ))}
                                </div>
                                <div className="mt-4 flex justify-end gap-2">
                                  <Button variant="outline" size="sm" className="rounded-full">
                                    View Details
                                  </Button>
                                  <Button variant="outline" size="sm" className="rounded-full">
                                    Track Order
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No orders yet</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            When you place an order, it will appear here.
                          </p>
                          <Button asChild className="mt-4 rounded-full">
                            <a href="/shop">Start Shopping</a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Wishlist</CardTitle>
                      <CardDescription>Items you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {favorites.length === 0 ? (
                        <div className="text-center py-8">
                          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">Your wishlist is empty</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Save items you like to your wishlist to find them easily later.
                          </p>
                          <Button asChild className="mt-4 rounded-full">
                            <a href="/shop">Explore Products</a>
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <p className="mb-4">You have {favorites.length} items in your wishlist.</p>
                          <Button asChild className="rounded-full">
                            <a href="/wishlist">View Wishlist</a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="addresses" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Addresses</CardTitle>
                        <CardDescription>Manage your shipping addresses</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setAddingAddress(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Address
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {isDemo ? (
                        <div className="space-y-4">
                          {addresses.map((address) => (
                            <Card key={address.id} className="overflow-hidden bg-background/50 backdrop-blur-sm">
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center gap-2 mb-2">
                                      <h3 className="font-medium">{address.name}</h3>
                                      {address.isDefault && (
                                        <Badge variant="outline" className="ml-2">
                                          Default
                                        </Badge>
                                      )}
                                    </div>
                                    <p>{address.line1}</p>
                                    {address.line2 && <p>{address.line2}</p>}
                                    <p>
                                      {address.city}, {address.state} {address.postalCode}
                                    </p>
                                    <p>{address.country}</p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="rounded-full"
                                      onClick={() => {
                                        setEditingAddress(address.id)
                                        setNewAddress({
                                          id: address.id,
                                          name: address.name,
                                          line1: address.line1,
                                          line2: address.line2 || "",
                                          city: address.city,
                                          state: address.state,
                                          postalCode: address.postalCode,
                                          country: address.country,
                                          isDefault: address.isDefault,
                                        })
                                      }}
                                    >
                                      Edit
                                    </Button>
                                    {!address.isDefault && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full"
                                        onClick={() => handleSetDefaultAddress(address.id)}
                                      >
                                        Set as Default
                                      </Button>
                                    )}
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                      onClick={() => {
                                        setItemToDelete({ type: "address", id: address.id })
                                        setDeleteConfirmOpen(true)
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No addresses saved</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            Add shipping addresses to make checkout faster.
                          </p>
                          <Button className="mt-4 rounded-full" onClick={() => setAddingAddress(true)}>
                            Add Address
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Add Address Dialog */}
                  <Dialog open={addingAddress} onOpenChange={setAddingAddress}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Address</DialogTitle>
                        <DialogDescription>Add a new shipping address to your account</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="address-name">Address Name</Label>
                          <Input
                            id="address-name"
                            placeholder="Home, Work, etc."
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address-line1">Address Line 1</Label>
                          <Input
                            id="address-line1"
                            placeholder="Street address"
                            value={newAddress.line1}
                            onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address-line2">Address Line 2 (Optional)</Label>
                          <Input
                            id="address-line2"
                            placeholder="Apartment, suite, etc."
                            value={newAddress.line2}
                            onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="address-city">City</Label>
                            <Input
                              id="address-city"
                              placeholder="City"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address-state">State/Province</Label>
                            <Input
                              id="address-state"
                              placeholder="State"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="address-postal">Postal Code</Label>
                            <Input
                              id="address-postal"
                              placeholder="Postal code"
                              value={newAddress.postalCode}
                              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address-country">Country</Label>
                            <Select
                              value={newAddress.country}
                              onValueChange={(value) => setNewAddress({ ...newAddress, country: value })}
                            >
                              <SelectTrigger id="address-country">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="United States">United States</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                <SelectItem value="Australia">Australia</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="address-default"
                            checked={newAddress.isDefault}
                            onCheckedChange={(checked) => setNewAddress({ ...newAddress, isDefault: !!checked })}
                          />
                          <Label htmlFor="address-default">Set as default address</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setAddingAddress(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddAddress}>Save Address</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  {/* Edit Address Dialog */}
                  <Dialog open={!!editingAddress} onOpenChange={(open) => !open && setEditingAddress(null)}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Address</DialogTitle>
                        <DialogDescription>Update your shipping address details</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="edit-address-name">Address Name</Label>
                          <Input
                            id="edit-address-name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-address-line1">Address Line 1</Label>
                          <Input
                            id="edit-address-line1"
                            value={newAddress.line1}
                            onChange={(e) => setNewAddress({ ...newAddress, line1: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="edit-address-line2">Address Line 2 (Optional)</Label>
                          <Input
                            id="edit-address-line2"
                            value={newAddress.line2}
                            onChange={(e) => setNewAddress({ ...newAddress, line2: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-address-city">City</Label>
                            <Input
                              id="edit-address-city"
                              value={newAddress.city}
                              onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-address-state">State/Province</Label>
                            <Input
                              id="edit-address-state"
                              value={newAddress.state}
                              onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-address-postal">Postal Code</Label>
                            <Input
                              id="edit-address-postal"
                              value={newAddress.postalCode}
                              onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-address-country">Country</Label>
                            <Select
                              value={newAddress.country}
                              onValueChange={(value) => setNewAddress({ ...newAddress, country: value })}
                            >
                              <SelectTrigger id="edit-address-country">
                                <SelectValue placeholder="Select country" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="United States">United States</SelectItem>
                                <SelectItem value="Canada">Canada</SelectItem>
                                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                <SelectItem value="Australia">Australia</SelectItem>
                                <SelectItem value="Japan">Japan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="edit-address-default"
                            checked={newAddress.isDefault}
                            onCheckedChange={(checked) => setNewAddress({ ...newAddress, isDefault: !!checked })}
                            disabled={newAddress.isDefault}
                          />
                          <Label htmlFor="edit-address-default">
                            {newAddress.isDefault ? "Default address" : "Set as default address"}
                          </Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingAddress(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleEditAddress}>Save Changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TabsContent>

                <TabsContent value="payment" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your payment methods</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setAddingPayment(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                      </Button>
                    </CardHeader>
                    <CardContent>
                      {isDemo ? (
                        <div className="space-y-4">
                          {paymentMethods.map((method) => (
                            <div
                              key={method.id}
                              className="flex items-center justify-between border rounded-lg p-4 bg-background/50 backdrop-blur-sm"
                            >
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-16 items-center justify-center rounded-md bg-slate-100">
                                  {method.type === "visa" ? (
                                    <svg viewBox="0 0 32 32" className="h-6 w-6">
                                      <path fill="#2566AF" d="M13.066 19.833h-2.133L12 13.667h2.133z" />
                                      <path
                                        fill="#E6A540"
                                        d="M21.466 13.8c-.467-.2-1.2-.4-2.133-.333-.933 0-2.667.4-2.667 1.733 0 .733.8 1.133 1.4 1.4.667.267.867.4.867.667 0 .4-.533.533-1 .533-.667 0-1.067-.133-1.6-.333l-.267-.133-.267 1.533c.467.2 1.267.4 2.133.4 1.267 0 2.733-.4 2.733-1.8 0-.6-.4-1.067-1.267-1.467-.533-.2-.867-.333-.867-.6 0-.2.267-.4.8-.4.467 0 .8.067 1.067.2l.133.067.267-1.467z"
                                      />
                                      <path
                                        fill="#2566AF"
                                        d="M24.133 17.4l.8-2.067c-.033.067.133-.333.267-.533l.133.6.733 2h-1.933zm2.6-3.733h-1.6c-.467 0-.8.133-1 .6l-2.867 6.467h2s.333-.867.4-1.067h2.467c.067.267.267 1.067.267 1.067h1.8l-1.467-7.067zM10.733 13.667L8.8 18.2l-.2-.933-.667-3.2c-.133-.533-.533-.733-1-.733H3.066l-.066.2c.8.2 1.533.467 2.267.8l1.933 6.533h2.067l3.533-7.2h-2.067z"
                                      />
                                    </svg>
                                  ) : (
                                    <svg viewBox="0 0 32 32" className="h-6 w-6">
                                      <path fill="#FF5F00" d="M12 24h8V8h-8z" />
                                      <path
                                        fill="#EB001B"
                                        d="M12.8 16c0-2.4 1.1-4.6 2.9-6-1.3-1.1-3-1.8-4.8-1.8-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2c1.8 0 3.5-.7 4.8-1.8-1.8-1.2-2.9-3.4-2.9-5.8z"
                                      />
                                      <path
                                        fill="#F79E1B"
                                        d="M27.2 16c0 4-3.2 7.2-7.2 7.2-1.8 0-3.5-.7-4.8-1.8 1.8-1.4 2.9-3.6 2.9-6s-1.1-4.6-2.9-6c1.3-1.1 3-1.8 4.8-1.8 4 .1 7.2 3.3 7.2 7.2z"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {method.type === "visa" ? "Visa" : "Mastercard"} ending in {method.last4}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Expires {method.expMonth}/{method.expYear}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {method.isDefault && <Badge>Default</Badge>}
                                <Button variant="ghost" size="sm" className="rounded-full">
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                  onClick={() => {
                                    setItemToDelete({ type: "payment", id: method.id })
                                    setDeleteConfirmOpen(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 text-lg font-medium">No payment methods</h3>
                          <p className="mt-2 text-sm text-muted-foreground">
                            You haven't added any payment methods yet.
                          </p>
                          <Button className="mt-4 rounded-full" onClick={() => setAddingPayment(true)}>
                            Add Payment Method
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Add Payment Method Dialog */}
                  <Dialog open={addingPayment} onOpenChange={setAddingPayment}>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Payment Method</DialogTitle>
                        <DialogDescription>Add a new credit or debit card to your account</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={newPayment.cardNumber}
                            onChange={(e) => {
                              // Format card number with spaces
                              const value = e.target.value.replace(/\s/g, "")
                              const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ")
                              setNewPayment({ ...newPayment, cardNumber: formattedValue })
                            }}
                            maxLength={19}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="card-name">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            value={newPayment.cardName}
                            onChange={(e) => setNewPayment({ ...newPayment, cardName: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry-date">Expiry Date</Label>
                            <Input
                              id="expiry-date"
                              placeholder="MM/YY"
                              value={newPayment.expiryDate}
                              onChange={(e) => {
                                // Format expiry date with slash
                                const value = e.target.value.replace(/\D/g, "")
                                let formattedValue = value
                                if (value.length > 2) {
                                  formattedValue = value.slice(0, 2) + "/" + value.slice(2, 4)
                                }
                                setNewPayment({ ...newPayment, expiryDate: formattedValue })
                              }}
                              maxLength={5}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={newPayment.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "")
                                setNewPayment({ ...newPayment, cvv: value })
                              }}
                              maxLength={4}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="default-payment"
                            checked={newPayment.isDefault}
                            onCheckedChange={(checked) => setNewPayment({ ...newPayment, isDefault: !!checked })}
                          />
                          <Label htmlFor="default-payment">Set as default payment method</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setAddingPayment(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleAddPayment}>Save Card</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TabsContent>

                <TabsContent value="notifications" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-4">
                          <h3 className="font-medium">Email Notifications</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="order-updates" className="font-medium">
                                  Order Updates
                                </Label>
                                <p className="text-sm text-muted-foreground">Receive updates about your orders</p>
                              </div>
                              <Switch id="order-updates" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="promotions" className="font-medium">
                                  Promotions
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about sales and special offers
                                </p>
                              </div>
                              <Switch id="promotions" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="new-arrivals" className="font-medium">
                                  New Arrivals
                                </Label>
                                <p className="text-sm text-muted-foreground">Be the first to know about new products</p>
                              </div>
                              <Switch id="new-arrivals" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="font-medium">Push Notifications</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="push-order" className="font-medium">
                                  Order Status
                                </Label>
                                <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                              </div>
                              <Switch id="push-order" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="push-offers" className="font-medium">
                                  Special Offers
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Receive notifications about exclusive deals
                                </p>
                              </div>
                              <Switch id="push-offers" />
                            </div>
                          </div>
                        </div>

                        <Button
                          className="rounded-full"
                          onClick={() => toast.success("Notification preferences saved")}
                        >
                          Save Preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Password</h3>
                          <div className="space-y-2">
                            <Button
                              variant="outline"
                              className="rounded-full"
                              onClick={() => setChangePasswordOpen(true)}
                            >
                              Change Password
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="two-factor" className="font-medium">
                                  Enable Two-Factor Authentication
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  Add an extra layer of security to your account
                                </p>
                              </div>
                              <Switch id="two-factor" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Login Sessions</h3>
                          <div className="space-y-2">
                            <div className="bg-muted/50 p-4 rounded-lg backdrop-blur-sm">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Current Session</p>
                                  <p className="text-sm text-muted-foreground">Tokyo, Japan • Chrome on Windows</p>
                                  <p className="text-xs text-muted-foreground">Started: Today at 10:45 AM</p>
                                </div>
                                <Badge className="bg-green-500">Active</Badge>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="rounded-full">
                            End Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Settings</CardTitle>
                      <CardDescription>Manage your account settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">General</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <Label htmlFor="dark-mode" className="font-medium">
                                  Dark Mode
                                </Label>
                                <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                              </div>
                              <Switch id="dark-mode" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Language</h3>
                          <div className="space-y-2">
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="English" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="ja">Japanese</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Country</h3>
                          <div className="space-y-2">
                            <Select>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="United States" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="us">United States</SelectItem>
                                <SelectItem value="ca">Canada</SelectItem>
                                <SelectItem value="gb">United Kingdom</SelectItem>
                                <SelectItem value="au">Australia</SelectItem>
                                <SelectItem value="jp">Japan</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Button className="rounded-full" onClick={() => toast.success("Settings saved")}>
                          Save Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="help" className="mt-0">
                  <Card className="bg-background/80 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle>Help & Support</CardTitle>
                      <CardDescription>Get help with your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">FAQ</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Here are some frequently asked questions about your account.
                            </p>
                            <Button variant="outline" className="rounded-full">
                              View FAQ
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Contact Us</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              If you need further assistance, please contact our support team.
                            </p>
                            <Button variant="outline" className="rounded-full">
                              Contact Support
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t">
                          <h3 className="text-lg font-medium">Terms of Service</h3>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">
                              Read our terms of service to learn more about your rights and responsibilities.
                            </p>
                            <Button variant="outline" className="rounded-full">
                              View Terms of Service
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </motion.div>

        {/* Link Orders Dialog */}
        <LinkOrdersDialog
          open={showLinkOrdersDialog}
          onOpenChange={setShowLinkOrdersDialog}
          onOrdersLinked={handleOrdersLinked}
        />
      </main>
      <Footer />
    </>
  )
}
