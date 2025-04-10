"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth"

interface LogoutDialogProps {
  children?: React.ReactNode
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function LogoutDialog({ children, variant = "ghost", size = "icon", className }: LogoutDialogProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      logout()
      setOpen(false)
      toast.success("Logged out successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to log out. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant={variant} size={size} className={className}>
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Log out</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log out</DialogTitle>
          <DialogDescription>Are you sure you want to log out of your account?</DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLogout} disabled={isLoading}>
            {isLoading ? "Logging out..." : "Log out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
